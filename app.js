const express = require('express');
const app = express()
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const indexRouter = require('./routes/users')
const studentRouter = require('./routes/students')

//post 请求
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require('./db/index')

//ejs模板
// 注册ejs模板为html页。以.ejs为后缀的模板页，现在的后缀名可以是.html
app.engine('.html', require('ejs').__express);
// 设置视图模板的默认后缀名为.html, 避免了每次res.Render("xx.html")的尴尬
app.set('view engine', 'ejs');
// 设置模板文件文件夹
app.set('views', __dirname + '/views');

//静态资源服务  ··
app.use('/static', express.static(path.join(__dirname, 'public')))

//日志
// morgan.format('self', ':method :url :status')
// app.use(morgan('self'))
app.use(morgan('tiny'))

//允许跨域
app.use(cors())

//挂载路由
app.use('/api', indexRouter)
app.use(studentRouter)


app.listen(3000, () => {
    console.log('服务器启动');
})