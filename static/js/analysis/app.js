(function ($,React$1,ReactDOM) {
'use strict';

$ = 'default' in $ ? $['default'] : $;
React$1 = 'default' in React$1 ? React$1['default'] : React$1;
ReactDOM = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

var Error = function Error() {
    return React.createElement(
        "div",
        { className: "error" },
        React.createElement(
            "div",
            null,
            "Unable to analyse movie :("
        ),
        React.createElement(
            "div",
            null,
            "Sorry!"
        )
    );
};

var Nav = function Nav(_ref) {
    var analysis = _ref.analysis,
        selection = _ref.selection,
        onClick = _ref.onClick;
    return React.createElement(
        'nav',
        { className: 'navigation' },
        React.createElement(
            'section',
            { className: 'container' },
            React.createElement(
                'span',
                { className: 'navigation-title' },
                React.createElement(
                    'h1',
                    { className: 'title' },
                    selection.word ? React.createElement(
                        'div',
                        { className: 'media', onClick: onClick },
                        React.createElement(
                            'span',
                            { className: 'arrow left' },
                            '>'
                        ),
                        React.createElement(
                            'span',
                            { className: 'name' },
                            analysis.media.title
                        )
                    ) : React.createElement(
                        'a',
                        { className: 'generic', href: '/' },
                        'subvoc'
                    )
                )
            )
        )
    );
};

var WordDefinitionList = function WordDefinitionList(_ref) {
    var definitions = _ref.definitions;
    return React$1.createElement(
        'div',
        { className: 'definitions' },
        React$1.createElement(
            'h4',
            null,
            'Definition'
        ),
        definitions.length > 0 ? React$1.createElement(
            'div',
            null,
            React$1.createElement(
                'ol',
                null,
                $.map(definitions, function (entry, idx) {
                    return React$1.createElement(
                        'li',
                        { key: idx, className: 'definition' },
                        entry.definition
                    );
                })
            )
        ) : React$1.createElement(
            'div',
            null,
            'None was found.'
        )
    );
};

var WordExcerpt = function WordExcerpt(_ref) {
    var excerpt = _ref.excerpt;
    return React$1.createElement(
        'div',
        { className: 'excerpt' },
        $.map(excerpt.sentences, function (sentence, s_idx) {
            var words = sentence.text.split(/\b/);
            return React$1.createElement(
                'div',
                { key: s_idx, className: 'line' },
                $.map(words, function (word, w_idx) {
                    var className = word === excerpt.token ? 'token' : '';
                    return React$1.createElement(
                        'span',
                        { key: w_idx, className: className },
                        word
                    );
                })
            );
        })
    );
};

var WordExcerptList = function WordExcerptList(_ref2) {
    var excerpts = _ref2.excerpts;
    return React$1.createElement(
        'div',
        null,
        ' ',
        excerpts.length > 0 ? React$1.createElement(
            'div',
            { className: 'excerpts' },
            React$1.createElement(
                'h4',
                null,
                'Excerpt'
            ),
            $.map(excerpts, function (excerpt, idx) {
                return React$1.createElement(WordExcerpt, { key: idx, excerpt: excerpt });
            })
        ) : React$1.createElement('div', null),
        ' '
    );
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var WordPartOfSpeachHeader = function (_React$Component) {
    inherits(WordPartOfSpeachHeader, _React$Component);

    function WordPartOfSpeachHeader() {
        classCallCheck(this, WordPartOfSpeachHeader);
        return possibleConstructorReturn(this, (WordPartOfSpeachHeader.__proto__ || Object.getPrototypeOf(WordPartOfSpeachHeader)).apply(this, arguments));
    }

    createClass(WordPartOfSpeachHeader, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                active = _props.active,
                enabled = _props.enabled,
                label = _props.label,
                freq = _props.freq,
                onSelectPOS = _props.onSelectPOS;

            var classNames = 'tab card ' + (enabled ? '' : 'empty') + ' ' + (active ? 'active' : '');
            return React$1.createElement(
                'div',
                { onClick: function onClick() {
                        return enabled ? onSelectPOS(label) : null;
                    }, className: classNames },
                React$1.createElement(
                    'div',
                    { className: 'label' },
                    label
                ),
                freq ? React$1.createElement(
                    'div',
                    { className: 'count badge' },
                    freq
                ) : React$1.createElement(
                    'div',
                    { className: 'count' },
                    '\xA0'
                )
            );
        }
    }]);
    return WordPartOfSpeachHeader;
}(React$1.Component);

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

    return React$1.createElement(
        'div',
        null,
        React$1.createElement(
            'header',
            { className: 'tab-group' },
            $.map(PARTS_OF_SPEACH, function (pos) {
                return React$1.createElement(WordPartOfSpeachHeader, {
                    key: pos,
                    active: selectedPOS === pos,
                    enabled: hasDetails(selection.word, pos),
                    label: pos,
                    freq: getFreq(selection.word, pos),
                    onSelectPOS: onSelectPOS });
            })
        ),
        React$1.createElement(
            'section',
            null,
            React$1.createElement(WordExcerptList, { excerpts: getExcerpts(selection.word, selectedPOS) })
        ),
        React$1.createElement(
            'section',
            null,
            React$1.createElement(WordDefinitionList, { definitions: getDefinitions(selection.word, selectedPOS) })
        )
    );
};

var Spinner = function Spinner() {
    return React$1.createElement(
        "div",
        { className: "spinner" },
        React$1.createElement("div", { className: "double-bounce1" }),
        React$1.createElement("div", { className: "double-bounce2" })
    );
};

var WordDetail = function (_React$Component) {
    inherits(WordDetail, _React$Component);

    function WordDetail() {
        classCallCheck(this, WordDetail);
        return possibleConstructorReturn(this, (WordDetail.__proto__ || Object.getPrototypeOf(WordDetail)).apply(this, arguments));
    }

    createClass(WordDetail, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                selection = _props.selection,
                onSelectPOS = _props.onSelectPOS;

            if (selection.word) {
                return React$1.createElement(
                    'div',
                    { className: 'word-detail' },
                    React$1.createElement(
                        'h2',
                        { className: 'head' },
                        React$1.createElement(
                            'span',
                            { className: 'label' },
                            selection.word.token
                        )
                    ),
                    React$1.createElement(
                        'section',
                        { className: 'body' },
                        !selection.word.lookup ? React$1.createElement(Spinner, null) : React$1.createElement(WordDetailBody, {
                            selection: selection,
                            onSelectPOS: onSelectPOS })
                    ),
                    selection.word.lookup ? React$1.createElement(
                        'div',
                        { className: 'attribution' },
                        React$1.createElement(
                            'div',
                            { className: 'attribution_dictionary' },
                            React$1.createElement(
                                'a',
                                { href: selection.word.lookup.attribution.url },
                                selection.word.lookup.attribution.text
                            )
                        ),
                        React$1.createElement(
                            'div',
                            { className: 'attribution_api' },
                            React$1.createElement('img', { src: '/static/img/wordnik_badge.png' })
                        )
                    ) : React$1.createElement('div', null)
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
}(React$1.Component);

var WordListItem = function WordListItem(_ref) {
    var word = _ref.word,
        onSelectWord = _ref.onSelectWord;
    return React$1.createElement(
        'div',
        { className: 'card word-item', onClick: function onClick() {
                return onSelectWord(word);
            } },
        React$1.createElement(
            'div',
            { className: 'label' },
            word.token,
            word.freq > 1 ? React$1.createElement(
                'span',
                { className: 'count badge' },
                word.freq
            ) : React$1.createElement('span', null)
        ),
        React$1.createElement(
            'div',
            { className: 'arrow right' },
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
    return React$1.createElement(
        'div',
        { className: classNames, onClick: function onClick() {
                return onSelect(level);
            } },
        React$1.createElement(
            'div',
            { className: 'label' },
            label.toLowerCase()
        ),
        React$1.createElement(
            'div',
            { className: 'count badge' },
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

    return React$1.createElement(
        'div',
        { className: 'difficulty' },
        $.map(Object.keys(groups), function (label) {
            var group = groups[label];
            return React$1.createElement(DifficultyGroup, {
                key: group.level,
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

    return React$1.createElement(
        'div',
        null,
        React$1.createElement(
            'h2',
            { className: 'media' },
            React$1.createElement('img', { className: 'poster', src: analysis.media.poster_url }),
            React$1.createElement(
                'span',
                { className: 'title' },
                analysis.media.title
            )
        ),
        React$1.createElement(
            'div',
            null,
            React$1.createElement(
                'span',
                { className: 'badge' },
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

    return React$1.createElement(
        'div',
        { className: 'word-list' },
        React$1.createElement(Heading, { analysis: analysis }),
        React$1.createElement(DifficultySelector, {
            selected: selection.difficulty,
            onSelect: onSelectDifficulty,
            words: sortedWords }),
        React$1.createElement(
            'div',
            { className: 'list' },
            $.map(wordsWithDifficulty, function (item) {
                return React$1.createElement(WordListItem, { key: item.token, word: item,
                    onSelectWord: onSelectWord });
            })
        )
    );
};

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

var App = function (_React$Component) {
    inherits(App, _React$Component);

    function App(_ref) {
        var analysis = _ref.analysis;
        classCallCheck(this, App);

        var _this2 = possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

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
        _this2.state = { selection: { difficulty: 3, POS: undefined, word: selectedWord } };
        return _this2;
    }

    createClass(App, [{
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
            window.location.hash = '';
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
        value: function render() {
            var _this3 = this;

            var analysis = this.props.analysis;

            return React$1.createElement(
                'div',
                { className: 'wrapper' },
                React$1.createElement(Nav, { analysis: analysis,
                    selection: this.state.selection,
                    onClick: function onClick() {
                        return _this3.handleUnselectWord();
                    } }),
                React$1.createElement(
                    'section',
                    { className: 'container' },
                    analysis ? React$1.createElement(
                        'div',
                        { className: 'analysis' },
                        this.state.selection.word ? React$1.createElement(WordDetail, {
                            selection: this.state.selection,
                            onSelectPOS: function onSelectPOS(p) {
                                return _this3.handleSelectPOS(p);
                            } }) : React$1.createElement(WordList, {
                            analysis: analysis,
                            selection: this.state.selection,
                            onSelectDifficulty: function onSelectDifficulty(d) {
                                return _this3.handleSelectDifficulty(d);
                            },
                            onSelectWord: function onSelectWord(w) {
                                return _this3.handleSelectWord(w);
                            } })
                    ) : React$1.createElement(Error, null)
                )
            );
        }
    }]);
    return App;
}(React$1.Component);

function loadAnalysis() {
    var imdbId = window.location.pathname.split('/').slice(-1)[0];
    return $.getJSON({
        url: '/api/analysis/' + imdbId
    });
}

function renderApp(analysis) {
    var container = document.getElementById('main');
    ReactDOM.render(React$1.createElement(App, { analysis: analysis }), container);
}

window.onload = function () {
    loadAnalysis().then(function (analysis) {
        return renderApp(analysis);
    }).catch(function (err) {
        console.error(err); // eslint-disable-line
        renderApp(null);
    });
};

}($,React,ReactDOM));
