$(pwd)/scripts/build-docker.sh

# remove Python cache first
find . | grep -E "(__pycache__|\.pyc|\.pyo$)" | xargs rm -rf

docker run \
    --rm \
    --name test-py \
    -it \
    -v $(pwd):/app \
    stephanos/subvoc \
    pytest && pytest-watch -- -vv --durations=5
