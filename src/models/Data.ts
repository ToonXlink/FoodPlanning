import mariadb from 'mariadb';
import { connect } from 'mongodb';

export class Data {

    private static instance = new Data();

    private constructor() {

    }

    public static getInstance() {
        return this.instance;
    }

    /*Get Enum Tables*/
    public async getUnitOfMeasurement(): Promise<any> {
        var result: Object[] = [];
        let pool = await mariadb.createPool({
            host: 'localhost',
            user: 'FoodPlanningUser',
            password: 'Shaymin',
            database: 'FoodPlanning',
            socketPath: '/run/mysqld/mysqld.sock'
        })
            .getConnection()
            .then(async conn => {
                await conn.query('SELECT * FROM Unit_of_Measurement;')
                    .then(async rows => {
                        rows.forEach((record: object) => {
                            result.push(record);
                        });
                    })
                    .then(async res => {
                        conn.release()
                        return result;
                    })
                    .catch(err => {
                        console.log(err);
                        return [];
                    })
            })
        return result;
    }

    public async getIngredientCategory(): Promise<any> {
        var result: Object[] = [];
        let pool = await mariadb.createPool({
            host: 'localhost',
            user: 'FoodPlanningUser',
            password: 'Shaymin',
            database: 'FoodPlanning',
            socketPath: '/run/mysqld/mysqld.sock'
        })
            .getConnection()
            .then(async conn => {
                await conn.query('select * from Ingredient_Category')
                    .then(async rows => {
                        rows.forEach((record: object) => {
                            result.push(record);
                        });
                    })
                    .then(async res => {
                        conn.release();
                        return result;
                    })
                    .catch(err => {
                        console.log(err);
                        return [];
                    })
            })
        return result;
    }

    /*Ingredients*/

    public AddIngredient(req: any) {
        let values = '\'' + req.InputDescription + '\'' + ', ' + '\'' + req.UnitOfMeasurement + '\'' + ', ' + '\'' + req.AmountOnStock + '\'' + ', ' + '\'' + req.Category + '\'' + ', ' + '\'' + req.SearchName.toUpperCase() + '\'';
        let pool = mariadb.createPool({
            host: 'localhost',
            user: 'FoodPlanningUser',
            password: 'Shaymin',
            database: 'FoodPlanning',
            socketPath: '/run/mysqld/mysqld.sock'
        })
            .getConnection()
            .then(conn => {
                conn.query('INSERT INTO Ingredient(Description, UnitOfMeasurement, Amount_on_Stock, Category, Searchname) Values(' + values + ')')
                    .then(res => {
                        conn.release()
                    })
                    .catch(err => {
                        console.log(err);

                    })
            })
    }
}