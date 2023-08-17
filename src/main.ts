import { createApp } from "vue";
import "./style.css";
// import '@/hook/useAstral/config.scss' // 星空背景样式
import App from "./App.vue";
import router from "./router";
import 'element-plus/dist/index.css' // elementPlus样式
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

console.log(process.env.NODE_ENV)

app.use(router);
app.mount("#app");
