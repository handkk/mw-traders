var express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
var app = express();

const web_name = process.env.web_name;
const web_port = process.env.web_port
const web_dist = process.env.web_dist;

const static_dist = process.cwd() + web_dist;
const index_file = static_dist + 'index.html';

app.use(express.static(static_dist)); //web dist

app.get('*', function (req, res) {
    res.sendFile(index_file);
});

app.listen(web_port, () => console.log(`${web_name} Started on ${web_port}`));