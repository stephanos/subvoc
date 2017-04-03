$(pwd)/scripts/build-docker.sh

docker run \
    --rm \
    --name test \
    -it \
    -v $(pwd):/app \
    stephanos/subvoc \
    pytest-watch -- -vv --durations=5
