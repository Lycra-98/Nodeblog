//导入评论集合构造函数
const {Comment} = require('../../model/comment');

module.exports = async (req, res) => {
    //获取传过来的请求参数
    const{content, uid, aid} = req.body
    //将评论信息存储到评论集合中
    await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    });
    //重定向为文章详情页,带上文章id
    res.redirect('/home/article?id=' + aid);
}