/* eslint-disable max-len */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppSubmenu } from './components';
import './styles.css';

const AppMenu = (props) => {
	const { onMenuClick, model, menuMode, active, mobileMenuActive, onMenuitemClick, onRootMenuitemClick } = props;

	const navigate = useNavigate();

	return (
		<div className="layout-sidebar" role="button" tabIndex="0" onClick={onMenuClick}>
			<div className="logo" role="button" tabIndex="0" onClick={() => navigate('/SubmittedTerms')}>
				<h3 className="app-name">DataScribe</h3>
				<p>Term Helper</p>
			</div>
			<div className="layout-menu-container">
				<AppSubmenu
					items={model}
					menuMode={menuMode}
					parentMenuItemActive
					menuActive={active}
					mobileMenuActive={mobileMenuActive}
					root
					onMenuitemClick={onMenuitemClick}
					onRootMenuitemClick={onRootMenuitemClick}
				/>
			</div>
		</div>
	);
};

export default AppMenu;
