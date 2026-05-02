export type Rule = [RegExp | string, ClassConstructor]
export type ClassConstructor = string | ((matches: RegExpMatchArray) => string)

export type State = [RegExp | string, StateConstructor]
export type StateConstructor = (
	css: string,
	matches: RegExpMatchArray,
) => string

export type ConfigOptions = {
	rules?: Rule[]
	states?: State[]
	theme?: Record<string, string>
	base?: string
	presets?: ConfigOptions[]
}

export type Config = {
	rules: Rule[]
	states: State[]
	theme: Record<string, string>
	base: string
}

export function defineConfig(options: ConfigOptions): Config {
	const rules: Rule[] = []
	const states: State[] = []
	let theme = {}
	let base = ""

	function addPreset(preset: ConfigOptions): void {
		if (preset.rules) {
			rules.push(...preset.rules)
		}
		if (preset.states) {
			states.push(...preset.states)
		}
		if (preset.theme) {
			theme = { ...preset.theme, ...theme }
		}
		if (preset.base) {
			base = preset.base + base
		}
		if (preset.presets) {
			preset.presets.map(addPreset)
		}
	}

	addPreset(options)

	return {
		rules,
		states,
		theme,
		base,
	}
}
