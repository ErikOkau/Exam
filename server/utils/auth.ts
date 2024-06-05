import { PrismaClient } from "@prisma/client"
import { SignJWT, jwtVerify } from "jose"

const prisma = new PrismaClient()
const secret = "secret"
// Convert the secret to a Uint8Array
const key = new TextEncoder().encode(secret)

export const expires = (days: number) => new Date(Date.now() + 1000 * 60 * 60 * 24 * days)

// Encrypt the payload
export async function encrypt(payload: any) {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expires(7))
    .sign(key)
}

// Decrypt the token
export async function decrypt(token: string) : Promise<any> {
    const { payload } = await jwtVerify(token, key, { 
        algorithms: ["HS256"]
    })
    return payload
}