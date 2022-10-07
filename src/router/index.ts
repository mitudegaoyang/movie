import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import MobileHome from "../views/MobileHome.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: () =>
      import(/* webpackChunkName: "pcDetail" */ "../views/Detail.vue"),
  },
  {
    path: "/mobile",
    name: "mobileHome",
    component: MobileHome,
  },
  {
    path: "/mobile/detail/:id",
    name: "mobileDetail",
    component: () =>
      import(
        /* webpackChunkName: "mobileDetail" */ "../views/MobileDetail.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
