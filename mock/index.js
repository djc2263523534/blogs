const https = require("https");
const url = 'http://www.netbian.com/index_2.htm';
const axios = require('axios');
const cheerio = require('cheerio')
const download = require('download')

// https.request(url, res => {
//     let data = ''
//     res.on('data', chunks => data += chunks)
//     res.on('end', () => {
//         console.log(data);
//     })
// })

axios.request(url).then(res => {
    let $ = cheerio.load(res.data);
    let els = $('.list li img');
    let imgList = []
    els.each((index, el) => {
        imgList.push($(el).attr('src'))
    })
    console.log(imgList.length);


})