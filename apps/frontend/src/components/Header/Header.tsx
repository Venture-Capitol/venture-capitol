import { AuthContext, AuthUI, User } from "@vc/auth";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import wordmarkIcon from "../../assets/wordmark.svg";
import emblemIcon from "../../assets/emblem.svg";
import mobileMenuOpenIcon from "../../assets/menu-open.svg";
import mobileMenuCloseIcon from "../../assets/menu-close.svg";
import userPicturePlaceholder from "../../assets/userPicturePlaceholder.svg";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import * as DropdownMenuTemplate from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { Link, NavLink } from "react-router-dom";

const Header: FC = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<Boolean>(false);
	const [isMenuOpen, setIsMenuOpen] = useState<Boolean>(false);
	const currentUser = useContext<User | null>(AuthContext);
	const ref = useRef<HTMLDivElement>();

	useEffect(() => {
		const checkIfClickedOutside = (e: any) => {
			if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener("click", checkIfClickedOutside);

		return () => {
			document.removeEventListener("click", checkIfClickedOutside);
		};
	}, [isMenuOpen]);

	useEffect(() => {
		if (currentUser == null) {
			setIsMenuOpen(false);
		}
	}, [currentUser]);

	const userPanel = (
		<React.Fragment>
			<DropdownMenuTemplate.Root>
				<DropdownMenuTemplate.Trigger className={styles.dropdownMenuTrigger}>
					<div
						className={styles.userPanel}
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						<div className={styles.userName}>{currentUser?.displayName}</div>

						<Avatar className={styles.avatar}>
							<AvatarImage
								className={styles.avatarImage}
								src={currentUser?.photoURL ? currentUser?.photoURL : ""}
							></AvatarImage>
							<AvatarFallback className={styles.avatarFallback} delayMs={600}>
								{currentUser &&
									(currentUser.displayName || " ")
										.split(" ")
										.map(n => n[0])
										.join("")}
							</AvatarFallback>
						</Avatar>
					</div>
				</DropdownMenuTemplate.Trigger>
				<DropdownMenu />
			</DropdownMenuTemplate.Root>
		</React.Fragment>
	);
	return (
		<div className={styles.header} ref={ref as React.RefObject<HTMLDivElement>}>
			<div className={styles.logo}>
				<img className={styles.emblem} src={emblemIcon} alt='emblem' />
				<img className={styles.wordmark} src={wordmarkIcon} alt='wordmark' />
			</div>

			<div className={styles.navContent}>
				<NavLink
					to='gruendung'
					className={isActive =>
						styles.navLink + (isActive ? " " + styles.selected : "")
					}
				>
					Meine Gründung
				</NavLink>
				<NavLink
					to='unternehmensregister'
					className={isActive =>
						styles.navLink + (isActive ? " " + styles.selected : "")
					}
				>
					Unternehmensregister
				</NavLink>
			</div>
			<div className={styles.userPanelWrapper}>
				{currentUser ? userPanel : <AuthUI />}
			</div>

			<div
				className={styles.menuIconWrapper}
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
			>
				<img
					src={isMobileMenuOpen ? mobileMenuCloseIcon : mobileMenuOpenIcon}
					className={styles.menuIcon}
				></img>
			</div>
		</div>
	);
};

export default Header;
