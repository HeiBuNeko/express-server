const express = require('express')
const router = express.Router()

// get请求（URL查询参数）
router.get('/get_default', (req, res) => {
  console.log(req.query)
  res.send({ code: 0, msg: `GET请求成功，Your query is ${JSON.stringify(req.query)}` })
})

// get请求（URL动态参数）
router.get('/get_default/:id', (req, res) => {
  console.log(req.params)
  res.send({ code: 0, msg: `GET请求成功，Your params is ${JSON.stringify(req.params)}` })
})

// post请求
router.post('/post_default', (req, res) => {
  console.log(req.body)
  res.send({ code: 0, msg: `POST请求成功，Your body is ${JSON.stringify(req.body)}` })
})

// delete请求
router.delete('/delete_default', (req, res) => {
  console.log(req.query)
  res.send({ code: 0, msg: `DELETE请求成功，Your query is ${JSON.stringify(req.query)}` })
})

module.exports = router
