set -e

$(pwd)/scripts/build-container.sh

# remove Python cache first
find . | grep -E "(__pycache__|\.pyc|\.pyo$)" | xargs rm -rf

docker run \
    --rm \
    --name test-func \
    -it \
    -v $(pwd):/app/src \
    stephanos/subvoc \
    /bin/bash -c "pytest web/tests/* && pytest-watch -- web/tests/*"