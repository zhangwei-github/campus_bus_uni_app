"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "tuiTag",
  emits: ["click"],
  props: {
    type: {
      type: String,
      default: "primary"
    },
    padding: {
      type: String,
      default: "16rpx 26rpx"
    },
    margin: {
      type: String,
      default: "0"
    },
    size: {
      type: String,
      default: "28rpx"
    },
    shape: {
      type: String,
      default: "square"
    },
    plain: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    scaleMultiple: {
      type: Number,
      default: 1
    },
    originLeft: {
      type: Boolean,
      default: false
    },
    originRight: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleClick() {
      this.$emit("click", {
        index: this.index
      });
    },
    getTypeClass: function(type, plain) {
      return plain ? "tui-" + type + "-outline" : "tui-" + type;
    },
    getClassName: function(shape, plain) {
      var className = plain ? "tui-tag-outline " : "";
      if (shape != "square") {
        if (shape == "circle") {
          className = className + (plain ? "tui-tag-outline-fillet" : "tui-tag-fillet");
        } else if (shape == "circleLeft") {
          className = className + "tui-tag-fillet-left";
        } else if (shape == "circleRight") {
          className = className + "tui-tag-fillet-right";
        }
      }
      return className;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.hover ? "tui-tag-opcity" : "",
    b: common_vendor.n($props.originLeft ? "tui-origin-left" : ""),
    c: common_vendor.n($props.originRight ? "tui-origin-right" : ""),
    d: common_vendor.n($options.getClassName($props.shape, $props.plain)),
    e: common_vendor.n($options.getTypeClass($props.type, $props.plain)),
    f: `scale(${$props.scaleMultiple})`,
    g: $props.padding,
    h: $props.margin,
    i: $props.size,
    j: $props.size,
    k: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5b019941"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-tag/tui-tag.vue"]]);
wx.createComponent(Component);
