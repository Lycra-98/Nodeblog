//导入文章集合构造函数
const {Article} = require('../../model/article');
//导入分页查询第三方模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {

    //接收传过来的页码
    let page = req.query.page;

    //添加表示,表示当前显示的是文章管理页面
    req.app.locals.currentLink = 'article';

    //查询出所有的文章信息,需要联合查询出作者字段对应用户信息
    //author属性存着用户信息对象
    //调用模块返回的方法,pagination(用户集合构造函数)
    //page()表示当前页,size()每一页显示的数据,display()页面中分页器的数目,exec()表示向数据库发送查询请求
    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();

    // res.send(articles);

    // 文章列表页面
    res.render('admin/article', {
        articles: articles
    });
}