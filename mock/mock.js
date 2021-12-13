const Mock = require('mockjs')
let data = Mock.mock({
    meta: {
        msg: "请求成功"
    },
    "list|10": [
        {
            "id|+1": 1,
            name: "@cname",
            age: "@integer(10,20)",
            "job|1": ["web", "UI", "python", "php"]    //数组中取一个
        }
    ]
})


console.log(data);

Mock.mock('https://www.test.com/info', 'get', () => data)