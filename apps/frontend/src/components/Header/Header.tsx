import { AuthContext, AuthUI, User } from "@vc/auth";
import React, { FC, useContext, useState } from "react";
import s from "./Header.module.scss";
import wordmarkIcon from "../../assets/wordmark.svg";
import emblemIcon from "../../assets/emblem.svg";
import userIcon from "../../assets/user-circle.svg";
import dotsIcon from "../../assets/dots-horizontal.svg";
import Menu from "../Menu/Menu";
import * as DropdownMenuTemplate from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link, NavLink } from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";
import useMediaQuery from "@vc/frontend/util/useMediaQuery";

const Header: FC = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
	const currentUser = useContext<User | null>(AuthContext);
	const isMobileWidth = useMediaQuery("(max-width: 950px)");

	const avatarFallbackSvg = (
		<img className={s.avatarFallbackImage} src={userIcon}></img>
	);

	const userInfo = (
		<div className={s.userInfo}>
			<div className={s.userName}>{currentUser?.displayName}</div>
			<Avatar className={s.avatar}>
				<AvatarImage
					className={s.avatarImage}
					src={currentUser?.photoURL || undefined}
				></AvatarImage>
				<AvatarFallback className={s.avatarFallback} delayMs={600}>
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

	function closeMobileMenu() {
		setIsMobileMenuOpen(false);
	}

	const loggedOutMenuIcon = (
		<div className={s.menuIconWrapper}>
			<img src={dotsIcon} className={s.menuIcon}></img>
		</div>
	);

	const menu = (
		<div>
			<DropdownMenuTemplate.Root>
				<DropdownMenuTemplate.Trigger className={s.dropdownMenuTrigger}>
					{currentUser ? userInfo : loggedOutMenuIcon}
				</DropdownMenuTemplate.Trigger>
				<Menu isLoggedIn={currentUser != null} />
			</DropdownMenuTemplate.Root>
		</div>
	);

	const mobileMenu = (
		<div>
			<button
				className={s.mobileMenuIconWrapper}
				onClick={e => {
					setIsMobileMenuOpen(!isMobileMenuOpen);
				}}
			>
				<div className={s.hamburgerIcon} data-open={isMobileMenuOpen}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</button>
			<div
				className={s.mobileMenu}
				data-mobile-open={isMobileMenuOpen}
				data-mobile-active={isMobileWidth}
			>
				{isMobileMenuOpen && (
					<MobileMenu
						isLoggedIn={currentUser != null}
						closeMenu={closeMobileMenu}
					/>
				)}
			</div>
		</div>
	);

	const navContent = (
		<>
			<NavLink
				to='/gruendung'
				className={isActive => s.navLink + (isActive ? " " + s.selected : "")}
				onClick={e => {
					e.currentTarget.blur();
				}}
			>
				Meine Gründung
			</NavLink>
			<NavLink
				to='/dienstleister'
				className={isActive => s.navLink + (isActive ? " " + s.selected : "")}
				onClick={e => {
					e.currentTarget.blur();
				}}
			>
				Dienstleisterregister
			</NavLink>
		</>
	);

	return (
		<div className={s.header}>
			<Link to='/'>
				<div className={s.logo}>
					<img className={s.emblem} src={emblemIcon} alt='emblem' />
					<img className={s.wordmark} src={wordmarkIcon} alt='wordmark' />
				</div>
			</Link>

			<div className={s.navContent}>{navContent}</div>
			<div className={s.authWrapper}>
				{!currentUser && !isMobileWidth && <AuthUI />}
			</div>
			<div className={s.menu}>{menu}</div>
			<div className={s.mobileMenuWrapper}>{mobileMenu}</div>
			<div
				className={s.blurBg}
				data-mobile-open={isMobileMenuOpen}
				data-mobile-active={isMobileWidth}
			></div>
		</div>
	);
};

export default Header;