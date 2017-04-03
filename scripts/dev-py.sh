$(pwd)/scripts/build-docker.sh

# remove Python cache first
find . | grep -E "(__pycache__|\.pyc|\.pyo$)" | xargs rm -rf

docker run \
    --rm \
    --name dev-py \
    -it \
    -v $(pwd):/app \
    -p 8000:8000 \
    stephanos/subvoc \
    python3 /app/run.py
