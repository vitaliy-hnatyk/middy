const middy = require('..')

describe('Test middlewares execution', () => {

  test('It should execute before and after middlewares in the right order', (endTest) => {
    const handler = middy((event, context, callback) => {
      return callback(null, {foo: 'bar'})
    })

    const m1 = () => ({
      before: (ctx, next) => {
        ctx.executedBefore = ['m1']
        next()
      },
      after: (ctx, next) => {
        ctx.executedAfter.push('m1')
        next()
      }
    })

    const m2 = () => ({
      before: (ctx, next) => {
        ctx.executedBefore.push('m2')
        next()
      },
      after: (ctx, next) => {
        ctx.executedAfter = ['m2']
        next()
      }
    })

    handler
      .use(m1())
      .use(m2())

    // executes the handler
    const event = {}
    const context = {}
    handler(event, context, (err, response) => {
      expect(handler.ctx.executedBefore).toEqual(['m1', 'm2'])
      expect(handler.ctx.executedAfter).toEqual(['m2', 'm1'])
      expect(response).toEqual({foo: 'bar'})
      endTest()
    })
  })

  test('"after" middlewares should be able to change response', (endTest) => {
    const handler = middy((event, context, callback) => {
      return callback(null, {foo: 'bar'})
    })
    
    const m = () => ({
      after: (ctx, next) => {
        ctx.response.modified = true
        next()
      }
    })
    
    handler.use(m())
    
    const event = {}
    const context = {}
    handler(event, context, () => {
      expect(handler.ctx.response.modified).toBe(true)
      endTest()
    })
  })

  test('Handler should be able to access middie context with "this"', (endTest) => {
    // TODO
    endTest()
  })
  
  test('If there is an error in the before middlewares the error middlewares are invoked', (endTest) => {
    // TODO
    endTest()
  })
  
  test('If there is an error in the original handler the error middlewares are invoked', (endTest) => {
    // TODO
    endTest()
  })
  
  test('If there is an error in the after middlewares the error middlewares are invoked', (endTest) => {
    // TODO
    endTest()
  })
  
  test('If theres an error and one error middleware handles the error, the next error middlewares is not executed', (endTest) => {
    // TODO
    endTest()
  })
  
  test('If theres an error and the first error middleware doesn\'t handle the error, the next error middlewares is executed', (endTest) => {
    // TODO
    endTest()
  })
})
