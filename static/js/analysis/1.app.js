(function ($,preact$1) {
'use strict';

$ = 'default' in $ ? $['default'] : $;
preact$1 = 'default' in preact$1 ? preact$1['default'] : preact$1;

var Error = function Error() {
    return preact.h(
        "div",
        { "class": "error" },
        preact.h(
            "div",
            null,
            "Unable to analyse movie :("
        ),
        preact.h(
            "div",
            null,
            "Sorry!"
        )
    );
};

var WordDefinitionList = function WordDefinitionList(_ref) {
    var definitions = _ref.definitions;
    return preact$1.h(
        'div',
        { 'class': 'definitions' },
        preact$1.h(
            'h4',
            null,
            'Definition'
        ),
        definitions.length > 0 ? preact$1.h(
            'div',
            null,
            preact$1.h(
                'ol',
                null,
                $.map(definitions, function (entry) {
                    return preact$1.h(
                        'li',
                        { 'class': 'definition' },
                        entry.definition
                    );
                })
            )
        ) : preact$1.h(
            'div',
            null,
            'None was found.'
        )
    );
};

var WordExcerptList = function WordExcerptList(_ref) {
    var excerpts = _ref.excerpts;
    return preact$1.h(
        'div',
        null,
        ' ',
        excerpts.length > 0 ? preact$1.h(
            'div',
            { 'class': 'excerpts' },
            preact$1.h(
                'h4',
                null,
                'Excerpt'
            ),
            $.map(excerpts, function (excerpt) {
                return preact$1.h(
                    'div',
                    { 'class': 'excerpt' },
                    $.map(excerpt.sentences, function (sentence) {
                        return preact$1.h(
                            'div',
                            { 'class': 'line' },
                            sentence.text
                        );
                    })
                );
            })
        ) : preact$1.h('div', null),
        ' '
    );
};

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WordPartOfSpeachHeader = function (_preact$Component) {
    _inherits$2(WordPartOfSpeachHeader, _preact$Component);

    function WordPartOfSpeachHeader() {
        _classCallCheck$2(this, WordPartOfSpeachHeader);

        return _possibleConstructorReturn$2(this, (WordPartOfSpeachHeader.__proto__ || Object.getPrototypeOf(WordPartOfSpeachHeader)).apply(this, arguments));
    }

    _createClass$2(WordPartOfSpeachHeader, [{
        key: 'render',
        value: function render(_ref) {
            var active = _ref.active,
                enabled = _ref.enabled,
                label = _ref.label,
                freq = _ref.freq,
                onSelectPOS = _ref.onSelectPOS;

            var classNames = 'tab card ' + (enabled ? '' : 'empty') + ' ' + (active ? 'active' : '');
            return preact$1.h(
                'div',
                { onClick: function onClick() {
                        return enabled ? onSelectPOS(label) : null;
                    }, 'class': classNames },
                preact$1.h(
                    'div',
                    { 'class': 'label' },
                    label
                ),
                freq ? preact$1.h(
                    'div',
                    { 'class': 'count badge' },
                    freq
                ) : preact$1.h(
                    'div',
                    { 'class': 'count' },
                    '\xA0'
                )
            );
        }
    }]);

    return WordPartOfSpeachHeader;
}(preact$1.Component);

var PARTS_OF_SPEACH = ['noun', 'verb', 'adj', 'adv'];

function getExcerpts(word, pos) {
    return (word.byPOS[pos] || {}).excerpts || [];
}

function getFreq(word, pos) {
    return (word.byPOS[pos] || {}).freq || 0;
}

function getDefinitions(word, pos) {
    return word.lookup[pos] || [];
}

function hasDetails(word, pos) {
    return getDefinitions(word, pos).length > 0 || getExcerpts(word, pos).length > 0;
}

var WordDetailBody = function WordDetailBody(_ref) {
    var selection = _ref.selection,
        onSelectPOS = _ref.onSelectPOS;

    var selectedPOS = selection.POS || $.grep(PARTS_OF_SPEACH, function (pos) {
        return getExcerpts(selection.word, pos).length > 0;
    })[0];

    return preact$1.h(
        'div',
        null,
        preact$1.h(
            'header',
            { 'class': 'tab-group' },
            $.map(PARTS_OF_SPEACH, function (pos) {
                return preact$1.h(WordPartOfSpeachHeader, {
                    active: selectedPOS === pos,
                    enabled: hasDetails(selection.word, pos),
                    label: pos,
                    freq: getFreq(selection.word, pos),
                    onSelectPOS: onSelectPOS });
            })
        ),
        preact$1.h(
            'section',
            null,
            preact$1.h(WordExcerptList, { excerpts: getExcerpts(selection.word, selectedPOS) })
        ),
        preact$1.h(
            'section',
            null,
            preact$1.h(WordDefinitionList, { definitions: getDefinitions(selection.word, selectedPOS) })
        )
    );
};

var Spinner = function Spinner() {
    return preact$1.h(
        "div",
        { "class": "spinner" },
        preact$1.h("div", { "class": "double-bounce1" }),
        preact$1.h("div", { "class": "double-bounce2" })
    );
};

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WordDetail = function (_preact$Component) {
    _inherits$1(WordDetail, _preact$Component);

    function WordDetail() {
        _classCallCheck$1(this, WordDetail);

        return _possibleConstructorReturn$1(this, (WordDetail.__proto__ || Object.getPrototypeOf(WordDetail)).apply(this, arguments));
    }

    _createClass$1(WordDetail, [{
        key: 'render',
        value: function render(_ref) {
            var selection = _ref.selection,
                onSelectPOS = _ref.onSelectPOS;

            if (selection.word) {
                return preact$1.h(
                    'div',
                    { 'class': 'word-detail' },
                    preact$1.h(
                        'h2',
                        { 'class': 'head' },
                        preact$1.h(
                            'span',
                            { 'class': 'label' },
                            selection.word.token
                        )
                    ),
                    preact$1.h(
                        'section',
                        { 'class': 'body' },
                        !selection.word.lookup ? preact$1.h(Spinner, null) : preact$1.h(WordDetailBody, {
                            selection: selection,
                            onSelectPOS: onSelectPOS })
                    ),
                    selection.word.lookup ? preact$1.h(
                        'div',
                        { 'class': 'attribution' },
                        preact$1.h(
                            'div',
                            { 'class': 'attribution_dictionary' },
                            preact$1.h(
                                'a',
                                { href: selection.word.lookup.attribution.url },
                                selection.word.lookup.attribution.text
                            )
                        ),
                        preact$1.h(
                            'div',
                            { 'class': 'attribution_api' },
                            preact$1.h('img', { src: '/static/img/wordnik_badge.png' })
                        )
                    ) : preact$1.h('div', null)
                );
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            $(window).scrollTop(0);
        }
    }]);

    return WordDetail;
}(preact$1.Component);

var WordListItem = function WordListItem(_ref) {
    var word = _ref.word,
        onSelectWord = _ref.onSelectWord;
    return preact$1.h(
        'div',
        { 'class': 'card word-item', onClick: function onClick() {
                return onSelectWord(word);
            } },
        preact$1.h(
            'div',
            { 'class': 'label' },
            word.token,
            word.freq > 1 ? preact$1.h(
                'span',
                { 'class': 'count badge' },
                word.freq
            ) : preact$1.h('span', null)
        ),
        preact$1.h(
            'div',
            { 'class': 'arrow right' },
            '>'
        )
    );
};

var DifficultyGroup = function DifficultyGroup(_ref) {
    var level = _ref.level,
        label = _ref.label,
        count = _ref.count,
        active = _ref.active,
        onSelect = _ref.onSelect;

    var classNames = 'group card ' + (active ? 'active' : '');
    return preact$1.h(
        'div',
        { 'class': classNames, onclick: function onclick() {
                return onSelect(level);
            } },
        preact$1.h(
            'div',
            { 'class': 'label' },
            label.toLowerCase()
        ),
        preact$1.h(
            'div',
            { 'class': 'count badge' },
            count
        )
    );
};

var DifficultySelector = function DifficultySelector(_ref2) {
    var selected = _ref2.selected,
        onSelect = _ref2.onSelect,
        words = _ref2.words;

    var groups = {};
    $(words).each(function (idx, word) {
        groups[word.difficulty.label] = {
            level: word.difficulty.level,
            count: (groups[word.difficulty.label] || { count: 0 }).count + 1
        };
    });

    return preact$1.h(
        'div',
        { 'class': 'difficulty' },
        $.map(Object.keys(groups), function (label) {
            var group = groups[label];
            return preact$1.h(DifficultyGroup, {
                level: group.level,
                count: group.count,
                active: selected === group.level,
                label: label.toLowerCase(),
                onSelect: onSelect });
        })
    );
};

var Heading = function Heading(_ref) {
    var analysis = _ref.analysis;

    return preact$1.h(
        'div',
        null,
        preact$1.h(
            'h2',
            { 'class': 'media' },
            preact$1.h('img', { 'class': 'poster', src: analysis.media.poster_url }),
            preact$1.h(
                'span',
                { 'class': 'title' },
                analysis.media.title
            )
        ),
        preact$1.h(
            'div',
            null,
            preact$1.h(
                'span',
                { 'class': 'badge' },
                analysis.words.length
            ),
            ' unique words'
        )
    );
};

var WordList = function WordList(_ref2) {
    var analysis = _ref2.analysis,
        selection = _ref2.selection,
        onSelectWord = _ref2.onSelectWord,
        onSelectDifficulty = _ref2.onSelectDifficulty;

    var sortedWords = analysis.words.sort(function (a, b) {
        return a.difficulty.value - b.difficulty.value;
    });

    var wordsWithDifficulty = $.grep(sortedWords, function (w) {
        return w.difficulty.level === selection.difficulty;
    });

    return preact$1.h(
        'div',
        { 'class': 'word-list' },
        preact$1.h(Heading, { analysis: analysis }),
        preact$1.h(DifficultySelector, {
            selected: selection.difficulty,
            onSelect: onSelectDifficulty,
            words: sortedWords }),
        preact$1.h(
            'div',
            { 'class': 'list' },
            $.map(wordsWithDifficulty, function (item) {
                return preact$1.h(WordListItem, { word: item, onSelectWord: onSelectWord });
            })
        )
    );
};

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function lookupWord(word) {
    var _this = this;

    $.getJSON({ url: '/api/words/' + word.token }).then(function (res) {
        _this.setState(function (prevState) {
            prevState.selection.word.lookup = res;
        });
    }).catch(function (err) {
        console.error(err); // eslint-disable-line
    });
}

var Nav = function Nav(_ref) {
    var analysis = _ref.analysis,
        selection = _ref.selection,
        onClick = _ref.onClick;
    return preact$1.h(
        'nav',
        { 'class': 'navigation' },
        preact$1.h(
            'section',
            { 'class': 'container' },
            preact$1.h(
                'span',
                { 'class': 'navigation-title' },
                preact$1.h(
                    'h1',
                    { 'class': 'title' },
                    selection.word ? preact$1.h(
                        'div',
                        { 'class': 'media', onclick: onClick },
                        preact$1.h(
                            'span',
                            { 'class': 'arrow left' },
                            '>'
                        ),
                        preact$1.h(
                            'span',
                            { 'class': 'name' },
                            analysis.media.title
                        )
                    ) : preact$1.h(
                        'a',
                        { 'class': 'generic', href: '/' },
                        'subvoc'
                    )
                )
            )
        )
    );
};

var App = function (_preact$Component) {
    _inherits(App, _preact$Component);

    function App(_ref2) {
        var analysis = _ref2.analysis;

        _classCallCheck(this, App);

        var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        var selectedWord = undefined;
        if (analysis) {
            var wordMatch = $.grep(analysis.words, function (w) {
                return w.token === window.location.hash.replace('#', '');
            });
            if (wordMatch.length > 0) {
                selectedWord = wordMatch[0];
                lookupWord.bind(_this2)(selectedWord);
            }
        }
        _this2.state.selection = { difficulty: 3, POS: undefined, word: selectedWord };
        return _this2;
    }

    _createClass(App, [{
        key: 'handleSelectWord',
        value: function handleSelectWord(word) {
            window.history.pushState(null, '' + word.token, window.location.pathname + '#' + word.token);
            this.setState(function (prevState) {
                prevState.listScrollPos = $(window).scrollTop();
                prevState.selection.word = word;
            });
            lookupWord.bind(this)(word);
        }
    }, {
        key: 'handleSelectDifficulty',
        value: function handleSelectDifficulty(difficulty) {
            this.setState(function (prevState) {
                prevState.selection.difficulty = difficulty;
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
            this.setState(function (prevState) {
                delete prevState.selection.POS;
                delete prevState.selection.word;
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.onpopstate = this.handleUnselectWord.bind(this);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (!this.state.selection.word && this.state.listScrollPos) {
                $(window).scrollTop(this.state.listScrollPos);
                delete this.state.listScrollPos;
            }
        }
    }, {
        key: 'render',
        value: function render(_ref3) {
            var _this3 = this;

            var analysis = _ref3.analysis;

            return preact$1.h(
                'div',
                { 'class': 'wrapper' },
                preact$1.h(Nav, { analysis: analysis,
                    selection: this.state.selection,
                    onClick: function onClick() {
                        return _this3.handleUnselectWord();
                    } }),
                preact$1.h(
                    'section',
                    { 'class': 'container' },
                    analysis ? preact$1.h(
                        'div',
                        { 'class': 'analysis' },
                        this.state.selection.word ? preact$1.h(WordDetail, {
                            selection: this.state.selection,
                            onSelectPOS: function onSelectPOS(p) {
                                return _this3.handleSelectPOS(p);
                            } }) : preact$1.h(WordList, {
                            analysis: analysis,
                            selection: this.state.selection,
                            onSelectDifficulty: function onSelectDifficulty(d) {
                                return _this3.handleSelectDifficulty(d);
                            },
                            onSelectWord: function onSelectWord(w) {
                                return _this3.handleSelectWord(w);
                            } })
                    ) : preact$1.h(Error, null)
                )
            );
        }
    }]);

    return App;
}(preact$1.Component);

function loadAnalysis() {
    var imdbId = window.location.pathname.split('/').slice(-1)[0];
    return $.getJSON({
        url: '/api/analysis/' + imdbId
    });
}

function renderApp(analysis) {
    var container = document.getElementById('body');
    var parent = document.getElementById('main');
    preact$1.render(preact$1.h(App, { analysis: analysis }), container, parent);
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
