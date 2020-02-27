//引用express框架
const express = require('express');
//创建admin路由,博客管理
const admin = express.Router();

//呈现登陆页面路由
admin.get('/login', require('./admin/loginpage'));

//设置post请求登陆功能页面
admin.post('/login', require('./admin/login'));

//设置退出功能路由
admin.get('/logout', require('./admin/logout'));

//呈现用户列表页路由
admin.get('/user', require('./admin/userpage'));

//呈现用户编辑页路由
admin.get('/user-edit', require('./admin/user-edit'));

//实现post页面编辑新增用户功能
admin.post('/user-edit', require('./admin/user-edit-fn'));

//实现post请求用户修改功能
admin.post('/user-modify', require('./admin/user-modify'));

//实现用户删除功能路由
admin.get('/user-remove', require('./admin/user-remove'));

//呈现文章管理列表页面
admin.get('/article', require('./admin/article'));

//呈现文章编辑页面
admin.get('/article-edit', require('./admin/article-edit'));

//实现文章添加功能路由
admin.post('/article-add', require('./admin/article-add'))

//实现post请求文章修改功能路由
admin.post('/article-modify', require('./admin/article-modify'))

//实现文章删除功能路由
admin.get('/article-remove', require('./admin/article-remove'))

//导出路由对象
module.exports = admin;