"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      current: 2,
      tabBar: [
        {
          pagePath: "/pages/index/index",
          text: "\u9996\u9875",
          iconPath: "/static/images/tabbar/home_gray.png",
          selectedIconPath: "/static/images/tabbar/home_active.png"
        },
        {
          pagePath: "/pages/ticket/ticket",
          text: "\u8F66\u7968",
          iconPath: "/static/images/tabbar/ticket.png",
          hump: true,
          selectedIconPath: "/static/images/tabbar/ticket.png"
        },
        {
          pagePath: "/pages/my/my",
          text: "\u6211\u7684",
          iconPath: "/static/images/tabbar/me_gray.png",
          selectedIconPath: "/static/images/tabbar/me_active.png",
          num: 2,
          isDot: true,
          verify: true
        }
      ]
    };
  },
  onLoad() {
  },
  methods: {
    tabbarSwitch(e) {
      console.log(e);
      common_vendor.index.switchTab({
        url: e.pagePath
      });
    }
  }
};
if (!Array) {
  const _easycom_tui_tabbar2 = common_vendor.resolveComponent("tui-tabbar");
  _easycom_tui_tabbar2();
}
const _easycom_tui_tabbar = () => "../../components/thorui/tui-tabbar/tui-tabbar.js";
if (!Math) {
  _easycom_tui_tabbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.tabbarSwitch),
    b: common_vendor.p({
      isFixed: true,
      tabBar: $data.tabBar,
      hump: true,
      current: $data.current
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
