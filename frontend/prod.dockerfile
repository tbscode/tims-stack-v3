FROM node:20-alpine

WORKDIR /frontend
COPY . .

RUN npm install
RUN npm run build

ENV NODE_ENV=production

ENTRYPOINT ["npm", "run", "prod"]
