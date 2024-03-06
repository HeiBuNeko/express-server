const express = require('express')
const cors = require('cors')
const session = require('express-session')
const { expressjwt } = require('express-jwt')

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

// CORS模块
app.use(cors())

// 注意：除了错误级别的中间件，其他的中间件必须在路由前进行配置
// 解析请求体的 JSON 数据到 req.body，不配置则 req.body 为 undefined
app.use(express.json())
// 解析请求体的 url-encoded 数据到 req.body
app.use(express.urlencoded({ extended: false }))

// 密钥
const secretKey = 'heibuneko'

// 配置 Session 中间件
app.use(
  session({
    secret: secretKey, // session密钥
    resave: false, // 是否每次请求都重新保存 session
    saveUninitialized: true // 是否保存未初始化的 session
  })
)

// 配置将 JWT 字符串解析还原成 JSON 对象的中间件
// 解析出来的用户信息会被挂载到 req.user 上，unless 用来指定哪些接口不需要访问权限
app.use(
  expressjwt({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: [/^\/jwt\/login/] })
)

// 处理服务器错误
app.use((err, req, res, next) => {
  // token 解析失败导致的错误
  console.log(err.stack)
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('<h1>登录状态失效，请重新登录~</h1>')
  } else {
    res.status(500).send('<h1>服务器好像开小差了~</h1><p>过一会儿再试试看吧！</p>')
  }
})

app.use('/', require('./routes'))

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
