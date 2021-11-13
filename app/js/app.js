import { loadCss } from "./loadCss.mjs";
document.addEventListener("DOMContentLoaded", () => {
	loadIe11CSS();
});

function loadIe11CSS() {
	var hasCustomPropertiesSupport =
		(window.CSS && window.CSS.supports.bind(window.CSS)) || window.supportsCSS;
	if (
		!(
			!!hasCustomPropertiesSupport &&
			(hasCustomPropertiesSupport("--f:0") ||
				hasCustomPropertiesSupport("--f", 0))
		)
	) {
		loadCss("css/normalize.css");
	}
}
