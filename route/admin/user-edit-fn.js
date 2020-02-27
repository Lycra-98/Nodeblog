//引入用户集合构造函数
const {User,validateFn} = require('../../model/user');
//引入加密模块
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    //服务器端验证用户提交的信息是否符合格式
    try{
        //验证请求参数是否符合规则
        await validateFn(req.body);
    }catch(err) {
        //将错误信息通过get方式重定向回页面编辑页,将get错误信息渲染到页面中
        // return res.redirect(`/admin/user-edit?message=${err.message}`);
        //next里面只能传入字符串用JSON.stingify转化为字符串形式,调用错误中间件,阻止程序向下执行
        return next(JSON.stringify({path: '/admin/user-edit', message: err.message}));
    }

    //验证成功没有错误进入这一步,查询邮箱是否被注册
    let user = await User.findOne({email: req.body.email});
    //如果查询到了这个对象不为空,说明邮箱被占用,重定向错误信息
    if (user) {
       return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱地址被占用'}))
    }
    //邮箱没有被占用,对密码进行加密
    let salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(req.body.password, salt);
    //替换加密密码
    req.body.password = password;
    //将用户添加到数据库中
    await User.create(req.body);
    //重定向会用户列表页
    res.redirect('/admin/user');
}