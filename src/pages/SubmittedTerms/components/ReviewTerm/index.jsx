/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import data from '../../../../assets/submitted_terms.json';
import './styles.css';

const ReviewTerm = (props) => {
	const { selectedTerm, setSelectedTerm, setUnchangedTerms, unchangedTerms } = props;

	const [acceptDialog, setAcceptDialog] = useState(false);
	const [reviewDialog, setReviewDialog] = useState(false);
	const [rejectDialog, setRejectDialog] = useState(false);
	const [comments, setComments] = useState('');
	const [matchingTerms, setMatchingTerms] = useState([]);

	const changeStatus = (status) => {
		const newTerms = [...unchangedTerms];
		const temp = newTerms.find((item) => item._id.$oid === selectedTerm._id.$oid);
		const index = newTerms.findIndex((item) => item._id.$oid === selectedTerm._id.$oid);
		const newValue = { ...temp, status };
		newTerms.splice(index, 1, newValue);
		setUnchangedTerms(newTerms);
	};

	const reviewFooter = () => {
		return (
			<>
				<Button
					label="Send Review"
					onClick={() => {
						setReviewDialog(false);
						setComments('');
						changeStatus('Under Review');
					}}
				/>
				<Button
					label="Cancel"
					onClick={() => {
						setReviewDialog(false);
						setComments('');
					}}
				/>
			</>
		);
	};

	const rejectFooter = () => {
		return (
			<>
				<Button
					label="Send Comments and Reject"
					onClick={() => {
						setRejectDialog(false);
						setComments('');
						changeStatus('Rejected');
					}}
				/>
				<Button
					label="Cancel"
					onClick={() => {
						setRejectDialog(false);
						setComments('');
					}}
				/>
			</>
		);
	};

	const acceptFooter = () => {
		return (
			<>
				<Button
					label="Accept"
					onClick={() => {
						setAcceptDialog(false);
						setMatchingTerms([]);
						changeStatus('Accepted');
					}}
				/>
				<Button
					label="Cancel"
					onClick={() => {
						setAcceptDialog(false);
						setMatchingTerms([]);
					}}
				/>
			</>
		);
	};

	return (
		<div className="review-term-container">
			<div className="review-term p-card">
				<Button className="back" icon="fa-duotone fa-arrow-left" onClick={() => setSelectedTerm(null)} />
				<h5>Submitter:</h5>
				<div>
					<p>Name</p>
					<InputText id="name" value={selectedTerm.submitter.fullname} disabled />
				</div>
				<div>
					<p>Email</p>
					<InputText id="email" value={selectedTerm.submitter.email} disabled />
				</div>
				<h5>Term:</h5>
				<div>
					<p>Term</p>
					<InputText id="term" value={selectedTerm.term} disabled />
				</div>
				<div>
					<p>Description</p>
					<InputText id="description" value={selectedTerm.description} disabled />
				</div>
				{selectedTerm.reference
					? (
						<div>
							<p>Reference</p>
							<InputText id="reference" value={selectedTerm.reference} disabled />
						</div>
					)
					: null
				}
				{selectedTerm.category
					? (
						<div>
							<p>Category</p>
							<InputText id="category" value={selectedTerm.category} disabled />
						</div>
					)
					: null
				}
				<div className="actions">
					<Button className="accept" icon="fa-solid fa-check" tooltip="Accept" tooltipOptions={{ position: 'top' }} onClick={() => setAcceptDialog(true)} />
					<Button className="review" icon="fa-duotone fa-pen-to-square" tooltip="Review" tooltipOptions={{ position: 'top' }} onClick={() => setReviewDialog(true)} />
					<Button className="reject" icon="fa-solid fa-xmark" tooltip="Reject" tooltipOptions={{ position: 'top' }} onClick={() => setRejectDialog(true)} />

				</div>
				<Dialog className="term-actions" header="Accept" visible={acceptDialog} style={{ width: '50vw' }} footer={acceptFooter} onHide={() => setAcceptDialog(false)}>
					<MultiSelect value={matchingTerms} options={data} onChange={(e) => setMatchingTerms(e.value)} optionLabel="term" placeholder="Select matching terms" display="chip" />
				</Dialog>
				<Dialog className="term-actions" header="Review" visible={reviewDialog} style={{ width: '50vw' }} footer={reviewFooter} onHide={() => setReviewDialog(false)}>
					<div>
						<p>Add comments</p>
						<InputTextarea value={comments} onChange={(e) => setComments(e.target.value)} />
					</div>
				</Dialog>
				<Dialog className="term-actions" header="Reject" visible={rejectDialog} style={{ width: '50vw' }} footer={rejectFooter} onHide={() => setRejectDialog(false)}>
					<div>
						<p>Add comments</p>
						<InputTextarea value={comments} onChange={(e) => setComments(e.target.value)} />
					</div>
				</Dialog>
			</div>
		</div>
	);
};

export default ReviewTerm;
