export function unreachable(msg?: string): never {
	const message = msg ? `unreachable: ${msg}` : "unreachable"
	throw Error(message)
}
