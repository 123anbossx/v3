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
// 读取每个包总的ist文件下的packag内容
const pkg = JSON.parse(fs.readFileSync(resolve(`package.json`), 'utf-8'))
const {buildOptions} = pkg
console.log(pkg,'666')
const name = path.basename(packageDir)
// 对于每个包的打包配置
const outputConfigs = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: 'es',
    name: buildOptions.name,
    sourcemap:buildOptions.sourcemap
  },
  'cjs': {
    file: resolve(`dist/${name}.cjs.js`),
    format: 'cjs',
    name: buildOptions.name,
    sourcemap:buildOptions.sourcemap
  },
  'global': {
    file: resolve(`dist/${name}.global.js`),
    format: 'iife',
    name: buildOptions.name,
    sourcemap:buildOptions.sourcemap
  }
}

const defaultFormats = ['esm-bundler', 'cjs']
const packageFormats = buildOptions.formats?buildOptions.formats:defaultFormats
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