const dialogconfig = {
  formItems: [
    {
      field: "id",
      label: "id",
      plcaeholder: "请输入id",
      type: "input",
    },
    {
      field: "name",
      label: "用户名",
      plcaeholder: "请输入用户名",
      type: "input",
    },
    {
      field: "password",
      label: "密码",
      plcaeholder: "请输入密码",
      type: "password",
    },
    {
      field: "sport",
      label: "喜欢的运动",
      plcaeholder: "请选择喜欢的运动",
      type: "select",
      region: "",
      option: [
        { name: "篮球", value: "basketball" },
        { name: "乒乓球", value: "pingpong" },
        { name: "足球", value: "football" },
      ],
    },
    {
      field: "createAt",
      label: "创建的时间",
      plcaeholder: "请选择创建的时间范围",
      type: "datepicker",
      otherOptions: {
        type: "daterrange",
      },
    },
  ],
  formdata: {
    id: "",
    name: "",
    password: "",
    sport: "",
    createAt: "",
  },
}