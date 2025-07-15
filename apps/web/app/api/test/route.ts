import { NextRequest, NextResponse } from "next/server";
import { client } from "../lib/prisma";

export async function GET(req: NextRequest) {

    try {
        const data = await client.user.findMany();
        await client.user.create({
            data: {
                name: "John Ddoe",
                email: "d",
                username: "johndoe"
            }
        })
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }

}