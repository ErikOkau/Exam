import { prisma } from "~/server/server"

export default defineEventHandler(async (event) => {
  const articles = await prisma.article.findMany()

  return { status: 200, articles }
})

