import React from 'react';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import MenuBar from './components/MenuBar';
import './App.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fortawesome/fontawesome-pro/css/all.css';
import '@fortawesome/fontawesome-pro/css/fontawesome.css';
import { Login, SubmittedTerms } from './pages';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Navigate replace to="/Login" />} />
				<Route path="/Login" element={<Login />} />
				<Route
					path="/SubmittedTerms"
					element={(
						<MenuBar>
							<SubmittedTerms />
						</MenuBar>
					)}
				/>
			</Routes>
		</Router>
	);
};

export default App;
