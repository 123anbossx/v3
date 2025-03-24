
import { execa } from 'execa'

function build(target){
   return execa('rollup',['-cw','--environment',`TARGET:${target}`],{
    stdio:'inherit'
  })
}
build('reactivity')