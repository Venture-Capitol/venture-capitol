/// <reference types="cypress" />

describe("test demo page", () => {
	it("successfully loads", () => {
		cy.visit("/");
	});
	it("background video present", () => {
		cy.visit("/");
		cy.get("#root > div > video").should("exist");
	});
});
