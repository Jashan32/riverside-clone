import { Router } from "express";
import { prisma } from "../../prismaConfig/prisma";
import { z } from "zod"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const JWT_SECRET: string = process.env.JWT_SECRET || "JWT_SECRET"

export const getSessionRouter = Router();
//get sessions of a user
getSessionRouter.get("/created", async (req, res) => {
    const token = req.headers.token as string;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        const userId = decoded.id;
        const sessions = await prisma.session.findMany({
            where: {
                creatorId: userId
            }
        });
        return res.status(200).json(sessions);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})

getSessionRouter.get("/invites", async (req, res) => {
    const token = req.headers.token as string;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        const userId = decoded.id;
        const sessions = await prisma.SessionInvite.findMany({
            where: {
                userId: userId
            },
            include: {
                session: true
            }
        });
        return res.status(200).json(sessions);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});

