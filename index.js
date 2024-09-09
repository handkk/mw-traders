const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const router = require('./routes/traders.route');
const cors = require('cors');

const connectDB = require('./database/connection');
const app = express();
// const corsOptions ={
//     origin:'http://localhost:4200',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
const corsOptions = {
    origin: '*'
}
app.use(cors(corsOptions));

dotenv.config({ path: 'config.env' });
const port = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));

connectDB();

// parse request to body-parser
app.use(bodyparser.json());

// set view engine
app.set('view engine', 'ejs');
// app.set("views", path.resolve(__dirname, 'views/ejs'))
app.use((req, res, next) => {
    const origin = req.get('referer');
    const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
    if (isWhitelisted) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
      res.setHeader('Access-Control-Allow-Credentials', true);
    }
    // Pass to next layer of middleware
    if (req.method === 'OPTIONS') res.sendStatus(200);
    else next();
  });
  
  const setContext = (req, res, next) => {
    if (!req.context) req.context = {};
    next();
  };
  app.use(setContext);


// load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

// app.get('/', (req, res) => {
//     res.render('index')
// })

// var traders = require('./routes/traders.route');
app.use('/', router);
app.use(express.static('traders'))
// app.use('/traders', traders.apis);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    // adminUser();
})

//  function adminUser() {

//  }
