const PAGE = {
    analytics: new RegExp('/m/(\\w+)'),
    search: '/',
    word: new RegExp('/m/(\\w+)/w/(\\w+)'),
};


const TITLE_SUFFIX = ' | subvoc';

let HISTORY;
function history() {
    if (!HISTORY) {
        HISTORY = window.History.createBrowserHistory();
    }
    return HISTORY;
}


class Router {

    static getState(path = location.pathname) {
        const wordRouteMatch = path.match(PAGE.word);
        if (wordRouteMatch) {
            return { movieId: wordRouteMatch[1], word: wordRouteMatch[2] };
        }

        const analysisRouteMatch = path.match(PAGE.analytics);
        if (analysisRouteMatch) {
            return { movieId: analysisRouteMatch[1] };
        }

        return {};
    }

    static onAnalysisPage(movie) {
        const title = movie.title ? `${movie.title}` : 'Analysis';
        document.title = title + TITLE_SUFFIX;
        
        const path = `/m/${movie.id}`;
        if (path !== location.pathname) {
            history().push(path);
        }
    }

    static onWordPage(movie, word) {
        const title = word ? `${word}` : 'Details';
        document.title = title + TITLE_SUFFIX;
        
        const path = `/m/${movie.id}/w/${word}`;
        if (path !== location.pathname) {
            history().push(path);
        }
    }

    static onUrlChange(callback) {
        history().listen(callback);
    } 
}


export { Router };