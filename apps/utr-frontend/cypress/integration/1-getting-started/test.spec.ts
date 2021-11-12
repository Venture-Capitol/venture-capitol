/// <reference types="cypress" />

describe("test demo page", () => {
	it("successfully loads", () => {
		cy.visit("/");
	});
	it("react logo present", () => {
		cy.visit("/");
		cy.get("#root > div > header > img").should("exist");
	});
});
