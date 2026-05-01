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

	// TODO: top / right / bottom / left

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

export const FLEXBOX_GRID: Rule[] = []

export const SPACING: Rule[] = []

export const SIZING: Rule[] = []

export const TYPOGRAPHY: Rule[] = []

export const TABLES: Rule[] = []
