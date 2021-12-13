const mongoose = require("mongoose");
const { Random } = require('mockjs')
//连接数据库
mongoose.connect("mongodb://localhost:27017/admin").then(res => {
    console.log('数据库连接成功');
}, err => {
    console.log(err);
})

//创建一个数据模型
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
})
const User = mongoose.model('users', userSchema);

//添加数据 name age sex specialty专业 班级  学校
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    }

})

const Student = mongoose.model('students', studentSchema);

// for (var i = 0; i < 100; i++) {
//     let sex = Random.boolean() ? '男' : '女'
//     let specialty = '计算机应用计技术'
//     let grade = Random.boolean() ? '计应1班' : '计应2班'
//     let info = {
//         name: Random.cname(),
//         age: Random.integer(20, 25),
//         sex,
//         specialty,
//         grade
//     }
//     new Student(info).save()
// }

module.exports = {
    User,
    Student
}