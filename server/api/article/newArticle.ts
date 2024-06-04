import { prisma } from "~/server/server"

// Create new article
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const newArticle = await prisma.article
    .create({
      data: {
        title: body.title,
        content: body.content,
      },
    })
    .catch(() => null)

    return { status: 201, msg: "Article created" }
})
