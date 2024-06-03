import { PrismaClient } from "@prisma/client"
import { SignJWT, jwtVerify } from "jose"

const prisma = new PrismaClient()
const secret = "secret"
const key = new TextEncoder().encode(secret)

export const expires = (days: number) => new Date(Date.now() + 1000 * 60 * 60 * days)

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expires(7))
    .sign(key)
}

export async function decrypt(token: string) : Promise<any> {
    const { payload } = await jwtVerify(token, key, { 
        algorithms: ["HS256"]
    })
    return payload
}