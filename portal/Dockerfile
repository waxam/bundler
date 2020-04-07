FROM node:12 as dev
WORKDIR /app
COPY package.json package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "npm", "start" ]

FROM node:12 as build
WORKDIR /app
COPY --from=dev /app /app
RUN npm run build

FROM socialengine/nginx-spa as prod
COPY --from=build /app/dist /app
EXPOSE 80