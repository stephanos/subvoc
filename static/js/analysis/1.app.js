(function ($,preact) {
'use strict';

$ = 'default' in $ ? $['default'] : $;
preact = 'default' in preact ? preact['default'] : preact;

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
            var word = _ref.word,
                onUnselect = _ref.onUnselect;

            if (word) {
                return preact.h(
                    'div',
                    { 'class': 'card word-detail' },
                    preact.h(
                        'header',
                        null,
                        preact.h(
                            'div',
                            { 'class': 'arrow', onClick: function onClick() {
                                    return onUnselect();
                                } },
                            '<'
                        ),
                        word.token
                    ),
                    preact.h(
                        'section',
                        null,
                        '...'
                    )
                );
            }
        }
    }]);

    return WordDetail;
}(preact.Component);

var WordListItem = function (_preact$Component2) {
    _inherits$1(WordListItem, _preact$Component2);

    function WordListItem() {
        _classCallCheck$1(this, WordListItem);

        return _possibleConstructorReturn$1(this, (WordListItem.__proto__ || Object.getPrototypeOf(WordListItem)).apply(this, arguments));
    }

    _createClass$1(WordListItem, [{
        key: 'render',
        value: function render(_ref2) {
            var word = _ref2.word,
                onSelect = _ref2.onSelect;

            return preact.h(
                'div',
                { 'class': 'card word-item', onClick: function onClick() {
                        return onSelect(word);
                    } },
                preact.h(
                    'div',
                    { 'class': 'label' },
                    word.token
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

var WordList = function (_preact$Component3) {
    _inherits$1(WordList, _preact$Component3);

    function WordList() {
        _classCallCheck$1(this, WordList);

        return _possibleConstructorReturn$1(this, (WordList.__proto__ || Object.getPrototypeOf(WordList)).apply(this, arguments));
    }

    _createClass$1(WordList, [{
        key: 'render',
        value: function render(_ref3) {
            var data = _ref3.data,
                onSelect = _ref3.onSelect;

            return preact.h(
                'div',
                { 'class': 'word-list' },
                $.map(data.words, function (item) {
                    return preact.h(WordListItem, { word: item.word, onSelect: onSelect });
                })
            );
        }
    }]);

    return WordList;
}(preact.Component);

var Analysis = function (_preact$Component4) {
    _inherits$1(Analysis, _preact$Component4);

    function Analysis() {
        _classCallCheck$1(this, Analysis);

        return _possibleConstructorReturn$1(this, (Analysis.__proto__ || Object.getPrototypeOf(Analysis)).apply(this, arguments));
    }

    _createClass$1(Analysis, [{
        key: 'handleSelect',
        value: function handleSelect(word) {
            this.setState({ word: word });
        }
    }, {
        key: 'handleUnselect',
        value: function handleUnselect() {
            this.setState({ word: undefined });
        }
    }, {
        key: 'render',
        value: function render(_ref4) {
            var _this5 = this;

            var data = _ref4.data;

            return preact.h(
                'div',
                { 'class': 'analysis ' + (this.state.word ? 'detail' : 'list') },
                preact.h(WordDetail, { word: this.state.word, onUnselect: function onUnselect() {
                        return _this5.handleUnselect();
                    } }),
                preact.h(WordList, { data: data, onSelect: function onSelect(w) {
                        return _this5.handleSelect(w);
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
                    'span',
                    null,
                    ' Unable to analyse movie :( ',
                    preact.h('br', null),
                    ' Sorry! '
                );
            }
        }
    }]);

    return Root;
}(preact.Component);

function loadAnalysis() {
    var imdbId = window.location.pathname.split('/').slice(-1)[0];
    return $.getJSON({
        url: '/analysis/' + imdbId
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
