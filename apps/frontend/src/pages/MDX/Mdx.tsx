import Button from "@vc/ui/src/components/Button/Button";
import React, { Suspense, useCallback, useState } from "react";

export default function MdxPage() {
	const [i, setI] = useState(0);

	const Content = useCallback(
		React.lazy(() => import("./example.mdx")),
		[]
	);
	return (
		<div
			className='content'
			style={{
				paddingTop: "var(--header-height)",
			}}
		>
			<Button onClick={() => setI(i + 1)}>re-render parent component</Button>

			<Suspense fallback={<div>loading...</div>}>
				<Content unternehmen='ug' />
			</Suspense>
		</div>
	);
}
