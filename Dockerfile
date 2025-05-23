FROM node:18

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .


ENV BASE_URL=http://0.0.0.0:8080/api/v3


CMD ["npm", "test"]
