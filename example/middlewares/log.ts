const log = async (ctx, next) => {
  console.log('==== pass log middleware ===')
  next()
}

export default log
