set -e

$(pwd)/scripts/build-container.sh

docker run \
    --rm \
    --name dev-js \
    -it \
    -v $(pwd):/app/src \
    stephanos/subvoc \
    /bin/bash -c "scripts/update-js-vendor.sh && /opt/node_modules/rollup/bin/rollup --config --watch"