export function removeDuplicateSpaces(str) {
    return str.replace(/\s+/g, ' ').trim();
}

export function removeFourSpaces(str) {
    return str.replace(/\s{4,}/g, '    ').trim();
}