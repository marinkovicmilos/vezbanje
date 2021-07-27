# Somi basic CRUD
Basic CRUD nodejs application with Mongo Database

# Setup appllication
## Installation
Use the node package manager (npm) to install dependencies
```bash
npm install
```

## Setup Mongo Database
If you want to use Mongo Atlas, you need to uncomment connection string for it.
After starting an application, if you have this error: MongoServerSelectionError: connection <monitor> to 35.233.92.42:27017 closed; -> go to Network Access (Mongodb Atlas) and set new IP address

If you want to use Mongo and Mongo express, follow these instructions:
Open bash and pull the latest images of mongo and mongo-express from Docker Hub
```bash
docker pull mongo
docker pull mongo-express
```

Then create docker network:
```bash
docker network create mongo-network
```

Then run mongo container with this command:
```bash
 docker run \
 -d \
 -p 27017:27017 \
 --net mongo-network \
 --name mongodb \
 -e MONGO_INITDB_ROOT_USERNAME=admin \
 -e MONGO_INITDB_ROOT_PASSWORD=password \
 mongo
```

You can run 'docker logs -f <CONTAINER_ID>' to see the logs

If mongodb container is running successfully, then you need to run mongo-express container:
```bash
docker run \
-d \
-p 8081:8081 \
--net mongo-network \
--name mongo-express \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
-e ME_CONFIG_MONGODB_SERVER=mongodb \
-e ME_CONFIG_MONGODB_ENABLE_ADMIN=true \
-e ME_CONFIG_MONGODB_AUTH_DATABASE=admin \
mongo-express

```

You can check database on 'localhost:8081'

## Starting application
If you have done every step you can run this command to start application:
```bash
npm run dev
```
