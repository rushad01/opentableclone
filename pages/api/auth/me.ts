import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import Jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function hnadler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const beareToken = req.headers.authorization as string;
    if (!beareToken) {
        return res.status(401).json({ error: "Unauthorize Request(no bearer token)" })
    }

    const token = beareToken?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorize Request(no token)." });
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    try {
        await jose.jwtVerify(token, secret);
    } catch (error) {
        return res.status(401).json({ error: "Unauthorize Request(token verification failed)." })
    }
    const payload = Jwt.decode(token) as { email: string };

    if (!payload.email) {
        return res.status(401).json({ error: "Unauthorize Request(token verification failed)." });
    }
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            city: true,
            phone: true
        }
    })

    return res.status(200).json({
        user
    })
}
