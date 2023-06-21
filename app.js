const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();

dotenv.config({ path: 'config.env' });
const port = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));

// parse request to body-parser
app.use(bodyparser.urlencoded({extended: true}));

// set view engine
app.set('view engine', 'ejs');
// app.set("views", path.resolve(__dirname, 'views/ejs'))

var router = require('express').Router();

// load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

app.get('/', (req, res) => {
    res.render('index')
})



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://raju:Nccm*123@cluster0.wsxxonj.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    console.log('Connect the client to the server	(optional starting in v4.7)');
    await client.connect();
    console.log('after connecting to the db');
    // Send a ping to confirm a successful connection
    // await listDatabases(client);
  }
   finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
//    catch(err) {
//     console.log('db error ', err);
//   }
}

async function listDatabases(client) {
    console.log('list databases calling');
    const databaseList = await client.db().admin().listDatabases();
    console.log('databases === ', databaseList);
}

// run().catch(console.log());
var traders = require('./routes/traders.route');
app.use('/', router);
app.use('/traders', traders.apis);
app.listen(port, () => { 
    console.log(`Server is running on http://localhost:${port}`)
    run();
 })