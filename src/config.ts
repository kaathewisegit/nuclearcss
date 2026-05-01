export type Rule = [RegExp | string, ClassConstructor]
export type ClassConstructor = string | ((matches: RegExpMatchArray) => string)

export type State = [RegExp | string, StateConstructor]
export type StateConstructor = (
	content: string,
	matches: RegExpMatchArray,
) => string

export type Config = {
	rules: Rule[]
	states: State[]
}
