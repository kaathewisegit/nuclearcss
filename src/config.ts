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
	presets?: ConfigOptions[]
}

export type Config = {
	rules: Rule[]
	states: State[]
}

export function defineConfig(options: ConfigOptions): Config {
	const rules: Rule[] = []
	const states: State[] = []

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
	}

	addPreset(options)

	return {
		rules,
		states,
	}
}
