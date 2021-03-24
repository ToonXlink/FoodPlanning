"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mariadb_1 = __importDefault(require("mariadb"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var port = 3001;
app.use(express_1.default.static(path_1.default.join(__dirname, '../', '/public')));
app.set('views', path_1.default.join(__dirname, '../', 'views'));
app.set('view engine', 'ejs');
app.use(function (req, res, next) {
    console.log(Date.now() + " [" + req.method + "] " + req.path);
    next();
});
app.get('/', function (req, res) {
    var pool = mariadb_1.default.createPool({
        host: 'localhost',
        user: 'FoodPlanningUser',
        password: 'Shaymin',
        database: 'FoodPlanning',
        socketPath: '/run/mysqld/mysqld.sock'
    });
    pool.getConnection()
        .then(function (conn) {
        conn.query('select * from Ingredient')
            .then(function (rows) {
            console.log(rows.meta);
        })
            .then(function (res) {
            //console.log(res);
            conn.release();
        })
            .catch(function (err) {
            console.log(err);
        });
    });
    res.render('Index.ejs', {});
});
app.post('/', function (req, res) {
    console.log('jo da ist was angekommen');
});
app.listen(port, function () {
    console.log("Example app listening at http://192.168.0.146:" + port);
});
