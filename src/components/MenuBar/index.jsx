/* eslint-disable max-len */
import React, { useState, useRef, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { useNavigate, Navigate, Route, Routes } from 'react-router-dom';
import { DiamondMenu } from './components';
import { SubmittedTerms, Login } from '../../pages';

const MenuBar = (props) => {
	const { children } = props;
	const navigate = useNavigate();

	const [menuActive, setMenuActive] = useState(false);
	const [menuMode, setMenuMode] = useState('static');
	const [colorScheme, setColorScheme] = useState('light');
	const [menuTheme, setMenuTheme] = useState('layout-sidebar-darkgray');
	const [overlayMenuActive, setOverlayMenuActive] = useState(false);
	const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
	const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
	const [searchActive, setSearchActive] = useState(false);
	const [topbarUserMenuActive, setTopbarUserMenuActive] = useState(false);
	const [topbarNotificationMenuActive, setTopbarNotificationMenuActive] = useState(false);
	const [rightMenuActive, setRightMenuActive] = useState(false);
	const [configActive, setConfigActive] = useState(false);
	const [inputStyle, setInputStyle] = useState('outlined');
	const [ripple, setRipple] = useState(false);
	const [menu, setMenu] = useState();

	let menuClick = false;
	let searchClick = false;
	let userMenuClick = false;
	let notificationMenuClick = false;
	let rightMenuClick = false;
	let configClick = false;

	useEffect(
		() => {
			const temp = [
				{
					label: 'Term Helper',
					items: [
						{
							label: 'Search Term',
							command: () => {
								navigate('/SubmittedTerms');
							},
							icon: 'fa-duotone fa-telescope',
						},
					],
				},
				// { separator: true },
			];
			setMenu([...temp]);
		}, []
	);

	useEffect(() => {
		if (staticMenuMobileActive) {
			blockBodyScroll();
		} else {
			unblockBodyScroll();
		}
	}, [staticMenuMobileActive]);

	const hideOverlayMenu = () => {
		setOverlayMenuActive(false);
		setStaticMenuMobileActive(false);
		unblockBodyScroll();
	};

	const blockBodyScroll = () => {
		if (document.body.classList) {
			document.body.classList.add('blocked-scroll');
		} else {
			document.body.className += ' blocked-scroll';
		}
	};

	const unblockBodyScroll = () => {
		if (document.body.classList) {
			document.body.classList.remove('blocked-scroll');
		} else {
			document.body.className = document.body.className.replace(new RegExp(`(^|\\b)${
				'blocked-scroll'.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
		}
	};

	const onMenuButtonClick = (event) => {
		menuClick = true;
		setTopbarUserMenuActive(false);
		setTopbarNotificationMenuActive(false);
		setRightMenuActive(false);

		if (isOverlay()) {
			setOverlayMenuActive((prevOverlayMenuActive) => !prevOverlayMenuActive);
		}

		if (isDesktop()) {
			setStaticMenuDesktopInactive((prevStaticMenuDesktopInactive) => !prevStaticMenuDesktopInactive);
		} else {
			setStaticMenuMobileActive((prevStaticMenuMobileActive) => !prevStaticMenuMobileActive);
		}

		event.preventDefault();
	};

	const isOverlay = () => menuMode === 'overlay';

	const isDesktop = () => window.innerWidth > 1091;

	const onSearchHide = () => {
		setSearchActive(false);
		searchClick = false;
	};

	const onDocumentClick = () => {
		if (!searchClick && searchActive) {
			onSearchHide();
		}

		if (!userMenuClick) {
			setTopbarUserMenuActive(false);
		}

		if (!notificationMenuClick) {
			setTopbarNotificationMenuActive(false);
		}

		if (!rightMenuClick) {
			setRightMenuActive(false);
		}

		if (!menuClick) {
			if (isSlim() || isHorizontal()) {
				setMenuActive(false);
			}

			if (overlayMenuActive || staticMenuMobileActive) {
				hideOverlayMenu();
			}

			unblockBodyScroll();
		}

		if (configActive && !configClick) {
			setConfigActive(false);
		}

		searchClick = false;
		configClick = false;
		userMenuClick = false;
		rightMenuClick = false;
		notificationMenuClick = false;
		menuClick = false;
	};

	const isSlim = () => menuMode === 'slim';

	const isHorizontal = () => menuMode === 'horizontal';

	const containerClassName = classNames('layout-wrapper',
		{
			'layout-overlay': menuMode === 'overlay',
			'layout-static': menuMode === 'static',
			'layout-slim': menuMode === 'slim',
			'layout-horizontal': menuMode === 'horizontal',
			'layout-sidebar-dim': colorScheme === 'dim',
			'layout-sidebar-dark': colorScheme === 'dark',
			'layout-overlay-active': overlayMenuActive,
			'layout-mobile-active': staticMenuMobileActive,
			'layout-static-inactive': staticMenuDesktopInactive && menuMode === 'static',
			'p-input-filled': inputStyle === 'filled',
			'p-ripple-disabled': !ripple,
		},
		colorScheme === 'light' ? menuTheme : '');
	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div className={containerClassName} data-theme={colorScheme} onClick={onDocumentClick}>
			<div className="layout-content-wrapper">
				<DiamondMenu
					menu={menu}
					menuMode={menuMode}
					menuActive={menuActive}
					staticMenuMobileActive={staticMenuMobileActive}
					onMenuButtonClick={onMenuButtonClick}
				/>
				<div className="layout-content">
					<div className="app">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MenuBar;
