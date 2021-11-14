import { syncHash } from "./syncHash.mjs";
import { loadCss } from "./loadCss.mjs";
import "focus-visible";
const logger = console;
document.addEventListener("DOMContentLoaded", () => {
	loadIe11CSS();
	// initDropdowns();
	// syncHash(logger);
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
