import React from 'react';
import { shallow, render } from 'enzyme';
import td from 'testdouble';

import { Search } from './search';
import { SearchResults } from './results.es6';


describe("Search component", () => {

    test("should render", () => {
        const result = shallow(
            <Search />
        );
        
        expect(result).toMatchSnapshot();
    });

    test("should render search result", (done) => {
        const API = mockAPI();
        td.when(API.searchMovie('QUERY')).thenResolve({
            data: {
                hits: ['A', 'B', 'C'],
            }
        });
        
        const wrapper = shallow(<Search api={API} />);
        wrapper.find('SearchBar').simulate('search', 'QUERY');
        
        process.nextTick(() => {
            expect(wrapper.update()).toMatchSnapshot();
            done();
        });
    });
});


function mockAPI() {
    return { searchMovie: td.function() };
}