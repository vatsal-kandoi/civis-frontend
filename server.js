const express = require('express');
const app = express()
const path = require('path');
// const secure = require('ssl-express-www');
const compression = require('compression');
const disqusRouter = require('./server-app/disqus');
const s3Proxy = require('s3-proxy');

if(!process.env.APP_ENVIRONMENT) {
    require('dotenv').config();
}

// app.use(secure);

const PORT = process.env.PORT || 3401;
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

app.use('/disqus', disqusRouter);

app.get('/getEnvironment', (req, res) => {
    const environment = process.env;
    res.status(200).json({environment});
});

const s3BucketOptions = {
    bucket: `civis-sitemaps-${process.env.APP_ENVIRONMENT === 'staging' ? 'staging' : 'production'}`,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    overrideCacheControl: 'max-age=100000',
}

app.get('/sitemap.xml.gz', s3Proxy({...s3BucketOptions, defaultKey: 'sitemap.xml.gz'}));
app.get('/sitemaps/sitemap-static.xml.gz', s3Proxy({...s3BucketOptions, defaultKey: 'sitemap-static.xml.gz'}));
app.get('/sitemaps/consultations.xml.gz', s3Proxy({...s3BucketOptions, defaultKey: 'consultations.xml.gz'}));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/civis/index.html'));
});

console.log("listing on port:", PORT);
