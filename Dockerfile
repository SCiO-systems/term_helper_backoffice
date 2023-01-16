FROM node:14.18.0 as build

WORKDIR /app

COPY . .

RUN cd /app && ls && pwd && npm install

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000
EXPOSE 80

CMD ["npm", "start"]
