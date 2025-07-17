import { Router } from "express";
import { prisma } from "../../prismaConfig/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET: String = process.env.JWT_SECRET || "JWT_SECRET"

const loginRouter = Router();
const registerRouter = Router();

loginRouter.post("/", async (req, res) => {
    const { email, password, username } = req.body;
    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }
    let whereClause: any = {};
    if (email) {
        whereClause.email = email;
    } else if (username) {
        whereClause.username = username;
    } else {
        return res.status(400).json({ error: "Email or username is required" });
    }

    const response = await prisma.user.findFirst({
        where: whereClause
    });
    bcrypt.compare(password, response?.password || "", async (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (!result) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ id: response?.id }, JWT_SECRET as string);
        res.json({
            message: "success",
            data: {
                token: token,
                user: {
                    email: response?.email,
                    username: response?.username,
                    id: response?.id
                }
            }
        });
    });
})

registerRouter.post("/", async (req, res) => {
    const { email, password, username } = req.body;

    const userSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        username: z.string().min(3)
    });

    try {
        userSchema.parse({ email, password, username });
    } catch (error) {
        return res.status(400).json({ error: error });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username
            }
        });
        const token = jwt.sign({ id: user.id }, JWT_SECRET as string)
        res.json({
            message: "success",
            data: {
                token: token
            }
        })
    } catch (error) {
        res.status(500).json({ error: error });
    }

})

export { loginRouter, registerRouter };