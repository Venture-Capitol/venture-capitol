import { useEffect, useState } from "react";

export default function useMediaQuery({ query }: { query: string }) {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		let onChange = (e: MediaQueryListEvent) => {
			setMatches(e.matches);
		};

		mediaQuery.addEventListener("change", onChange);
		setMatches(mediaQuery.matches);
		return () => mediaQuery.removeEventListener("change", onChange);
	}, [query]);

	return matches;
}
