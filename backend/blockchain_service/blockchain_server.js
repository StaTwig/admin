const dotenv = require('dotenv').config(),
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    app = express(),
    shell = require('shelljs'),
    fs = require('fs');

//Middleware declarations
app.use(bodyParser.json());
app.options('*', cors())
app.use(cors());

//Invoke the application
const routes = require('./routes.js');
routes(app);

app.listen(3008, () => console.log('Server is up and running on ' + 3008));

