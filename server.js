const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()

// CORS模块
app.use(cors())

// CORS Middleware
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
//   next()
// })

app.get('/delay_3s_data', (req, res) => {
  // 延迟响应
  setTimeout(() => {
    res.send({ code: 0, msg: '请求成功', data: '这是延迟3s返回的数据' })
  }, 3000)
})

app.get('/video', (req, res) => {
  // 获取文件路径、信息、大小
  const filePath = path.join(__dirname, 'files', 'video.mp4')
  const stat = fs.statSync(filePath)
  const fileSize = stat.size
  // 设置响应头
  res.setHeader('Content-Length', fileSize)
  res.setHeader('Content-Type', 'video/mp4')
  // 创建可读流并将其管道传输到响应流中
  fs.createReadStream(filePath).pipe(res)
})

// get请求
app.get('/', (req, res) => {
  res.send('Hello World')
})

// post请求
app.post('/about', (req, res) => {
  res.send({ name: 'HeiBuNeko', age: 18 })
})

const user = express.Router() // 创建子路由

user.get('/list', (req, res) => {
  res.send('User List')
})

user.get('/:userId', (req, res) => {
  res.send(req.params)
})

app.use('/user', user) // 注册子路由

app.use(express.static('public')) // 静态资源托管

// 处理 404 错误
app.use('*', (req, res) => {
  res.status(404).send(`<h1>404 找不到你要的页面~</h1>`)
})

// 处理服务器错误
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('<h1>服务器好像开小差了~</h1><p>过一会儿再试试看吧！</p>')
  next()
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
