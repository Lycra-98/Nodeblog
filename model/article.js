//导入mongoose模块
const mongoose = require('mongoose');
//创建文件集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 4,
        maxlength: 30,
        required: [true, '请输入文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    publishDate: {
        type: Date,
        default: new Date()
    },
    cover: {
        type: String,
        default: null
    },
    content: String
})
//创建文章集合
const Article = mongoose.model('Article', articleSchema);
//导出文章集合构造函数
module.exports = {
    Article: Article
}