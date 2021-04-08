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
    .get(async (req, res) => {
        res.render('Index.ejs', {
            mainpart: 'Purchase.ejs',
            IngredientList: await data.GetIngredientList(Number(req.params.Site)),
            Category: await data.getIngredientCategory(),
            UnitOfMeasurement: await data.getUnitOfMeasurement()
        })
    })
    .post((req, res) => {
        console.log(req)
        console.log(res)
    })
export default router;