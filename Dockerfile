FROM node:8.7-alpine

# create app directory
RUN mkdir -p /usr/src/app

#install dependencies
ADD package.json /tmp/package.json
RUN cd /tmp && npm install

RUN mkdir -p /usr/src/app/node_modules && cp -r /tmp/node_modules/* /usr/src/app/node_modules/
ENV NODE_PATH /usr/src/app/node_modules

# RUN mkdir -p /dist/node_modules && cp -r /tmp/node_modules/* /dist/node_modules/
# ENV NODE_PATH /dist/node_modules

WORKDIR /usr/src/app
COPY . /usr/src/app

EXPOSE 3030
CMD ["npm", "start"]
