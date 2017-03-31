$(pwd)/scripts/build-docker.sh

docker run \
    --rm \
    --name dev-py \
    -it \
    -p 8000:8000 \
    -v $(pwd):/opt/app \
    stephanos/subvoc \
    python3 /opt/app/run.py
