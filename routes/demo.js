const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

router.use('/public', express.static('public')) // 静态资源托管

router.get('/delay_3s_data', (req, res) => {
  // 延迟响应
  setTimeout(() => {
    res.send({ code: 0, msg: '请求成功', data: '这是延迟3s返回的数据' })
  }, 3000)
})

router.get('/video', (req, res) => {
  // 获取文件路径、信息、大小
  const filePath = path.join(process.cwd(), 'files', 'video.mp4')
  const stat = fs.statSync(filePath)
  const fileSize = stat.size
  // 设置响应头
  res.setHeader('Content-Length', fileSize)
  res.setHeader('Content-Type', 'video/mp4')
  // 创建可读流并将其管道传输到响应流中
  fs.createReadStream(filePath).pipe(res)
})

module.exports = router
