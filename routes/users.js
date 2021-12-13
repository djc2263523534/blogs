const express = require("express");
const router = express.Router()

const { createUser, findUserName } = require('../modules/User')
const { hash, compare, sign } = require('../utils/tools')
const { upload } = require('../middleware/upload')
const { isAuth } = require('../middleware/auth')


//用户注册
router.post('/register',
    //验证参数
    (req, res, next) => {
        if (req.body.username === "") return res.render('succ', {
            data: JSON.stringify(null),
            meta: JSON.stringify({
                msg: '请输入用户名',
                status: 404
            })
        })
        if (req.body.password === "") return res.render('succ', {
            data: JSON.stringify(null),
            meta: JSON.stringify({
                msg: '请输入密码',
                status: 404
            })
        })
        next()
    },
    //处理业务逻辑
    async function (req, res, next) {
        let { username, password } = req.body
        //查询用户
        let result = await findUserName({ username })
        if (result) return res.render('succ', {
            data: JSON.stringify(null),
            meta: JSON.stringify({
                msg: '用户账号已存在',
                status: 404
            })
        })
        //密码加密
        let bcryptPassword = await hash(password)
        //注册
        let userReult = await createUser({ username, password: bcryptPassword });
        if (userReult) {
            res.render('succ', {
                data: JSON.stringify(null),
                meta: JSON.stringify({
                    msg: '用户注册成功',
                    status: 200
                })
            })
        } else {
            res.render('succ', {
                data: JSON.stringify(null),
                meta: JSON.stringify({
                    msg: '用户注册失败',
                    status: 404
                })
            })
        }
    })

//用户登录
router.post('/login', (req, res, next) => {
    console.log(req.body);
    //验证参数
    if (req.body.username === "") return res.render('succ', {
        data: JSON.stringify(null),
        meta: JSON.stringify({
            msg: '请输入用户名',
            status: 404
        })
    })
    if (req.body.password === "") return res.render('succ', {
        data: JSON.stringify(null),
        meta: JSON.stringify({
            msg: '请输入密码',
            status: 404
        })
    })
    next()
},
    //业务逻辑
    async (req, res, next) => {
        const { username, password } = req.body;
        let result = await findUserName({ username });
        if (!result) return res.render('fail', {
            data: JSON.stringify(null),
            meta: JSON.stringify({
                msg: '用户不存在',
                status: 404
            })
        })
        //验证密码
        let r = await compare(password, result.password)
        if (r) {
            //使用Token
            const rule = { id: result.id, name: result.username }
            let token = await sign(rule);
            res.render('succ', {
                data: JSON.stringify({
                    username,
                    token: token,
                }),
                meta: JSON.stringify({
                    msg: '登录成功',
                    status: 200
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify(null),
                meta: JSON.stringify({
                    msg: '密码错误',
                    status: 404
                })
            })

        }
    })


//主页菜单栏
router.get('/menus', (req, res) => {
    res.render('succ', {
        data: JSON.stringify([
            {
                "id": 101,
                "authName": "商品管理",
                "path": null,
                "children": [
                    {
                        "id": 104,
                        "authName": "商品列表",
                        "path": null,
                        "children": []
                    }
                ]
            }
        ]),
        meta: JSON.stringify({
            msg: '获取菜单列表成功',
            status: 200
        }),
    })

})






/* 
{
  fieldname: 'photo',
  originalname: '22.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: 'C:\\Users\\坟场蹦迪\\Desktop\\project\\blogs\\backend\\upload',
  filename: 'e7157c55a40c2cb525481e2231c97fd0',
  path: 'C:\\Users\\坟场蹦迪\\Desktop\\project\\blogs\\backend\\upload\\e7157c55a40c2cb525481e2231c97fd0',
  size: 237703a
}
*/
router.post('/upload', upload.array('photo', 3), (req, res) => {

    console.log(req.files);
    res.json({ msg: "上传成功" })
})








module.exports = router