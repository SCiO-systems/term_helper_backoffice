import React from 'react';
import logo from '../../assets/SCiO-sLogo-Dark.png';
import './styles.css';

const Footer = () => {
	return (
		<div className="footer">
			<div className="licenses">
				<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noreferrer">
					<i className="fa-brands fa-creative-commons" />
					<i className="fa-brands fa-creative-commons-by" />
					<i className="fa-brands fa-creative-commons-nc" />
					<i className="fa-brands fa-creative-commons-sa" />
				</a>
				{/* <Button icon="fa-brands fa-creative-commons" /> */}
				{/* <Button icon="fa-brands fa-creative-commons-by" /> */}
				{/* <Button icon="fa-brands fa-creative-commons-nc" /> */}
				{/* <Button icon="fa-brands fa-creative-commons-sa" /> */}
			</div>
			<div className="logo">
				<p>powered by</p>
				<a href="https://scio.systems/" target="_blank" rel="noreferrer">
					<img src={logo} />
				</a>
			</div>
		</div>
	);
};

export default Footer;
