import { decrypt } from "~/server/utils/auth"

export default defineEventHandler(async (event) => {

    // Get the cookie from the request
    const cookie = getCookie(event, "Authorization")

    // If the cookie is null, return a 400 status code
    if (!cookie) return { status: 400, msg: "No cookie"}

    // Decrypt the cookie
    const decrypted = await decrypt(cookie).catch(() => null)

    // If the decrypted cookie is null, return a 400 status code
    if (decrypted == null) return { status: 400, msg: "Invalid cookie"}

    // If the cookie is expired, return a 400 status code
    if (decrypted.expires < Date.now()) return { status: 400, msg: "Expired cookie"}

    return { status: 200, msg: "Success", role: decrypted.role}
})