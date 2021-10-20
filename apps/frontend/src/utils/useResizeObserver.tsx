import { useEffect, useRef, useState } from "react";

/**
 * Observe a single HTMLElement and get its bounding box
 * @returns ref to set in jsx and the bounding box as domRect
 */
export function useResizeObserver<T extends HTMLElement>(): {
	ref: React.RefObject<T>;
	domRect?: DOMRectReadOnly;
} {
	// ref for accessing dom element
	const ref = useRef<T>(null);

	// keep resizeObserver around during state updates
	const [resizeObserver, setResizeObserver] = useState<ResizeObserver>();

	// calculated bounding box, set from resize observer callback
	const [domRect, setDomRect] = useState<DOMRectReadOnly>();

	/**
	 * Create a resize observer every time the underlying DOM element changes
	 */
	useEffect(() => {
		if (!ref.current) return;

		// remove previous resize observer
		resizeObserver?.disconnect();

		const observer = new ResizeObserver(els => {
			let bb = els[0].contentRect;
			setDomRect(bb);
		});

		observer.observe(ref.current);
		setResizeObserver(observer);
	}, [ref]);

	return {
		domRect,
		ref,
	};
}
