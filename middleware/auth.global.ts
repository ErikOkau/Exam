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
        "/artikkel/newArticle"
    ],
    MONTOR: [
        "/artikkel/newArticle"
    ],
    SALG: [
        "/artikkel/newArticle"
    ],
}

// Everyone can access
const noAuthPages: Path[] = [
    "/login", 
    "/", 
    "/artikkel", 
    /\/artikkel\/id-\d+/
]


export default defineNuxtRouteMiddleware(async (to, from) => {
  // Stops running on server-side
  if (process.server) return

  // Return if not requires auth on page 
  const noAuthCheck = noAuthPages.find((path) => {
    if (typeof path === "string") {
      return to.path === path
    }
    return path.test(to.path)
  })

  if (noAuthCheck) return

  // Fetch user role
  const res = (await $fetch("/api/auth/decrypt")) as {
    status: Number
    role: Role
  }
  if (res.status !== 200) return navigateTo("/login")
  const allowedRoutes = rolePages[res.role] as string[]

  // Redirect to the home page if user not allowed on page
  if (noAuthCheck) {
    if (!allowedRoutes.includes(from.path)) {
      return navigateTo("/")
    }
  }
  if (!allowedRoutes.includes(to.path)) {
    console.log("Not allowed abourt")
    return abortNavigation()
  }
})
