const express = require('express');
const router = express.Router();
const { createStudent, findOne, findRemove, findAll, findUpdate } = require('../modules/Student')
const { isAuth } = require('../middleware/auth')

/* 
 name age sex specialty  grade
*/

//添加学生
router.post('/student', async (req, res) => {
    let student = await findOne({ name: req.body.name })
    if (student) return res.render('fail', {
        data: JSON.stringify({
            message: '学生信息已存在',
            status: 404
        })
    })
    let result = await createStudent(req.body);

    if (!result) return res.render('fail', {
        data: JSON.stringify({
            message: '添加学生失败',
            status: 404
        })
    })
    res.render('succ', {
        data: JSON.stringify({
            message: '添加学生成功',
            status: 200
        })
    })
})
//删除学生
router.delete('/student/:id', async (req, res) => {
    try {
        let student = await findRemove(req.params.id);
        res.render('succ', {
            data: JSON.stringify({
                message: '学生删除成功',
                status: 200
            })
        })
    } catch (error) {
        res.render('fail', {
            data: JSON.stringify({
                message: '学生删除失败',
                status: 404
            })
        })
    }
})
//获取所有学生信息 (分页)
router.get('/student/list', isAuth, async (req, res) => {
    let currentPage = parseInt(req.query.page) || 1 //当前页码
    let limit = 10;  //每页显示条数 
    let count = await findAll(currentPage).count() //总条数
    let pages = Math.ceil(count / limit)       //总页数
    let student = await findAll(currentPage).limit(limit).skip((currentPage - 1) * 10)
    if (!student) return res.render('fail', {
        data: JSON.stringify(null),
        meta: JSON.stringify({
            message: '获取学生列表失败',
            status: 404
        })
    })
    res.render('succ', {
        data: JSON.stringify({
            pages,
            currentPage,
            list: student,
        }),
        meta: JSON.stringify({
            msg: '获取学生列表成功',
            status: 200,
        }),
    })
})
//编辑学生
router.put('/student/:id', async (req, res) => {
    try {
        let result = await findUpdate(req.params.id, req.body)
        res.render('succ', {
            data: JSON.stringify({
                status: 200,
                message: "数据更新成功"
            })
        })
    } catch (error) {
        res.render('fail', {
            data: JSON.stringify({
                message: '数据更新失败',
                status: 404
            })
        })
    }


})










module.exports = router