//导入文章集合构造函数
const {Article} = require('../../model/article');
//导入表单解析第三方模块
const formidable = require('formidable');
const path = require('path');

module.exports = (req, res) => {
    //接收请求参数id
    const id = req.query.id;
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    form.keepExtensions = true;
    form.parse(req, async (err, field, files) => {
        //修改表单中的数据
        await Article.updateOne({_id: id}, {
            title: field.title,
            publishDate: field.publishDate,
            cover: files.cover.path.split('public')[1],
            content: field.content
        })
        //重定向回文章列表页面
        res.redirect('/admin/article');
    })
}