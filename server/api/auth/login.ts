import { prisma } from "~/server/server"
import { decrypt, encrypt, expires } from "../../utils/auth"

// login using prisma
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { username, password } = body as { username: string, password: string }
    
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    })
    if (user == null) {
        return {
            status: 401,
            body: {
                error: "Invalid email or password"
            }
        }
    }
})
