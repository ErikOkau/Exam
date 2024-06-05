import { prisma } from "~/server/server"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const deleteUser = await prisma.user.delete({
        where: {
            id: body.id
            
        }
    })

    if (!deleteUser) {
        return { status: 404, msg: "User not found"}
    }

    return { status: 200, msg: "User deleted"}
})