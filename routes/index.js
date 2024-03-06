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
// session 身份认证
router.use('/session', require('./session'))
// JWT 身份认证
router.use('/jwt', require('./jwt'))

// 处理 404 错误
router.use('*', (req, res) => {
  res.status(404).send(`<h1>404 找不到你要的页面~</h1>`)
})

module.exports = router
