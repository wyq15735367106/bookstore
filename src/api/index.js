import axios from 'axios'
// eslint-disable-next-line no-unused-vars
// 配置API接口地址
var root = 'http://book.whatsfav.com/api/'
    // var root = 'http://192.168.31.19:81/api/'
    // axios.defaults.headers.post['content-Type'] = 'application/json;charset=UTF-8'

// 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
/** 参数过滤函数 */
function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}
// eslint-disable-next-line spaced-comment
/**添加headers,可以动态添加header参数 */
// eslint-disable-next-line space-before-blocks
function setHeaders(headers) {
    // axios.defaults.headers.Authorization = headers.Authorization
    // axios.defaults.headers.singleToken = headers.singleToken
}
// 其实success与failure这两个参数，传过来的是两个放方法
function apiAxios(method, url, headers, params, success) {
    if (headers) {
        headers = filterNull(headers)
        setHeaders(headers)
    }

    if (params) {
        params = filterNull(params)
    }
    axios({
            method: method,
            url: url,
            data: method === 'POST' || method === 'PUT' ? params : null,
            params: method === 'GET' || method === 'DELETE' ? params : null,
            baseURL: root,
            withCredentials: false
        })
        .then(function(res) {
            // console.log(res)
            if (res.data.code == 1) {
                success(res.data)
            } else if (res.data.code == 2) {
                alert(res.data.msg)
                window.location.href = '/'
            } else if (res.data.code == 0) {
                success(res.data)
            }
        })
        .catch(function(response) {
            // console.log(JSON.stringify(response))
        })
}

// 返回在vue模板中的调用接口
export default {
    get: function(url, headers, params, success) {
        return apiAxios('GET', url, headers, params, success)
    },
    post: function(url, headers, params, success) {
        return apiAxios('POST', url, headers, params, success)
    },
    put: function(url, headers, params, success) {
        return apiAxios('PUT', url, headers, params, success)
    },
    delete: function(url, headers, params, success) {
        return apiAxios('DELETE', url, headers, params, success)
    }
}

// 页面调用

// this.$api.get(
//     '/devices',                           //url
//     {"school_id":schoolId,"token":null},  //headers
//     null,                                 //params
//    successRes => {                        //success(data)方法
//     console.log(successRes)
//    },
//    failureRes =>{                        //failure(data)方法
//       console.log(failureRes)
//    }
//  )
//  //post请求
//  this.$api.post(
//     '/device',
//     {"school_id":schoolId,"token":null},
//     {"name": "test","operator_name": "xichuan"},
//     successRes =>{
//     console.log(successRes)
//    },
//    failureRes =>{
//       console.log(failureRes)
//    }
//  })