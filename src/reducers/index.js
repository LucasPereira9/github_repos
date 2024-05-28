import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  modal: modalReducer
});

export default rootReducer;