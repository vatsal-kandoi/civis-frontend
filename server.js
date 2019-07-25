const express = require('express');
const app = express()
const path = require('path');
const secure = require('ssl-express-www');
const compression = require('compression');

if(!process.env.APP_ENVIRONMENT) {
    require('dotenv').config();
}

// app.use(secure);

const PORT = process.env.PORT || 4000;
app.listen(PORT);

app.use(compression());

app.use(express.static(__dirname + '/dist/civis'));

app.use(function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'false');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});

app.get('/getEnvironment', (req, res) => {
    const environment = process.env.APP_ENVIRONMENT;
    res.status(200).json({environment});
});



app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/civis/index.html'));
});

console.log("listing on port:", PORT);
