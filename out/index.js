"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mariadb_1 = __importDefault(require("mariadb"));
var app = express_1.default();
var port = 3001;
var pool = mariadb_1.default.createPool({
    host: 'localhost',
    user: 'FoodPlanningUser',
    password: 'Shaymin',
    database: 'FoodPlanning',
    connectionLimit: 5
});
pool.getConnection()
    .then(function (conn) {
    /*      conn.query("SELECT 1 as val")
            .then((rows) => {
              console.log(rows); //[ {val: 1}, meta: ... ]
              //Table must have been created before
              // " CREATE TABLE myTable (id int, val varchar(255)) "
              return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
            })
            .then((res) => {
              console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
              conn.end();
            })
            .catch(err => {
              //handle error
              console.log(err);
              conn.end();
            })
    */
}).catch(function (err) {
    console.log(err);
    //not connected
});
app.use(function (req, res, next) {
    console.log(Date.now() + " [" + req.method + "] " + req.path);
    next();
});
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.listen(port, function () {
    console.log("Example app listening at http://192.168.0.146:" + port);
});
