import Vue from "vue";
import Vuex from "vuex";

import moduleSystem from "./system/moduleSystem";
import moduleAnalysis from './system/moduleAnalysis'
import { accountLoginRequest, requestUserInfoById, requestUserMenusByRoleId } from "@/service/login";
import localCache from "@/utils/cache";
import router from "@/router/index.js";
import { mapMenusToRoutes, pathMapToMenu } from "@/utils/map-menus";
import { getPageListData } from "../service/main/system";

Vue.use(Vuex);

const store =  new Vuex.Store({
  state: {
    token: '',
    userInfo: {},
    userMenus: {},
    hasRoutes: [],
    //toPath为导航栏即将跳转到的二级导航，通过路由守卫进行获取和修改
    toPath: '',
    //pathId为二级导航记录的id，用于给导航栏设置defalut-value属性（nav-menu组件），使得刷新以后也能定位到刷新前的位置
    pathId: '',
    entireDepartment: [],
    entireRole: []
  },
  mutations: {
    changeToken(state, token) {
      state.token = token;
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus) {
      state.userMenus = userMenus;

      // 把userMenus内的路由信息映射至routes
      const result = mapMenusToRoutes(userMenus);
      state.hasRoutes = result;
      state.hasRoutes.forEach(item => {
        router.addRoute('main', item);
      })
    },
    //路由守卫每次都调用以获取最新前往的路径
    changeToPath(state, toPath) {
      state.toPath = toPath;
      // console.log(state.userMenus);
      const menu = pathMapToMenu(state.userMenus, state.toPath);
      state.pathId = menu.id + '';
    },
    accountLoginAction(state, payload) {
      console.log("账号登录", payload);
    },
    phoneLoginAction(state, payload) {
      console.log("手机登录", payload);
    },
    changeEntireDepartment(state, list) {
      state.entireDepartment = list;
    },
    changeEntireRole(state, list) {
      state.entireRole = list;
    },
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload) {
      /* 登录逻辑
      取出传递过来的name和password作为登录请求的参数
      */
      const user = {name: payload.name, password: payload.password};
      const loginResult = await accountLoginRequest(user);
      console.log(loginResult);
      const { id, token } = loginResult.data;
      commit('changeToken', token);
      localCache.setCache('token', token);

      //请求用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit('changeUserInfo', userInfo);
      localCache.setCache('userInfo', userInfo);
      // console.log(userInfo.role.id);

      //请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus);
      console.log(userMenus);

      //判断是否记住密码，记住则添加localstorage
      if (payload.isKeepPassword) {
        localCache.setCache('name', user.name);
        localCache.setCache('password', user.password);
      }
      
      //请求部门和角色信息
      dispatch('getInitalDataAction');
      
      //跳转至首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token');
      if(token) {
        commit('changeToken', token);
      }
      const userInfo = localCache.getCache('userInfo');
      if(userInfo) {
        commit('changeUserInfo', userInfo);
      }
      const userMenus = localCache.getCache('userMenus');
      if(userMenus) {
        commit('changeUserMenus', userMenus);
      }
      const entireDepartment = localCache.getCache('entireDepartment')
      if(entireDepartment) {
        commit('changeEntireDepartment', entireDepartment)
      }
      const entireRole = localCache.getCache('entireRole')
      if(entireRole) {
        commit('changeEntireRole', entireRole)
      }
    },
    phoneLoginAction({ commit }, payload) {
      commit("phoneLogin", payload);
    },
    async getInitalDataAction({ commit }) {
      //请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      })
      const { list: roleList } = roleResult.data
      commit('changeEntireDepartment', departmentList);
      commit('changeEntireRole', roleList);
      localCache.setCache('entireDepartment', departmentList);
      localCache.setCache('entireRole', roleList);
    },
  },
  modules: {
    moduleSystem,
    moduleAnalysis
  },
});

//在main.js中导入，目的是为了解决每次页面刷新后vuex数据清空，从缓存中读取加入至vuex
export function setupStore() {
  store.dispatch('loadLocalLogin');
  // store.dispatch('moduleAnalysis/getAnalysisDataAction');
  // store.dispatch('getInitalDataAction');
}

export default store

