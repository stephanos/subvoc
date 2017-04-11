const Page = {
    ANALYTICS: new RegExp('/analysis/(\\w+)'),
    SEARCH: '/'
};


class Router {

    static getPage(path) {
        const analysisMatch = path.match(Page.ANALYTICS);
        if (analysisMatch) {
            return { movieId: analysisMatch[1] };
        }

        return {};
    }

    static onAnalysisPage(movieTitle, movieId) {
        const title = movieTitle ? `Analysis: ${movieTitle}` : 'Analysis';
        const path = `/analysis/${movieId}`;
        if (path === location.pathname) {
            document.title = title;
        } else {
            history.pushState(null, title, path);
        }
    }
}


export { Router };