assert=require('assert')
passed = 0
total = 0

class Runner {
  constructor(desc) {
    this.desc=desc 
  }

  success(d) {
    ++passed&&++total&&this.log(this.progress(),'\u001b[32m'+d)
  }

  fail(d,e) {
    ++total&&this.log(this.progress(),'\u001b[31m'+d+'\n'+e.stack)
  }

  error(d,e) {
    // this.log('\u001b[31m'+d+'\n'+e+e.stack)
  }

  progress() {
    return '\u001b[33m'+passed+'/'+total
  }

  log(...x){
    console.log('\u001b[0m',this.desc,...x)
  }
}

module.exports= async(d,f,t=5000) => {
  const filename = _getCallerFile()

  const runner = new Runner(filename)
  process.on('uncaughtException', e=>runner.error('Uncaught Exception', e))
  let running=true
  setTimeout(()=>{
    running && runner.fail(d,new Error('Test timed out after '+t+'ms'))
    running=false
  },t)

  try {
    await (f.then ? f : f())
    running && runner.success(d)
  } catch (e) {
    runner.fail(d,e)
  }
  running=false
}

function _getCallerFile() {
    try {
        var err = new Error();
        var callerfile;
        var currentfile;

        Error.prepareStackTrace = function (err, stack) { return stack; };

        currentfile = err.stack.shift().getFileName();

        while (err.stack.length) {
            callerfile = err.stack.shift().getFileName();

            if(currentfile !== callerfile) return callerfile;
        }
    } catch (err) {}
    return undefined;
}

process.argv.slice(2).forEach(file => {
  require('./'+file)
})

