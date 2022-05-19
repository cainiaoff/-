$(function () {
  // 点击实现切换隐藏效果
  $("#link_reg").click(() => {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").click(() => {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  // 获取form
  const form = layui.form;
  //定义表单验证规则
  form.verify({
    //定义校检密码的规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    //定义确认密码规则
    repwd: (val) => {
      const pwd = $(".reg-box [name=password]").val();
      if (val !== pwd) return "两次密码不一致";
    },
  });
  const baseUrl = "http://www.liulongbin.top:3007";
  // 导入 layui 的弹窗组件 layer
  const layer = layui.layer;
  // 监听注册表单提交，发送注册请求
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data: {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg("注册失败");
        layer.msg("注册成功");
        $("#link_login").click();
      },
    });
  });

  // 监听登陆表单提交，发送登陆请求
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success: (res) => {
        console.log(res);
        console.log($(this).serialize());
        if (res.status !== 0) return layer.msg("登陆失败");
        layer.msg("登陆成功");
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});
