(function ($,preact) {
'use strict';

$ = 'default' in $ ? $['default'] : $;
preact = 'default' in preact ? preact['default'] : preact;

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Spinner = function (_preact$Component) {
    _inherits$1(Spinner, _preact$Component);

    function Spinner() {
        _classCallCheck$1(this, Spinner);

        return _possibleConstructorReturn$1(this, (Spinner.__proto__ || Object.getPrototypeOf(Spinner)).apply(this, arguments));
    }

    _createClass$1(Spinner, [{
        key: 'render',
        value: function render() {
            return preact.h(
                'div',
                { 'class': 'spinner' },
                preact.h('div', { 'class': 'double-bounce1' }),
                preact.h('div', { 'class': 'double-bounce2' })
            );
        }
    }]);

    return Spinner;
}(preact.Component);

var WordDetailHeader = function (_preact$Component2) {
    _inherits$1(WordDetailHeader, _preact$Component2);

    function WordDetailHeader() {
        _classCallCheck$1(this, WordDetailHeader);

        return _possibleConstructorReturn$1(this, (WordDetailHeader.__proto__ || Object.getPrototypeOf(WordDetailHeader)).apply(this, arguments));
    }

    _createClass$1(WordDetailHeader, [{
        key: 'render',
        value: function render(_ref) {
            var active = _ref.active,
                enabled = _ref.enabled,
                code = _ref.code,
                label = _ref.label,
                onSelectPOS = _ref.onSelectPOS;

            var classNames = 'tab ' + (enabled ? '' : 'empty') + ' ' + (active ? 'active' : '');
            return preact.h(
                'div',
                { onClick: function onClick() {
                        return enabled ? onSelectPOS(code) : null;
                    }, 'class': classNames },
                preact.h(
                    'span',
                    null,
                    label
                )
            );
        }
    }]);

    return WordDetailHeader;
}(preact.Component);

var WordExplanations = function (_preact$Component3) {
    _inherits$1(WordExplanations, _preact$Component3);

    function WordExplanations() {
        _classCallCheck$1(this, WordExplanations);

        return _possibleConstructorReturn$1(this, (WordExplanations.__proto__ || Object.getPrototypeOf(WordExplanations)).apply(this, arguments));
    }

    _createClass$1(WordExplanations, [{
        key: 'render',
        value: function render(_ref2) {
            var info = _ref2.info;

            return preact.h(
                'div',
                null,
                $.map(info, function (entry) {
                    return preact.h(
                        'div',
                        { 'class': 'explanation' },
                        entry.definition
                    );
                })
            );
        }
    }]);

    return WordExplanations;
}(preact.Component);

var WordExamples = function (_preact$Component4) {
    _inherits$1(WordExamples, _preact$Component4);

    function WordExamples() {
        _classCallCheck$1(this, WordExamples);

        return _possibleConstructorReturn$1(this, (WordExamples.__proto__ || Object.getPrototypeOf(WordExamples)).apply(this, arguments));
    }

    _createClass$1(WordExamples, [{
        key: 'render',
        value: function render(_ref3) {
            var examples = _ref3.examples;

            return preact.h(
                'div',
                null,
                $.map(examples, function (example) {
                    return preact.h(
                        'div',
                        { 'class': 'example' },
                        example.text
                    );
                })
            );
        }
    }]);

    return WordExamples;
}(preact.Component);

var WordDetailBody = function (_preact$Component5) {
    _inherits$1(WordDetailBody, _preact$Component5);

    function WordDetailBody() {
        _classCallCheck$1(this, WordDetailBody);

        return _possibleConstructorReturn$1(this, (WordDetailBody.__proto__ || Object.getPrototypeOf(WordDetailBody)).apply(this, arguments));
    }

    _createClass$1(WordDetailBody, [{
        key: 'render',
        value: function render(_ref4) {
            var info = _ref4.info,
                selection = _ref4.selection,
                onSelectPOS = _ref4.onSelectPOS;

            var headers = [['noun', 'noun'], ['verb', 'verb'], ['adjective', 'adj'], ['adverb', 'adv']];
            var selectedPOS = selection.POS || $.grep(headers, function (h) {
                return info.info_by_pos[h[0]];
            })[0][0];

            return preact.h(
                'div',
                null,
                preact.h(
                    'header',
                    { 'class': 'tab-group' },
                    $.map(headers, function (header) {
                        return preact.h(WordDetailHeader, {
                            active: selectedPOS === header[0],
                            enabled: info.info_by_pos[header[0]],
                            code: header[0],
                            label: header[1],
                            onSelectPOS: onSelectPOS });
                    })
                ),
                preact.h(
                    'section',
                    { 'class': 'examples' },
                    preact.h(WordExamples, { examples: selection.word.sentences })
                ),
                preact.h('hr', null),
                preact.h(
                    'section',
                    { 'class': 'explanations' },
                    preact.h(WordExplanations, { info: info.info_by_pos[selectedPOS] })
                )
            );
        }
    }]);

    return WordDetailBody;
}(preact.Component);

var WordDetail = function (_preact$Component6) {
    _inherits$1(WordDetail, _preact$Component6);

    function WordDetail() {
        _classCallCheck$1(this, WordDetail);

        return _possibleConstructorReturn$1(this, (WordDetail.__proto__ || Object.getPrototypeOf(WordDetail)).apply(this, arguments));
    }

    _createClass$1(WordDetail, [{
        key: 'render',
        value: function render(_ref5) {
            var info = _ref5.info,
                selection = _ref5.selection,
                onSelectPOS = _ref5.onSelectPOS,
                onUnselectWord = _ref5.onUnselectWord;

            if (selection.word) {
                return preact.h(
                    'div',
                    null,
                    preact.h(
                        'div',
                        { 'class': 'card word-detail' },
                        preact.h(
                            'header',
                            { 'class': 'head' },
                            preact.h(
                                'div',
                                { 'class': 'arrow', onClick: function onClick() {
                                        return onUnselectWord();
                                    } },
                                '<'
                            ),
                            preact.h(
                                'span',
                                { 'class': 'label' },
                                selection.word.word.token
                            )
                        ),
                        preact.h(
                            'section',
                            { 'class': 'body' },
                            !info ? preact.h(Spinner, null) : preact.h(WordDetailBody, { info: info,
                                selection: selection,
                                onSelectPOS: onSelectPOS })
                        )
                    ),
                    info ? preact.h(
                        'div',
                        { 'class': 'attribution' },
                        preact.h(
                            'div',
                            { 'class': 'attribution_dictionary' },
                            preact.h(
                                'a',
                                { href: info.attribution_url },
                                info.attribution_text
                            )
                        ),
                        preact.h(
                            'div',
                            { 'class': 'attribution_api' },
                            preact.h('img', { src: '/static/img/wordnik_badge.png' })
                        )
                    ) : preact.h('div', null)
                );
            }
        }
    }]);

    return WordDetail;
}(preact.Component);

var WordListItem = function (_preact$Component7) {
    _inherits$1(WordListItem, _preact$Component7);

    function WordListItem() {
        _classCallCheck$1(this, WordListItem);

        return _possibleConstructorReturn$1(this, (WordListItem.__proto__ || Object.getPrototypeOf(WordListItem)).apply(this, arguments));
    }

    _createClass$1(WordListItem, [{
        key: 'render',
        value: function render(_ref6) {
            var word = _ref6.word,
                onSelectWord = _ref6.onSelectWord;

            return preact.h(
                'div',
                { 'class': 'card word-item', onClick: function onClick() {
                        return onSelectWord(word);
                    } },
                preact.h(
                    'div',
                    { 'class': 'label' },
                    word.word.token
                ),
                preact.h(
                    'div',
                    { 'class': 'arrow' },
                    '>'
                )
            );
        }
    }]);

    return WordListItem;
}(preact.Component);

var WordList = function (_preact$Component8) {
    _inherits$1(WordList, _preact$Component8);

    function WordList() {
        _classCallCheck$1(this, WordList);

        return _possibleConstructorReturn$1(this, (WordList.__proto__ || Object.getPrototypeOf(WordList)).apply(this, arguments));
    }

    _createClass$1(WordList, [{
        key: 'render',
        value: function render(_ref7) {
            var data = _ref7.data,
                onSelectWord = _ref7.onSelectWord;

            return preact.h(
                'div',
                { 'class': 'word-list' },
                $.map(data.words, function (item) {
                    return preact.h(WordListItem, { word: item, onSelectWord: onSelectWord });
                })
            );
        }
    }]);

    return WordList;
}(preact.Component);

var Analysis = function (_preact$Component9) {
    _inherits$1(Analysis, _preact$Component9);

    function Analysis() {
        _classCallCheck$1(this, Analysis);

        var _this9 = _possibleConstructorReturn$1(this, (Analysis.__proto__ || Object.getPrototypeOf(Analysis)).call(this));

        _this9.state.selection = {};
        _this9.state.infoByToken = {};
        return _this9;
    }

    _createClass$1(Analysis, [{
        key: 'handleSelectWord',
        value: function handleSelectWord(word) {
            var _this10 = this;

            this.setState({ selection: { word: word } });

            $.getJSON({ url: '/api/words/' + word.word.token }).then(function (res) {
                _this10.setState(function (prevState) {
                    prevState.infoByToken[word.word.token] = res;
                });
            }).catch(function (err) {
                console.error(err); // eslint-disable-line
                // TODO
            });
        }
    }, {
        key: 'handleSelectPOS',
        value: function handleSelectPOS(POS) {
            this.setState(function (prevState) {
                prevState.selection.POS = POS;
            });
        }
    }, {
        key: 'handleUnselectWord',
        value: function handleUnselectWord() {
            this.setState({ selection: { POS: undefined, word: undefined } });
        }
    }, {
        key: 'render',
        value: function render(_ref8) {
            var _this11 = this;

            var data = _ref8.data;

            var selectedWord = this.state.selection.word;
            return preact.h(
                'div',
                { 'class': 'analysis ' + (selectedWord ? 'detail' : 'list') },
                preact.h(WordDetail, {
                    selection: this.state.selection,
                    info: selectedWord ? this.state.infoByToken[selectedWord.word.token] : undefined,
                    onSelectPOS: function onSelectPOS(p) {
                        return _this11.handleSelectPOS(p);
                    },
                    onUnselectWord: function onUnselectWord() {
                        return _this11.handleUnselectWord();
                    } }),
                preact.h(WordList, {
                    data: data,
                    onSelectWord: function onSelectWord(w) {
                        return _this11.handleSelectWord(w);
                    } })
            );
        }
    }]);

    return Analysis;
}(preact.Component);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Root = function (_preact$Component) {
    _inherits(Root, _preact$Component);

    function Root() {
        _classCallCheck(this, Root);

        return _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).apply(this, arguments));
    }

    _createClass(Root, [{
        key: 'render',
        value: function render(props) {
            if (props.data) {
                return preact.h(Analysis, { data: props.data });
            } else {
                return preact.h(
                    'div',
                    { 'class': 'error' },
                    preact.h(
                        'div',
                        null,
                        'Unable to analyse movie :('
                    ),
                    preact.h(
                        'div',
                        null,
                        'Sorry!'
                    )
                );
            }
        }
    }]);

    return Root;
}(preact.Component);

function loadAnalysis() {
    var imdbId = window.location.pathname.split('/').slice(-1)[0];
    return $.getJSON({
        url: '/api/analysis/' + imdbId
    });
}

function renderApp(analysis) {
    var container = document.getElementById('app');
    preact.render(preact.h(Root, { data: analysis }), container, container.firstElementChild);
}

window.onload = function () {
    loadAnalysis().then(function (analysis) {
        return renderApp(analysis);
    }).catch(function (err) {
        console.error(err); // eslint-disable-line
        renderApp(null);
    });
};

}($,preact));
