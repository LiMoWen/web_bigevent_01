$(function () {
    // 1显示隐藏
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    $("#link_login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    });

    // 2自定义校验规则
    // 从layui中导出form
    var form = layui.form;
    //校验规则
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //确认密码规则
        repwd: function (vaiup) {
            var pwd = $(".reg-box input[name=password]").val()
            // 比较两次密码是否相等
            if (pwd !== vaiup) {
                return "两次密码不一致"
            }
        }
        
    });
    //4注册功能
    var layer = layui.layer;
    $("#form_reg").on("submit", function (e) {
        //阻止默认表单提交
        e.preventDefault();
        //发送Ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            },
            success: function (res) {
                //返回状态判断
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //提交成功后处理代码
                layer.msg("注册成功，请登录");
                $("#link_login").click();
                $("#form_reg")[0].reset();         
            }
        })
    })
    // 登录功能
    $("#form_login").submit(function (e) {
        //阻止默认表单提交 
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //提示信息 保存token，调换页面
                layer.msg("恭喜您，登录成功");
                //保存token，未来接口要使用token
                localStorage.setItem("token", res.token);
                //跳转
                location.href = "/index.html";
            }
        })
    }) 
      
    
})