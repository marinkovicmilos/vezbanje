const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

// mongo atlas connection string
// const connectionString = 'mongodb+srv://marinkomil:marinkopfc@cluster-somi-0.jboip.mongodb.net/quotesdb?retryWrites=true&w=majority';

// mongo db connection string
const connectionString = 'mongodb://admin:password@localhost:27017';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, function() {
  console.log('listening on 3000');
});

// otvarati konekciju pri svakom pozivu i zatvarati po zavrsetku
app.get('/', (req, res) => {
  MongoClient.connect(connectionString)
    .then(client => {
      client.db('somi-crud-db').collection('quotes').find().toArray()
        .then(result => {
          console.log('Result: ', JSON.stringify(result));
          res.send(result);
        })
        .catch(error => {
          console.error('PUCE GRESKA: ' + error);
        })
        .finally(() => {
          client.close();
        });
    })
    .catch(error => {
      console.error('PUCE GRESKA: ' + error);
      res.send('Error occured!')
    });
});

app.post('/quotes', (req, res) => {
  MongoClient.connect(connectionString)
    .then(client => {
      client.db('somi-crud-db').collection('quotes').insertOne(req.body)
        .then(result => {
          console.log('result: ' + JSON.stringify(result));
          res.send('created');
        })
        .catch(err => {
          console.error('PUCE GRESKA: ' + err);
          res.send('Error occured!')
        })
        .finally(() => {
          client.close();
        });
    })
    .catch(error => {
      console.error('PUCE GRESKA: ' + error);
      res.send('Error occured!')
    });
});

app.put('/quotes', (req, res) => {
  MongoClient.connect(connectionString)
    .then(client => {
      console.log(req.body);
      client.db('somi-crud-db').collection('quotes').findOneAndUpdate(
        { _id: new ObjectId(req.body._id) },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        }
      )
      .then(result => {
        console.log('result: ' + JSON.stringify(result));
        res.send('updated');
      })
      .catch(err => {
        console.error('PUCE GRESKA: ' + err);
        res.send('Error occured!')
      })
      .finally(() => {
        client.close();
      });
    })
    .catch(error => {
      console.error('PUCE GRESKA: ' + error);
      res.send('Error occured!')
    });
});

app.delete('/quotes', (req, res) => {
  MongoClient.connect(connectionString)
    .then(client => {
      console.log(req.body);
      client.db('somi-crud-db').collection('quotes').deleteOne(
        { _id: new ObjectId(req.body._id) }
      )
      .then(result => {
        console.log('result: ' + JSON.stringify(result));
        res.send('deleted');
      })
      .catch(err => {
        console.error('PUCE GRESKA: ' + err);
        res.send('Error occured!')
      })
      .finally(() => {
        client.close();
      });
    })
    .catch(error => {
      console.error('PUCE GRESKA: ' + error);
      res.send('Error occured!')
    });
});

// otvoriti konekciju jednom i ne zatvarati za sve CRUD operacije
// MongoClient.connect(connectionString)
//   .then(client => {
//     console.log('Connected to Database');
//     const db = client.db('somi-crud-db');
//     const quotesCollection = db.collection('quotes');
//     app.use(bodyParser.json());
//     app.use(bodyParser.urlencoded({ extended: true }));
//     app.get('/', (req, res) => {
//       db.collection('quotes').find().toArray()
//         .then(results => {
//           console.log('results: :' + JSON.stringify(results));
//           res.send(results);
//         })
//         .catch(err => console.error('PUCE GRESKA: ' + err));
//     });
//     app.post('/quotes', (req, res) => {
//       quotesCollection.insertOne(req.body)
//         .then(result => {
//           console.log('result: ' + JSON.stringify(result));
//           res.send('created');
//         })
//         .catch(err => console.error('PUCE GRESKA: ' + err));
//     });
//     app.put('/quotes', (req, res) => {
//       console.log(req.body);
//       quotesCollection.findOneAndUpdate(
//         { _id: new ObjectId(req.body._id) },
//         {
//           $set: {
//             name: req.body.name,
//             quote: req.body.quote
//           }
//         }
//       )
//       .then(result => {
//         console.log('result: ' + JSON.stringify(result));
//         res.send('updated');
//       })
//       .catch(err => console.error('PUCE GRESKA: ' + err));
//     });
//     app.delete('/quotes', (req, res) => {
//       console.log(req.body);
//       quotesCollection.deleteOne(
//         { _id: new ObjectId(req.body._id) }
//       )
//       .then(result => {
//         console.log('result: ' + JSON.stringify(result));
//         res.send('deleted');
//       })
//       .catch(err => console.error('PUCE GRESKA: ' + err));
//     });
//   })
//   .catch(err => console.error('PUCE GRESKA: :' + err));
