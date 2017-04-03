$(pwd)/scripts/build-docker.sh

docker run \
    --rm \
    --name dev-js \
    -it \
    -v $(pwd):/app \
    stephanos/subvoc \
    /opt/node_modules/rollup/bin/rollup --config --watch
