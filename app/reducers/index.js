
import {combineReducers} from 'redux';
import {movie,movieDetail,actor} from './movie';

const rootReducer = combineReducers({
    movieDetail,
    movie,
    actor

});

export default rootReducer;