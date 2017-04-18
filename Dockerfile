FROM alpine:3.5

# install SENNA
RUN apk update \
    && wget http://ml.nec-labs.com/senna/senna-v3.0.tgz \
    && apk add --no-cache --virtual build-deps gcc musl-dev \
    && tar -xzf senna-v3.0.tgz \
    && rm senna-v3.0.tgz \
    && mkdir -p /app \
    && mkdir -p /app/util \
    && mv senna /app/util \
    && chown -R root:root /app/util/senna \
    && cd /app/util/senna \
    && rm senna* \
    && gcc -o senna-linux64 -O3 -ffast-math *.c \
    && rm sanity* \
    && rm *.c \
    && rm *.h \
    && rm -R embeddings/ \
    && rm -R doc/ \
    && apk del build-deps

# install Python
ADD dev-requirements.txt requirements.txt .nltk_packages /app/
RUN apk add --no-cache bash python3 \
    && apk add --no-cache --virtual build-deps ca-certificates gcc musl-dev linux-headers python3-dev \
    && pip3 install --upgrade pip \
    && pip3 install -r /app/dev-requirements.txt \
    && pip3 install -r /app/requirements.txt \
    && python3 -m nltk.downloader $(tr "\n" " " < "/app/.nltk_packages") \
    && apk del build-deps

# install Node
ADD package.json /app/
RUN apk update \
    && apk --no-cache add nodejs=6.9.2-r1 openssl \
    && npm install --global yarn \
    && cd /app \
    && yarn global add concat-cli npm-check-updates onchange \
    && yarn

# install Firefox & virtual framebuffer
ARG GECKODRIVER_VERSION=0.11.1
RUN apk add --no-cache dbus firefox-esr fontconfig ttf-freefont xvfb \
    && wget -O /tmp/geckodriver.tar.gz https://github.com/mozilla/geckodriver/releases/download/v$GECKODRIVER_VERSION/geckodriver-v$GECKODRIVER_VERSION-linux64.tar.gz \
    && rm -rf /app/geckodriver \
    && tar -C /app -zxf /tmp/geckodriver.tar.gz \
    && rm /tmp/geckodriver.tar.gz \
    && mv /app/geckodriver /app/geckodriver-$GECKODRIVER_VERSION \
    && chmod 755 /app/geckodriver-$GECKODRIVER_VERSION \
    && ln -fs /app/geckodriver-$GECKODRIVER_VERSION /usr/bin/geckodriver

WORKDIR /app/src

CMD ["/bin/bash"]