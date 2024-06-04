import { prisma } from "~/server/server"
import { decrypt, encrypt, expires } from "../../utils/auth"
import { SignJWT, jwtVerify } from "jose"

// register using prisma
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { email, password, role } = body as { email: string, password: string, role: string }
    
    const user = await prisma.user.create({
        data: {
            email: body.email,
            password: body.password,
            role: body.role
        }
    })
    
    const token = await encrypt({ id: user.id })
    
    return {
        status: 200,
        body: {
            token
        }
    }
})
