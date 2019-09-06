import { combineReducers } from 'redux';
import notePhrases from './reducers/NotePhrasesReducer';
import emailPhrases from './reducers/EmailPhrasesReducer';

const rootReducer = combineReducers({
	notePhrases: notePhrases,
	emailPhrases: emailPhrases,
});

export default rootReducer;
