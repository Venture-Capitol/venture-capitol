import { AuthUI } from "@vc/auth";
import React, { FC, useRef, useState } from "react";
import s from "./Header.module.scss";
import wordmarkIcon from "../../assets/wordmark.svg";
import emblemIcon from "../../assets/emblem.svg";
import Menu from "../Menu/Menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link, NavLink } from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";
import useMediaQuery from "@vc/frontend/util/useMediaQuery";
import { DotsHorizontalIcon, UserCircleIcon } from "@heroicons/react/solid/esm";
import { useAuthContext } from "@vc/auth/src/AuthContext";

const Header: FC = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const { user: currentUser } = useAuthContext();
	const isMobileWidth = useMediaQuery("(max-width: 950px)");
	const menuRef = useRef<HTMLDivElement>(null);

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
						<UserCircleIcon className={s.avatarFallbackImage} />
					)}
				</AvatarFallback>
			</Avatar>
		</div>
	);

	const handleMenuClick = () => {
		if (!isMenuOpen) {
			document.addEventListener("click", handleOutsideClick, true);
		}
		setIsMenuOpen(!isMenuOpen);
	};

	function handleOutsideClick(e: MouseEvent) {
		if (!menuRef.current) return;
		if (!menuRef.current.contains(e.target as Node)) {
			setIsMenuOpen(false);
			document.removeEventListener("click", handleOutsideClick, true);
		}
	}

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

	function closeMenu() {
		setIsMenuOpen(false);
	}

	const loggedOutMenuIcon = (
		<div className={s.menuIconWrapper}>
			<DotsHorizontalIcon className={s.menuIcon} />
		</div>
	);

	const menu = (
		<>
			<div className={s.dropdownMenuTrigger} onClick={handleMenuClick}>
				{currentUser ? userInfo : loggedOutMenuIcon}
			</div>
			{isMenuOpen && (
				<div ref={menuRef}>
					<Menu isLoggedIn={currentUser != null} closeMenu={closeMenu} />
				</div>
			)}
		</>
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
				{isMobileMenuOpen && isMobileWidth && (
					<MobileMenu
						isLoggedIn={currentUser != undefined}
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
