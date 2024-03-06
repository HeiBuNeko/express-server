const express = require('express')
const router = express.Router()

// 登录逻辑
router.post('/login', (req, res) => {
  if (req.body.name === 'heibuneko' && req.body.password === 'heibuneko') {
    req.session.user = req.body // 登录成功后设置 session
    req.session.isLogin = true // 登录成功后设置登录状态
    console.log(req.session)
    res.send({ code: 0, msg: '登录成功' })
  } else {
    res.send({ code: 1, msg: '用户名或密码错误' })
  }
})

// 获取登录状态
router.get('/status', (req, res) => {
  console.log(req.session)
  if (req.session.isLogin) {
    res.send({ code: 0, msg: `已登录，当前用户为${req.session.user.name}`, data: req.session.user })
  } else {
    res.send({ code: 1, msg: '未登录' })
  }
})

// 获取登录状态
router.get('/logout', (req, res) => {
  req.session.destroy()
  res.send({ code: 0, msg: '已登出' })
})

module.exports = router
