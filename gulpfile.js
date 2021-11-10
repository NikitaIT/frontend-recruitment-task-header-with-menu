const fileswatch = "html,htm,txt,json,md,woff2"; // List of files extensions for watching & hard reload

import pkg from "gulp";
const { gulp, src, dest, parallel, series, watch } = pkg;

import browserSyncModule from "browser-sync";

const browserSync = browserSyncModule;

import bssi from "browsersync-ssi";
import ssi from "ssi";
import webpackStream from "webpack-stream";
import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";
import postCss from "gulp-postcss";
import imagemin from "gulp-imagemin";
import changed from "gulp-changed";
import concat from "gulp-concat";
import rsync from "gulp-rsync";
import del from "del";

import dotenv from "dotenv";

dotenv.config();

function browsersync() {
	browserSync.init({
		server: {
			baseDir: "app/",
			middleware: bssi({ baseDir: "app/", ext: ".html" }),
		},
		host: process.env.BROWSERSYNC_HOST || undefined,
		ghostMode: { clicks: false },
		notify: false,
		online: true,
		tunnel: "aurora", // Attempt to use the URL https://yousutename.loca.lt
	});
}

function scripts() {
	return src(["app/js/*.js", "!app/js/*.min.js"])
		.pipe(
			webpackStream(
				{
					mode: "production",
					performance: { hints: false },
					plugins: [
						new webpack.ProvidePlugin({
							$: "jquery",
							jQuery: "jquery",
							"window.jQuery": "jquery",
						}), // jQuery (npm i jquery)
					],
					module: {
						rules: [
							{
								test: /\.m?js$/,
								exclude: /(node_modules)/,
								use: {
									loader: "babel-loader",
									options: {
										presets: ["@babel/preset-env"],
										plugins: ["babel-plugin-root-import"],
									},
								},
							},
						],
					},
					optimization: {
						minimize: true,
						minimizer: [
							new TerserPlugin({
								terserOptions: { format: { comments: false } },
								extractComments: false,
							}),
						],
					},
				},
				webpack
			)
		)
		.on("error", function handleError() {
			this.emit("end");
		})
		.pipe(concat("app.min.js"))
		.pipe(dest("app/js"))
		.pipe(browserSync.stream());
}

function utilStyles() {
	return src([`app/styles/utils.css`])
		.pipe(postCss())
		.pipe(concat("utils.min.css"))
		.pipe(dest("app/css"))
		.pipe(browserSync.stream());
}
function styles() {
	return src([`app/styles/main.css`])
		.pipe(postCss())
		.pipe(concat("app.min.css"))
		.pipe(dest("app/css"))
		.pipe(browserSync.stream());
}

function images() {
	return src(["app/images/src/**/*"])
		.pipe(changed("app/images/dist"))
		.pipe(imagemin())
		.pipe(dest("app/images/dist"))
		.pipe(browserSync.stream());
}

function buildcopy() {
	return src(
		[
			"{app/js,app/css}/*.min.*",
			"app/images/**/*.*",
			"!app/images/src/**/*",
			"app/fonts/**/*",
		],
		{ base: "app/" }
	).pipe(dest("dist"));
}

async function buildhtml() {
	let includes = new ssi("app/", "dist/", "/**/*.html");
	includes.compile();
	del("dist/parts", { force: true });
}

async function cleandist() {
	del("dist/**/*", { force: true });
}

function deploy() {
	return src("dist/").pipe(
		rsync({
			root: "dist/",
			hostname: "username@yousite.com",
			destination: "yousite/public_html/",
			// clean: true, // Mirror copy with file deletion
			include: [
				/* '*.htaccess' */
			], // Included files to deploy,
			exclude: ["**/Thumbs.db", "**/*.DS_Store"],
			recursive: true,
			archive: true,
			silent: false,
			compress: true,
		})
	);
}

function startwatch() {
	watch(
		[`app/styles/**/*`, `app/parts/**/*.css`],
		{ usePolling: true },
		styles
	);
	watch([`app/parts/**/*.html`], { usePolling: true }, utilStyles);
	watch(
		["app/js/**/*.js", "app/js/**/*.mjs", "!app/js/**/*.min.js"],
		{ usePolling: true },
		scripts
	);
	watch("app/images/src/**/*", { usePolling: true }, images);
	watch(`app/**/*.{${fileswatch}}`, { usePolling: true }).on(
		"change",
		browserSync.reload
	);
}

export { scripts, styles, utilStyles, images, deploy };
export let assets = series(scripts, utilStyles, styles, images);
export let build = series(
	cleandist,
	images,
	scripts,
	styles,
	utilStyles,
	buildcopy,
	buildhtml
);
export default series(
	scripts,
	styles,
	utilStyles,
	images,
	parallel(browsersync, startwatch)
);
