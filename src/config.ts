export type Rule = [RegExp | string, ClassConstructor]
export type ClassConstructor = string | ((matches: RegExpMatchArray) => string)

export type State = [RegExp | string, StateConstructor]
export type StateConstructor = (
	content: string,
	matches: RegExpMatchArray,
) => string

export type ConfigOptions = {
	rules?: Rule[]
	states?: State[]
	theme?: Record<string, string>
	presets?: ConfigOptions[]
}

export type Config = {
	rules: Rule[]
	states: State[]
	theme: Record<string, string>
}

export function defineConfig(options: ConfigOptions): Config {
	const rules: Rule[] = []
	const states: State[] = []
	let theme = {}

	function addPreset(preset: ConfigOptions): void {
		if (preset.rules) {
			rules.push(...preset.rules)
		}
		if (preset.states) {
			states.push(...preset.states)
		}
		if (preset.presets) {
			preset.presets.map(addPreset)
		}
		if (preset.theme) {
			theme = { ...preset.theme, ...theme }
		}
	}

	addPreset(options)

	return {
		rules,
		states,
		theme,
	}
}
