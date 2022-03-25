export const pageDialogConfig = {
  centerDialogVisible: false,
  formItems: [
    {
      field: "name",
      label: "用户名",
      plcaeholder: "请输入用户名",
      type: "input",
    },
    {
      field: "realname",
      label: "真实姓名",
      plcaeholder: "请输入真实姓名",
      type: "input",
    },
    {
      field: "password",
      label: "用户密码",
      plcaeholder: "请输入密码",
      type: "password",
      isHidden: false
    },
    {
      field: "cellphone",
      label: "电话号码",
      plcaeholder: "请输入电话号码",
      type: "input",
    },
    {
      field: "roleId",
      label: "选择角色",
      plcaeholder: "请选择角色",
      type: "select",
      option: []
    },
    {
      field: "departmentId",
      label: "选择部门",
      plcaeholder: "请选择部门",
      type: "select",
      option: []
    }
  ],
  formdata: {
    name: "",
    realname: "",
    password: "",
    cellphone: "",
    roleId: [],
    departmentId  : []
  },
};
