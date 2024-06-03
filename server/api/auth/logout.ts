import { prisma } from "~/server/server"
import { decrypt, encrypt, expires } from "../../utils/auth"
import { SignJWT, jwtVerify } from "jose"

// logout using prisma
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { token } = body as { token: string }
    
    const payload = await decrypt(token)
    if (payload == null) {
        return {
            status: 401,
            body: {
                error: "Invalid token"
            }
        }
    }
    
    const user = await prisma.user.findUnique({
        where: {
            id: payload.id
        }
    })
    if (user == null) {
        return {
            status: 401,
            body: {
                error: "Invalid token"
            }
        }
    }
    
    return {
        status: 200,
        body: {
            message: "Successfully logged out"
        },
        headers: {
            'Set-Cookie': `Authorization=; Path=/; Expires=${new Date().toUTCString()}; HttpOnly; SameSite=Lax; Secure`
        }
    }
})