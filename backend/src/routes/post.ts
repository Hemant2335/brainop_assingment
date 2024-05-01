import express from "express";
const router = express.Router();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import authentication from "../middlewares/authentication";


router.get("/", authentication ,async (req, res) => {
    try {
        const posts = await prisma.post.findMany();
        res.json(posts);   
    } catch (error) {
        console.log(error);
        res.status(400).json({ Status: false, error: "Internal Server Error" });
    }
});


router.post("/create", authentication, async (req, res) => {
    const { title, content } = req.body;
    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
            },
        });
        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(400).json({ Status: false, error: "Internal Server Error" });
    }
});

module.exports = router;