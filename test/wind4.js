import assert from "node:assert"
import test from "node:test"

import { Generator } from "../dist/index.js"
import WIND4 from "../dist/wind4.js"

function generate(classes) {
	const generator = Generator.from_options(WIND4)
	generator.addContent(classes)
	return generator.generate()
}

function includes(classes, ...includes) {
	const css = generate(classes)

	for (const include of includes) {
		assert(css.includes(include))
	}
}

test("bottom", () => {
	includes("bottom-1", "bottom: calc(var(--spacing) * 1);")
	includes("-bottom-1", "bottom: calc(var(--spacing) * -1);")

	includes("bottom-0.5", "bottom: calc(var(--spacing) * 0.5);")
	includes("-bottom-0.5", "bottom: calc(var(--spacing) * -0.5);")

	includes("bottom-px", "bottom: 1px;")
	includes("-bottom-px", "bottom: -1px;")

	includes("bottom-full", "bottom: 100%;")
	includes("-bottom-full", "bottom: -100%;")

	includes("bottom-auto", "bottom: auto;")

	includes("bottom-(--custom-var)", "bottom: var(--custom-var);")
	includes("bottom-[99%]", "bottom: 99%;")
})
