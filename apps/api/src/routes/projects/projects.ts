import { Router } from "express";
import { prisma } from "../../prismaConfig/prisma";
import { z } from "zod"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET: string = process.env.JWT_SECRET || "JWT_SECRET"

export const projectsRouter = Router()

projectsRouter.post("/create", async (req, res) => {
    try {
        const { token, title } = req.body
        const decoded = jwt.verify(token, JWT_SECRET as string) as { id: number }
        const id = decoded.id
        const project = await prisma.project.create({
            data: {
                title: title,
                creatorId: id,
            }
        })
        res.json({
            message: "Project created successfully",
            data: {
                projectId: project.id,
                creatorId: project.creatorId,
                title: project.title,
            }
        });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

projectsRouter.get("/all", async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, JWT_SECRET as string) as { id: number };
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }

    const userId = decoded.id;
    try {
        const projects = await prisma.project.findMany({
            where: { creatorId: userId },
            include: {
                creator: true,
                recordings: true,
            }
        });
        res.json({
            message: "Projects fetched successfully",
            data: projects
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

projectsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const project = await prisma.project.findUnique({
            where: { id: parseInt(id) },
            include: {
                creator: true,
                recordings: true,
            }
        });
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.json({
            message: "Project fetched successfully",
            data: project
        });
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

projectsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    try {
        const updatedProject = await prisma.project.update({
            where: { id: parseInt(id) },
            data: { title }
        });
        res.json({
            message: "Project updated successfully",
            data: updatedProject
        });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

projectsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.project.delete({
            where: { id: parseInt(id) }
        });
        res.json({
            message: "Project deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

export default projectsRouter