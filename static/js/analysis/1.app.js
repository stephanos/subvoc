(function ($,preact) {
'use strict';

$ = 'default' in $ ? $['default'] : $;
preact = 'default' in preact ? preact['default'] : preact;

var _createClass$4 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$4(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WordDefinitionList = function (_preact$Component) {
    _inherits$4(WordDefinitionList, _preact$Component);

    function WordDefinitionList() {
        _classCallCheck$4(this, WordDefinitionList);

        return _possibleConstructorReturn$4(this, (WordDefinitionList.__proto__ || Object.getPrototypeOf(WordDefinitionList)).apply(this, arguments));
    }

    _createClass$4(WordDefinitionList, [{
        key: 'render',
        value: function render(_ref) {
            var definitions = _ref.definitions;

            return preact.h(
                'div',
                null,
                $.map(definitions, function (entry) {
                    return preact.h(
                        'div',
                        { 'class': 'explanation' },
                        entry.definition
                    );
                })
            );
        }
    }]);

    return WordDefinitionList;
}(preact.Component);

var _createClass$5 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$5(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WordDetailSelector = function (_preact$Component) {
    _inherits$5(WordDetailSelector, _preact$Component);

    function WordDetailSelector() {
        _classCallCheck$5(this, WordDetailSelector);

        return _possibleConstructorReturn$5(this, (WordDetailSelector.__proto__ || Object.getPrototypeOf(WordDetailSelector)).apply(this, arguments));
    }

    _createClass$5(WordDetailSelector, [{
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

    return WordDetailSelector;
}(preact.Component);

var _createClass$6 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$6(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WordExcerptList = function (_preact$Component) {
    _inherits$6(WordExcerptList, _preact$Component);

    function WordExcerptList() {
        _classCallCheck$6(this, WordExcerptList);

        return _possibleConstructorReturn$6(this, (WordExcerptList.__proto__ || Object.getPrototypeOf(WordExcerptList)).apply(this, arguments));
    }

    _createClass$6(WordExcerptList, [{
        key: 'render',
        value: function render(_ref) {
            var examples = _ref.examples;

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

    return WordExcerptList;
}(preact.Component);

var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WordDetailBody = function (_preact$Component) {
    _inherits$3(WordDetailBody, _preact$Component);

    function WordDetailBody() {
        _classCallCheck$3(this, WordDetailBody);

        return _possibleConstructorReturn$3(this, (WordDetailBody.__proto__ || Object.getPrototypeOf(WordDetailBody)).apply(this, arguments));
    }

    _createClass$3(WordDetailBody, [{
        key: 'render',
        value: function render(_ref) {
            var lookup = _ref.lookup,
                selection = _ref.selection,
                onSelectPOS = _ref.onSelectPOS;

            var headers = [['noun', 'noun'], ['verb', 'verb'], ['adjective', 'adj'], ['adverb', 'adv']];

            var selectedPOS = selection.POS || $.grep(headers, function (h) {
                return lookup[h[0]];
            })[0][0];

            return preact.h(
                'div',
                null,
                preact.h(
                    'header',
                    { 'class': 'tab-group' },
                    $.map(headers, function (header) {
                        return preact.h(WordDetailSelector, {
                            active: selectedPOS === header[0],
                            enabled: lookup[header[0]],
                            code: header[0],
                            label: header[1],
                            onSelectPOS: onSelectPOS });
                    })
                ),
                preact.h(
                    'section',
                    { 'class': 'examples' },
                    preact.h(WordExcerptList, { examples: selection.word.sentences })
                ),
                preact.h('hr', null),
                preact.h(
                    'section',
                    { 'class': 'explanations' },
                    preact.h(WordDefinitionList, { definitions: lookup[selectedPOS] })
                )
            );
        }
    }]);

    return WordDetailBody;
}(preact.Component);

var _createClass$7 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$7(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$7(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Spinner = function (_preact$Component) {
    _inherits$7(Spinner, _preact$Component);

    function Spinner() {
        _classCallCheck$7(this, Spinner);

        return _possibleConstructorReturn$7(this, (Spinner.__proto__ || Object.getPrototypeOf(Spinner)).apply(this, arguments));
    }

    _createClass$7(Spinner, [{
        key: "render",
        value: function render() {
            return preact.h(
                "div",
                { "class": "spinner" },
                preact.h("div", { "class": "double-bounce1" }),
                preact.h("div", { "class": "double-bounce2" })
            );
        }
    }]);

    return Spinner;
}(preact.Component);

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WordDetail = function (_preact$Component) {
    _inherits$2(WordDetail, _preact$Component);

    function WordDetail() {
        _classCallCheck$2(this, WordDetail);

        return _possibleConstructorReturn$2(this, (WordDetail.__proto__ || Object.getPrototypeOf(WordDetail)).apply(this, arguments));
    }

    _createClass$2(WordDetail, [{
        key: 'render',
        value: function render(_ref) {
            var lookup = _ref.lookup,
                selection = _ref.selection,
                onSelectPOS = _ref.onSelectPOS,
                onUnselectWord = _ref.onUnselectWord;

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
                            !lookup ? preact.h(Spinner, null) : preact.h(WordDetailBody, { lookup: lookup,
                                selection: selection,
                                onSelectPOS: onSelectPOS })
                        )
                    ),
                    lookup ? preact.h(
                        'div',
                        { 'class': 'attribution' },
                        preact.h(
                            'div',
                            { 'class': 'attribution_dictionary' },
                            preact.h(
                                'a',
                                { href: lookup.attribution.url },
                                lookup.attribution.text
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

var _createClass$9 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$9(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$9(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WordListItem = function (_preact$Component) {
    _inherits$9(WordListItem, _preact$Component);

    function WordListItem() {
        _classCallCheck$9(this, WordListItem);

        return _possibleConstructorReturn$9(this, (WordListItem.__proto__ || Object.getPrototypeOf(WordListItem)).apply(this, arguments));
    }

    _createClass$9(WordListItem, [{
        key: 'render',
        value: function render(_ref) {
            var word = _ref.word,
                onSelectWord = _ref.onSelectWord;

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

var _createClass$8 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$8(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$8(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WordList = function (_preact$Component) {
    _inherits$8(WordList, _preact$Component);

    function WordList() {
        _classCallCheck$8(this, WordList);

        return _possibleConstructorReturn$8(this, (WordList.__proto__ || Object.getPrototypeOf(WordList)).apply(this, arguments));
    }

    _createClass$8(WordList, [{
        key: 'render',
        value: function render(_ref) {
            var data = _ref.data,
                onSelectWord = _ref.onSelectWord;

            return preact.h(
                'div',
                null,
                preact.h(
                    'div',
                    { 'class': 'media' },
                    preact.h(
                        'span',
                        { 'class': 'title' },
                        data.media.title
                    )
                ),
                preact.h(
                    'div',
                    { 'class': 'word-list' },
                    $.map(data.words, function (item) {
                        return preact.h(WordListItem, { word: item, onSelectWord: onSelectWord });
                    })
                )
            );
        }
    }]);

    return WordList;
}(preact.Component);

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Analysis = function (_preact$Component) {
    _inherits$1(Analysis, _preact$Component);

    function Analysis() {
        _classCallCheck$1(this, Analysis);

        var _this = _possibleConstructorReturn$1(this, (Analysis.__proto__ || Object.getPrototypeOf(Analysis)).call(this));

        _this.state.selection = {};
        _this.state.wordLookupByToken = {};
        return _this;
    }

    _createClass$1(Analysis, [{
        key: 'handleSelectWord',
        value: function handleSelectWord(word) {
            var _this2 = this;

            this.setState({ selection: { word: word } });

            $.getJSON({ url: '/api/words/' + word.word.token }).then(function (res) {
                _this2.setState(function (prevState) {
                    prevState.wordLookupByToken[word.word.token] = res;
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
        value: function render(_ref) {
            var _this3 = this;

            var data = _ref.data;

            var selectedWord = this.state.selection.word;
            return preact.h(
                'div',
                { 'class': 'analysis ' + (selectedWord ? 'detail' : 'list') },
                preact.h(WordDetail, {
                    selection: this.state.selection,
                    lookup: selectedWord ? this.state.wordLookupByToken[selectedWord.word.token] : undefined,
                    onSelectPOS: function onSelectPOS(p) {
                        return _this3.handleSelectPOS(p);
                    },
                    onUnselectWord: function onUnselectWord() {
                        return _this3.handleUnselectWord();
                    } }),
                preact.h(WordList, {
                    data: data,
                    onSelectWord: function onSelectWord(w) {
                        return _this3.handleSelectWord(w);
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
