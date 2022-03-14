describe("My First Test", () => {
	it("Visit VC and create a new company", () => {
		cy.setCookie("VC_DP_ACK", "true");
		cy.visit("https://venturecapitol.de");
		cy.contains("Meine Gründung").click();
		cy.url().should("include", "/gruendung");
		cy.contains("UG").click();
		cy.url().should("include", "/gruendung/300_Start");
	});
});

export {};
