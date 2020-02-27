//引入文章集合构造函数
const {Article} = require('../../model/article');
//引入评论集合构造函数
const {Comment} = require('../../model/comment');

module.exports = async (req, res) => {
    //获取传过来的id参数
    const id = req.query.id

    //根据id查询出文章信息,注意联合查询作者信息
    let article = await Article.findOne({_id: id}).populate('author');

    //根据aid(即当前文章的id)查询出属于该文章的评论信息,联合查询登陆用户的信息,将数据渲染到页面中
    //这里使用find方法查询,因为属于一篇文章的评论有多条
    let comment = await Comment.find({aid: id}).populate('uid');

    res.render('home/article.art', {
        article: article,
        comment: comment
    })
}