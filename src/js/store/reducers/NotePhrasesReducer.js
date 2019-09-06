import { updateObject } from '../utility';
import {
	ADD_NOTE_PHRASE,
	DELETE_NOTE_PHRASE,
	EDIT_NOTE_PHRASE,
	HIDE_SAVE_CANCEL_BTNS_NOTE_PHRASES,
	SET_NOTE_PHRASES,
	SHOW_SAVE_CANCEL_BTNS_NOTE_PHRASES,
} from '../actionTypes';
import { cloneDeep } from 'lodash';

const initialState = {
	editingNotePhrases: [],
	notePhrases: [],
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_NOTE_PHRASES:
			return updateObject(state, { notePhrases: action.phrases });
		case EDIT_NOTE_PHRASE: {
			const updatedNotePhrases = cloneDeep(state.notePhrases);
			updatedNotePhrases[action.index].phrase = action.value;
			return updateObject(state, { notePhrases: updatedNotePhrases });
		}
		case DELETE_NOTE_PHRASE: {
			const updateNotePhrase = state.notePhrases.filter((el, index) => index !== action.index);
			return updateObject(state, { notePhrases: updateNotePhrase });
		}
		case ADD_NOTE_PHRASE: {
			const updatedNotePhrases = cloneDeep(state.notePhrases);
			updatedNotePhrases.push({
				id: Math.floor(Math.random() * (500 - 300) + 300),
				phrase: action.value,
				type: 'note',
				created_by: Math.floor(Math.random() * (500 - 300) + 300),
				created_at: new Date(),
				updated_at: null,
			});
			return updateObject(state, { notePhrases: updatedNotePhrases });
		}
		case HIDE_SAVE_CANCEL_BTNS_NOTE_PHRASES: {
			const isEditing = [...state.editingNotePhrases];
			isEditing[action.index] = false;
			return updateObject(state, { editingNotePhrases: isEditing });
		}
		case SHOW_SAVE_CANCEL_BTNS_NOTE_PHRASES: {
			let isEditing = [...state.editingNotePhrases];
			isEditing = isEditing.map((el) => {
				el = false;
				return el;
			});
			isEditing[action.index] = true;
			return updateObject(state, {
				editingNotePhrases: isEditing,
			});
		}
		default:
			return state;
	}
};

export default reducer;
