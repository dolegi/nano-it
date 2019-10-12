const it = require('./it')


it('1 plus 1 is 2', () => {
  assert(1+1===2)
})


it('1 plus 1 is 2 promise', new Promise(resolve => {
  resolve(assert(1+1===2))
}))

it('1 plus 1 is 2 async', async () => {
  await new Promise(resolve => {
    setTimeout(() => {
    resolve(console.log('1'))
    }, 1500)
  })
  assert(1+1===2)
})

it('1 plus 1 is 3', () => {
  assert(1+1===3)
})

it('1 plus 1 is 3 promise', new Promise(reject => {
    setTimeout(() => {
  throw Error('heelo')
    },1)
  setTimeout(() => {
    reject(assert(1+1===3))
  }, 2000)
}))

it('1 plus 1 is 3 async', async () => {
  await new Promise(resolve => resolve(console.log('1')))
  assert(1+1===3)
})
