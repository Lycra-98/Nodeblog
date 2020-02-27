//导入用户集合构造函数
const {User} = require('../../model/user');
module.exports = async (req, res) => {

    //添加表示,表示当前显示的是用户管理页面
    req.app.locals.currentLink = 'user';

    //当前页通过get参数传过来
    let page = req.query.page || 1;
    //每页显示的数据
    let pagedata = 10;
    //总页数 = 从数据库查询的总数据 / 10 再向上取整
    //从数据库查询用户的总数
    let count = await User.countDocuments({});
    //总页数
    let total = Math.ceil(count / 10);
    //查询的数据,每次只查十个数据,渲染到页面,当前页的get参数page - 1 再乘以10就是每一页开始起始数据
    let start = (page - 1) * 10
    let user = await User.find().limit(10).skip(start);
    res.render('admin/user', {
        user: user,
        page: page,//控制上一页下一页的数据
        total: total//控制分页器的总数
    })
}