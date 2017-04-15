import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';

import { WordListItem } from './list-item.es6';


describe("<WordListItem />", () => {

    const dummySelect = () => {};
    const shallowRenderer = new ReactShallowRenderer();

    test("should render word without badge", () => {
        const word = { token: 'some-word', freq: 1 };
        const result = shallowRenderer.render(<WordListItem word={word} onSelect={dummySelect}/>);
        
        expect(result).toMatchSnapshot();
    });

    test("should render word with badge for frequence > 1", () => {
        const word = { token: 'some-word', freq: 2 };
        const wrapper = shallowRenderer.render(<WordListItem word={word} onSelect={dummySelect}/>);
        
        expect(wrapper).toMatchSnapshot();
    });
});
