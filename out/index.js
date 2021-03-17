"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = 3000;
app.use(function (req, res, next) {
    console.log(Date.now() + " [" + req.method + "] " + req.path);
    next();
});
app.get('/', function (req, res) {
    console.log('moin');
    res.send('Hello World');
});
app.listen(port, function () {
    console.log("Example app listening at http://192.168.0.146:" + port);
});
