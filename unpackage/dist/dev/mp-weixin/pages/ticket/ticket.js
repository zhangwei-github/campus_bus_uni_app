"use strict";
const common_vendor = require("../../common/vendor.js");
const libs_weappQrcode = require("../../libs/weapp-qrcode.js");
const api_api = require("../../api/api.js");
require("../../utils/http.js");
const _sfc_main = {
  data() {
    return {
      show: false,
      pageTotal: 0,
      query: {
        mode: "user",
        options: "1",
        pageIndex: 1,
        pageSize: 10
      },
      orderDataRes: [],
      couponList: [
        {
          name: "\u8D2D\u7269\u5238",
          code: "xyz0900100200",
          invalidTime: "2019-07-01",
          spread: false,
          sendTime: "2019-06-01",
          suitStore: "\u5168\u90E8",
          useDescribe: ["1\u3001\u53EF\u5728\u4EFB\u4F55\u9002\u7528\u5546\u5BB6\u5185\u6D88\u8D39", "2\u3001\u89E3\u91CA\u6743\u5F52Thor\u6240\u6709"]
        },
        {
          name: "\u6253\u8F66\u5238",
          code: "xyz0900100300",
          invalidTime: "2019-07-01",
          spread: false,
          sendTime: "2019-06-01",
          suitStore: "\u6EF4\u6EF4\u6253\u8F66",
          useDescribe: ["1\u3001\u53EF\u5728\u4EFB\u4F55\u9002\u7528\u5546\u5BB6\u5185\u6D88\u8D39", "2\u3001\u89E3\u91CA\u6743\u5F52Thor\u6240\u6709"]
        }
      ],
      qrcode_w: common_vendor.index.upx2px(240)
    };
  },
  onLoad: function(options) {
    common_vendor.index.hideTabBar({});
    this.getOrderData();
    setTimeout(() => {
      this.couponQrCode(this.couponList[0].code, "couponQrcode0");
    }, 60);
  },
  methods: {
    getOrderData: function() {
      api_api.getDataParam(this.query, "/order/queryOrderAssociated").then((res) => {
        console.log(res);
        this.orderDataRes = res.data;
        console.log(this.orderDataRes);
        for (var item in this.orderDataRes) {
          console.log(this.orderDataRes[item]);
          this.orderDataRes[item].spread = false;
        }
        console.log(this.orderDataRes);
        this.pageTotal = res.pageTotal || 10;
      });
    },
    spread: function(index) {
      let orderDataRes = this.orderDataRes;
      if (!orderDataRes[index].spread) {
        setTimeout(() => {
          this.couponQrCode(orderDataRes[index].orderId, "couponQrcode" + index);
        }, 60);
      }
      orderDataRes[index].spread = !orderDataRes[index].spread;
      this.orderDataRes = orderDataRes;
    },
    couponQrCode(text, canvasId) {
      new libs_weappQrcode.qrCode(canvasId, {
        text,
        width: this.qrcode_w,
        height: this.qrcode_w,
        colorDark: "#333333",
        colorLight: "#FFFFFF",
        correctLevel: libs_weappQrcode.qrCode.CorrectLevel.H
      });
      if (canvasId == "couponQrcode0") {
        setTimeout(() => {
          if (!this.show) {
            this.show = true;
          }
        }, 0);
      }
    },
    navigateBack() {
      common_vendor.index.navigateBack();
    }
  }
};
if (!Array) {
  const _easycom_tui_icon2 = common_vendor.resolveComponent("tui-icon");
  const _easycom_tui_navigation_bar2 = common_vendor.resolveComponent("tui-navigation-bar");
  (_easycom_tui_icon2 + _easycom_tui_navigation_bar2)();
}
const _easycom_tui_icon = () => "../../components/thorui/tui-icon/tui-icon.js";
const _easycom_tui_navigation_bar = () => "../../components/thorui/tui-navigation-bar/tui-navigation-bar.js";
if (!Math) {
  (_easycom_tui_icon + _easycom_tui_navigation_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.navigateBack),
    b: common_vendor.p({
      name: "arrowleft",
      color: "#fff"
    }),
    c: common_vendor.p({
      isOpacity: false,
      title: "\u786E\u8BA4\u8BA2\u5355",
      backgroundColor: "#5677fc",
      color: "#f1f1f1"
    }),
    d: common_vendor.t($data.pageTotal),
    e: common_vendor.f($data.orderDataRes, (item, index, i0) => {
      return {
        a: common_vendor.t(item.startLocation),
        b: common_vendor.t(item.endLocation),
        c: common_vendor.t(item.orderStatus),
        d: item.spread ? 1 : "",
        e: common_vendor.o(($event) => $options.spread(index), index),
        f: common_vendor.t(item.orderId),
        g: !item.spread ? 1 : "",
        h: "couponQrcode" + index,
        i: "couponQrcode" + index,
        j: common_vendor.t(item.orderStatus),
        k: common_vendor.t(item.busName),
        l: common_vendor.t(item.seatInfo),
        m: common_vendor.t(item.startStation),
        n: item.spread,
        o: index
      };
    }),
    f: $data.qrcode_w + "px",
    g: $data.qrcode_w + "px",
    h: _ctx.couponNum == 0
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/pages/ticket/ticket.vue"]]);
wx.createPage(MiniProgramPage);
