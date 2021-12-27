import * as React from "react";
import { mount } from "@cypress/react";
import Button from "./Button";

it("Button", () => {
	mount(<Button>Click me!</Button>);
	cy.get("button").contains("Click me!").click();
});
