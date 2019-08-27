c=console.log
success=d=>c('\u001b[32m'+d)
fail=(d,e) => c('\u001b[31m'+d+'\n'+e)
assert=require('assert')

module.exports=async(d,f) => {

  if (f.then) {
    return f
      .then(()=>success(d))
      .catch(e =>fail(d,e))
  }
  try {
    await f()
    success(d)
  } catch (e) {
    fail(d,e)
  }
}
