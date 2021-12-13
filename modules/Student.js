const { Student } = require('../db/index')

//添加学生信息
const createStudent = (info) => {
    let stu = new Student(info)
    return stu.save()
}

//查询学生
const findOne = (name) => {
    return Student.findOne(name)
}

//通过id查询
const findRemove = (id) => {
    return Student.findByIdAndRemove(id)
}

//查询所有学生 
const findAll = () => {
    return Student.find().sort({ _id: -1 })
}


//更新数据
const findUpdate = (id, info) => {
    return Student.findByIdAndUpdate(id, info)
}


module.exports = {
    createStudent,
    findOne,
    findRemove,
    findAll,
    findUpdate
}
