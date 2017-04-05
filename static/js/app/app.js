(function (React$1,ReactDOM,$$1,classNames,Slider) {
'use strict';

React$1 = 'default' in React$1 ? React$1['default'] : React$1;
ReactDOM = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;
$$1 = 'default' in $$1 ? $$1['default'] : $$1;
classNames = 'default' in classNames ? classNames['default'] : classNames;
Slider = 'default' in Slider ? Slider['default'] : Slider;

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

var API = function () {
    function API() {
        classCallCheck(this, API);
    }

    createClass(API, null, [{
        key: "lookupWord",
        value: function lookupWord(word) {
            return $.getJSON({
                url: "/api/words/" + word.token,
                error: function error(xhr, status, err) {
                    console.error(err); // eslint-disable-line
                }
            });
        }
    }, {
        key: "loadAnalysis",
        value: function loadAnalysis(imdbId) {
            return $.getJSON({
                url: "/api/analysis/" + imdbId,
                error: function error(xhr, status, err) {
                    console.error(err); // eslint-disable-line
                }
            });
        }
    }, {
        key: "searchMovie",
        value: function searchMovie(query) {
            return $.getJSON({
                url: "/api/search/" + query,
                error: function error(xhr, status, err) {
                    console.error(err); // eslint-disable-line
                }
            });
        }
    }]);
    return API;
}();

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
                    selection && selection.word ? React.createElement(
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
                $$1.map(definitions, function (entry, idx) {
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
        $$1.map(excerpt.sentences, function (sentence, s_idx) {
            var words = sentence.text.split(/\b/);
            return React$1.createElement(
                'div',
                { key: s_idx, className: 'line' },
                $$1.map(words, function (word, w_idx) {
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
            $$1.map(excerpts, function (excerpt, idx) {
                return React$1.createElement(WordExcerpt, { key: idx, excerpt: excerpt });
            })
        ) : React$1.createElement('div', null),
        ' '
    );
};

var WordPartOfSpeachHeader = function WordPartOfSpeachHeader(_ref) {
    var active = _ref.active,
        enabled = _ref.enabled,
        label = _ref.label,
        freq = _ref.freq,
        onSelectPOS = _ref.onSelectPOS;

    var classNames$$1 = 'tab card ' + (enabled ? '' : 'empty') + ' ' + (active ? 'active' : '');
    return React$1.createElement(
        'div',
        { onClick: function onClick() {
                return enabled ? onSelectPOS(label) : null;
            }, className: classNames$$1 },
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
};

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

    var selectedPOS = selection.POS || $$1.grep(PARTS_OF_SPEACH, function (pos) {
        return getExcerpts(selection.word, pos).length > 0;
    })[0];

    return React$1.createElement(
        'div',
        null,
        React$1.createElement(
            'header',
            { className: 'tab-group' },
            $$1.map(PARTS_OF_SPEACH, function (pos) {
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

var Spinner = function Spinner(_ref) {
    var big = _ref.big;
    return React.createElement(
        "div",
        { className: classNames("spinner", { big: big }) },
        React.createElement("div", { className: "double-bounce1" }),
        React.createElement("div", { className: "double-bounce2" })
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
            $$1(window).scrollTop(0);
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

    var classNames$$1 = 'group card ' + (active ? 'active' : '');
    return React$1.createElement(
        'div',
        { className: classNames$$1, onClick: function onClick() {
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
    $$1(words).each(function (idx, word) {
        groups[word.difficulty.label] = {
            level: word.difficulty.level,
            count: (groups[word.difficulty.label] || { count: 0 }).count + 1
        };
    });

    return React$1.createElement(
        'div',
        { className: 'difficulty' },
        $$1.map(Object.keys(groups), function (label) {
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

    var wordsWithDifficulty = $$1.grep(sortedWords, function (w) {
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
            $$1.map(wordsWithDifficulty, function (item) {
                return React$1.createElement(WordListItem, { key: item.token, word: item,
                    onSelectWord: onSelectWord });
            })
        )
    );
};

var Analysis = function (_React$Component) {
    inherits(Analysis, _React$Component);

    function Analysis(_ref) {
        var analysis = _ref.analysis;
        classCallCheck(this, Analysis);

        var _this = possibleConstructorReturn(this, (Analysis.__proto__ || Object.getPrototypeOf(Analysis)).call(this));

        _this.state = { selection: { difficulty: 3, POS: undefined, word: undefined } };
        return _this;
    }

    createClass(Analysis, [{
        key: 'handleSelectWord',
        value: function handleSelectWord(word) {
            this.setState(function (prevState) {
                prevState.listScrollPos = $$1(window).scrollTop();
                prevState.selection.word = word;
            });
            this.lookupWord(word);
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
                $$1(window).scrollTop(this.state.listScrollPos);
                delete this.state.listScrollPos;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var analysis = this.props.analysis;

            return React$1.createElement(
                'div',
                null,
                React$1.createElement(Nav, { analysis: analysis,
                    selection: this.state.selection,
                    onClick: function onClick() {
                        return _this2.handleUnselectWord();
                    } }),
                React$1.createElement(
                    'section',
                    { className: 'container' },
                    React$1.createElement(
                        'div',
                        { className: 'analysis' },
                        this.state.selection.word ? React$1.createElement(WordDetail, {
                            selection: this.state.selection,
                            onSelectPOS: function onSelectPOS(p) {
                                return _this2.handleSelectPOS(p);
                            } }) : React$1.createElement(WordList, {
                            analysis: analysis,
                            selection: this.state.selection,
                            onSelectDifficulty: function onSelectDifficulty(d) {
                                return _this2.handleSelectDifficulty(d);
                            },
                            onSelectWord: function onSelectWord(w) {
                                return _this2.handleSelectWord(w);
                            } })
                    )
                )
            );
        }
    }, {
        key: 'lookupWord',
        value: function lookupWord(word) {
            var _this3 = this;

            var xhr = API.lookupWord(word);
            xhr.then(function (res) {
                _this3.setState(function (prevState) {
                    if (prevState.selection.word) {
                        prevState.selection.word.lookup = res;
                    }
                });
            });
            return xhr;
        }
    }]);
    return Analysis;
}(React$1.Component);

var Intro = function Intro() {
  return React.createElement(
    "div",
    { className: "step-by-step" },
    React.createElement(
      "ol",
      null,
      React.createElement(
        "li",
        null,
        React.createElement(
          "span",
          null,
          React.createElement(
            "strong",
            null,
            "search"
          ),
          " for a movie"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "span",
          null,
          React.createElement(
            "strong",
            null,
            "browse"
          ),
          " its vocabulary"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "span",
          null,
          React.createElement(
            "strong",
            null,
            "learn"
          ),
          " new words"
        )
      )
    )
  );
};

var SearchBar = function SearchBar(_ref) {
    var onSearch = _ref.onSearch;

    var debouncedSearch = $$1.debounce(500, function (e) {
        return onSearch(e.target.value);
    });

    return React.createElement(
        "div",
        { className: "search" },
        React.createElement("div", { className: "search-input" }),
        React.createElement(
            "div",
            { className: "search-wrapper" },
            React.createElement("input", { type: "text",
                className: "searchbar",
                name: "q",
                autoFocus: true,
                autoComplete: "off",
                onChange: function onChange(e) {
                    e.persist();
                    debouncedSearch(e);
                },
                placeholder: "Search movie ..." })
        )
    );
};

var Attribution = function Attribution() {
    return React.createElement(
        "footer",
        { className: "credit" },
        "Posters provided by ",
        React.createElement(
            "a",
            { href: "https://fanart.tv" },
            "fanart.tv"
        )
    );
};

var SearchResultItem = function SearchResultItem(_ref) {
    var item = _ref.item,
        onSelect = _ref.onSelect;
    return React.createElement(
        'div',
        { className: 'search-result-item', onClick: function onClick() {
                return onSelect(item.id);
            } },
        React.createElement(
            'a',
            { className: 'header' },
            item.poster_url ? React.createElement('img', { className: 'poster', src: item.poster_url }) : React.createElement('img', { className: 'poster empty', src: '/static/img/placeholder.png' })
        ),
        React.createElement(
            'div',
            { className: 'footer' },
            item.title
        )
    );
};

var SearchResults = function SearchResults(_ref2) {
    var items = _ref2.items,
        onSelect = _ref2.onSelect;

    var slickSettings = {
        'infinite': false,
        'slidesToShow': 4,
        'slidesToScroll': 4,
        'responsive': [{
            'breakpoint': 1024,
            'settings': {
                'slidesToShow': 4,
                'slidesToScroll': 4
            }
        }, {
            'breakpoint': 600,
            'settings': {
                'slidesToShow': 3,
                'slidesToScroll': 3
            }
        }, {
            'breakpoint': 480,
            'settings': {
                'slidesToShow': 2,
                'slidesToScroll': 2
            }
        }]
    };

    return React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { className: 'search-result-wrapper' },
            React.createElement(
                'div',
                { className: 'search-result' },
                items.length === 0 ? React.createElement(
                    'div',
                    { className: 'empty' },
                    ' No movie was found. '
                ) : React.createElement(
                    Slider,
                    slickSettings,
                    $$1.map(items, function (item) {
                        return React.createElement(
                            'div',
                            { key: item.id },
                            React.createElement(SearchResultItem, { item: item, onSelect: onSelect })
                        );
                    })
                )
            )
        ),
        items.length !== 0 ? React.createElement(Attribution, null) : React.createElement('span', null)
    );
};

var Search = function (_React$Component) {
    inherits(Search, _React$Component);

    function Search() {
        classCallCheck(this, Search);

        var _this = possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this));

        _this.state = { items: undefined };
        return _this;
    }

    createClass(Search, [{
        key: 'handleSearch',
        value: function handleSearch(query) {
            var _this2 = this;

            this.setState(function (prevState) {
                if (prevState.searchXHR) {
                    prevState.searchXHR.abort();
                }

                prevState.searchXHR = _this2.searchMovie(query);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var onSelect = this.props.onSelect;

            return React$1.createElement(
                'div',
                null,
                React$1.createElement(Nav, null),
                React$1.createElement(
                    'section',
                    { className: 'container' },
                    React$1.createElement(
                        'h1',
                        { className: 'heading' },
                        'Use movies to discover new vocabulary.'
                    ),
                    React$1.createElement(SearchBar, { onSearch: function onSearch(q) {
                            return _this3.handleSearch(q);
                        } }),
                    this.state.searchXHR ? React$1.createElement(Spinner, { big: true }) : this.state.items === undefined ? React$1.createElement(Intro, null) : React$1.createElement(SearchResults, { items: this.state.items,
                        onSelect: onSelect })
                )
            );
        }
    }, {
        key: 'searchMovie',
        value: function searchMovie(query) {
            var _this4 = this;

            if ($$1.trim(query) === '') {
                return;
            }

            var xhr = API.searchMovie(query);
            xhr.then(function (res) {
                _this4.setState(function (prevState) {
                    prevState.searchXHR = undefined;
                    prevState.items = res.hits;
                });
            }).catch(function (err) {
                if (err.statusText === 'abort') {
                    return;
                }
                document.location.href = "/error";
            });
            return xhr;
        }
    }]);
    return Search;
}(React$1.Component);

var App = function (_React$Component) {
    inherits(App, _React$Component);

    function App() {
        classCallCheck(this, App);

        var _this = possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {};
        return _this;
    }

    createClass(App, [{
        key: 'handleSelection',
        value: function handleSelection(movieId) {
            var _this2 = this;

            this.setState(function (prevState) {
                if (prevState.analysisXHR) {
                    prevState.analysisXHR.abort();
                }

                prevState.analysisXHR = _this2.loadAnalysis(movieId);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React$1.createElement(
                'div',
                null,
                this.state.analysisXHR ? React$1.createElement(
                    'div',
                    null,
                    React$1.createElement(Nav, null),
                    React$1.createElement(Spinner, { big: true })
                ) : this.state.analysis ? React$1.createElement(Analysis, { analysis: this.state.analysis }) : React$1.createElement(Search, { onSelect: function onSelect(id) {
                        return _this3.handleSelection(id);
                    } })
            );
        }
    }, {
        key: 'loadAnalysis',
        value: function loadAnalysis(movieId) {
            var _this4 = this;

            var xhr = API.loadAnalysis(movieId);
            xhr.then(function (res) {
                _this4.setState(function (prevState) {
                    prevState.analysisXHR = undefined;
                    prevState.analysis = res;
                });
            }).catch(function (err) {
                if (err.statusText === 'abort') {
                    return;
                }
                document.location.href = "/error";
            });
            return xhr;
        }
    }]);
    return App;
}(React$1.Component);

window.onload = function () {
    var container = document.getElementById('main');
    ReactDOM.render(React$1.createElement(App, null), container);
};

}(React,ReactDOM,$,classNames,Slider));
