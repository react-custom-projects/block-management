import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//components
import EditableEntriesWrapper from './EditableEntriesWrapper';
import EditableEntry from './EditableEntry';

class EntriesBlockManagement extends Component {
	//delete a phrase
	deletePhrase = (index) => {
		const { dispatch, getClickedEntry, deleteEntry } = this.props;
		dispatch(deleteEntry(index));
		getClickedEntry(null);
	};

	//array of action buttons for each entry
	buttons = [{ color: 'secondary', label: '- delete', click: this.deletePhrase }];

	//get the ref of the wrapper component
	getWrapperRef = (wrapperRef) => {
		const { getWrapperRef } = this.props;
		getWrapperRef(wrapperRef);
	};

	//show save & cancel buttons
	showSaveCancelBtns = (index, domElement) => {
		const { dispatch, getCurrentEntryIndex, getClickedEntry, showSaveCancelBtnsEntry } = this.props;

		getClickedEntry(domElement);
		getCurrentEntryIndex(index);

		dispatch(showSaveCancelBtnsEntry(index, domElement));
	};

	//hide save & cancel buttons
	hideSaveCancelBtns = (index) => {
		const { dispatch, hideSaveCancelBtnsEntry } = this.props;
		dispatch(hideSaveCancelBtnsEntry(index));
	};

	//edit the value of a phrase
	editPhrase = (index, value) => {
		const { dispatch, editEntryPhrase } = this.props;
		dispatch(editEntryPhrase(index, value));
	};

	//save a phrase
	savePhrase = (index) => {
		const { entriesList, propertyName } = this.props;
		console.log('saving entry: ', index);
		console.log('value is: ', entriesList[index][propertyName]);
	};

	//add new phrase
	addPhrase = () => {
		const { dispatch, addEntry } = this.props;
		dispatch(addEntry());
	};

	render() {
		const { isEditingEntry, entriesList, wrapperTitle, wrapperBtnLabel, propertyName } = this.props;
		return (
			<Fragment>
				<EditableEntriesWrapper
					title={wrapperTitle}
					label={wrapperBtnLabel}
					click={this.addPhrase}
					getWrapperRef={this.getWrapperRef}
				>
					{entriesList.map((el, i) => (
						<EditableEntry
							key={i}
							entryText={el[propertyName]}
							buttons={this.buttons}
							isEditing={isEditingEntry[i]}
							index={i}
							hideSaveCancelBtns={this.hideSaveCancelBtns}
							showSaveCancelBtns={this.showSaveCancelBtns}
							editInput={this.editPhrase}
							saveEntry={this.savePhrase}
						/>
					))}
				</EditableEntriesWrapper>
			</Fragment>
		);
	}
}

EntriesBlockManagement.propTypes = {
	entriesList: PropTypes.array,
	propertyName: PropTypes.string,
	wrapperTitle: PropTypes.string,
	wrapperBtnLabel: PropTypes.string,
	getWrapperRef: PropTypes.func,
	addEntry: PropTypes.func,
	editEntryPhrase: PropTypes.func,
	deleteEntry: PropTypes.func,
	showSaveCancelBtnsEntry: PropTypes.func,
	hideSaveCancelBtnsEntry: PropTypes.func,
	isEditingEntry: PropTypes.array,
	getCurrentEntryIndex: PropTypes.func,
	getClickedEntry: PropTypes.func,
};

export default connect()(EntriesBlockManagement);
/*component properties explanation:
 * entriesList => array of data
 * propertyName => the property which you want to display to each entry
 * wrapperTitle => title of the given block
 * wrapperBtnLabel => label of the wrapper btn
 * getWrapperRef => function which returns the wrapper ref
 * addEntry => function to add entry
 * editEntryPhrase => function to edit entry
 * deleteEntry => function to delete entry
 * showSaveCancelBtnsEntry => function used to show the save & cancel buttons
 * hideSaveCancelBtnsEntry => function used to hide the save & cancel buttons
 * isEditingEntry => boolean detects whether we are editing an entry or not
 * getCurrentEntryIndex => function which returns the current entry index
 * getClickedEntry => function which returns the ref of the clicked entry
 */
