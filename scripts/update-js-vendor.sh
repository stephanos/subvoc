set -e

concat-cli -f '/opt/node_modules/react/dist/react.js' \
              '/opt/node_modules/react-dom/dist/react-dom.js' -o static/js/react/bundle.js

concat-cli -f '/opt/node_modules/classnames/index.js' \
              '/opt/node_modules/prop-types/prop-types.js' \
              '/opt/node_modules/react-slick/dist/react-slick.js' -o static/js/react-util/bundle.js