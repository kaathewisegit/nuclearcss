export function escapeClassname(name: string): string {
	return name.replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, "\\$&")
}
