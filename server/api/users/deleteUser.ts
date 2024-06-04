import { prisma } from "~/server/server"

// Delete a user
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const deleteResult = await prisma.user.delete({
        where: {
            id: body.id,
        }
    })

    if (!deleteResult) {
        return { status: 404, msg: "User not found"}
    }

    return { status: 200, msg: "User deleted"}
})