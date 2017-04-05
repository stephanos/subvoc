class API {

    static lookupWord(word) {
        return $.getJSON({
            url: `/api/words/${word.token}`,
            error: function (xhr, status, err) {
                console.error(err); // eslint-disable-line
            },
        });
    }

    static loadAnalysis(imdbId) {
        return $.getJSON({
            url: `/api/analysis/${imdbId}`,
            error: function (xhr, status, err) {
                console.error(err); // eslint-disable-line
            },
        });
    }

    static searchMovie(query) {
        return $.getJSON({
            url: `/api/search/${query}`,
            error: function (xhr, status, err) {
                console.error(err); // eslint-disable-line
            },
        });
    }    
}


export { API }