
import * as types from '../constants/ActionTypes';

const initialState = {
    fetching: true,
    movies: []
};

export function movie(state = initialState, action) {
    switch (action.type) {
        case types.REQUEST_MOVIE_TOP250:
            return Object.assign({}, state, {
                fetching: true,
            });
        case types.RECEIVE_MOVIE_TOP250:
            return Object.assign({}, state, {
                fetching: false,
                movies: action.movies
            });

        default:
            return state;
    }
}


const initialState_movieDetail = {
    fetching: true,
    movie: {}
};
export function movieDetail(state = initialState_movieDetail, action) {
    console.log(action.type);
    switch (action.type){
        case types.REQUEST_MOVIE_DETAIL:
            return Object.assign({},state,{
                fetching:true
            });
        case types.RECEIVE_MOVIE_DETAIL:
            return Object.assign({},state,{
                fetching:false,
                movie:action.movie
            });
        default:
            return state;
    }
}


const initialState_actor = {
    fetching: true,
    actor: {}
};
export function actor(state = initialState_actor, action) {
    switch (action.type){
        case types.REQUEST_ACTOR_DETAIL:
            return Object.assign({},state,{
                fetching:true
            });
        case types.RECEIVE_ACTOR_DETAIL:
            return Object.assign({},state,{
                fetching:false,
                actor:action.actor
            });
        default:
            return state;
    }
}