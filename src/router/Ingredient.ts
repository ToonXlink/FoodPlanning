import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { Ingredient } from '../models/Ingredient';
import { Data } from '../models/Data';

const router = express.Router();
const data = Data.getInstance();
let urlencoded = bodyParser.urlencoded({ extended: true });

router
    .use(urlencoded, express.json())
    .route('/')
    .get(async (req, res) => {

        res.render('Index.ejs',
            {
                mainpart: 'AddIngredient.ejs',
                UnitOfMeasurement: await data.getUnitOfMeasurement(),
                Category: await data.getIngredientCategory()
            })

    })
    .post((req, res) => {
        console.log(req.body);
        if (req.body.InputDescription != '' && req.body.UnitOfMeasurement != '' && req.body.AmountOnStock != '' && req.body.Category != '' && req.body.SearchName != '') {
            data.AddIngredient(req.body)
        } else {
            res.status(418).send("Sry but your Input is wrong")
        }
        res.redirect('/');
    })
export default router;