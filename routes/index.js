const express = require('express');
const appContext = require('../appContext');
const debug = require('debug')('express.places:routes:index');
const { MongoClient, ObjectID } = require('mongodb');
const router = express.Router();

router.get('/', function(req, res) {
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(appContext.db.url, {
            auth: { user: appContext.db.user, password: appContext.db.pwd },
            useNewUrlParser: true, useUnifiedTopology: true
      });
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
      client = await MongoClient.connect(appContext.db.url, {
        auth: { user: appContext.db.user, password: appContext.db.pwd },
        useNewUrlParser: true, useUnifiedTopology: true
      });
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

  // Validate
  let errors = [];
  if (placeData.name.length === 0) {
    errors.push("Name is required.");
  }
  if (placeData.country.length === 0) {
    errors.push("Country is required.");
  }
  if (placeData.desc.length === 0) {
    errors.push("Description is required.");
  }
  if (errors.length > 0) {
    res.render('addPlace', { app: appContext.app, place: placeData, problem: true, message: errors.join(' ') });
    return;
  }

  // Add
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(appContext.db.url, {
        auth: { user: appContext.db.user, password: appContext.db.pwd },
        useNewUrlParser: true, useUnifiedTopology: true
      });
      const db = client.db(appContext.db.name);
      const collection = await db.collection('places');
      const existingPlace = await collection.findOne({ name: placeData.name });
      if (!existingPlace) {
        const result = await collection.insertOne(placeData);
        res.render('viewPlace', { app: appContext.app, place: result.ops[0] });
      } else {
        res.render('addPlace', { app: appContext.app, place: placeData, problem: true, message: "A place with this name already exists" })
      }
    } catch (err) {
      debug(err.stack);
    }
    await client.close();
  }());
});

module.exports = router;
