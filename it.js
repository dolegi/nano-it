c=(...x)=>console.log('\u001b[0m',...x)
progress=()=>'\u001b[33m'+good+'/'+(good+bad)
success=d=>++good&&c(progress(),'\u001b[32m'+d)
fail=(d,e)=>++bad&&c(progress(),'\u001b[31m'+d+'\n'+e.stack)
error=(d,e)=>c('\u001b[41m'+d+'\n'+e+e.stack)
assert=require('assert')
good=0
bad=0
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

