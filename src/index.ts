import express from 'express';
import mariadb from 'mariadb';

const app = express();
const port = 3001;
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'FoodPlanningUser',
    password: 'Shaymin',
    database: 'FoodPlanning',
    connectionLimit: 5
})

pool.getConnection()
    .then(conn => {
    
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
    }).catch(err => {
        console.log(err);
      //not connected
    });



app.use((req, res, next) => {
    console.log(`${Date.now()} [${req.method}] ${req.path}`)
    next();
})

app.get('/', (req, res) => {
    res.send('Hello World');

})

app.listen(port, () => {
    console.log(`Example app listening at http://192.168.0.146:${port}`)
})