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
    }
    Data.getInstance = function () {
        return this.instance;
    };
    /*Get Enum Tables*/
    Data.prototype.getUnitOfMeasurement = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, pool;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        return [4 /*yield*/, mariadb_1.default.createPool({
                                host: 'localhost',
                                user: 'FoodPlanningUser',
                                password: 'Shaymin',
                                database: 'FoodPlanning',
                                socketPath: '/run/mysqld/mysqld.sock'
                            })
                                .getConnection()
                                .then(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, conn.query('SELECT * FROM Unit_of_Measurement;')
                                                .then(function (rows) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    rows.forEach(function (record) {
                                                        result.push(record);
                                                    });
                                                    return [2 /*return*/];
                                                });
                                            }); })
                                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    conn.release();
                                                    return [2 /*return*/, result];
                                                });
                                            }); })
                                                .catch(function (err) {
                                                console.log(err);
                                                return [];
                                            })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        pool = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Data.prototype.getIngredientCategory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, pool;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        return [4 /*yield*/, mariadb_1.default.createPool({
                                host: 'localhost',
                                user: 'FoodPlanningUser',
                                password: 'Shaymin',
                                database: 'FoodPlanning',
                                socketPath: '/run/mysqld/mysqld.sock'
                            })
                                .getConnection()
                                .then(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, conn.query('select * from Ingredient_Category')
                                                .then(function (rows) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    rows.forEach(function (record) {
                                                        result.push(record);
                                                    });
                                                    return [2 /*return*/];
                                                });
                                            }); })
                                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    conn.release();
                                                    return [2 /*return*/, result];
                                                });
                                            }); })
                                                .catch(function (err) {
                                                console.log(err);
                                                return [];
                                            })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        pool = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /*Ingredients*/
    Data.prototype.AddIngredient = function (req) {
        var values = '\'' + req.InputDescription + '\'' + ', ' + '\'' + req.UnitOfMeasurement + '\'' + ', ' + '\'' + req.AmountOnStock + '\'' + ', ' + '\'' + req.Category + '\'' + ', ' + '\'' + req.SearchName.toUpperCase() + '\'';
        var pool = mariadb_1.default.createPool({
            host: 'localhost',
            user: 'FoodPlanningUser',
            password: 'Shaymin',
            database: 'FoodPlanning',
            socketPath: '/run/mysqld/mysqld.sock'
        })
            .getConnection()
            .then(function (conn) {
            conn.query('INSERT INTO Ingredient(Description, UnitOfMeasurement, Amount_on_Stock, Category, Searchname) Values(' + values + ')')
                .then(function (res) {
                conn.release();
            })
                .catch(function (err) {
                console.log(err);
            });
        });
    };
    Data.instance = new Data();
    return Data;
}());
exports.Data = Data;
