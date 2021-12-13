const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//密码加密
exports.hash = (myPlaintextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
                if (err) {
                    reject(err)
                }
                resolve(hash)
            });
        });
    })
}
//验证密码
exports.compare = (myPlaintextPassword, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })
}

//使用Token
exports.sign = (rule) => {
    return new Promise((resolve, reject) => {
        jwt.sign(rule, 'secretOrKey', { expiresIn: 3600 }, (err, token) => {
            if (err) {
                reject(err)
            } else {
                resolve(token)
            }
        })
    })
}

//验证Token
exports.verify = (token) => {
    let result = jwt.verify(token, 'secretOrKey');
    return result

}