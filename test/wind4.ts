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

test("box-shadow", () => {
	for (const size of ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"]) {
		includes(`shadow-${size}`, `box-shadow: var(--shadow-${size});`)
	}
	includes("shadow-none", "box-shadow: 0 0 #0000;")
	includes("shadow-(--my-shadow)", "box-shadow: var(--my-shadow);")
	includes("shadow-(color:--my-color)", "--tw-shadow-color: var(--my-color);")
	includes("shadow-[1px_2px]", "box-shadow: 1px_2px;")
	includes("shadow-inherit", "--tw-shadow-color: inherit;")
	includes("shadow-current", "--tw-shadow-color: currentColor;")
	includes("shadow-transparent", "--tw-shadow-color: transparent;")
	includes("shadow-red-500", "--tw-shadow-color: var(--color-red-500);")
	includes("shadow-black", "--tw-shadow-color: var(--color-black);")
})

test("inset-shadow", () => {
	for (const size of ["2xs", "xs", "sm"]) {
		includes(
			`inset-shadow-${size}`,
			`box-shadow: var(--inset-shadow-${size});`,
		)
	}
	includes("inset-shadow-none", "box-shadow: inset 0 0 #0000;")
	includes("inset-shadow-(--my-shadow)", "box-shadow: var(--my-shadow);")
	includes("inset-shadow-[1px_2px]", "box-shadow: 1px_2px;")
	includes("inset-shadow-inherit", "--tw-inset-shadow-color: inherit;")
	includes("inset-shadow-current", "--tw-inset-shadow-color: currentColor;")
	includes(
		"inset-shadow-transparent",
		"--tw-inset-shadow-color: transparent;",
	)
	includes(
		"inset-shadow-red-500",
		"--tw-inset-shadow-color: var(--color-red-500);",
	)
})

test("ring", () => {
	includes("ring", "--tw-ring-shadow: 0 0 0 1px;")
	includes("ring-4", "--tw-ring-shadow: 0 0 0 4px;")
	includes("ring-2.5", "--tw-ring-shadow: 0 0 0 2.5px;")
	includes("ring-(--my-ring)", "--tw-ring-shadow: 0 0 0 var(--my-ring);")
	includes("ring-[2px]", "--tw-ring-shadow: 0 0 0 2px;")
	includes("ring-inherit", "--tw-ring-color: inherit;")
	includes("ring-current", "--tw-ring-color: currentColor;")
	includes("ring-transparent", "--tw-ring-color: transparent;")
	includes("ring-red-500", "--tw-ring-color: var(--color-red-500);")
})

test("text-shadow", () => {
	for (const size of ["2xs", "xs", "sm", "md", "lg"]) {
		includes(
			`text-shadow-${size}`,
			`text-shadow: var(--text-shadow-${size});`,
		)
	}
	includes("text-shadow-none", "text-shadow: none;")
	includes("text-shadow-(--my-shadow)", "text-shadow: var(--my-shadow);")
	includes(
		"text-shadow-(color:--my-color)",
		"--tw-text-shadow-color: var(--my-color);",
	)
	includes("text-shadow-[1px_2px]", "text-shadow: 1px_2px;")
	includes("text-shadow-inherit", "--tw-text-shadow-color: inherit;")
	includes("text-shadow-current", "--tw-text-shadow-color: currentColor;")
	includes("text-shadow-transparent", "--tw-text-shadow-color: transparent;")
	includes(
		"text-shadow-red-500",
		"--tw-text-shadow-color: var(--color-red-500);",
	)
})

test("opacity", () => {
	includes("opacity-50", "opacity: 50%;")
	includes("opacity-100", "opacity: 100%;")
	includes("opacity-33.3", "opacity: 33.3%;")
	includes("opacity-(--my-opacity)", "opacity: var(--my-opacity);")
	includes("opacity-[0.5]", "opacity: 0.5;")
})

test("mix-blend-mode", () => {
	const modes = [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity",
		"plus-darker",
		"plus-lighter",
	]
	for (const mode of modes) {
		includes(`mix-blend-${mode}`, `mix-blend-mode: ${mode};`)
	}
})

test("background-blend-mode", () => {
	const modes = [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity",
	]
	for (const mode of modes) {
		includes(`bg-blend-${mode}`, `background-blend-mode: ${mode};`)
	}
})

test("mask-clip", () => {
	includes("mask-clip-border", "mask-clip: border-box;")
	includes("mask-clip-padding", "mask-clip: padding-box;")
	includes("mask-clip-content", "mask-clip: content-box;")
	includes("mask-clip-fill", "mask-clip: fill-box;")
	includes("mask-clip-stroke", "mask-clip: stroke-box;")
	includes("mask-clip-view", "mask-clip: view-box;")
	includes("mask-no-clip", "mask-clip: no-clip;")
})

test("mask-composite", () => {
	includes("mask-add", "mask-composite: add;")
	includes("mask-subtract", "mask-composite: subtract;")
	includes("mask-intersect", "mask-composite: intersect;")
	includes("mask-exclude", "mask-composite: exclude;")
})

test("mask-image base", () => {
	includes("mask-none", "mask-image: none;")
	includes("mask-(--my-mask)", "mask-image: var(--my-mask);")
	includes("mask-[url(pic.png)]", "mask-image: url(pic.png);")
})

test("mask-image linear", () => {
	includes(
		"mask-linear-90",
		"mask-image: linear-gradient(90deg, black var(--tw-mask-linear-from), transparent var(--tw-mask-linear-to));",
	)
	includes(
		"-mask-linear-90",
		"mask-image: linear-gradient(calc(90deg * -1), black var(--tw-mask-linear-from), transparent var(--tw-mask-linear-to));",
	)
	includes(
		"mask-linear-from-50",
		"mask-image: linear-gradient(var(--tw-mask-linear-position), black calc(var(--spacing) * 50), transparent var(--tw-mask-linear-to));",
	)
	includes(
		"mask-linear-from-50%",
		"mask-image: linear-gradient(var(--tw-mask-linear-position), black 50%, transparent var(--tw-mask-linear-to));",
	)
	includes(
		"mask-linear-from-red",
		"mask-image: linear-gradient(var(--tw-mask-linear-position), red var(--tw-mask-linear-from), transparent var(--tw-mask-linear-to));",
	)
	includes(
		"mask-linear-from-(--my-pos)",
		"mask-image: linear-gradient(var(--tw-mask-linear-position), black var(--my-pos), transparent var(--tw-mask-linear-to));",
	)
	includes(
		"mask-linear-to-50",
		"mask-image: linear-gradient(var(--tw-mask-linear-position), black var(--tw-mask-linear-from), transparent calc(var(--spacing) * 50));",
	)
	includes(
		"mask-linear-to-red",
		"mask-image: linear-gradient(var(--tw-mask-linear-position), black var(--tw-mask-linear-from), red var(--tw-mask-linear-to));",
	)
})

test("mask-image directional", () => {
	includes(
		"mask-t-from-50",
		"mask-image: linear-gradient(to top, black calc(var(--spacing) * 50), transparent var(--tw-mask-top-to));",
	)
	includes(
		"mask-r-to-50%",
		"mask-image: linear-gradient(to right, black var(--tw-mask-right-from), transparent 50%);",
	)
	includes(
		"mask-b-from-red",
		"mask-image: linear-gradient(to bottom, red var(--tw-mask-bottom-from), transparent var(--tw-mask-bottom-to));",
	)
	includes(
		"mask-l-to-(--p)",
		"mask-image: linear-gradient(to left, black var(--tw-mask-left-from), transparent var(--p));",
	)
})

test("mask-image y/x", () => {
	includes(
		"mask-y-from-50",
		"mask-image: linear-gradient(to top, black calc(var(--spacing) * 50), transparent var(--tw-mask-top-to)), linear-gradient(to bottom, black calc(var(--spacing) * 50), transparent var(--tw-mask-bottom-to)); mask-composite: intersect;",
	)
	includes(
		"mask-x-to-red",
		"mask-image: linear-gradient(to right, black var(--tw-mask-right-from), red var(--tw-mask-right-to)), linear-gradient(to left, black var(--tw-mask-left-from), red var(--tw-mask-left-to)); mask-composite: intersect;",
	)
})

test("mask-image radial", () => {
	includes(
		"mask-radial-from-50",
		"mask-image: radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black calc(var(--spacing) * 50), transparent var(--tw-mask-radial-to));",
	)
	includes(
		"mask-radial-to-red",
		"radial-gradient(var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), black var(--tw-mask-radial-from), red var(--tw-mask-radial-to))",
	)
	includes("mask-radial-[foo]", "mask-image: radial-gradient(foo);")
	includes("mask-circle", "--tw-mask-radial-shape: circle;")
	includes("mask-ellipse", "--tw-mask-radial-shape: ellipse;")
	includes("mask-radial-closest-side", "--tw-mask-radial-size: closest-side;")
	includes("mask-radial-at-center", "--tw-mask-radial-position: center;")
	includes("mask-radial-at-top-left", "--tw-mask-radial-position: top left;")
})

test("mask-image conic", () => {
	includes(
		"mask-conic-90",
		"mask-image: conic-gradient(from 90deg, black var(--tw-mask-conic-from), transparent var(--tw-mask-conic-to));",
	)
	includes(
		"-mask-conic-90",
		"mask-image: conic-gradient(from calc(90deg * -1), black var(--tw-mask-conic-from), transparent var(--tw-mask-conic-to));",
	)
	includes(
		"mask-conic-from-50",
		"mask-image: conic-gradient(from var(--tw-mask-conic-position), black calc(var(--spacing) * 50), transparent var(--tw-mask-conic-to));",
	)
})

test("mask-mode", () => {
	includes("mask-alpha", "mask-mode: alpha;")
	includes("mask-luminance", "mask-mode: luminance;")
	includes("mask-match", "mask-mode: match-source;")
})

test("mask-origin", () => {
	includes("mask-origin-border", "mask-origin: border-box;")
	includes("mask-origin-padding", "mask-origin: padding-box;")
	includes("mask-origin-content", "mask-origin: content-box;")
	includes("mask-origin-fill", "mask-origin: fill-box;")
	includes("mask-origin-stroke", "mask-origin: stroke-box;")
	includes("mask-origin-view", "mask-origin: view-box;")
})

test("mask-position", () => {
	includes("mask-top-left", "mask-position: top left;")
	includes("mask-top", "mask-position: top;")
	includes("mask-top-right", "mask-position: top right;")
	includes("mask-left", "mask-position: left;")
	includes("mask-center", "mask-position: center;")
	includes("mask-right", "mask-position: right;")
	includes("mask-bottom-left", "mask-position: bottom left;")
	includes("mask-bottom", "mask-position: bottom;")
	includes("mask-bottom-right", "mask-position: bottom right;")
	includes("mask-position-(--pos)", "mask-position: var(--pos);")
	includes("mask-position-[50%]", "mask-position: 50%;")
})

test("mask-repeat", () => {
	includes("mask-repeat", "mask-repeat: repeat;")
	includes("mask-no-repeat", "mask-repeat: no-repeat;")
	includes("mask-repeat-x", "mask-repeat: repeat-x;")
	includes("mask-repeat-y", "mask-repeat: repeat-y;")
	includes("mask-repeat-space", "mask-repeat: space;")
	includes("mask-repeat-round", "mask-repeat: round;")
})

test("mask-size", () => {
	includes("mask-auto", "mask-size: auto;")
	includes("mask-cover", "mask-size: cover;")
	includes("mask-contain", "mask-size: contain;")
	includes("mask-size-(--size)", "mask-size: var(--size);")
	includes("mask-size-[100%]", "mask-size: 100%;")
})

test("mask-type", () => {
	includes("mask-type-alpha", "mask-type: alpha;")
	includes("mask-type-luminance", "mask-type: luminance;")
})
