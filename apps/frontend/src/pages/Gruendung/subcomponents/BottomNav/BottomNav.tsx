import { ClipboardListIcon, MapIcon } from "@heroicons/react/outline/esm";
import s from "./BottomNav.module.scss";

interface BottomNavProps {
	currentPage: "details" | "overview";
	setCurrentPage(newPage: "details" | "overview"): void;
}

export default function BottomNav({
	currentPage,
	setCurrentPage,
}: BottomNavProps) {
	return (
		<nav className={s.nav}>
			<button onClick={() => setCurrentPage("details")}>
				<ClipboardListIcon height={24} /> Details
			</button>
			<button onClick={() => setCurrentPage("overview")}>
				<MapIcon height={24} /> Übersicht
			</button>
		</nav>
	);
}
