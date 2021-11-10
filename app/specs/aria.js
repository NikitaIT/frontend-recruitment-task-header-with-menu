import pa11y from "pa11y";

describe("Index page", async () => {
	it("should have no PA11Y issues", async () => {
		const results = await pa11y("http://localhost:3000", {
			runners: ["axe", "htmlcs"],
		});
		expect(results.issues.length).to.equal(0);
	});
});
