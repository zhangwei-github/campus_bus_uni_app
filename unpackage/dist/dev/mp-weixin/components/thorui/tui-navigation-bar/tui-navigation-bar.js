"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "tuiNavigationBar",
  emits: ["init", "change"],
  props: {
    title: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#333"
    },
    backgroundColor: {
      type: String,
      default: "#fff"
    },
    splitLine: {
      type: Boolean,
      default: false
    },
    isOpacity: {
      type: Boolean,
      default: true
    },
    maxOpacity: {
      type: [Number, String],
      default: 1
    },
    transparent: {
      type: Boolean,
      default: false
    },
    scrollTop: {
      type: [Number, String],
      default: 0
    },
    scrollRatio: {
      type: [Number, String],
      default: 0.3
    },
    isCustom: {
      type: Boolean,
      default: false
    },
    isImmersive: {
      type: Boolean,
      default: true
    },
    isFixed: {
      type: Boolean,
      default: true
    },
    backdropFilter: {
      type: Boolean,
      default: false
    },
    dropDownHide: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: [Number, String],
      default: 996
    }
  },
  watch: {
    scrollTop(newValue, oldValue) {
      if (this.isOpacity && !this.transparent) {
        this.opacityChange();
      }
    },
    backgroundColor(val) {
      if (val) {
        this.background = this.hexToRgb(val);
      }
    }
  },
  data() {
    return {
      width: 375,
      left: 375,
      height: 44,
      top: 0,
      scrollH: 1,
      opacity: 1,
      statusBarHeight: 0,
      background: "255,255,255",
      dropDownOpacity: 1
    };
  },
  created() {
    this.dropDownOpacity = this.backdropFilter && 0;
    this.opacity = this.isOpacity || this.transparent ? 0 : this.maxOpacity;
    this.background = this.hexToRgb(this.backgroundColor);
    let obj = {};
    obj = common_vendor.wx$1.getMenuButtonBoundingClientRect();
    common_vendor.index.getSystemInfo({
      success: (res) => {
        this.statusBarHeight = res.statusBarHeight;
        this.width = res.windowWidth;
        this.left = obj.left || res.windowWidth;
        if (this.isImmersive) {
          this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44;
        }
        this.scrollH = res.windowWidth * this.scrollRatio;
        this.top = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;
        this.$emit("init", {
          width: this.width,
          height: this.height,
          left: this.left,
          top: this.top,
          statusBarHeight: this.statusBarHeight,
          opacity: this.opacity,
          windowHeight: res.windowHeight
        });
      }
    });
  },
  methods: {
    hexToRgb(hex) {
      let rgb = "255,255,255";
      if (hex && ~hex.indexOf("#")) {
        if (hex.length === 4) {
          let text = hex.substring(1, 4);
          hex = "#" + text + text;
        }
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
          rgb = `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
        }
      }
      return rgb;
    },
    opacityChange() {
      if (this.dropDownHide) {
        if (this.scrollTop < 0) {
          if (this.dropDownOpacity > 0) {
            this.dropDownOpacity = 1 - Math.abs(this.scrollTop) / 30;
          }
        } else {
          this.dropDownOpacity = 1;
        }
      }
      let scroll = this.scrollTop <= 1 ? 0 : this.scrollTop;
      let opacity = scroll / this.scrollH;
      if (this.opacity >= this.maxOpacity && opacity >= this.maxOpacity || this.opacity == 0 && opacity == 0) {
        return;
      }
      this.opacity = opacity > this.maxOpacity ? this.maxOpacity : opacity;
      if (this.backdropFilter) {
        this.dropDownOpacity = this.opacity >= this.maxOpacity ? 1 : this.opacity;
      }
      this.$emit("change", {
        opacity: this.opacity
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.isImmersive
  }, $props.isImmersive ? {
    b: $data.statusBarHeight + "px"
  } : {}, {
    c: $props.title && !$props.isCustom
  }, $props.title && !$props.isCustom ? {
    d: common_vendor.t($props.title),
    e: $props.transparent || $data.opacity >= $props.maxOpacity ? 1 : $data.opacity,
    f: $props.color,
    g: $data.top - $data.statusBarHeight + "px"
  } : {}, {
    h: $data.opacity > 0.85 && $props.splitLine ? 1 : "",
    i: $props.isFixed ? 1 : "",
    j: $props.backdropFilter && $data.dropDownOpacity > 0 ? 1 : "",
    k: $data.height + "px",
    l: `rgba(${$data.background},${$data.opacity})`,
    m: $data.dropDownOpacity,
    n: $props.isFixed ? $props.zIndex : "auto"
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5bb0503f"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-navigation-bar/tui-navigation-bar.vue"]]);
wx.createComponent(Component);
