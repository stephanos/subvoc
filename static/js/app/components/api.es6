import axios from 'axios';


class API {

    static lookupWord(word) {
        return axios.get(`/api/words/${word.token}`);
    }

    static loadAnalysis(imdbId) {
        return axios.get(`/api/analysis/${imdbId}`);
    }

    static searchMovie(query) {
        return axios.get(`/api/search/${query}`);
    }
}


export { API };