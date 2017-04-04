$(pwd)/scripts/build-docker.sh

docker run \
    --rm \
    --name check \
    -it \
    -v $(pwd):/app \
    stephanos/subvoc \
    /bin/bash -c "flake8 && pytest && /opt/node_modules/eslint/bin/eslint.js static/js/app/**/*.es6"
