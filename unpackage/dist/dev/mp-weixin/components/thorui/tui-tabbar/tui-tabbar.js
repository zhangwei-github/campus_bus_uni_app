"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "tuiTabbar",
  emits: ["click"],
  props: {
    current: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: "#666"
    },
    selectedColor: {
      type: String,
      default: "#5677FC"
    },
    backgroundColor: {
      type: String,
      default: "#FFFFFF"
    },
    hump: {
      type: Boolean,
      default: false
    },
    isFixed: {
      type: Boolean,
      default: true
    },
    tabBar: {
      type: Array,
      default() {
        return [];
      }
    },
    badgeColor: {
      type: String,
      default: "#fff"
    },
    badgeBgColor: {
      type: String,
      default: "#F74D54"
    },
    unlined: {
      type: Boolean,
      default: false
    },
    backdropFilter: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: [Number, String],
      default: 9999
    }
  },
  watch: {
    current() {
    }
  },
  data() {
    return {};
  },
  methods: {
    tabbarSwitch(index, hump, pagePath, verify) {
      this.$emit("click", {
        index,
        hump,
        pagePath,
        verify
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($props.tabBar, (item, index, i0) => {
      return common_vendor.e({
        a: $props.current == index ? item.selectedIconPath : item.iconPath,
        b: common_vendor.n(item.hump ? "" : "tui-tabbar-icon"),
        c: item.num
      }, item.num ? {
        d: common_vendor.t(item.isDot ? "" : item.num),
        e: common_vendor.n(item.isDot ? "tui-badge-dot" : "tui-badge"),
        f: $props.badgeColor,
        g: $props.badgeBgColor
      } : {}, {
        h: item.hump ? 1 : "",
        i: common_vendor.t(item.text),
        j: item.hump ? 1 : "",
        k: $props.current == index ? $props.selectedColor : $props.color,
        l: item.hump ? 1 : "",
        m: item.hump && !$props.backdropFilter ? $props.backgroundColor : "none",
        n: common_vendor.o(($event) => $options.tabbarSwitch(index, item.hump, item.pagePath, item.verify), index),
        o: index
      });
    }),
    b: $props.hump && !$props.unlined && !$props.backdropFilter
  }, $props.hump && !$props.unlined && !$props.backdropFilter ? {
    c: $props.backgroundColor,
    d: $props.hump ? 1 : ""
  } : {}, {
    e: $props.isFixed ? 1 : "",
    f: $props.unlined ? 1 : "",
    g: $props.backdropFilter ? 1 : "",
    h: $props.backgroundColor,
    i: $props.isFixed ? $props.zIndex : "auto"
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a5dcc4b5"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-tabbar/tui-tabbar.vue"]]);
wx.createComponent(Component);
