import { Router } from "express";
import { prisma } from "../../prismaConfig/prisma";
import { z } from "zod"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET: String = process.env.JWT_SECRET || "JWT_SECRET"

const sessionRouter = Router()

sessionRouter.post("/", async (req, res) => {
    const { token } = req.body
    
})