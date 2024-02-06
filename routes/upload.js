const express = require('express')
const router = express.Router()
const path = require('path')
const multiparty = require('multiparty')
const fs = require('fs')

// 所有上传的文件存放到该目录下
const UPLOAD_DIR = path.resolve(__dirname, 'uploads')

// 处理上传的分片
router.post('/chunk_file', async (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({
        code: '9999',
        msg: '上传失败'
      })
    }
    const chunkHash = fields['chunkHash'][0]
    const fileHash = fields['fileHash'][0]
    // 存储切片的临时文件夹
    const CHUNK_DIR = path.resolve(UPLOAD_DIR, fileHash)
    // 切片目录不存在则创建切片目录
    try {
      fs.accessSync(CHUNK_DIR)
    } catch (error) {
      fs.mkdirSync(CHUNK_DIR, { recursive: true })
    }
    // 缓存路径 临时路径
    const oldPath = files.chunk[0].path
    const newPath = path.resolve(CHUNK_DIR, chunkHash)
    // 跨区移动文件
    fs.renameSync(oldPath, newPath)

    res.status(200).json({
      code: '0000',
      msg: '上传成功'
    })
  })
})

// 提文件后缀名
const extractExt = (fileName) => fileName.slice(fileName.lastIndexOf('.'), fileName.length)

// 管道流实现文件拷贝
const pipeStream = (readPath, writePath, index, size) => {
  return new Promise((resolve) => {
    // 创建可读流
    const readStream = fs.createReadStream(readPath)
    // 创建可写流
    const writeStream = fs.createWriteStream(writePath, {
      start: index * size
    })
    // 管道流实现文件拷贝
    readStream.pipe(writeStream)
    // 读取完成后删除切片
    readStream.on('end', () => {
      fs.unlinkSync(readPath)
      resolve()
    })
  })
}

// 合并文件夹中的切片
const mergeFileChunk = async (filePath, fileHash, size) => {
  const CHUNK_DIR = path.resolve(UPLOAD_DIR, fileHash)
  // 读取切片临时目录下的所有切片名
  const chunkPaths = fs.readdirSync(CHUNK_DIR)
  // 根据切片名下标进行排序
  chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1])
  // 管道流的Promise列表
  const pipeList = chunkPaths.map((chunkPath, index) =>
    pipeStream(path.resolve(CHUNK_DIR, chunkPath), filePath, index, size)
  )
  await Promise.all(pipeList)
  // 文件合并后删除切片临时目录
  fs.rmdirSync(CHUNK_DIR, { recursive: true })
}

// 处理上传的分片
router.post('/merge_file', async (req, res) => {
  const { fileHash, fileName, size } = req.body
  const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${extractExt(fileName)}`)
  await mergeFileChunk(filePath, fileHash, size)
  res.status(200).json({
    code: '0000',
    msg: '合并成功'
  })
})

module.exports = router
