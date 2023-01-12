import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';
import { AutoComplete } from 'primereact/autocomplete';
import './styles.css';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';

const Table = (props) => {
	const { setSelectedTerm, unchangedTerms } = props;

	const [selectedTerms, setSelectedTerms] = useState(null);
	const [filteredTerms, setFilteredTerms] = useState(null);
	const [terms, setTerms] = useState(unchangedTerms);
	const [value, setValue] = useState(null);
	const [comments, setComments] = useState('');

	const dt = useRef(null); 

	useEffect(
		() => {
			console.log(value);
			if (value) {
				switch (value.label) {
				case 'Units': {
					const newTerms = unchangedTerms.filter((item) => item.category === 'Category 1');
					setTerms([...newTerms]);
					break;
				}
				case 'Crops': {
					const newTerms = unchangedTerms.filter((item) => item.category === 'Category 2');
					setTerms([...newTerms]);
					break;
				}
				default: {
					setTerms(unchangedTerms);
					break;
				}
				}
			}
		}, [value]
	);

	useEffect(
		() => {
			if (!terms.length) {
				setTerms(unchangedTerms);
			}
		}, [terms]
	);

	const submitterTemplate = (data) => {
		return (
			<p>{data.submitter.fullname}</p>
		);
	};

	const actionsTemplate = (data) => {
		return (
			<div className="actions">
				<Button className="review" icon="fa-duotone fa-pen-to-square" tooltip="Review" tooltipOptions={{ position: 'top' }} onClick={() => setSelectedTerm(data)} />
			</div>
		);
	};

	const commentsTemplate = (data) => {
		return (
			<Button className="comments" label="Comments" disabled={!data.comments} onClick={() => setComments(data.comments)} />
		);
	};

	const exportCSV = (selectionOnly) => {
		dt.current.exportCSV({ selectionOnly });
	};

	const header = () => {
		return (
			<div className="flex align-items-center export-buttons">
				<Button
					type="button"
					icon="fa-solid fa-file-csv"
					onClick={() => exportCSV(false)}
					className="mr-2"
					data-pr-tooltip="CSV"
					disabled={!terms}
				/>
			</div>
		);
	};

	const justifyTemplate = (option) => <span><i className={option.icon} /> {option.label}</span>;

	const justifyOptions = [
		{ icon: 'fa-duotone fa-diagram-project', vocabulary: 'term', label: 'Variable/General Terms' },
		{ icon: 'fa-duotone fa-angle-90', vocabulary: 'unit', label: 'Units' },
		{ icon: 'fa-duotone fa-seedling', vocabulary: 'crop', label: 'Crops' },
	];

	const searchCategory = (event) => {
		let newTerms;
		if (!event.query.trim().length) {
			newTerms = [...terms];
		} else {
			newTerms = terms.filter((item) => {
				return item.term.toLowerCase().startsWith(event.query.toLowerCase());
			});
		}

		setFilteredTerms([...newTerms]);
	};

	const updateTerms = (e) => {
		setTerms(e.value);
		setSelectedTerms(e.value);
	};

	return (
		<div className="table-container">
			<div className="table p-card">
				<div className="p-mb-2">
					<SelectButton
						value={value}
						options={justifyOptions}
						onChange={(e) => setValue(e.value)}
						itemTemplate={justifyTemplate}
						optionLabel="label"
					/>
				</div>
				<div className="p-mb-6">
					<div className="p-inputgroup">
						<AutoComplete
							placeholder="Search Terms"
							value={selectedTerms}
							suggestions={filteredTerms}
							completeMethod={searchCategory}
							field="term"
							multiple
							onChange={(e) => updateTerms(e)}
							aria-label="Categories"
						/>
						<Button icon="fa-duotone fa-magnifying-glass" className="p-button-primary" />
					</div>
				</div>
				<DataTable
					ref={dt}
					value={terms}
					responsiveLayout="scroll"
					paginator
					className="p-datatable-customers"
					rows={10}
					paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
					rowsPerPageOptions={[10, 25, 50]}
					rowHover
					emptyMessage="No terms selected."
					resizableColumns
					showGridlines
					header={header}
				>
					<Column field="term" header="Term" />
					<Column field="status" header="Status" />
					<Column field="category" header="Category" />
					<Column body={submitterTemplate} header="Submitter" />
					<Column body={commentsTemplate} header="Comments" />
					<Column body={actionsTemplate} header="Actions" />
				</DataTable>
				<Dialog className="term-actions" header="Reviewer Comments" visible={!!comments} style={{ width: '50vw' }} onHide={() => setComments('')}>
					<InputTextarea value={comments} disabled />
				</Dialog>
			</div>
		</div>
	);
};

export default Table;
