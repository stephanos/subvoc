const Page = {
    ANALYTICS: new RegExp('/analysis/(\\w+)'),
    SEARCH: '/',
    WORD: new RegExp('/analysis/(\\w+)/word/(\\w+)'),
};


class Router {

    static getPage(path) {
        const wordRouteMatch = path.match(Page.WORD);
        if (wordRouteMatch) {
            return { movieId: wordRouteMatch[1], word: wordRouteMatch[2] };
        }

        const analysisRouteMatch = path.match(Page.ANALYTICS);
        if (analysisRouteMatch) {
            return { movieId: analysisRouteMatch[1] };
        }

        return {};
    }

    static onAnalysisPage(movie) {
        const title = movie.title ? `Analysis: ${movie.title}` : 'Analysis';
        const path = `/analysis/${movie.id}`;
        if (path === location.pathname) {
            document.title = title;
        } else {
            history.pushState(null, title, path);
        }
    }

    static onWordPage(movie, word) {
        const title = word ? `${word}` : 'Details';
        const path = `/analysis/${movie.id}/word/${word}`;
        if (path === location.pathname) {
            document.title = title;
        } else {
            history.pushState(null, title, path);
        }
    }
}


export { Router };