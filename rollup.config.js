import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import json from '@rollup/plugin-json'
import ts from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 获取要打包的包名
const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = (p) => path.resolve(packageDir, p)
// 修改 require 为动态导入
const pkg = JSON.parse(fs.readFileSync(resolve(`package.json`), 'utf-8'))
const name = path.basename(packageDir)
console.log(process.env.TARGET,'6666')
// 对于每个包的打包配置
const outputConfigs = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: 'es'
  },
  'cjs': {
    file: resolve(`dist/${name}.cjs.js`),
    format: 'cjs'
  }
}

const defaultFormats = ['esm-bundler', 'cjs']
const packageFormats = defaultFormats

const packageConfigs = packageFormats.map(format => createConfig(format))

export default packageConfigs

function createConfig(format) {
  const output = outputConfigs[format]
  
  return {
    input: resolve('src/index.ts'),
    output,
    plugins: [
      json(),
      ts({
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
      }),
      nodeResolve()
    ]
  }
}