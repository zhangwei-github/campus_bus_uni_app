"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "tuiDivider",
  props: {
    height: {
      type: Number,
      default: 100
    },
    width: {
      type: String,
      default: "100%"
    },
    dividerColor: {
      type: String,
      default: "#e5e5e5"
    },
    color: {
      type: String,
      default: "#999"
    },
    size: {
      type: Number,
      default: 24
    },
    bold: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: "#fafafa"
    },
    gradual: {
      type: Boolean,
      default: false
    },
    gradualColor: {
      type: Array,
      default: function() {
        return ["#eee", "#ccc"];
      }
    }
  },
  methods: {
    getBgColor: function(gradual, gradualColor, dividerColor) {
      let bgColor = dividerColor;
      if (gradual) {
        bgColor = "linear-gradient(to right," + gradualColor[0] + "," + gradualColor[1] + "," + gradualColor[1] + "," + gradualColor[0] + ")";
      }
      return bgColor;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.width,
    b: $options.getBgColor($props.gradual, $props.gradualColor, $props.dividerColor),
    c: $props.color,
    d: $props.size + "rpx",
    e: $props.size + "rpx",
    f: $props.backgroundColor,
    g: $props.bold ? "bold" : "normal",
    h: $props.height + "rpx"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5a47b82f"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-divider/tui-divider.vue"]]);
wx.createComponent(Component);
