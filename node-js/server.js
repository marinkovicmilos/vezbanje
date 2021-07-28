const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

const connectionString = 'mongodb+srv://marinkomil:marinkopfc@cluster-somi-0.jboip.mongodb.net/quotesdb?retryWrites=true&w=majority';

const app = express();
app.listen(3000, function() {
  console.log('listening on 3000');
});

MongoClient.connect(connectionString)
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('quotesdb');
    const quotesCollection = db.collection('quotes');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(results => {
          console.log('results: :' + results);
          res.send(results);
        })
        .catch(err => console.error('ERROR: ' + err));
    });
    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          console.log('result: ' + result);
          res.send('created');
        })
        .catch(err => console.error('ERROR: ' + err));
    });
    app.put('/quotes', (req, res) => {
      console.log(req.body);
      quotesCollection.findOneAndUpdate(
        { _id: new ObjectId(req.body._id) },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        }
      )
      .then(result => {
        console.log('result: ' + result);
        res.send('updated');
      })
      .catch(err => console.error('ERROR: ' + err));
    });
    app.delete('/quotes', (req, res) => {
      console.log(req.body);
      quotesCollection.deleteOne(
        { _id: new ObjectId(req.body._id) }
      )
      .then(result => {
        console.log('result: ' + result);
        res.send('deleted');
      })
      .catch(err => console.error('ERROR: ' + err));
    });
  })
  .catch(err => console.error('ERROR: :' + err));
