import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, ReviewTerm } from './components';
import Footer from '../../components/Footer';
import Actions from '../../reducer/actions';
import './styles.css';
import mockTerms from '../../assets/submitted_terms.json';

const SubmittedTerms = () => {
	const dispatch = useDispatch();

	const currentPage = useSelector((state) => state.currentPage);
	const setCurrentPage = (payload) => dispatch({ type: Actions.SetCurrentPage, payload });

	const [selectedTerm, setSelectedTerm] = useState(null);
	const [unchangedTerms, setUnchangedTerms] = useState(mockTerms);

	return (
		<div className="submitted-terms">
			{selectedTerm ? <ReviewTerm selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} setUnchangedTerms={setUnchangedTerms} unchangedTerms={unchangedTerms} /> : <Table setSelectedTerm={setSelectedTerm} unchangedTerms={unchangedTerms} />}
			<Footer />
		</div>
	);
};

export default SubmittedTerms;
