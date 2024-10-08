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


// load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

app.get('/test', (req, res) => {
    res.render('welcome')
})

// var traders = require('./routes/traders.route');
app.use('/', router);
app.use(express.static(__dirname + '/traders'))
// app.use('/traders', traders.apis);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    // adminUser();
})

//  function adminUser() {

//  }
