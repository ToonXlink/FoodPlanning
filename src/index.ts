import express from 'express';
import path from 'path';
import {Data} from './models/Data';
import Ingredient from './router/Ingredient';
import Purchase from './router/Purchase';
import Recipe from './router/Recipe';
import IngredientDate from './router/Data';

const app = express();
const port = 3002;
const data = Data.getInstance();

app.use(express.static(path.join(__dirname, '../', '/public')));
app.set('views', path.join(__dirname, '../', 'views'))
app.set('view engine', 'ejs')

app.use((req, res, next) => {
  console.log(`${Date.now()} [${req.method}] ${req.path}`)
  next();
})

app.use('/Zutaten', Ingredient);
app.use('/Einkauf', Purchase);
app.use('/Rezepte', Recipe);
app.use('/IngredientData', IngredientDate);

app.get('/',async (req, res) => {
  res.render('Index.ejs', {
    mainpart: 'Frontpage.ejs',
    Category: await data.getIngredientCategory()
  });
})

app.post('/', (req, res) => {
  console.log('jo da ist was angekommen')
});

app.listen(port, () => {
  console.log(`Example app listening at http://192.168.0.100:${port}`)
});