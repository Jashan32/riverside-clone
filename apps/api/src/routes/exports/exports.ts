import { Router } from "express";
import { prisma } from "../../prismaConfig/prisma";
import { z } from "zod"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET: string = process.env.JWT_SECRET || "JWT_SECRET"
export const exportsRouter = Router()

exportsRouter.get("/all/:projectId", async (req, res) => {
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
        const exports = await prisma.exports.findMany({
            where: { projectId: projectId },
            include: {
                project: true,
            }
        });
        res.json({
            message: "Exports fetched successfully",
            data: exports
        });
    } catch (error) {
        console.error("Error fetching exports:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

exportsRouter.get("/:exportId", async (req, res) => {
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
    const exportId = parseInt(req.params.exportId);
    try {
        const exportData = await prisma.exports.findFirst({
            where: { id: exportId },
            include: {
                project: true,
            }
        });
        res.json({
            message: "Export fetched successfully",
            data: exportData
        });
    } catch (error) {
        console.error("Error fetching export:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

exportsRouter.delete("/:exportId", async (req, res) => {
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
    const exportId = parseInt(req.params.exportId);
    try {
        await prisma.exports.delete({
            where: { id: exportId },
        });
        res.json({
            message: "Export deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting export:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

export default exportsRouter;