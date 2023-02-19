"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
const common_assets = require("../../common/assets.js");
require("../../utils/http.js");
const _sfc_main = {
  data() {
    return {
      column: 1,
      row: 1,
      ticketFlag: 0,
      orderId: "",
      query: {
        mode: "id",
        options: "1",
        pageIndex: 1,
        pageSize: 10
      },
      order: {
        userId: 1,
        scheduleId: "",
        seatInfo: "",
        orderTime: "",
        orderStatus: "1"
      },
      selected: false,
      seatShow: true,
      scheduleDataRes: [],
      seatIJ: [
        [0, 0, 2, 0],
        [0, 0, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 2, 2],
        [0, 0, 2, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
    };
  },
  methods: {
    getScheduleData() {
      api_api.getDataParam(this.query, "/schedule/queryScheduleAssociated").then((res) => {
        console.log(res);
        this.scheduleDataRes = res.data;
        console.log(this.scheduleDataRes);
        this.pageTotal = res.pageTotal || 10;
      });
    },
    insertOrder() {
      api_api.insertData(this.order, "/order/createOrder").then((res) => {
        console.log(res);
        this.orderId = res.data;
        common_vendor.index.navigateTo({
          url: "/pages/ticket/out_ticket?orderId=" + this.orderId
        });
      });
    },
    selectSeat(i, j) {
      if (this.ticketFlag < 1) {
        this.seatIJ[i][j] = 1;
        this.column = i + 1;
        this.row = j + 1;
        this.ticketFlag++;
        this.selected = true;
      } else {
        common_vendor.index.showToast({
          title: "\u60A8\u53EA\u80FD\u9009\u4E00\u5F20\u7968",
          icon: "none",
          duration: 2e3
        });
      }
    },
    deleteSeat(i, j) {
      this.ticketFlag--;
      this.selected = false;
      this.seatIJ[i][j] = 0;
    },
    buyTicket() {
      console.log(this.showTime());
      this.order.orderTime = this.showTime();
      this.order.seatInfo = this.fix(this.column, 2) + this.fix(this.row, 2);
      this.insertOrder();
    },
    showTime() {
      var now = new Date();
      now.setMinutes(now.getMinutes() + 10);
      var year = now.getFullYear(), month = now.getMonth() + 1, date = now.getDate(), h = this.fix(now.getHours(), 2), m = this.fix(now.getMinutes(), 2), s = this.fix(now.getSeconds(), 2);
      return year + "-" + month + "-" + date + " " + h + ":" + m + ":" + s;
    },
    fix(num, length) {
      return ("" + num).length < length ? (new Array(length + 1).join("0") + num).slice(-length) : "" + num;
    }
  },
  onLoad(e) {
    this.query.options = e.id;
    this.order.scheduleId = e.id;
    this.getScheduleData();
  }
};
if (!Array) {
  const _easycom_tui_divider2 = common_vendor.resolveComponent("tui-divider");
  const _easycom_tui_tag2 = common_vendor.resolveComponent("tui-tag");
  const _easycom_tui_footer2 = common_vendor.resolveComponent("tui-footer");
  const _easycom_tui_button2 = common_vendor.resolveComponent("tui-button");
  (_easycom_tui_divider2 + _easycom_tui_tag2 + _easycom_tui_footer2 + _easycom_tui_button2)();
}
const _easycom_tui_divider = () => "../../components/thorui/tui-divider/tui-divider.js";
const _easycom_tui_tag = () => "../../components/thorui/tui-tag/tui-tag.js";
const _easycom_tui_footer = () => "../../components/thorui/tui-footer/tui-footer.js";
const _easycom_tui_button = () => "../../components/thorui/tui-button/tui-button.js";
if (!Math) {
  (_easycom_tui_divider + _easycom_tui_tag + _easycom_tui_footer + _easycom_tui_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.scheduleDataRes, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.startLocation),
        b: common_vendor.t(item.startStation),
        c: common_vendor.t(item.endLocation),
        d: common_vendor.t(item.endStation),
        e: "373687a7-0-" + i0,
        f: common_vendor.t(item.startTime),
        g: "373687a7-1-" + i0,
        h: common_vendor.t(item.busName),
        i: "373687a7-2-" + i0
      };
    }),
    b: common_vendor.p({
      width: "90%",
      height: 20,
      gradual: true
    }),
    c: common_vendor.p({
      type: "light-blue",
      shape: "square"
    }),
    d: common_vendor.p({
      type: "light-blue",
      shape: "square",
      plain: true
    }),
    e: common_assets._imports_0,
    f: common_assets._imports_1,
    g: common_assets._imports_2,
    h: common_vendor.f($data.scheduleDataRes, (bus, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.f(bus.busColumns, (col, index, i1) => {
          return {
            a: common_vendor.t(col),
            b: index
          };
        })
      }, $data.seatShow ? {
        b: common_vendor.f($data.seatIJ, (itemI, indexI, i1) => {
          return {
            a: common_vendor.f(itemI, (itemJ, indexJ, i2) => {
              return common_vendor.e({
                a: indexJ == 2
              }, indexJ == 2 ? {} : {}, {
                b: itemJ == 0
              }, itemJ == 0 ? {
                c: common_vendor.o(($event) => $options.selectSeat(indexI, indexJ), indexJ),
                d: common_assets._imports_0
              } : itemJ == 1 ? {
                f: common_vendor.o(($event) => $options.deleteSeat(indexI, indexJ), indexJ),
                g: common_assets._imports_1
              } : itemJ == 2 ? {
                i: common_assets._imports_2
              } : {}, {
                e: itemJ == 1,
                h: itemJ == 2,
                j: indexJ
              });
            }),
            b: indexI
          };
        })
      } : {});
    }),
    i: $data.seatShow,
    j: common_vendor.p({
      copyright: "Copyright \xA9 2022-\u81F3\u4ECA Foocode.",
      fixed: false
    }),
    k: $data.selected
  }, $data.selected ? {
    l: common_vendor.t($data.column),
    m: common_vendor.t($data.row)
  } : {}, {
    n: common_vendor.o(($event) => $options.buyTicket()),
    o: common_vendor.p({
      disabled: !$data.selected
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/pages/ticket/pick_ticket.vue"]]);
wx.createPage(MiniProgramPage);
