import { decrypt, encrypt, expires } from "../utils/auth"

// 
export default defineEventHandler(async (event) => {
  const session = getCookie(event, "Authorization")

  if (session) {
    // If the session is not null, then the session is decrypted
    const parsed = await decrypt(session).catch(() => null)

    // If the session is null, then the cookie is set to an empty string
    if (parsed == null) {
      setCookie(event, "Authorization", "", { expires: new Date() })
      setCookie(event, "LoggedIn", "", { expires: new Date() })
    }

    setCookie(event, "Authorization", await encrypt(parsed), {
      expires: expires(7),

      // httpOnly is a boolean that indicates whether the cookie is only accessible by the web server
      httpOnly: true,
    })
  }
})
