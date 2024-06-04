import type { Role } from "@prisma/client"

const noAuthPages = [
    "/login",
    "/",
    "/artikkel/newArticle",
    "/admin"
]

const otherPages = {
    ADMINISTRASJON: [
        "/ansatte"
    ],
    MONTOR: [],
    SALG: [],
}


export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) return

    // If the page does not require authentication, return
    if (noAuthPages.includes(to.path)) return

    // Fetch the user role
    const res = await $fetch('/api/auth/decrypt') as { status: Number , role: Role }
    if(res.status !== 200) return navigateTo("/login")

    const allowedRoutes = otherPages[res.role] as string[]

    if(!allowedRoutes.includes(from.path)) return navigateTo("/")
    if (!allowedRoutes.includes(to.path)) return abortNavigation()
    
})