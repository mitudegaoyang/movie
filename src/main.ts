import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dayjs from "dayjs";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.min.css";
import VueWechatTitle from "vue-wechat-title";

const app = createApp(App);
app.config.globalProperties.$dayjs = dayjs;

app.use(Antd).use(VueWechatTitle).use(store).use(router).mount("#app");
