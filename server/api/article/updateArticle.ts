import { prisma } from '~/server/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    const updateArticle = await prisma.article.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    if (!updateArticle) {
        return { status: 404, msg: "Article not found" }
    }

    return { status: 200, msg: "User updated", user: updateArticle }
})