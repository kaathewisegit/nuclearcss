import type { Rule } from "./config.ts"

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
		/^(-)?inset-(\d+)/,
		([, neg, num]) =>
			`inset: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/^(-)?inset-(\d+\/\d+)/,
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
		/^(-)?inset-x-(\d+)/,
		([, neg, num]) =>
			`inset-inline: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/^(-)?inset-x-(\d+\/\d+)/,
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
		/^(-)?inset-y-(\d+)/,
		([, neg, num]) =>
			`inset-block: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/^(-)?inset-y-(\d+\/\d+)/,
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
		/^(-)?inset-s-(\d+)/,
		([, neg, num]) =>
			`inset-inline-start: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/^(-)?inset-s-(\d+\/\d+)/,
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
		/^(-)?inset-e-(\d+)/,
		([, neg, num]) =>
			`inset-inline-end: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/^(-)?inset-e-(\d+\/\d+)/,
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
		/^(-)?inset-bs-(\d+)/,
		([, neg, num]) =>
			`inset-block-start: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/^(-)?inset-bs-(\d+\/\d+)/,
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
		/^(-)?inset-be-(\d+)/,
		([, neg, num]) =>
			`inset-block-end: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/^(-)?inset-be-(\d+\/\d+)/,
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

	// top
	[
		/^(-)?top-(\d+)/,
		([, neg, num]) =>
			`top: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/^(-)?top-(\d+\/\d+)/,
		([, neg, frac]) => `top: calc(${frac} * ${neg ? "-" : ""}100%);`,
	],
	["top-px", "top: 1px;"],
	["-top-px", "top: -1px;"],
	["top-full", "top: 100%;"],
	["-top-full", "top: -100%;"],
	["top-auto", "top: auto;"],
	[/top-\((.+)\)/, ([, prop]) => `top: var(${prop});`],
	[/top-\[(.+)\]/, ([, value]) => `top: ${value};`],

	// right
	[
		/^(-)?right-(\d+)/,
		([, neg, num]) =>
			`right: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/^(-)?right-(\d+\/\d+)/,
		([, neg, frac]) => `right: calc(${frac} * ${neg ? "-" : ""}100%);`,
	],
	["right-px", "right: 1px;"],
	["-right-px", "right: -1px;"],
	["right-full", "right: 100%;"],
	["-right-full", "right: -100%;"],
	["right-auto", "right: auto;"],
	[/right-\((.+)\)/, ([, prop]) => `right: var(${prop});`],
	[/right-\[(.+)\]/, ([, value]) => `right: ${value};`],

	// bottom
	[
		/^(-)?bottom-(\d+)/,
		([, neg, num]) =>
			`bottom: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/^(-)?bottom-(\d+\/\d+)/,
		([, neg, frac]) => `bottom: calc(${frac} * ${neg ? "-" : ""}100%);`,
	],
	["bottom-px", "bottom: 1px;"],
	["-bottom-px", "bottom: -1px;"],
	["bottom-full", "bottom: 100%;"],
	["-bottom-full", "bottom: -100%;"],
	["bottom-auto", "bottom: auto;"],
	[/bottom-\((.+)\)/, ([, prop]) => `bottom: var(${prop});`],
	[/bottom-\[(.+)\]/, ([, value]) => `bottom: ${value};`],

	// left
	[
		/^(-)?left-(\d+)/,
		([, neg, num]) =>
			`left: calc(var(--spacing) * ${neg ? "-" : ""}${num});`,
	],
	[
		/^(-)?left-(\d+\/\d+)/,
		([, neg, frac]) => `left: calc(${frac} * ${neg ? "-" : ""}100%);`,
	],
	["left-px", "left: 1px;"],
	["-left-px", "left: -1px;"],
	["left-full", "left: 100%;"],
	["-left-full", "left: -100%;"],
	["left-auto", "left: auto;"],
	[/left-\((.+)\)/, ([, prop]) => `left: var(${prop});`],
	[/left-\[(.+)\]/, ([, value]) => `left: ${value};`],

	// visibility
	["visible", "visibility: visible;"],
	["invisible", "visibility: hidden;"],
	["collapse", "visibility: collapse;"],

	// z-index
	[/^(-)?z-(\d+)/, ([, neg, num]) => `z-index: ${neg ? "-" : ""}${num};`],
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
		/^(-)?order-(\d+)/,
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
		/^(-)?col-start-(\d+)/,
		([, neg, num]) =>
			`grid-column-start: ${neg ? `calc(${num} * -1)` : num};`,
	],
	["col-start-auto", "grid-column-start: auto;"],
	[/col-start-\((.+)\)/, ([, prop]) => `grid-column-start: var(${prop});`],
	[/col-start-\[(.+)\]/, ([, value]) => `grid-column-start: ${value};`],

	[
		/^(-)?col-end-(\d+)/,
		([, neg, num]) =>
			`grid-column-end: ${neg ? `calc(${num} * -1)` : num};`,
	],
	["col-end-auto", "grid-column-end: auto;"],
	[/col-end-\((.+)\)/, ([, prop]) => `grid-column-end: var(${prop});`],
	[/col-end-\[(.+)\]/, ([, value]) => `grid-column-end: ${value};`],

	["col-auto", "grid-column: auto;"],
	[
		/^(-)?col-(\d+)/,
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
		/^(-)?row-start-(\d+)/,
		([, neg, num]) => `grid-row-start: ${neg ? `calc(${num} * -1)` : num};`,
	],
	["row-start-auto", "grid-row-start: auto;"],
	[/row-start-\((.+)\)/, ([, prop]) => `grid-row-start: var(${prop});`],
	[/row-start-\[(.+)\]/, ([, value]) => `grid-row-start: ${value};`],

	[
		/^(-)?row-end-(\d+)/,
		([, neg, num]) => `grid-row-end: ${neg ? `calc(${num} * -1)` : num};`,
	],
	["row-end-auto", "grid-row-end: auto;"],
	[/row-end-\((.+)\)/, ([, prop]) => `grid-row-end: var(${prop});`],
	[/row-end-\[(.+)\]/, ([, value]) => `grid-row-end: ${value};`],

	["row-auto", "grid-row: auto;"],
	[
		/^(-)?row-(\d+)/,
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

export const SPACING: Rule[] = []

export const SIZING: Rule[] = []

export const TYPOGRAPHY: Rule[] = []

export const TABLES: Rule[] = []

const RULES: Rule[] = [...LAYOUT, ...FLEXBOX_GRID]
export default RULES
