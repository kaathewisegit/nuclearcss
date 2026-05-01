export type Rule = [RegExp | string, ClassConstructor]
export type ClassConstructor = string | ((matches: RegExpMatchArray) => string)

export type Config = {
	rules: Rule[]
}
