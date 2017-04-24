import React from 'react';

import { shallow, render } from 'enzyme';
import td from 'testdouble';

import { PartOfSpeechItem, PartOfSpeechSelector } from './selector.es6';


describe("<PartOfSpeechSelector />", () => {

    test("should render", () => {
        const word = { byPOS: {}, lookup: {} };
        const result = shallow(
            <PartOfSpeechSelector word={word} />
        );
        
        expect(result).toMatchSnapshot();
    });

    test("should mark selected POS as 'active'", () => {
        const word = { byPOS: {}, lookup: {} };
        const result = shallow(
            <PartOfSpeechSelector selected='noun' word={word} />
        );
        
        expect(result).toMatchSnapshot();
    });

    test("should mark POS with excerpt as active", () => {
        const word = {
            byPOS: { 
                verb: { freq: 1, excerpts: ['...'] }
            },
            lookup: {
                noun: ['...'],
            }
        };

        const result = shallow(
            <PartOfSpeechSelector word={word} />
        );
        
        expect(result).toMatchSnapshot();
    });

    test("should mark POS with excerpt as available", () => {
        const word = {
            byPOS: { 
                verb: { freq: 1, excerpts: ['...'] }
            },
            lookup: {}
        };

        const result = shallow(
            <PartOfSpeechSelector word={word} />
        );
        
        expect(result).toMatchSnapshot();
    });

    test("should mark POS with definition only as available", () => {
        const word = {
            byPOS: { 
                adverb: { freq: 1, excerpts: ['...'] }
            }, 
            lookup: {
                adjective: ['...']
            }
        };

        const result = shallow(
            <PartOfSpeechSelector selected='adverb' word={word} />
        );

        expect(result).toMatchSnapshot();
    });
});

describe("<PartOfSpeechItem />", () => {
    test("should render disabled, inactive POS item", () => {
        const result = render(
            <PartOfSpeechItem enabled={false} label='noun' />
        );

        expect(result).toMatchSnapshot();
    });

    test("should mark POS item as enabled", () => {
        const result = render(
            <PartOfSpeechItem enabled={true} label='noun' />
        );

        expect(result).toMatchSnapshot();
    });

    test("should mark POS item as active", () => {
        const result = render(
            <PartOfSpeechItem enabled={true} active={true} label='noun' />
        );

        expect(result).toMatchSnapshot();
    });

    test("should mark POS item with frequency", () => {
        const result = render(
            <PartOfSpeechItem enabled={true} freq={1} label='noun' />
        );

        expect(result).toMatchSnapshot();
    });

    test("should propagate click on enabled POS item", () => {
        const onSelect = td.function();
        const result = shallow(
            <PartOfSpeechItem enabled={true} type="adjective" label='adj' onSelect={onSelect} />
        );

        result.find('.tab.adj').simulate('click');
        td.verify(onSelect('adjective'));
    });

    test("should not propagate click on disabled POS item", () => {
        const onSelect = td.function();
        const result = shallow(
            <PartOfSpeechItem enabled={true} type="adjective" label='adj' onSelect={onSelect} />
        );

        result.find('.tab.adj').simulate('click');
        td.verify(onSelect, { times: 0 });
    });
});