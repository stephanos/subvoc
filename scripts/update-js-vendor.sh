set -e

concat-cli -f '/app/node_modules/react/dist/react.js' \
              '/app/node_modules/react-dom/dist/react-dom.js' -o static/js/react/bundle.js

concat-cli -f '/app/node_modules/classnames/index.js' \
              '/app/node_modules/react-slick/dist/react-slick.js' \
              '/app/node_modules/history/umd/history.js' \
              '/app/node_modules/redux/dist/redux.js' \
              '/app/node_modules/react-redux/dist/react-redux.js' \
              '/app/node_modules/redux-saga/dist/redux-saga.js' \
              '/app/node_modules/axios/dist/axios.js' -o static/js/util/bundle.js
