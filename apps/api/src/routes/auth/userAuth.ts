import { Router } from "express";
import { prisma } from "../../prismaConfig/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { google } from "googleapis";
import axios from "axios";
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

loginRouter.post("/google", async (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ error: "Code is required" });
    }
    try {
        // Initialize OAuth2 client
        const oauth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            "http://localhost:5173"
        );

        // Exchange code for tokens
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const { email, name, picture } = userRes.data;
        let user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    username: name || email.split('@')[0], // Use name or part of email as username
                    password: "", // No password for OAuth users
                    prifilePic: picture || ""
                }
            });
        }
        // Generate JWT token
        const token = jwt.sign({ id: user.id }, JWT_SECRET as string);
        res.json({
            message: "Google login successful",
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    name: user.name,
                    prifilePic: user.prifilePic,
                }
            }
        });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export { loginRouter, registerRouter };