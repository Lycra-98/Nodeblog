//创建文章评论集合
//导入mongoose模块
const mongoose = require('mongoose');

//创建评论集合规则
const commentSchema = new mongoose.Schema({
    //评论属于具体一篇文章的,关联文章集合,类型为id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    //评论里有登录用户的一些信息,关联用户集合,类型id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //评论发布时间
    time: Date,
    content: {
        type: String,
        required: [true, '请输入评论']
    }
})

//创建文章评论集合构造函数
const Comment = mongoose.model('Comment', commentSchema);

//将文章评论集合构造函数通过模块成员导出
module.exports = {
    Comment: Comment
}