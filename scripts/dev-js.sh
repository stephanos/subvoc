set -e

$(pwd)/scripts/dev-container.sh

docker run \
    --rm \
    --name dev-js \
    -it \
    -v $(pwd):/app/src \
    stephanos/subvoc \
    yarn dev
