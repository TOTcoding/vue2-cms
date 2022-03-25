const tableConfig = {
  //:propList
  propList: [
    { prop: "name", label: "用户名", minWidth: "100", slotname: "name" },
    { prop: "realname", label: "真实姓名", minWidth: "100", slotname: "realname" },
    { prop: "cellphone", label: "手机号码", minWidth: "100", slotname: "cellphone" },
    { prop: "enable", label: "状态", minWidth: "100", slotname: "enable" },
    { prop: "createAt", label: "创建时间", minWidth: "250", slotname: "createAt" },
    { prop: "updateAt", label: "更新时间", minWidth: "250", slotname: "updateAt" },
    { label: "操作", minWidth: "120", slotname: 'handler'}
  ],
  //:paginationConfig，
  paginationConfig: {
    currentpage: 1,
    pagesizes: [5, 10, 15, 20],
    pagesize: 5
  },
  //:showSelectColumn，是否展示多选，默认为false
  showSelectColumn: false,
  //:showIndexColumn，是否展示序号，默认为false
  showIndexColumn: false
  //还需传:listData（网络请求拿到的数据）
  //还需穿:listCount (页面请求拿到的数据总数)
  
}