//引入formidabal表单数据解析第三方模块
const formidabal = require('formidable');
const path = require('path');
//导入文章集合构造函数
const { Article } = require('../../model/article');

module.exports = (req, res) => {
    //1.创建解析表单实例化对象
    const form = new formidabal.IncomingForm();
    //2.配置文件上传的地址
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    //3.保存上传文件的后缀名
    form.keepExtensions = true;
    //4.解析表单
    form.parse(req, async (err, field, files) => {
        //1.对象 err解析表单时候的错误信息,有错误信息该对象不为空,没有错误信息该对象为空
        //2.field 对象类型 里面存着普通数据,即除了文件上传之外传过来的请求数据
        //3.files 对象类型 存了一些关于上传的文件的一些信息
        //在数据库cover字段中存取的应该是文件的路径,是在浏览器上的绝对路径即public之后的路径
        // res.send(files.cover.path.split('public')[1]);
        // 将文章数据存取到数据库中
        await Article.create({
            title: field.title,
            author: field.author,
            publishDate: field.publishDate,
            cover: files.cover.path.split('public')[1],
            content: field.content
        })
        //重定向回用户列表页面
        res.redirect('/admin/article');
    })

}