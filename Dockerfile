FROM mhart/alpine-node:14

LABEL maintainer="Neo Xu"

# create app directory
WORKDIR /usr/neoskx

COPY package*.json ./
# Bundle app source
COPY appsdist/ ./appsdist/
COPY apps/ ./apps/
COPY bin/ ./bin/
COPY public/ ./public/
COPY server/ ./server/
# Only install 
RUN npm ci

EXPOSE 9099
CMD ["node", "./bin/www"]

# Metadata
LABEL image.url="https://github.com/neoskx/examples" \
    image.title="examples" \
    image.description="All examples I did when I learn technologies"