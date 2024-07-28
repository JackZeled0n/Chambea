const serverless = require('serverless-http');
const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const router = jsonServer.router(path.join(__dirname, '..', '..', '..', 'db.json'));
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use('/api', router);

module.exports.handler = serverless(app);
