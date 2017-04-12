import React from 'react';

import { shallow } from 'enzyme';

import { WordDetailBody } from './body.es6';


describe("<WordDetailBody />", () => {
    
    test("should render with pre-selected POS", () => {
        const word = {
            byPOS: {
                noun: { freq: 1, excerpts: ['...'] }
            },
            lookup: {}
        };

        const result = shallow(
            <WordDetailBody POS='noun' word={word} />
        );

        expect(result).toMatchSnapshot();
    });

    test("should render by picking POS with excerpt", () => {
        const word = {
            byPOS: {
                verb: { freq: 1, excerpts: ['...'] }
            },
            lookup: {
                noun: ['...']
            }
        };

        const result = shallow(
            <WordDetailBody word={word} />
        );

        expect(result).toMatchSnapshot();
    });
});