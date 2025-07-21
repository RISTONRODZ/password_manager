const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
var cors = require('cors')


dotenv.config();
const app = express();
app.use(cors())

const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passman';

app.use(bodyParser.json());

let collection;

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db(dbName);
    collection = db.collection('passwords');

    // GET all passwords
    app.get('/', async (req, res) => {
      try {
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch passwords" });
      }
    });

    // POST a new password
    app.post('/', async (req, res) => {
      try {
        const password = req.body;
        const result = await collection.insertOne(password);
        res.send({ success: true, result });
      } catch (err) {
        res.status(500).json({ error: "Failed to save password" });
      }
    });

    // DELETE a password by _id
    app.delete('/', async (req, res) => {
      try {
        const { id } = req.body;
        if (!id) {
          return res.status(400).json({ error: "Missing id in request body" });
        }

        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        res.send({ success: true, result });
      } catch (err) {
        res.status(500).json({ error: "Failed to delete password" });
      }
    });

    // Start the server
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
   app.put('/', async (req, res) => {
  try {
    const { id, site, username, password } = req.body;
    if (!id) return res.status(400).json({ success: false, message: 'No ID provided' });

    const updated = await Password.findByIdAndUpdate(id, {
      site,
      username,
      password,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Password not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});


  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

main();
