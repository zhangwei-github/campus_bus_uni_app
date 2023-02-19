"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "tuiNoData",
  emits: ["click"],
  props: {
    fixed: {
      type: Boolean,
      default: true
    },
    imgUrl: {
      type: String,
      default: ""
    },
    imgWidth: {
      type: Number,
      default: 200
    },
    imgHeight: {
      type: Number,
      default: 200
    },
    btnWidth: {
      type: Number,
      default: 200
    },
    btnHeight: {
      type: Number,
      default: 60
    },
    btnText: {
      type: String,
      default: ""
    },
    backgroundColor: {
      type: String,
      default: "#EB0909"
    },
    size: {
      type: Number,
      default: 28
    },
    radius: {
      type: String,
      default: "8rpx"
    }
  },
  methods: {
    handleClick(e) {
      this.$emit("click", {});
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.imgUrl
  }, $props.imgUrl ? {
    b: $props.imgUrl,
    c: $props.imgWidth + "rpx",
    d: $props.imgHeight + "rpx"
  } : {}, {
    e: $props.btnText
  }, $props.btnText ? {
    f: common_vendor.t($props.btnText),
    g: $props.btnWidth + "rpx",
    h: $props.btnHeight + "rpx",
    i: $props.backgroundColor,
    j: $props.radius,
    k: $props.size + "rpx",
    l: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args))
  } : {}, {
    m: common_vendor.n($props.fixed ? "tui-nodata-fixed" : "")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-494125d9"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-no-data/tui-no-data.vue"]]);
wx.createComponent(Component);
