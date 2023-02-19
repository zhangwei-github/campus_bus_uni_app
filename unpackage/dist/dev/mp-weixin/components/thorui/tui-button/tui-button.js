"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "tuiButton",
  emits: ["click", "getuserinfo", "contact", "getphonenumber", "error"],
  props: {
    type: {
      type: String,
      default: "primary"
    },
    shadow: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "96rpx"
    },
    size: {
      type: Number,
      default: 32
    },
    bold: {
      type: Boolean,
      default: false
    },
    margin: {
      type: String,
      default: "0"
    },
    shape: {
      type: String,
      default: "square"
    },
    plain: {
      type: Boolean,
      default: false
    },
    link: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledGray: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    formType: {
      type: String,
      default: ""
    },
    openType: {
      type: String,
      default: ""
    },
    index: {
      type: [Number, String],
      default: 0
    },
    preventClick: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      time: 0
    };
  },
  methods: {
    handleClick() {
      if (this.disabled)
        return;
      if (this.preventClick) {
        if (new Date().getTime() - this.time <= 200)
          return;
        this.time = new Date().getTime();
        setTimeout(() => {
          this.time = 0;
        }, 200);
      }
      this.$emit("click", {
        index: Number(this.index)
      });
    },
    bindgetuserinfo({
      detail = {}
    } = {}) {
      this.$emit("getuserinfo", detail);
    },
    bindcontact({
      detail = {}
    } = {}) {
      this.$emit("contact", detail);
    },
    bindgetphonenumber({
      detail = {}
    } = {}) {
      this.$emit("getphonenumber", detail);
    },
    binderror({
      detail = {}
    } = {}) {
      this.$emit("error", detail);
    },
    getShadowClass: function(type, shadow, plain) {
      let className = "";
      if (shadow && type != "white" && !plain) {
        className = "tui-shadow-" + type;
      }
      return className;
    },
    getDisabledClass: function(disabled, type, plain) {
      let className = "";
      if (disabled && type != "white" && type.indexOf("-") == -1) {
        let classVal = this.disabledGray ? "tui-gray-disabled" : "tui-dark-disabled";
        className = plain ? "tui-dark-disabled-outline" : classVal;
      }
      return className;
    },
    getShapeClass: function(shape, plain) {
      let className = "";
      if (shape == "circle") {
        className = plain ? "tui-outline-fillet" : "tui-fillet";
      } else if (shape == "rightAngle") {
        className = plain ? "tui-outline-rightAngle" : "tui-rightAngle";
      }
      return className;
    },
    getHoverClass: function(disabled, type, plain) {
      let className = "";
      if (!disabled) {
        className = plain ? "tui-outline-hover" : "tui-" + (type || "primary") + "-hover";
      }
      return className;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n($props.plain ? "tui-" + $props.type + "-outline" : "tui-btn-" + ($props.type || "primary")),
    b: common_vendor.n($options.getDisabledClass($props.disabled, $props.type, $props.plain)),
    c: common_vendor.n($options.getShapeClass($props.shape, $props.plain)),
    d: common_vendor.n($options.getShadowClass($props.type, $props.shadow, $props.plain)),
    e: common_vendor.n($props.bold ? "tui-text-bold" : ""),
    f: common_vendor.n($props.link ? "tui-btn__link" : ""),
    g: common_vendor.n($props.width === "100%" || !$props.width || $props.width === true ? "tui-btn__flex-1" : ""),
    h: $options.getHoverClass($props.disabled, $props.type, $props.plain),
    i: $props.width,
    j: $props.height,
    k: $props.height,
    l: $props.size + "rpx",
    m: $props.margin,
    n: $props.loading,
    o: $props.formType,
    p: $props.openType,
    q: common_vendor.o((...args) => $options.bindgetuserinfo && $options.bindgetuserinfo(...args)),
    r: common_vendor.o((...args) => $options.bindgetphonenumber && $options.bindgetphonenumber(...args)),
    s: common_vendor.o((...args) => $options.bindcontact && $options.bindcontact(...args)),
    t: common_vendor.o((...args) => $options.binderror && $options.binderror(...args)),
    v: $props.disabled,
    w: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2af5f154"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-button/tui-button.vue"]]);
wx.createComponent(Component);
