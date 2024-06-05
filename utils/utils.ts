export function highlightSearch(text: string, searchTerm: string) {
    const normalizedTitle = String(text).toLowerCase()
    const normalizedSearchTerm = String(searchTerm).toLowerCase()

    const startIndex = normalizedTitle.indexOf(normalizedSearchTerm)

    if (startIndex === -1) {
        return {
            html: text,
            isMatch: false,
        }
    }

    const before = text.substr(0, startIndex)
    const match = text.substr(startIndex, searchTerm.length)
    const after = text.substr(startIndex + searchTerm.length)

    return {
        html:
            before +
            '<span class="bg-blue-7 text-black">' +
            match +
            "</span>" +
            after,
        isMatch: true,
    }
}