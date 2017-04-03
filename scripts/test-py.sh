$(pwd)/scripts/build-docker.sh

# remove Python cache first
find . | grep -E "(__pycache__|\.pyc|\.pyo$)" | xargs rm -rf

docker run \
    --rm \
    --name test-py \
    -it \
    -v $(pwd):/app \
    stephanos/subvoc \
    /bin/bash -c "pytest && pytest-watch -- -vv --durations=5"
