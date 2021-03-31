import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { Ingredient } from '../models/Ingredient';
import { Data } from '../models/Data';

const router = express.Router();
const data = Data.getInstance();
let urlencoded = bodyParser.urlencoded({extended: true});

router
    .use(urlencoded, express.json())
    .route('/')
    .get(async(req, res) => {
        console.log(data.getUnitOfMeasurement());
        res.render('Index.ejs',
        {
            mainpart: 'AddIngredient.ejs',
            UnitOfMeasurement: data.getUnitOfMeasurement()
        })
    })
    .post((req, res) => {
        console.log(res);
        res.redirect('/');
    })
export default router;