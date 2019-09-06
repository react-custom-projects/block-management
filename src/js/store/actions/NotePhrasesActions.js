import {
	ADD_NOTE_PHRASE,
	DELETE_NOTE_PHRASE,
	EDIT_NOTE_PHRASE,
	HIDE_SAVE_CANCEL_BTNS_NOTE_PHRASES,
	SET_NOTE_PHRASES,
	SHOW_SAVE_CANCEL_BTNS_NOTE_PHRASES,
} from '../actionTypes';

export const setNotePhrases = (phrases) => ({
	type: SET_NOTE_PHRASES,
	phrases: phrases,
});

export const editNotePhrase = (index, value) => ({
	type: EDIT_NOTE_PHRASE,
	index: index,
	value: value,
});

export const deleteNotePhrase = (index) => ({
	type: DELETE_NOTE_PHRASE,
	index: index,
});

export const addNotePhrase = (value) => ({
	type: ADD_NOTE_PHRASE,
	value: value,
});

export const hideSaveCancelBtnsNotePhrases = (index) => ({
	type: HIDE_SAVE_CANCEL_BTNS_NOTE_PHRASES,
	index: index,
});

export const showSaveCancelBtnsNotePhrases = (index) => ({
	type: SHOW_SAVE_CANCEL_BTNS_NOTE_PHRASES,
	index: index,
});
