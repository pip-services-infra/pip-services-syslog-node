FROM pipdevs/node:8.4.0

# set working directory
WORKDIR /app

# copy project file
COPY package.json .

# install only production dependencies
#RUN npm install --only=production
RUN npm install

# copy the entire project
COPY . .

# set default environment variables
ENV MONGO_SERVICE_URI ""
ENV MONGO_SERVICE_HOST mongo
ENV MONGO_SERVICE_PORT 27017
ENV MONGO_DB app

EXPOSE 8080

ENTRYPOINT [ "node", "./bin/run.js" ]