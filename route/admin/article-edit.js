//导入文章集合构造函数
const {Article} = require('../../model/article');

module.exports = async (req, res) => {

    //添加表示,表示当前显示的是文章管理页面
    req.app.locals.currentLink = 'article';

    //获取用户id值
    let id = req.query.id;

    if (id) {
        //文章修改页面
        //根据id查询当前用户信息
        let article = await Article.findOne({_id: id});
        res.render('admin/article-edit', {
            article: article,
            link: '/admin/article-modify?id=' + id,
            button: '修改文章'
        });
    } else {
        //文章新增页面
        res.render('admin/article-edit', {
            link: '/admin/article-add',
            button: '发布文章'
        });
    }

    //文章编辑页面
    
}