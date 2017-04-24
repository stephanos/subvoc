/*global global*/

import { Page, Router } from './router';


describe("Router", () => {

    beforeEach(() => {
        global.window.History = {
            createBrowserHistory: () => {}
        };
    });

    describe("getState", () => {

        test("should match search page", () => {
            expect(Router.getState('/'))
                .toEqual({});
        });

        test("should match analysis page", () => {
            expect(Router.getState('/m/tt0114369'))
                .toEqual({ movieId: 'tt0114369' });
        });

        test("should match analysis page", () => {
            expect(Router.getState('/m/tt0114369/w/word'))
                .toEqual({ movieId: 'tt0114369', word: 'word' });
        });
    });
});
