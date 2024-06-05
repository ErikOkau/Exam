import { prisma } from '~/server/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const deleteArticle = await prisma.article.delete({
      where: {
          id: body.id,
      }
  })

  if (!deleteArticle) {
      return { status: 404, msg: "Article not found"}
  }

  return { status: 200, msg: "Article deleted"}
})