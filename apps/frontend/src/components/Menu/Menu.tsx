import { signOut } from "@vc/auth";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.scss";
import * as DropdownMenuTemplate from "@radix-ui/react-dropdown-menu";

interface MenuProps {
	isLoggedIn: boolean;
}

const Menu: FC<MenuProps> = ({ isLoggedIn }) => {
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
				{isLoggedIn && (
					<div className={styles.dropdownItemWrapper}>
						<DropdownMenuTemplate.Item asChild>
							<Link to='/profil' className={styles.dropdownItem}>
								Mein Profil
							</Link>
						</DropdownMenuTemplate.Item>
					</div>
				)}
				<div className={styles.dropdownItemWrapper}>
					<DropdownMenuTemplate.Item asChild>
						<Link to='#' className={styles.dropdownItem}>
							Als Dienstleister eintragen
						</Link>
					</DropdownMenuTemplate.Item>
				</div>
				{divider}
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
				{isLoggedIn && divider}
				{isLoggedIn && (
					<div className={styles.dropdownItemWrapper}>
						<DropdownMenuTemplate.Item asChild>
							<Link to='#' className={styles.dropdownItem} onClick={signOut}>
								Abmelden
							</Link>
						</DropdownMenuTemplate.Item>
					</div>
				)}
			</div>
		</DropdownMenuTemplate.Content>
	);
};

export default Menu;
