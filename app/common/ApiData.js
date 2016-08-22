import Api from './Api';

export class MovieData {

    //Top250
    static getTop250(){
        return Api.get('/v2/movie/top250');
    }
    //电影条目信息
    static getMovie(id){
        return Api.get('/v2/movie/subject/'+id);
    }

    //影人条目信息
    static getcelebrity(id){
        return Api.get('/v2/movie/celebrity/'+id);
    }

}