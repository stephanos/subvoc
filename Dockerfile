FROM alpine

# install SENNA
RUN apk update && \
    wget http://ml.nec-labs.com/senna/senna-v3.0.tgz && \
    apk add --no-cache --virtual build-deps gcc musl-dev && \
    tar -xzf senna-v3.0.tgz && \
    rm senna-v3.0.tgz && \
    mkdir -p /app && \
    mkdir -p /app/util && \
    mv senna /app/util && \
    chown -R root:root /app/util/senna && \
    cd /app/util/senna && \
    rm senna* && \
    gcc -o senna-linux64 -O3 -ffast-math *.c && \
    rm sanity* && \
    rm *.c && \
    rm *.h && \
    rm -R embeddings/ && \
    rm -R doc/ && \
    apk del build-deps

# install Python
ADD dev-requirements.txt requirements.txt .nltk_packages /opt/
RUN apk add --no-cache bash python3 && \
    apk add --no-cache --virtual build-deps ca-certificates gcc musl-dev linux-headers python3-dev && \
    pip3 install --upgrade pip && \
    pip3 install -r /opt/dev-requirements.txt && \
    pip3 install -r /opt/requirements.txt && \
    python3 -m nltk.downloader $(tr "\n" " " < "/opt/.nltk_packages") && \
    apk del build-deps

# install Node
ADD package.json /opt/
RUN apk update \
  && apk --no-cache add curl nodejs=6.9.2-r1 openssl \
  && npm install --global yarn \
  && cd /opt \
  && yarn
ENV NODE_PATH /opt/node_modules

# expose Flask
EXPOSE 8000

WORKDIR /app/src

CMD ["/bin/bash"]