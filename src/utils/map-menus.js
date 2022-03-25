import routes from "@/router/routes";

export function mapMenusToRoutes(userMenus) {
  const allMenuRoutes = [];
  const hasRoutes = [];

  //默认加载所有的Menuroute,所有菜单中去除了/main/前缀
  const routeFiles = require.context("../router/system", true, /\.js$/);
  routeFiles.keys().forEach((key) => {
    const route = require("../router/system" + key.split(".")[1]);
    // console.log(route.default);
    allMenuRoutes.push(route.default);
  });

  //根据菜单获取需要添加的route,
  // 递归调用判断当前用户菜单路径是否在所有的菜单路径中存在，然后再作为子路由动态添加至/main路由中
  const _recurceGetRoute = (menus) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allMenuRoutes.find((route) => {
          //用户菜单中的url中为完整路径，将/main/分割后才能做判断
          return route.path == menu.url.split("/main/")[1];
        });
        //向/main路由下添加子路由
        hasRoutes.push(route);
        // routes[2].children.push(route);
      } else {
        _recurceGetRoute(menu.children);
      }
    }
  };
  _recurceGetRoute(userMenus);

  // console.log(hasRoutes);
  return hasRoutes;
}

export function pathMapToMenu(userMenus, currentPath) {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children, currentPath);
      if (findMenu) {
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}
