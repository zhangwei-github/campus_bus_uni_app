"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "tuiDropdownList",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: "transparent"
    },
    top: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    selectHeight: {
      type: Number,
      default: 0
    }
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n($props.show ? "tui-dropdownlist-show" : ""),
    b: $props.backgroundColor,
    c: $props.show ? $props.height + "rpx" : 0,
    d: $props.top + "rpx",
    e: $props.selectHeight ? $props.selectHeight + "rpx" : "auto"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-98e50597"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-dropdown-list/tui-dropdown-list.vue"]]);
wx.createComponent(Component);
