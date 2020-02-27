//导入用户集合构造函数
const {User} = require('../../model/user');
module.exports = async (req, res) => {
    //获取get请求参数id值
    const id = req.query.id;
    //将该id代表的用户信息在数据中删除
    await User.findOneAndDelete({_id: id});
    //重定向回用户列表页面
    res.redirect('/admin/user');
}