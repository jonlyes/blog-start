import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "jonlyes",
    component: () => import("@/view/Jonlyes/Jonlyes.vue"),
  },
  {
    path: "/article",
    component: () => import("@/view/Article/Article.vue"),
  },
  {
    path: "/project",
    component: () => import("@/view/Project/Project.vue"),
  },
  {
    path: "/admin",
    component: () => import("@/view/Admin/Admin.vue"),
  },
  {
    path: "/mirror",
    component: () => import("@/view/Mirror/Mirror.vue"),
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/view/NotFound/NotFound.vue"),
  },
];

// 创建路由对象
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});

router.beforeEach((to, from) => {
  // token值
  // const token = getToken();
  // // 判断是否登录
  // if (!token) {
  //   if (to.path !== "/login" && to.path !== "/reg" && to.path !== "/retrievepass") {
  //     success("请先登录");
  //     return { path: "/login" };
  //   }
  // }
  // //防止重复登录
  // if (token && to.path == "/login") {
  //   if (from.path == "/login") {
  //     return { path: "/" };
  //   }
  //   return { path: from.path !== "/login" ? from.path : "/" };
  // }
});

//暴露挂载
export default router;
