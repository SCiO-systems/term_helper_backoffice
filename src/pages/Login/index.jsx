import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import './styles.css';

const Login = () => {
	const navigate = useNavigate();

	const [value, setValue] = useState('');

	return (
		<div className="login">
			<div className="container">
				<h1>DataScribe</h1>
				<div className="credentials p-card">
					<h3>Login with</h3>
					<Dropdown value={value} options={['Admin', 'User']} onChange={(e) => setValue(e.value)} />
					<Button label="Login" onClick={() => navigate('/SubmittedTerms')} />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Login;
