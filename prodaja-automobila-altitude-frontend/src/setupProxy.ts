var express = require('express');

var morgan = require("morgan");

var { createProxyMiddleware } = require('http-proxy-middleware');

var cors = require('cors');

var app = express();

const API_SERVICE_URL = "http://localhost:8000";

app.use(cors());

app.use(morgan('dev'));

app.use('/', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
}));

app.listen(1111, function () {
});