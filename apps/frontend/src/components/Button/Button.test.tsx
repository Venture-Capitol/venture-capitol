import { mount } from "@cypress/react";
import Button from "./Button";

it("Button", () => {
	mount(<Button>Click me!</Button>);
	cy.get("a").contains("Click me!").click();
});
