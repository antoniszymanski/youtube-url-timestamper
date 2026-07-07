// SPDX-FileCopyrightText: 2026 Antoni Szymański
// SPDX-License-Identifier: MPL-2.0

import { defineConfig } from "@rspack/cli"
import { BannerPlugin, Compilation } from "@rspack/core"
import { TsCheckerRspackPlugin } from "ts-checker-rspack-plugin"
import { version } from "./package.json"

const header = `
// ==UserScript==
// @name         Youtube URL Timestamper
// @description  Updates the browser URL with the current timestamp of the YouTube video every 30 seconds
// @namespace    antoniszymanski
// @author       Antoni Szymański
// @version      ${version}
// @license      MPL-2.0
// @match        https://www.youtube.com/watch*
// ==/UserScript==
`.trim()

export default defineConfig({
	mode: "production",
	target: "browserslist:modern",
	output: {
		filename: "main.user.js",
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "builtin:swc-loader",
			},
		],
	},
	resolve: {
		extensions: [".ts"],
	},
	optimization: {
		chunkIds: "total-size",
	},
	plugins: [
		new TsCheckerRspackPlugin(),
		new BannerPlugin({
			banner: header,
			raw: true,
			stage: Compilation.PROCESS_ASSETS_STAGE_REPORT,
		}),
	],
	performance: {
		hints: false,
	},
})
