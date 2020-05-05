const express = require('express');
const appContext = require('../appContext');
const debug = require('debug')('express.places:routes:index');
const { MongoClient, ObjectID } = require('mongodb');
const router = express.Router();

router.get('/', function(req, res) {
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(appContext.db.url,
          {useNewUrlParser: true, useUnifiedTopology: true});
      const db = client.db(appContext.db.name);
      const collection = await db.collection('places');
      const places = await collection.find().toArray();
      res.render('index', { app: appContext.app, places: places });
    } catch (err) {
      debug(err.stack);
    }
    await client.close();
  }());
});

router.get('/place/:id', function(req, res) {
  const id = req.params.id;
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(appContext.db.url,
          {useNewUrlParser: true, useUnifiedTopology: true});
      const db = client.db(appContext.db.name);
      const collection = await db.collection('places');
      const place = await collection.findOne({ _id: new ObjectID(id) });
      res.render('viewPlace', { app: appContext.app, place: place });
    } catch (err) {
      debug(err.stack);
    }
    await client.close();
  }());
});

router.get('/about', function(req, res) {
  res.render('about', { app: appContext.app });
});

router.get('/add', function(req, res) {
  res.render('addPlace', { app: appContext.app });
});

router.post('/add', function(req, res) {
  // Break up summary paragraphs
  let desc = [];
  let parts = req.body.description.split('\n');
  for (const part of parts) {
    if ((part.length > 0) && (part !== "\r")) {
      desc.push(part);
    }
  }

  // Assemble the place data
  const placeData = {
    name: req.body.name,
    country: req.body.country,
    summary: req.body.summary,
    desc: desc
  };

  // Add
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(appContext.db.url,
          {useNewUrlParser: true, useUnifiedTopology: true});
      const db = client.db(appContext.db.name);
      const collection = await db.collection('places');
      const result = await collection.insertOne(placeData);
      res.render('viewPlace', { app: appContext.app, place: result.ops[0] });
    } catch (err) {
      debug(err.stack);
    }
    await client.close();
  }());
});

module.exports = router;
