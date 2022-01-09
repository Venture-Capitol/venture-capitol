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

const Header: FC = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<Boolean>(false);
	const [isMenuOpen, setIsMenuOpen] = useState<Boolean>(false);
	const currentUser = useContext<User | null>(AuthContext);

	const userInfo = (
		<div className={styles.userInfo}>
			<div className={styles.userName}>{currentUser?.displayName}</div>
			<Avatar className={styles.avatar}>
				<AvatarImage
					className={styles.avatarImage}
					src={currentUser?.photoURL || undefined}
				></AvatarImage>
				<AvatarFallback className={styles.avatarFallback} delayMs={600}>
					{userIcon}
				</AvatarFallback>
			</Avatar>
		</div>
	);

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
		<div className={styles.mobileMenuIconWrapper}>
			<img
				src={isMobileMenuOpen ? xIcon : menuIcon}
				className={styles.mobileMenuIcon}
			></img>
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
			<div className={styles.authWrapper}>{!currentUser && <AuthUI />}</div>
			<div className={styles.menu}>{menu}</div>
			<div className={styles.mobileMenuWrapper}>{mobileMenu}</div>
		</div>
	);
};

export default Header;
