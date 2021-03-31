import mariadb from 'mariadb';

export class Data {

    private static instance = new Data();

    private constructor() {

    }

    public static getInstance() {
        return this.instance;
    }

    public async getUnitOfMeasurement() {
        var result: Object[] = [];
        let pool = mariadb.createPool({
            host: 'localhost',
            user: 'FoodPlanningUser',
            password: 'Shaymin',
            database: 'FoodPlanning',
            socketPath: '/run/mysqld/mysqld.sock'
        })
            .getConnection()
            .then(conn => {
                conn.query('select * from Unit_of_Measurement')
                    .then(rows => {
                        rows.forEach((record: object) => {
                            result.push(record);
                        });
                    })
                    .then(res => {
                        conn.release();
                        return result;
                    })
                    .catch(err => {
                        console.log(err);
                        return [];
                    })
            })
    }
}