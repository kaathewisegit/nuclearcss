import assert from "node:assert"
import test from "node:test"

import { Generator } from "../src/index.ts"
import WIND4 from "../src/wind4.ts"

function generate(classes: string): string {
	const generator = Generator.from_options(WIND4)
	generator.addContent(classes)
	return generator.generate()
}

function includes(classes: string, ...includes: string[]): void {
	const css = generate(classes)

	for (const include of includes) {
		assert(
			css.includes(include),
			`Expected "${css}" to include "${include}"`,
		)
	}
}

test("aspect-ratio", () => {
	includes("aspect-square", "aspect-ratio: 1 / 1;")
	includes("aspect-video", "aspect-ratio: var(--aspect-video);")
	includes("aspect-auto", "aspect-ratio: auto;")

	includes("aspect-1/1", "aspect-ratio: 1/1;")
	includes("aspect-16/9", "aspect-ratio: 16/9;")
	includes("aspect-4/3", "aspect-ratio: 4/3;")
	includes("aspect-21/9", "aspect-ratio: 21/9;")

	includes("aspect-(--custom-ratio)", "aspect-ratio: var(--custom-ratio);")
	includes("aspect-(--my-var)", "aspect-ratio: var(--my-var);")

	includes("aspect-[2]", "aspect-ratio: 2;")
	includes("aspect-[0.5]", "aspect-ratio: 0.5;")
	includes("aspect-[1280/720]", "aspect-ratio: 1280/720;")
	includes("aspect-[var(--something)]", "aspect-ratio: var(--something);")
})

test("columns", () => {
	for (const num of [...Array(101).keys()]) {
		includes(`columns-${num}`, `columns: ${num};`)
	}

	const sizes = [
		"3xs",
		"2xs",
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
		"2xl",
		"3xl",
		"4xl",
		"5xl",
		"6xl",
		"7xl",
	]
	for (const size of sizes) {
		includes(`columns-${size}`, `columns: var(--container-${size});`)
	}

	includes("columns-auto", "columns: auto;")

	includes("columns-(--my-cols)", "columns: var(--my-cols);")
	includes("columns-(--custom-width)", "columns: var(--custom-width);")

	includes("columns-[10rem]", "columns: 10rem;")
	includes("columns-[200px]", "columns: 200px;")
	includes("columns-[30%]", "columns: 30%;")
})

test("top/bottom/right/left", () => {
	for (const side of ["top", "bottom", "left", "right"]) {
		includes(`${side}-1`, `${side}: calc(var(--spacing) * 1);`)
		includes(`-${side}-1`, `${side}: calc(var(--spacing) * -1);`)

		includes(`${side}-0.5`, `${side}: calc(var(--spacing) * 0.5);`)
		includes(`-${side}-0.5`, `${side}: calc(var(--spacing) * -0.5);`)

		includes(`${side}-px`, `${side}: 1px;`)
		includes(`-${side}-px`, `${side}: -1px;`)

		includes(`${side}-full`, `${side}: 100%;`)
		includes(`-${side}-full`, `${side}: -100%;`)

		includes(`${side}-auto`, `${side}: auto;`)

		includes(`${side}-(--custom-var)`, `${side}: var(--custom-var);`)
		includes(`${side}-[99%]`, `${side}: 99%;`)
	}
})

test("padding", () => {
	const configs = [
		["p", "padding"],
		["px", "padding-inline"],
		["py", "padding-block"],
		["ps", "padding-inline-start"],
		["pe", "padding-inline-end"],
		["pbs", "padding-block-start"],
		["pbe", "padding-block-end"],
		["pt", "padding-top"],
		["pr", "padding-right"],
		["pb", "padding-bottom"],
		["pl", "padding-left"],
	]

	for (const [prefix, property] of configs) {
		includes(`${prefix}-4`, `${property}: calc(var(--spacing) * 4);`)
		includes(`${prefix}-0.5`, `${property}: calc(var(--spacing) * 0.5);`)

		includes(`${prefix}-px`, `${property}: 1px;`)

		includes(`${prefix}-(--my-spacing)`, `${property}: var(--my-spacing);`)

		includes(`${prefix}-[15px]`, `${property}: 15px;`)
		includes(`${prefix}-[2rem]`, `${property}: 2rem;`)
	}
})

test("margin", () => {
	const configs = [
		["m", "margin"],
		["mx", "margin-inline"],
		["my", "margin-block"],
		["ms", "margin-inline-start"],
		["me", "margin-inline-end"],
		["mbs", "margin-block-start"],
		["mbe", "margin-block-end"],
		["mt", "margin-top"],
		["mb", "margin-bottom"],
		["ml", "margin-left"],
		["mr", "margin-right"],
	]

	for (const [abbr, property] of configs) {
		includes(`${abbr}-1`, `${property}: calc(var(--spacing) * 1);`)
		includes(`-${abbr}-1`, `${property}: calc(var(--spacing) * -1);`)
		includes(`${abbr}-auto`, `${property}: auto;`)
		includes(`${abbr}-px`, `${property}: 1px;`)
		includes(`-${abbr}-px`, `${property}: -1px;`)
		includes(`${abbr}-(--custom)`, `${property}: var(--custom);`)
		includes(`${abbr}-[10px]`, `${property}: 10px;`)
	}
})

test("space", () => {
	const configs = [
		["x", "inline"],
		["y", "block"],
	]

	for (const [axis, property] of configs) {
		includes(
			`space-${axis}-4`,
			`& > :not(:last-child) { --tw-space-${axis}-reverse: 0; margin-${property}-start: calc(calc(var(--spacing) * 4) * var(--tw-space-${axis}-reverse)); margin-${property}-end: calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-${axis}-reverse))); }`,
		)
		includes(
			`-space-${axis}-4`,
			`& > :not(:last-child) { --tw-space-${axis}-reverse: 0; margin-${property}-start: calc(calc(var(--spacing) * -4) * var(--tw-space-${axis}-reverse)); margin-${property}-end: calc(calc(var(--spacing) * -4) * calc(1 - var(--tw-space-${axis}-reverse))); }`,
		)

		includes(
			`space-${axis}-px`,
			`& > :not(:last-child) { --tw-space-${axis}-reverse: 0; margin-${property}-start: calc(1px * var(--tw-space-${axis}-reverse)); margin-${property}-end: calc(1px * calc(1 - var(--tw-space-${axis}-reverse))); }`,
		)
		includes(
			`-space-${axis}-px`,
			`& > :not(:last-child) { --tw-space-${axis}-reverse: 0; margin-${property}-start: calc(-1px * var(--tw-space-${axis}-reverse)); margin-${property}-end: calc(-1px * calc(1 - var(--tw-space-${axis}-reverse))); }`,
		)

		includes(
			`space-${axis}-(--my-space)`,
			`& > :not(:last-child) { --tw-space-${axis}-reverse: 0; margin-${property}-start: calc(var(--my-space) * var(--tw-space-${axis}-reverse)); margin-${property}-end: calc(var(--my-space) * calc(1 - var(--tw-space-${axis}-reverse))); }`,
		)

		includes(
			`space-${axis}-[15px]`,
			`& > :not(:last-child) { --tw-space-${axis}-reverse: 0; margin-${property}-start: calc(15px * var(--tw-space-${axis}-reverse)); margin-${property}-end: calc(15px * calc(1 - var(--tw-space-${axis}-reverse))); }`,
		)

		includes(
			`space-${axis}-reverse`,
			`& > :not(:last-child) { --tw-space-${axis}-reverse: 1; }`,
		)
	}
})
