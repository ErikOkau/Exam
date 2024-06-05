
// function for highlighting search
export function highlightSearch(text: string, searchTerm: string) {
    // Normalize the text and search term
    const normalizedTitle = String(text).toLowerCase()
    const normalizedSearchTerm = String(searchTerm).toLowerCase()

    // Find the start index of the search term in the text
    const startIndex = normalizedTitle.indexOf(normalizedSearchTerm)

    // If the search term is not found, return the original text
    if (startIndex === -1) {
        return {
            html: text,
            isMatch: false,
        }
    }

    // Highlight the search term in the text
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