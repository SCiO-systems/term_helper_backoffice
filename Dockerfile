FROM node:14.18.0 as build

WORKDIR /app

COPY . .

RUN cd /app && ls && pwd && npm install

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8000

CMD ["npm", "run"]
