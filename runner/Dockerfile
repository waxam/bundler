
FROM openfaas/of-watchdog:0.7.2 as watchdog

FROM node:10.12.0-alpine as ship

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog
RUN chmod +x /usr/bin/fwatchdog

RUN apk --no-cache add curl ca-certificates zip \
    && addgroup -S app && adduser -S -g app app

WORKDIR /root/

# Turn down the verbosity to default level.
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /home/app/service

# COPY function node packages and install, adding this as a separate
# entry allows caching of npm install
WORKDIR /home/app/unbundled-webcomponents
COPY unbundled-webcomponents ./
RUN yarn || :

# Wrapper/boot-strapper
WORKDIR /home/app/service
COPY package.json ./

# This ordering means the npm installation is cached for the outer function handler.
RUN yarn

# Copy outer function handler
COPY index.js ./

# COPY function node packages and install, adding this as a separate
# entry allows caching of npm install
WORKDIR /home/app/service/function
COPY function/*.json ./
RUN yarn || :

# COPY  files and folders
WORKDIR /home/app/service/function
COPY function/ ./

# Set correct permissions to use non root user
WORKDIR /home/app/service

# chmod for tmp is for a buildkit issue (@alexellis)
RUN chmod 777 /tmp
# RUN chown app:app -R /home/app \
#     && chown app:app -R /usr/local/share/.cache/ \
#     && chmod 777 /tmp

USER app

RUN ln -s /usr/local/share/.cache /home/app/.cache

ENV cgi_headers="true"
ENV fprocess="node index.js"
ENV mode="http"
ENV upstream_url="http://127.0.0.1:3000"

ENV exec_timeout="90s"
ENV write_timeout="30s"
ENV read_timeout="30s"

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]