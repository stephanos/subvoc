FROM node:7-alpine

# install Python
RUN apk add --no-cache bash ca-certificates gcc musl-dev linux-headers python3 python3-dev && \
    pip3 install --upgrade pip

# install Python dependencies
ADD dev-requirements.txt requirements.txt .nltk_packages /tmp/
RUN pip3 install -r /tmp/dev-requirements.txt && \
    pip3 install -r /tmp/requirements.txt
RUN python3 -m nltk.downloader $(tr "\n" " " < "/tmp/.nltk_packages")

# install Node dependencies
ADD package.json /tmp/package.json
RUN yarn

# expose Flask
EXPOSE 8000

WORKDIR /opt/app

CMD ["bash"]