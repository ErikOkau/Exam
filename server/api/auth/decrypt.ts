import { decrypt } from "~/server/utils/auth"

export default defineEventHandler(async (event) => {
    const cookie = getCookie(event, "Authorization")
    if (!cookie) return { status: 400, msg: "No cookie"}

    const decrypted = await decrypt(cookie).catch(() => null)
    if (decrypted == null) return { status: 400, msg: "Invalid cookie"}
    if (decrypted.expires < Date.now()) return { status: 400, msg: "Expired cookie"}

    return { status: 200, msg: "Success", role: decrypted.role}
})