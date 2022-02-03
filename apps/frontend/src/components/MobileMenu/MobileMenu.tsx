import {
	ClipboardCheckIcon,
	LogoutIcon,
	OfficeBuildingIcon,
	PlusCircleIcon,
	UserGroupIcon,
	UserIcon,
} from "@heroicons/react/outline/esm";
import { AuthUI, signOut } from "@vc/auth";
import React, { FC, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import s from "./MobileMenu.module.scss";
import * as Tabs from "@radix-ui/react-tabs";

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
	const defaultValue = "seiten";
	const [navSelected, setNavSelected] = useState<string>(defaultValue);

	function onValueChange(value: string) {
		setNavSelected(value);
	}

	return (
		<Tabs.Root defaultValue={defaultValue} onValueChange={onValueChange}>
			<div className={s.menu}>
				<Tabs.List asChild>
					<div className={s.nav}>
						<div className={s.navSelector} data-selected={navSelected}>
							<div className={s.navHighlight}></div>
							<div className={s.contentHighlight}></div>
							<svg>
								<defs>
									<clipPath id='cp' clipPathUnits='objectBoundingBox'>
										<path d='M0,0 V1 H1 V1 V1 C0.448,1,0,0.776,0,0.5 V0'></path>
									</clipPath>
								</defs>
							</svg>
						</div>

						<Tabs.Trigger value='seiten' asChild>
							<div className={s.navItem}>Seiten</div>
						</Tabs.Trigger>
						<Tabs.Trigger value='navigation' asChild>
							<div className={s.navItem}>Navigation</div>
						</Tabs.Trigger>
					</div>
				</Tabs.List>
				<Tabs.Content value='seiten' asChild>
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
									<div className={s.contentText}>
										Als Dienstleister eintragen
									</div>
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
								<Link
									to='/impressum'
									className={s.contentItem}
									onClick={closeMenu}
								>
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
				</Tabs.Content>
				<Tabs.Content value='navigation'>
					<div
						style={{
							display: "grid",
							placeContent: "center",
							height: "calc(100vh - 100px)",
							fontSize: "30px",
							fontWeight: "700",
						}}
					>
						Navigation
					</div>
				</Tabs.Content>
			</div>
		</Tabs.Root>
	);
};

export default MobileMenu;
