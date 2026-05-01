import {
	type Config,
	type ConfigOptions,
	defineConfig,
	type Rule,
	type State,
} from "./config.ts"
import { escapeClassname } from "./css.ts"
import { unreachable } from "./utils.ts"
import WIND4 from "./wind4.ts"

function rawMatcher(patterns: Rule[] | State[]): string {
	return patterns
		.map(([r], i) => {
			const s = r instanceof RegExp ? r.source : r
			return `(?<n${i}>${s})`
		})
		.join("|")
}

function getIndex(match: RegExpMatchArray) {
	if (!match.groups) unreachable()

	const groupName = Object.entries(match.groups).find(
		([_, value]) => value !== undefined,
	)?.[0]

	if (!groupName) unreachable()

	return parseInt(groupName.substring(1), 10)
}

export class Generator {
	config: Config
	#classMatcher: RegExp
	#stateMatcher: RegExp
	#cache: Map<string, string>

	constructor(config: Config) {
		this.config = config

		this.#classMatcher = new RegExp(`^(${rawMatcher(config.rules)})$`)
		this.#stateMatcher = new RegExp(`^(${rawMatcher(config.states)}):`)

		this.#cache = new Map()
	}

	static from_options(optons: ConfigOptions): Generator {
		return new Generator(defineConfig(optons))
	}

	consume(content: string): void {
		for (const chunk of content.split(/[\s'"`]+/)) {
			this.#process(chunk)
		}
	}

	#process(chunk: string): void {
		const original = chunk

		if (this.#cache.has(chunk)) return

		const constructors = []

		// cut off the state prefixes
		while (true) {
			const match = chunk.match(this.#stateMatcher)
			if (!match) break

			const stateIndex = getIndex(match)
			const state = this.config.states[stateIndex]
			if (!state) unreachable()

			const [stateMatcher, stateConstructor] = state

			const stateMatch = chunk.match(stateMatcher)
			if (!stateMatch) unreachable()

			constructors.push((content: string) =>
				stateConstructor(content, stateMatch),
			)

			chunk = chunk.slice(match[0].length)
		}

		const match = chunk.match(this.#classMatcher)
		if (!match) return

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

		this.#cache.set(
			original,
			constructors.reduce((acc, fn) => fn(acc), result),
		)
	}

	utilities(): string {
		let out = "@layer utilities {\n"

		for (const [name, value] of this.#cache) {
			out += `  .${escapeClassname(name)} { ${value} }\n`
		}

		out += "}"
		return out
	}

	theme(): string {
		let out = "@layer theme {\n  :root, :host {\n"

		// TODO: only select variables which are being used
		for (const [variable, value] of Object.entries(this.config.theme)) {
			out += `    ${variable}: ${value};\n`
		}

		out += "  }\n}"
		return out
	}
}

const generator = Generator.from_options({
	presets: [WIND4],
})

generator.consume("nth-[3n+1]:p-4")
console.log(generator.theme())
console.log(generator.utilities())
