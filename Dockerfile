FROM nikolaik/python-nodejs:python3.9-nodejs14-alpine

LABEL maintainer="Neo Xu"

# create app directory
WORKDIR /usr/bitsky

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make git fts-dev

COPY package*.json ./
# Bundle app source
COPY . .

# Only install 
RUN npm install
# RUN cd ./scripts && npx zx build.mjs

EXPOSE 9099
CMD ["node", "./bin/www"]

# Metadata
LABEL image.url="https://github.com/neoskx/examples" \
    image.title="examples" \
    image.description="All examples I did when I learn technologies"