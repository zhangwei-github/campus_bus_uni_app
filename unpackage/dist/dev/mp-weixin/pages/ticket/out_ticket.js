"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
require("../../utils/http.js");
const _sfc_main = {
  data() {
    return {
      top: 0,
      countdownm: "",
      countdowns: "",
      timer: null,
      animation: false,
      query: {
        mode: "id",
        options: "1596140446891089922",
        pageIndex: 1,
        pageSize: 10
      },
      orderDataRes: []
    };
  },
  methods: {
    getOrderData() {
      api_api.getDataParam(this.query, "/order/queryOrderAssociated").then((res) => {
        console.log(res);
        this.orderDataRes = res.data;
        console.log(this.orderDataRes);
        this.pageTotal = res.pageTotal || 10;
        this.setTime();
      });
    },
    navigateBack() {
      common_vendor.index.navigateBack();
    },
    setTime() {
      var nowtime = new Date();
      var endtime = this.orderDataRes[0].orderTime.replace(/-/g, "/");
      endtime = new Date(endtime);
      var lefttime = (endtime.getTime() - nowtime.getTime()) / 1e3;
      console.log(lefttime);
      if (lefttime <= 0) {
        lefttime = 0;
      }
      this.timer = lefttime;
      console.log(123);
    },
    showtime() {
      var nowtime = new Date(), endtime = this.orderDataRes[0].orderTime.replace(/-/g, "/");
      endtime = new Date(endtime);
      var lefttime = endtime.getTime() - nowtime.getTime(), leftm = Math.floor(lefttime / (1e3 * 60) % 60) < 10 ? "0" + Math.floor(lefttime / (1e3 * 60) % 60) : Math.floor(lefttime / (1e3 * 60) % 60), lefts = Math.floor(lefttime / 1e3 % 60) < 10 ? "0" + Math.floor(lefttime / 1e3 % 60) : Math.floor(lefttime / 1e3 % 60);
      this.countdownm = leftm;
      this.countdowns = lefts;
      if (lefttime < 0) {
        this.countdownh = this.countdownm = this.countdowns = "00";
      }
    },
    detail(e) {
      this.tui.toast("\u8BE6\u60C5\u529F\u80FD\u5C1A\u672A\u5B8C\u5584~");
    },
    commit() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    }
  },
  onLoad(e) {
    this.query.options = e.orderId;
    this.getOrderData();
    setTimeout(() => {
      this.animation = true;
    }, 600);
  }
};
if (!Array) {
  const _easycom_tui_icon2 = common_vendor.resolveComponent("tui-icon");
  const _easycom_tui_countdown2 = common_vendor.resolveComponent("tui-countdown");
  const _easycom_tui_navigation_bar2 = common_vendor.resolveComponent("tui-navigation-bar");
  const _easycom_tui_divider2 = common_vendor.resolveComponent("tui-divider");
  const _easycom_tui_tag2 = common_vendor.resolveComponent("tui-tag");
  const _easycom_tui_button2 = common_vendor.resolveComponent("tui-button");
  (_easycom_tui_icon2 + _easycom_tui_countdown2 + _easycom_tui_navigation_bar2 + _easycom_tui_divider2 + _easycom_tui_tag2 + _easycom_tui_button2)();
}
const _easycom_tui_icon = () => "../../components/thorui/tui-icon/tui-icon.js";
const _easycom_tui_countdown = () => "../../components/thorui/tui-countdown/tui-countdown.js";
const _easycom_tui_navigation_bar = () => "../../components/thorui/tui-navigation-bar/tui-navigation-bar.js";
const _easycom_tui_divider = () => "../../components/thorui/tui-divider/tui-divider.js";
const _easycom_tui_tag = () => "../../components/thorui/tui-tag/tui-tag.js";
const _easycom_tui_button = () => "../../components/thorui/tui-button/tui-button.js";
if (!Math) {
  (_easycom_tui_icon + _easycom_tui_countdown + _easycom_tui_navigation_bar + _easycom_tui_divider + _easycom_tui_tag + _easycom_tui_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.navigateBack),
    b: common_vendor.p({
      name: "arrowleft",
      color: "#fff"
    }),
    c: common_vendor.p({
      name: "alarm",
      color: "#fff",
      size: 22
    }),
    d: common_vendor.p({
      time: $data.timer,
      color: "#fff",
      borderColor: "#5677fc",
      colonColor: "#fff",
      backgroundColor: "#5677fc",
      size: 30,
      hours: false,
      scale: true
    }),
    e: common_vendor.p({
      isOpacity: false,
      title: "\u786E\u8BA4\u8BA2\u5355",
      backgroundColor: "#5677fc",
      color: "#f1f1f1"
    }),
    f: common_vendor.p({
      name: "news-fill",
      size: 24,
      color: "#f54f46"
    }),
    g: common_vendor.n($data.animation ? "tui-animation" : ""),
    h: common_vendor.o((...args) => $options.detail && $options.detail(...args)),
    i: common_vendor.f($data.orderDataRes, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.startLocation),
        b: common_vendor.t(item.startStation),
        c: common_vendor.t(item.endLocation),
        d: common_vendor.t(item.endStation),
        e: "0c270120-5-" + i0,
        f: common_vendor.t(item.seatInfo),
        g: "0c270120-6-" + i0,
        h: common_vendor.t(item.busName),
        i: "0c270120-7-" + i0,
        j: common_vendor.t(item.startTime),
        k: "0c270120-8-" + i0
      };
    }),
    j: common_vendor.p({
      width: "90%",
      height: 20,
      gradual: true
    }),
    k: common_vendor.p({
      shape: "square"
    }),
    l: common_vendor.p({
      shape: "square"
    }),
    m: common_vendor.p({
      type: "light-blue",
      margin: "20rpx 220rpx",
      shape: "square"
    }),
    n: common_vendor.f($data.orderDataRes, (item, k0, i0) => {
      return {
        a: "0c270120-9-" + i0,
        b: common_vendor.t(item.workId),
        c: "0c270120-10-" + i0,
        d: common_vendor.t(item.phone)
      };
    }),
    o: common_vendor.p({
      padding: "4rpx 10rpx",
      size: "24rpx",
      plain: true
    }),
    p: common_vendor.p({
      padding: "8rpx 22rpx",
      size: "24rpx",
      plain: true
    }),
    q: common_vendor.o(($event) => $options.commit())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/pages/ticket/out_ticket.vue"]]);
wx.createPage(MiniProgramPage);
