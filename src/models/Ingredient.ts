export class Ingredient {
    No: number;
    description: string;
    UnitOfMeasurement: string;
    AmountOnStock: number;
    Category: string;
    Searchname: string;

    constructor(description: string, UniOfMeasurement: string, AmountOnStock: number, Category: string, Searchname: string) {

        this.description = description;
        this.UnitOfMeasurement = UniOfMeasurement;
        this.AmountOnStock = AmountOnStock;
        this.Category = Category;
        this.Searchname = Searchname;
    }
}