//引入用户集合构造函数
const {User} = require('../../model/user');
//引入密码加密模块
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    //接受请求参数
    let {email, password} = req.body;
    //防止禁止浏览器脚本,服务端二次验证,如果邮箱或密码的长度为零,跳转到错误页面,阻止程序向下运行
    if (email.trim().length === 0 || password .trim().length === 0) return res.status(400).render('admin/error',{msg: '错误警告:邮箱地址或密码错误'});
    //根据邮箱地址查找用户信息
    //查找出来是一个对象里面存放了用户信息
    //如果没有查找出来就是空对象
    let user = await User.findOne({email});
    //如果user不为空对象,说明查找出来了该信息
    if (user) {
        //对加密密码进行比较compare()方法第一个参数明文密码,第二个参数加密的密码,返回布尔值
        //true为匹配成功,false为匹配失败
        let result = await bcrypt.compare(password, user.password)
        //比对密码成功就登陆成功
        if (result) {
            //登陆成功即可访问该请求对象下存储的用户名
            req.session.username = user.username;
            //将用户的角色信息存在session中
            req.session.role = user.role;
            // res.send('登陆成功')
            //将用户信息储存在local对象下攻所有模板使用
            //这里不用引用app.js，请求对象下的app属性就是我们创建的那个服务器对象
            req.app.locals.userInfo = user;

            //登陆成功之后判断用户的角色权限,如果是普通用户跳转到博客首页,如果是超级管理员才能进入博客后台管理页面
            if (user.role == "normal") {
                //普通用户
                res.redirect('/home/');
            } else {
                //超级管理员用户
                res.redirect('/admin/user');
            }
 
        } else {
            //密码比对失败
            res.status(400).render('admin/error',{msg: '错误警告:邮箱地址或密码错误'});
        }
    } else {
        //user为空对象说明没有查找出来
        res.status(400).render('admin/error',{msg: '错误警告:邮箱地址或密码错误'});
    }
}