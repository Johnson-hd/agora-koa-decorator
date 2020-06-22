const log = async (ctx, next) => {
  console.log('==== pass log middleware ===')
  await next()
}

export default log
