$.ajaxPrefilter((options) => {
  options.url = `http://www.liulongbin.top:3007` + options.url;
  //在请求之前给有权限的接口注入token
  if (options.url.includes("/my/")) {
    options.headers = {
      Authorization: localStorage.getItem("token"),
    };
  }
});
