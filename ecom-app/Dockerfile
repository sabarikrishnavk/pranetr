# Image Size: 243MB
FROM node:current-alpine

# Create app directory
WORKDIR /app

# Set production env
ENV NODE_ENV=production

# Install app dependencies
COPY package*.json /app/
RUN npm install

# Bundle app source
COPY . /app

RUN npm run build
EXPOSE 3000

CMD [ "npm", "start" ]
