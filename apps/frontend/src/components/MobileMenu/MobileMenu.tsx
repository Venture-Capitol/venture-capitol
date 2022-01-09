import { AuthUI, signOut } from "@vc/auth";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import TaskList from "../TaskList/TaskList";
import styles from "./MobileMenu.module.scss";

interface MobileMenuProps {
	isLoggedIn: boolean;
}

const MobileMenu: FC<MobileMenuProps> = ({ isLoggedIn }) => {
	return (
		<div className={styles.dropdownMenu}>
			{!isLoggedIn && <AuthUI />}
			{isLoggedIn && (
				<div className={styles.dropdownItemWrapper}>
					<Link to='/profil' className={styles.dropdownItem}>
						Mein Profil
					</Link>
				</div>
			)}
			<div className={styles.dropdownItemWrapper}>
				<Link to='#' className={styles.dropdownItem}>
					Als Dienstleister eintragen
				</Link>
			</div>
			<div className={styles.dropdownItemWrapper}>
				<Link to='/impressum' className={styles.dropdownItem}>
					Impressum
				</Link>
			</div>
			<div className={styles.dropdownItemWrapper}>
				<Link to='/datenschutz' className={styles.dropdownItem}>
					Datenschutz
				</Link>
			</div>
			{isLoggedIn && (
				<div className={styles.dropdownItemWrapper}>
					<Link to='#' className={styles.dropdownItem} onClick={signOut}>
						Abmelden
					</Link>
				</div>
			)}

			<TaskList />
		</div>
	);
};

export default MobileMenu;
