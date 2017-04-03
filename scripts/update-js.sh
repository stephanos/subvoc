$(pwd)/scripts/build-docker.sh

docker run \
    --rm \
    --name update-js \
    -it \
    -v $(pwd):/app \
    stephanos/subvoc \
    /opt/node_modules/npm-check-updates/bin/ncu -a