//引入文章集合构造函数
const {Article} = require('../../model/article');
//引入分页查询模块
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    //接受传过来的页面get参数
    const page = req.query.page

    //分页从数据库中查询所有的文章,并且联合查询出作者信息
    let result = await pagination(Article).find().populate('author').page(page).size(4).display(4).exec();

    // 渲染数剧
    res.render('home/default.art', {
        result: result
    });
}