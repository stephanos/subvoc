import { Page, Router } from './router';


describe("Router", () => {

    describe("getPage", () => {

        test("should match search page", () => {
            expect(Router.getPage('/'))
                .toEqual({});
        });

        test("should match analysis page", () => {
            expect(Router.getPage('/analysis/tt0114369'))
                .toEqual({ movieId: 'tt0114369' });
        });

        test("should match analysis page", () => {
            expect(Router.getPage('/analysis/tt0114369/word/word'))
                .toEqual({ movieId: 'tt0114369', word: 'word' });
        });
    });
});
