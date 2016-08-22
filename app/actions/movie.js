
import * as types from '../constants/ActionTypes';
import {MovieData} from '../common/ApiData'

export function fetchMovieLists() {
    return dispatch => {
        dispatch(requestMovieLists());
        return MovieData.getTop250()
            .then((res) => {
                dispatch(receiveMovieLists(res.subjects));
            })
            .catch((error) => {
                dispatch(receiveMovieLists([]));
                console.warn('Get movie top 250 Error:'+error);
            })
    }
}

function requestMovieLists() {
    return {
        type: types.REQUEST_MOVIE_TOP250,
    }
}

function receiveMovieLists(movies) {
    return {
        type: types.RECEIVE_MOVIE_TOP250,
        movies
    }
}


export function fetchMovie(id) {
    return dispatch => {
        dispatch(requestMovie());
        return MovieData.getMovie(id)
            .then((res) => {
                dispatch(receiveMovie(res));
            })
            .catch((error) => {
                dispatch(receiveMovie({}));
                console.warn('Get movieDetail err:'+error);
            })
    }
}


function requestMovie() {
    return {
        type: types.REQUEST_MOVIE_DETAIL
    }
}

function receiveMovie(movie) {
    return {
        type: types.RECEIVE_MOVIE_DETAIL,
        movie
    }
}


export function fetchActor(id) {
    return dispatch => {
        dispatch(requestActor());
        return MovieData.getcelebrity(id)
            .then((res) => {
                dispatch(receiveActor(res));
            })
            .catch((error) => {
                dispatch(receiveActor({}));
                console.warn('Get movieDetail err:'+error);
            })
    }
}


function requestActor() {
    return {
        type: types.REQUEST_ACTOR_DETAIL
    }
}

function receiveActor(actor) {
    return {
        type: types.RECEIVE_ACTOR_DETAIL,
        actor
    }
}