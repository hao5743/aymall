import Local from './Local';

export default class Api {

    // static baseUrl = 'https://www.meeshol.com/api';
    static baseUrl = 'https://api.douban.com';

    static headers= {
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json'
    };

    static get(url, params){
        let myUrl = this.baseUrl+url;
        //根据参数拼接url,一般只有get具有query，其它一般没有
        if (params) {
            let paramsArray = [];
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
            if (myUrl.search(/\?/) === -1) {
                myUrl += '?' + paramsArray.join('&')
            } else {
                myUrl += '&' + paramsArray.join('&')
            }
        }
        return Api.makeRequest('get',myUrl);
    }

    static post(url,body){
        return Api.makeRequest('post',this.baseUrl+url, body);
    }

    static put(url,body){
        return Api.makeRequest('put',this.baseUrl+url, body);
    }

    static delete(url, body){
        return Api.makeRequest('delete',this.baseUrl+url, body);
    }

    static makeRequest(reqType, url, data){
        let myHeaders = new Headers(Api.headers);
        let myInit = {
            method:reqType,
            headers:myHeaders,
            cache:'default',
        };
        if(data){
            myInit.body=JSON.stringify(data);
        }

        return fetch(url, myInit)
                .then((response) => {
                    if(response.ok) {
                        return response.json();
                    } else {
                        console.warn('Network Response Was Not Ok.');
                    }
                })
                .then((responseJson)=> {
                    //这里做自己服务器约定的错误处理，比如参数格式不对、
                    // 个数不对等，可以返回信息，但并未返回正确信息
                    return responseJson;
                })
                .catch((error) => {
                    console.warn('Fetch Operation Error.' +error.message);
                });
    }

}