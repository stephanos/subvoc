$(pwd)/scripts/build-docker.sh

docker run \
    --rm \
    --name update-js \
    -it \
    -v $(pwd):/app \
    stephanos/subvoc \
    /bin/bash -c "pur -r requirements.txt && pur -r dev-requirements.txt"