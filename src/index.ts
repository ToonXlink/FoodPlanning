import express from 'express';
import mariadb from 'mariadb';
import path from 'path';
import Ingredient from './router/Ingredient';

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, '../', '/public')));
app.set('views', path.join(__dirname, '../', 'views'))
app.set('view engine', 'ejs')

app.use((req, res, next) => {
  console.log(`${Date.now()} [${req.method}] ${req.path}`)
  next();
})

app.use('/Zutaten', Ingredient);

app.get('/', (req, res) => {
  res.render('Index.ejs', {
    mainpart: 'Frontpage.ejs'
  });
})

app.post('/', (req, res) => {
  console.log('jo da ist was angekommen')
});

app.listen(port, () => {
  console.log(`Example app listening at http://192.168.0.146:${port}`)
});