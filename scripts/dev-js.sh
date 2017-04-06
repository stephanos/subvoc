set -e

$(pwd)/scripts/dev-container.sh

docker run \
    --rm \
    --name dev-js \
    -it \
    -v $(pwd):/app/src \
    stephanos/subvoc \
    /opt/node_modules/rollup/bin/rollup --config --watch
