const { spawn } = require('child_process')

log=(...x)=>console.log('\u001b[0m',__filename,...x)
progress=()=>'\u001b[33m'+passed+'/'+total
success=d=>++passed&&++total&&log(progress(),'\u001b[32m'+d)
fail=(d,e)=>++total&&log(progress(),'\u001b[31m'+d+'\n'+e.stack)
error=(d,e)=>log('\u001b[31m'+d+'\n'+e+e.stack)
assert=require('assert')
passed=0
total=0
timeout=5000

process.on('uncaughtException', e=>error('Uncaught Exception', e))

module.exports=async(d,f,t=timeout) => {
  let running=true
  setTimeout(()=>{
    running && fail(d,new Error('Test timed out after '+t+'ms'))
    running=false
  },t)

  try {
    await (f.then ? f : f())
    running && success(d)
  } catch (e) {
    fail(d,e)
  }
  running=false
}

process.argv.slice(2).forEach(file => require('./'+file))
