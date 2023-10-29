import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "element-plus/dist/index.css"; // elementPlus样式
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia"; //store状态库
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import RemHandle from "@/utils/RemHandle"; // rem自适应
import "github-markdown-css";
import "@/global/index.scss";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

RemHandle.getInstance(1000);

app.use(router);
app.use(pinia);
app.mount("#app");
