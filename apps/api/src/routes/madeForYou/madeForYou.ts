import { Router } from "express";
import { prisma } from "../../prismaConfig/prisma";
import { z } from "zod"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET: string = process.env.JWT_SECRET || "JWT_SECRET"
export const madeForYouRouter = Router()

madeForYouRouter.get("/all/:projectId", async (req, res) => {
    const token = req.headers.token as string;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }

    const userId = decoded.id;
    const projectId = parseInt(req.params.projectId);
    try {
        const madeForYouItems = await prisma.madeForYou.findMany({
            where: { projectId: projectId },
            include: {
                project: true,
            }
        });
        res.json({
            message: "Made For You items fetched successfully",
            data: madeForYouItems
        });
    } catch (error) {
        console.error("Error fetching Made For You items:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

madeForYouRouter.get("/:madeForYouId", async (req, res) => {
    const token = req.headers.token as string;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }

    const userId = decoded.id;
    const madeForYouId = parseInt(req.params.madeForYouId);
    try {
        const madeForYouItem = await prisma.madeForYou.findFirst({
            where: { id: madeForYouId },
            include: {
                project: true,
            }
        });
        res.json({
            message: "Made For You item fetched successfully",
            data: madeForYouItem
        });
    } catch (error) {
        console.error("Error fetching Made For You item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

madeForYouRouter.delete("/:madeForYouId", async (req, res) => {
    const token = req.headers.token as string;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }

    const userId = decoded.id;
    const madeForYouId = parseInt(req.params.madeForYouId);
    try {
        await prisma.madeForYou.delete({
            where: { id: madeForYouId },
        });
        res.json({
            message: "Made For You item deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting Made For You item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

export default madeForYouRouter;