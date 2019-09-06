import {
	ADD_EMAIL_PHRASE,
	DELETE_EMAIL_PHRASE,
	EDIT_EMAIL_PHRASE,
	HIDE_SAVE_CANCEL_BTNS_EMAIL_PHRASES,
	SET_EMAIL_PHRASES,
	SHOW_SAVE_CANCEL_BTNS_EMAIL_PHRASES,
} from '../actionTypes';

export const setEmailPhrases = (phrases) => ({
	type: SET_EMAIL_PHRASES,
	phrases: phrases,
});

export const editEmailPhrase = (index, value) => ({
	type: EDIT_EMAIL_PHRASE,
	index: index,
	value: value,
});

export const deleteEmailPhrase = (index) => ({
	type: DELETE_EMAIL_PHRASE,
	index: index,
});

export const addEmailPhrase = (value) => ({
	type: ADD_EMAIL_PHRASE,
	value: value,
});

export const hideSaveCancelBtnsEmailPhrases = (index) => ({
	type: HIDE_SAVE_CANCEL_BTNS_EMAIL_PHRASES,
	index: index,
});

export const showSaveCancelBtnsEmailPhrases = (index) => ({
	type: SHOW_SAVE_CANCEL_BTNS_EMAIL_PHRASES,
	index: index,
});
