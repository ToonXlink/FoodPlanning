import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { Data } from '../models/Data';

const router = express.Router();
const data = Data.getInstance();
let urlencoded = bodyParser.urlencoded({ extended: true });

router
    .use(urlencoded, express.json())
    .route('/')
    .get((req, res) => {
        res.redirect('/Zutaten/0')
    })
    .post((req, res) => {
        console.log(req)
        console.log(res)
    })
router
    .use(express.static(path.join(__dirname, '../../', '/public')))
    .use(express.static(path.join(__dirname, '../../../', '/public')))
    .route('/:Category/:Site')
    .get(async (req, res) => {
        if (Number(req.params.Site) != NaN && Number(req.params.Site) >= 0) {
            res.render('Index.ejs', {
                mainpart: 'Ingredient.ejs',
                IngredientList: await data.GetIngredientList(Number(req.params.Site), 10, Number(req.params.Category)),
                UnitOfMeasurement: await data.getUnitOfMeasurement(),
                Category: await data.getIngredientCategory(),
                NoRows: 10,
                Site: req.params.Site,
                Count: await data.GetIngredientCount(Number(req.params.Category))
            })
        } else {
            res.redirect('/Zutaten/0')
        }
    })
    .post((req, res) => {
        console.log(req.body);
        if (req.body.InputDescription != '' && req.body.UnitOfMeasurement != '' && req.body.AmountOnStock != '' && req.body.Category != '' && req.body.SearchName != '') {
            data.AddIngredient(req.body)
        } else {
            res.status(418).send("Sry but your Input is wrong")
        }
        res.redirect('/Zutaten/' + req.params.Site);
    })
router
    .use(express.static(path.join(__dirname, '../../', '/public')))
    .route('/:Site')
    .get(async (req, res) => {
        if (Number(req.params.Site) != NaN && Number(req.params.Site) >= 0) {
            res.render('Index.ejs', {
                mainpart: 'Ingredient.ejs',
                IngredientList: await data.GetIngredientList(Number(req.params.Site), 10),
                UnitOfMeasurement: await data.getUnitOfMeasurement(),
                Category: await data.getIngredientCategory(),
                NoRows: 10,
                Site: req.params.Site,
                Count: await data.GetIngredientCount()
            })
        } else {
            res.redirect('/Zutaten/0')
        }
    })
    .post((req, res) => {
        console.log(req.body);
        if (req.body.InputDescription != '' && req.body.UnitOfMeasurement != '' && req.body.AmountOnStock != '' && req.body.Category != '' && req.body.SearchName != '') {
            data.AddIngredient(req.body)
        } else {
            res.status(418).send("Sry but your Input is wrong")
        }
        res.redirect('/Zutaten/' + req.params.Site);
    })
export default router;