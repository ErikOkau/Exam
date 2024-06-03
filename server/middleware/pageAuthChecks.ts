import { prisma } from "~/server/server"
import { decrypt, encrypt, expires } from "../utils/auth"
import { SignJWT, jwtVerify } from "jose"

// check if user is logged in, redirect to /login if not
export default defineEventHandler(async (event) => {
  
})
