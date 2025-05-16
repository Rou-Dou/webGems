export function decodeReadableStream(stream) {
    return stream.body.getReader().read()
}

export function decodeuint8String(string) {
    return new TextDecoder().decode(string)
}