"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var Ingredient_1 = __importDefault(require("./router/Ingredient"));
var app = express_1.default();
var port = 3001;
app.use(express_1.default.static(path_1.default.join(__dirname, '../', '/public')));
app.set('views', path_1.default.join(__dirname, '../', 'views'));
app.set('view engine', 'ejs');
app.use(function (req, res, next) {
    console.log(Date.now() + " [" + req.method + "] " + req.path);
    next();
});
app.use('/Zutaten', Ingredient_1.default);
app.get('/', function (req, res) {
    res.render('Index.ejs', {
        mainpart: 'Frontpage.ejs'
    });
});
app.post('/', function (req, res) {
    console.log('jo da ist was angekommen');
});
app.listen(port, function () {
    console.log("Example app listening at http://192.168.0.146:" + port);
});
