var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const utils = require('./utils/response.status');
const router = require('./routers/router');

const port = process.env.PORT;
var app = express();

const whitelist = [];
const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true);
    }
};

app.use(cors(corsOptions));
app.disable('x-powered-by')

app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if (err) {
        console.log(err);
        res.status(utils.INTERNAL_SERVER_ERROR).send("Error Formato Json");
    } else {
        next();
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-HEADERS", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api", router);
app.listen(port, () => {
    console.log(`API corriendo en puerto ${port}`);
});