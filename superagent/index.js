const superagent = require('../config/superagent')
const cheerio = require('cheerio')
const request = require('request')
const ONE = 'http://wufazhuce.com/' // ONE的web版网站
const POISON = 'https://8zt.cc/' //毒鸡汤网站
const TXHOST = 'https://api.tianapi.com/txapi/' // 天行host 官网：tianapi.com
const APIKEY = '47263bc109765510b6d2b003a6c5da0a' // 天行key，请先去网站注册填写key  注册免费  注册后申请下面的接口即可。
/*-----------------------------------*\ 
天行api 官网https://www.tianapi.com/
账号：17604626404
密码：517182343lsc
\*-----------------------------------*/

/**
 * 获取毒鸡汤
 */
async function getSoup() {
  try {
    let res = await superagent.req(POISON, 'GET')
    let $ = cheerio.load(res.text)
    const content = $('#sentence').text()
    return content
  } catch (err) {
    console.error('err')
    return err
  }
}

/**
 * 获取舔狗
 */
async function getTianDog() {
  const url = TXHOST + 'tiangou/index'
  try {
    let res = await superagent.req(url, 'GET', {
      key: APIKEY,
    })
    let content = JSON.parse(res.text)
    if (content.code === 200) {
      return content.newslist[0].content
    } else {
      console.log('获取接口失败', content.msg)
    }
  } catch (err) {
    console.log('获取接口失败', err)
  }
}

// pyqwenan/index
/**
 * 获取朋友圈文案
 */
async function getpyq() {
  const url = TXHOST + 'pyqwenan/index'
  try {
    let res = await superagent.req(url, 'GET', {
      key: APIKEY,
    })
    let content = JSON.parse(res.text)
    if (content.code === 200) {
      return content.newslist[0].content
    } else {
      console.log('获取接口失败', content.msg)
    }
  } catch (err) {
    console.log('获取接口失败', err)
  }
}


/**
 * 获取分手文案
 */
async function getFenShou() {
  const url = TXHOST + 'hsjz/index'
  try {
    let res = await superagent.req(url, 'GET', {
      key: APIKEY,
    })
    let content = JSON.parse(res.text)
    if (content.code === 200) {
      return content.newslist[0].content
    } else {
      console.log('获取接口失败', content.msg)
    }
  } catch (err) {
    console.log('获取接口失败', err)
  }
}

//每日简报
async function getNews() {
  const url = 'http://api.tianapi.com/bulletin/index'
  try {
    let res = await superagent.req(url, 'GET', {
      key: APIKEY,
    })
    let content = JSON.parse(res.text)
    if (content.code === 200) {
      return JSON.stringify(content.newslist)
    } else {
      console.log('获取接口失败', content.msg)
    }
  } catch (err) {
    console.log('获取接口失败', err)
  }
}
//网易云热评
async function getEmo() {
  const url = 'http://api.tianapi.com/txapi/hotreview/index'
  try {
    let res = await superagent.req(url, 'GET', {
      key: APIKEY,
    })
    let content = JSON.parse(res.text)
    if (content.code === 200) {
      return JSON.stringify(content.newslist)
    } else {
      console.log('获取接口失败', content.msg)
    }
  } catch (err) {
    console.log('获取接口失败', err)
  }
}
module.exports = {
  getSoup,
  getTianDog,
  getpyq,
  getFenShou,
  getNews,
  getEmo
}
