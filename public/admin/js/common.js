//获取登录表单值方法
function getValue(form) {
    //定义一个空对象
    let obj = {};
    //使用serializeArray()方法获取所有表单控件值返回一个对象
    let arr = form.serializeArray();
    //将数组元素name属性值作为obj的属性,value属性值作为属性值
    arr.forEach(item => {
        obj[item.name] = item.value;
    })
    return obj;
}