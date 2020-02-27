//引入第三方模块mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//引入joi验证对象第三方模板
const joi = require('joi');
//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,//作为登陆的凭证唯一值
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String //'admin'为超级管理员,'normal'为普通用户
    },
    state: {
        type: Number,
        default: 0 //默认为0为启用状态,1为禁用状态
    }
})

//创建用户集合
const User = mongoose.model('User', userSchema);

//测试加密函数
async function getHash() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('19981024', salt);
    // 测试添加用户代码
    const user = await User.create({
        username: 'caoqiang',
        email: 'caoqiang@163.com',
        password: pass,
        role: 'admin',
        sate: 0
    });
    console.log(user);
}

//数据验证
const validateFn = user => {
    //定义验证对象规则
    const schema = {
        username: joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email: joi.string().email().required().error(new Error('邮箱地址不符合验证规则')),
        password: joi.string().regex(/^[a-zA-Z0-9_-]{6,16}$/).required().error(new Error('密码不符合验证规则')),
        role: joi.string().valid('admin', 'normal').required(),
        state: joi.number().valid(0,1)
    }
    //验证请求参数传过来的对象,返回promise对象,需要获取成功信息和错误信息
    return joi.validate(user, schema);
}

// getHash();

//将用户集合构造函数导出
module.exports = {
    User: User,
    validateFn: validateFn
}