import { signOut } from "@vc/auth";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./DropdownMenu.module.scss";
import * as DropdownMenuTemplate from "@radix-ui/react-dropdown-menu";

const DropdownMenu: FC = () => {
	const divider = (
		<DropdownMenuTemplate.Separator asChild>
			<div className={styles.divider}></div>
		</DropdownMenuTemplate.Separator>
	);
	return (
		<DropdownMenuTemplate.Content
			asChild
			onCloseAutoFocus={e => {
				e.preventDefault();
			}}
		>
			<div className={styles.dropdownMenu}>
				<div className={styles.dropdownItemWrapper}>
					<DropdownMenuTemplate.Item asChild>
						<Link to='/demo' className={styles.dropdownItem}>
							Platzhalter
						</Link>
					</DropdownMenuTemplate.Item>
				</div>
				{divider}
				<div className={styles.dropdownItemWrapper}>
					<DropdownMenuTemplate.Item asChild>
						<Link to='/demo' className={styles.dropdownItem}>
							Einstellungen
						</Link>
					</DropdownMenuTemplate.Item>
				</div>
				<div className={styles.dropdownItemWrapper}>
					<DropdownMenuTemplate.Item asChild>
						<Link to='/impressum' className={styles.dropdownItem}>
							Impressum
						</Link>
					</DropdownMenuTemplate.Item>
				</div>
				<div className={styles.dropdownItemWrapper}>
					<DropdownMenuTemplate.Item asChild>
						<Link to='/datenschutz' className={styles.dropdownItem}>
							Datenschutz
						</Link>
					</DropdownMenuTemplate.Item>
				</div>
				{divider}
				<div className={styles.dropdownItemWrapper}>
					<DropdownMenuTemplate.Item asChild>
						<Link to='/demo' className={styles.dropdownItem} onClick={signOut}>
							Abmelden
						</Link>
					</DropdownMenuTemplate.Item>
				</div>
			</div>
		</DropdownMenuTemplate.Content>
	);
};

export default DropdownMenu;
