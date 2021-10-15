import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { Data } from '../models/Data';

const router = express.Router();
const data = Data.getInstance();
let urlencoded = bodyParser.urlencoded({ extended: true });

router
    .use(urlencoded, express.json())
    .route('/:id')
    .get(async(req, res) => {
        
        let result = await data.GetIngredient(Number(req.params.id));
        console.log(result.Category);
        console.log(result);
        res.json(result);
    });
export default router;