"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "tuiFooter",
  props: {
    navigate: {
      type: Array,
      default: function() {
        return [];
      }
    },
    copyright: {
      type: String,
      default: "All Rights Reserved."
    },
    color: {
      type: String,
      default: "#A7A7A7"
    },
    size: {
      type: Number,
      default: 24
    },
    backgroundColor: {
      type: String,
      default: "transparent"
    },
    fixed: {
      type: Boolean,
      default: true
    }
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.navigate.length > 0
  }, $props.navigate.length > 0 ? {
    b: common_vendor.f($props.navigate, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: item.color || "#596d96",
        c: (item.size || 28) + "rpx",
        d: item.type,
        e: item.url,
        f: item.target,
        g: item.delta,
        h: item.appid,
        i: item.path,
        j: item.extradata,
        k: item.bindsuccess,
        l: item.bindfail,
        m: index
      };
    })
  } : {}, {
    c: common_vendor.t($props.copyright),
    d: $props.color,
    e: $props.size + "rpx",
    f: common_vendor.n($props.fixed ? "tui-fixed" : ""),
    g: $props.backgroundColor
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9bc96340"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-footer/tui-footer.vue"]]);
wx.createComponent(Component);
