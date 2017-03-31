$(pwd)/scripts/build-docker.sh

docker run \
    --rm \
    --name dev-js \
    -it \
    -v $(pwd):/opt/app \
    stephanos/subvoc \
    ./node_modules/rollup/bin/rollup --config --watch
