import { prisma } from "~/server/server"

export default defineEventHandler(async (event) => {
    const users = await prisma.user.findMany()

    return { status: 200, users }
})
