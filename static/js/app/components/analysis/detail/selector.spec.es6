import React from 'react';

import { shallow, render } from 'enzyme';
import td from 'testdouble';

import { WordPartOfSpeachItem, WordPartOfSpeachSelector } from './selector.es6';


describe("<WordPartOfSpeachSelector />", () => {

    test("should render", () => {
        const word = { byPOS: {}, lookup: {} };
        const result = shallow(
            <WordPartOfSpeachSelector word={word} />
        );
        
        expect(result).toMatchSnapshot();
    });

    test("should mark selected POS as 'active'", () => {
        const word = { byPOS: {}, lookup: {} };
        const result = shallow(
            <WordPartOfSpeachSelector selected='noun' word={word} />
        );
        
        expect(result).toMatchSnapshot();
    });

    test("should mark POS with excerpt as available", () => {
        const word = {
            byPOS: { 
                noun: { freq: 1, excerpts: ['...'] },
                verb: { freq: 1, excerpts: ['...'] }
            },
            lookup: {}
        };

        const result = shallow(
            <WordPartOfSpeachSelector selected='noun' word={word} />
        );
        
        expect(result).toMatchSnapshot();
    });

    test("should mark POS with definition as available", () => {
        const word = {
            byPOS: { 
                noun: { freq: 1, excerpts: ['...'] }
            }, 
            lookup: {
                verb: ['...']
            }
        };

        const result = shallow(
            <WordPartOfSpeachSelector word={word} />
        );

        expect(result).toMatchSnapshot();
    });
});

describe("<WordPartOfSpeachItem />", () => {
    let onSelect;

    beforeEach(() => {
        onSelect = td.function();
    });

    test("should render disabled, inactive POS item", () => {
        const result = render(
            <WordPartOfSpeachItem enabled={false} label='noun' />
        );

        expect(result).toMatchSnapshot();
    });

    test("should mark POS item as enabled", () => {
        const result = render(
            <WordPartOfSpeachItem enabled={true} label='noun' />
        );

        expect(result).toMatchSnapshot();
    });

    test("should mark POS item as active", () => {
        const result = render(
            <WordPartOfSpeachItem enabled={true} active={true} label='noun' />
        );

        expect(result).toMatchSnapshot();
    });

    test("should mark POS item with frequency", () => {
        const result = render(
            <WordPartOfSpeachItem enabled={true} freq={1} label='noun' />
        );

        expect(result).toMatchSnapshot();
    });

    test("should propagate click on enabled POS item", () => {
        const result = shallow(
            <WordPartOfSpeachItem enabled={true} label='noun' onSelect={onSelect} />
        );

        result.find('.tab.noun').simulate('click');
        td.verify(onSelect('noun'));
    });

    test("should not propagate click on disabled POS item", () => {
        const result = shallow(
            <WordPartOfSpeachItem enabled={true} label='noun' onSelect={onSelect} />
        );

        result.find('.tab.noun').simulate('click');
        td.verify(onSelect, { times: 0 });
    });
});