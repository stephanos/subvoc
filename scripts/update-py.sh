set -e

$(pwd)/scripts/build-container.sh

docker run \
    --rm \
    --name update-js \
    -it \
    -v $(pwd):/app/src \
    stephanos/subvoc \
    /bin/bash -c "pur -r requirements.txt && pur -r dev-requirements.txt"