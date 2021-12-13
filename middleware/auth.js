const { verify } = require('../utils/tools')

const isAuth = (req, res, next) => {
    let token = req.get('Authorization');
    try {
        let result = verify(token);
        if (result) return next()
    } catch (error) {
        res.render('fail', {
            data: JSON.stringify(null),
            meta: JSON.stringify({
                message: '无效token',
                status: 404
            })
        })
    }
}


module.exports = {
    isAuth
}