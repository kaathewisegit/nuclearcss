import type { Config } from "./config.ts"
import { escapeClassname } from "./css.ts"
import WIND4 from "./wind4.ts"

export class Generator {
	config: Config
	#matcher: RegExp
	#cache: Map<string, string>

	constructor(config: Config) {
		this.config = config

		const rawMatcher = this.config.rules
			.map(([r, _], i) => {
				const s = r instanceof RegExp ? r.source : r
				return `(?<n${i}>${s})`
			})
			.join("|")
		this.#matcher = new RegExp(`^(${rawMatcher})$`)

		this.#cache = new Map()
	}

	consume(content: string): void {
		for (const chunk of content.split(/[\s'"`]+/)) {
			if (this.#cache.has(chunk)) continue

			const match = chunk.match(this.#matcher)
			if (!match) continue

			const group = getIndex(match)
			const rule = this.config.rules[group]
			if (!rule) unreachable()
			const [ruleMatcher, ruleConstructor] = rule

			const ruleMatch = chunk.match(ruleMatcher)
			if (!ruleMatch) unreachable()

			const result =
				typeof ruleConstructor === "string"
					? ruleConstructor
					: ruleConstructor(ruleMatch)

			this.#cache.set(chunk, result)
		}
	}

	utilities(): string {
		let out = ""

		for (const [name, value] of this.#cache) {
			out += `${escapeClassname(name)} { ${value} }\n`
		}

		return out
	}
}

function unreachable(): never {
	throw Error("unreachable")
}

function getIndex(match: RegExpMatchArray) {
	if (!match.groups) unreachable()

	const groupName = Object.entries(match.groups).find(
		([_, value]) => value !== undefined,
	)?.[0]

	if (!groupName) unreachable()

	return parseInt(groupName.substring(1), 10)
}

const generator = new Generator({
	rules: [...WIND4],
})

generator.consume("-col-start-1 justify-start")
console.log(generator.utilities())
