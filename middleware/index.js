// 导入 Node.js 内置的 querystring 模块
const qs = require('querystring')

// CORS Middleware
const middleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
}

// urlencoded Middlewareq
// 解析请求体的 JSON url-encoded 数据到 req.body
const urlencoded = (req, res, next) => {
  let str = ''
  req.on('data', (chunk) => {
    str += chunk
  })
  req.on('end', () => {
    req.body = qs.parse(str)
    next()
  })
}

module.exports = { middleware, urlencoded }
