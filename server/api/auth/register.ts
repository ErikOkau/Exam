import { prisma } from "~/server/server"
import { decrypt, encrypt, expires } from "../../utils/auth"
import { SignJWT, jwtVerify } from "jose"

// registerhandler
export default defineEventHandler(async (event) => {
    
})