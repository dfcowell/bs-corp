FROM node:18-alpine
RUN mkdir /app
ADD package* /app
WORKDIR /app
RUN npm install
ADD ./static /app/static
ADD ./ /app
CMD ["node", "index.js"]