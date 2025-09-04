import { Router } from "express";
import { prisma } from "../../prismaConfig/prisma";
import { z } from "zod"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET: string = process.env.JWT_SECRET || "JWT_SECRET"
export const editsRouter = Router()

editsRouter.get("/all/:projectId", async (req, res) => {
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
        const edits = await prisma.edits.findMany({
            where: { projectId: projectId },
            include: {
                project: true,
            }
        });
        res.json({
            message: "Edits fetched successfully",
            data: edits
        });
    } catch (error) {
        console.error("Error fetching edits:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

editsRouter.get("/:editId", async (req, res) => {
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
    const editId = parseInt(req.params.editId);
    try {
        const edit = await prisma.edits.findFirst({
            where: { id: editId },
            include: {
                project: true,
            }
        });
        res.json({
            message: "Edit fetched successfully",
            data: edit
        });
    } catch (error) {
        console.error("Error fetching edit:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

editsRouter.post("/create", async (req, res) => {
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
    const { title, projectId, sessionId,creatorId } = req.body;

    const editSchema = z.object({
        title: z.string().min(1),
        projectId: z.number().min(1),
        sessionId: z.number().optional(),
        creatorId: z.number().min(1)
    });

    try {
        editSchema.parse({ title, projectId, sessionId });
    } catch (error) {
        return res.status(400).json({ error: error });
    }

    try {
        const edit = await  prisma.edits.create({
            data: {
                title,
                projectId,
                sessionId,
                creatorId
            }
        });
        res.json({
            message: "Edit created successfully",
            data: edit
        });
    } catch (error) {
        console.error("Error creating edit:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

editsRouter.delete("/:editId", async (req, res) => {
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
    const editId = parseInt(req.params.editId);
    try {
        await prisma.edits.delete({
            where: { id: editId }
        });
        res.json({
            message: "Edit deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting edit:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

editsRouter.put("/:editId", async (req, res) => {
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
    const editId = parseInt(req.params.editId);
    const { title, description } = req.body;

    const editSchema = z.object({
        title: z.string().min(1).optional(),
        description: z.string().optional(),
    });

    try {
        editSchema.parse({ title });
    } catch (error) {
        return res.status(400).json({ error: error });
    }

    try {
        const edit = await prisma.edits.update({
            where: { id: editId },
            data: {
                title,
            }
        });
        res.json({
            message: "Edit updated successfully",
            data: edit
        });
    } catch (error) {
        console.error("Error updating edit:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

export default editsRouter;