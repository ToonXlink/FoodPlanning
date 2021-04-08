"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
var mariadb_1 = __importDefault(require("mariadb"));
var Data = /** @class */ (function () {
    function Data() {
        this.pool = mariadb_1.default.createPool({
            host: 'localhost',
            user: 'FoodPlanningUser',
            password: 'Shaymin',
            database: 'FoodPlanning',
            socketPath: '/run/mysqld/mysqld.sock',
            connectionLimit: 20
        });
    }
    Data.getInstance = function () {
        return this.instance;
    };
    /*Get Enum Tables*/
    Data.prototype.getUnitOfMeasurement = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        return [4 /*yield*/, this.pool.query('SELECT * FROM Unit_of_Measurement;')];
                    case 1:
                        rows = _a.sent();
                        rows.forEach(function (record) {
                            result.push(record);
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Data.prototype.getIngredientCategory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        return [4 /*yield*/, this.pool.query('select * from Ingredient_Category')];
                    case 1:
                        rows = _a.sent();
                        rows.forEach(function (record) {
                            result.push(record);
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /*Ingredients*/
    Data.prototype.AddIngredient = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = '\'' + req.InputDescription + '\'' + ', ' + '\'' + req.UnitOfMeasurement + '\'' + ', ' + '\'' + req.AmountOnStock + '\'' + ', ' + '\'' + req.Category + '\'' + ', ' + '\'' + req.SearchName.toUpperCase() + '\'';
                        return [4 /*yield*/, this.pool.query('INSERT INTO Ingredient(Description, UnitOfMeasurement, Amount_on_Stock, Category, Searchname) Values(' + values + ')')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Data.prototype.GetIngredientList = function (Site, NoPerSite, category) {
        return __awaiter(this, void 0, void 0, function () {
            var result, rows, i, rows, i, rows, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        if (!(category == null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.pool.query('SELECT * FROM Ingredient ORDER BY Description')];
                    case 1:
                        rows = _a.sent();
                        for (i = Site * NoPerSite; i < (Site + 1) * NoPerSite; i++) {
                            if (i < rows.length) {
                                result.push(rows[i]);
                            }
                            else {
                                break;
                            }
                        }
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(category == null && NoPerSite == null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.pool.query('SELECT * FROM Ingredient ORDER BY Description')];
                    case 3:
                        rows = _a.sent();
                        for (i = 0; i < rows.length; i++) {
                            result.push(rows[i]);
                        }
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.pool.query('SELECT * FROM Ingredient WHERE Category = ' + category + ' ORDER BY Description ')];
                    case 5:
                        rows = _a.sent();
                        for (i = Site * NoPerSite; i < (Site + 1) * NoPerSite; i++) {
                            if (i < rows.length) {
                                result.push(rows[i]);
                            }
                            else {
                                break;
                            }
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/, result];
                }
            });
        });
    };
    Data.prototype.GetIngredientCount = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, count, rows, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(category == null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.pool.query('SELECT COUNT(ID) as count FROM Ingredient')];
                    case 1:
                        rows = _a.sent();
                        count = rows[0].count;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.pool.query('SELECT COUNT(ID) as count FROM Ingredient WHERE Category = ' + category)];
                    case 3:
                        rows = _a.sent();
                        count = rows[0].count;
                        _a.label = 4;
                    case 4: return [2 /*return*/, count];
                }
            });
        });
    };
    Data.instance = new Data();
    return Data;
}());
exports.Data = Data;
