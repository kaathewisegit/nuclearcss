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

test("border-spacing", () => {
	includes("border-collapse", "border-collapse: collapse;")
	includes("border-separate", "border-collapse: separate;")

	includes("border-spacing-2", "border-spacing: calc(var(--spacing) * 2);")
	includes(
		"border-spacing-(--my-spacing)",
		"border-spacing: var(--my-spacing);",
	)
	includes("border-spacing-[8px]", "border-spacing: 8px;")

	includes(
		"border-spacing-x-2",
		"--tw-border-spacing-x: calc(var(--spacing) * 2);",
		"border-spacing: var(--tw-border-spacing-x) var(--tw-border-spacing-y);",
	)
	includes(
		"border-spacing-x-(--my-spacing)",
		"--tw-border-spacing-x: var(--my-spacing);",
		"border-spacing: var(--tw-border-spacing-x) var(--tw-border-spacing-y);",
	)
	includes(
		"border-spacing-x-[8px]",
		"--tw-border-spacing-x: 8px;",
		"border-spacing: var(--tw-border-spacing-x) var(--tw-border-spacing-y);",
	)

	includes(
		"border-spacing-y-3",
		"--tw-border-spacing-y: calc(var(--spacing) * 3);",
		"border-spacing: var(--tw-border-spacing-x) var(--tw-border-spacing-y);",
	)
	includes(
		"border-spacing-y-(--my-spacing)",
		"--tw-border-spacing-y: var(--my-spacing);",
		"border-spacing: var(--tw-border-spacing-x) var(--tw-border-spacing-y);",
	)
	includes(
		"border-spacing-y-[12px]",
		"--tw-border-spacing-y: 12px;",
		"border-spacing: var(--tw-border-spacing-x) var(--tw-border-spacing-y);",
	)
})

test("accent-color", () => {
	includes("accent-inherit", "accent-color: inherit;")
	includes("accent-current", "accent-color: currentColor;")
	includes("accent-transparent", "accent-color: transparent;")

	includes("accent-black", "accent-color: var(--color-black);")
	includes("accent-white", "accent-color: var(--color-white);")

	for (const shade of [50, 100, 500, 900, 950]) {
		includes(
			`accent-red-${shade}`,
			`accent-color: var(--color-red-${shade});`,
		)
	}
	includes("accent-blue-500", "accent-color: var(--color-blue-500);")

	includes("accent-(--my-accent)", "accent-color: var(--my-accent);")
	includes("accent-(--custom-prop)", "accent-color: var(--custom-prop);")

	includes("accent-[#00ff00]", "accent-color: #00ff00;")
	includes("accent-[oklch(50%_0.2_20)]", "accent-color: oklch(50%_0.2_20);")
})

test("appearance", () => {
	includes("appearance-none", "appearance: none;")
	includes("appearance-auto", "appearance: auto;")
})

test("caret-color", () => {
	includes("caret-inherit", "caret-color: inherit;")
	includes("caret-current", "caret-color: currentColor;")
	includes("caret-transparent", "caret-color: transparent;")

	includes("caret-black", "caret-color: var(--color-black);")
	includes("caret-white", "caret-color: var(--color-white);")

	for (const shade of [50, 100, 500, 900, 950]) {
		includes(
			`caret-red-${shade}`,
			`caret-color: var(--color-red-${shade});`,
		)
	}
	includes("caret-blue-500", "caret-color: var(--color-blue-500);")

	includes("caret-(--my-caret)", "caret-color: var(--my-caret);")
	includes("caret-(--custom-prop)", "caret-color: var(--custom-prop);")

	includes("caret-[#00ff00]", "caret-color: #00ff00;")
	includes("caret-[oklch(50%_0.2_20)]", "caret-color: oklch(50%_0.2_20);")
})

test("color-scheme", () => {
	includes("scheme-normal", "color-scheme: normal;")
	includes("scheme-dark", "color-scheme: dark;")
	includes("scheme-light", "color-scheme: light;")
	includes("scheme-light-dark", "color-scheme: light dark;")
	includes("scheme-only-dark", "color-scheme: only dark;")
	includes("scheme-only-light", "color-scheme: only light;")
})

test("cursor", () => {
	includes("cursor-auto", "cursor: auto;")
	includes("cursor-default", "cursor: default;")
	includes("cursor-pointer", "cursor: pointer;")
	includes("cursor-text", "cursor: text;")
	includes("cursor-none", "cursor: none;")
	includes("cursor-not-allowed", "cursor: not-allowed;")
	includes("cursor-context-menu", "cursor: context-menu;")
	includes("cursor-vertical-text", "cursor: vertical-text;")
	includes("cursor-no-drop", "cursor: no-drop;")
	includes("cursor-all-scroll", "cursor: all-scroll;")
	includes("cursor-col-resize", "cursor: col-resize;")
	includes("cursor-row-resize", "cursor: row-resize;")
	includes("cursor-n-resize", "cursor: n-resize;")
	includes("cursor-nw-resize", "cursor: nw-resize;")
	includes("cursor-nesw-resize", "cursor: nesw-resize;")
	includes("cursor-nwse-resize", "cursor: nwse-resize;")
	includes("cursor-zoom-in", "cursor: zoom-in;")
	includes("cursor-zoom-out", "cursor: zoom-out;")
	includes("cursor-grab", "cursor: grab;")
	includes("cursor-grabbing", "cursor: grabbing;")

	includes("cursor-(--my-cursor)", "cursor: var(--my-cursor);")
	includes("cursor-[url(hand.cur),pointer]", "cursor: url(hand.cur),pointer;")
})

test("field-sizing", () => {
	includes("field-sizing-fixed", "field-sizing: fixed;")
	includes("field-sizing-content", "field-sizing: content;")
})

test("pointer-events", () => {
	includes("pointer-events-auto", "pointer-events: auto;")
	includes("pointer-events-none", "pointer-events: none;")
})

test("resize", () => {
	includes("resize-none", "resize: none;")
	includes("resize", "resize: both;")
	includes("resize-y", "resize: vertical;")
	includes("resize-x", "resize: horizontal;")
})

test("scroll-behavior", () => {
	includes("scroll-auto", "scroll-behavior: auto;")
	includes("scroll-smooth", "scroll-behavior: smooth;")
})

test("scrollbar-color", () => {
	const emit =
		"scrollbar-color: var(--tw-scrollbar-thumb) var(--tw-scrollbar-track);"

	includes("scrollbar-thumb-inherit", "--tw-scrollbar-thumb: inherit;", emit)
	includes(
		"scrollbar-thumb-current",
		"--tw-scrollbar-thumb: currentColor;",
		emit,
	)
	includes(
		"scrollbar-thumb-transparent",
		"--tw-scrollbar-thumb: transparent;",
		emit,
	)
	includes(
		"scrollbar-thumb-black",
		"--tw-scrollbar-thumb: var(--color-black);",
		emit,
	)
	for (const shade of [50, 100, 500, 900, 950]) {
		includes(
			`scrollbar-thumb-red-${shade}`,
			`--tw-scrollbar-thumb: var(--color-red-${shade});`,
			emit,
		)
	}
	includes(
		"scrollbar-thumb-(--my-thumb)",
		"--tw-scrollbar-thumb: var(--my-thumb);",
		emit,
	)
	includes(
		"scrollbar-thumb-[#ff0000]",
		"--tw-scrollbar-thumb: #ff0000;",
		emit,
	)
	includes(
		"scrollbar-track-(--my-track)",
		"--tw-scrollbar-track: var(--my-track);",
		emit,
	)
	includes(
		"scrollbar-track-[#00ff00]",
		"--tw-scrollbar-track: #00ff00;",
		emit,
	)
})

test("scrollbar-width", () => {
	includes("scrollbar-auto", "scrollbar-width: auto;")
	includes("scrollbar-thin", "scrollbar-width: thin;")
	includes("scrollbar-none", "scrollbar-width: none;")
})

test("scrollbar-gutter", () => {
	includes("scrollbar-gutter-auto", "scrollbar-gutter: auto;")
	includes("scrollbar-gutter-stable", "scrollbar-gutter: stable;")
	includes("scrollbar-gutter-both", "scrollbar-gutter: stable both-edges;")
})

test("scroll-margin", () => {
	const configs = [
		["scroll-m", "scroll-margin"],
		["scroll-mx", "scroll-margin-inline"],
		["scroll-my", "scroll-margin-block"],
		["scroll-ms", "scroll-margin-inline-start"],
		["scroll-me", "scroll-margin-inline-end"],
		["scroll-mbs", "scroll-margin-block-start"],
		["scroll-mbe", "scroll-margin-block-end"],
		["scroll-mt", "scroll-margin-top"],
		["scroll-mr", "scroll-margin-right"],
		["scroll-mb", "scroll-margin-bottom"],
		["scroll-ml", "scroll-margin-left"],
	]

	for (const [abbr, property] of configs) {
		includes(`${abbr}-4`, `${property}: calc(var(--spacing) * 4);`)
		includes(`-${abbr}-4`, `${property}: calc(var(--spacing) * -4);`)
		includes(`${abbr}-(--custom)`, `${property}: var(--custom);`)
		includes(`${abbr}-[10px]`, `${property}: 10px;`)
	}
})

test("scroll-padding", () => {
	const configs = [
		["scroll-p", "scroll-padding"],
		["scroll-px", "scroll-padding-inline"],
		["scroll-py", "scroll-padding-block"],
		["scroll-ps", "scroll-padding-inline-start"],
		["scroll-pe", "scroll-padding-inline-end"],
		["scroll-pbs", "scroll-padding-block-start"],
		["scroll-pbe", "scroll-padding-block-end"],
		["scroll-pt", "scroll-padding-top"],
		["scroll-pr", "scroll-padding-right"],
		["scroll-pb", "scroll-padding-bottom"],
		["scroll-pl", "scroll-padding-left"],
	]

	for (const [abbr, property] of configs) {
		includes(`${abbr}-4`, `${property}: calc(var(--spacing) * 4);`)
		includes(`-${abbr}-4`, `${property}: calc(var(--spacing) * -4);`)
		includes(`${abbr}-(--custom)`, `${property}: var(--custom);`)
		includes(`${abbr}-[10px]`, `${property}: 10px;`)
	}
})

test("scroll-snap-align", () => {
	includes("snap-start", "scroll-snap-align: start;")
	includes("snap-end", "scroll-snap-align: end;")
	includes("snap-center", "scroll-snap-align: center;")
	includes("snap-align-none", "scroll-snap-align: none;")
})

test("scroll-snap-stop", () => {
	includes("snap-normal", "scroll-snap-stop: normal;")
	includes("snap-always", "scroll-snap-stop: always;")
})

test("scroll-snap-type", () => {
	includes("snap-none", "scroll-snap-type: none;")
	includes("snap-x", "scroll-snap-type: x var(--tw-scroll-snap-strictness);")
	includes("snap-y", "scroll-snap-type: y var(--tw-scroll-snap-strictness);")
	includes(
		"snap-both",
		"scroll-snap-type: both var(--tw-scroll-snap-strictness);",
	)
	includes("snap-mandatory", "--tw-scroll-snap-strictness: mandatory;")
	includes("snap-proximity", "--tw-scroll-snap-strictness: proximity;")
})

test("touch-action", () => {
	includes("touch-auto", "touch-action: auto;")
	includes("touch-none", "touch-action: none;")
	includes("touch-pan-x", "touch-action: pan-x;")
	includes("touch-pan-left", "touch-action: pan-left;")
	includes("touch-pan-right", "touch-action: pan-right;")
	includes("touch-pan-y", "touch-action: pan-y;")
	includes("touch-pan-up", "touch-action: pan-up;")
	includes("touch-pan-down", "touch-action: pan-down;")
	includes("touch-pinch-zoom", "touch-action: pinch-zoom;")
	includes("touch-manipulation", "touch-action: manipulation;")
})

test("user-select", () => {
	includes("select-none", "user-select: none;")
	includes("select-text", "user-select: text;")
	includes("select-all", "user-select: all;")
	includes("select-auto", "user-select: auto;")
})

test("will-change", () => {
	includes("will-change-auto", "will-change: auto;")
	includes("will-change-scroll", "will-change: scroll-position;")
	includes("will-change-contents", "will-change: contents;")
	includes("will-change-transform", "will-change: transform;")
	includes("will-change-(--my-var)", "will-change: var(--my-var);")
	includes(
		"will-change-[transform,opacity]",
		"will-change: transform,opacity;",
	)
})

test("inset", () => {
	const configs = [
		["inset", "inset"],
		["inset-x", "inset-inline"],
		["inset-y", "inset-block"],
		["inset-s", "inset-inline-start"],
		["inset-e", "inset-inline-end"],
		["inset-bs", "inset-block-start"],
		["inset-be", "inset-block-end"],
	]

	for (const [abbr, property] of configs) {
		includes(`${abbr}-4`, `${property}: calc(var(--spacing) * 4);`)
		includes(`-${abbr}-4`, `${property}: calc(var(--spacing) * -4);`)
		includes(`${abbr}-1/2`, `${property}: calc(1/2 * 100%);`)
		includes(`-${abbr}-1/2`, `${property}: calc(1/2 * -100%);`)
		includes(`${abbr}-px`, `${property}: 1px;`)
		includes(`-${abbr}-px`, `${property}: -1px;`)
		includes(`${abbr}-full`, `${property}: 100%;`)
		includes(`-${abbr}-full`, `${property}: -100%;`)
		includes(`${abbr}-auto`, `${property}: auto;`)
		includes(`${abbr}-(--custom)`, `${property}: var(--custom);`)
		includes(`${abbr}-[10px]`, `${property}: 10px;`)
	}
})

test("inline-size", () => {
	const configs = [
		["inline", "inline-size", "auto"],
		["min-inline", "min-inline-size", "auto"],
		["max-inline", "max-inline-size", "none"],
	]

	for (const [abbr, property, initial] of configs) {
		includes(`${abbr}-4`, `${property}: calc(var(--spacing) * 4);`)
		includes(`${abbr}-1/2`, `${property}: calc(1/2 * 100%);`)
		includes(`${abbr}-3xs`, `${property}: var(--container-3xs);`)
		includes(`${abbr}-7xl`, `${property}: var(--container-7xl);`)
		includes(`${abbr}-${initial}`, `${property}: ${initial};`)
		includes(`${abbr}-px`, `${property}: 1px;`)
		includes(`${abbr}-full`, `${property}: 100%;`)
		includes(`${abbr}-screen`, `${property}: 100vw;`)
		includes(`${abbr}-dvh`, `${property}: 100dvh;`)
		includes(`${abbr}-svw`, `${property}: 100svw;`)
		includes(`${abbr}-min`, `${property}: min-content;`)
		includes(`${abbr}-max`, `${property}: max-content;`)
		includes(`${abbr}-fit`, `${property}: fit-content;`)
		includes(`${abbr}-(--custom)`, `${property}: var(--custom);`)
		includes(`${abbr}-[10px]`, `${property}: 10px;`)
	}
})
