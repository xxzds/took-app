/* eslint-disable */
var Mock = require('mockjs')

// 推荐
Mock.mock('http://www.tooklili.com:81/tookApp/getItemImg', {
    'code': 0,
    'msg': '',
    'data|2-3':[
       {
       	'title':'@csentence',
       	'news_from':'@ctitle',
       	'news_click|1-100':1,
       	'imgSrc': Mock.Random.image(50)
       }
    ]
    })
