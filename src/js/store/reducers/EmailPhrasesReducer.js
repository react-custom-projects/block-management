import { updateObject } from '../utility';
import {
	ADD_EMAIL_PHRASE,
	DELETE_EMAIL_PHRASE,
	EDIT_EMAIL_PHRASE,
	HIDE_SAVE_CANCEL_BTNS_EMAIL_PHRASES,
	SET_EMAIL_PHRASES,
	SHOW_SAVE_CANCEL_BTNS_EMAIL_PHRASES,
} from '../actionTypes';
import { cloneDeep } from 'lodash';

const initialState = {
	editingEmailPhrases: [],
	emailPhrases: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_EMAIL_PHRASES:
			return updateObject(state, { emailPhrases: action.phrases });
		case EDIT_EMAIL_PHRASE: {
			const updatedEmailPhrases = cloneDeep(state.emailPhrases);
			updatedEmailPhrases[action.index].phrase = action.value;
			return updateObject(state, { emailPhrases: updatedEmailPhrases });
		}
		case DELETE_EMAIL_PHRASE: {
			const updateEmailPhrase = state.emailPhrases.filter((el, index) => index !== action.index);
			return updateObject(state, { emailPhrases: updateEmailPhrase });
		}
		case ADD_EMAIL_PHRASE: {
			const updatedEmailPhrases = cloneDeep(state.emailPhrases);
			updatedEmailPhrases.push({
				id: Math.floor(Math.random() * (500 - 300) + 300),
				phrase: action.value,
				type: 'email',
				created_by: Math.floor(Math.random() * (500 - 300) + 300),
				created_at: new Date(),
				updated_at: null,
			});
			return updateObject(state, { emailPhrases: updatedEmailPhrases });
		}
		case HIDE_SAVE_CANCEL_BTNS_EMAIL_PHRASES: {
			const isEditing = [...state.editingEmailPhrases];
			isEditing[action.index] = false;
			return updateObject(state, { editingEmailPhrases: isEditing });
		}
		case SHOW_SAVE_CANCEL_BTNS_EMAIL_PHRASES: {
			let isEditing = [...state.editingEmailPhrases];
			isEditing = isEditing.map((el) => {
				el = false;
				return el;
			});
			isEditing[action.index] = true;
			return updateObject(state, {
				editingEmailPhrases: isEditing,
			});
		}
		default:
			return state;
	}
};

export default reducer;
