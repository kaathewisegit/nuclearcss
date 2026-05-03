import type { ConfigOptions, Rule, State } from "./config.ts"
import { unreachable } from "./utils.ts"

function directionRules(): Rule[] {
	return ["top", "bottom", "right", "left"].flatMap(dir => [
		[
			`${dir}-([\\d.]+)`,
			([, num]) => `${dir}: calc(var(--spacing) * ${num});`,
		],
		[
			`-${dir}-([\\d.]+)`,
			([, num]) => `${dir}: calc(var(--spacing) * -${num});`,
		],
		[`${dir}-px`, `${dir}: 1px;`],
		[`-${dir}-px`, `${dir}: -1px;`],
		[`${dir}-full`, `${dir}: 100%;`],
		[`-${dir}-full`, `${dir}: -100%;`],
		[`${dir}-auto`, `${dir}: auto;`],
		[RegExp(`${dir}-\\((.+)\\)`), ([, prop]) => `${dir}: var(${prop});`],
		[RegExp(`${dir}-\\[(.+)\\]`), ([, value]) => `${dir}: ${value};`],
	])
}

export const LAYOUT: Rule[] = [
	// aspect-ratio
	[/aspect-(\d+\/\d+)/, ([, ratio]) => `aspect-ratio: ${ratio};`],
	["aspect-square", "aspect-ratio: 1 / 1;"],
	["aspect-video", "aspect-ratio: var(--aspect-video);"],
	["aspect-auto", "aspect-ratio: auto;"],
	[/aspect-\((.+)\)/, ([, prop]) => `aspect-ratio: var(${prop});`],
	[/aspect-\[(.+)\]/, ([, value]) => `aspect-ratio: ${value};`],

	// columns
	[/columns-(\d+)/, ([, num]) => `columns: ${num};`],
	["columns-3xs", "columns: var(--container-3xs);"],
	["columns-2xs", "columns: var(--container-2xs);"],
	["columns-xs", "columns: var(--container-xs);"],
	["columns-sm", "columns: var(--container-sm);"],
	["columns-md", "columns: var(--container-md);"],
	["columns-lg", "columns: var(--container-lg);"],
	["columns-xl", "columns: var(--container-xl);"],
	["columns-2xl", "columns: var(--container-2xl);"],
	["columns-3xl", "columns: var(--container-3xl);"],
	["columns-4xl", "columns: var(--container-4xl);"],
	["columns-5xl", "columns: var(--container-5xl);"],
	["columns-6xl", "columns: var(--container-6xl);"],
	["columns-7xl", "columns: var(--container-7xl);"],
	["columns-auto", "columns: auto;"],
	[/columns-\((.+)\)/, ([, prop]) => `columns: var(${prop});`],
	[/columns-\[(.+)\]/, ([, value]) => `columns: ${value};`],

	// break-after
	["break-after-auto", "break-after: auto;"],
	["break-after-avoid", "break-after: avoid;"],
	["break-after-all", "break-after: all;"],
	["break-after-avoid-page", "break-after: avoid-page;"],
	["break-after-page", "break-after: page;"],
	["break-after-left", "break-after: left;"],
	["break-after-right", "break-after: right;"],
	["break-after-column", "break-after: column;"],

	// break-before
	["break-before-auto", "break-before: auto;"],
	["break-before-avoid", "break-before: avoid;"],
	["break-before-all", "break-before: all;"],
	["break-before-avoid-page", "break-before: avoid-page;"],
	["break-before-page", "break-before: page;"],
	["break-before-left", "break-before: left;"],
	["break-before-right", "break-before: right;"],
	["break-before-column", "break-before: column;"],

	// break-inside
	["break-inside-auto", "break-inside: auto;"],
	["break-inside-avoid", "break-inside: avoid;"],
	["break-inside-avoid-page", "break-inside: avoid-page;"],
	["break-inside-avoid-column", "break-inside: avoid-column;"],

	// box-decoration-break
	["box-decoration-clone", "box-decoration-break: clone;"],
	["box-decoration-slice", "box-decoration-break: slice;"],

	// box-sizing
	["box-border", "box-sizing: border-box;"],
	["box-content", "box-sizing: content-box;"],

	// display
	["inline", "display: inline;"],
	["block", "display: block;"],
	["inline-block", "display: inline-block;"],
	["flow-root", "display: flow-root;"],
	["flex", "display: flex;"],
	["inline-flex", "display: inline-flex;"],
	["grid", "display: grid;"],
	["inline-grid", "display: inline-grid;"],
	["contents", "display: contents;"],
	["table", "display: table;"],
	["inline-table", "display: inline-table;"],
	["table-caption", "display: table-caption;"],
	["table-cell", "display: table-cell;"],
	["table-column", "display: table-column;"],
	["table-column-group", "display: table-column-group;"],
	["table-footer-group", "display: table-footer-group;"],
	["table-header-group", "display: table-header-group;"],
	["table-row-group", "display: table-row-group;"],
	["table-row", "display: table-row;"],
	["list-item", "display: list-item;"],
	["hidden", "display: none;"],

	// float
	["float-right", "float: right;"],
	["float-left", "float: left;"],
	["float-start", "float: inline-start;"],
	["float-end", "float: inline-end;"],
	["float-none", "float: none;"],

	// clear
	["clear-left", "clear: left;"],
	["clear-right", "clear: right;"],
	["clear-both", "clear: both;"],
	["clear-start", "clear: inline-start;"],
	["clear-end", "clear: inline-end;"],
	["clear-none", "clear: none;"],

	// isolation
	["isolate", "isolation: isolate;"],
	["isolation-auto", "isolation: auto;"],

	// object-fit
	["object-contain", "object-fit: contain;"],
	["object-cover", "object-fit: cover;"],
	["object-fill", "object-fit: fill;"],
	["object-none", "object-fit: none;"],
	["object-scale-down", "object-fit: scale-down;"],

	// object-position
	["object-top-left", "object-position: top left;"],
	["object-top", "object-position: top;"],
	["object-top-right", "object-position: top right;"],
	["object-left", "object-position: left;"],
	["object-center", "object-position: center;"],
	["object-right", "object-position: right;"],
	["object-bottom-left", "object-position: bottom left;"],
	["object-bottom", "object-position: bottom;"],
	["object-bottom-right", "object-position: bottom right;"],
	[/object-\((.+)\)/, ([, prop]) => `object-position: var(${prop});`],
	[/object-\[(.+)\]/, ([, value]) => `object-position: ${value};`],

	// overflow
	["overflow-auto", "overflow: auto;"],
	["overflow-hidden", "overflow: hidden;"],
	["overflow-clip", "overflow: clip;"],
	["overflow-visible", "overflow: visible;"],
	["overflow-scroll", "overflow: scroll;"],
	["overflow-x-auto", "overflow-x: auto;"],
	["overflow-y-auto", "overflow-y: auto;"],
	["overflow-x-hidden", "overflow-x: hidden;"],
	["overflow-y-hidden", "overflow-y: hidden;"],
	["overflow-x-clip", "overflow-x: clip;"],
	["overflow-y-clip", "overflow-y: clip;"],
	["overflow-x-visible", "overflow-x: visible;"],
	["overflow-y-visible", "overflow-y: visible;"],
	["overflow-x-scroll", "overflow-x: scroll;"],
	["overflow-y-scroll", "overflow-y: scroll;"],

	// overscroll-behavior
	["overscroll-auto", "overscroll-behavior: auto;"],
	["overscroll-contain", "overscroll-behavior: contain;"],
	["overscroll-none", "overscroll-behavior: none;"],
	["overscroll-x-auto", "overscroll-behavior-x: auto;"],
	["overscroll-x-contain", "overscroll-behavior-x: contain;"],
	["overscroll-x-none", "overscroll-behavior-x: none;"],
	["overscroll-y-auto", "overscroll-behavior-y: auto;"],
	["overscroll-y-contain", "overscroll-behavior-y: contain;"],
	["overscroll-y-none", "overscroll-behavior-y: none;"],

	// position
	["static", "position: static;"],
	["fixed", "position: fixed;"],
	["absolute", "position: absolute;"],
	["relative", "position: relative;"],
	["sticky", "position: sticky;"],

	// top / right / bottom / left
	// inset
	[
		/(-)?inset-(\d+)/,
		([, neg, num]) =>
			`inset: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/(-)?inset-(\d+\/\d+)/,
		([, neg, frac]) => `inset: calc(${frac} * ${neg ? "-" : ""}100%);`,
	],
	["inset-px", "inset: 1px;"],
	["-inset-px", "inset: -1px;"],
	["inset-full", "inset: 100%;"],
	["-inset-full", "inset: -100%;"],
	["inset-auto", "inset: auto;"],
	[/inset-\((.+)\)/, ([, prop]) => `inset: var(${prop});`],
	[/inset-\[(.+)\]/, ([, value]) => `inset: ${value};`],

	// inset-x (inline)
	[
		/(-)?inset-x-(\d+)/,
		([, neg, num]) =>
			`inset-inline: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/(-)?inset-x-(\d+\/\d+)/,
		([, neg, frac]) =>
			`inset-inline: calc(${frac} * ${neg ? "-" : ""}100%);`,
	],
	["inset-x-px", "inset-inline: 1px;"],
	["-inset-x-px", "inset-inline: -1px;"],
	["inset-x-full", "inset-inline: 100%;"],
	["-inset-x-full", "inset-inline: -100%;"],
	["inset-x-auto", "inset-inline: auto;"],
	[/inset-x-\((.+)\)/, ([, prop]) => `inset-inline: var(${prop});`],
	[/inset-x-\[(.+)\]/, ([, value]) => `inset-inline: ${value};`],

	// inset-y (block)
	[
		/(-)?inset-y-(\d+)/,
		([, neg, num]) =>
			`inset-block: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/(-)?inset-y-(\d+\/\d+)/,
		([, neg, frac]) =>
			`inset-block: calc(${frac} * ${neg ? "-" : ""}100%);`,
	],
	["inset-y-px", "inset-block: 1px;"],
	["-inset-y-px", "inset-block: -1px;"],
	["inset-y-full", "inset-block: 100%;"],
	["-inset-y-full", "inset-block: -100%;"],
	["inset-y-auto", "inset-block: auto;"],
	[/inset-y-\((.+)\)/, ([, prop]) => `inset-block: var(${prop});`],
	[/inset-y-\[(.+)\]/, ([, value]) => `inset-block: ${value};`],

	// inset-s (inline-start)
	[
		/(-)?inset-s-(\d+)/,
		([, neg, num]) =>
			`inset-inline-start: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/(-)?inset-s-(\d+\/\d+)/,
		([, neg, frac]) =>
			`inset-inline-start: calc(${frac} * ${neg ? "-" : ""}100%);`,
	],
	["inset-s-px", "inset-inline-start: 1px;"],
	["-inset-s-px", "inset-inline-start: -1px;"],
	["inset-s-full", "inset-inline-start: 100%;"],
	["-inset-s-full", "inset-inline-start: -100%;"],
	["inset-s-auto", "inset-inline-start: auto;"],
	[/inset-s-\((.+)\)/, ([, prop]) => `inset-inline-start: var(${prop});`],
	[/inset-s-\[(.+)\]/, ([, value]) => `inset-inline-start: ${value};`],

	// inset-e (inline-end)
	[
		/(-)?inset-e-(\d+)/,
		([, neg, num]) =>
			`inset-inline-end: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/(-)?inset-e-(\d+\/\d+)/,
		([, neg, frac]) =>
			`inset-inline-end: calc(${frac} * ${neg ? "-" : ""}100%);`,
	],
	["inset-e-px", "inset-inline-end: 1px;"],
	["-inset-e-px", "inset-inline-end: -1px;"],
	["inset-e-full", "inset-inline-end: 100%;"],
	["-inset-e-full", "inset-inline-end: -100%;"],
	["inset-e-auto", "inset-inline-end: auto;"],
	[/inset-e-\((.+)\)/, ([, prop]) => `inset-inline-end: var(${prop});`],
	[/inset-e-\[(.+)\]/, ([, value]) => `inset-inline-end: ${value};`],

	// inset-bs (block-start)
	[
		/(-)?inset-bs-(\d+)/,
		([, neg, num]) =>
			`inset-block-start: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/(-)?inset-bs-(\d+\/\d+)/,
		([, neg, frac]) =>
			`inset-block-start: calc(${frac} * ${neg ? "-" : ""}100%);`,
	],
	["inset-bs-px", "inset-block-start: 1px;"],
	["-inset-bs-px", "inset-block-start: -1px;"],
	["inset-bs-full", "inset-block-start: 100%;"],
	["-inset-bs-full", "inset-block-start: -100%;"],
	["inset-bs-auto", "inset-block-start: auto;"],
	[/inset-bs-\((.+)\)/, ([, prop]) => `inset-block-start: var(${prop});`],
	[/inset-bs-\[(.+)\]/, ([, value]) => `inset-block-start: ${value};`],

	// inset-be (block-end)
	[
		/(-)?inset-be-(\d+)/,
		([, neg, num]) =>
			`inset-block-end: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/(-)?inset-be-(\d+\/\d+)/,
		([, neg, frac]) =>
			`inset-block-end: calc(${frac} * ${neg ? "-" : ""}100%);`,
	],
	["inset-be-px", "inset-block-end: 1px;"],
	["-inset-be-px", "inset-block-end: -1px;"],
	["inset-be-full", "inset-block-end: 100%;"],
	["-inset-be-full", "inset-block-end: -100%;"],
	["inset-be-auto", "inset-block-end: auto;"],
	[/inset-be-\((.+)\)/, ([, prop]) => `inset-block-end: var(${prop});`],
	[/inset-be-\[(.+)\]/, ([, value]) => `inset-block-end: ${value};`],

	// top/bottom/right/left
	...directionRules(),

	// visibility
	["visible", "visibility: visible;"],
	["invisible", "visibility: hidden;"],
	["collapse", "visibility: collapse;"],

	// z-index
	[/(-)?z-(\d+)/, ([, neg, num]) => `z-index: ${neg ? "-" : ""}${num};`],
	["z-auto", "z-index: auto;"],
	[/z-\((.+)\)/, ([, prop]) => `z-index: var(${prop});`],
	[/z-\[(.+)\]/, ([, value]) => `z-index: ${value};`],
]

export const FLEXBOX_GRID: Rule[] = [
	// flex-basis
	[/basis-(\d+)/, ([, num]) => `flex-basis: calc(var(--spacing) * ${num});`],
	[/basis-(\d+\/\d+)/, ([, frac]) => `flex-basis: calc(${frac} * 100%);`],
	["basis-full", "flex-basis: 100%;"],
	["basis-auto", "flex-basis: auto;"],
	["basis-3xs", "flex-basis: var(--container-3xs);"],
	["basis-2xs", "flex-basis: var(--container-2xs);"],
	["basis-xs", "flex-basis: var(--container-xs);"],
	["basis-sm", "flex-basis: var(--container-sm);"],
	["basis-md", "flex-basis: var(--container-md);"],
	["basis-lg", "flex-basis: var(--container-lg);"],
	["basis-xl", "flex-basis: var(--container-xl);"],
	["basis-2xl", "flex-basis: var(--container-2xl);"],
	["basis-3xl", "flex-basis: var(--container-3xl);"],
	["basis-4xl", "flex-basis: var(--container-4xl);"],
	["basis-5xl", "flex-basis: var(--container-5xl);"],
	["basis-6xl", "flex-basis: var(--container-6xl);"],
	["basis-7xl", "flex-basis: var(--container-7xl);"],
	[/basis-\((.+)\)/, ([, prop]) => `flex-basis: var(${prop});`],
	[/basis-\[(.+)\]/, ([, value]) => `flex-basis: ${value};`],

	// flex-direction
	["flex-row", "flex-direction: row;"],
	["flex-row-reverse", "flex-direction: row-reverse;"],
	["flex-col", "flex-direction: column;"],
	["flex-col-reverse", "flex-direction: column-reverse;"],

	// flex-wrap
	["flex-nowrap", "flex-wrap: nowrap;"],
	["flex-wrap", "flex-wrap: wrap;"],
	["flex-wrap-reverse", "flex-wrap: wrap-reverse;"],

	// flex
	[/flex-(\d+)/, ([, num]) => `flex: ${num};`],
	[/flex-(\d+\/\d+)/, ([, frac]) => `flex: calc(${frac} * 100%);`],
	["flex-auto", "flex: auto;"],
	["flex-initial", "flex: 0 auto;"],
	["flex-none", "flex: none;"],
	[/flex-\((.+)\)/, ([, prop]) => `flex: var(${prop});`],
	[/flex-\[(.+)\]/, ([, value]) => `flex: ${value};`],

	// flex-grow
	["grow", "flex-grow: 1;"],
	[/grow-(\d+)/, ([, num]) => `flex-grow: ${num};`],
	[/grow-\((.+)\)/, ([, prop]) => `flex-grow: var(${prop});`],
	[/grow-\[(.+)\]/, ([, value]) => `flex-grow: ${value};`],

	// flex-shrink
	["shrink", "flex-shrink: 1;"],
	[/shrink-(\d+)/, ([, num]) => `flex-shrink: ${num};`],
	[/shrink-\((.+)\)/, ([, prop]) => `flex-shrink: var(${prop});`],
	[/shrink-\[(.+)\]/, ([, value]) => `flex-shrink: ${value};`],

	// order
	[
		/(-)?order-(\d+)/,
		([, neg, num]) => `order: ${neg ? `calc(${num} * -1)` : num};`,
	],
	["order-first", "order: -9999;"],
	["order-last", "order: 9999;"],
	["order-none", "order: 0;"],
	[/order-\((.+)\)/, ([, prop]) => `order: var(${prop});`],
	[/order-\[(.+)\]/, ([, value]) => `order: ${value};`],

	// grid-template-columns
	[
		/grid-cols-(\d+)/,
		([, num]) => `grid-template-columns: repeat(${num}, minmax(0, 1fr));`,
	],
	["grid-cols-none", "grid-template-columns: none;"],
	["grid-cols-subgrid", "grid-template-columns: subgrid;"],
	[
		/grid-cols-\((.+)\)/,
		([, prop]) => `grid-template-columns: var(${prop});`,
	],
	[/grid-cols-\[(.+)\]/, ([, value]) => `grid-template-columns: ${value};`],

	// grid-column
	[/col-span-(\d+)/, ([, num]) => `grid-column: span ${num} / span ${num};`],
	["col-span-full", "grid-column: 1 / -1;"],
	[
		/col-span-\((.+)\)/,
		([, prop]) => `grid-column: span var(${prop}) / span var(${prop});`,
	],
	[
		/col-span-\[(.+)\]/,
		([, value]) => `grid-column: span ${value} / span ${value};`,
	],

	[
		/(-)?col-start-(\d+)/,
		([, neg, num]) =>
			`grid-column-start: ${neg ? `calc(${num} * -1)` : num};`,
	],
	["col-start-auto", "grid-column-start: auto;"],
	[/col-start-\((.+)\)/, ([, prop]) => `grid-column-start: var(${prop});`],
	[/col-start-\[(.+)\]/, ([, value]) => `grid-column-start: ${value};`],

	[
		/(-)?col-end-(\d+)/,
		([, neg, num]) =>
			`grid-column-end: ${neg ? `calc(${num} * -1)` : num};`,
	],
	["col-end-auto", "grid-column-end: auto;"],
	[/col-end-\((.+)\)/, ([, prop]) => `grid-column-end: var(${prop});`],
	[/col-end-\[(.+)\]/, ([, value]) => `grid-column-end: ${value};`],

	["col-auto", "grid-column: auto;"],
	[
		/(-)?col-(\d+)/,
		([, neg, num]) => `grid-column: ${neg ? `calc(${num} * -1)` : num};`,
	],
	[/col-\((.+)\)/, ([, prop]) => `grid-column: var(${prop});`],
	[/col-\[(.+)\]/, ([, value]) => `grid-column: ${value};`],

	// grid-template-rows
	[
		/grid-rows-(\d+)/,
		([, num]) => `grid-template-rows: repeat(${num}, minmax(0, 1fr));`,
	],
	["grid-rows-none", "grid-template-rows: none;"],
	["grid-rows-subgrid", "grid-template-rows: subgrid;"],
	[/grid-rows-\((.+)\)/, ([, prop]) => `grid-template-rows: var(${prop});`],
	[/grid-rows-\[(.+)\]/, ([, value]) => `grid-template-rows: ${value};`],

	// grid-row
	[/row-span-(\d+)/, ([, num]) => `grid-row: span ${num} / span ${num};`],
	["row-span-full", "grid-row: 1 / -1;"],
	[
		/row-span-\((.+)\)/,
		([, prop]) => `grid-row: span var(${prop}) / span var(${prop});`,
	],
	[
		/row-span-\[(.+)\]/,
		([, value]) => `grid-row: span ${value} / span ${value};`,
	],

	[
		/(-)?row-start-(\d+)/,
		([, neg, num]) => `grid-row-start: ${neg ? `calc(${num} * -1)` : num};`,
	],
	["row-start-auto", "grid-row-start: auto;"],
	[/row-start-\((.+)\)/, ([, prop]) => `grid-row-start: var(${prop});`],
	[/row-start-\[(.+)\]/, ([, value]) => `grid-row-start: ${value};`],

	[
		/(-)?row-end-(\d+)/,
		([, neg, num]) => `grid-row-end: ${neg ? `calc(${num} * -1)` : num};`,
	],
	["row-end-auto", "grid-row-end: auto;"],
	[/row-end-\((.+)\)/, ([, prop]) => `grid-row-end: var(${prop});`],
	[/row-end-\[(.+)\]/, ([, value]) => `grid-row-end: ${value};`],

	["row-auto", "grid-row: auto;"],
	[
		/(-)?row-(\d+)/,
		([, neg, num]) => `grid-row: ${neg ? `calc(${num} * -1)` : num};`,
	],
	[/row-\((.+)\)/, ([, prop]) => `grid-row: var(${prop});`],
	[/row-\[(.+)\]/, ([, value]) => `grid-row: ${value};`],

	// grid-auto-flow
	["grid-flow-row", "grid-auto-flow: row;"],
	["grid-flow-col", "grid-auto-flow: column;"],
	["grid-flow-dense", "grid-auto-flow: dense;"],
	["grid-flow-row-dense", "grid-auto-flow: row dense;"],
	["grid-flow-col-dense", "grid-auto-flow: column dense;"],

	// grid-auto-columns
	["auto-cols-auto", "grid-auto-columns: auto;"],
	["auto-cols-min", "grid-auto-columns: min-content;"],
	["auto-cols-max", "grid-auto-columns: max-content;"],
	["auto-cols-fr", "grid-auto-columns: minmax(0, 1fr);"],
	[/auto-cols-\((.+)\)/, ([, prop]) => `grid-auto-columns: var(${prop});`],
	[/auto-cols-\[(.+)\]/, ([, value]) => `grid-auto-columns: ${value};`],

	// grid-auto-rows
	["auto-rows-auto", "grid-auto-rows: auto;"],
	["auto-rows-min", "grid-auto-rows: min-content;"],
	["auto-rows-max", "grid-auto-rows: max-content;"],
	["auto-rows-fr", "grid-auto-rows: minmax(0, 1fr);"],
	[/auto-rows-\((.+)\)/, ([, prop]) => `grid-auto-rows: var(${prop});`],
	[/auto-rows-\[(.+)\]/, ([, value]) => `grid-auto-rows: ${value};`],

	// gap
	[/gap-(\d+)/, ([, num]) => `gap: calc(var(--spacing) * ${num});`],
	[/gap-\((.+)\)/, ([, prop]) => `gap: var(${prop});`],
	[/gap-\[(.+)\]/, ([, value]) => `gap: ${value};`],

	[/gap-x-(\d+)/, ([, num]) => `column-gap: calc(var(--spacing) * ${num});`],
	[/gap-x-\((.+)\)/, ([, prop]) => `column-gap: var(${prop});`],
	[/gap-x-\[(.+)\]/, ([, value]) => `column-gap: ${value};`],

	[/gap-y-(\d+)/, ([, num]) => `row-gap: calc(var(--spacing) * ${num});`],
	[/gap-y-\((.+)\)/, ([, prop]) => `row-gap: var(${prop});`],
	[/gap-y-\[(.+)\]/, ([, value]) => `row-gap: ${value};`],

	// justify-content
	["justify-start", "justify-content: flex-start;"],
	["justify-end", "justify-content: flex-end;"],
	["justify-end-safe", "justify-content: safe flex-end;"],
	["justify-center", "justify-content: center;"],
	["justify-center-safe", "justify-content: safe center;"],
	["justify-between", "justify-content: space-between;"],
	["justify-around", "justify-content: space-around;"],
	["justify-evenly", "justify-content: space-evenly;"],
	["justify-stretch", "justify-content: stretch;"],
	["justify-baseline", "justify-content: baseline;"],
	["justify-normal", "justify-content: normal;"],

	// justify-items
	["justify-items-start", "justify-items: start;"],
	["justify-items-end", "justify-items: end;"],
	["justify-items-end-safe", "justify-items: safe end;"],
	["justify-items-center", "justify-items: center;"],
	["justify-items-center-safe", "justify-items: safe center;"],
	["justify-items-stretch", "justify-items: stretch;"],
	["justify-items-normal", "justify-items: normal;"],

	// justify-self
	["justify-self-auto", "justify-self: auto;"],
	["justify-self-start", "justify-self: start;"],
	["justify-self-center", "justify-self: center;"],
	["justify-self-center-safe", "justify-self: safe center;"],
	["justify-self-end", "justify-self: end;"],
	["justify-self-end-safe", "justify-self: safe end;"],
	["justify-self-stretch", "justify-self: stretch;"],

	// align-content
	["content-normal", "align-content: normal;"],
	["content-center", "align-content: center;"],
	["content-start", "align-content: flex-start;"],
	["content-end", "align-content: flex-end;"],
	["content-between", "align-content: space-between;"],
	["content-around", "align-content: space-around;"],
	["content-evenly", "align-content: space-evenly;"],
	["content-baseline", "align-content: baseline;"],
	["content-stretch", "align-content: stretch;"],

	// align-items
	["items-start", "align-items: flex-start;"],
	["items-end", "align-items: flex-end;"],
	["items-end-safe", "align-items: safe flex-end;"],
	["items-center", "align-items: center;"],
	["items-center-safe", "align-items: safe center;"],
	["items-baseline", "align-items: baseline;"],
	["items-baseline-last", "align-items: last baseline;"],
	["items-stretch", "align-items: stretch;"],

	// align-self
	["self-auto", "align-self: auto;"],
	["self-start", "align-self: flex-start;"],
	["self-end", "align-self: flex-end;"],
	["self-end-safe", "align-self: safe flex-end;"],
	["self-center", "align-self: center;"],
	["self-center-safe", "align-self: safe center;"],
	["self-stretch", "align-self: stretch;"],
	["self-baseline", "align-self: baseline;"],
	["self-baseline-last", "align-self: last baseline;"],

	// place-content
	["place-content-center", "place-content: center;"],
	["place-content-center-safe", "place-content: safe center;"],
	["place-content-start", "place-content: start;"],
	["place-content-end", "place-content: end;"],
	["place-content-end-safe", "place-content: safe end;"],
	["place-content-between", "place-content: space-between;"],
	["place-content-around", "place-content: space-around;"],
	["place-content-evenly", "place-content: space-evenly;"],
	["place-content-baseline", "place-content: baseline;"],
	["place-content-stretch", "place-content: stretch;"],

	// place-items
	["place-items-start", "place-items: start;"],
	["place-items-end", "place-items: end;"],
	["place-items-end-safe", "place-items: safe end;"],
	["place-items-center", "place-items: center;"],
	["place-items-center-safe", "place-items: safe center;"],
	["place-items-baseline", "place-items: baseline;"],
	["place-items-stretch", "place-items: stretch;"],

	// place-self
	["place-self-auto", "place-self: auto;"],
	["place-self-start", "place-self: start;"],
	["place-self-end", "place-self: end;"],
	["place-self-end-safe", "place-self: safe end;"],
	["place-self-center", "place-self: center;"],
	["place-self-center-safe", "place-self: safe center;"],
	["place-self-stretch", "place-self: stretch;"],
]

export const SPACING: Rule[] = [
	// padding
	[/p-(\d+)/, ([, num]) => `padding: calc(var(--spacing) * ${num});`],
	["p-px", "padding: 1px;"],
	[/p-\((.+)\)/, ([, prop]) => `padding: var(${prop});`],
	[/p-\[(.+)\]/, ([, value]) => `padding: ${value};`],

	[/px-(\d+)/, ([, num]) => `padding-inline: calc(var(--spacing) * ${num});`],
	["px-px", "padding-inline: 1px;"],
	[/px-\((.+)\)/, ([, prop]) => `padding-inline: var(${prop});`],
	[/px-\[(.+)\]/, ([, value]) => `padding-inline: ${value};`],

	[/py-(\d+)/, ([, num]) => `padding-block: calc(var(--spacing) * ${num});`],
	["py-px", "padding-block: 1px;"],
	[/py-\((.+)\)/, ([, prop]) => `padding-block: var(${prop});`],
	[/py-\[(.+)\]/, ([, value]) => `padding-block: ${value};`],

	[
		/ps-(\d+)/,
		([, num]) => `padding-inline-start: calc(var(--spacing) * ${num});`,
	],
	["ps-px", "padding-inline-start: 1px;"],
	[/ps-\((.+)\)/, ([, prop]) => `padding-inline-start: var(${prop});`],
	[/ps-\[(.+)\]/, ([, value]) => `padding-inline-start: ${value};`],

	[
		/pe-(\d+)/,
		([, num]) => `padding-inline-end: calc(var(--spacing) * ${num});`,
	],
	["pe-px", "padding-inline-end: 1px;"],
	[/pe-\((.+)\)/, ([, prop]) => `padding-inline-end: var(${prop});`],
	[/pe-\[(.+)\]/, ([, value]) => `padding-inline-end: ${value};`],

	[
		/pbs-(\d+)/,
		([, num]) => `padding-block-start: calc(var(--spacing) * ${num});`,
	],
	["pbs-px", "padding-block-start: 1px;"],
	[/pbs-\((.+)\)/, ([, prop]) => `padding-block-start: var(${prop});`],
	[/pbs-\[(.+)\]/, ([, value]) => `padding-block-start: ${value};`],

	[
		/pbe-(\d+)/,
		([, num]) => `padding-block-end: calc(var(--spacing) * ${num});`,
	],
	["pbe-px", "padding-block-end: 1px;"],
	[/pbe-\((.+)\)/, ([, prop]) => `padding-block-end: var(${prop});`],
	[/pbe-\[(.+)\]/, ([, value]) => `padding-block-end: ${value};`],

	[/pt-(\d+)/, ([, num]) => `padding-top: calc(var(--spacing) * ${num});`],
	["pt-px", "padding-top: 1px;"],
	[/pt-\((.+)\)/, ([, prop]) => `padding-top: var(${prop});`],
	[/pt-\[(.+)\]/, ([, value]) => `padding-top: ${value};`],

	[/pr-(\d+)/, ([, num]) => `padding-right: calc(var(--spacing) * ${num});`],
	["pr-px", "padding-right: 1px;"],
	[/pr-\((.+)\)/, ([, prop]) => `padding-right: var(${prop});`],
	[/pr-\[(.+)\]/, ([, value]) => `padding-right: ${value};`],

	[/pb-(\d+)/, ([, num]) => `padding-bottom: calc(var(--spacing) * ${num});`],
	["pb-px", "padding-bottom: 1px;"],
	[/pb-\((.+)\)/, ([, prop]) => `padding-bottom: var(${prop});`],
	[/pb-\[(.+)\]/, ([, value]) => `padding-bottom: ${value};`],

	[/pl-(\d+)/, ([, num]) => `padding-left: calc(var(--spacing) * ${num});`],
	["pl-px", "padding-left: 1px;"],
	[/pl-\((.+)\)/, ([, prop]) => `padding-left: var(${prop});`],
	[/pl-\[(.+)\]/, ([, value]) => `padding-left: ${value};`],

	// margin
	[
		/(-)?m-(\d+)/,
		([, neg, num]) =>
			`margin: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	["m-auto", "margin: auto;"],
	["m-px", "margin: 1px;"],
	["-m-px", "margin: -1px;"],
	[/m-\((.+)\)/, ([, prop]) => `margin: var(${prop});`],
	[/m-\[(.+)\]/, ([, value]) => `margin: ${value};`],

	[
		/(-)?mx-(\d+)/,
		([, neg, num]) =>
			`margin-inline: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	["mx-auto", "margin-inline: auto;"],
	["mx-px", "margin-inline: 1px;"],
	["-mx-px", "margin-inline: -1px;"],
	[/mx-\((.+)\)/, ([, prop]) => `margin-inline: var(${prop});`],
	[/mx-\[(.+)\]/, ([, value]) => `margin-inline: ${value};`],

	[
		/(-)?my-(\d+)/,
		([, neg, num]) =>
			`margin-block: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	["my-auto", "margin-block: auto;"],
	["my-px", "margin-block: 1px;"],
	["-my-px", "margin-block: -1px;"],
	[/my-\((.+)\)/, ([, prop]) => `margin-block: var(${prop});`],
	[/my-\[(.+)\]/, ([, value]) => `margin-block: ${value};`],

	[
		/(-)?ms-(\d+)/,
		([, neg, num]) =>
			`margin-inline-start: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	["ms-auto", "margin-inline-start: auto;"],
	["ms-px", "margin-inline-start: 1px;"],
	["-ms-px", "margin-inline-start: -1px;"],
	[/ms-\((.+)\)/, ([, prop]) => `margin-inline-start: var(${prop});`],
	[/ms-\[(.+)\]/, ([, value]) => `margin-inline-start: ${value};`],

	[
		/(-)?me-(\d+)/,
		([, neg, num]) =>
			`margin-inline-end: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	["me-auto", "margin-inline-end: auto;"],
	["me-px", "margin-inline-end: 1px;"],
	["-me-px", "margin-inline-end: -1px;"],
	[/me-\((.+)\)/, ([, prop]) => `margin-inline-end: var(${prop});`],
	[/me-\[(.+)\]/, ([, value]) => `margin-inline-end: ${value};`],

	[
		/(-)?mbs-(\d+)/,
		([, neg, num]) =>
			`margin-block-start: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	["mbs-auto", "margin-block-start: auto;"],
	["mbs-px", "margin-block-start: 1px;"],
	["-mbs-px", "margin-block-start: -1px;"],
	[/mbs-\((.+)\)/, ([, prop]) => `margin-block-start: var(${prop});`],
	[/mbs-\[(.+)\]/, ([, value]) => `margin-block-start: ${value};`],

	[
		/(-)?mbe-(\d+)/,
		([, neg, num]) =>
			`margin-block-end: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	["mbe-auto", "margin-block-end: auto;"],
	["mbe-px", "margin-block-end: 1px;"],
	["-mbe-px", "margin-block-end: -1px;"],
	[/mbe-\((.+)\)/, ([, prop]) => `margin-block-end: var(${prop});`],
	[/mbe-\[(.+)\]/, ([, value]) => `margin-block-end: ${value};`],

	[
		/(-)?mt-(\d+)/,
		([, neg, num]) =>
			`margin-top: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	["mt-auto", "margin-top: auto;"],
	["mt-px", "margin-top: 1px;"],
	["-mt-px", "margin-top: -1px;"],
	[/mt-\((.+)\)/, ([, prop]) => `margin-top: var(${prop});`],
	[/mt-\[(.+)\]/, ([, value]) => `margin-top: ${value};`],

	[
		/(-)?mr-(\d+)/,
		([, neg, num]) =>
			`margin-right: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	["mr-auto", "margin-right: auto;"],
	["mr-px", "margin-right: 1px;"],
	["-mr-px", "margin-right: -1px;"],
	[/mr-\((.+)\)/, ([, prop]) => `margin-right: var(${prop});`],
	[/mr-\[(.+)\]/, ([, value]) => `margin-right: ${value};`],

	[
		/(-)?mb-(\d+)/,
		([, neg, num]) =>
			`margin-bottom: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	["mb-auto", "margin-bottom: auto;"],
	["mb-px", "margin-bottom: 1px;"],
	["-mb-px", "margin-bottom: -1px;"],
	[/mb-\((.+)\)/, ([, prop]) => `margin-bottom: var(${prop});`],
	[/mb-\[(.+)\]/, ([, value]) => `margin-bottom: ${value};`],

	[
		/(-)?ml-(\d+)/,
		([, neg, num]) =>
			`margin-left: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	["ml-auto", "margin-left: auto;"],
	["ml-px", "margin-left: 1px;"],
	["-ml-px", "margin-left: -1px;"],
	[/ml-\((.+)\)/, ([, prop]) => `margin-left: var(${prop});`],
	[/ml-\[(.+)\]/, ([, value]) => `margin-left: ${value};`],

	// space-between
	[
		/(-)?space-x-(\d+)/,
		([, neg, num]) =>
			`& > :not(:last-child) { --tw-space-x-reverse: 0; margin-inline-start: calc(calc(var(--spacing) * ${neg ? "-" : ""}${num}) * var(--tw-space-x-reverse)); margin-inline-end: calc(calc(var(--spacing) * ${neg ? "-" : ""}${num}) * calc(1 - var(--tw-space-x-reverse))); }`,
	],
	[
		"space-x-px",
		"& > :not(:last-child) { --tw-space-x-reverse: 0; margin-inline-start: calc(1px * var(--tw-space-x-reverse)); margin-inline-end: calc(1px * calc(1 - var(--tw-space-x-reverse))); }",
	],
	[
		"-space-x-px",
		"& > :not(:last-child) { --tw-space-x-reverse: 0; margin-inline-start: calc(-1px * var(--tw-space-x-reverse)); margin-inline-end: calc(-1px * calc(1 - var(--tw-space-x-reverse))); }",
	],
	[
		/space-x-\((.+)\)/,
		([, prop]) =>
			`& > :not(:last-child) { --tw-space-x-reverse: 0; margin-inline-start: calc(var(${prop}) * var(--tw-space-x-reverse)); margin-inline-end: calc(var(${prop}) * calc(1 - var(--tw-space-x-reverse))); }`,
	],
	[
		/space-x-\[(.+)\]/,
		([, value]) =>
			`& > :not(:last-child) { --tw-space-x-reverse: 0; margin-inline-start: calc(${value} * var(--tw-space-x-reverse)); margin-inline-end: calc(${value} * calc(1 - var(--tw-space-x-reverse))); }`,
	],
	["space-x-reverse", "& > :not(:last-child) { --tw-space-x-reverse: 1; }"],

	[
		/(-)?space-y-(\d+)/,
		([, neg, num]) =>
			`& > :not(:last-child) { --tw-space-y-reverse: 0; margin-block-start: calc(calc(var(--spacing) * ${neg ? "-" : ""}${num}) * var(--tw-space-y-reverse)); margin-block-end: calc(calc(var(--spacing) * ${neg ? "-" : ""}${num}) * calc(1 - var(--tw-space-y-reverse))); }`,
	],
	[
		"space-y-px",
		"& > :not(:last-child) { --tw-space-y-reverse: 0; margin-block-start: calc(1px * var(--tw-space-y-reverse)); margin-block-end: calc(1px * calc(1 - var(--tw-space-y-reverse))); }",
	],
	[
		"-space-y-px",
		"& > :not(:last-child) { --tw-space-y-reverse: 0; margin-block-start: calc(-1px * var(--tw-space-y-reverse)); margin-block-end: calc(-1px * calc(1 - var(--tw-space-y-reverse))); }",
	],
	[
		/space-y-\((.+)\)/,
		([, prop]) =>
			`& > :not(:last-child) { --tw-space-y-reverse: 0; margin-block-start: calc(var(${prop}) * var(--tw-space-y-reverse)); margin-block-end: calc(var(${prop}) * calc(1 - var(--tw-space-y-reverse))); }`,
	],
	[
		/space-y-\[(.+)\]/,
		([, value]) =>
			`& > :not(:last-child) { --tw-space-y-reverse: 0; margin-block-start: calc(${value} * var(--tw-space-y-reverse)); margin-block-end: calc(${value} * calc(1 - var(--tw-space-y-reverse))); }`,
	],
	["space-y-reverse", "& > :not(:last-child) { --tw-space-y-reverse: 1; }"],
]

export const SIZING: Rule[] = [
	// width
	[/w-(\d+)/, ([, num]) => `width: calc(var(--spacing) * ${num});`],
	[/w-(\d+\/\d+)/, ([, fraction]) => `width: calc(${fraction} * 100%);`],
	["w-3xs", "width: var(--container-3xs);"],
	["w-2xs", "width: var(--container-2xs);"],
	["w-xs", "width: var(--container-xs);"],
	["w-sm", "width: var(--container-sm);"],
	["w-md", "width: var(--container-md);"],
	["w-lg", "width: var(--container-lg);"],
	["w-xl", "width: var(--container-xl);"],
	["w-2xl", "width: var(--container-2xl);"],
	["w-3xl", "width: var(--container-3xl);"],
	["w-4xl", "width: var(--container-4xl);"],
	["w-5xl", "width: var(--container-5xl);"],
	["w-6xl", "width: var(--container-6xl);"],
	["w-7xl", "width: var(--container-7xl);"],
	["w-auto", "width: auto;"],
	["w-px", "width: 1px;"],
	["w-full", "width: 100%;"],
	["w-screen", "width: 100vw;"],
	["w-dvw", "width: 100dvw;"],
	["w-dvh", "width: 100dvh;"],
	["w-lvw", "width: 100lvw;"],
	["w-lvh", "width: 100lvh;"],
	["w-svw", "width: 100svw;"],
	["w-svh", "width: 100svh;"],
	["w-min", "width: min-content;"],
	["w-max", "width: max-content;"],
	["w-fit", "width: fit-content;"],
	[/w-\((.+)\)/, ([, prop]) => `width: var(${prop});`],
	[/w-\[(.+)\]/, ([, value]) => `width: ${value};`],

	// size
	[
		/size-(\d+)/,
		([, num]) =>
			`width: calc(var(--spacing) * ${num}); height: calc(var(--spacing) * ${num});`,
	],
	[
		/size-(\d+\/\d+)/,
		([, fraction]) =>
			`width: calc(${fraction} * 100%); height: calc(${fraction} * 100%);`,
	],
	["size-auto", "width: auto; height: auto;"],
	["size-px", "width: 1px; height: 1px;"],
	["size-full", "width: 100%; height: 100%;"],
	["size-dvw", "width: 100dvw; height: 100dvw;"],
	["size-dvh", "width: 100dvh; height: 100dvh;"],
	["size-lvw", "width: 100lvw; height: 100lvw;"],
	["size-lvh", "width: 100lvh; height: 100lvh;"],
	["size-svw", "width: 100svw; height: 100svw;"],
	["size-svh", "width: 100svh; height: 100svh;"],
	["size-min", "width: min-content; height: min-content;"],
	["size-max", "width: max-content; height: max-content;"],
	["size-fit", "width: fit-content; height: fit-content;"],
	[
		/size-\((.+)\)/,
		([, prop]) => `width: var(${prop}); height: var(${prop});`,
	],
	[/size-\[(.+)\]/, ([, value]) => `width: ${value}; height: ${value};`],

	// min-width
	[/min-w-(\d+)/, ([, num]) => `min-width: calc(var(--spacing) * ${num});`],
	[
		/min-w-(\d+\/\d+)/,
		([, fraction]) => `min-width: calc(${fraction} * 100%);`,
	],
	["min-w-3xs", "min-width: var(--container-3xs);"],
	["min-w-2xs", "min-width: var(--container-2xs);"],
	["min-w-xs", "min-width: var(--container-xs);"],
	["min-w-sm", "min-width: var(--container-sm);"],
	["min-w-md", "min-width: var(--container-md);"],
	["min-w-lg", "min-width: var(--container-lg);"],
	["min-w-xl", "min-width: var(--container-xl);"],
	["min-w-2xl", "min-width: var(--container-2xl);"],
	["min-w-3xl", "min-width: var(--container-3xl);"],
	["min-w-4xl", "min-width: var(--container-4xl);"],
	["min-w-5xl", "min-width: var(--container-5xl);"],
	["min-w-6xl", "min-width: var(--container-6xl);"],
	["min-w-7xl", "min-width: var(--container-7xl);"],
	["min-w-auto", "min-width: auto;"],
	["min-w-px", "min-width: 1px;"],
	["min-w-full", "min-width: 100%;"],
	["min-w-screen", "min-width: 100vw;"],
	["min-w-dvw", "min-width: 100dvw;"],
	["min-w-dvh", "min-width: 100dvh;"],
	["min-w-lvw", "min-width: 100lvw;"],
	["min-w-lvh", "min-width: 100lvh;"],
	["min-w-svw", "min-width: 100svw;"],
	["min-w-svh", "min-width: 100svh;"],
	["min-w-min", "min-width: min-content;"],
	["min-w-max", "min-width: max-content;"],
	["min-w-fit", "min-width: fit-content;"],
	[/min-w-\((.+)\)/, ([, prop]) => `min-width: var(${prop});`],
	[/min-w-\[(.+)\]/, ([, value]) => `min-width: ${value};`],

	// max-width
	[/max-w-(\d+)/, ([, num]) => `max-width: calc(var(--spacing) * ${num});`],
	[
		/max-w-(\d+\/\d+)/,
		([, fraction]) => `max-width: calc(${fraction} * 100%);`,
	],
	["max-w-3xs", "max-width: var(--container-3xs);"],
	["max-w-2xs", "max-width: var(--container-2xs);"],
	["max-w-xs", "max-width: var(--container-xs);"],
	["max-w-sm", "max-width: var(--container-sm);"],
	["max-w-md", "max-width: var(--container-md);"],
	["max-w-lg", "max-width: var(--container-lg);"],
	["max-w-xl", "max-width: var(--container-xl);"],
	["max-w-2xl", "max-width: var(--container-2xl);"],
	["max-w-3xl", "max-width: var(--container-3xl);"],
	["max-w-4xl", "max-width: var(--container-4xl);"],
	["max-w-5xl", "max-width: var(--container-5xl);"],
	["max-w-6xl", "max-width: var(--container-6xl);"],
	["max-w-7xl", "max-width: var(--container-7xl);"],
	["max-w-none", "max-width: none;"],
	["max-w-px", "max-width: 1px;"],
	["max-w-full", "max-width: 100%;"],
	["max-w-dvw", "max-width: 100dvw;"],
	["max-w-dvh", "max-width: 100dvh;"],
	["max-w-lvw", "max-width: 100lvw;"],
	["max-w-lvh", "max-width: 100lvh;"],
	["max-w-svw", "max-width: 100svw;"],
	["max-w-svh", "max-width: 100svh;"],
	["max-w-screen", "max-width: 100vw;"],
	["max-w-min", "max-width: min-content;"],
	["max-w-max", "max-width: max-content;"],
	["max-w-fit", "max-width: fit-content;"],
	["max-w-prose", "max-width: 65ch;"],
	[/max-w-\((.+)\)/, ([, prop]) => `max-width: var(${prop});`],
	[/max-w-\[(.+)\]/, ([, value]) => `max-width: ${value};`],

	// container
	[
		"container",
		"width: 100%; @media (width >= 40rem) { max-width: 40rem; } @media (width >= 48rem) { max-width: 48rem; } @media (width >= 64rem) { max-width: 64rem; } @media (width >= 80rem) { max-width: 80rem; } @media (width >= 96rem) { max-width: 96rem; }",
	],

	// height
	[/h-(\d+)/, ([, num]) => `height: calc(var(--spacing) * ${num});`],
	[/h-(\d+\/\d+)/, ([, fraction]) => `height: calc(${fraction} * 100%);`],
	["h-auto", "height: auto;"],
	["h-px", "height: 1px;"],
	["h-full", "height: 100%;"],
	["h-screen", "height: 100vh;"],
	["h-dvh", "height: 100dvh;"],
	["h-dvw", "height: 100dvw;"],
	["h-lvh", "height: 100lvh;"],
	["h-lvw", "height: 100lvw;"],
	["h-svh", "height: 100svh;"],
	["h-svw", "height: 100svw;"],
	["h-min", "height: min-content;"],
	["h-max", "height: max-content;"],
	["h-fit", "height: fit-content;"],
	["h-lh", "height: 1lh;"],
	[/h-\((.+)\)/, ([, prop]) => `height: var(${prop});`],
	[/h-\[(.+)\]/, ([, value]) => `height: ${value};`],

	// min-height
	[/min-h-(\d+)/, ([, num]) => `min-height: calc(var(--spacing) * ${num});`],
	[
		/min-h-(\d+\/\d+)/,
		([, fraction]) => `min-height: calc(${fraction} * 100%);`,
	],
	["min-h-px", "min-height: 1px;"],
	["min-h-full", "min-height: 100%;"],
	["min-h-screen", "min-height: 100vh;"],
	["min-h-dvh", "min-height: 100dvh;"],
	["min-h-dvw", "min-height: 100dvw;"],
	["min-h-lvh", "min-height: 100lvh;"],
	["min-h-lvw", "min-height: 100lvw;"],
	["min-h-svw", "min-height: 100svw;"],
	["min-h-svh", "min-height: 100svh;"],
	["min-h-auto", "min-height: auto;"],
	["min-h-min", "min-height: min-content;"],
	["min-h-max", "min-height: max-content;"],
	["min-h-fit", "min-height: fit-content;"],
	["min-h-lh", "min-height: 1lh;"],
	[/min-h-\((.+)\)/, ([, prop]) => `min-height: var(${prop});`],
	[/min-h-\[(.+)\]/, ([, value]) => `min-height: ${value};`],

	// max-height
	[/max-h-(\d+)/, ([, num]) => `max-height: calc(var(--spacing) * ${num});`],
	[
		/max-h-(\d+\/\d+)/,
		([, fraction]) => `max-height: calc(${fraction} * 100%);`,
	],
	["max-h-none", "max-height: none;"],
	["max-h-px", "max-height: 1px;"],
	["max-h-full", "max-height: 100%;"],
	["max-h-screen", "max-height: 100vh;"],
	["max-h-dvh", "max-height: 100dvh;"],
	["max-h-dvw", "max-height: 100dvw;"],
	["max-h-lvh", "max-height: 100lvh;"],
	["max-h-lvw", "max-height: 100lvw;"],
	["max-h-svh", "max-height: 100svh;"],
	["max-h-svw", "max-height: 100svw;"],
	["max-h-min", "max-height: min-content;"],
	["max-h-max", "max-height: max-content;"],
	["max-h-fit", "max-height: fit-content;"],
	["max-h-lh", "max-height: 1lh;"],
	[/max-h-\((.+)\)/, ([, prop]) => `max-height: var(${prop});`],
	[/max-h-\[(.+)\]/, ([, value]) => `max-height: ${value};`],

	// inline-size
	[
		/inline-(\d+)/,
		([, num]) => `inline-size: calc(var(--spacing) * ${num});`,
	],
	[
		/inline-(\d+\/\d+)/,
		([, fraction]) => `inline-size: calc(${fraction} * 100%);`,
	],
	["inline-3xs", "inline-size: var(--container-3xs);"],
	["inline-2xs", "inline-size: var(--container-2xs);"],
	["inline-xs", "inline-size: var(--container-xs);"],
	["inline-sm", "inline-size: var(--container-sm);"],
	["inline-md", "inline-size: var(--container-md);"],
	["inline-lg", "inline-size: var(--container-lg);"],
	["inline-xl", "inline-size: var(--container-xl);"],
	["inline-2xl", "inline-size: var(--container-2xl);"],
	["inline-3xl", "inline-size: var(--container-3xl);"],
	["inline-4xl", "inline-size: var(--container-4xl);"],
	["inline-5xl", "inline-size: var(--container-5xl);"],
	["inline-6xl", "inline-size: var(--container-6xl);"],
	["inline-7xl", "inline-size: var(--container-7xl);"],
	["inline-auto", "inline-size: auto;"],
	["inline-px", "inline-size: 1px;"],
	["inline-full", "inline-size: 100%;"],
	["inline-screen", "inline-size: 100vw;"],
	["inline-dvw", "inline-size: 100dvw;"],
	["inline-dvh", "inline-size: 100dvh;"],
	["inline-lvw", "inline-size: 100lvw;"],
	["inline-lvh", "inline-size: 100lvh;"],
	["inline-svw", "inline-size: 100svw;"],
	["inline-svh", "inline-size: 100svh;"],
	["inline-min", "inline-size: min-content;"],
	["inline-max", "inline-size: max-content;"],
	["inline-fit", "inline-size: fit-content;"],
	[/inline-\((.+)\)/, ([, prop]) => `inline-size: var(${prop});`],
	[/inline-\[(.+)\]/, ([, value]) => `inline-size: ${value};`],

	// min-inline-size
	[
		/min-inline-(\d+)/,
		([, num]) => `min-inline-size: calc(var(--spacing) * ${num});`,
	],
	[
		/min-inline-(\d+\/\d+)/,
		([, fraction]) => `min-inline-size: calc(${fraction} * 100%);`,
	],
	["min-inline-3xs", "min-inline-size: var(--container-3xs);"],
	["min-inline-2xs", "min-inline-size: var(--container-2xs);"],
	["min-inline-xs", "min-inline-size: var(--container-xs);"],
	["min-inline-sm", "min-inline-size: var(--container-sm);"],
	["min-inline-md", "min-inline-size: var(--container-md);"],
	["min-inline-lg", "min-inline-size: var(--container-lg);"],
	["min-inline-xl", "min-inline-size: var(--container-xl);"],
	["min-inline-2xl", "min-inline-size: var(--container-2xl);"],
	["min-inline-3xl", "min-inline-size: var(--container-3xl);"],
	["min-inline-4xl", "min-inline-size: var(--container-4xl);"],
	["min-inline-5xl", "min-inline-size: var(--container-5xl);"],
	["min-inline-6xl", "min-inline-size: var(--container-6xl);"],
	["min-inline-7xl", "min-inline-size: var(--container-7xl);"],
	["min-inline-auto", "min-inline-size: auto;"],
	["min-inline-px", "min-inline-size: 1px;"],
	["min-inline-full", "min-inline-size: 100%;"],
	["min-inline-screen", "min-inline-size: 100vw;"],
	["min-inline-dvw", "min-inline-size: 100dvw;"],
	["min-inline-dvh", "min-inline-size: 100dvh;"],
	["min-inline-lvw", "min-inline-size: 100lvw;"],
	["min-inline-lvh", "min-inline-size: 100lvh;"],
	["min-inline-svw", "min-inline-size: 100svw;"],
	["min-inline-svh", "min-inline-size: 100svh;"],
	["min-inline-min", "min-inline-size: min-content;"],
	["min-inline-max", "min-inline-size: max-content;"],
	["min-inline-fit", "min-inline-size: fit-content;"],
	[/min-inline-\((.+)\)/, ([, prop]) => `min-inline-size: var(${prop});`],
	[/min-inline-\[(.+)\]/, ([, value]) => `min-inline-size: ${value};`],

	// max-inline-size
	[
		/max-inline-(\d+)/,
		([, num]) => `max-inline-size: calc(var(--spacing) * ${num});`,
	],
	[
		/max-inline-(\d+\/\d+)/,
		([, fraction]) => `max-inline-size: calc(${fraction} * 100%);`,
	],
	["max-inline-3xs", "max-inline-size: var(--container-3xs);"],
	["max-inline-2xs", "max-inline-size: var(--container-2xs);"],
	["max-inline-xs", "max-inline-size: var(--container-xs);"],
	["max-inline-sm", "max-inline-size: var(--container-sm);"],
	["max-inline-md", "max-inline-size: var(--container-md);"],
	["max-inline-lg", "max-inline-size: var(--container-lg);"],
	["max-inline-xl", "max-inline-size: var(--container-xl);"],
	["max-inline-2xl", "max-inline-size: var(--container-2xl);"],
	["max-inline-3xl", "max-inline-size: var(--container-3xl);"],
	["max-inline-4xl", "max-inline-size: var(--container-4xl);"],
	["max-inline-5xl", "max-inline-size: var(--container-5xl);"],
	["max-inline-6xl", "max-inline-size: var(--container-6xl);"],
	["max-inline-7xl", "max-inline-size: var(--container-7xl);"],
	["max-inline-none", "max-inline-size: none;"],
	["max-inline-px", "max-inline-size: 1px;"],
	["max-inline-full", "max-inline-size: 100%;"],
	["max-inline-dvw", "max-inline-size: 100dvw;"],
	["max-inline-dvh", "max-inline-size: 100dvh;"],
	["max-inline-lvw", "max-inline-size: 100lvw;"],
	["max-inline-lvh", "max-inline-size: 100lvh;"],
	["max-inline-svw", "max-inline-size: 100svw;"],
	["max-inline-svh", "max-inline-size: 100svh;"],
	["max-inline-screen", "max-inline-size: 100vw;"],
	["max-inline-min", "max-inline-size: min-content;"],
	["max-inline-max", "max-inline-size: max-content;"],
	["max-inline-fit", "max-inline-size: fit-content;"],
	[/max-inline-\((.+)\)/, ([, prop]) => `max-inline-size: var(${prop});`],
	[/max-inline-\[(.+)\]/, ([, value]) => `max-inline-size: ${value};`],

	// block-size
	[/block-(\d+)/, ([, num]) => `block-size: calc(var(--spacing) * ${num});`],
	[
		/block-(\d+\/\d+)/,
		([, fraction]) => `block-size: calc(${fraction} * 100%);`,
	],
	["block-auto", "block-size: auto;"],
	["block-px", "block-size: 1px;"],
	["block-full", "block-size: 100%;"],
	["block-screen", "block-size: 100vh;"],
	["block-dvh", "block-size: 100dvh;"],
	["block-dvw", "block-size: 100dvw;"],
	["block-lvh", "block-size: 100lvh;"],
	["block-lvw", "block-size: 100lvw;"],
	["block-svh", "block-size: 100svh;"],
	["block-svw", "block-size: 100svw;"],
	["block-min", "block-size: min-content;"],
	["block-max", "block-size: max-content;"],
	["block-fit", "block-size: fit-content;"],
	["block-lh", "block-size: 1lh;"],
	[/block-\((.+)\)/, ([, prop]) => `block-size: var(${prop});`],
	[/block-\[(.+)\]/, ([, value]) => `block-size: ${value};`],

	// min-block-size
	[
		/min-block-(\d+)/,
		([, num]) => `min-block-size: calc(var(--spacing) * ${num});`,
	],
	[
		/min-block-(\d+\/\d+)/,
		([, fraction]) => `min-block-size: calc(${fraction} * 100%);`,
	],
	["min-block-px", "min-block-size: 1px;"],
	["min-block-full", "min-block-size: 100%;"],
	["min-block-screen", "min-block-size: 100vh;"],
	["min-block-dvh", "min-block-size: 100dvh;"],
	["min-block-dvw", "min-block-size: 100dvw;"],
	["min-block-lvh", "min-block-size: 100lvh;"],
	["min-block-lvw", "min-block-size: 100lvw;"],
	["min-block-svw", "min-block-size: 100svw;"],
	["min-block-svh", "min-block-size: 100svh;"],
	["min-block-auto", "min-block-size: auto;"],
	["min-block-min", "min-block-size: min-content;"],
	["min-block-max", "min-block-size: max-content;"],
	["min-block-fit", "min-block-size: fit-content;"],
	["min-block-lh", "min-block-size: 1lh;"],
	[/min-block-\((.+)\)/, ([, prop]) => `min-block-size: var(${prop});`],
	[/min-block-\[(.+)\]/, ([, value]) => `min-block-size: ${value};`],

	// max-block-size
	[
		/max-block-(\d+)/,
		([, num]) => `max-block-size: calc(var(--spacing) * ${num});`,
	],
	[
		/max-block-(\d+\/\d+)/,
		([, fraction]) => `max-block-size: calc(${fraction} * 100%);`,
	],
	["max-block-none", "max-block-size: none;"],
	["max-block-px", "max-block-size: 1px;"],
	["max-block-full", "max-block-size: 100%;"],
	["max-block-screen", "max-block-size: 100vh;"],
	["max-block-dvh", "max-block-size: 100dvh;"],
	["max-block-dvw", "max-block-size: 100dvw;"],
	["max-block-lvh", "max-block-size: 100lvh;"],
	["max-block-lvw", "max-block-size: 100lvw;"],
	["max-block-svh", "max-block-size: 100svh;"],
	["max-block-svw", "max-block-size: 100svw;"],
	["max-block-min", "max-block-size: min-content;"],
	["max-block-max", "max-block-size: max-content;"],
	["max-block-fit", "max-block-size: fit-content;"],
	["max-block-lh", "max-block-size: 1lh;"],
	[/max-block-\((.+)\)/, ([, prop]) => `max-block-size: var(${prop});`],
	[/max-block-\[(.+)\]/, ([, value]) => `max-block-size: ${value};`],
]

export const TYPOGRAPHY: Rule[] = [
	// font-family
	["font-sans", "font-family: var(--font-sans);"],
	["font-serif", "font-family: var(--font-serif);"],
	["font-mono", "font-family: var(--font-mono);"],
	[/font-\((.+)\)/, ([, prop]) => `font-family: var(${prop});`],
	[/font-\[(.+)\]/, ([, value]) => `font-family: ${value};`],

	// font-size
	[
		/text-(xs|sm|base|lg|xl|\dxl)/,
		([, size]) =>
			`font-size: var(--text-${size}); line-height: var(--text-${size}--line-height);`,
	],
	[/text-\((.+)\)/, ([, prop]) => `font-size: var(${prop});`],
	[/text-\[(.+)\]/, ([, value]) => `font-size: ${value};`],

	// font-smoothing
	[
		"antialiased",
		"-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;",
	],
	[
		"subpixel-antialiased",
		"-webkit-font-smoothing: auto; -moz-osx-font-smoothing: auto;",
	],

	// font-style
	["italic", "font-style: italic;"],
	["not-italic", "font-style: normal;"],

	// font-weight
	["font-thin", "font-weight: 100;"],
	["font-extralight", "font-weight: 200;"],
	["font-light", "font-weight: 300;"],
	["font-normal", "font-weight: 400;"],
	["font-medium", "font-weight: 500;"],
	["font-semibold", "font-weight: 600;"],
	["font-bold", "font-weight: 700;"],
	["font-extrabold", "font-weight: 800;"],
	["font-black", "font-weight: 900;"],
	[/font-\((.+)\)/, ([, prop]) => `font-weight: var(${prop});`],
	[/font-\[(.+)\]/, ([, value]) => `font-weight: ${value};`],

	// font-stretch
	["font-stretch-ultra-condensed", "font-stretch: ultra-condensed;"],
	["font-stretch-extra-condensed", "font-stretch: extra-condensed;"],
	["font-stretch-condensed", "font-stretch: condensed;"],
	["font-stretch-semi-condensed", "font-stretch: semi-condensed;"],
	["font-stretch-normal", "font-stretch: normal;"],
	["font-stretch-semi-expanded", "font-stretch: semi-expanded;"],
	["font-stretch-expanded", "font-stretch: expanded;"],
	["font-stretch-extra-expanded", "font-stretch: extra-expanded;"],
	["font-stretch-ultra-expanded", "font-stretch: ultra-expanded;"],
	[/font-stretch-(\d+%)/, ([, pct]) => `font-stretch: ${pct};`],
	[/font-stretch-\((.+)\)/, ([, prop]) => `font-stretch: var(${prop});`],
	[/font-stretch-\[(.+)\]/, ([, value]) => `font-stretch: ${value};`],

	// font-variant-numeric
	["normal-nums", "font-variant-numeric: normal;"],
	["ordinal", "font-variant-numeric: ordinal;"],
	["slashed-zero", "font-variant-numeric: slashed-zero;"],
	["lining-nums", "font-variant-numeric: lining-nums;"],
	["oldstyle-nums", "font-variant-numeric: oldstyle-nums;"],
	["proportional-nums", "font-variant-numeric: proportional-nums;"],
	["tabular-nums", "font-variant-numeric: tabular-nums;"],
	["diagonal-fractions", "font-variant-numeric: diagonal-fractions;"],
	["stacked-fractions", "font-variant-numeric: stacked-fractions;"],

	// font-feature-settings
	[
		/font-features-\[(.+)\]/,
		([, value]) => `font-feature-settings: ${value};`,
	],
	[
		/font-features-\((.+)\)/,
		([, prop]) => `font-feature-settings: var(${prop});`,
	],

	// letter-spacing
	["tracking-tighter", "letter-spacing: var(--tracking-tighter);"],
	["tracking-tight", "letter-spacing: var(--tracking-tight);"],
	["tracking-normal", "letter-spacing: var(--tracking-normal);"],
	["tracking-wide", "letter-spacing: var(--tracking-wide);"],
	["tracking-wider", "letter-spacing: var(--tracking-wider);"],
	["tracking-widest", "letter-spacing: var(--tracking-widest);"],
	[/tracking-\((.+)\)/, ([, prop]) => `letter-spacing: var(${prop});`],
	[/tracking-\[(.+)\]/, ([, value]) => `letter-spacing: ${value};`],

	// line-clamp
	[
		/line-clamp-(\d+)/,
		([, num]) =>
			`overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: ${num};`,
	],
	[
		"line-clamp-none",
		"overflow: visible; display: block; -webkit-box-orient: horizontal; -webkit-line-clamp: unset;",
	],
	[
		/line-clamp-\((.+)\)/,
		([, prop]) =>
			`overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: var(${prop});`,
	],
	[
		/line-clamp-\[(.+)\]/,
		([, value]) =>
			`overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: ${value};`,
	],

	// line-height
	[
		/leading-(\d+)/,
		([, num]) => `line-height: calc(var(--spacing) * ${num});`,
	],
	["leading-none", "line-height: 1;"],
	[/leading-\((.+)\)/, ([, prop]) => `line-height: var(${prop});`],
	[/leading-\[(.+)\]/, ([, value]) => `line-height: ${value};`],
	[
		/text-(xs|sm|md|lg|xl|2xl|3xl|4xl)\/(\d+)/,
		([, size, num]) =>
			`font-size: var(--text-${size}); line-height: calc(var(--spacing) * ${num});`,
	],
	[
		/text-(xs|sm|md|lg|xl|2xl|3xl|4xl)\/\((.+)\)/,
		([, size, prop]) =>
			`font-size: var(--text-${size}); line-height: var(${prop});`,
	],
	[
		/text-(xs|sm|md|lg|xl|2xl|3xl|4xl)\/\[(.+)\]/,
		([, size, value]) =>
			`font-size: var(--text-${size}); line-height: ${value};`,
	],

	// list-style-image
	[/list-image-\[(.+)\]/, ([, value]) => `list-style-image: ${value};`],
	[/list-image-\((.+)\)/, ([, prop]) => `list-style-image: var(${prop});`],
	["list-image-none", "list-style-image: none;"],

	// list-style-position
	["list-inside", "list-style-position: inside;"],
	["list-outside", "list-style-position: outside;"],

	// list-style-type
	["list-disc", "list-style-type: disc;"],
	["list-decimal", "list-style-type: decimal;"],
	["list-none", "list-style-type: none;"],
	[/list-\((.+)\)/, ([, prop]) => `list-style-type: var(${prop});`],
	[/list-\[(.+)\]/, ([, value]) => `list-style-type: ${value};`],

	// text-align
	["text-left", "text-align: left;"],
	["text-center", "text-align: center;"],
	["text-right", "text-align: right;"],
	["text-justify", "text-align: justify;"],
	["text-start", "text-align: start;"],
	["text-end", "text-align: end;"],

	// text-color
	["text-inherit", "color: inherit;"],
	["text-current", "color: currentColor;"],
	["text-transparent", "color: transparent;"],
	[/text-([a-z]+(?:-\d+)?)/, ([, color]) => `color: var(--color-${color});`],
	[/text-\((.+)\)/, ([, prop]) => `color: var(${prop});`],
	[/text-\[(.+)\]/, ([, value]) => `color: ${value};`],

	// text-decoration-line
	["underline", "text-decoration-line: underline;"],
	["overline", "text-decoration-line: overline;"],
	["line-through", "text-decoration-line: line-through;"],
	["no-underline", "text-decoration-line: none;"],

	// text-decoration-color
	["decoration-inherit", "text-decoration-color: inherit;"],
	["decoration-current", "text-decoration-color: currentColor;"],
	["decoration-transparent", "text-decoration-color: transparent;"],
	[
		/decoration-([a-z]+(?:-\d+)?)/,
		([, color]) => `text-decoration-color: var(--color-${color});`,
	],
	[
		/decoration-\((.+)\)/,
		([, prop]) => `text-decoration-color: var(${prop});`,
	],
	[/decoration-\[(.+)\]/, ([, value]) => `text-decoration-color: ${value};`],

	// text-decoration-style
	["decoration-solid", "text-decoration-style: solid;"],
	["decoration-double", "text-decoration-style: double;"],
	["decoration-dotted", "text-decoration-style: dotted;"],
	["decoration-dashed", "text-decoration-style: dashed;"],
	["decoration-wavy", "text-decoration-style: wavy;"],

	// text-decoration-thickness
	[/decoration-(\d+)/, ([, num]) => `text-decoration-thickness: ${num}px;`],
	["decoration-from-font", "text-decoration-thickness: from-font;"],
	["decoration-auto", "text-decoration-thickness: auto;"],
	[
		/decoration-\((.+)\)/,
		([, prop]) => `text-decoration-thickness: var(${prop});`,
	],
	[
		/decoration-\[(.+)\]/,
		([, value]) => `text-decoration-thickness: ${value};`,
	],

	// text-underline-offset
	[/underline-offset-(\d+)/, ([, num]) => `text-underline-offset: ${num}px;`],
	[
		/-underline-offset-(\d+)/,
		([, num]) => `text-underline-offset: calc(${num}px * -1);`,
	],
	["underline-offset-auto", "text-underline-offset: auto;"],
	[
		/underline-offset-\((.+)\)/,
		([, prop]) => `text-underline-offset: var(${prop});`,
	],
	[
		/underline-offset-\[(.+)\]/,
		([, value]) => `text-underline-offset: ${value};`,
	],

	// text-transform
	["uppercase", "text-transform: uppercase;"],
	["lowercase", "text-transform: lowercase;"],
	["capitalize", "text-transform: capitalize;"],
	["normal-case", "text-transform: none;"],

	// text-overflow
	[
		"truncate",
		"overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",
	],
	["text-ellipsis", "text-overflow: ellipsis;"],
	["text-clip", "text-overflow: clip;"],

	// text-wrap
	["text-wrap", "text-wrap: wrap;"],
	["text-nowrap", "text-wrap: nowrap;"],
	["text-balance", "text-wrap: balance;"],
	["text-pretty", "text-wrap: pretty;"],

	// text-indent
	[
		/indent-(\d+)/,
		([, num]) => `text-indent: calc(var(--spacing) * ${num});`,
	],
	[
		/-indent-(\d+)/,
		([, num]) => `text-indent: calc(var(--spacing) * -${num});`,
	],
	["indent-px", "text-indent: 1px;"],
	["-indent-px", "text-indent: -1px;"],
	[/indent-\((.+)\)/, ([, prop]) => `text-indent: var(${prop});`],
	[/indent-\[(.+)\]/, ([, value]) => `text-indent: ${value};`],

	// vertical-align
	["align-baseline", "vertical-align: baseline;"],
	["align-top", "vertical-align: top;"],
	["align-middle", "vertical-align: middle;"],
	["align-bottom", "vertical-align: bottom;"],
	["align-text-top", "vertical-align: text-top;"],
	["align-text-bottom", "vertical-align: text-bottom;"],
	["align-sub", "vertical-align: sub;"],
	["align-super", "vertical-align: super;"],
	[/align-\((.+)\)/, ([, prop]) => `vertical-align: var(${prop});`],
	[/align-\[(.+)\]/, ([, value]) => `vertical-align: ${value};`],

	// white-space
	["whitespace-normal", "white-space: normal;"],
	["whitespace-nowrap", "white-space: nowrap;"],
	["whitespace-pre", "white-space: pre;"],
	["whitespace-pre-line", "white-space: pre-line;"],
	["whitespace-pre-wrap", "white-space: pre-wrap;"],
	["whitespace-break-spaces", "white-space: break-spaces;"],

	// word-break
	["break-normal", "word-break: normal;"],
	["break-all", "word-break: break-all;"],
	["break-keep", "word-break: keep-all;"],

	// overflow-wrap
	["wrap-break-word", "overflow-wrap: break-word;"],
	["wrap-anywhere", "overflow-wrap: anywhere;"],
	["wrap-normal", "overflow-wrap: normal;"],

	// hyphens
	["hyphens-none", "hyphens: none;"],
	["hyphens-manual", "hyphens: manual;"],
	["hyphens-auto", "hyphens: auto;"],

	// content
	[/content-\[(.+)\]/, ([, value]) => `content: ${value};`],
	[/content-\((.+)\)/, ([, prop]) => `content: var(${prop});`],
	["content-none", "content: none;"],
]

export const BACKGROUNDS: Rule[] = [
	// background-attachment
	["bg-fixed", "background-attachment: fixed;"],
	["bg-local", "background-attachment: local;"],
	["bg-scroll", "background-attachment: scroll;"],

	// background-clip
	["bg-clip-border", "background-clip: border-box;"],
	["bg-clip-padding", "background-clip: padding-box;"],
	["bg-clip-content", "background-clip: content-box;"],
	["bg-clip-text", "background-clip: text;"],

	// background-color
	["bg-inherit", "background-color: inherit;"],
	["bg-current", "background-color: currentColor;"],
	["bg-transparent", "background-color: transparent;"],
	[
		/bg-([a-z]+(?:-\d+)?)/,
		([, color]) => `background-color: var(--color-${color});`,
	],
	[/bg-\((.+)\)/, ([, prop]) => `background-color: var(${prop});`],
	[/bg-\[(.+)\]/, ([, value]) => `background-color: ${value};`],

	// background-image
	[/bg-\[(.+)\]/, ([, value]) => `background-image: ${value};`],
	[/bg-\((.+)\)/, ([, prop]) => `background-image: var(${prop});`],
	["bg-none", "background-image: none;"],
	[
		"bg-linear-to-t",
		"background-image: linear-gradient(to top, var(--tw-gradient-stops));",
	],
	[
		"bg-linear-to-tr",
		"background-image: linear-gradient(to top right, var(--tw-gradient-stops));",
	],
	[
		"bg-linear-to-r",
		"background-image: linear-gradient(to right, var(--tw-gradient-stops));",
	],
	[
		"bg-linear-to-br",
		"background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));",
	],
	[
		"bg-linear-to-b",
		"background-image: linear-gradient(to bottom, var(--tw-gradient-stops));",
	],
	[
		"bg-linear-to-bl",
		"background-image: linear-gradient(to bottom left, var(--tw-gradient-stops));",
	],
	[
		"bg-linear-to-l",
		"background-image: linear-gradient(to left, var(--tw-gradient-stops));",
	],
	[
		"bg-linear-to-tl",
		"background-image: linear-gradient(to top left, var(--tw-gradient-stops));",
	],
	[
		/bg-linear-(\d+deg)/,
		([, angle]) =>
			`background-image: linear-gradient(${angle} in oklab, var(--tw-gradient-stops));`,
	],
	[
		/-bg-linear-(\d+deg)/,
		([, angle]) =>
			`background-image: linear-gradient(-${angle} in oklab, var(--tw-gradient-stops));`,
	],
	[
		/bg-linear-\((.+)\)/,
		([, prop]) =>
			`background-image: linear-gradient(var(--tw-gradient-stops, var(${prop})));`,
	],
	[
		/bg-linear-\[(.+)\]/,
		([, value]) =>
			`background-image: linear-gradient(var(--tw-gradient-stops, ${value}));`,
	],
	[
		"bg-radial",
		"background-image: radial-gradient(in oklab, var(--tw-gradient-stops));",
	],
	[
		/bg-radial-\((.+)\)/,
		([, prop]) =>
			`background-image: radial-gradient(var(--tw-gradient-stops, var(${prop})));`,
	],
	[
		/bg-radial-\[(.+)\]/,
		([, value]) =>
			`background-image: radial-gradient(var(--tw-gradient-stops, ${value}));`,
	],
	[
		/bg-conic-(\d+deg)/,
		([, angle]) =>
			`background-image: conic-gradient(from ${angle} in oklab, var(--tw-gradient-stops));`,
	],
	[
		/-bg-conic-(\d+deg)/,
		([, angle]) =>
			`background-image: conic-gradient(from -${angle} in oklab, var(--tw-gradient-stops));`,
	],
	[/bg-conic-\((.+)\)/, ([, prop]) => `background-image: var(${prop});`],
	[/bg-conic-\[(.+)\]/, ([, value]) => `background-image: ${value};`],
	[/from-(\d+%)/, ([, value]) => `--tw-gradient-from-position: ${value};`],
	[/from-(.+)/, ([, value]) => `--tw-gradient-from: ${value};`],
	[/from-\((.+)\)/, ([, prop]) => `--tw-gradient-from: var(${prop});`],
	[/from-\[(.+)\]/, ([, value]) => `--tw-gradient-from: ${value};`],
	[/via-(\d+%)/, ([, value]) => `--tw-gradient-via-position: ${value};`],
	[/via-(.+)/, ([, value]) => `--tw-gradient-via: ${value};`],
	[/via-\((.+)\)/, ([, prop]) => `--tw-gradient-via: var(${prop});`],
	[/via-\[(.+)\]/, ([, value]) => `--tw-gradient-via: ${value};`],
	[/to-(\d+%)/, ([, value]) => `--tw-gradient-to-position: ${value};`],
	[/to-(.+)/, ([, value]) => `--tw-gradient-to: ${value};`],
	[/to-\((.+)\)/, ([, prop]) => `--tw-gradient-to: var(${prop});`],
	[/to-\[(.+)\]/, ([, value]) => `--tw-gradient-to: ${value};`],

	// background-origin
	["bg-origin-border", "background-origin: border-box;"],
	["bg-origin-padding", "background-origin: padding-box;"],
	["bg-origin-content", "background-origin: content-box;"],

	// background-position
	["bg-top-left", "background-position: top left;"],
	["bg-top", "background-position: top;"],
	["bg-top-right", "background-position: top right;"],
	["bg-left", "background-position: left;"],
	["bg-center", "background-position: center;"],
	["bg-right", "background-position: right;"],
	["bg-bottom-left", "background-position: bottom left;"],
	["bg-bottom", "background-position: bottom;"],
	["bg-bottom-right", "background-position: bottom right;"],
	[
		/bg-position-\((.+)\)/,
		([, prop]) => `background-position: var(${prop});`,
	],
	[/bg-position-\[(.+)\]/, ([, value]) => `background-position: ${value};`],

	// background-repeat
	["bg-repeat", "background-repeat: repeat;"],
	["bg-repeat-x", "background-repeat: repeat-x;"],
	["bg-repeat-y", "background-repeat: repeat-y;"],
	["bg-repeat-space", "background-repeat: space;"],
	["bg-repeat-round", "background-repeat: round;"],
	["bg-no-repeat", "background-repeat: no-repeat;"],

	// background-size
	["bg-auto", "background-size: auto;"],
	["bg-cover", "background-size: cover;"],
	["bg-contain", "background-size: contain;"],
	[/bg-size-\((.+)\)/, ([, prop]) => `background-size: var(${prop});`],
	[/bg-size-\[(.+)\]/, ([, value]) => `background-size: ${value};`],
]

function borderSide(side: string | undefined): string[] {
	if (!side) unreachable()
	const out = {
		s: ["start-start", "end-start"],
		e: ["start-end", "end-end"],
		t: ["top-left", "top-right"],
		r: ["top-right", "bottom-right"],
		b: ["bottom-right", "bottom-left"],
		l: ["top-left", "bottom-left"],
	}[side]
	if (!out) unreachable()
	return out
}

function borderRadius(radius: string | undefined): string {
	if (!radius) unreachable()
	const out = {
		ss: "start-start",
		se: "start-end",
		ee: "end-end",
		es: "end-start",
		tl: "top-left",
		tr: "top-right",
		br: "bottom-right",
		bl: "bottom-left",
	}[radius]
	if (!out) unreachable()
	return out
}

function borderSideDir(side: string | undefined): string {
	if (!side) unreachable()
	const out = {
		x: "inline",
		y: "block",
		s: "inline-start",
		e: "inline-end",
	}[side]
	if (!out) unreachable()
	return out
}

function borderSideBlock(side: string | undefined): string {
	if (!side) unreachable()
	const out = {
		bs: "block-start",
		be: "block-end",
		t: "top",
		r: "right",
		b: "bottom",
		l: "left",
	}[side]
	if (!out) unreachable()
	return out
}

export const BORDERS: Rule[] = [
	// border-radius (base)
	[
		/rounded-(xs|sm|md|lg|xl|2xl|3xl|4xl)/,
		([, size]) => `border-radius: var(--radius-${size});`,
	],
	["rounded-none", "border-radius: 0;"],
	["rounded-full", "border-radius: calc(infinity * 1px);"],
	[/rounded-\((.+)\)/, ([, prop]) => `border-radius: var(${prop});`],
	[/rounded-\[(.+)\]/, ([, value]) => `border-radius: ${value};`],
	[
		/rounded-([setrbl])-none/,
		([, side]) =>
			borderSide(side)
				.map(p => `border-${p}-radius: 0;`)
				.join(" "),
	],
	[
		/rounded-([setrbl])-full/,
		([, side]) =>
			borderSide(side)
				.map(p => `border-${p}-radius: calc(infinity * 1px);`)
				.join(" "),
	],
	[
		/rounded-([setrbl])-(xs|sm|md|lg|xl|2xl|3xl|4xl)/,
		([, side, size]) =>
			borderSide(side)
				.map(p => `border-${p}-radius: var(--radius-${size});`)
				.join(" "),
	],
	[
		/rounded-([setrbl])-\((.+)\)/,
		([, side, prop]) =>
			borderSide(side)
				.map(p => `border-${p}-radius: var(${prop});`)
				.join(" "),
	],
	[
		/rounded-([setrbl])-\[(.+)\]/,
		([, side, value]) =>
			borderSide(side)
				.map(p => `border-${p}-radius: ${value};`)
				.join(" "),
	],
	[
		/rounded-(ss|se|ee|es|tl|tr|br|bl)-none/,
		([, br]) => `border-${borderRadius(br)}-radius: 0;`,
	],
	[
		/rounded-(ss|se|ee|es|tl|tr|br|bl)-full/,
		([, br]) => `border-${borderRadius(br)}-radius: calc(infinity * 1px);`,
	],
	[
		/rounded-(ss|se|ee|es|tl|tr|br|bl)-(xs|sm|md|lg|xl|2xl|3xl|4xl)/,
		([, br, size]) =>
			`border-${borderRadius(br)}-radius: var(--radius-${size});`,
	],
	[
		/rounded-(ss|se|ee|es|tl|tr|br|bl)-\((.+)\)/,
		([, br, prop]) => `border-${borderRadius(br)}-radius: var(${prop});`,
	],
	[
		/rounded-(ss|se|ee|es|tl|tr|br|bl)-\[(.+)\]/,
		([, br, value]) => `border-${borderRadius(br)}-radius: ${value};`,
	],

	// border-width
	["border", "border-width: 1px;"],
	[/border-(\d+)/, ([, num]) => `border-width: ${num}px;`],
	[/border-\((.+)\)/, ([, prop]) => `border-width: var(${prop});`],
	[/border-\[(.+)\]/, ([, value]) => `border-width: ${value};`],
	[
		/border-([xyse])(?:-(\d+))?/,
		([, side, num]) =>
			`border-${borderSideDir(side)}-width: ${num ? `${num}px` : "1px"};`,
	],
	[
		/border-([xyse])-\((.+)\)/,
		([, side, prop]) =>
			`border-${borderSideDir(side)}-width: var(${prop});`,
	],
	[
		/border-([xyse])-\[(.+)\]/,
		([, side, value]) => `border-${borderSideDir(side)}-width: ${value};`,
	],
	[
		/border-(bs|be|t|r|b|l)(?:-(\d+))?/,
		([, side, num]) =>
			`border-${borderSideBlock(side)}-width: ${num ? `${num}px` : "1px"};`,
	],
	[
		/border-(bs|be|t|r|b|l)-\((.+)\)/,
		([, side, prop]) =>
			`border-${borderSideBlock(side)}-width: var(${prop});`,
	],
	[
		/border-(bs|be|t|r|b|l)-\[(.+)\]/,
		([, side, value]) => `border-${borderSideBlock(side)}-width: ${value};`,
	],
	[
		/divide-x(?:-(\d+))?/,
		([, num]) =>
			`& > :not(:last-child) { border-inline-start-width: 0px; border-inline-end-width: ${num || 1}px; }`,
	],
	[
		/divide-x-\((.+)\)/,
		([, prop]) =>
			`& > :not(:last-child) { border-inline-start-width: 0px; border-inline-end-width: var(${prop}); }`,
	],
	[
		/divide-x-\[(.+)\]/,
		([, value]) =>
			`& > :not(:last-child) { border-inline-start-width: 0px; border-inline-end-width: ${value}; }`,
	],
	[
		/divide-y(?:-(\d+))?/,
		([, num]) =>
			`& > :not(:last-child) { border-top-width: 0px; border-bottom-width: ${num || 1}px; }`,
	],
	[
		/divide-y-\((.+)\)/,
		([, prop]) =>
			`& > :not(:last-child) { border-top-width: 0px; border-bottom-width: var(${prop}); }`,
	],
	[
		/divide-y-\[(.+)\]/,
		([, value]) =>
			`& > :not(:last-child) { border-top-width: 0px; border-bottom-width: ${value}; }`,
	],
	["divide-x-reverse", "--tw-divide-x-reverse: 1;"],
	["divide-y-reverse", "--tw-divide-y-reverse: 1;"],

	// border-color
	["border-inherit", "border-color: inherit;"],
	["border-current", "border-color: currentColor;"],
	["border-transparent", "border-color: transparent;"],
	[
		/border-([a-z]+(?:-\d+)?)/,
		([, color]) => `border-color: var(--color-${color});`,
	],
	[/border-\((.+)\)/, ([, prop]) => `border-color: var(${prop});`],
	[/border-\[(.+)\]/, ([, value]) => `border-color: ${value};`],

	// border-style
	["border-solid", "border-style: solid;"],
	["border-dashed", "border-style: dashed;"],
	["border-dotted", "border-style: dotted;"],
	["border-double", "border-style: double;"],
	["border-hidden", "border-style: hidden;"],
	["border-none", "border-style: none;"],

	// divide-style
	["divide-solid", "& > :not(:last-child) { border-style: solid; }"],
	["divide-dashed", "& > :not(:last-child) { border-style: dashed; }"],
	["divide-dotted", "& > :not(:last-child) { border-style: dotted; }"],
	["divide-double", "& > :not(:last-child) { border-style: double; }"],
	["divide-hidden", "& > :not(:last-child) { border-style: hidden; }"],
	["divide-none", "& > :not(:last-child) { border-style: none; }"],

	// outline-width
	["outline", "outline-width: 1px;"],
	[/outline-(\d+)/, ([, num]) => `outline-width: ${num}px;`],
	[/outline-\((.+)\)/, ([, prop]) => `outline-width: var(${prop});`],
	[/outline-\[(.+)\]/, ([, value]) => `outline-width: ${value};`],

	// outline-color
	["outline-inherit", "outline-color: inherit;"],
	["outline-current", "outline-color: currentColor;"],
	["outline-transparent", "outline-color: transparent;"],
	[
		/outline-([a-z]+(?:-\d+)?)/,
		([, color]) => `outline-color: var(--color-${color});`,
	],
	[/outline-\((.+)\)/, ([, prop]) => `outline-color: var(${prop});`],
	[/outline-\[(.+)\]/, ([, value]) => `outline-color: ${value};`],

	// outline-style
	["outline-solid", "outline-style: solid;"],
	["outline-dashed", "outline-style: dashed;"],
	["outline-dotted", "outline-style: dotted;"],
	["outline-double", "outline-style: double;"],
	["outline-none", "outline-style: none;"],
	["outline-hidden", "outline: 2px solid transparent; outline-offset: 2px;"],

	// outline-offset
	[/outline-offset-(\d+)/, ([, num]) => `outline-offset: ${num}px;`],
	[
		/-outline-offset-(\d+)/,
		([, num]) => `outline-offset: calc(${num}px * -1);`,
	],
	[/outline-offset-\((.+)\)/, ([, prop]) => `outline-offset: var(${prop});`],
	[/outline-offset-\[(.+)\]/, ([, value]) => `outline-offset: ${value};`],
]

export const TABLES: Rule[] = [
	// border-collapse
	["border-collapse", "border-collapse: collapse;"],
	["border-separate", "border-collapse: separate;"],

	// TODO: border-spacing

	// table-layout
	["table-auto", "table-layout: auto;"],
	["table-fixed", "table-layout: fixed;"],

	// caption-side
	["caption-top", "caption-side: top;"],
	["caption-bottom", "caption-side: bottom;"],
]

export const WIND4_RULES: Rule[] = [
	...LAYOUT,
	...FLEXBOX_GRID,
	...SPACING,
	...SIZING,
	...TYPOGRAPHY,
	...BACKGROUNDS,
	...BORDERS,
	...TABLES,
]

function verbatimState(...names: string[]): State[] {
	return names.flatMap(name => [
		[name, css => `&:${name} { ${css} }`],
		[`not-${name}`, css => `&:not(*:${name}) { ${css} }`],
	])
}

function mediaState(pairs: Record<string, string>): State[] {
	return Object.entries(pairs).flatMap(([name, selector]) => [
		[name, css => `@media (${selector}) { ${css} }`],
		[`not-${name}`, css => `@media not (${selector}) { ${css} }`],
	])
}

export const WIND4_STATES: State[] = [
	["hover", css => `&:hover { @media (hover: hover) { ${css} } }`],
	[
		"not-hover",
		css => `&:not(*:hover) { ${css} } @media not (hover: hover) { ${css} }`,
	],

	...verbatimState(
		"focus",
		"focus-within",
		"focus-visible",
		"active",
		"target",

		"first",
		"last",
		"only",

		"first-of-type",
		"last-of-type",
		"only-of-type",

		"empty",
		"disabled",
		"enabled",
		"checked",
		"indeterminate",
		"default",
		"optional",
		"valid",
		"invalid",
		"user-valid",
		"user-invalid",
		"in-range",
		"out-of-range",
		"placeholder-shown",
		"details-css",
		"autofill",
		"read-only",
	),

	[/\*/, css => `&:is(& > *) { ${css} }`],
	[/\*\*/, css => `&:is(& *) { ${css} }`],

	[/has-\[(.*)\]/, (css, [, value]) => `&:has(*:is(${value})) { ${css} }`],
	[
		/group-\[(.*)\]/,
		(css, [, value]) => `&:is(:where(.group):is(${value}) *) { ${css} }`,
	],
	[
		/peer-\[(.*)\]/,
		(css, [, value]) => `&:is(:where(.peer):is(${value}) ~ *) { ${css} }`,
	],
	[/in-\[(.*)\]/, (css, [, value]) => `:where(*:is(${value})) & { ${css} }`],
	[/not-\[(.*)\]/, (css, [, value]) => `&:not(*:is(${value})) { ${css} }`],
	[
		/peer-has-\[(.*)\]/,
		(css, [, value]) =>
			`&:is(:where(.peer):has(*:is(${value})) ~ *) { ${css} }`,
	],

	["odd", css => `&:nth-child(odd) { ${css} }`],
	["even", css => `&:nth-child(even) { ${css} }`],

	[/nth-(\d+)/, (css, [, num]) => `&:nth-child(${num}) { ${css} }`],
	[/nth-\[(.+)\]/, (css, [, value]) => `&:nth-child(${value}) { ${css} }`],
	[/nth-(\d+)/, (css, [, num]) => `&:nth-child(${num}) { ${css} }`],
	[/nth-\[(.+)\]/, (css, [, value]) => `&:nth-child(${value}) { ${css} }`],
	[/nth-last-(\d+)/, (css, [, num]) => `&:nth-last-child(${num}) { ${css} }`],
	[
		/nth-last-\[(.+)\]/,
		(css, [, value]) => `&:nth-last-child(${value}) { ${css} }`,
	],
	[/nth-of-type-(\d+)/, (css, [, num]) => `&:nth-of-type(${num}) { ${css} }`],
	[
		/nth-of-type-\[(.+)\]/,
		(css, [, value]) => `&:nth-of-type(${value}) { ${css} }`,
	],
	[
		/nth-last-of-type-(\d+)/,
		(css, [, num]) => `&:nth-last-of-type(${num}) { ${css} }`,
	],
	[
		/nth-last-of-type-\[(.+)\]/,
		(css, [, value]) => `&:nth-last-of-type(${value}) { ${css} }`,
	],

	// sizes
	["sm", css => `@media (width >= 40rem) { ${css} }`],
	["md", css => `@media (width >= 48rem) { ${css} }`],
	["lg", css => `@media (width >= 64rem) { ${css} }`],
	["xl", css => `@media (width >= 80rem) { ${css} }`],
	["2xl", css => `@media (width >= 96rem) { ${css} }`],
	[
		/min-\[(.*)\]/,
		(css, [, value]) => `@media (width >= ${value}) { ${css} }`,
	],

	["max-sm", css => `@media (width < 40rem) { ${css} }`],
	["max-md", css => `@media (width < 48rem) { ${css} }`],
	["max-lg", css => `@media (width < 64rem) { ${css} }`],
	["max-xl", css => `@media (width < 80rem) { ${css} }`],
	["max-2xl", css => `@media (width < 96rem) { ${css} }`],
	[
		/max-\[(.*)\]/,
		(css, [, value]) => `@media (width < ${value}) { ${css} }`,
	],

	...mediaState({
		dark: "prefers-color-scheme: dark",
		"motion-safe": "prefers-reduced-motion: no-preference",
		"motion-reduce": "prefers-reduced-motion: reduce",
		"contrast-more": "prefers-contrast: more",
		"contrast-less": "prefers-contrast: less",
		"forced-colors": "forced-colors: active",
		"inverted-colors": "inverted-colors: inverted",

		"pointer-fine": "pointer: fine",
		"pointer-coarse": "pointer: coarse",
		"pointer-none": "pointer: none",
		"any-pointer-fine": "any-pointer: fine",
		"any-pointer-coarse": "any-pointer: coarse",
		"any-pointer-none": "any-pointer: none",
		portrait: "orientation: portrait",
		landscape: "orientation: landscape",
		noscript: "scripting: none",
	}),
	["print", css => `@media print { ${css} }`],

	[
		/\[(.*)\]/,
		(css, [, selector]) => `${selector?.replace("_", " ")} { ${css} }`,
	],
]

export const WIND4_THEME = {
	"--font-sans":
		"ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
	"--font-mono":
		"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",

	"--spacing": "0.25rem",

	// colors
	"--color-red-50": "oklch(97.1% 0.013 17.38)",
	"--color-red-100": "oklch(93.6% 0.032 17.717)",
	"--color-red-200": "oklch(88.5% 0.062 18.334)",
	"--color-red-300": "oklch(80.8% 0.114 19.571)",
	"--color-red-400": "oklch(70.4% 0.191 22.216)",
	"--color-red-500": "oklch(63.7% 0.237 25.331)",
	"--color-red-600": "oklch(57.7% 0.245 27.325)",
	"--color-red-700": "oklch(50.5% 0.213 27.518)",
	"--color-red-800": "oklch(44.4% 0.177 26.899)",
	"--color-red-900": "oklch(39.6% 0.141 25.723)",
	"--color-red-950": "oklch(25.8% 0.092 26.042)",
	"--color-orange-50": "oklch(98% 0.016 73.684)",
	"--color-orange-100": "oklch(95.4% 0.038 75.164)",
	"--color-orange-200": "oklch(90.1% 0.076 70.697)",
	"--color-orange-300": "oklch(83.7% 0.128 66.29)",
	"--color-orange-400": "oklch(75% 0.183 55.934)",
	"--color-orange-500": "oklch(70.5% 0.213 47.604)",
	"--color-orange-600": "oklch(64.6% 0.222 41.116)",
	"--color-orange-700": "oklch(55.3% 0.195 38.402)",
	"--color-orange-800": "oklch(47% 0.157 37.304)",
	"--color-orange-900": "oklch(40.8% 0.123 38.172)",
	"--color-orange-950": "oklch(26.6% 0.079 36.259)",
	"--color-amber-50": "oklch(98.7% 0.022 95.277)",
	"--color-amber-100": "oklch(96.2% 0.059 95.617)",
	"--color-amber-200": "oklch(92.4% 0.12 95.746)",
	"--color-amber-300": "oklch(87.9% 0.169 91.605)",
	"--color-amber-400": "oklch(82.8% 0.189 84.429)",
	"--color-amber-500": "oklch(76.9% 0.188 70.08)",
	"--color-amber-600": "oklch(66.6% 0.179 58.318)",
	"--color-amber-700": "oklch(55.5% 0.163 48.998)",
	"--color-amber-800": "oklch(47.3% 0.137 46.201)",
	"--color-amber-900": "oklch(41.4% 0.112 45.904)",
	"--color-amber-950": "oklch(27.9% 0.077 45.635)",
	"--color-yellow-50": "oklch(98.7% 0.026 102.212)",
	"--color-yellow-100": "oklch(97.3% 0.071 103.193)",
	"--color-yellow-200": "oklch(94.5% 0.129 101.54)",
	"--color-yellow-300": "oklch(90.5% 0.182 98.111)",
	"--color-yellow-400": "oklch(85.2% 0.199 91.936)",
	"--color-yellow-500": "oklch(79.5% 0.184 86.047)",
	"--color-yellow-600": "oklch(68.1% 0.162 75.834)",
	"--color-yellow-700": "oklch(55.4% 0.135 66.442)",
	"--color-yellow-800": "oklch(47.6% 0.114 61.907)",
	"--color-yellow-900": "oklch(42.1% 0.095 57.708)",
	"--color-yellow-950": "oklch(28.6% 0.066 53.813)",
	"--color-lime-50": "oklch(98.6% 0.031 120.757)",
	"--color-lime-100": "oklch(96.7% 0.067 122.328)",
	"--color-lime-200": "oklch(93.8% 0.127 124.321)",
	"--color-lime-300": "oklch(89.7% 0.196 126.665)",
	"--color-lime-400": "oklch(84.1% 0.238 128.85)",
	"--color-lime-500": "oklch(76.8% 0.233 130.85)",
	"--color-lime-600": "oklch(64.8% 0.2 131.684)",
	"--color-lime-700": "oklch(53.2% 0.157 131.589)",
	"--color-lime-800": "oklch(45.3% 0.124 130.933)",
	"--color-lime-900": "oklch(40.5% 0.101 131.063)",
	"--color-lime-950": "oklch(27.4% 0.072 132.109)",
	"--color-green-50": "oklch(98.2% 0.018 155.826)",
	"--color-green-100": "oklch(96.2% 0.044 156.743)",
	"--color-green-200": "oklch(92.5% 0.084 155.995)",
	"--color-green-300": "oklch(87.1% 0.15 154.449)",
	"--color-green-400": "oklch(79.2% 0.209 151.711)",
	"--color-green-500": "oklch(72.3% 0.219 149.579)",
	"--color-green-600": "oklch(62.7% 0.194 149.214)",
	"--color-green-700": "oklch(52.7% 0.154 150.069)",
	"--color-green-800": "oklch(44.8% 0.119 151.328)",
	"--color-green-900": "oklch(39.3% 0.095 152.535)",
	"--color-green-950": "oklch(26.6% 0.065 152.934)",
	"--color-emerald-50": "oklch(97.9% 0.021 166.113)",
	"--color-emerald-100": "oklch(95% 0.052 163.051)",
	"--color-emerald-200": "oklch(90.5% 0.093 164.15)",
	"--color-emerald-300": "oklch(84.5% 0.143 164.978)",
	"--color-emerald-400": "oklch(76.5% 0.177 163.223)",
	"--color-emerald-500": "oklch(69.6% 0.17 162.48)",
	"--color-emerald-600": "oklch(59.6% 0.145 163.225)",
	"--color-emerald-700": "oklch(50.8% 0.118 165.612)",
	"--color-emerald-800": "oklch(43.2% 0.095 166.913)",
	"--color-emerald-900": "oklch(37.8% 0.077 168.94)",
	"--color-emerald-950": "oklch(26.2% 0.051 172.552)",
	"--color-teal-50": "oklch(98.4% 0.014 180.72)",
	"--color-teal-100": "oklch(95.3% 0.051 180.801)",
	"--color-teal-200": "oklch(91% 0.096 180.426)",
	"--color-teal-300": "oklch(85.5% 0.138 181.071)",
	"--color-teal-400": "oklch(77.7% 0.152 181.912)",
	"--color-teal-500": "oklch(70.4% 0.14 182.503)",
	"--color-teal-600": "oklch(60% 0.118 184.704)",
	"--color-teal-700": "oklch(51.1% 0.096 186.391)",
	"--color-teal-800": "oklch(43.7% 0.078 188.216)",
	"--color-teal-900": "oklch(38.6% 0.063 188.416)",
	"--color-teal-950": "oklch(27.7% 0.046 192.524)",
	"--color-cyan-50": "oklch(98.4% 0.019 200.873)",
	"--color-cyan-100": "oklch(95.6% 0.045 203.388)",
	"--color-cyan-200": "oklch(91.7% 0.08 205.041)",
	"--color-cyan-300": "oklch(86.5% 0.127 207.078)",
	"--color-cyan-400": "oklch(78.9% 0.154 211.53)",
	"--color-cyan-500": "oklch(71.5% 0.143 215.221)",
	"--color-cyan-600": "oklch(60.9% 0.126 221.723)",
	"--color-cyan-700": "oklch(52% 0.105 223.128)",
	"--color-cyan-800": "oklch(45% 0.085 224.283)",
	"--color-cyan-900": "oklch(39.8% 0.07 227.392)",
	"--color-cyan-950": "oklch(30.2% 0.056 229.695)",
	"--color-sky-50": "oklch(97.7% 0.013 236.62)",
	"--color-sky-100": "oklch(95.1% 0.026 236.824)",
	"--color-sky-200": "oklch(90.1% 0.058 230.902)",
	"--color-sky-300": "oklch(82.8% 0.111 230.318)",
	"--color-sky-400": "oklch(74.6% 0.16 232.661)",
	"--color-sky-500": "oklch(68.5% 0.169 237.323)",
	"--color-sky-600": "oklch(58.8% 0.158 241.966)",
	"--color-sky-700": "oklch(50% 0.134 242.749)",
	"--color-sky-800": "oklch(44.3% 0.11 240.79)",
	"--color-sky-900": "oklch(39.1% 0.09 240.876)",
	"--color-sky-950": "oklch(29.3% 0.066 243.157)",
	"--color-blue-50": "oklch(97% 0.014 254.604)",
	"--color-blue-100": "oklch(93.2% 0.032 255.585)",
	"--color-blue-200": "oklch(88.2% 0.059 254.128)",
	"--color-blue-300": "oklch(80.9% 0.105 251.813)",
	"--color-blue-400": "oklch(70.7% 0.165 254.624)",
	"--color-blue-500": "oklch(62.3% 0.214 259.815)",
	"--color-blue-600": "oklch(54.6% 0.245 262.881)",
	"--color-blue-700": "oklch(48.8% 0.243 264.376)",
	"--color-blue-800": "oklch(42.4% 0.199 265.638)",
	"--color-blue-900": "oklch(37.9% 0.146 265.522)",
	"--color-blue-950": "oklch(28.2% 0.091 267.935)",
	"--color-indigo-50": "oklch(96.2% 0.018 272.314)",
	"--color-indigo-100": "oklch(93% 0.034 272.788)",
	"--color-indigo-200": "oklch(87% 0.065 274.039)",
	"--color-indigo-300": "oklch(78.5% 0.115 274.713)",
	"--color-indigo-400": "oklch(67.3% 0.182 276.935)",
	"--color-indigo-500": "oklch(58.5% 0.233 277.117)",
	"--color-indigo-600": "oklch(51.1% 0.262 276.966)",
	"--color-indigo-700": "oklch(45.7% 0.24 277.023)",
	"--color-indigo-800": "oklch(39.8% 0.195 277.366)",
	"--color-indigo-900": "oklch(35.9% 0.144 278.697)",
	"--color-indigo-950": "oklch(25.7% 0.09 281.288)",
	"--color-violet-50": "oklch(96.9% 0.016 293.756)",
	"--color-violet-100": "oklch(94.3% 0.029 294.588)",
	"--color-violet-200": "oklch(89.4% 0.057 293.283)",
	"--color-violet-300": "oklch(81.1% 0.111 293.571)",
	"--color-violet-400": "oklch(70.2% 0.183 293.541)",
	"--color-violet-500": "oklch(60.6% 0.25 292.717)",
	"--color-violet-600": "oklch(54.1% 0.281 293.009)",
	"--color-violet-700": "oklch(49.1% 0.27 292.581)",
	"--color-violet-800": "oklch(43.2% 0.232 292.759)",
	"--color-violet-900": "oklch(38% 0.189 293.745)",
	"--color-violet-950": "oklch(28.3% 0.141 291.089)",
	"--color-purple-50": "oklch(97.7% 0.014 308.299)",
	"--color-purple-100": "oklch(94.6% 0.033 307.174)",
	"--color-purple-200": "oklch(90.2% 0.063 306.703)",
	"--color-purple-300": "oklch(82.7% 0.119 306.383)",
	"--color-purple-400": "oklch(71.4% 0.203 305.504)",
	"--color-purple-500": "oklch(62.7% 0.265 303.9)",
	"--color-purple-600": "oklch(55.8% 0.288 302.321)",
	"--color-purple-700": "oklch(49.6% 0.265 301.924)",
	"--color-purple-800": "oklch(43.8% 0.218 303.724)",
	"--color-purple-900": "oklch(38.1% 0.176 304.987)",
	"--color-purple-950": "oklch(29.1% 0.149 302.717)",
	"--color-fuchsia-50": "oklch(97.7% 0.017 320.058)",
	"--color-fuchsia-100": "oklch(95.2% 0.037 318.852)",
	"--color-fuchsia-200": "oklch(90.3% 0.076 319.62)",
	"--color-fuchsia-300": "oklch(83.3% 0.145 321.434)",
	"--color-fuchsia-400": "oklch(74% 0.238 322.16)",
	"--color-fuchsia-500": "oklch(66.7% 0.295 322.15)",
	"--color-fuchsia-600": "oklch(59.1% 0.293 322.896)",
	"--color-fuchsia-700": "oklch(51.8% 0.253 323.949)",
	"--color-fuchsia-800": "oklch(45.2% 0.211 324.591)",
	"--color-fuchsia-900": "oklch(40.1% 0.17 325.612)",
	"--color-fuchsia-950": "oklch(29.3% 0.136 325.661)",
	"--color-pink-50": "oklch(97.1% 0.014 343.198)",
	"--color-pink-100": "oklch(94.8% 0.028 342.258)",
	"--color-pink-200": "oklch(89.9% 0.061 343.231)",
	"--color-pink-300": "oklch(82.3% 0.12 346.018)",
	"--color-pink-400": "oklch(71.8% 0.202 349.761)",
	"--color-pink-500": "oklch(65.6% 0.241 354.308)",
	"--color-pink-600": "oklch(59.2% 0.249 0.584)",
	"--color-pink-700": "oklch(52.5% 0.223 3.958)",
	"--color-pink-800": "oklch(45.9% 0.187 3.815)",
	"--color-pink-900": "oklch(40.8% 0.153 2.432)",
	"--color-pink-950": "oklch(28.4% 0.109 3.907)",
	"--color-rose-50": "oklch(96.9% 0.015 12.422)",
	"--color-rose-100": "oklch(94.1% 0.03 12.58)",
	"--color-rose-200": "oklch(89.2% 0.058 10.001)",
	"--color-rose-300": "oklch(81% 0.117 11.638)",
	"--color-rose-400": "oklch(71.2% 0.194 13.428)",
	"--color-rose-500": "oklch(64.5% 0.246 16.439)",
	"--color-rose-600": "oklch(58.6% 0.253 17.585)",
	"--color-rose-700": "oklch(51.4% 0.222 16.935)",
	"--color-rose-800": "oklch(45.5% 0.188 13.697)",
	"--color-rose-900": "oklch(41% 0.159 10.272)",
	"--color-rose-950": "oklch(27.1% 0.105 12.094)",
	"--color-slate-50": "oklch(98.4% 0.003 247.858)",
	"--color-slate-100": "oklch(96.8% 0.007 247.896)",
	"--color-slate-200": "oklch(92.9% 0.013 255.508)",
	"--color-slate-300": "oklch(86.9% 0.022 252.894)",
	"--color-slate-400": "oklch(70.4% 0.04 256.788)",
	"--color-slate-500": "oklch(55.4% 0.046 257.417)",
	"--color-slate-600": "oklch(44.6% 0.043 257.281)",
	"--color-slate-700": "oklch(37.2% 0.044 257.287)",
	"--color-slate-800": "oklch(27.9% 0.041 260.031)",
	"--color-slate-900": "oklch(20.8% 0.042 265.755)",
	"--color-slate-950": "oklch(12.9% 0.042 264.695)",
	"--color-gray-50": "oklch(98.5% 0.002 247.839)",
	"--color-gray-100": "oklch(96.7% 0.003 264.542)",
	"--color-gray-200": "oklch(92.8% 0.006 264.531)",
	"--color-gray-300": "oklch(87.2% 0.01 258.338)",
	"--color-gray-400": "oklch(70.7% 0.022 261.325)",
	"--color-gray-500": "oklch(55.1% 0.027 264.364)",
	"--color-gray-600": "oklch(44.6% 0.03 256.802)",
	"--color-gray-700": "oklch(37.3% 0.034 259.733)",
	"--color-gray-800": "oklch(27.8% 0.033 256.848)",
	"--color-gray-900": "oklch(21% 0.034 264.665)",
	"--color-gray-950": "oklch(13% 0.028 261.692)",
	"--color-zinc-50": "oklch(98.5% 0 0)",
	"--color-zinc-100": "oklch(96.7% 0.001 286.375)",
	"--color-zinc-200": "oklch(92% 0.004 286.32)",
	"--color-zinc-300": "oklch(87.1% 0.006 286.286)",
	"--color-zinc-400": "oklch(70.5% 0.015 286.067)",
	"--color-zinc-500": "oklch(55.2% 0.016 285.938)",
	"--color-zinc-600": "oklch(44.2% 0.017 285.786)",
	"--color-zinc-700": "oklch(37% 0.013 285.805)",
	"--color-zinc-800": "oklch(27.4% 0.006 286.033)",
	"--color-zinc-900": "oklch(21% 0.006 285.885)",
	"--color-zinc-950": "oklch(14.1% 0.005 285.823)",
	"--color-neutral-50": "oklch(98.5% 0 0)",
	"--color-neutral-100": "oklch(97% 0 0)",
	"--color-neutral-200": "oklch(92.2% 0 0)",
	"--color-neutral-300": "oklch(87% 0 0)",
	"--color-neutral-400": "oklch(70.8% 0 0)",
	"--color-neutral-500": "oklch(55.6% 0 0)",
	"--color-neutral-600": "oklch(43.9% 0 0)",
	"--color-neutral-700": "oklch(37.1% 0 0)",
	"--color-neutral-800": "oklch(26.9% 0 0)",
	"--color-neutral-900": "oklch(20.5% 0 0)",
	"--color-neutral-950": "oklch(14.5% 0 0)",
	"--color-stone-50": "oklch(98.5% 0.001 106.423)",
	"--color-stone-100": "oklch(97% 0.001 106.424)",
	"--color-stone-200": "oklch(92.3% 0.003 48.717)",
	"--color-stone-300": "oklch(86.9% 0.005 56.366)",
	"--color-stone-400": "oklch(70.9% 0.01 56.259)",
	"--color-stone-500": "oklch(55.3% 0.013 58.071)",
	"--color-stone-600": "oklch(44.4% 0.011 73.639)",
	"--color-stone-700": "oklch(37.4% 0.01 67.558)",
	"--color-stone-800": "oklch(26.8% 0.007 34.298)",
	"--color-stone-900": "oklch(21.6% 0.006 56.043)",
	"--color-stone-950": "oklch(14.7% 0.004 49.25)",
	"--color-mauve-50": "oklch(98.5% 0 0)",
	"--color-mauve-100": "oklch(96% 0.003 325.6)",
	"--color-mauve-200": "oklch(92.2% 0.005 325.62)",
	"--color-mauve-300": "oklch(86.5% 0.012 325.68)",
	"--color-mauve-400": "oklch(71.1% 0.019 323.02)",
	"--color-mauve-500": "oklch(54.2% 0.034 322.5)",
	"--color-mauve-600": "oklch(43.5% 0.029 321.78)",
	"--color-mauve-700": "oklch(36.4% 0.029 323.89)",
	"--color-mauve-800": "oklch(26.3% 0.024 320.12)",
	"--color-mauve-900": "oklch(21.2% 0.019 322.12)",
	"--color-mauve-950": "oklch(14.5% 0.008 326)",
	"--color-olive-50": "oklch(98.8% 0.003 106.5)",
	"--color-olive-100": "oklch(96.6% 0.005 106.5)",
	"--color-olive-200": "oklch(93% 0.007 106.5)",
	"--color-olive-300": "oklch(88% 0.011 106.6)",
	"--color-olive-400": "oklch(73.7% 0.021 106.9)",
	"--color-olive-500": "oklch(58% 0.031 107.3)",
	"--color-olive-600": "oklch(46.6% 0.025 107.3)",
	"--color-olive-700": "oklch(39.4% 0.023 107.4)",
	"--color-olive-800": "oklch(28.6% 0.016 107.4)",
	"--color-olive-900": "oklch(22.8% 0.013 107.4)",
	"--color-olive-950": "oklch(15.3% 0.006 107.1)",
	"--color-mist-50": "oklch(98.7% 0.002 197.1)",
	"--color-mist-100": "oklch(96.3% 0.002 197.1)",
	"--color-mist-200": "oklch(92.5% 0.005 214.3)",
	"--color-mist-300": "oklch(87.2% 0.007 219.6)",
	"--color-mist-400": "oklch(72.3% 0.014 214.4)",
	"--color-mist-500": "oklch(56% 0.021 213.5)",
	"--color-mist-600": "oklch(45% 0.017 213.2)",
	"--color-mist-700": "oklch(37.8% 0.015 216)",
	"--color-mist-800": "oklch(27.5% 0.011 216.9)",
	"--color-mist-900": "oklch(21.8% 0.008 223.9)",
	"--color-mist-950": "oklch(14.8% 0.004 228.8)",
	"--color-taupe-50": "oklch(98.6% 0.002 67.8)",
	"--color-taupe-100": "oklch(96% 0.002 17.2)",
	"--color-taupe-200": "oklch(92.2% 0.005 34.3)",
	"--color-taupe-300": "oklch(86.8% 0.007 39.5)",
	"--color-taupe-400": "oklch(71.4% 0.014 41.2)",
	"--color-taupe-500": "oklch(54.7% 0.021 43.1)",
	"--color-taupe-600": "oklch(43.8% 0.017 39.3)",
	"--color-taupe-700": "oklch(36.7% 0.016 35.7)",
	"--color-taupe-800": "oklch(26.8% 0.011 36.5)",
	"--color-taupe-900": "oklch(21.4% 0.009 43.1)",
	"--color-taupe-950": "oklch(14.7% 0.004 49.3)",
	"--color-black": "#000",
	"--color-white": "#fff",

	// containers
	"--container-3xs": "16rem",
	"--container-2xs": "18rem",
	"--container-xs": "20rem",
	"--container-sm": "24rem",
	"--container-md": "28rem",
	"--container-lg": "32rem",
	"--container-xl": "36rem",
	"--container-2xl": "42rem",
	"--container-3xl": "48rem",
	"--container-4xl": "56rem",
	"--container-5xl": "64rem",
	"--container-6xl": "72rem",
	"--container-7xl": "80rem",

	// text sizes
	"--text-xs": "0.75rem",
	"--text-xs--line-height": "calc(1 / 0.75)",
	"--text-sm": "0.875rem",
	"--text-sm--line-height": "calc(1.25 / 0.875)",
	"--text-base": "1rem",
	"--text-base--line-height": "calc(1.5 / 1)",
	"--text-lg": "1.125rem",
	"--text-lg--line-height": "calc(1.75 / 1.125)",
	"--text-xl": "1.25rem",
	"--text-xl--line-height": "calc(1.75 / 1.25)",
	"--text-2xl": "1.5rem",
	"--text-2xl--line-height": "calc(2 / 1.5)",
	"--text-3xl": "1.875rem",
	"--text-3xl--line-height": "calc(2.25 / 1.875)",
	"--text-4xl": "2.25rem",
	"--text-4xl--line-height": "calc(2.5 / 2.25)",
	"--text-5xl": "3rem",
	"--text-5xl--line-height": "1",
	"--text-6xl": "3.75rem",
	"--text-6xl--line-height": "1",
	"--text-7xl": "4.5rem",
	"--text-7xl--line-height": "1",
	"--text-8xl": "6rem",
	"--text-8xl--line-height": "1",
	"--text-9xl": "8rem",
	"--text-9xl--line-height": "1",

	// rounded
	"--radius-xs": "0.125rem",
	"--radius-sm": "0.25rem",
	"--radius-md": "0.375rem",
	"--radius-lg": "0.5rem",
	"--radius-xl": "0.75rem",
	"--radius-2xl": "1rem",
	"--radius-3xl": "1.5rem",
	"--radius-4xl": "2rem",

	// tracking
	"--tracking-tighter": "-0.05em",
	"--tracking-tight": "-0.025em",
	"--tracking-normal": "0em",
	"--tracking-wide": "0.025em",
	"--tracking-wider": "0.05em",
	"--tracking-widest": "0.1em",

	// misc
	"--aspect-video": "16 / 9",
	"--default-font-family": "var(--font-sans)",
	"--default-mono-font-family": "var(--font-mono)",
}

/*
 * Style reset, adapted from Tailwind4 with minor changes
 */
export const WIND4_BASE = `
*, ::after, ::before, ::backdrop, ::file-selector-button {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0 solid;
}
html, :host {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
  font-family: var(--font-sans);
  font-feature-settings: var(--default-font-feature-settings, normal);
  font-variation-settings: var(--default-font-variation-settings, normal);
  -webkit-tap-highlight-color: transparent;
}
hr {
  height: 0;
  color: inherit;
  border-top-width: 1px;
}
abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
}
h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: inherit;
}
a {
  color: inherit;
  -webkit-text-decoration: inherit;
  text-decoration: inherit;
}
b, strong {
  font-weight: bolder;
}
code, kbd, samp, pre {
  font-family: var(--font-mono);
  font-feature-settings: var(--default-mono-font-feature-settings, normal);
  font-variation-settings: var(--default-mono-font-variation-settings, normal);
  font-size: 1em;
}
small {
  font-size: 80%;
}
sub, sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}
table {
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse;
}
:-moz-focusring {
  outline: auto;
}
progress {
  vertical-align: baseline;
}
summary {
  display: list-item;
}
ol, ul, menu {
  list-style: none;
}
img, svg, video, canvas, audio, iframe, embed, object {
  display: block;
  vertical-align: middle;
}
img, video {
  max-width: 100%;
  height: auto;
}
button, input, select, optgroup, textarea, ::file-selector-button {
  font: inherit;
  font-feature-settings: inherit;
  font-variation-settings: inherit;
  letter-spacing: inherit;
  color: inherit;
  border-radius: 0;
  background-color: transparent;
  opacity: 1;
}
:where(select:is([multiple], [size])) optgroup {
  font-weight: bolder;
}
:where(select:is([multiple], [size])) optgroup option {
  padding-inline-start: 20px;
}
::file-selector-button {
  margin-inline-end: 4px;
}
::placeholder {
  opacity: 1;
}
@supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px) {
  ::placeholder {
    color: currentcolor;
    @supports (color: color-mix(in lab, red, red)) {
      color: color-mix(in oklab, currentcolor 50%, transparent);
    }
  }
}
textarea {
  resize: vertical;
}
::-webkit-search-decoration {
  -webkit-appearance: none;
}
::-webkit-date-and-time-value {
  min-height: 1lh;
  text-align: inherit;
}
::-webkit-datetime-edit {
  display: inline-flex;
}
::-webkit-datetime-edit-fields-wrapper {
  padding: 0;
}
::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
  padding-block: 0;
}
::-webkit-calendar-picker-indicator {
  line-height: 1;
}
:-moz-ui-invalid {
  box-shadow: none;
}
button, input:where([type='button'], [type='reset'], [type='submit']), ::file-selector-button {
  appearance: button;
}
::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
  height: auto;
}
[hidden]:where(:not([hidden='until-found'])) {
  display: none!important;
}
`

const PRESET: ConfigOptions = {
	rules: WIND4_RULES,
	states: WIND4_STATES,
	theme: WIND4_THEME,
	base: WIND4_BASE,
}

export default PRESET
