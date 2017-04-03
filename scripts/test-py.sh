$(pwd)/scripts/build-docker.sh

docker run \
    --rm \
    --name test \
    -it \
    -v $(pwd):/opt/app \
    stephanos/subvoc \
    pytest-watch -- -vv --durations=5
