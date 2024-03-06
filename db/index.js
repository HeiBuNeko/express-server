// 建立 MySQL 模块
const mysql = require('mysql')
// 创建数据库连接
const db = mysql.createConnection({
  host: '127.0.0.1', // 数据库地址
  user: 'root', // 数据库用户
  password: 'heibuneko', // 数据库密码
  database: 'anime' // 选中数据库
})

// 插入数据库
// const mygo = { name: '猫宫白布', password: 'heibuneko' }
// const sqlStr = 'insert into mygo (name,password) values (?,?)'
// 插入数据库（便捷）
// const sqlStr = 'insert into mygo SET ?'
// db.query(sqlStr, mygo, (err, res) => {
//   if (err) console.log('数据库连接失败', err)
//   if (res.affectedRows === 1) console.log('数据库连接成功', res)
// })

// 更新数据库
// const mygo = { id: 14, name: '猫宫黑布' }
// const sqlStr = 'update mygo set name =? where id = ?'
// 更新数据库（便捷）
// const sqlStr = 'update mygo set ? where id = ?'
// db.query(sqlStr, [mygo, mygo.id], (err, res) => {
//   if (err) console.log('数据库连接失败', err)
//   if (res.affectedRows === 1) console.log('数据库连接成功', res)
// })

// 删除数据库
// const sqlStr = 'delete from mygo where id = ?'
// db.query(sqlStr, 14, (err, res) => {
//   if (err) console.log('数据库连接失败', err)
//   if (res.affectedRows === 1) console.log('数据库连接成功', res)
// })
// 标记删除
// const sqlStr = 'update mygo set status=? where id = ?'
// db.query(sqlStr, [1, 14], (err, res) => {
//   if (err) console.log('数据库连接失败', err)
//   if (res.affectedRows === 1) console.log('数据库连接成功', res)
// })

// 查询数据库
db.query('select * from mygo', (err, res) => {
  if (err) {
    console.log('数据库连接失败', err)
  } else {
    console.log('数据库连接成功', res)
  }
})

//直连数据库
module.exports = db
