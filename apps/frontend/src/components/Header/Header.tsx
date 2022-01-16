import { AuthContext, AuthUI, User } from "@vc/auth";
import React, { FC, useContext, useState } from "react";
import styles from "./Header.module.scss";
import wordmarkIcon from "../../assets/wordmark.svg";
import emblemIcon from "../../assets/emblem.svg";
import xIcon from "../../assets/x.svg";
import menuIcon from "../../assets/menu.svg";
import userIcon from "../../assets/user-circle.svg";
import dotsIcon from "../../assets/dots-horizontal.svg";
import Menu from "../Menu/Menu";
import * as DropdownMenuTemplate from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { NavLink } from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useMediaQuery } from "@vc/frontend/util/useMediaQuery";

const Header: FC = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<Boolean>(false);
	const [isMenuOpen, setIsMenuOpen] = useState<Boolean>(false);
	const currentUser = useContext<User | null>(AuthContext);
	const isMobileWidth = useMediaQuery("(max-width: 950px)");

	const avatarFallbackSvg = (
		<img className={styles.avatarFallbackImage} src={userIcon}></img>
	);

	const userInfo = (
		<div className={styles.userInfo}>
			<div className={styles.userName}>{currentUser?.displayName}</div>
			<Avatar className={styles.avatar}>
				<AvatarImage
					className={styles.avatarImage}
					src={currentUser?.photoURL || undefined}
				></AvatarImage>
				<AvatarFallback className={styles.avatarFallback} delayMs={600}>
					{currentUser?.displayName ? (
						<div>{getInitials(currentUser.displayName)}</div>
					) : (
						avatarFallbackSvg
					)}
				</AvatarFallback>
			</Avatar>
		</div>
	);

	function getInitials(string: string) {
		var names = string.split(" "),
			initials = names[0].substring(0, 1).toUpperCase();

		if (names.length > 1) {
			initials += names[names.length - 1].substring(0, 1).toUpperCase();
		}
		return initials;
	}

	const loggedOutMenuIcon = (
		<div className={styles.menuIconWrapper}>
			<img src={dotsIcon} className={styles.menuIcon}></img>
		</div>
	);

	const menu = (
		<DropdownMenuTemplate.Root>
			<DropdownMenuTemplate.Trigger className={styles.dropdownMenuTrigger}>
				{currentUser ? userInfo : loggedOutMenuIcon}
			</DropdownMenuTemplate.Trigger>
			<Menu isLoggedIn={currentUser != null} />
		</DropdownMenuTemplate.Root>
	);

	const mobileMenu = (
		<div>
			<button
				className={styles.mobileMenuIconWrapper}
				onClick={e => {
					setIsMobileMenuOpen(!isMobileMenuOpen);
				}}
			>
				<div className={styles.hamburgerIcon} data-open={isMobileMenuOpen}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</button>
			{isMobileMenuOpen && <MobileMenu isLoggedIn={currentUser != null} />}
		</div>
	);

	const navContent = (
		<>
			<NavLink
				to='gruendung'
				className={isActive =>
					styles.navLink + (isActive ? " " + styles.selected : "")
				}
				onClick={e => {
					e.currentTarget.blur();
				}}
			>
				Meine Gründung
			</NavLink>
			<NavLink
				to='unternehmensregister'
				className={isActive =>
					styles.navLink + (isActive ? " " + styles.selected : "")
				}
				onClick={e => {
					e.currentTarget.blur();
				}}
			>
				Unternehmensregister
			</NavLink>
		</>
	);

	return (
		<div className={styles.header}>
			<div className={styles.logo}>
				<img className={styles.emblem} src={emblemIcon} alt='emblem' />
				<img className={styles.wordmark} src={wordmarkIcon} alt='wordmark' />
			</div>

			<div className={styles.navContent}>{navContent}</div>
			<div className={styles.authWrapper}>
				{!currentUser && !isMobileWidth && <AuthUI />}
			</div>
			<div className={styles.menu}>{menu}</div>
			<div className={styles.mobileMenu}>{mobileMenu}</div>
		</div>
	);
};

export default Header;
