import { signOut } from "@vc/auth";
import { useAuthContext } from "@vc/auth/src/AuthContext";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.scss";

interface MenuProps {
	isLoggedIn: boolean;
	isAdmin: boolean;
	closeMenu: () => void;
}

const Menu: FC<MenuProps> = ({ isLoggedIn, isAdmin, closeMenu }) => {
	function handleSignOut() {
		signOut();
		closeMenu();
	}

	const divider = <div className={styles.divider}></div>;

	return (
		<div className={styles.dropdownMenu}>
			{isLoggedIn && (
				<div className={styles.dropdownItemWrapper}>
					<Link
						to='/profil/'
						className={styles.dropdownItem}
						onClick={closeMenu}
					>
						Mein Profil
					</Link>
				</div>
			)}
			<div className={styles.dropdownItemWrapper}>
				<Link
					to='/profil/dienstleister'
					className={styles.dropdownItem}
					onClick={closeMenu}
				>
					Als Dienstleister eintragen
				</Link>
			</div>
			{isAdmin && (
				<div className={styles.dropdownItemWrapper}>
					<Link
						to='/dienstleister/admin'
						className={styles.dropdownItem}
						onClick={closeMenu}
					>
						Adminpanel
					</Link>
				</div>
			)}
			{divider}
			<div className={styles.dropdownItemWrapper}>
				<Link
					to='/impressum'
					className={styles.dropdownItem}
					onClick={closeMenu}
				>
					Impressum
				</Link>
			</div>
			<div className={styles.dropdownItemWrapper}>
				<Link
					to='/datenschutz'
					className={styles.dropdownItem}
					onClick={closeMenu}
				>
					Datenschutz
				</Link>
			</div>
			{isLoggedIn && divider}
			{isLoggedIn && (
				<div className={styles.dropdownItemWrapper}>
					<Link to='#' className={styles.dropdownItem} onClick={handleSignOut}>
						Abmelden
					</Link>
				</div>
			)}
		</div>
	);
};

export default Menu;
