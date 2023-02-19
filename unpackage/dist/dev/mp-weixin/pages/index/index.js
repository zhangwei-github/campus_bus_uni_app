"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
require("../../utils/http.js");
const _sfc_main = {
  data() {
    return {
      changeFlag: false,
      startStation: "\u59CB\u53D1\u6821\u533A",
      endStation: "\u7EC8\u70B9\u6821\u533A",
      current: 0,
      currentDay: 0,
      pageTotal: 0,
      campusQuery: {
        mode: "id",
        options: "all",
        pageIndex: 1,
        pageSize: 100
      },
      query: {
        mode: "date",
        options: "1",
        startLocation: "",
        endLocation: "",
        pageIndex: 1,
        pageSize: 100
      },
      scheduleDataRes: [],
      campusDataRes: [],
      tabs: [
        {
          name: "\u4E00",
          value: 1
        },
        {
          name: "\u4E8C",
          value: 2
        },
        {
          name: "\u4E09",
          value: 3
        },
        {
          name: "\u56DB",
          value: 4
        },
        {
          name: "\u4E94",
          value: 5
        },
        {
          name: "\u516D",
          value: 6
        },
        {
          name: "\u65E5",
          value: 7
        }
      ],
      startStationShow: false,
      endStationShow: false,
      listShow: true,
      card: {
        img: {
          url: "/static/logo.png"
        },
        title: {
          text: "CSDN\u4E91\u8BA1\u7B97"
        },
        tag: {
          text: "1\u5C0F\u65F6\u524D"
        },
        header: {
          bgcolor: "#F7F7F7",
          line: true
        }
      },
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
  methods: {
    getScheduleData() {
      api_api.getDataParam(this.query, "/schedule/queryScheduleAssociated").then((res) => {
        console.log(res);
        this.scheduleDataRes = this.changeData(res.data);
        console.log(this.scheduleDataRes);
        this.pageTotal = res.pageTotal || 10;
      });
    },
    addScheduleData() {
      api_api.getDataParam(this.query, "/schedule/queryScheduleAssociated").then((res) => {
        console.log(res);
        this.scheduleDataRes.push(this.changeData(res.data));
        console.log(this.scheduleDataRes);
        this.pageTotal = res.pageTotal || 10;
      });
    },
    getCampusData() {
      api_api.getDataParam(this.campusQuery, "/campus/queryCampus").then((res) => {
        console.log(res);
        this.campusDataRes = res.data;
        console.log(this.campusDataRes);
      });
    },
    changeData(data) {
      for (var i = 0; i < data.length; i++) {
        var day = data[i].date;
        var stop = data[i].stopStation;
        data[i].date = day.split(",");
        data[i].stopStation = stop.split(",");
        data[i].stopStationShow = false;
      }
      return data;
    },
    querySchedule() {
      this.listShow = false;
      if (this.startStation == "\u521D\u59CB\u6821\u533A" && this.endStation != "\u7EC8\u70B9\u6821\u533A") {
        this.query.mode = "endLocation";
      } else if (this.startStation != "\u521D\u59CB\u6821\u533A" && this.endStation == "\u7EC8\u70B9\u6821\u533A") {
        this.query.mode = "startLocation";
      } else {
        this.query.mode = "location";
      }
      this.getScheduleData();
      this.$nextTick(() => {
        this.listShow = true;
      });
      this.changeFlag = false;
    },
    exchangeStation() {
      var tmp = this.startStation;
      this.startStation = this.endStation;
      this.endStation = tmp;
      this.changeFlag = true;
    },
    dropDownStartList(index) {
      if (index !== -1) {
        this.tui.toast("index\uFF1A" + index);
      }
      this.startStationShow = !this.startStationShow;
    },
    dropDownEndList(index) {
      if (index !== -1) {
        this.tui.toast("index\uFF1A" + index);
      }
      this.endStationShow = !this.endStationShow;
    },
    dropDownStopList(index) {
      this.scheduleDataRes[index].stopStationShow = !this.scheduleDataRes[index].stopStationShow;
    },
    pickStartStation(index) {
      this.startStation = this.campusDataRes[index].campusName;
      this.query.startLocation = this.startStation;
      this.startStationShow = !this.startStationShow;
      this.changeFlag = true;
    },
    pickEndStation(index) {
      this.endStation = this.campusDataRes[index].campusName;
      this.query.endLocation = this.endStation;
      this.endStationShow = !this.endStationShow;
      this.changeFlag = true;
    },
    chooseDay(e) {
      this.listShow = false;
      this.query.options = JSON.stringify(e.index + 1);
      console.log(this.query.options);
      this.currentDay = e.index;
      this.getScheduleData();
      this.$nextTick(() => {
        this.listShow = true;
      });
    },
    pickTicket(id) {
      common_vendor.index.navigateTo({
        url: "/pages/ticket/pick_ticket?id=" + id
      });
    },
    tabbarSwitch(e) {
      console.log(e);
      common_vendor.index.switchTab({
        url: e.pagePath
      });
    },
    change() {
    }
  },
  onLoad: function(options) {
    this.getCampusData();
    this.getScheduleData();
  },
  onReachBottom() {
    console.log("\u5230\u8FBE\u5E95\u90E8");
    if (this.query.pageIndex * this.query.pageSize < this.pageTotal) {
      this.query.pageIndex++;
      console.log(this.query.pageIndex);
      this.addScheduleData();
    } else {
      common_vendor.index.showToast({
        title: "\u6682\u65E0\u66F4\u591A\u6570\u636E"
      });
    }
  }
};
if (!Array) {
  const _easycom_tui_navigation_bar2 = common_vendor.resolveComponent("tui-navigation-bar");
  const _easycom_tui_icon2 = common_vendor.resolveComponent("tui-icon");
  const _easycom_tui_button2 = common_vendor.resolveComponent("tui-button");
  const _easycom_tui_list_cell2 = common_vendor.resolveComponent("tui-list-cell");
  const _easycom_tui_dropdown_list2 = common_vendor.resolveComponent("tui-dropdown-list");
  const _easycom_tui_tabs2 = common_vendor.resolveComponent("tui-tabs");
  const _easycom_tui_no_data2 = common_vendor.resolveComponent("tui-no-data");
  const _easycom_tui_tag2 = common_vendor.resolveComponent("tui-tag");
  const _easycom_tui_divider2 = common_vendor.resolveComponent("tui-divider");
  const _easycom_tui_list_view2 = common_vendor.resolveComponent("tui-list-view");
  const _easycom_tui_tabbar2 = common_vendor.resolveComponent("tui-tabbar");
  (_easycom_tui_navigation_bar2 + _easycom_tui_icon2 + _easycom_tui_button2 + _easycom_tui_list_cell2 + _easycom_tui_dropdown_list2 + _easycom_tui_tabs2 + _easycom_tui_no_data2 + _easycom_tui_tag2 + _easycom_tui_divider2 + _easycom_tui_list_view2 + _easycom_tui_tabbar2)();
}
const _easycom_tui_navigation_bar = () => "../../components/thorui/tui-navigation-bar/tui-navigation-bar.js";
const _easycom_tui_icon = () => "../../components/thorui/tui-icon/tui-icon.js";
const _easycom_tui_button = () => "../../components/thorui/tui-button/tui-button.js";
const _easycom_tui_list_cell = () => "../../components/thorui/tui-list-cell/tui-list-cell.js";
const _easycom_tui_dropdown_list = () => "../../components/thorui/tui-dropdown-list/tui-dropdown-list.js";
const _easycom_tui_tabs = () => "../../components/thorui/tui-tabs/tui-tabs.js";
const _easycom_tui_no_data = () => "../../components/thorui/tui-no-data/tui-no-data.js";
const _easycom_tui_tag = () => "../../components/thorui/tui-tag/tui-tag.js";
const _easycom_tui_divider = () => "../../components/thorui/tui-divider/tui-divider.js";
const _easycom_tui_list_view = () => "../../components/thorui/tui-list-view/tui-list-view.js";
const _easycom_tui_tabbar = () => "../../components/thorui/tui-tabbar/tui-tabbar.js";
if (!Math) {
  (_easycom_tui_navigation_bar + _easycom_tui_icon + _easycom_tui_button + _easycom_tui_list_cell + _easycom_tui_dropdown_list + _easycom_tui_tabs + _easycom_tui_no_data + _easycom_tui_tag + _easycom_tui_divider + _easycom_tui_list_view + _easycom_tui_tabbar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      splitLine: true,
      title: "NavBar\u81EA\u5B9A\u4E49\u5BFC\u822A\u680F",
      backgroundColor: "#000",
      color: "#333"
    }),
    b: common_vendor.t($data.startStation),
    c: common_vendor.p({
      name: "turningdown",
      size: 20
    }),
    d: common_vendor.n($data.startStationShow ? "tui-animation-show" : ""),
    e: common_vendor.o(($event) => $options.dropDownStartList(-1)),
    f: common_vendor.p({
      type: "white",
      shape: "circle",
      width: "240rpx",
      height: "80rpx",
      margin: "20rpx"
    }),
    g: common_vendor.f($data.campusDataRes, (item, index, i0) => {
      return {
        a: "406d9776-5-" + i0 + "," + ("406d9776-4-" + i0),
        b: common_vendor.t(item.campusName),
        c: common_vendor.o(($event) => $options.pickStartStation(index), index),
        d: "406d9776-4-" + i0 + ",406d9776-1",
        e: common_vendor.p({
          padding: "0",
          unlined: $data.campusDataRes.length - 1 == index
        }),
        f: index
      };
    }),
    h: common_vendor.p({
      name: "position",
      size: "22",
      color: "#55aaff"
    }),
    i: common_vendor.p({
      show: $data.startStationShow,
      top: 94,
      height: 400
    }),
    j: common_vendor.o(($event) => $options.exchangeStation()),
    k: common_vendor.p({
      type: "gray-primary",
      shape: "circle",
      width: "80rpx",
      height: "80rpx",
      margin: "20rpx"
    }),
    l: common_vendor.t($data.endStation),
    m: common_vendor.p({
      name: "turningdown",
      size: 20
    }),
    n: common_vendor.n($data.endStationShow ? "tui-animation-show" : ""),
    o: common_vendor.o(($event) => $options.dropDownEndList(-1)),
    p: common_vendor.p({
      type: "white",
      shape: "circle",
      width: "240rpx",
      height: "80rpx",
      margin: "20rpx"
    }),
    q: common_vendor.f($data.campusDataRes, (item, index, i0) => {
      return {
        a: "406d9776-11-" + i0 + "," + ("406d9776-10-" + i0),
        b: common_vendor.t(item.campusName),
        c: common_vendor.o(($event) => $options.pickEndStation(index), index),
        d: "406d9776-10-" + i0 + ",406d9776-7",
        e: common_vendor.p({
          padding: "0",
          unlined: $data.campusDataRes.length - 1 == index
        }),
        f: index
      };
    }),
    r: common_vendor.p({
      name: "position",
      size: "22",
      color: "#55aaff"
    }),
    s: common_vendor.p({
      show: $data.endStationShow,
      top: 94,
      height: 400
    }),
    t: $data.changeFlag
  }, $data.changeFlag ? {
    v: common_vendor.o($options.querySchedule),
    w: common_vendor.p({
      shape: "circle",
      height: "80rpx",
      width: "80%"
    })
  } : {}, {
    x: common_vendor.o($options.chooseDay),
    y: common_vendor.p({
      color: "#999",
      tabs: $data.tabs,
      selectedColor: "#5677fc",
      currentTab: $data.currentDay
    }),
    z: $data.listShow
  }, $data.listShow ? {
    A: common_vendor.p({
      imgUrl: "/static/images/nodata.png"
    }),
    B: common_vendor.f($data.scheduleDataRes, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.startTime),
        b: "406d9776-17-" + i0 + "," + ("406d9776-16-" + i0),
        c: common_vendor.t(item.startLocation),
        d: common_vendor.t(item.startStation),
        e: "406d9776-20-" + i0 + "," + ("406d9776-19-" + i0),
        f: common_vendor.n(item.stopStationShow ? "tui-animation-show" : ""),
        g: common_vendor.o(($event) => $options.dropDownStopList(index), index),
        h: "406d9776-19-" + i0 + "," + ("406d9776-18-" + i0),
        i: item.stopStation == ""
      }, item.stopStation == "" ? {
        j: "406d9776-21-" + i0 + "," + ("406d9776-18-" + i0),
        k: common_vendor.p({
          padding: "0",
          unlined: item.stopStation.length - 1 == index
        })
      } : {
        l: common_vendor.f(item.stopStation, (index2, k1, i1) => {
          return {
            a: common_vendor.t(index2),
            b: "406d9776-22-" + i0 + "-" + i1 + "," + ("406d9776-18-" + i0),
            c: common_vendor.p({
              padding: "0",
              unlined: item.stopStation.length - 1 == index2
            }),
            d: index2
          };
        })
      }, {
        m: "406d9776-18-" + i0 + "," + ("406d9776-16-" + i0),
        n: common_vendor.p({
          show: item.stopStationShow,
          top: 94,
          height: 400
        }),
        o: common_vendor.t(item.endLocation),
        p: common_vendor.t(item.endStation),
        q: "406d9776-23-" + i0 + "," + ("406d9776-16-" + i0),
        r: common_vendor.t(item.busId),
        s: "406d9776-24-" + i0 + "," + ("406d9776-16-" + i0),
        t: common_vendor.t(item.ticket),
        v: "406d9776-25-" + i0 + "," + ("406d9776-16-" + i0),
        w: common_vendor.o(($event) => $options.pickTicket(item.scheduleId), index),
        x: index,
        y: "406d9776-16-" + i0 + ",406d9776-14"
      });
    }),
    C: common_vendor.p({
      type: "light-blue",
      shape: "circle"
    }),
    D: common_vendor.p({
      name: "turningdown",
      size: 20
    }),
    E: common_vendor.p({
      type: "white",
      shape: "circle",
      width: "120rpx",
      height: "60rpx",
      margin: "20rpx"
    }),
    F: common_vendor.p({
      width: "90%",
      height: 20,
      gradual: true
    }),
    G: common_vendor.p({
      type: "light-blue",
      shape: "square",
      plain: true
    }),
    H: common_vendor.p({
      type: "light-green",
      shape: "square",
      padding: "10rpx 20rpx"
    }),
    I: common_vendor.p({
      title: "\u4ECA\u65E5\u8F66\u7968",
      color: "#777"
    })
  } : {}, {
    J: common_vendor.o($options.tabbarSwitch),
    K: common_vendor.p({
      isFixed: true,
      tabBar: $data.tabBar,
      hump: true,
      current: $data.current
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
