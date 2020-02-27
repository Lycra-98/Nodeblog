//引入文章集合构造函数
const {Article} = require('../../model/article');

module.exports = async (req, res) => {
    //获取get请求参数
    let id = req.query.id;
    //删除该id的文章
    await Article.findOneAndDelete({_id: id});
    //重定向回文章列表页面
    res.redirect('/admin/article');
}