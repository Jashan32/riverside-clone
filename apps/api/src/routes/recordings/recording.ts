import { Router } from "express";
import { prisma } from "../../prismaConfig/prisma";
import { z } from "zod"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET: string = process.env.JWT_SECRET || "JWT_SECRET"
export const recordingsRouter = Router()

recordingsRouter.get("/all/:projectId", async (req, res) => {
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
        const recordings = await prisma.recordings.findMany({
            where: { projectId: projectId },
            include: {
                project: true,
            }
        });
        res.json({
            message: "Recordings fetched successfully",
            data: recordings
        });
    } catch (error) {
        console.error("Error fetching recordings:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

recordingsRouter.get("/:recordingId", async (req, res) => {
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
    const recordingId = parseInt(req.params.recordingId);
    try {
        const recording = await prisma.recordings.findFirst({
            where: { id: recordingId },
            include: {
                project: true,
            }
        });
        res.json({
            message: "Recording fetched successfully",
            data: recording
        });
    } catch (error) {
        console.error("Error fetching recording:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

recordingsRouter.delete("/delete/:recordingId", async (req, res) => {
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
    const recordingId = parseInt(req.params.recordingId);
    try {
        await prisma.recordings.delete({
            where: { id: recordingId }
        });
        res.json({
            message: "Recording deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting recording:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})