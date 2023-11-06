const express = require('express')
const router = express.Router()

router.get('/list', (req, res) => {
  res.send('User List')
})

router.get('/:userId', (req, res) => {
  res.send(req.params)
})

module.exports = router
