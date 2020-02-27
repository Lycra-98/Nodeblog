//引用express框架
const express = require('express');
//创建home路由,内容展示页面
const home = express.Router();

//博客前台首页展示
home.get('/', require('./home/index'));

//博客前台文章详情展示
home.get('/article', require('./home/article'));

//博客文章评论功能
home.post('/comment', require('./home/comment'));

//导出路由对象
module.exports = home;