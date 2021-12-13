const { User } = require('../db/index');

//注册用户信息
const createUser = ({ username, password }) => {
    let p = new User({ username, password })
    return p.save()
}

//查询所有数据
const findAll = () => {
    return User.find()
}
// 
//通过 username 查询数据
const findUserName = (userInfo) => {
    return User.findOne(userInfo)
}

module.exports = {
    createUser,
    findAll,
    findUserName
}