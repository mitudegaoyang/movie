import axios from "axios"; // 引入axios
import { message as $message } from "ant-design-vue";

$message.config({
  duration: 2,
  maxCount: 1,
});

const UNKNOWN_ERROR = "未知错误，请重试";

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: "/mock-api/",
  // 超时
  timeout: 6000,
});
// request拦截器
service.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log(response);
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      $message.error(res.message || UNKNOWN_ERROR);

      // Illegal token
      if (res.code === 11001 || res.code === 11002) {
        window.localStorage.clear();
        window.location.reload();
        // to re-login
        // Modal.confirm({
        //   title: '警告',
        //   content: res.message || '账号异常，您可以取消停留在该页上，或重新登录',
        //   okText: '重新登录',
        //   cancelText: '取消',
        //   onOk: () => {
        //     localStorage.clear();
        //     window.location.reload();
        //   }
        // });
      }

      // throw other
      const error = new Error(res.message || UNKNOWN_ERROR) as Error & {
        code: any;
      };
      error.code = res.code;
      return Promise.reject(error);
    } else {
      return res;
    }
  },
  (error) => {
    console.log(error);
    // 处理 422 或者 500 的错误异常提示
    const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR;
    $message.error(errMsg);
    error.message = errMsg;
    return Promise.reject(error);
  }
);

export default service;
