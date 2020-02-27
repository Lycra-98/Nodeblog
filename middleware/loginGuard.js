module.exports = (req, res, next) => {
    //判断用户访问的是否是登陆页面
    //判断用户是否登录
    //如果访问的不是登陆页面也没有登陆重定向回登陆页面
    //如果登陆了并且访问的不是登录页面就放行
    if (req.url !== '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        //如果登录了判断角色进入不同的页面
        if (req.session.role == 'normal') {
            //普通用户只能浏览博客前台页面,阻止程序向下进行
            return res.redirect('/home/');
        }
        //放行交给下一个中间件
        next()
    }
}