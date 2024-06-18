"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express_1 = __importDefault(require("express"));
var dotenv = __importStar(require("dotenv"));
var constants_1 = require("./helpers/constants");
var morgan = require("morgan");
var routes_1 = require("./routes");
dotenv.config();
var App = /** @class */ (function () {
    function App() {
        this.app = (0, express_1.default)();
        this.app.all('/*', function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Request-Headers', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT , DELETE');
            // res.set('Cache-Control', 'no-store');
            // res.setHeader("Cache-Control", "public, no-cache");
            if (req.method === 'OPTIONS') {
                res.writeHead(constants_1.Constants.SUCCESS_CODE);
                res.end();
            }
            else {
                next();
            }
        });
        this.app.use(morgan('dev'));
        var routes = new routes_1.Routes();
        this.app.use('/', routes.path());
        this.app.listen("".concat(process.env.PORT), function () {
            console.log("The server is running in port localhost: ".concat(process.env.PORT));
        });
    }
    return App;
}());
exports.App = App;
new App();
