const express = require('express')
const router = express.Router()

// get请求（URL查询参数）
router.get('/get_default', (req, res) => {
  console.log(req.query)
  if (Object.keys(req.query).length === 0) {
    res.send("Welcome to HeiBuNeko's blog!")
  } else {
    res.send('Your query is ' + JSON.stringify(req.query))
  }
})

// get请求（URL动态参数）
router.get('/get_default/:id', (req, res) => {
  console.log(req.params)
  res.send('Your params is ' + JSON.stringify(req.params))
})

// post请求
router.post('/post_default', (req, res) => {
  console.log(req.body)
  if (Object.keys(req.body).length === 0) {
    res.send("Welcome to HeiBuNeko's blog!")
  } else {
    res.send('Your body is ' + JSON.stringify(req.body))
  }
})

module.exports = router
