import express from 'express';
import mariadb from 'mariadb';
import path from 'path';

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, '../', '/public')));
app.set('views', path.join(__dirname, '../', 'views'))
app.set('view engine', 'ejs')

app.use((req, res, next) => {
  console.log(`${Date.now()} [${req.method}] ${req.path}`)
  next();
})

app.get('/', (req, res) => {
  
  let pool = mariadb.createPool({
    host: 'localhost',
    user: 'FoodPlanningUser',
    password: 'Shaymin',
    database: 'FoodPlanning',
    socketPath: '/run/mysqld/mysqld.sock'
  })

  pool.getConnection()
    .then(conn => {
      conn.query('select * from Ingredient')
        .then(rows => {
          console.log(rows.meta);
        })
        .then(res => {
          //console.log(res);
          conn.release();
        })
        .catch(err => {
          console.log(err);
        })
    })

  res.render('Index.ejs', {

  });
})

app.post('/', (req, res) => {
  console.log('jo da ist was angekommen')
});

app.listen(port, () => {
  console.log(`Example app listening at http://192.168.0.146:${port}`)
});