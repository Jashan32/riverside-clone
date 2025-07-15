import e, { Router } from "express";
import { prisma } from "../../prismaConfig/prisma";

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
    console.log(req.body);
    const { email, password, username } = req.body;
    const response = await prisma.user.findFirst({
        where: {
            OR: [
                { email },
                { username }
            ],
            password
        }
    });
    res.json(response || { error: "User not found" });
})

export { loginRouter };