//导入用户集合构造函数
const {User} = require('../../model/user');

module.exports = async (req, res) => {
    let {message, id} = req.query;

    //添加表示,表示当前显示的是用户管理页面
    req.app.locals.currentLink = 'user';

    //判断是否get参数中有id属性
    if (id) {
        //有id是用户修改页面
        //根据用户id查找用户
        let user = await User.findOne({_id: id});
        //将用户信息渲染到修改信息页面中
        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: `/admin/user-modify?id=${id}`,//修改页面的表单数据提交地址为user-modify
            button: '修改'
        });
    } else {
        //用户添加页面
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',//新增用户页面的表单数据提交地址为user-edit
            button: '添加'
        });
    }

}