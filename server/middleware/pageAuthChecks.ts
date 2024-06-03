import { prisma } from "~/server/server"
import { decrypt, encrypt, expires } from "../utils/auth"
import { SignJWT, jwtVerify } from "jose"

// check if user is logged in, redirect to /login if not
export default defineEventHandler(async (event) => {
  const session = getCookie(event, "Authorization")
  if (session) {
    const parsed = await decrypt(session).catch(() => null)
    if (parsed == null) {
      setCookie(event, "Authorization", "", { expires: new Date() })
      setCookie(event, "LoggedIn", "", { expires: new Date() })
      return {
        status: 302,
        headers: {
          location: "/login",
        },
      }
    }
    setCookie(event, "Authorization", await encrypt(parsed), {
      expires: expires(7),
      httpOnly: true,
    })
  } else {
    return {
      status: 302,
      headers: {
        location: "/login",
      },
    }
  }
})
