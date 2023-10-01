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
    path: "/article/:id",
    component: () => import("@/view/Article/ArticleDetail.vue"),
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
    path: "/moment",
    component: () => import("@/view/Moment/Moment.vue"),
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

//暴露挂载
export default router;
