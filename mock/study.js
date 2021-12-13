const Mock = require('mockjs');

/* 
Mock.mock({})    Mock.mock()
1.字符串的使用 
"字符串名称 | 数量 ：字符串"

*/

//string    
let str = Mock.mock({
    "nameString|5": "♥"
})
// console.log(str);

//number
let num1 = Mock.mock({
    "nameNumber|+1": 1
})
let num2 = Mock.mock({
    "nameNumber|1-10": 1
})
let num3 = Mock.mock({
    "nameNumber|1-10.1-2": 1      //小数点后表示位数
})
// console.log(num3);

//Boolean 切换
let flag = Mock.mock({
    "nameFlag|1": true
})
// console.log(flag);


console.log(Mock.Random.now());
// app.get('/', (req, res) => {
//     res.json({ name: '45' })
// })

Mock.mock('http://127.0.0.1:802/api/index', 'get', () => {
    return Mock.mock({
        "id|+1": 1,
        name: "@cname",
        "age|18-25": 18,
        time: "@now()"
    })
})


