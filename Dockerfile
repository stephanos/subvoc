FROM node:7-alpine

# install Python
RUN apk add --no-cache bash ca-certificates gcc musl-dev linux-headers python3 python3-dev && \
    pip3 install --upgrade pip

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