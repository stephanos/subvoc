set -e

docker build \
    -f Dockerfile . \
    -t stephanos/subvoc