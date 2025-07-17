import { Router } from "express";
import { prisma } from "../../prismaConfig/prisma";
import { z } from "zod"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET: String = process.env.JWT_SECRET || "JWT_SECRET"

export const sessionRouter = Router()

sessionRouter.post("/create", async (req, res) => {
    try {
        const { token, scheduled, sessionName } = req.body
        console.log("abc", scheduled)
        const decoded = jwt.verify(token, JWT_SECRET as string) as { id: number }
        const id = decoded.id
        const session = await prisma.session.create({
            data: {
                creatorId: id,
                scheduled: scheduled,
                sessionName: sessionName,
            }
        })
        res.json({
            message: "Session created successfully",
            data: {
                sessionId: session.id,
                creatorId: session.creatorId,
                scheduled: session.scheduled
            }
        });
    } catch (error) {
        console.error("Error creating session:", error);
        res.status(500).json({ error: "Internal server error" });
    }

})

sessionRouter.post("/invie", async (req, res) => {
    const { token, email, isRegistered, invitedUserId, sessionId } = req.body
    try {
        const decoded = jwt.verify(token, JWT_SECRET as string) as { id: number }
        const userId = decoded.id

        let whereClause: any = { sessionId };
        if (isRegistered && invitedUserId) {
            whereClause.invitedUserId = invitedUserId;
        } else if (!isRegistered && email) {
            whereClause.email = email;
        } else {
            return res.status(400).json({ error: "Either invitedUserId or email must be provided." });
        }

        // Check if already invited
        const alreadyInvited = await prisma.sessionInvite.findFirst({
            where: whereClause
        });

        if (alreadyInvited) {
            return res.status(409).json({ error: "User/email already invited to this session." });
        }

        let session;
        if (isRegistered) {
            session = await prisma.sessionInvite.create({
                data: {
                    email: email,
                    sessionId: sessionId,
                    invitedUserId: invitedUserId,
                }
            })
        }
        else if (!isRegistered) {
            session = await prisma.sessionInvite.create({
                data: {
                    email: email,
                    sessionId: sessionId
                }
            })
        }
        res.json({
            message: "Invite sent successfully",
            data: {
                sessionId: session?.sessionId,
                invitedUserId: session?.invitedUserId,
                email: session?.email
            }
        });
    }
    catch (error) {
        console.error("Error sending invite:", error);
        res.status(500).json({ error: error });
    }
})