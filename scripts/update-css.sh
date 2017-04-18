set -e

$(pwd)/scripts/build-container.sh

docker run \
    --rm \
    --name dev-css \
    -it \
    -v $(pwd):/app/src \
    stephanos/subvoc \
    /app/node_modules/postcss-cli/bin/postcss --use autoprefixer /app/static/css/**/*.css --replace