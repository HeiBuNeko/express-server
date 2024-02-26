const express = require('express')
const router = express.Router()

// 基础请求-流式传输
router.use('/', require('./demo'))
// 基础路由
router.use('/', require('./default'))
// 服务器发送事件
router.use('/chat', require('./chat'))
// 大文件上传 分片 续传 秒传
router.use('/upload', require('./upload'))

// 处理 404 错误
router.use('*', (req, res) => {
  res.status(404).send(`<h1>404 找不到你要的页面~</h1>`)
})

// 处理服务器错误
router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('<h1>服务器好像开小差了~</h1><p>过一会儿再试试看吧！</p>')
  next()
})

module.exports = router
