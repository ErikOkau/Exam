import { prisma } from '~/server/server'

export default defineEventHandler(async (event) => {
  // Get the article ID from the URL
  const { articleId } = event.pathParameters

  // Delete the article
  await prisma.article.delete({
    where: { id: articleId },
  })

  return { status: 204 }
})
