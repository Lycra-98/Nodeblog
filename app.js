//引用express框架
const express = require('express');
//创建网站服务器
const app = express();
//引入时间格式处理第三方模块
const format = require('dateformat');
//引入art-template模板引擎配置时间格式处理方法
const template = require('art-template');
//引入morgan模块在开发环境下打印请求信息
const morgan = require('morgan');
//导入config模块配置不同环境下的配置信息
const config = require('config');
//引入模块化路由
const home = require('./route/home');
const admin = require('./route/admin');
const path = require('path');
//数据库连接
require('./model/connect');
//引入读取post请求参数
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}));
//引入express-session添加section对象
const session = require('express-session');
//配置session,拦截所有请求,给请求对象下面添加session对象同时生成唯一代表该对象的sessionid,并将sessionid以加密字符串的形式存在客户端的cookie中
//配置session设置cookie的过期时间
app.use(session({secret: 'secret key',resave: false,saveUninitialized: false,cookie:{maxAge: 24 * 60 * 60 * 1000}}))

//开放静态资源
app.use(express.static(path.join(__dirname, 'public')));

//使用config.get()方法可以读取不同环境下的配置信息,它会自动判断该环境是开发环境还是生产环境再去读取信息
// console.log(config.get('title'));

//获取系统环境变量,返回值是对象里面存着所有的系统环境变量,我们选取我们想要的环境变量属性
// if (process.env.NODE_ENV == 'development') {
//     //说明当前是开发环境
//     console.log('当前是开发环境');
//     //调用中间件打印请求信息
//     app.use(morgan('dev'));
// } else {
//     console.log('当前是生产环境');
// }

//模板引擎配置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
app.engine('art', require('express-art-template'));

//将时间格式处理方法导出,共所有模板使用
template.defaults.imports.format = format;

//拦截请求,做登录拦截判断
app.use('/admin', require('./middleware/loginGuard'))

//给路由添加指定路径
app.use('/home', home);
app.use('/admin', admin);

//错误处理中间件
app.use((err,req,res,next) => {
    //err接收就是错误处理next传过来的参数传过来的是字符串,转化为对象
    let result = JSON.parse(err);
    //let obj = {path: '/admin/user-edit', message: '密码比对失败,请输入正确密码才能修改信息', id: id};
    //用于拼接请求参数的数组
    let arr = [];
    //路径都是一样的,后面get请求参数不同,因此需要重新凭借path后面的请求参数
    for (let k in result) {
        if (k !== 'path') {
            arr.push(k + '=' + result[k]);
        }
    }
    // console.log(arr);拼接好数组为下面的,然后用join方法&分隔成字符串拼接到？问号后面即可
    //["message=密码比对失败,请输入正确密码才能修改信息","id=5e4f93fedab52110c0aa930c"]
    return res.redirect(`${result.path}?${arr.join('&')}`);
})

//监听端口
app.listen(80, () => {
    console.log('服务器创建成功,请访问localhost');
});