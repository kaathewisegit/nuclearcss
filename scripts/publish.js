import { spawn } from "node:child_process"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const { version } = require("../package.json")

const tag = version.includes("-") ? ["--tag", "next"] : []

spawn("npm", ["publish", ...tag], { stdio: "inherit" })
