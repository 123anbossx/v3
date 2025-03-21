// const fs = require('fs')
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execa } from 'execa'
// const rollup = execa.command('rollup')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const buildPath = path.resolve(__dirname, '../packages')
const buildDirs = fs.readdirSync(buildPath, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
runParaller(buildDirs).then(res=>{
    console.log(res,'打包成功')
})
function runParaller(dirs){
  return Promise.all(dirs.map((dirName)=>{
    return build(dirName)
  }))
}
function build(target){
   return execa('rollup',['-c','--environment',`TARGET:${target}`])
}
