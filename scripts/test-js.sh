set -e

$(pwd)/scripts/build-container.sh

docker run \
    --rm \
    --name test-js \
    -it \
    -v $(pwd):/app/src \
    stephanos/subvoc \
    /bin/bash -c "/app/node_modules/jest/bin/jest.js --runInBand --watch"
