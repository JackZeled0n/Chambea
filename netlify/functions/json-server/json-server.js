const serverless = require('serverless-http');
const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const router = jsonServer.router({});

app.use(jsonServer.defaults());
app.use('/api', router);

module.exports.handler = serverless(app);
