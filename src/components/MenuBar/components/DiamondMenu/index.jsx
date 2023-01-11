/* eslint-disable max-len */
import React, { useState } from 'react';
import { AppMenu } from './components';
import './styles.css';

const AppTopbar = (props) => {
	const {
		onMenuButtonClick,
		menu,
		menuMode,
		menuActive,
		staticMenuMobileActive,
		onMenuClick,
		onMenuitemClick,
		onRootMenuitemClick,
	} = props;

	const [languageValue, setLanguageValue] = useState('English');

	const options = [
		'Farmer',
		// 'Extension Worker',
		'Researcher',
		'High Level Decision Maker',
		// 'Value Chain Actor',
	];

	return (
		<div className="layout-topbar">
			<AppMenu
				model={menu}
				menuMode={menuMode}
				active={menuActive}
				mobileMenuActive={staticMenuMobileActive}
				onMenuClick={onMenuClick}
				onMenuitemClick={onMenuitemClick}
				onRootMenuitemClick={onRootMenuitemClick}
			/>
			<div className="layout-mask modal-in" />
			<div className="topbar-right">
				<ul className="topbar-menu">
					<button type="button" className="menu-button p-link" onClick={onMenuButtonClick}>
						<i className="pi pi-chevron-left" />
					</button>
					<span className="topbar-separator" />
					<span className="subtitle">SEARCH TERM</span>
				</ul>
			</div>
		</div>
	);
};

export default AppTopbar;
