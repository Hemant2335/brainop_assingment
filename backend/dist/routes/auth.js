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
const router = express_1.default.Router();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(400).json({ Status: false, error: "User not found" });
        }
        const valid = yield bcrypt_1.default.compare(password, user.password);
        if (!valid) {
            return res.status(400).json({ Status: false, error: "Invalid Password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || "secret");
        console.log(token);
        res.cookie("token", token);
        console.log("Successfully set cookie");
        res.json({ Status: true, token: token });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ Status: false, error: "Internal Server Error" });
    }
}));
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, name, password } = req.body;
    // Check if email already exists
    const user = yield prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
    });
    const user2 = yield prisma.user.findUnique({
        where: {
            username: req.body.username,
        },
    });
    if (user) {
        return res
            .status(400)
            .json({ Status: false, error: "User already exists" });
    }
    if (user2) {
        return res
            .status(400)
            .json({ Status: false, error: "Username already Taken" });
    }
    // Encrypt password
    const hashedpassword = yield bcrypt_1.default.hash(password, 10);
    // Create user
    try {
        const newuser = yield prisma.user.create({
            data: {
                email: email,
                password: hashedpassword,
                name: name,
                username: username,
            },
        });
        console.log(process.env.JWT_SECRET);
        const token = jsonwebtoken_1.default.sign({ id: newuser.id }, process.env.JWT_SECRET || "secret");
        res.cookie("token", token);
        res.json({ Status: true, token: token });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ Status: false, error: "Internal Server Error" });
    }
}));
module.exports = router;
