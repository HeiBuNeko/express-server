const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

// JWT密钥
const secretKey = 'heibuneko'

// 登录逻辑
router.post('/login', (req, res) => {
  if (req.body.name === 'heibuneko' && req.body.password === 'heibuneko') {
    // jwt.sign() 1-用户信息 2-密钥 3-配置项
    console.log(req.body);
    const tokenStr = jwt.sign({ name: req.body.name }, secretKey, { expiresIn: '30s' })
    res.send({
      code: 0,
      msg: '登录成功',
      data: { token: tokenStr } // 返回 token
    })
  } else {
    res.send({ code: 1, msg: '用户名或密码错误' })
  }
})

// 获取登录状态
router.get('/status', (req, res) => {
  console.log(req.auth.name)
  res.send({ code: 0, msg: `已登录，当前用户为${req.auth.name}`})
})

// 获取登录状态
router.get('/logout', (req, res) => {
  res.send({ code: 0, msg: '已登出' })
})

module.exports = router
