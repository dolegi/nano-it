assert=require('assert')
passed = 0
total = 0

class Runner {
  constructor(filename, desc) {
    this.desc=filename + '\u001b[35m ' + desc 
    this.output=''
    this.running = true
  }

  runnning () {
    return this.running
  }

  success() {
    ++passed&&++total&&this.log(this.progress(),'\u001b[32m /')
  }

  fail(e) {
    ++total&&this.log(this.progress(),'\u001b[31m X'+'\n'+e.stack)
  }

  error(d,e) {
    this.log('\u001b[31m\n'+d+'\n'+e+e.stack)
  }

  progress() {
    return '\u001b[33m'+passed+'/'+total
  }

  log(...x){
    this.output += '\u001b[0m' + this.desc + ' ' + x.join('')
  }

  finished() {
    this.running = false
    console.log(this.output)
  }
}

module.exports= async(d,f,t=5000) => {
  const filename = _getCallerFile()

  const runner = new Runner(filename, d)
  process.on('uncaughtException', e=>runner.error('Uncaught Exception', e))
  setTimeout(()=>{
    running && runner.fail(new Error('Test timed out after '+t+'ms'))
    runner.finished()
  },t)

  try {
    await (f.then ? f : f())
    runner.success()
  } catch (e) {
    runner.fail(e)
  }
  runner.finished()
}

function _getCallerFile() {
  try {
    var originalFunc = Error.prepareStackTrace;
    var err = new Error();
    var callerfile;
    var currentfile;

    Error.prepareStackTrace = function (err, stack) { return stack; };

    currentfile = err.stack.shift().getFileName();

    while (err.stack.length) {
      const callsite = err.stack.shift()
      callerfile = callsite.getFileName();

      if(currentfile !== callerfile) {
        return callerfile + ':' + callsite.getLineNumber()
      }
    }
  } catch (err) {}
  Error.prepareStackTrace = originalFunc; 
  return undefined;
}

process.argv.slice(2).forEach(file => {
  require('./'+file)
})

