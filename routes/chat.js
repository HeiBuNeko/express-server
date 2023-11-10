const express = require('express')
const router = express.Router()

const MYGOInfo = `根据首发PV，乐队名称「MyGO!!!!!」的读法与日文“迷子”（まいご/maigo，意为迷路的孩子）的发音相同；MyGO!!!!!系列构成绫奈由仁子也提到TV动画标题「It	's MyGO!!!!!」也有“到我出场了”的意思。「MyGO!!!!!」后面的5个感叹号代表着5位乐队成员。和此前乐队不同的是，MyGO!!!!!是首支（非主唱）双吉他配置的乐队组合。早期的标语是「迷子でもいい、前へ進め。」（不畏迷茫，砥砺前行。），在4th LIVE后变成现在的标语。和Poppin'Party类似，MyGO!!!!!各成员名字的首字母也可以组成START；而MyGO!!!!!各成员的姓氏则来自东京都丰岛区地名。`

// 服务器发送事件 EventSource
router.get('/chat_typing', (req, res) => {
  // 开启Server-sent events
  res.setHeader('Content-Type', 'text/event-stream')

  let index = 0
  let timerId = 0

  // 模拟每隔0.1s向前端推送一次
  timerId = setInterval(() => {
    const data = MYGOInfo[index]
    index++
    if (data) {
      // data:表示数据内容，\n\n表示数结尾
      res.write(`data:${data}\n\n`)
    } else {
      res.end()
      clearInterval(timerId)
    }
  }, 100)
})

// 服务器发送事件 Fetch
router.post('/chat_typing_fetch', (req, res) => {
  console.log('前端参数=>', req.body)
  // 开启Server-sent events
  res.setHeader('Content-Type', 'text/event-stream')

  let index = 0
  let timerId = 0

  // 模拟每隔0.1s向前端推送一次
  timerId = setInterval(() => {
    const data = MYGOInfo[index]
    index++
    if (data) {
      res.write(data)
    } else {
      res.end()
      clearInterval(timerId)
    }
  }, 100)

  // 断开连接
  res.on('close', () => {
    res.end()
    clearInterval(timerId)
  })
})

module.exports = router
