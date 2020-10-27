"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var serverless_http_1 = __importDefault(require("serverless-http"));
var path_1 = require("path");
var routes_1 = __importDefault(require("./routes"));
var app = express_1.default();
console.log('Starting Server.js');
var path = '/.netlify/functions/server/';
Object.entries(routes_1.default).forEach(function (api) {
    var apiName = api[0].toLowerCase();
    var router = api[1](app);
    app.use(path_1.join(path, apiName), router);
});
app.use('/public', express_1.default.static(path_1.join(__dirname, '../public/')));
app.use('/', function (_, res) { return res.sendFile(path_1.join(__dirname, '../index.html')); });
module.exports = app;
module.exports.handler = serverless_http_1.default(app);
