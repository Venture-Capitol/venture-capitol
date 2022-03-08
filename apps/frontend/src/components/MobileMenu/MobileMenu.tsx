import {
	ClipboardCheckIcon,
	LogoutIcon,
	OfficeBuildingIcon,
	PlusCircleIcon,
	UserGroupIcon,
	UserIcon,
} from "@heroicons/react/outline/esm";
import { AuthUI, signOut } from "@vc/auth";
import React, { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import s from "./MobileMenu.module.scss";

interface MobileMenuProps {
	isLoggedIn: boolean;
	isAdmin: boolean;
	closeMenu: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({
	isLoggedIn,
	isAdmin,
	closeMenu,
}) => {
	return (
		<div className={s.menu}>
			<div className={s.contentContainer}>
				<div className={s.content}>
					{!isLoggedIn && <AuthUI />}
					{isLoggedIn && (
						<div className={s.contentItemWrapper}>
							<NavLink
								to='/profil/gruender'
								className={isActive =>
									s.contentItem + (isActive ? " " + s.selected : "")
								}
								onClick={closeMenu}
							>
								<UserIcon className={s.contentIcon} />
								<div className={s.contentText}>Mein Profil</div>
							</NavLink>
						</div>
					)}
					<div className={s.contentItemWrapper}>
						<NavLink
							to='/gruendung'
							className={isActive =>
								s.contentItem + (isActive ? " " + s.selected : "")
							}
							onClick={closeMenu}
						>
							<ClipboardCheckIcon className={s.contentIcon} />
							<div className={s.contentText}>Meine Gründung</div>
						</NavLink>
					</div>
					<div className={s.contentItemWrapper}>
						<NavLink
							to='/dienstleister'
							className={isActive =>
								s.contentItem + (isActive ? " " + s.selected : "")
							}
							onClick={closeMenu}
						>
							<OfficeBuildingIcon className={s.contentIcon} />
							<div className={s.contentText}>Dienstleisterregister</div>
						</NavLink>
					</div>
					<div className={s.contentItemWrapper}>
						<Link
							to='/profil/dienstleister'
							className={s.contentItem}
							onClick={closeMenu}
						>
							<PlusCircleIcon className={s.contentIcon} />
							<div className={s.contentText}>Als Dienstleister eintragen</div>
						</Link>
					</div>
					{isAdmin && (
						<div className={s.contentItemWrapper}>
							<Link
								to='/dienstleister/admin'
								className={s.contentItem}
								onClick={closeMenu}
							>
								<UserGroupIcon className={s.contentIcon} />
								<div className={s.contentText}>Adminpanel</div>
							</Link>
						</div>
					)}
					{isLoggedIn && (
						<div className={s.contentItemWrapper}>
							<Link to='#' className={s.contentItem} onClick={signOut}>
								<LogoutIcon className={s.contentIcon} />
								<div className={s.contentText}>Abmelden</div>
							</Link>
						</div>
					)}
				</div>
				<div className={s.footer}>
					<div className={s.a}>
						<Link to='/impressum' className={s.contentItem} onClick={closeMenu}>
							Impressum
						</Link>
					</div>
					<div className={s.a}>
						<Link
							to='/datenschutz'
							className={s.contentItem}
							onClick={closeMenu}
						>
							Datenschutz
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MobileMenu;
