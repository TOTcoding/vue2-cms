import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";

import localCache from "../utils/cache";
import store from "../store/index";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 解决重复点击相同路由报错问题
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};

router.beforeEach((to, from, next) => {
  const token = localCache.getCache("token");
  // console.log(to.path);
  if (to.path !== "/login") {
    if (!token) {
      router.push("/login");
    }
  }
  if(to.path !== '/login' && to.path !== '/main') {
    if(token) {
      store.commit("changeToPath", to.path);
    }
  }
  next();
});

export default router;
export { routes };
