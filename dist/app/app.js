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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// router
const createRouter = express_1.default.Router();
app.use("/", createRouter);
createRouter.get("/api/v1/users/create-users", (req, res) => {
    const user = req.body;
    res.json({
        success: true,
        message: "User created successfully",
        data: user,
    });
});
// parsers
app.use(express_1.default.json());
app.use(express_1.default.text());
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
app.get("/", logger, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("Hello world !");
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}));
app.post("/", logger, (req, res) => {
    console.log(req.body);
    res.json({
        message: "Successfully receive data",
    });
});
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Not found",
    });
});
// global error handler
app.use((err, req, res, next) => {
    if (err) {
        res.status(400).json({
            success: false,
            message: "Fail to get data",
        });
    }
});
exports.default = app;
