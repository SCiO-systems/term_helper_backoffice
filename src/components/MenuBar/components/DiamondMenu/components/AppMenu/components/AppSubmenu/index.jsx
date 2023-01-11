/* eslint-disable max-len,no-nested-ternary */
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { classNames } from 'primereact/utils';
import { Ripple } from 'primereact/ripple';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import './styles.css';

const AppSubmenu = (props) => {
	const { root, onRootMenuitemClick, onMenuitemClick, menuActive, menuMode, items, mobileMenuActive } = props;

	const [activeIndex, setActiveIndex] = useState(null);

	const onMenuItemClick = (event, item, index) => {
		if (item.disabled) {
			event.preventDefault();
			return;
		}
		// execute command
		if (item.command) {
			item.command({ originalEvent: event, item });
			event.preventDefault();
		}
		if (item.items) {
			event.preventDefault();
		}
		if (root) {
			onRootMenuitemClick({
				originalEvent: event,
			});
		}
		if (item.items) {
			setActiveIndex(index === activeIndex ? null : index);
		}

		onMenuitemClick({
			originalEvent: event,
			item,
		});
	};

	const onMenuItemMouseEnter = (index) => {
		if (root && menuActive && (menuMode === 'slim' || menuMode === 'horizontal') && !isMobile()) {
			setActiveIndex(index);
		}
	};

	const visible = (item) => (typeof item.visible === 'function' ? item.visible() : item.visible !== false);

	const isMobile = () => window.innerWidth <= 1091;

	const isSlim = useCallback(() => menuMode === 'slim', [menuMode]);

	const isHorizontal = useCallback(() => menuMode === 'horizontal', [menuMode]);

	const getLink = (item, index) => {
		const menuitemIconClassName = classNames('layout-menuitem-icon', item.icon);
		const content = (
			<>
				{/* <Button icon={menuitemIconClassName} label={item.label} /> */}
				<i className={menuitemIconClassName} />
				<span className="layout-menuitem-text">{item.label}</span>
				{ item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler" />}
				{ item.badge && <Badge value={item.badge} style={{ height: '100%' }} />}
				<Ripple />
			</>
		);
		const commonLinkProps = {
			style: item.style,
			className: classNames(item.className, 'p-button p-ripple', { 'p-disabled': item.disabled, 'p-link': !item.to }),
			target: item.target,
			onClick: (e) => onMenuItemClick(e, item, index),
			onMouseEnter: () => onMenuItemMouseEnter(index),
			disabled: item.disabled,
		};

		if (item.url) {
			return <a href={item.url} rel="noopener noreferrer" {...commonLinkProps}>{content}</a>;
		}
		if (!item.to) {
			return <button type="button" {...commonLinkProps}>{content}</button>;
		}
		return <Link to={item.to} exact activeClassName="active-route" {...commonLinkProps}>{content}</Link>;
	};

	const isMenuActive = (item, index) => item.items && (root && (!isSlim() || (isSlim() && (mobileMenuActive || activeIndex !== null))) ? true : activeIndex === index);

	const getItems = () => {
		const transitionTimeout = mobileMenuActive ? 0 : (isSlim() && root ? { enter: 400, exit: 400 } : (root ? 0 : { enter: 1000, exit: 450 }));
		return items.map((item, i) => {
			if (visible(item)) {
				if (!item.separator) {
					const menuitemClassName = classNames({ 'layout-root-menuitem': root, 'active-menuitem': activeIndex === i && !item.disabled });
					const link = getLink(item, i);
					const rootMenuItem = root && (
						<div className="layout-root-menuitem">
							<div className="layout-menuitem-root-text" style={{ textTransform: 'uppercase' }}>{item.label}</div>
						</div>
					);

					return (
						<li key={item.label || i} className={menuitemClassName} role="menuitem">
							{link}
							{rootMenuItem}
							<CSSTransition classNames="layout-menu" timeout={transitionTimeout} in={isMenuActive(item, i)} unmountOnExit>
								<AppSubmenu items={visible(item) && item.items} menuActive={menuActive} menuMode={menuMode} parentMenuItemActive={activeIndex === i} onMenuitemClick={onMenuitemClick} />
							</CSSTransition>
						</li>
					);
				}

				// eslint-disable-next-line react/no-array-index-key
				return <li className="menu-separator" style={item.style} key={`separator${i}`} role="separator" />;
			}

			return null;
		});
	};

	useEffect(() => {
		if (!menuActive && isSlim()) {
			setActiveIndex(null);
		}
	}, [menuActive, isSlim]);

	useEffect(() => {
		if (!menuActive && isHorizontal()) {
			setActiveIndex(null);
		}
	}, [menuActive, isHorizontal]);

	if (!items) {
		return null;
	}

	const allItems = getItems();
	return (
		<ul className="layout-menu" role="menu">
			{allItems}
		</ul>
	);
};

export default AppSubmenu;
