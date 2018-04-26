import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$http = axios

// 应用数据和后台富文本数据的地址不同
//let baseUrl = 'http://www.tooklili.com:81/tookApp/'
let baseUrl = 'http://'+window.location.host+'/tookApp/'

const ajaxURL = {
    // 主页
    queryItemCates: baseUrl + 'queryItemCates',                //分类
    querycouponItems:baseUrl + 'couponItems', //全部商品
    querygetitem:baseUrl + 'getitem', //商品详情
    querygetQrCodeBase64:baseUrl + 'getQrCodeBase64', //获取二维码
    querygetItemImages :baseUrl + 'taobao/getItemImages' , //商品图文
    querygetRandomItemByCateId :baseUrl + 'getRandomItemByCateId' , //本栏精品
    querygetItemImg :baseUrl + 'getItemImg' , //获取轮播图片
    quergetTwdAndShortLinkInfo: baseUrl + 'getTwdAndShortLinkInfo',//获取淘口令和短链接信息
    querySuggest: baseUrl + 'suggest', //获取模糊查询
    queryCouponItemsByKeyWords: baseUrl + "queryCouponItemsByKeyWords",//关键字查询商品
    getRandomItemByCateId: baseUrl + "getRandomItemByCateId",//通商品类别查询
    querysuperSearchItems: baseUrl + "superSearchItems",//超级搜查询
}

export var fetch = async(type = 'POST', url = '', data = {}) => {
    let result
    type = type.toUpperCase()
    url = ajaxURL[url]
    if (type === 'GET') {
        await axios.get(url, { params: data })
        .then(res => {
            result = rres.data
        })
    } else if (type === 'POST') {
        await axios.post(url, qs.stringify(data))
        .then(res => {
            result = res.data
        })
    }
    return result
}

const getitemUrl = "http://www.tooklili.com:81/tookApp/getitem/"
//const validateCode = "http:/http://192.168.20.206:8080/oil-manage/nosession/getValidateCode"
export {getitemUrl}
