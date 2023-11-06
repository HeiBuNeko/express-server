const express = require('express')
const router = express.Router()

router.use('/', require('./demo'))
router.use('/user', require('./user'))

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
