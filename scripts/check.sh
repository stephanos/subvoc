set -e

$(pwd)/scripts/dev-container.sh

# remove Python cache first
find . | grep -E "(__pycache__|\.pyc|\.pyo$)" | xargs rm -rf

docker run \
    --rm \
    --name check \
    -it \
    -v $(pwd):/app/src \
    stephanos/subvoc \
    /bin/bash -c "yarn run check && flake8 && pytest --cov && sed -i \"s|/app/src/|`pwd`/|g\" .coverage"