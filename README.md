# Somi basic CRUD
Basic CRUD nodejs application with Mongo Database

# Setup appllication
## Installation
Use the node package manager (npm) to install dependencies
```bash
npm install
```

## Setup Mongo Database
Go to root and run this command to start mongo and mongo-express
```bash
docker-compose -f mongo.yaml up -d
```

To stop running container use
```bash
docker-compose -f mongo.yaml down
```

You can check database on 'localhost:8081'

### For Mongo Atlas
If you want to use Mongo Atlas, you need to uncomment connection string for it.
After starting an application, if you have this error: MongoServerSelectionError: connection <monitor> to 35.233.92.42:27017 closed; -> go to Network Access (Mongodb Atlas) and set new IP address

## Starting application
If you have done every step you can run this command to start application:
```bash
npm run dev
```
