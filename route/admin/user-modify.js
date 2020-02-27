//导入用户构造函数
const {User} = require('../../model/user');
//引入密码模块
const bcrypt = require('bcrypt');
module.exports = async (req, res, next) => {
    //用户的请求参数
    const {username, email, password, role, state} = req.body;
    //用户的get请求参数id
    const id = req.query.id;
    //通过id查找出用户信息
    let user = await User.findOne({_id: id});
    //将用户输入的密码与数据库查询出来的密码进行比对,返回布尔值
    let result = await bcrypt.compare(password, user.password);
    if (result) {
        //密码比对成功,返回true
        // res.send('密码比对成功')
        //将用户信息更新到数据库中,不修改密码
         await User.updateOne({_id: id}, {
            username: username,
            email: email,
            role: role,
            state: state
        })

        //重定向回用户列表页
        res.redirect('/admin/user');
    } else {
        //密码比对失败,返回false
        //触发错误处理中间件,重定向会用户修改页面
        let obj = {path: '/admin/user-edit', message: '密码比对失败,请输入正确密码才能修改信息', id: id};
        next(JSON.stringify(obj));
    }
}