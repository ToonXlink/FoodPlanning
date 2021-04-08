import mariadb from 'mariadb';

export class Data {

    private static instance = new Data();

    private pool = mariadb.createPool({
        host: 'localhost',
        user: 'FoodPlanningUser',
        password: 'Shaymin',
        database: 'FoodPlanning',
        socketPath: '/run/mysqld/mysqld.sock',
        connectionLimit: 20
    })

    private constructor() {

    }

    public static getInstance() {
        return this.instance;
    }

    /*Get Enum Tables*/
    public async getUnitOfMeasurement(): Promise<any> {
        var result: Object[] = [];
        var rows = await this.pool.query('SELECT * FROM Unit_of_Measurement;');
        rows.forEach((record: object) => {
            result.push(record);
        });
        return result;
    }

    public async getIngredientCategory(): Promise<any> {
        var result: Object[] = [];
        var rows = await this.pool.query('select * from Ingredient_Category');
        rows.forEach((record: object) => {
            result.push(record);
        });
        return result;
    }

    /*Ingredients*/

    public async AddIngredient(req: any) {
        let values = '\'' + req.InputDescription + '\'' + ', ' + '\'' + req.UnitOfMeasurement + '\'' + ', ' + '\'' + req.AmountOnStock + '\'' + ', ' + '\'' + req.Category + '\'' + ', ' + '\'' + req.SearchName.toUpperCase() + '\'';
        await this.pool.query('INSERT INTO Ingredient(Description, UnitOfMeasurement, Amount_on_Stock, Category, Searchname) Values(' + values + ')');
    }

    public async GetIngredientList(Site: number, NoPerSite?: number, category?: number): Promise<any> {
        var result: Object[] = [];
        if (category == null) {
            var rows = await this.pool.query('SELECT * FROM Ingredient ORDER BY Description');

            for (var i = Site * NoPerSite; i < (Site + 1) * NoPerSite; i++) {
                if (i < rows.length) {
                    result.push(rows[i])
                } else {
                    break;
                }
            }
        } else if (category == null && NoPerSite == null) {
            var rows = await this.pool.query('SELECT * FROM Ingredient ORDER BY Description');
            for (var i = 0; i < rows.length; i++) {
                result.push(rows[i]);
            }
        }
        else {
            var rows = await this.pool.query('SELECT * FROM Ingredient WHERE Category = ' + category + ' ORDER BY Description ');

            for (var i = Site * NoPerSite; i < (Site + 1) * NoPerSite; i++) {
                if (i < rows.length) {
                    result.push(rows[i])
                } else {
                    break;
                }
            }
        }
        return result;
    }

    public async GetIngredientCount(category?: number): Promise<any> {
        if (category == null) {
            var rows = await this.pool.query('SELECT COUNT(ID) as count FROM Ingredient');
            var count = rows[0].count;
        }
        else {
            var rows = await this.pool.query('SELECT COUNT(ID) as count FROM Ingredient WHERE Category = ' + category);
            var count = rows[0].count;
        }

        return count;
    }
}