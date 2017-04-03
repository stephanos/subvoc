$(pwd)/scripts/build-docker.sh

docker run \
    --rm \
    --name dev-css \
    -it \
    -v $(pwd):/app \
    stephanos/subvoc \
    /opt/node_modules/postcss-cli/bin/postcss --use autoprefixer /app/static/css/**/*.css --replace