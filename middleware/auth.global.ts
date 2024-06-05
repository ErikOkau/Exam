import type { Role } from "@prisma/client"

// Types
type Path = string | RegExp
type typeRoleAllowedPaths = {
  ADMINISTRASJON: Path[],
  MONTOR: Path[],
  SALG: Path[],
}

// Pages that different roles can access
const rolePages: typeRoleAllowedPaths = {
    ADMINISTRASJON: [
        "/artikkel/newArticle",
        "/admin"
    ],
    MONTOR: [
        "/artikkel/newArticle"
    ],
    SALG: [
        "/artikkel/newArticle"
    ],
}

// Pages everyone can access
const noAuthPages: Path[] = [
    "/", 
    "/login", 
    "/artikkel", 
    "/artikkel/articles",
]


export default defineNuxtRouteMiddleware(async (to, from) => {
    // Stops running on server-side
    if (process.server) return

    console.log(to.path, from.path)

    // If the page does not require authentication, return
    const noAuthCheck = noAuthPages.find((path) => {
        if (typeof path === "string") {
            return to.path === path
        }
        return path.test(to.path)
    })
    if (noAuthCheck) return

    // Fetch the user role
    const res = (await $fetch("/api/auth/decrypt")) as {
        status: number
        msg: string
        role: Role
    }
    if (res.status !== 200) return navigateTo("/")
    const allowedRoutes = rolePages[res.role]


    
    // If the user is not allowed to access the page, redirect to the home page
    const fromNoAuthCheck = noAuthPages.find((path) => {
        if (typeof path === "string") {
       return from.path === path
        }
        return path.test(from.path)
    })

    if (!fromNoAuthCheck) {
        const fromAuthCheck = allowedRoutes.find((path) => {
            if (typeof path === "string") {
                return from.path === path
            }
            return path.test(from.path)
        })
        if (!fromAuthCheck) {
            return navigateTo("/")
        }
    }
    
    const toAuthCheck = allowedRoutes.find((path) => {
        if (typeof path === "string") {
            return to.path === path
        }
        return path.test(to.path)
    })

    if (!toAuthCheck) {
        console.log("Not allowed abourt")
        return abortNavigation()
    }
})
