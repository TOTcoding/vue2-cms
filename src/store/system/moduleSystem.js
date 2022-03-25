import { getPageListData, deletePageData, departmentPageData, roleGetPageListData, goodsGetPageListData, createPageData, editPageData } from "../../service/main/system";

const moduleSystem = {
  namespaced: true,
  state: {
    userList: [],
    userCount: 0,
    roleList: [],
    roleCount: 0,
    departmentList: [],
    departmentCount: 0,
    goodsList: [],
    goodsCount: 0,
    menuList: []
  },
  mutations: {
    changeUserList(state, list) {
      state.userList = list;
    },
    changeMenuList(state, list) {
      state.menuList = list;
    },
    changeUserCount(state, userCount) {
      state.userCount = userCount
    },
    changeRoleList(state, list) {
      state.roleList = list
    },
    changeRoleCount(state, roleCount) {
      state.roleCount = roleCount
    },
    changedepartmentList(state, list) {
      state.departmentList = list
    },
    changedepartmentCount(state, departmentCount) {
      state.departmentCount = departmentCount
    },
    changeGoodsList(state, list) {
      state.goodsList = list
    },
    changeGoodsCount(state, goodsCount) {
      state.goodsCount = goodsCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload) {
      // console.log(payload);
      const pageResult = await getPageListData(payload.pageUrl, payload.queryInfo)
      // console.log(pageResult);
      const { list, totalCount } = pageResult.data;
      // console.log(totalCount);
      commit('changeUserList', list);
      commit('changeUserCount', totalCount);
    },
    async deletePageDataAction({ commit }, payload) {
      await deletePageData(payload.pageUrl);
    },
    async getPagedepartmentAction({ commit }, payload) {
      const departmentResult = await departmentPageData(payload.pageUrl);
      const { list, totalCount } = departmentResult.data;
      commit('changedepartmentList', list);
      commit('changedepartmentCount', totalCount);
    },
    async getPageMenuAction({ commit }, payload) {
      const MenuResult = await getPageListData(payload.pageUrl, payload.queryInfo);
      const { list } = MenuResult.data;
      commit('changeMenuList', list);
    },
    async roleGetPageListAction({ commit }, payload) {
      // console.log(payload);
      const pageResult = await roleGetPageListData(payload.pageUrl, payload.queryInfo);
      const { list, totalCount } = pageResult.data;
      commit('changeRoleList', list);
      commit('changeRoleCount', totalCount);
    },
    async goodsGetPageListAction({ commit }, payload) {
      // console.log(payload);
      const pageResult = await goodsGetPageListData(payload.pageUrl, payload.queryInfo);
      const { list, totalCount } = pageResult.data;
      commit('changeGoodsList', list);
      commit('changeGoodsCount', totalCount);
    },
    async createPageDataAction({ dispatch }, payload) {
      const { pageUrl, newData } = payload;
      await createPageData(pageUrl, newData);
      dispatch('getPageListAction', {
        pageUrl: '/users/list',
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editPageDataAction({ dispatch }, payload) {
      const { pageUrl, editData, id } = payload;
      // console.log(editData);
      await editPageData(pageUrl, editData, id);
      dispatch('getPageListAction', {
        pageUrl: '/users/list',
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
};

export default moduleSystem;
