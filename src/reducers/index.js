import { combineReducers } from 'redux';
import { moviesReducer } from './movies_reducer';

export default combineReducers({
  movies: moviesReducer
});
