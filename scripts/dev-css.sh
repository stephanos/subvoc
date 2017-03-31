$(pwd)/scripts/build-docker.sh

docker run \
    --rm \
    --name dev-css \
    -it \
    -v $(pwd):/opt/app \
    stephanos/subvoc \
    ./node_modules/postcss-cli/bin/postcss --use autoprefixer /opt/app/static/css/**/*.css --replace