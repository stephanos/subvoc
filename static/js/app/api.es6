import axios from 'axios';


const CancelToken = axios.CancelToken;


function cancelableGet(url) {
    const source = CancelToken.source();
    
    const result = {
        promise: axios.get(url, {
            cancelToken: source.token
        }),
        cancel: () => { source.cancel(); }
    };

    result.then = (fn) => {
        result.promise = result.promise.then(fn);
        return result;
    };
    result.catch = (fn) => {
        result.promise = result.promise.catch(fn);
        return result;
    };
    
    return result;
}


class API {

    static isCancel(err) {
        return axios.isCancel(err);
    }

    static lookupWord(word) {
        return cancelableGet(`/api/words/${word}`);
    }

    static loadAnalysis(imdbId) {
        return cancelableGet(`/api/analysis/${imdbId}`);
    }

    static searchMovie(query) {
        return cancelableGet(`/api/search/${query}`);
    }
}


export { API };