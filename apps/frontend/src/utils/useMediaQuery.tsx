import { useState, useEffect } from "react";

export default function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(window.matchMedia(query).matches);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		if (mediaQuery.matches !== matches) {
			setMatches(mediaQuery.matches);
		}
		const listener = () => {
			setMatches(mediaQuery.matches);
		};
		try {
			mediaQuery.addEventListener("change", listener);
		} catch (e) {
			// Safari doesn't support addEvent listener in older versions, so we
			// have to use the deprecated addListener as a workaround, which might
			// be unsupported in future versions
			try {
				mediaQuery.addListener(listener);
			} catch {}
		}
		return () => {
			try {
				mediaQuery.removeEventListener("change", listener);
			} catch {}
			try {
				mediaQuery.removeListener(listener);
			} catch {}
		};
	}, [matches, query]);

	return matches;
}
