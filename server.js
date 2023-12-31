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

// 解析请求体的 JSON 数据到 req.body
app.use(express.json())

app.use('/', require('./routes'))

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
