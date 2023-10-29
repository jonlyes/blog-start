import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Jonlyes",
    component: () => import("@/view/Jonlyes/Jonlyes.vue"),
  },
  {
    path: "/article",
    name: "Article",
    component: () => import("@/view/Article/Article.vue"),
  },
  {
    path: "/article/:id",
    name: "ArticleItem",
    component: () => import("@/view/Article/ArticleDetail.vue"),
  },
  {
    path: "/article/:id/update",
    name: "ArticleUpdate",
    component: () => import("@/view/Article/ArticleEdit.vue"),
  },
    {
    path: "/article/create",
    name: "ArticleCreate",
    component: () => import("@/view/Article/ArticleCreate.vue"),
  },

  {
    path: "/project",
    name: "Project",
    component: () => import("@/view/Project/Project.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/view/Admin/Admin.vue"),
  },
  {
    path: "/moment",
    name: "Moment",
    component: () => import("@/view/Moment/Moment.vue"),
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/view/NotFound/NotFound.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
];

// 创建路由对象
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});


//暴露挂载
export default router;
