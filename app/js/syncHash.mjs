const isDev = true;
export function syncHash(logger) {
	syncHashFrom(logger);
	syncHashTo(logger);
}

const syncHashFrom = (logger) => {
	const hashParams = parseHashParams(
		window.decodeURIComponent(window.location.hash)
	);
	hashParams.map(([k, v]) => {
		if (!k) {
			return;
		}
		const input = document.querySelector(`#${k}`);
		if (!input) {
			return;
		}
		if (typeof input.checked === "boolean") {
			input.checked = v === "true";
		} else {
			input.value = v;
		}
		logger.log(`HashSettedFromLocation:`, [k, v]);
	});
};
const syncHashTo = (logger) => {
	const inputs = Array.from(
		document.querySelectorAll(isDev ? "input" : ".hold-hash-params")
	);
	inputs.map((x) =>
		x.addEventListener("change", setHashParamsFromEvent.bind(undefined, logger))
	);
};

function setHashParamsFromEvent(logger, { target }) {
	const hashParams = Object.fromEntries(
		parseHashParams(window.decodeURIComponent(window.location.hash))
	);
	hashParams[target.id] = val(target);
	logger.log(`HashSettedFromInput:`, [target.id, val(target)]);
	window.location.hash = stringlifyHashParams(Object.entries(hashParams));
}
function val(target) {
	return typeof target.checked === "boolean" ? target.checked : target.value;
}
function stringlifyHashParams(hash) {
	return "#" + hash.map((x) => x.join("=")).join(",");
}

function parseHashParams(hash) {
	const x = hash.replace("#", "");
	return x ? x.split(",").map((x) => x.split("=")) : [];
}
