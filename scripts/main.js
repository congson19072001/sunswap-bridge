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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var typechain_types_1 = require("../typechain-types");
var dotenv = require("dotenv");
var polygonContract = require("../polygon_contracts.json");
var bnbContract = require("../bsc_contracts.json");
var utils_1 = require("ethers/lib/utils");
dotenv.config();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var bnbProvider, bnbSigner, polygonProvider, BridgeBNBSide, bnbSideBridge_WBNB, bnbSideBridge_WMATIC, polygonSigner, BridgePolygonSide, polygonSideBridge_WBNB, polygonSideBridge_WMATIC;
        var _this = this;
        return __generator(this, function (_a) {
            bnbProvider = new ethers_1.providers.JsonRpcProvider(process.env.BSC_RPC);
            bnbSigner = new ethers_1.ethers.Wallet("".concat(process.env.PRIVATE_KEY), bnbProvider);
            polygonProvider = new ethers_1.providers.JsonRpcProvider(process.env.POLYGON_RPC);
            BridgeBNBSide = new typechain_types_1.BridgeBsc__factory(bnbSigner);
            bnbSideBridge_WBNB = BridgeBNBSide.attach(bnbContract.WBNB_BRIDGE_BSC);
            bnbSideBridge_WMATIC = BridgeBNBSide.attach(bnbContract.WMATIC_BRIDGE_BSC);
            polygonSigner = new ethers_1.ethers.Wallet("".concat(process.env.PRIVATE_KEY), polygonProvider);
            BridgePolygonSide = new typechain_types_1.BridgePolygon__factory(polygonSigner);
            polygonSideBridge_WBNB = BridgePolygonSide.attach(polygonContract.WBNB_BRIDGE_POLYGON);
            polygonSideBridge_WMATIC = BridgePolygonSide.attach(polygonContract.WMATIC_BRIDGE_POLYGON);
            console.log("Listening to Burn WBNB event on BNB side");
            bnbSideBridge_WBNB.on("Transfer", function (from, to, amount, date, nonce, signature, step) { return __awaiter(_this, void 0, void 0, function () {
                var amountBNB, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (step != 0) {
                                console.log("Successfully minted");
                                return [2 /*return*/];
                            }
                            amountBNB = amount.toString();
                            console.log(from, "has requested to bridge", (0, utils_1.formatEther)(amount.toString()), "WBNB from Binance Chain");
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, polygonSideBridge_WBNB.mint(from, to, amountBNB, nonce, signature)];
                        case 2:
                            _a.sent();
                            console.log("Minted", (0, utils_1.formatEther)(amount.toString()), "Wrapped BNB to", to, "on Polygon chain");
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            console.log("Error in minting", e_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            console.log("Listening to Burn WMATIC event on BNB side");
            bnbSideBridge_WMATIC.on("Transfer", function (from, to, amount, date, nonce, signature, step) { return __awaiter(_this, void 0, void 0, function () {
                var amountWMATIC, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (step != 0) {
                                console.log("Successfully minted");
                                return [2 /*return*/];
                            }
                            amountWMATIC = amount.toString();
                            console.log(from, "has requested to bridge", (0, utils_1.formatEther)(amount.toString()), "WMATIC from Binance Chain");
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, polygonSideBridge_WMATIC.mint(from, to, amountWMATIC, nonce, signature)];
                        case 2:
                            _a.sent();
                            console.log("Minted", (0, utils_1.formatEther)(amount.toString()), "Wrapped WMATIC to", to, "on Polygon chain");
                            return [3 /*break*/, 4];
                        case 3:
                            e_2 = _a.sent();
                            console.log("Error in minting", e_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            console.log("Listening to Burn WBNB event on Polygon side");
            polygonSideBridge_WBNB.on("Transfer", function (from, to, amount, date, nonce, signature, step) { return __awaiter(_this, void 0, void 0, function () {
                var amountBNB, e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (step != 0) {
                                console.log("Successfully minted");
                                return [2 /*return*/];
                            }
                            amountBNB = amount.toString();
                            console.log(from, "has requested to bridge", (0, utils_1.formatEther)(amount.toString()), "WBNB from Polygon chain");
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, bnbSideBridge_WBNB.mint(from, to, amountBNB, nonce, signature)];
                        case 2:
                            _a.sent();
                            console.log("Minted", (0, utils_1.formatEther)(amount.toString()), "Wrapped BNB to", to, "on Binance chain");
                            return [3 /*break*/, 4];
                        case 3:
                            e_3 = _a.sent();
                            console.log("Error in minting", e_3);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            console.log("Listening to Burn WMATIC event on Polygon side");
            polygonSideBridge_WMATIC.on("Transfer", function (from, to, amount, date, nonce, signature, step) { return __awaiter(_this, void 0, void 0, function () {
                var amountWMATIC, e_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (step != 0) {
                                console.log("Successfully minted");
                                return [2 /*return*/];
                            }
                            amountWMATIC = amount.toString();
                            console.log(from, "has requested to bridge", (0, utils_1.formatEther)(amount.toString()), "WMATIC from Polygon chain");
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, bnbSideBridge_WMATIC.mint(from, to, amountWMATIC, nonce, signature)];
                        case 2:
                            _a.sent();
                            console.log("Minted", (0, utils_1.formatEther)(amount.toString()), "Wrapped WMATIC to", to, "on Binance chain");
                            return [3 /*break*/, 4];
                        case 3:
                            e_4 = _a.sent();
                            console.log("Error in minting", e_4);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
main();
