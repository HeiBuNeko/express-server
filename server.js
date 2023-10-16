const express = require("express")

const app = express()

// get请求
app.get("/", (req, res) => {
  res.send("Hello World")
})

// post请求
app.post("/about", (req, res) => {
  res.send({ name: "HeiBuNeko", age: 18 })
})

const user = express.Router() // 创建子路由

user.get("/list", (req, res) => {
  res.send("User List")
})

user.get("/:userId", (req, res) => {
  res.send(req.params)
})

app.use("/user", user) // 注册子路由

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
  next()
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
