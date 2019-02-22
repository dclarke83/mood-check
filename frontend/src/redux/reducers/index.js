import { combineReducers } from 'redux';
import { snackbarReducer } from 'react-redux-snackbar';
import mood from './mood';

const rootReducer = combineReducers({ mood, snackbar: snackbarReducer });

export default rootReducer;