import BackArrow from "./BackArrow";
import { mount } from "@cypress/react";

it("Button", () => {
	mount(<BackArrow />);
	cy.get("div").contains("Click me!").click();
});
