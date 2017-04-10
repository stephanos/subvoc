import React from 'react';

import { shallow } from 'enzyme';

import { WordDetailBody } from './body.es6';


describe("<WordDetailBody />", () => {
    
    test("should render with pre-selected POS", () => {
        const selection = {
            word: {
                byPOS: {
                    noun: { freq: 1, excerpts: ['...'] }
                },
                lookup: {}
            },
            POS: 'noun'
        };

        const result = shallow(
            <WordDetailBody selection={selection} />
        );

        expect(result).toMatchSnapshot();
    });

    test("should render by picking POS with excerpt", () => {
        const selection = {
            word: {
                byPOS: {
                    verb: { freq: 1, excerpts: ['...'] }
                },
                lookup: {
                    noun: ['...']
                }
            },
            POS: undefined
        };

        const result = shallow(
            <WordDetailBody selection={selection} />
        );

        expect(result).toMatchSnapshot();
    });
});