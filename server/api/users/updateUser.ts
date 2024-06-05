import { prisma } from "~/server/server"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const updateResult = await prisma.user.update({
    where: {
      id: body.id,
    },
    data: body.data,
  })

  if (!updateResult) {
    return { status: 404, msg: "User not found" }
  }

  return { status: 200, msg: "User updated", user: updateResult }
})
