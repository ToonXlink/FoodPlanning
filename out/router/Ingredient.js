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
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var body_parser_1 = __importDefault(require("body-parser"));
var Data_1 = require("../models/Data");
var router = express_1.default.Router();
var data = Data_1.Data.getInstance();
var urlencoded = body_parser_1.default.urlencoded({ extended: true });
router
    .use(urlencoded, express_1.default.json())
    .route('/')
    .get(function (req, res) {
    res.redirect('/Zutaten/0');
})
    .post(function (req, res) {
    //console.log(req)
    //console.log(res)
});
router
    .use(express_1.default.static(path_1.default.join(__dirname, '../../', '/public')))
    .route('/AddIngridient')
    .patch(function (req, res) {
    console.log(req.body);
    res.status(200).send('passt');
    data.AddIngredientAmount(req.body);
});
router
    .use(express_1.default.static(path_1.default.join(__dirname, '../../', '/public')))
    .route('/SubtractIngredient')
    .patch(function (req, res) {
    console.log(req.body);
    res.status(200).send('passt');
    data.SubtractIngredientAmount(req.body);
});
router
    .use(express_1.default.static(path_1.default.join(__dirname, '../../', '/public')))
    .use(express_1.default.static(path_1.default.join(__dirname, '../../../', '/public')))
    .route('/:Category/:Site')
    .get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (!(Number(req.params.Site) != NaN && Number(req.params.Site) >= 0)) return [3 /*break*/, 5];
                _b = (_a = res).render;
                _c = ['Index.ejs'];
                _d = {
                    mainpart: 'Ingredient.ejs'
                };
                return [4 /*yield*/, data.GetIngredientList(Number(req.params.Site), 10, Number(req.params.Category))];
            case 1:
                _d.IngredientList = _e.sent();
                return [4 /*yield*/, data.getUnitOfMeasurement()];
            case 2:
                _d.UnitOfMeasurement = _e.sent();
                return [4 /*yield*/, data.getIngredientCategory()];
            case 3:
                _d.Category = _e.sent(),
                    _d.NoRows = 10,
                    _d.Site = req.params.Site;
                return [4 /*yield*/, data.GetIngredientCount(Number(req.params.Category))];
            case 4:
                _b.apply(_a, _c.concat([(_d.Count = _e.sent(),
                        _d)]));
                return [3 /*break*/, 6];
            case 5:
                res.redirect('/Zutaten/0');
                _e.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); })
    .post(function (req, res) {
    //console.log(req.body);
    if (req.body.InputDescription != '' && req.body.UnitOfMeasurement != '' && req.body.AmountOnStock != '' && req.body.Category != '' && req.body.SearchName != '') {
        data.AddIngredient(req.body);
    }
    else {
        res.status(418).send("Sry but your Input is wrong");
    }
    res.redirect('/Zutaten/' + req.params.Category + '/' + req.params.Site);
})
    .patch(function (req, res) {
    console.log(req.body);
    res.status(200).send('passt');
    data.UpdateIngredient(req.body);
});
router
    .use(express_1.default.static(path_1.default.join(__dirname, '../../', '/public')))
    .route('/:Site')
    .get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (!(Number(req.params.Site) != NaN && Number(req.params.Site) >= 0)) return [3 /*break*/, 5];
                _b = (_a = res).render;
                _c = ['Index.ejs'];
                _d = {
                    mainpart: 'Ingredient.ejs'
                };
                return [4 /*yield*/, data.GetIngredientList(Number(req.params.Site), 10)];
            case 1:
                _d.IngredientList = _e.sent();
                return [4 /*yield*/, data.getUnitOfMeasurement()];
            case 2:
                _d.UnitOfMeasurement = _e.sent();
                return [4 /*yield*/, data.getIngredientCategory()];
            case 3:
                _d.Category = _e.sent(),
                    _d.NoRows = 10,
                    _d.Site = req.params.Site;
                return [4 /*yield*/, data.GetIngredientCount()];
            case 4:
                _b.apply(_a, _c.concat([(_d.Count = _e.sent(),
                        _d)]));
                return [3 /*break*/, 6];
            case 5:
                res.redirect('/Zutaten/0');
                res.status(200).send('L');
                _e.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); })
    .post(function (req, res) {
    //console.log(req.body);
    if (req.body.InputDescription != '' && req.body.UnitOfMeasurement != '' && req.body.AmountOnStock != '' && req.body.Category != '' && req.body.SearchName != '') {
        data.AddIngredient(req.body);
    }
    else {
        res.status(418).send("Sry but your Input is wrong");
    }
    res.redirect('/Zutaten/' + req.params.Site);
})
    .patch(function (req, res) {
    console.log(req.body);
    res.status(200).send('passt');
    data.UpdateIngredient(req.body);
});
exports.default = router;
