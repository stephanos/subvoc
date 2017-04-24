(function (React$1,ReactDOM,classNames,axios,Slider) {
'use strict';

React$1 = 'default' in React$1 ? React$1['default'] : React$1;
ReactDOM = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;
classNames = 'default' in classNames ? classNames['default'] : classNames;
axios = 'default' in axios ? axios['default'] : axios;
Slider = 'default' in Slider ? Slider['default'] : Slider;

Array.prototype.find = Array.prototype.find || function (callback) {
  if (this === null) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  } else if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }
  var list = Object(this);
  // Makes sures is always has an positive integer as length.
  var length = list.length >>> 0;
  var thisArg = arguments[1];
  for (var i = 0; i < length; i++) {
    var element = list[i];
    if (callback.call(thisArg, element, i, list)) {
      return element;
    }
  }
};

var WordDefinitionList = function WordDefinitionList(_ref) {
    var definitions = _ref.definitions;
    return React$1.createElement(
        "div",
        { className: "definitions" },
        React$1.createElement(
            "h4",
            null,
            "Definition"
        ),
        definitions.length > 0 ? React$1.createElement(
            "div",
            null,
            React$1.createElement(
                "ol",
                null,
                definitions.map(function (entry, idx) {
                    return React$1.createElement(
                        "li",
                        { key: idx, className: "definition" },
                        entry.definition
                    );
                })
            )
        ) : React$1.createElement(
            "div",
            null,
            "None was found."
        )
    );
};

var WordExcerpt = function WordExcerpt(_ref) {
    var excerpt = _ref.excerpt;
    return React$1.createElement(
        "div",
        { className: "excerpt" },
        excerpt.sentences.map(function (sentence, s_idx) {
            var words = sentence.text.split(/\b/);
            return React$1.createElement(
                "div",
                { key: s_idx, className: "line" },
                words.map(function (word, w_idx) {
                    var className = word === excerpt.token ? 'token' : '';
                    return React$1.createElement(
                        "span",
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
        "div",
        null,
        " ",
        excerpts.length > 0 ? React$1.createElement(
            "div",
            { className: "excerpts" },
            React$1.createElement(
                "h4",
                null,
                "Movie Excerpt"
            ),
            excerpts.map(function (excerpt, idx) {
                return React$1.createElement(WordExcerpt, { key: idx, excerpt: excerpt });
            })
        ) : React$1.createElement("div", null),
        " "
    );
};

var PARTS_OF_SPEECH = {
    'noun': 'noun',
    'verb': 'verb',
    'adjective': 'adj',
    'adverb': 'adv'
};

function getFreq(word, pos) {
    return (word.byPOS[pos] || {}).freq || 0;
}

function getExcerpts(word, pos) {
    return (word.byPOS[pos] || {}).excerpts || [];
}

function getDefinitions(word, pos) {
    return word.lookup[pos] || [];
}

var PartOfSpeechItem = function PartOfSpeechItem(_ref) {
    var type = _ref.type,
        enabled = _ref.enabled,
        active = _ref.active,
        label = _ref.label,
        freq = _ref.freq,
        onSelect = _ref.onSelect;

    var classes = classNames(label, 'tab', 'card', { 'empty': !enabled }, { active: active });
    return React$1.createElement(
        'div',
        { onClick: function onClick() {
                return enabled ? onSelect(type) : null;
            }, className: classes },
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

var PartOfSpeechSelector = function PartOfSpeechSelector(_ref2) {
    var selected = _ref2.selected,
        word = _ref2.word,
        onSelect = _ref2.onSelect;
    return React$1.createElement(
        'div',
        null,
        Object.keys(PARTS_OF_SPEECH).map(function (pos) {
            return React$1.createElement(PartOfSpeechItem, {
                key: pos,
                type: pos,
                enabled: (getExcerpts(word, pos).length || getDefinitions(word, pos).length) > 0,
                active: selected === pos,
                label: PARTS_OF_SPEECH[pos],
                freq: getFreq(word, pos),
                onSelect: onSelect });
        })
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

var WordDetailBody = function (_React$Component) {
    inherits(WordDetailBody, _React$Component);

    function WordDetailBody(props) {
        classCallCheck(this, WordDetailBody);

        var _this = possibleConstructorReturn(this, (WordDetailBody.__proto__ || Object.getPrototypeOf(WordDetailBody)).call(this, props));

        _this.state = {};
        return _this;
    }

    createClass(WordDetailBody, [{
        key: 'handleSelectPOS',
        value: function handleSelectPOS(POS) {
            this.setState(function (prevState) {
                prevState.POS = POS;
            });
        }
    }, {
        key: 'getSelectedPOS',
        value: function getSelectedPOS(word) {
            return this.state.POS || Object.keys(PARTS_OF_SPEECH).find(function (pos) {
                return getExcerpts(word, pos).length > 0;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var word = this.props.word;

            var selectedPOS = this.getSelectedPOS(word);

            return React$1.createElement(
                'div',
                null,
                React$1.createElement(
                    'header',
                    { className: 'tab-group' },
                    React$1.createElement(PartOfSpeechSelector, {
                        word: word,
                        selected: selectedPOS,
                        onSelect: function onSelect(p) {
                            return _this2.handleSelectPOS(p);
                        } })
                ),
                React$1.createElement(
                    'section',
                    null,
                    React$1.createElement(WordExcerptList, { excerpts: getExcerpts(word, selectedPOS) })
                ),
                React$1.createElement(
                    'section',
                    null,
                    React$1.createElement(WordDefinitionList, { definitions: getDefinitions(word, selectedPOS) })
                )
            );
        }
    }]);
    return WordDetailBody;
}(React$1.Component);

var Spinner = function Spinner(_ref) {
    var big = _ref.big,
        centered = _ref.centered;
    return React.createElement(
        "div",
        { className: classNames("spinner", { big: big }, { centered: centered }) },
        React.createElement("div", { className: "double-bounce1" }),
        React.createElement("div", { className: "double-bounce2" })
    );
};

var CancelToken = axios.CancelToken;

function cancelableGet(url) {
    var source = CancelToken.source();

    var result = {
        promise: axios.get(url, {
            cancelToken: source.token
        }),
        cancel: function cancel() {
            source.cancel();
        }
    };

    result.then = function (fn) {
        result.promise = result.promise.then(fn);
        return result;
    };
    result.catch = function (fn) {
        result.promise = result.promise.catch(fn);
        return result;
    };

    return result;
}

var API = function () {
    function API() {
        classCallCheck(this, API);
    }

    createClass(API, null, [{
        key: 'isCancel',
        value: function isCancel(err) {
            return axios.isCancel(err);
        }
    }, {
        key: 'lookupWord',
        value: function lookupWord(word) {
            return cancelableGet('/api/words/' + word);
        }
    }, {
        key: 'loadAnalysis',
        value: function loadAnalysis(imdbId) {
            return cancelableGet('/api/analysis/' + imdbId);
        }
    }, {
        key: 'searchMovie',
        value: function searchMovie(query) {
            return cancelableGet('/api/search/' + query);
        }
    }]);
    return API;
}();

var PAGE = {
    analytics: new RegExp('/m/(\\w+)'),
    search: '/',
    word: new RegExp('/m/(\\w+)/w/(\\w+)')
};

var TITLE_SUFFIX = ' | subvoc';

var HISTORY = void 0;
function history() {
    if (!HISTORY) {
        HISTORY = window.History.createBrowserHistory();
    }
    return HISTORY;
}

var Router = function () {
    function Router() {
        classCallCheck(this, Router);
    }

    createClass(Router, null, [{
        key: 'getState',
        value: function getState() {
            var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : location.pathname;

            var wordRouteMatch = path.match(PAGE.word);
            if (wordRouteMatch) {
                return { movieId: wordRouteMatch[1], word: wordRouteMatch[2] };
            }

            var analysisRouteMatch = path.match(PAGE.analytics);
            if (analysisRouteMatch) {
                return { movieId: analysisRouteMatch[1] };
            }

            return {};
        }
    }, {
        key: 'onAnalysisPage',
        value: function onAnalysisPage(movie) {
            var title = movie.title ? '' + movie.title : 'Analysis';
            document.title = title + TITLE_SUFFIX;

            var path = '/m/' + movie.id;
            if (path !== location.pathname) {
                history().push(path);
            }
        }
    }, {
        key: 'onWordPage',
        value: function onWordPage(movie, word) {
            var title = word ? '' + word : 'Details';
            document.title = title + TITLE_SUFFIX;

            var path = '/m/' + movie.id + '/w/' + word;
            if (path !== location.pathname) {
                history().push(path);
            }
        }
    }, {
        key: 'onUrlChange',
        value: function onUrlChange(callback) {
            history().listen(callback);
        }
    }]);
    return Router;
}();

function scrollTo(pos) {
    document.documentElement.scrollTop = document.body.scrollTop = pos;
}

function scrollPos() {
    return (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
}

var Word = function (_React$Component) {
    inherits(Word, _React$Component);

    function Word() {
        classCallCheck(this, Word);
        return possibleConstructorReturn(this, (Word.__proto__ || Object.getPrototypeOf(Word)).apply(this, arguments));
    }

    createClass(Word, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                analysis = _props.analysis,
                word = _props.word;


            Router.onWordPage(analysis.media, word.token);
            this.setState({
                word: word,
                wordXHR: this.lookupWord(word.token)
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            window.onpopstate = function (e) {
                e.preventDefault();
                _this2.props.onUnselect();
            };
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            scrollTo(0);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.state.wordXHR) {
                this.state.wordXHR.cancel();
            }
            window.onpopstate = undefined;
        }
    }, {
        key: 'render',
        value: function render() {
            var word = this.state.word;


            return React$1.createElement(
                'div',
                { className: 'word-detail' },
                React$1.createElement(
                    'h2',
                    { className: 'head' },
                    React$1.createElement(
                        'span',
                        { className: 'label' },
                        word.token
                    )
                ),
                React$1.createElement(
                    'section',
                    { className: 'body' },
                    !word.lookup ? React$1.createElement(Spinner, null) : React$1.createElement(WordDetailBody, { word: word })
                ),
                word.lookup ? React$1.createElement(
                    'div',
                    { className: 'attribution' },
                    React$1.createElement(
                        'div',
                        { className: 'attribution_dictionary' },
                        React$1.createElement(
                            'a',
                            { href: word.lookup.attribution.url },
                            word.lookup.attribution.text
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
    }, {
        key: 'lookupWord',
        value: function lookupWord(word) {
            var _this3 = this;

            var req = API.lookupWord(word);
            req.then(function (res) {
                _this3.setState(function (prevState) {
                    prevState.wordXHR = undefined;
                    prevState.word.lookup = res.data;
                });
            }).catch(function (err) {
                if (API.isCancel(err)) {
                    return;
                }
                console.error(err); // eslint-disable-line
                document.location.href = "/error";
            });
            return req;
        }
    }]);
    return Word;
}(React$1.Component);

var WordListItem = function (_React$Component) {
    inherits(WordListItem, _React$Component);

    function WordListItem() {
        classCallCheck(this, WordListItem);
        return possibleConstructorReturn(this, (WordListItem.__proto__ || Object.getPrototypeOf(WordListItem)).apply(this, arguments));
    }

    createClass(WordListItem, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                word = _props.word,
                onSelect = _props.onSelect;

            return React$1.createElement(
                "div",
                { className: "card word-item", onClick: function onClick() {
                        return onSelect(word);
                    } },
                React$1.createElement(
                    "div",
                    { className: "label" },
                    word.token,
                    word.freq > 1 ? React$1.createElement(
                        "span",
                        { className: "count badge" },
                        word.freq
                    ) : React$1.createElement("span", null)
                ),
                React$1.createElement(
                    "div",
                    { className: "arrow right" },
                    ">"
                )
            );
        }
    }]);
    return WordListItem;
}(React$1.Component);

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
    words.forEach(function (word) {
        groups[word.difficulty.label] = {
            level: word.difficulty.level,
            count: (groups[word.difficulty.label] || { count: 0 }).count + 1
        };
    });

    return React$1.createElement(
        'div',
        { className: 'difficulty' },
        Object.keys(groups).map(function (label) {
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

var WordList = function (_React$Component) {
    inherits(WordList, _React$Component);

    function WordList() {
        classCallCheck(this, WordList);
        return possibleConstructorReturn(this, (WordList.__proto__ || Object.getPrototypeOf(WordList)).apply(this, arguments));
    }

    createClass(WordList, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            Router.onAnalysisPage(this.props.analysis.media);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                analysis = _props.analysis,
                difficulty = _props.difficulty,
                onSelectWord = _props.onSelectWord,
                onSelectDifficulty = _props.onSelectDifficulty;

            var sortedWords = analysis.words.sort(function (a, b) {
                return a.difficulty.value - b.difficulty.value;
            });

            var wordsWithDifficulty = sortedWords.filter(function (w) {
                return w.difficulty.level === difficulty;
            });

            return React$1.createElement(
                'div',
                { className: 'word-list' },
                React$1.createElement(Heading, { analysis: analysis }),
                React$1.createElement(DifficultySelector, {
                    selected: difficulty,
                    onSelect: onSelectDifficulty,
                    words: sortedWords }),
                React$1.createElement(
                    'div',
                    { className: 'list' },
                    wordsWithDifficulty.map(function (item) {
                        return React$1.createElement(WordListItem, { key: item.token, word: item,
                            onSelect: onSelectWord });
                    })
                )
            );
        }
    }]);
    return WordList;
}(React$1.Component);

var Nav = function Nav(_ref) {
    var analysis = _ref.analysis,
        word = _ref.word,
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
                    analysis && word && word.token ? React.createElement(
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

var Analysis = function (_React$Component) {
    inherits(Analysis, _React$Component);

    function Analysis(_ref) {
        var movieId = _ref.movieId,
            word = _ref.word;
        classCallCheck(this, Analysis);

        var _this = possibleConstructorReturn(this, (Analysis.__proto__ || Object.getPrototypeOf(Analysis)).call(this));

        _this.state = {
            difficulty: 3,
            word: { token: word }
        };
        return _this;
    }

    createClass(Analysis, [{
        key: 'handleSelectWord',
        value: function handleSelectWord(word) {
            this.setState(function (prevState) {
                prevState.listScrollPos = scrollPos();
                prevState.word = word;
            });
        }
    }, {
        key: 'handleSelectDifficulty',
        value: function handleSelectDifficulty(difficulty) {
            this.setState(function (prevState) {
                prevState.difficulty = difficulty;
            });
        }
    }, {
        key: 'handleUnselectWord',
        value: function handleUnselectWord() {
            this.setState(function (prevState) {
                delete prevState.word;
            });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({
                analysisXHR: this.loadAnalysis(this.props.movieId)
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.state.analysisXHR) {
                this.state.analysisXHR.abort();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (!this.state.word && this.state.listScrollPos) {
                scrollTo(this.state.listScrollPos);
                delete this.state.listScrollPos;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                analysis = _state.analysis,
                difficulty = _state.difficulty,
                word = _state.word;


            return React$1.createElement(
                'div',
                null,
                React$1.createElement(Nav, { analysis: analysis,
                    word: word,
                    onClick: function onClick() {
                        return _this2.handleUnselectWord();
                    } }),
                this.state.analysisXHR ? React$1.createElement(
                    'div',
                    null,
                    React$1.createElement(Spinner, { big: true, centered: true })
                ) : React$1.createElement(
                    'section',
                    { className: 'container' },
                    React$1.createElement(
                        'div',
                        { className: 'analysis' },
                        word && word.token ? React$1.createElement(Word, {
                            analysis: analysis,
                            word: word,
                            onUnselect: function onUnselect() {
                                return _this2.handleUnselectWord();
                            } }) : React$1.createElement(WordList, {
                            analysis: analysis,
                            difficulty: difficulty,
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
        key: 'loadAnalysis',
        value: function loadAnalysis(movieId) {
            var _this3 = this;

            var xhr = API.loadAnalysis(movieId);
            xhr.then(function (res) {
                _this3.setState(function (prevState) {
                    prevState.analysisXHR = undefined;
                    prevState.analysis = res.data;
                    prevState.word = res.data.words.find(function (w) {
                        return w == prevState.word.token;
                    });
                });
            }).catch(function (err) {
                if (API.isCancel(err)) {
                    return;
                }
                console.error(err); // eslint-disable-line
                document.location.href = "/error";
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

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function later() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

var SearchBar = function SearchBar(_ref) {
    var onSearch = _ref.onSearch;

    var debouncedSearch = debounce(function (e) {
        return onSearch(e.target.value);
    }, 500);

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
                return onSelect(item);
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
                    items.map(function (item) {
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

    function Search(_ref) {
        var api = _ref.api;
        classCallCheck(this, Search);

        var _this = possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this));

        _this.api = api;
        _this.state = { items: undefined };
        return _this;
    }

    createClass(Search, [{
        key: 'handleSearch',
        value: function handleSearch(query) {
            var _this2 = this;

            this.setState(function (prevState) {
                if (prevState.searchReq) {
                    prevState.searchReq.cancel();
                }

                prevState.searchReq = _this2.searchMovie(query);
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
                    this.state.searchReq ? React$1.createElement(Spinner, { big: true }) : this.state.items === undefined ? React$1.createElement(Intro, null) : React$1.createElement(SearchResults, { items: this.state.items, onSelect: onSelect })
                )
            );
        }
    }, {
        key: 'searchMovie',
        value: function searchMovie(query) {
            var _this4 = this;

            if (!query || !query.trim().length) {
                return;
            }

            var xhr = this.api.searchMovie(query);
            xhr.then(function (res) {
                _this4.setState(function (prevState) {
                    prevState.searchReq = undefined;
                    prevState.items = res.data.hits;
                });
            }).catch(function (err) {
                if (_this4.api.isCancel(err)) {
                    return;
                }
                console.error(err); // eslint-disable-line
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

        _this.state = { selection: Router.getState() };
        return _this;
    }

    createClass(App, [{
        key: 'handleSelection',
        value: function handleSelection(movie) {
            this.setState({ movie: movie });
            Router.onAnalysisPage(movie);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            Router.onUrlChange(function () {
                return _this2.setState({
                    selection: Router.getState()
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state$selection = this.state.selection,
                movieId = _state$selection.movieId,
                word = _state$selection.word;


            return React$1.createElement(
                'div',
                null,
                movieId ? React$1.createElement(Analysis, { movieId: movieId, word: word }) : React$1.createElement(Search, { api: API, onSelect: function onSelect(m) {
                        return _this3.handleSelection(m);
                    } })
            );
        }
    }]);
    return App;
}(React$1.Component);

var container = document.getElementById('main');
ReactDOM.render(React$1.createElement(App, null), container);

}(React,ReactDOM,classNames,axios,Slider));
