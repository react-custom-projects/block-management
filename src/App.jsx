import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
//axios
import axios from 'axios';
//mateiral UI
import { withStyles } from '@material-ui/core';
//selectors
import {
	getEditingEmailPhrases,
	getEmailPhrases,
} from './js/store/selectors/EmailPhrasesSelectors';
import { getEditingNotePhrases, getNotePhrases } from './js/store/selectors/NotePhrasesSelectors';
//actions
import {
	addEmailPhrase,
	deleteEmailPhrase,
	editEmailPhrase,
	hideSaveCancelBtnsEmailPhrases,
	setEmailPhrases,
	showSaveCancelBtnsEmailPhrases,
} from './js/store/actions/EmailPhrasesActions';
import {
	addNotePhrase,
	deleteNotePhrase,
	editNotePhrase,
	hideSaveCancelBtnsNotePhrases,
	setNotePhrases,
	showSaveCancelBtnsNotePhrases,
} from './js/store/actions/NotePhrasesActions';
//constants
import { quickPhrasesApiUrl } from './js/constants/ApiUrls';
//components
import AsyncLoaderQuickPhrases from './js/components/AsyncLoaderQuickPhrases';
import EntriesBlockManagement from './js/components/BlockManagement/EntriesBlockManagement';
import { white } from './js/constants/Colors';

const styles = (theme) => ({
	container: {
		width: 'calc(100% - 2rem)',
		maxWidth: 900,
		margin: '40px auto',
	},
	error: {
		backgroundColor: white,
		margin: 0,
		border: '1px solid #ddd',
		padding: 15,
	},
});

class App extends Component {
	state = {
		isFetchingData: false,
		isFetchDataError: false,
	};

	// note
	noteBlock = null;
	clickedNoteElement = null;
	currentNoteIndex = null;

	//email
	emailBlock = null;
	clickedEmailElement = null;
	currentEmailIndex = null;

	componentDidMount() {
		const { dispatch, emailPhrases } = this.props;
		if (!(emailPhrases.length > 0)) {
			this.setState({ isFetchingData: true });
			axios
				.get(quickPhrasesApiUrl)
				.then((res) => {
					if (res.data) {
						this.setState({ isFetchingData: false });
						let notePhrases = [],
							emailPhrases = [];
						res.data.forEach((el) => {
							if (el.type === 'note') {
								notePhrases.push(el);
							} else if (el.type === 'email') {
								emailPhrases.push(el);
							}
						});
						dispatch(setEmailPhrases(emailPhrases));
						dispatch(setNotePhrases(notePhrases));
					}
				})
				.catch((err) => {
					this.setState({ isFetchDataError: true, isFetchingData: false });
				});
		}
		document.body.addEventListener('click', this.handleAutoHide);
	}

	//get the ref of the note wrapper
	getNoteWrapperRef = (ref) => {
		this.noteBlock = ref;
	};

	//get the ref of the clicked note phrase
	getClickedNoteElement = (ref) => {
		this.clickedNoteElement = ref;
	};

	//get current note phrase index
	getCurrentNoteIndex = (index) => {
		this.currentNoteIndex = index;
	};

	//hide save & cancel buttons for note phrases
	hideNoteSaveCancelBtns = (index) => {
		const { dispatch } = this.props;
		dispatch(hideSaveCancelBtnsNotePhrases(index));
	};

	//get the ref of the email wrapper
	getEmailWrapperRef = (wrapperRef) => {
		this.emailBlock = wrapperRef;
	};

	//get the ref of the clicked email phrase
	getClickedEmailElement = (ref) => {
		this.clickedEmailElement = ref;
	};

	//get current email phrase index
	getCurrentEmailIndex = (index) => {
		this.currentEmailIndex = index;
	};

	//hide save & cancel buttons for email phrases
	hideEmailSaveCancelBtns = (index) => {
		const { dispatch } = this.props;
		dispatch(hideSaveCancelBtnsEmailPhrases(index));
	};

	//auto hide save & cancel buttons if click away from an entry
	handleAutoHide = (e) => {
		if (this.noteBlock) {
			//click inside note block
			if (this.noteBlock.current.contains(e.target) && this.clickedNoteElement) {
				if (this.clickedNoteElement.current.contains(e.target)) {
					return;
				}
			}
			this.hideNoteSaveCancelBtns(this.currentNoteIndex);
		}
		if (this.emailBlock) {
			//click inside email block
			if (this.emailBlock.current.contains(e.target) && this.clickedEmailElement) {
				if (this.clickedEmailElement.current.contains(e.target)) {
					return;
				}
			}
			this.hideEmailSaveCancelBtns(this.currentEmailIndex);
		}
	};

	render() {
		const { isFetchingData, isFetchDataError } = this.state,
			{
				notePhrases,
				isEditingNotePhrases,
				emailPhrases,
				isEditingEmailPhrases,
				classes,
			} = this.props;
		return (
			<div className={classes.container}>
				{isFetchingData && (
					<div className="loaders-wrapper">
						<AsyncLoaderQuickPhrases />
						<AsyncLoaderQuickPhrases />
						<AsyncLoaderQuickPhrases />
						<AsyncLoaderQuickPhrases />
						<AsyncLoaderQuickPhrases />
						<AsyncLoaderQuickPhrases />
						<AsyncLoaderQuickPhrases />
					</div>
				)}
				{!isFetchDataError && !isFetchingData && (
					<Fragment>
						<EntriesBlockManagement
							entriesList={notePhrases}
							propertyName="phrase"
							wrapperTitle="Quick Phrases For Notes"
							wrapperBtnLabel="add phrase"
							getWrapperRef={this.getNoteWrapperRef}
							addEntry={addNotePhrase}
							editEntryPhrase={editNotePhrase}
							deleteEntry={deleteNotePhrase}
							showSaveCancelBtnsEntry={showSaveCancelBtnsNotePhrases}
							hideSaveCancelBtnsEntry={hideSaveCancelBtnsNotePhrases}
							isEditingEntry={isEditingNotePhrases}
							getCurrentEntryIndex={this.getCurrentNoteIndex}
							getClickedEntry={this.getClickedNoteElement}
						/>
						<EntriesBlockManagement
							entriesList={emailPhrases}
							propertyName="phrase"
							wrapperTitle="Quick Phrases For Emails"
							wrapperBtnLabel="add phrase"
							getWrapperRef={this.getEmailWrapperRef}
							addEntry={addEmailPhrase}
							editEntryPhrase={editEmailPhrase}
							deleteEntry={deleteEmailPhrase}
							showSaveCancelBtnsEntry={showSaveCancelBtnsEmailPhrases}
							hideSaveCancelBtnsEntry={hideSaveCancelBtnsEmailPhrases}
							isEditingEntry={isEditingEmailPhrases}
							getCurrentEntryIndex={this.getCurrentEmailIndex}
							getClickedEntry={this.getClickedEmailElement}
						/>
					</Fragment>
				)}
				{isFetchDataError && <p className={classes.error}>Error occurred while fetching data</p>}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	notePhrases: getNotePhrases({ state }),
	isEditingNotePhrases: getEditingNotePhrases({ state }),
	emailPhrases: getEmailPhrases({ state }),
	isEditingEmailPhrases: getEditingEmailPhrases({ state }),
});

export default connect(mapStateToProps)(withStyles(styles)(hot(App)));
