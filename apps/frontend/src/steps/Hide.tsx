import React, { ReactNode } from "react";
export default function Hide({
	showIf,
	children,
}: {
	showIf: boolean;
	children: ReactNode;
}) {
	return showIf ? <>{children}</> : null;
}
