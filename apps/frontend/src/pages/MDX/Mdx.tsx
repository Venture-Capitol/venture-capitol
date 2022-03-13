import Button from "@vc/ui/src/components/Button/Button";
import React, {
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";

export default function MdxPage() {
	const [i, setI] = useState(0);

	const Template = useCallback(
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
			<Button onClick={() => setI(i + 1)}>{i}</Button>

			<Suspense fallback={<div>loading...</div>}>
				<Template />
			</Suspense>
		</div>
	);
}
