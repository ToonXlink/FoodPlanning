"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredient = void 0;
var Ingredient = /** @class */ (function () {
    function Ingredient(description, UniOfMeasurement, AmountOnStock, Category, Searchname) {
        this.description = description;
        this.UnitOfMeasurement = UniOfMeasurement;
        this.AmountOnStock = AmountOnStock;
        this.Category = Category;
        this.Searchname = Searchname;
    }
    return Ingredient;
}());
exports.Ingredient = Ingredient;
