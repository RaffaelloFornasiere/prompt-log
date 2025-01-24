# Stage 1: Build the Angular app
FROM node:20 AS build
WORKDIR /app
RUN ls
COPY ../package.json /app
RUN npm install
COPY .. /app
RUN npm run build --configuration=production

# Stage 2: Serve with NGINX
FROM nginx:latest
COPY --from=build /app/dist/prompt-generator/browser /usr/share/nginx/html
COPY ../docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
