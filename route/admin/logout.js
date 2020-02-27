module.exports = (req, res) => {
    //删除用户对应的session,destroy()方法
    req.session.destroy(() => {
        //删除cookie,connect.sid('想要删除的cookie名字')
        res.clearCookie('connect.sid');
        //重定向会登陆页面
        res.redirect('/admin/login');
        //删除locals下的userInfo属性
        req.app.locals.userInfo = null;
    })
}