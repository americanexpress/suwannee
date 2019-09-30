# --- Base Node ---
FROM node:carbon AS base
RUN mkdir -p /var/www
RUN mkdir -p /var/log/portal-service
ADD package.json /var/www
ADD .yarnrc /var/www/.yarnrc
# ADD env /var/www/.env
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:

# --- Dependencies ---
FROM base AS dependencies
COPY . /tmp/
# RUN cd /tmp && yarn
# RUN cp -R /tmp/node_modules /tmp/prod_node_modules
RUN cd /tmp && yarn

# --- Build ---
FROM dependencies AS build
COPY ./src /tmp/src
RUN cd /tmp && yarn run build
RUN mkdir -p /tmp/dist/config/creds

# --- Release ---
FROM base AS release
WORKDIR /var/www
# create empty .env file for dotenv lib
RUN touch .env
COPY --from=dependencies /tmp/prod_node_modules ./node_modules
COPY --from=build /tmp/dist ./dist

VOLUME /var/log/portal-service
EXPOSE 3000
CMD [ "yarn", "start", "start -c ./example.config.json" ]

