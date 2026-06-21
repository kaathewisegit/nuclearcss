import { spawn } from "node:child_process"
import pkg from "../package.json" with { type: "json" }

const tag = pkg.version.includes("-") ? ["--tag", "next"] : []

spawn("npm", ["publish", ...tag], { stdio: "inherit" })
