FROM node:7-alpine

# download SENNA (at the top for caching reasons)
RUN wget http://ml.nec-labs.com/senna/senna-v3.0.tgz

# install system dependencies
RUN apk add --no-cache \
        bash ca-certificates gcc musl-dev linux-headers python3 python3-dev && \
    pip3 install --upgrade pip

# build SENNA
RUN tar -xzf senna-v3.0.tgz && \
    mv senna /usr/share && \
    rm /usr/share/senna/senna* && \
    rm senna-v3.0.tgz && \
    chown -R root:root /usr/share/senna && \
    cd /usr/share/senna && \
    gcc -o senna-linux64 -O3 -ffast-math *.c

# install Python dependencies
ADD dev-requirements.txt requirements.txt .nltk_packages /opt/
RUN pip3 install -r /opt/dev-requirements.txt && \
    pip3 install -r /opt/requirements.txt
RUN python3 -m nltk.downloader $(tr "\n" " " < "/opt/.nltk_packages")

# install Node dependencies
ADD package.json /opt/
RUN cd /opt && yarn
ENV NODE_PATH /opt/node_modules

# expose Flask
EXPOSE 8000

WORKDIR /app

CMD ["bash"]