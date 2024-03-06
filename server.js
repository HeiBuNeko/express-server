const express = require('express')
const session = require('express-session')
const cors = require('cors')
const app = express()

// 必须在配置 CORS 之前配置 JSONP 接口
app.get('/jsonp', (req, res) => {
  // 1、得到函数的名称
  const funcName = req.query.callback
  // 2、定义要发送到客户端的数据对象
  const data = { name: 'HeiBuNeko' }
  // 3、拼接出一个函数的调用
  const scriptStr = `${funcName}(${JSON.stringify(data)})`
  // 4、把拼接的字符串，响应给客户端
  res.send(scriptStr)
})
// 配置 Session 中间件
app.use(
  session({
    secret: 'heibuneko', // 密钥，加密 sessionID
    resave: false, // 是否每次请求都重新保存 session
    saveUninitialized: true // 是否保存未初始化的 session
  })
)

// CORS模块
app.use(cors())

// 注意：除了错误级别的中间件，其他的中间件必须在路由前进行配置
// 解析请求体的 JSON 数据到 req.body，不配置则 req.body 为 undefined
app.use(express.json())
// 解析请求体的 url-encoded 数据到 req.body
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./routes'))

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
