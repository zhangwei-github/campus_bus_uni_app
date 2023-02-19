if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$k = {
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
      uni.getSystemInfo({
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
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["tui-navigation-bar", { "tui-bar-line": $data.opacity > 0.85 && $props.splitLine, "tui-navbar-fixed": $props.isFixed, "tui-backdrop__filter": $props.backdropFilter && $data.dropDownOpacity > 0 }]),
      style: vue.normalizeStyle({ height: $data.height + "px", backgroundColor: `rgba(${$data.background},${$data.opacity})`, opacity: $data.dropDownOpacity, zIndex: $props.isFixed ? $props.zIndex : "auto" })
    }, [
      $props.isImmersive ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "tui-status-bar",
        style: vue.normalizeStyle({ height: $data.statusBarHeight + "px" })
      }, null, 4)) : vue.createCommentVNode("v-if", true),
      $props.title && !$props.isCustom ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "tui-navigation_bar-title",
        style: vue.normalizeStyle({ opacity: $props.transparent || $data.opacity >= $props.maxOpacity ? 1 : $data.opacity, color: $props.color, paddingTop: $data.top - $data.statusBarHeight + "px" })
      }, vue.toDisplayString($props.title), 5)) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 6);
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-5bb0503f"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-navigation-bar/tui-navigation-bar.vue"]]);
  const icons = {
    "about": "\uE772",
    "about-fill": "\uE771",
    "add": "\uE770",
    "add-fill": "\uE76F",
    "addmessage": "\uE76E",
    "addressbook": "\uE76D",
    "agree": "\uE76C",
    "agree-fill": "\uE76B",
    "alarm": "\uE76A",
    "alarm-fill": "\uE769",
    "alipay": "\uE768",
    "android": "\uE767",
    "applets": "\uE766",
    "arrowdown": "\uE765",
    "arrowleft": "\uE764",
    "arrowright": "\uE763",
    "arrowup": "\uE762",
    "attestation": "\uE761",
    "back": "\uE760",
    "bag": "\uE75F",
    "bag-fill": "\uE75E",
    "balloon": "\uE75D",
    "bankcard": "\uE75C",
    "bankcard-fill": "\uE75B",
    "bottom": "\uE75A",
    "calendar": "\uE759",
    "camera": "\uE758",
    "camera-fill": "\uE757",
    "camera-add": "\uE756",
    "card": "\uE755",
    "card-fill": "\uE754",
    "cart": "\uE753",
    "cart-fill": "\uE752",
    "category": "\uE751",
    "category-fill": "\uE750",
    "check": "\uE74F",
    "circle": "\uE74E",
    "circle-fill": "\uE74D",
    "circle-selected": "\uE74C",
    "clock": "\uE74B",
    "clock-fill": "\uE74A",
    "close": "\uE749",
    "close-fill": "\uE748",
    "community": "\uE747",
    "community-fill": "\uE746",
    "computer": "\uE745",
    "computer-fill": "\uE744",
    "coupon": "\uE743",
    "delete": "\uE742",
    "deletekey": "\uE741",
    "dingtalk": "\uE740",
    "dissatisfied": "\uE73F",
    "down": "\uE73E",
    "download": "\uE73D",
    "edit": "\uE73C",
    "ellipsis": "\uE73B",
    "enlarge": "\uE73A",
    "evaluate": "\uE739",
    "exchange": "\uE738",
    "explain": "\uE737",
    "explain-fill": "\uE736",
    "explore": "\uE735",
    "explore-fill": "\uE734",
    "eye": "\uE733",
    "feedback": "\uE732",
    "fingerprint": "\uE730",
    "friendadd": "\uE72F",
    "friendadd-fill": "\uE72E",
    "gps": "\uE72D",
    "histogram": "\uE72C",
    "home": "\uE72B",
    "home-fill": "\uE72A",
    "house": "\uE729",
    "imface": "\uE728",
    "imkeyboard": "\uE727",
    "immore": "\uE726",
    "imvoice": "\uE725",
    "ios": "\uE724",
    "kefu": "\uE723",
    "label": "\uE722",
    "label-fill": "\uE721",
    "like": "\uE720",
    "like-fill": "\uE71F",
    "link": "\uE71E",
    "listview": "\uE71D",
    "loading": "\uE71C",
    "location": "\uE71B",
    "mail": "\uE71A",
    "mail-fill": "\uE719",
    "manage": "\uE718",
    "manage-fill": "\uE717",
    "member": "\uE716",
    "member-fill": "\uE715",
    "message": "\uE714",
    "message-fill": "\uE713",
    "mobile": "\uE712",
    "moments": "\uE711",
    "more": "\uE710",
    "more-fill": "\uE70F",
    "narrow": "\uE70E",
    "news": "\uE70D",
    "news-fill": "\uE70C",
    "nodata": "\uE70B",
    "notice": "\uE699",
    "notice-fill": "\uE698",
    "offline": "\uE697",
    "offline-fill": "\uE696",
    "oppose": "\uE695",
    "oppose-fill": "\uE694",
    "order": "\uE693",
    "partake": "\uE692",
    "people": "\uE691",
    "people-fill": "\uE690",
    "pic": "\uE68F",
    "pic-fill": "\uE68E",
    "picture": "\uE68D",
    "pie": "\uE68C",
    "plus": "\uE689",
    "polygonal": "\uE688",
    "position": "\uE686",
    "pwd": "\uE685",
    "qq": "\uE684",
    "qrcode": "\uE682",
    "redpacket": "\uE681",
    "redpacket-fill": "\uE680",
    "reduce": "\uE67F",
    "refresh": "\uE67E",
    "revoke": "\uE67D",
    "satisfied": "\uE67C",
    "screen": "\uE67B",
    "search": "\uE67A",
    "search-2": "\uE679",
    "send": "\uE678",
    "service": "\uE677",
    "service-fill": "\uE676",
    "setup": "\uE675",
    "setup-fill": "\uE674",
    "share": "\uE673",
    "share-fill": "\uE672",
    "shield": "\uE671",
    "shop": "\uE670",
    "shop-fill": "\uE66F",
    "shut": "\uE66E",
    "signin": "\uE66D",
    "sina": "\uE66C",
    "skin": "\uE66B",
    "soso": "\uE669",
    "square": "\uE668",
    "square-fill": "\uE667",
    "square-selected": "\uE666",
    "star": "\uE665",
    "star-fill": "\uE664",
    "strategy": "\uE663",
    "sweep": "\uE662",
    "time": "\uE661",
    "time-fill": "\uE660",
    "todown": "\uE65F",
    "toleft": "\uE65E",
    "tool": "\uE65D",
    "top": "\uE65C",
    "toright": "\uE65B",
    "towardsleft": "\uE65A",
    "towardsright": "\uE659",
    "towardsright-fill": "\uE658",
    "transport": "\uE657",
    "transport-fill": "\uE656",
    "turningdown": "\uE654",
    "turningleft": "\uE653",
    "turningright": "\uE652",
    "turningup": "\uE651",
    "unreceive": "\uE650",
    "seen": "\uE7D2",
    "unseen": "\uE7D1",
    "up": "\uE64E",
    "upload": "\uE64C",
    "video": "\uE64B",
    "voice": "\uE649",
    "voice-fill": "\uE648",
    "voipphone": "\uE647",
    "wallet": "\uE646",
    "warning": "\uE645",
    "wealth": "\uE644",
    "wealth-fill": "\uE643",
    "weather": "\uE642",
    "wechat": "\uE641",
    "wifi": "\uE640",
    "play": "\uE7D5",
    "suspend": "\uE7D4"
  };
  const _sfc_main$j = {
    name: "tuiIcon",
    emits: ["click"],
    props: {
      name: {
        type: String,
        default: ""
      },
      size: {
        type: [Number, String],
        default: 32
      },
      unit: {
        type: String,
        default: "px"
      },
      color: {
        type: String,
        default: "#999"
      },
      bold: {
        type: Boolean,
        default: false
      },
      margin: {
        type: String,
        default: "0"
      },
      index: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        icons
      };
    },
    methods: {
      handleClick() {
        this.$emit("click", {
          index: this.index
        });
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("text", {
      class: "tui-icon",
      style: vue.normalizeStyle({ color: $props.color || "#999", fontSize: $props.size + $props.unit, fontWeight: $props.bold ? "bold" : "normal", margin: $props.margin }),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.handleClick && $options.handleClick(...args))
    }, vue.toDisplayString($data.icons[$props.name]), 5);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-096cf6db"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-icon/tui-icon.vue"]]);
  const _sfc_main$i = {
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
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("button", {
      class: vue.normalizeClass(["tui-btn", [
        $props.plain ? "tui-" + $props.type + "-outline" : "tui-btn-" + ($props.type || "primary"),
        $options.getDisabledClass($props.disabled, $props.type, $props.plain),
        $options.getShapeClass($props.shape, $props.plain),
        $options.getShadowClass($props.type, $props.shadow, $props.plain),
        $props.bold ? "tui-text-bold" : "",
        $props.link ? "tui-btn__link" : "",
        $props.width === "100%" || !$props.width || $props.width === true ? "tui-btn__flex-1" : ""
      ]]),
      "hover-class": $options.getHoverClass($props.disabled, $props.type, $props.plain),
      style: vue.normalizeStyle({ width: $props.width, height: $props.height, lineHeight: $props.height, fontSize: $props.size + "rpx", margin: $props.margin }),
      loading: $props.loading,
      "form-type": $props.formType,
      "open-type": $props.openType,
      onGetuserinfo: _cache[0] || (_cache[0] = (...args) => $options.bindgetuserinfo && $options.bindgetuserinfo(...args)),
      onGetphonenumber: _cache[1] || (_cache[1] = (...args) => $options.bindgetphonenumber && $options.bindgetphonenumber(...args)),
      onContact: _cache[2] || (_cache[2] = (...args) => $options.bindcontact && $options.bindcontact(...args)),
      onError: _cache[3] || (_cache[3] = (...args) => $options.binderror && $options.binderror(...args)),
      disabled: $props.disabled,
      onClick: _cache[4] || (_cache[4] = vue.withModifiers((...args) => $options.handleClick && $options.handleClick(...args), ["stop"]))
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 46, ["hover-class", "loading", "form-type", "open-type", "disabled"]);
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-2af5f154"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-button/tui-button.vue"]]);
  const _sfc_main$h = {
    name: "tuiListCell",
    emits: ["click"],
    props: {
      arrow: {
        type: Boolean,
        default: false
      },
      arrowColor: {
        type: String,
        default: ""
      },
      hover: {
        type: Boolean,
        default: true
      },
      unlined: {
        type: Boolean,
        default: false
      },
      lineLeft: {
        type: Boolean,
        default: true
      },
      lineRight: {
        type: Boolean,
        default: false
      },
      padding: {
        type: String,
        default: "26rpx 30rpx"
      },
      backgroundColor: {
        type: String,
        default: "#fff"
      },
      size: {
        type: Number,
        default: 28
      },
      color: {
        type: String,
        default: "#333"
      },
      radius: {
        type: Boolean,
        default: false
      },
      arrowRight: {
        type: Boolean,
        default: true
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
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["tui-list-class tui-list-cell", [
        $props.arrow ? "tui-cell-arrow" : "",
        $props.arrow && $props.arrowRight ? "" : "tui-arrow-right",
        $props.unlined ? "tui-cell-unlined" : "",
        $props.lineLeft ? "tui-line-left" : "",
        $props.lineRight ? "tui-line-right" : "",
        $props.arrow && $props.arrowColor ? "tui-arrow-" + $props.arrowColor : "",
        $props.radius ? "tui-radius" : ""
      ]]),
      "hover-class": $props.hover ? "tui-cell-hover" : "",
      style: vue.normalizeStyle({ backgroundColor: $props.backgroundColor, fontSize: $props.size + "rpx", color: $props.color, padding: $props.padding }),
      "hover-stay-time": 150,
      onClick: _cache[0] || (_cache[0] = (...args) => $options.handleClick && $options.handleClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 14, ["hover-class"]);
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-5d44a8e3"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-list-cell/tui-list-cell.vue"]]);
  const _sfc_main$g = {
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
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "tui-selected-class tui-dropdown-list",
      style: vue.normalizeStyle({ height: $props.selectHeight ? $props.selectHeight + "rpx" : "auto" })
    }, [
      vue.renderSlot(_ctx.$slots, "selectionbox", {}, void 0, true),
      vue.createElementVNode("view", {
        class: vue.normalizeClass(["tui-dropdown-view", [$props.show ? "tui-dropdownlist-show" : ""]]),
        style: vue.normalizeStyle({ backgroundColor: $props.backgroundColor, height: $props.show ? $props.height + "rpx" : 0, top: $props.top + "rpx" })
      }, [
        vue.renderSlot(_ctx.$slots, "dropdownbox", {}, void 0, true)
      ], 6)
    ], 4);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-98e50597"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-dropdown-list/tui-dropdown-list.vue"]]);
  const _sfc_main$f = {
    name: "tuiTabs",
    emits: ["change"],
    props: {
      tabs: {
        type: Array,
        default() {
          return [];
        }
      },
      width: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 80
      },
      padding: {
        type: Number,
        default: 30
      },
      backgroundColor: {
        type: String,
        default: "#FFFFFF"
      },
      isFixed: {
        type: Boolean,
        default: false
      },
      top: {
        type: Number,
        default: 0
      },
      unlined: {
        type: Boolean,
        default: false
      },
      currentTab: {
        type: Number,
        default: 0
      },
      isSlider: {
        type: Boolean,
        default: true
      },
      sliderWidth: {
        type: Number,
        default: 68
      },
      sliderHeight: {
        type: Number,
        default: 6
      },
      sliderBgColor: {
        type: String,
        default: "#5677fc"
      },
      sliderRadius: {
        type: String,
        default: "50rpx"
      },
      bottom: {
        type: String,
        default: "0"
      },
      itemWidth: {
        type: String,
        default: "25%"
      },
      color: {
        type: String,
        default: "#666"
      },
      selectedColor: {
        type: String,
        default: "#5677fc"
      },
      size: {
        type: Number,
        default: 28
      },
      bold: {
        type: Boolean,
        default: false
      },
      badgeColor: {
        type: String,
        default: "#fff"
      },
      badgeBgColor: {
        type: String,
        default: "#F74D54"
      },
      zIndex: {
        type: [Number, String],
        default: 996
      }
    },
    watch: {
      currentTab() {
        this.checkCor();
      },
      tabs() {
        this.checkCor();
      },
      width(val) {
        this.tabsWidth = val;
        this.checkCor();
      }
    },
    created() {
      setTimeout(() => {
        uni.getSystemInfo({
          success: (res) => {
            this.winWidth = res.windowWidth;
            this.tabsWidth = this.width == 0 ? this.winWidth : this.width;
            this.checkCor();
          }
        });
      }, 0);
    },
    data() {
      return {
        winWidth: 0,
        tabsWidth: 0,
        scrollLeft: 0
      };
    },
    methods: {
      checkCor: function() {
        let tabsNum = this.tabs.length;
        let padding = this.winWidth / 750 * this.padding;
        let width = this.tabsWidth - padding * 2;
        let left = (width / tabsNum - this.winWidth / 750 * this.sliderWidth) / 2 + padding;
        let scrollLeft = left;
        if (this.currentTab > 0) {
          scrollLeft = scrollLeft + width / tabsNum * this.currentTab;
        }
        this.scrollLeft = scrollLeft;
      },
      swichTabs: function(index) {
        let item = this.tabs[index];
        if (item && item.disabled)
          return;
        if (this.currentTab == index) {
          return false;
        } else {
          this.$emit("change", {
            index: Number(index)
          });
        }
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.tabsWidth > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: vue.normalizeClass(["tui-tabs-view", [$props.isFixed ? "tui-tabs-fixed" : "tui-tabs-relative", $props.unlined ? "tui-unlined" : ""]]),
      style: vue.normalizeStyle({
        width: $data.tabsWidth + "px",
        height: $props.height + "rpx",
        padding: `0 ${$props.padding}rpx`,
        background: $props.backgroundColor,
        top: $props.isFixed ? $props.top + "px" : "auto",
        zIndex: $props.isFixed ? $props.zIndex : "auto"
      })
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.tabs, (item, index) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          key: index,
          class: "tui-tabs-item",
          style: vue.normalizeStyle({ width: $props.itemWidth, height: $props.height + "rpx" }),
          onClick: vue.withModifiers(($event) => $options.swichTabs(index), ["stop"])
        }, [
          vue.createElementVNode("view", {
            class: vue.normalizeClass(["tui-tabs-title", { "tui-tabs-active": $props.currentTab == index, "tui-tabs-disabled": item.disabled }]),
            style: vue.normalizeStyle({
              color: $props.currentTab == index ? $props.selectedColor : $props.color,
              fontSize: $props.size + "rpx",
              fontWeight: $props.bold && $props.currentTab == index ? "bold" : "normal"
            })
          }, [
            vue.createTextVNode(vue.toDisplayString(item.name) + " ", 1),
            item.num || item.isDot ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: vue.normalizeClass([item.isDot ? "tui-badge__dot" : "tui-tabs__badge"]),
              style: vue.normalizeStyle({ color: $props.badgeColor, backgroundColor: $props.badgeBgColor })
            }, vue.toDisplayString(item.isDot ? "" : item.num), 7)) : vue.createCommentVNode("v-if", true)
          ], 6)
        ], 12, ["onClick"]);
      }), 128)),
      $props.isSlider ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "tui-tabs-slider",
        style: vue.normalizeStyle({
          transform: "translateX(" + $data.scrollLeft + "px)",
          width: $props.sliderWidth + "rpx",
          height: $props.sliderHeight + "rpx",
          borderRadius: $props.sliderRadius,
          bottom: $props.bottom,
          background: $props.sliderBgColor,
          marginBottom: $props.bottom == "50%" ? "-" + $props.sliderHeight / 2 + "rpx" : 0
        })
      }, null, 4)) : vue.createCommentVNode("v-if", true)
    ], 6)) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-00f3d717"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-tabs/tui-tabs.vue"]]);
  const _sfc_main$e = {
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
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["tui-nodata-box", [$props.fixed ? "tui-nodata-fixed" : ""]])
    }, [
      $props.imgUrl ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        src: $props.imgUrl,
        class: "tui-tips-icon",
        style: vue.normalizeStyle({ width: $props.imgWidth + "rpx", height: $props.imgHeight + "rpx" }),
        mode: "widthFix"
      }, null, 12, ["src"])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "tui-tips-content" }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]),
      $props.btnText ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "tui-tips-btn",
        "hover-class": "tui-btn__hover",
        "hover-stay-time": 150,
        style: vue.normalizeStyle({ width: $props.btnWidth + "rpx", height: $props.btnHeight + "rpx", background: $props.backgroundColor, borderRadius: $props.radius, fontSize: $props.size + "rpx" }),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.handleClick && $options.handleClick(...args))
      }, vue.toDisplayString($props.btnText), 5)) : vue.createCommentVNode("v-if", true)
    ], 2);
  }
  const __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-494125d9"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-no-data/tui-no-data.vue"]]);
  const _sfc_main$d = {
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
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["tui-tag", [$props.originLeft ? "tui-origin-left" : "", $props.originRight ? "tui-origin-right" : "", $options.getClassName($props.shape, $props.plain), $options.getTypeClass($props.type, $props.plain)]]),
      "hover-class": $props.hover ? "tui-tag-opcity" : "",
      "hover-stay-time": 150,
      style: vue.normalizeStyle({ transform: `scale(${$props.scaleMultiple})`, padding: $props.padding, margin: $props.margin, fontSize: $props.size, lineHeight: $props.size }),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.handleClick && $options.handleClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 14, ["hover-class"]);
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-5b019941"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-tag/tui-tag.vue"]]);
  const _sfc_main$c = {
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
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "tui-divider",
      style: vue.normalizeStyle({ height: $props.height + "rpx" })
    }, [
      vue.createElementVNode("view", {
        class: "tui-divider-line",
        style: vue.normalizeStyle({ width: $props.width, background: $options.getBgColor($props.gradual, $props.gradualColor, $props.dividerColor) })
      }, null, 4),
      vue.createElementVNode("view", {
        class: "tui-divider-text",
        style: vue.normalizeStyle({ color: $props.color, fontSize: $props.size + "rpx", lineHeight: $props.size + "rpx", backgroundColor: $props.backgroundColor, fontWeight: $props.bold ? "bold" : "normal" })
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 4)
    ], 4);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-5a47b82f"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-divider/tui-divider.vue"]]);
  const _sfc_main$b = {
    name: "tuiListView",
    props: {
      title: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#666"
      },
      size: {
        type: Number,
        default: 30
      },
      backgroundColor: {
        type: String,
        default: "transparent"
      },
      unlined: {
        type: String,
        default: ""
      },
      marginTop: {
        type: String,
        default: "0"
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "tui-list-view tui-view-class",
      style: vue.normalizeStyle({ backgroundColor: $props.backgroundColor, marginTop: $props.marginTop })
    }, [
      $props.title ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "tui-list-title",
        style: vue.normalizeStyle({ color: $props.color, fontSize: $props.size + "rpx", lineHeight: 30 + "rpx" })
      }, vue.toDisplayString($props.title), 5)) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", {
        class: vue.normalizeClass(["tui-list-content", [$props.unlined ? "tui-border-" + $props.unlined : ""]])
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 2)
    ], 4);
  }
  const __easycom_9 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-88f4ea34"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-list-view/tui-list-view.vue"]]);
  const _sfc_main$a = {
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
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["tui-tabbar", { "tui-tabbar-fixed": $props.isFixed, "tui-unlined": $props.unlined, "tui-backdrop__filter": $props.backdropFilter }]),
      style: vue.normalizeStyle({ background: $props.backgroundColor, zIndex: $props.isFixed ? $props.zIndex : "auto" })
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.tabBar, (item, index) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          key: index,
          class: vue.normalizeClass(["tui-tabbar-item", { "tui-item-hump": item.hump }]),
          style: vue.normalizeStyle({ backgroundColor: item.hump && !$props.backdropFilter ? $props.backgroundColor : "none" }),
          onClick: ($event) => $options.tabbarSwitch(index, item.hump, item.pagePath, item.verify)
        }, [
          vue.createElementVNode("view", {
            class: vue.normalizeClass(["tui-icon-box", { "tui-tabbar-hump": item.hump }])
          }, [
            vue.createElementVNode("image", {
              src: $props.current == index ? item.selectedIconPath : item.iconPath,
              class: vue.normalizeClass([item.hump ? "" : "tui-tabbar-icon"])
            }, null, 10, ["src"]),
            item.num ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: vue.normalizeClass([item.isDot ? "tui-badge-dot" : "tui-badge"]),
              style: vue.normalizeStyle({ color: $props.badgeColor, backgroundColor: $props.badgeBgColor })
            }, vue.toDisplayString(item.isDot ? "" : item.num), 7)) : vue.createCommentVNode("v-if", true)
          ], 2),
          vue.createElementVNode("view", {
            class: vue.normalizeClass(["tui-text-scale", { "tui-text-hump": item.hump }]),
            style: vue.normalizeStyle({ color: $props.current == index ? $props.selectedColor : $props.color })
          }, vue.toDisplayString(item.text), 7)
        ], 14, ["onClick"]);
      }), 128)),
      $props.hump && !$props.unlined && !$props.backdropFilter ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        style: vue.normalizeStyle({ background: $props.backgroundColor }),
        class: vue.normalizeClass({ "tui-hump-box": $props.hump })
      }, null, 6)) : vue.createCommentVNode("v-if", true)
    ], 6);
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-a5dcc4b5"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-tabbar/tui-tabbar.vue"]]);
  let server_url = "";
  function service(options = {}) {
    options.url = `${server_url}${options.url}`;
    options.header = {
      "content-type": "application/json"
    };
    return new Promise((resolved, rejected) => {
      options.success = (res) => {
        if (Number(res.data.code) == 0) {
          resolved(res.data);
        } else {
          uni.showToast({
            icon: "none",
            duration: 3e3,
            title: `${res.data.msg}`
          });
          rejected(res.data.msg);
        }
      };
      options.fail = (err) => {
        rejected(err);
      };
      uni.request(options);
    });
  }
  const insertData = (data, path) => {
    return service({
      url: "http://localhost:8080" + path,
      method: "post",
      data
    });
  };
  const getDataParam = (data, path) => {
    return service({
      url: "http://localhost:8080" + path,
      method: "get",
      data
    });
  };
  const _sfc_main$9 = {
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
        getDataParam(this.query, "/schedule/queryScheduleAssociated").then((res) => {
          formatAppLog("log", "at pages/index/index.vue:255", res);
          this.scheduleDataRes = this.changeData(res.data);
          formatAppLog("log", "at pages/index/index.vue:257", this.scheduleDataRes);
          this.pageTotal = res.pageTotal || 10;
        });
      },
      addScheduleData() {
        getDataParam(this.query, "/schedule/queryScheduleAssociated").then((res) => {
          formatAppLog("log", "at pages/index/index.vue:263", res);
          this.scheduleDataRes.push(this.changeData(res.data));
          formatAppLog("log", "at pages/index/index.vue:265", this.scheduleDataRes);
          this.pageTotal = res.pageTotal || 10;
        });
      },
      getCampusData() {
        getDataParam(this.campusQuery, "/campus/queryCampus").then((res) => {
          formatAppLog("log", "at pages/index/index.vue:274", res);
          this.campusDataRes = res.data;
          formatAppLog("log", "at pages/index/index.vue:276", this.campusDataRes);
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
        formatAppLog("log", "at pages/index/index.vue:361", this.query.options);
        this.currentDay = e.index;
        this.getScheduleData();
        this.$nextTick(() => {
          this.listShow = true;
        });
      },
      pickTicket(id) {
        uni.navigateTo({
          url: "/pages/ticket/pick_ticket?id=" + id
        });
      },
      tabbarSwitch(e) {
        formatAppLog("log", "at pages/index/index.vue:375", e);
        uni.switchTab({
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
      formatAppLog("log", "at pages/index/index.vue:393", "\u5230\u8FBE\u5E95\u90E8");
      if (this.query.pageIndex * this.query.pageSize < this.pageTotal) {
        this.query.pageIndex++;
        formatAppLog("log", "at pages/index/index.vue:396", this.query.pageIndex);
        this.addScheduleData();
      } else {
        uni.showToast({
          title: "\u6682\u65E0\u66F4\u591A\u6570\u636E"
        });
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tui_navigation_bar = resolveEasycom(vue.resolveDynamicComponent("tui-navigation-bar"), __easycom_1$3);
    const _component_tui_icon = resolveEasycom(vue.resolveDynamicComponent("tui-icon"), __easycom_0$2);
    const _component_tui_button = resolveEasycom(vue.resolveDynamicComponent("tui-button"), __easycom_3$1);
    const _component_tui_list_cell = resolveEasycom(vue.resolveDynamicComponent("tui-list-cell"), __easycom_3);
    const _component_tui_dropdown_list = resolveEasycom(vue.resolveDynamicComponent("tui-dropdown-list"), __easycom_4);
    const _component_tui_tabs = resolveEasycom(vue.resolveDynamicComponent("tui-tabs"), __easycom_5);
    const _component_tui_no_data = resolveEasycom(vue.resolveDynamicComponent("tui-no-data"), __easycom_6);
    const _component_tui_tag = resolveEasycom(vue.resolveDynamicComponent("tui-tag"), __easycom_1$2);
    const _component_tui_divider = resolveEasycom(vue.resolveDynamicComponent("tui-divider"), __easycom_0$1);
    const _component_tui_list_view = resolveEasycom(vue.resolveDynamicComponent("tui-list-view"), __easycom_9);
    const _component_tui_tabbar = resolveEasycom(vue.resolveDynamicComponent("tui-tabbar"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(" \u9875\u9762 "),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createCommentVNode(" \u5BFC\u822A\u680F "),
        vue.createVNode(_component_tui_navigation_bar, {
          splitLine: "",
          title: "NavBar\u81EA\u5B9A\u4E49\u5BFC\u822A\u680F",
          backgroundColor: "#000",
          color: "#333"
        }),
        vue.createCommentVNode(" \u8DEF\u5F84\u9009\u62E9 "),
        vue.createElementVNode("view", { class: "choose-station" }, [
          vue.createCommentVNode(" \u9009\u62E9\u59CB\u53D1\u7AD9 \u4F7F\u7528\u4E0B\u62C9\u9009\u62E9\u6846 dropdownlist"),
          vue.createVNode(_component_tui_dropdown_list, {
            class: "start-station",
            show: $data.startStationShow,
            top: 94,
            height: 400
          }, {
            selectionbox: vue.withCtx(() => [
              vue.createVNode(_component_tui_button, {
                type: "white",
                shape: "circle",
                width: "240rpx",
                height: "80rpx",
                margin: "20rpx",
                onClick: _cache[0] || (_cache[0] = ($event) => $options.dropDownStartList(-1))
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString($data.startStation) + " ", 1),
                  vue.createElementVNode("view", {
                    class: vue.normalizeClass(["tui-animation", [$data.startStationShow ? "tui-animation-show" : ""]])
                  }, [
                    vue.createVNode(_component_tui_icon, {
                      name: "turningdown",
                      size: 20
                    })
                  ], 2)
                ]),
                _: 1
              })
            ]),
            dropdownbox: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "tui-selected-list" }, [
                vue.createElementVNode("scroll-view", {
                  "scroll-y": "",
                  class: "tui-dropdown-scroll"
                }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.campusDataRes, (item, index) => {
                    return vue.openBlock(), vue.createBlock(_component_tui_list_cell, {
                      key: index,
                      padding: "0",
                      onClick: ($event) => $options.pickStartStation(index),
                      unlined: $data.campusDataRes.length - 1 == index
                    }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "tui-cell-class" }, [
                          vue.createVNode(_component_tui_icon, {
                            class: "icon",
                            name: "position",
                            size: "22",
                            color: "#55aaff"
                          }),
                          vue.createElementVNode("text", { class: "tui-ml-20" }, vue.toDisplayString(item.campusName), 1)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["onClick", "unlined"]);
                  }), 128))
                ])
              ])
            ]),
            _: 1
          }, 8, ["show"]),
          vue.createCommentVNode(" \u5207\u6362\u59CB\u53D1\u7AD9\u548C\u91CD\u70B9\u7AD9 "),
          vue.createVNode(_component_tui_button, {
            type: "gray-primary",
            class: "change-button",
            shape: "circle",
            width: "80rpx",
            height: "80rpx",
            margin: "20rpx",
            onClick: _cache[1] || (_cache[1] = ($event) => $options.exchangeStation())
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("i", { class: "iconfont icon-exchange" })
            ]),
            _: 1
          }),
          vue.createCommentVNode(" \u9009\u62E9\u7EC8\u70B9\u7AD9 \u4F7F\u7528\u4E0B\u62C9\u9009\u62E9\u6846 dropdownlist"),
          vue.createVNode(_component_tui_dropdown_list, {
            class: "end-station",
            show: $data.endStationShow,
            top: 94,
            height: 400
          }, {
            selectionbox: vue.withCtx(() => [
              vue.createVNode(_component_tui_button, {
                type: "white",
                shape: "circle",
                width: "240rpx",
                height: "80rpx",
                margin: "20rpx",
                onClick: _cache[2] || (_cache[2] = ($event) => $options.dropDownEndList(-1))
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString($data.endStation) + " ", 1),
                  vue.createElementVNode("view", {
                    class: vue.normalizeClass(["tui-animation", [$data.endStationShow ? "tui-animation-show" : ""]])
                  }, [
                    vue.createVNode(_component_tui_icon, {
                      name: "turningdown",
                      size: 20
                    })
                  ], 2)
                ]),
                _: 1
              })
            ]),
            dropdownbox: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "tui-selected-list" }, [
                vue.createElementVNode("scroll-view", {
                  "scroll-y": "",
                  class: "tui-dropdown-scroll"
                }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.campusDataRes, (item, index) => {
                    return vue.openBlock(), vue.createBlock(_component_tui_list_cell, {
                      key: index,
                      padding: "0",
                      onClick: ($event) => $options.pickEndStation(index),
                      unlined: $data.campusDataRes.length - 1 == index
                    }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "tui-cell-class" }, [
                          vue.createVNode(_component_tui_icon, {
                            class: "icon",
                            name: "position",
                            size: "22",
                            color: "#55aaff"
                          }),
                          vue.createElementVNode("text", { class: "tui-ml-20" }, vue.toDisplayString(item.campusName), 1)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["onClick", "unlined"]);
                  }), 128))
                ])
              ])
            ]),
            _: 1
          }, 8, ["show"])
        ]),
        vue.createCommentVNode(" \u67E5\u8BE2\u6309\u94AE "),
        $data.changeFlag ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "update-button"
        }, [
          vue.createVNode(_component_tui_button, {
            shape: "circle",
            height: "80rpx",
            width: "80%",
            onClick: $options.querySchedule
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("\u67E5\u8BE2")
            ]),
            _: 1
          }, 8, ["onClick"])
        ])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" \u661F\u671F\u9009\u62E9\u6846 "),
        vue.createVNode(_component_tui_tabs, {
          color: "#999",
          tabs: $data.tabs,
          selectedColor: "#5677fc",
          currentTab: $data.currentDay,
          onChange: $options.chooseDay
        }, null, 8, ["tabs", "currentTab", "onChange"]),
        vue.createCommentVNode(" \u8F66\u7968\u5217\u8868 "),
        $data.listShow ? (vue.openBlock(), vue.createBlock(_component_tui_list_view, {
          key: 1,
          class: "list",
          title: "\u4ECA\u65E5\u8F66\u7968",
          color: "#777"
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_tui_no_data, { imgUrl: "/static/images/nodata.png" }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("\u6682\u65E0\u6570\u636E")
              ]),
              _: 1
            }),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.scheduleDataRes, (item, index) => {
              return vue.openBlock(), vue.createBlock(_component_tui_list_cell, {
                class: "list-cell",
                key: index
              }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", {
                    class: "card",
                    onClick: ($event) => $options.pickTicket(item.scheduleId)
                  }, [
                    vue.createCommentVNode(" \u6807\u7B7E\u680F "),
                    vue.createElementVNode("view", { class: "card-flex" }, [
                      vue.createVNode(_component_tui_tag, {
                        class: "card-time-tag",
                        type: "light-blue",
                        shape: "circle"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(vue.toDisplayString(item.startTime) + "\u53D1\u51FA", 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    vue.createCommentVNode(" \u7AD9\u70B9\u663E\u793A "),
                    vue.createElementVNode("view", { class: "card-flex card-station" }, [
                      vue.createCommentVNode(" \u59CB\u53D1\u7AD9 "),
                      vue.createElementVNode("view", { class: "title-outline" }, [
                        vue.createElementVNode("text", { class: "card-title" }, vue.toDisplayString(item.startLocation), 1),
                        vue.createElementVNode("text", { class: "card-sub-title sub-title-size" }, vue.toDisplayString(item.startStation), 1)
                      ]),
                      vue.createCommentVNode(" \u7ECF\u505C\u7AD9\u663E\u793A "),
                      vue.createVNode(_component_tui_dropdown_list, {
                        class: "start-station",
                        show: item.stopStationShow,
                        top: 94,
                        height: 400
                      }, {
                        selectionbox: vue.withCtx(() => [
                          vue.createVNode(_component_tui_button, {
                            type: "white",
                            shape: "circle",
                            width: "120rpx",
                            height: "60rpx",
                            margin: "20rpx",
                            onClick: ($event) => $options.dropDownStopList(index)
                          }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("i", { class: "iconfont icon-exchange" }),
                              vue.createElementVNode("view", {
                                class: vue.normalizeClass(["tui-animation", [item.stopStationShow ? "tui-animation-show" : ""]])
                              }, [
                                vue.createVNode(_component_tui_icon, {
                                  name: "turningdown",
                                  size: 20
                                })
                              ], 2)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ]),
                        dropdownbox: vue.withCtx(() => [
                          vue.createElementVNode("view", { class: "tui-selected-list" }, [
                            vue.createElementVNode("scroll-view", {
                              "scroll-y": "",
                              class: "tui-dropdown-scroll"
                            }, [
                              item.stopStation == "" ? (vue.openBlock(), vue.createBlock(_component_tui_list_cell, {
                                key: 0,
                                padding: "0",
                                unlined: item.stopStation.length - 1 == index
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createElementVNode("view", { class: "tui-cell-class" }, [
                                    vue.createElementVNode("text", { class: "tui-ml-20" }, "\u6682\u65E0\u7ECF\u505C\u7AD9")
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["unlined"])) : (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList(item.stopStation, (index2) => {
                                return vue.openBlock(), vue.createBlock(_component_tui_list_cell, {
                                  key: index2,
                                  padding: "0",
                                  unlined: item.stopStation.length - 1 == index2
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createElementVNode("view", { class: "tui-cell-class" }, [
                                      vue.createElementVNode("text", { class: "tui-ml-20" }, vue.toDisplayString(index2), 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["unlined"]);
                              }), 128))
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["show"]),
                      vue.createCommentVNode(" \u7EC8\u70B9\u7AD9 "),
                      vue.createElementVNode("view", { class: "title-outline" }, [
                        vue.createElementVNode("text", { class: "card-title" }, vue.toDisplayString(item.endLocation), 1),
                        vue.createElementVNode("text", { class: "card-sub-title sub-title-size" }, vue.toDisplayString(item.endStation), 1)
                      ])
                    ]),
                    vue.createCommentVNode(" \u5206\u5272\u7EBF "),
                    vue.createVNode(_component_tui_divider, {
                      width: "90%",
                      height: 20,
                      gradual: ""
                    }),
                    vue.createCommentVNode(" \u5176\u4ED6\u4FE1\u606F "),
                    vue.createElementVNode("view", { class: "card-flex card-info" }, [
                      vue.createVNode(_component_tui_tag, {
                        class: "card-bus-tag",
                        type: "light-blue",
                        shape: "square",
                        plain: ""
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("\u8F66\u8F86ID\uFF1A" + vue.toDisplayString(item.busId), 1)
                        ]),
                        _: 2
                      }, 1024),
                      vue.createElementVNode("view", { class: "card-blank" }),
                      vue.createVNode(_component_tui_tag, {
                        type: "light-green",
                        shape: "square",
                        padding: "10rpx 20rpx"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("\u4F59\u7968\uFF1A" + vue.toDisplayString(item.ticket) + " \u5F20", 1)
                        ]),
                        _: 2
                      }, 1024)
                    ])
                  ], 8, ["onClick"])
                ]),
                _: 2
              }, 1024);
            }), 128))
          ]),
          _: 1
        })) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" tabbar "),
        vue.createVNode(_component_tui_tabbar, {
          isFixed: true,
          tabBar: $data.tabBar,
          hump: "",
          current: $data.current,
          onClick: $options.tabbarSwitch
        }, null, 8, ["tabBar", "current", "onClick"])
      ])
    ], 2112);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/pages/index/index.vue"]]);
  const _sfc_main$8 = {};
  function _sfc_render$7(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("text", null, "change_my");
  }
  const PagesMyChange_my = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/pages/my/change_my.vue"]]);
  const attrs = [
    "titleIcon",
    "titleIconRadius",
    "subtitleText",
    "subtitleSize",
    "subtitleColor",
    "subtitleOverflow",
    "titleAlign",
    "backgroundImage",
    "backgroundRepeat",
    "blurEffect"
  ];
  const _sfc_main$7 = {
    props: {
      title: {
        type: String,
        default: ""
      },
      titleIcon: {
        type: String,
        default: ""
      },
      titleIconRadius: {
        type: String,
        default: ""
      },
      subtitleText: {
        type: String,
        default: ""
      },
      subtitleSize: {
        type: String,
        default: ""
      },
      subtitleColor: {
        type: String,
        default: ""
      },
      subtitleOverflow: {
        type: String,
        default: ""
      },
      titleAlign: {
        type: String,
        default: ""
      },
      backgroundImage: {
        type: String,
        default: ""
      },
      backgroundRepeat: {
        type: String,
        default: ""
      },
      blurEffect: {
        type: String,
        default: ""
      },
      loading: {
        type: Boolean,
        default: false
      },
      frontColor: {
        type: String,
        default: "#ffffff"
      },
      backgroundColor: {
        type: String,
        default: "#000000"
      },
      colorAnimationDuration: {
        type: Number,
        default: 0
      },
      colorAnimationTimingFunc: {
        type: String,
        default: "linear"
      }
    },
    created() {
      const pages = getCurrentPages();
      const page = pages[pages.length - 1];
      this.__$page = page;
      this.$watch("title", () => {
        this.setNavigationBarTitle();
      });
      this.$watch("loading", () => {
        this.setNavigationBarLoading();
      });
      this.$watch(
        () => [
          this.frontColor,
          this.backgroundColor,
          this.colorAnimationDuration,
          this.colorAnimationTimingFunc
        ],
        () => {
          this.setNavigationBarColor();
        }
      );
      this.__$webview = page.$getAppWebview();
      attrs.forEach((key) => {
        const titleNView = {};
        if (this[key] || this[key].length > 0) {
          titleNView[key] = this[key];
        }
        this.setTitleNView(titleNView);
        this.$watch(key, (val) => {
          const titleStyle = {};
          titleStyle[key] = val;
          this.setTitleNView(titleStyle);
        });
      });
    },
    beforeMount() {
      this.title && this.setNavigationBarTitle();
      this.setNavigationBarLoading();
      this.setNavigationBarColor();
    },
    methods: {
      setNavigationBarTitle() {
        uni.setNavigationBarTitle({
          __page__: this.__$page,
          title: this.title
        });
      },
      setNavigationBarLoading() {
        uni[(this.loading ? "show" : "hide") + "NavigationBarLoading"]({
          __page__: this.__$page
        });
      },
      setNavigationBarColor() {
        uni.setNavigationBarColor({
          __page__: this.__$page,
          frontColor: this.frontColor,
          backgroundColor: this.backgroundColor,
          animation: {
            duration: this.colorAnimationDuration,
            timingFunc: this.colorAnimationTimingFunc
          }
        });
      },
      setTitleNView(titleNView) {
        const webview = this.__$webview;
        const style = webview.getStyle();
        if (style && style.titleNView) {
          webview.setStyle({
            titleNView
          });
        }
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { style: { "display": "none" } });
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__file", "/Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli-vite/node_modules/@dcloudio/uni-components/lib/navigation-bar/navigation-bar.vue"]]);
  const _sfc_main$6 = {
    data() {
      return {
        current: 2,
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
    onLoad() {
    },
    methods: {
      tabbarSwitch(e) {
        formatAppLog("log", "at pages/my/my.vue:51", e);
        uni.switchTab({
          url: e.pagePath
        });
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navigation_bar = resolveEasycom(vue.resolveDynamicComponent("navigation-bar"), __easycom_0);
    const _component_tui_tabbar = resolveEasycom(vue.resolveDynamicComponent("tui-tabbar"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(" \u9875\u9762 "),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createVNode(_component_navigation_bar, { title: 123 }),
        vue.createElementVNode("text", null, "\u8FD9\u662Fmy.vue"),
        vue.createCommentVNode(" tabbar "),
        vue.createVNode(_component_tui_tabbar, {
          isFixed: true,
          tabBar: $data.tabBar,
          hump: "",
          current: $data.current,
          onClick: $options.tabbarSwitch
        }, null, 8, ["tabBar", "current", "onClick"])
      ])
    ], 2112);
  }
  const PagesMyMy = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/pages/my/my.vue"]]);
  const _sfc_main$5 = {
    name: "tuiCountdown",
    emits: ["end", "time"],
    props: {
      width: {
        type: Number,
        default: 32
      },
      height: {
        type: Number,
        default: 32
      },
      borderColor: {
        type: String,
        default: "#333"
      },
      backgroundColor: {
        type: String,
        default: "#fff"
      },
      size: {
        type: Number,
        default: 24
      },
      color: {
        type: String,
        default: "#333"
      },
      scale: {
        type: Boolean,
        default: false
      },
      colonSize: {
        type: Number,
        default: 28
      },
      colonColor: {
        type: String,
        default: "#333"
      },
      time: {
        type: [Number, String],
        default: 0
      },
      days: {
        type: Boolean,
        default: false
      },
      hours: {
        type: Boolean,
        default: true
      },
      minutes: {
        type: Boolean,
        default: true
      },
      seconds: {
        type: Boolean,
        default: true
      },
      unitEn: {
        type: Boolean,
        default: false
      },
      isColon: {
        type: Boolean,
        default: true
      },
      returnTime: {
        type: Boolean,
        default: false
      },
      isMs: {
        type: Boolean,
        default: false
      },
      msWidth: {
        type: Number,
        default: 32
      },
      msSize: {
        type: Number,
        default: 24
      },
      msColor: {
        type: String,
        default: "#333"
      }
    },
    watch: {
      time(val) {
        this.clearTimer();
        this.doLoop();
      }
    },
    data() {
      return {
        countdown: null,
        d: "0",
        h: "00",
        i: "00",
        s: "00",
        ms: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        ani: false
      };
    },
    created() {
      this.clearTimer();
      let seconds = Number(this.time || 0);
      if (seconds > 0) {
        this.doLoop();
      }
    },
    beforeUnmount() {
      this.clearTimer();
    },
    methods: {
      getWidth: function(num, width) {
        return num > 99 ? width / 2 * num.toString().length : width;
      },
      clearTimer() {
        clearInterval(this.countdown);
        this.countdown = null;
      },
      endOfTime(isStop = false) {
        this.ani = false;
        this.clearTimer();
        if (!isStop) {
          this.$emit("end", {});
        }
      },
      doLoop: function() {
        let seconds = Number(this.time || 0);
        this.ani = true;
        this.countDown(seconds);
        this.countdown = setInterval(() => {
          seconds--;
          if (seconds < 0) {
            this.endOfTime();
            return;
          }
          this.countDown(seconds);
          if (this.returnTime) {
            this.$emit("time", {
              seconds
            });
          }
        }, 1e3);
      },
      countDown(seconds) {
        let [day, hour, minute, second] = [0, 0, 0, 0];
        if (seconds > 0) {
          day = this.days ? Math.floor(seconds / (60 * 60 * 24)) : 0;
          hour = this.hours ? Math.floor(seconds / (60 * 60)) - day * 24 : 0;
          minute = this.minutes ? Math.floor(seconds / 60) - hour * 60 - day * 24 * 60 : 0;
          second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
        }
        hour = hour < 10 ? "0" + hour : hour;
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        this.d = day;
        this.h = hour;
        this.i = minute;
        this.s = second;
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "tui-countdown-box" }, [
      $props.days ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "tui-countdown-item",
        style: vue.normalizeStyle({ background: $props.backgroundColor, borderColor: $props.borderColor, width: $options.getWidth($data.d, $props.width) + "rpx", height: $props.height + "rpx" })
      }, [
        vue.createElementVNode("view", {
          class: vue.normalizeClass(["tui-countdown-time", [$props.scale ? "tui-countdown-scale" : ""]]),
          style: vue.normalizeStyle({ fontSize: $props.size + "rpx", color: $props.color, lineHeight: $props.size + "rpx" })
        }, vue.toDisplayString($data.d), 7)
      ], 4)) : vue.createCommentVNode("v-if", true),
      $props.days ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: vue.normalizeClass(["tui-countdown-colon", { "tui-colon-pad": $props.borderColor == "transparent" }]),
        style: vue.normalizeStyle({ lineHeight: $props.colonSize + "rpx", fontSize: $props.colonSize + "rpx", color: $props.colonColor })
      }, vue.toDisplayString($props.isColon ? ":" : "\u5929"), 7)) : vue.createCommentVNode("v-if", true),
      $props.hours ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "tui-countdown-item",
        style: vue.normalizeStyle({ background: $props.backgroundColor, borderColor: $props.borderColor, width: $options.getWidth($data.h, $props.width) + "rpx", height: $props.height + "rpx" })
      }, [
        vue.createElementVNode("view", {
          class: vue.normalizeClass(["tui-countdown-time", [$props.scale ? "tui-countdown-scale" : ""]]),
          style: vue.normalizeStyle({ fontSize: $props.size + "rpx", color: $props.color, lineHeight: $props.size + "rpx" })
        }, vue.toDisplayString($data.h), 7)
      ], 4)) : vue.createCommentVNode("v-if", true),
      $props.hours ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 3,
        class: vue.normalizeClass(["tui-countdown-colon", { "tui-colon-pad": $props.borderColor == "transparent" }]),
        style: vue.normalizeStyle({ lineHeight: $props.colonSize + "rpx", fontSize: $props.colonSize + "rpx", color: $props.colonColor })
      }, vue.toDisplayString($props.isColon ? ":" : "\u65F6"), 7)) : vue.createCommentVNode("v-if", true),
      $props.minutes ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 4,
        class: "tui-countdown-item",
        style: vue.normalizeStyle({ background: $props.backgroundColor, borderColor: $props.borderColor, width: $options.getWidth($data.i, $props.width) + "rpx", height: $props.height + "rpx" })
      }, [
        vue.createElementVNode("view", {
          class: vue.normalizeClass(["tui-countdown-time", [$props.scale ? "tui-countdown-scale" : ""]]),
          style: vue.normalizeStyle({ fontSize: $props.size + "rpx", color: $props.color, lineHeight: $props.size + "rpx" })
        }, vue.toDisplayString($data.i), 7)
      ], 4)) : vue.createCommentVNode("v-if", true),
      $props.minutes ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 5,
        class: vue.normalizeClass(["tui-countdown-colon", { "tui-colon-pad": $props.borderColor == "transparent" }]),
        style: vue.normalizeStyle({ lineHeight: $props.colonSize + "rpx", fontSize: $props.colonSize + "rpx", color: $props.colonColor })
      }, vue.toDisplayString($props.isColon ? ":" : "\u5206"), 7)) : vue.createCommentVNode("v-if", true),
      $props.seconds ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 6,
        class: "tui-countdown-item",
        style: vue.normalizeStyle({ background: $props.backgroundColor, borderColor: $props.borderColor, width: $options.getWidth($data.s, $props.width) + "rpx", height: $props.height + "rpx" })
      }, [
        vue.createElementVNode("view", {
          class: vue.normalizeClass(["tui-countdown-time", [$props.scale ? "tui-countdown-scale" : ""]]),
          style: vue.normalizeStyle({ fontSize: $props.size + "rpx", color: $props.color, lineHeight: $props.size + "rpx" })
        }, vue.toDisplayString($data.s), 7)
      ], 4)) : vue.createCommentVNode("v-if", true),
      $props.seconds && !$props.isColon ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 7,
        class: vue.normalizeClass(["tui-countdown-colon", { "tui-colon-pad": $props.borderColor == "transparent" }]),
        style: vue.normalizeStyle({ lineHeight: $props.colonSize + "rpx", fontSize: $props.colonSize + "rpx", color: $props.colonColor })
      }, vue.toDisplayString($props.unitEn ? "s" : "\u79D2"), 7)) : vue.createCommentVNode("v-if", true),
      $props.seconds && $props.isMs && $props.isColon ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 8,
        class: "tui-countdown-colon",
        style: vue.normalizeStyle({ lineHeight: $props.colonSize + "rpx", fontSize: $props.colonSize + "rpx", color: $props.colonColor })
      }, ".", 4)) : vue.createCommentVNode("v-if", true),
      $props.seconds && $props.isMs ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 9,
        class: "tui-countdown__ms",
        style: vue.normalizeStyle({
          background: $props.backgroundColor,
          borderColor: $props.borderColor,
          fontSize: $props.msSize + "rpx",
          color: $props.msColor,
          height: $props.height + "rpx",
          width: $props.msWidth > 0 ? $props.msWidth + "rpx" : "auto"
        })
      }, [
        vue.createElementVNode("view", {
          class: vue.normalizeClass({ "tui-ms__list": $data.ani })
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.ms, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "tui-ms__item",
              style: vue.normalizeStyle({ height: $props.height + "rpx" }),
              key: index
            }, [
              vue.createElementVNode("view", {
                class: vue.normalizeClass([$props.scale ? "tui-countdown-scale" : ""])
              }, vue.toDisplayString(item), 3)
            ], 4);
          }), 128))
        ], 2)
      ], 4)) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-7a2d6973"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-countdown/tui-countdown.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {
        top: 0,
        countdownm: "",
        countdowns: "",
        timer: null,
        animation: false,
        query: {
          mode: "id",
          options: "1596140446891089922",
          pageIndex: 1,
          pageSize: 10
        },
        orderDataRes: []
      };
    },
    methods: {
      getOrderData() {
        getDataParam(this.query, "/order/queryOrderAssociated").then((res) => {
          formatAppLog("log", "at pages/ticket/out_ticket.vue:116", res);
          this.orderDataRes = res.data;
          formatAppLog("log", "at pages/ticket/out_ticket.vue:118", this.orderDataRes);
          this.pageTotal = res.pageTotal || 10;
          this.setTime();
        });
      },
      navigateBack() {
        uni.navigateBack();
      },
      setTime() {
        var nowtime = new Date();
        var endtime = this.orderDataRes[0].orderTime.replace(/-/g, "/");
        endtime = new Date(endtime);
        var lefttime = (endtime.getTime() - nowtime.getTime()) / 1e3;
        formatAppLog("log", "at pages/ticket/out_ticket.vue:136", lefttime);
        if (lefttime <= 0) {
          lefttime = 0;
        }
        this.timer = lefttime;
        formatAppLog("log", "at pages/ticket/out_ticket.vue:141", 123);
      },
      showtime() {
        var nowtime = new Date(), endtime = this.orderDataRes[0].orderTime.replace(/-/g, "/");
        endtime = new Date(endtime);
        var lefttime = endtime.getTime() - nowtime.getTime(), leftm = Math.floor(lefttime / (1e3 * 60) % 60) < 10 ? "0" + Math.floor(lefttime / (1e3 * 60) % 60) : Math.floor(lefttime / (1e3 * 60) % 60), lefts = Math.floor(lefttime / 1e3 % 60) < 10 ? "0" + Math.floor(lefttime / 1e3 % 60) : Math.floor(lefttime / 1e3 % 60);
        this.countdownm = leftm;
        this.countdowns = lefts;
        if (lefttime < 0) {
          this.countdownh = this.countdownm = this.countdowns = "00";
        }
      },
      detail(e) {
        this.tui.toast("\u8BE6\u60C5\u529F\u80FD\u5C1A\u672A\u5B8C\u5584~");
      },
      commit() {
        uni.switchTab({
          url: "/pages/index/index"
        });
      }
    },
    onLoad(e) {
      this.query.options = e.orderId;
      this.getOrderData();
      setTimeout(() => {
        this.animation = true;
      }, 600);
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tui_icon = resolveEasycom(vue.resolveDynamicComponent("tui-icon"), __easycom_0$2);
    const _component_tui_countdown = resolveEasycom(vue.resolveDynamicComponent("tui-countdown"), __easycom_1);
    const _component_tui_navigation_bar = resolveEasycom(vue.resolveDynamicComponent("tui-navigation-bar"), __easycom_1$3);
    const _component_tui_divider = resolveEasycom(vue.resolveDynamicComponent("tui-divider"), __easycom_0$1);
    const _component_tui_tag = resolveEasycom(vue.resolveDynamicComponent("tui-tag"), __easycom_1$2);
    const _component_tui_button = resolveEasycom(vue.resolveDynamicComponent("tui-button"), __easycom_3$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5BFC\u822A\u680F "),
      vue.createVNode(_component_tui_navigation_bar, {
        isOpacity: false,
        title: "\u786E\u8BA4\u8BA2\u5355",
        backgroundColor: "#5677fc",
        color: "#f1f1f1"
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "header-box" }, [
            vue.createVNode(_component_tui_icon, {
              name: "arrowleft",
              color: "#fff",
              onClick: $options.navigateBack
            }, null, 8, ["onClick"]),
            vue.createElementVNode("view", { class: "timing-box" }, [
              vue.createVNode(_component_tui_icon, {
                name: "alarm",
                color: "#fff",
                size: 22
              }),
              vue.createVNode(_component_tui_countdown, {
                time: $data.timer,
                color: "#fff",
                borderColor: "#5677fc",
                colonColor: "#fff",
                backgroundColor: "#5677fc",
                size: 30,
                hours: false,
                scale: true
              }, null, 8, ["time"])
            ])
          ])
        ]),
        _: 1
      }),
      vue.createCommentVNode(" tips "),
      vue.createElementVNode("view", { class: "tui-notice-board" }, [
        vue.createElementVNode("view", { class: "tui-icon-bg" }, [
          vue.createVNode(_component_tui_icon, {
            name: "news-fill",
            size: 24,
            color: "#f54f46"
          })
        ]),
        vue.createElementVNode("view", {
          class: "tui-scorll-view",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.detail && $options.detail(...args))
        }, [
          vue.createElementVNode("view", {
            class: vue.normalizeClass(["tui-notice", [$data.animation ? "tui-animation" : ""]])
          }, "\u8BA2\u5355\u5C06\u5728\u4E0B\u5355\u540E10\u5206\u949F\u81EA\u52A8\u5173\u95ED\uFF0C\u8BF7\u5C3D\u5FEB\u786E\u5B9A", 2)
        ])
      ]),
      vue.createCommentVNode(" \u7AD9\u70B9\u663E\u793A "),
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.orderDataRes, (item) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "card" }, [
          vue.createElementVNode("view", { class: "card-flex card-station" }, [
            vue.createCommentVNode(" \u59CB\u53D1\u7AD9 "),
            vue.createElementVNode("view", { class: "title-outline" }, [
              vue.createElementVNode("text", { class: "card-title" }, vue.toDisplayString(item.startLocation), 1),
              vue.createElementVNode("text", { class: "card-sub-title sub-title-size" }, vue.toDisplayString(item.startStation), 1)
            ]),
            vue.createCommentVNode(" \u7ECF\u505C\u7AD9\u663E\u793A "),
            vue.createElementVNode("text", { class: "card-title" }, "\u53D1\u5F80"),
            vue.createCommentVNode(" \u7EC8\u70B9\u7AD9 "),
            vue.createElementVNode("view", { class: "title-outline" }, [
              vue.createElementVNode("text", { class: "card-title" }, vue.toDisplayString(item.endLocation), 1),
              vue.createElementVNode("text", { class: "card-sub-title sub-title-size" }, vue.toDisplayString(item.endStation), 1)
            ])
          ]),
          vue.createCommentVNode(" \u5206\u5272\u7EBF "),
          vue.createVNode(_component_tui_divider, {
            width: "90%",
            height: 20,
            gradual: ""
          }),
          vue.createCommentVNode(" \u5176\u4ED6\u4FE1\u606F "),
          vue.createElementVNode("view", { class: "card-flex card-info" }, [
            vue.createCommentVNode(" \u65F6\u95F4\u4FE1\u606F "),
            vue.createVNode(_component_tui_tag, {
              class: "card-bus-tag",
              shape: "square"
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("\u5EA7\u4F4D\u53F7\uFF1A" + vue.toDisplayString(item.seatInfo), 1)
              ]),
              _: 2
            }, 1024),
            vue.createCommentVNode(" \u8F66\u8F86ID "),
            vue.createVNode(_component_tui_tag, {
              class: "card-bus-tag",
              shape: "square"
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("\u8F66\u8F86\uFF1A" + vue.toDisplayString(item.busName), 1)
              ]),
              _: 2
            }, 1024)
          ]),
          vue.createElementVNode("view", { class: "card-flex card-info" }, [
            vue.createVNode(_component_tui_tag, {
              class: "card-time-tag",
              type: "light-blue",
              margin: "20rpx 220rpx",
              shape: "square"
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("2023\u5E7411\u670824\u65E5 " + vue.toDisplayString(item.startTime) + "\u53D1\u51FA", 1)
              ]),
              _: 2
            }, 1024)
          ])
        ]);
      }), 256)),
      vue.createElementVNode("view", { class: "tips-panel" }, [
        vue.createElementVNode("view", { class: "title" }, [
          vue.createElementVNode("text", null, "\u8D2D\u7968\u987B\u77E5")
        ]),
        vue.createElementVNode("view", { class: "body" }, [
          vue.createElementVNode("text", { class: "body-font" }, [
            vue.createTextVNode("1.\u8BF7\u786E\u8BA4\u8F66\u8F86\u548C\u65F6\u95F4\u65E0\u8BEF\uFF0C\u8D2D\u4E70\u6210\u529F\u540E\u4E0D\u4E88\u9000\u8FD8\u3002"),
            vue.createElementVNode("br")
          ]),
          vue.createElementVNode("text", { class: "body-font" }, [
            vue.createTextVNode("2.\u5982\u5B58\u5728\u5929\u6C14\u7B49\u4E0D\u786E\u5B9A\u56E0\u7D20\uFF0C\u8BF7\u4EE5\u5B9E\u9645\u60C5\u51B5\u4E3A\u4E3B\u3002"),
            vue.createElementVNode("br")
          ]),
          vue.createElementVNode("text", { class: "body-font" }, [
            vue.createTextVNode("3.\u8D2D\u7968\u6210\u529F\u540E\uFF0C\u53EF\u4EE5\u5728\u4E2A\u4EBA\u9875\u9762\u8FDB\u884C\u67E5\u770B\uFF0C\u4E5F\u53EF\u4EE5\u5728\u5E95\u90E8\u5BFC\u822A\u680F\u627E\u5230\u51FA\u7968\u7A97\u53E3\u3002"),
            vue.createElementVNode("br")
          ]),
          vue.createElementVNode("text", { class: "body-font" }, [
            vue.createTextVNode("4.\u8BF7\u5728\u4E0B\u8BA2\u535510\u5206\u949F\u5185\u5C3D\u5FEB\u786E\u5B9A\uFF0C\u5426\u5219\u8BA2\u5355\u5C06\u5931\u6548\u3002"),
            vue.createElementVNode("br")
          ]),
          vue.createElementVNode("text", { class: "body-font" }, [
            vue.createTextVNode("5.\u4E0B\u5355\u5373\u4EE3\u8868\u4F60\u8BA4\u540C\u6211\u4EEC\u7684\u670D\u52A1\u6761\u6B3E\u3002"),
            vue.createElementVNode("br")
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "person-panel" }, [
        vue.createElementVNode("view", { class: "title" }, [
          vue.createElementVNode("text", null, "\u60A8\u7684\u4FE1\u606F")
        ]),
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.orderDataRes, (item) => {
          return vue.openBlock(), vue.createElementBlock("view", { class: "body" }, [
            vue.createElementVNode("view", { class: "body-item" }, [
              vue.createVNode(_component_tui_tag, {
                padding: "4rpx 10rpx",
                size: "24rpx",
                plain: ""
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("\u5B66\u5DE5\u53F7")
                ]),
                _: 1
              }),
              vue.createElementVNode("text", { class: "body-font" }, [
                vue.createTextVNode(" : " + vue.toDisplayString(item.workId), 1),
                vue.createElementVNode("br")
              ])
            ]),
            vue.createElementVNode("view", { class: "body-item" }, [
              vue.createVNode(_component_tui_tag, {
                padding: "8rpx 22rpx",
                size: "24rpx",
                plain: ""
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("\u7535\u8BDD")
                ]),
                _: 1
              }),
              vue.createElementVNode("text", { class: "body-font" }, [
                vue.createTextVNode(" : " + vue.toDisplayString(item.phone), 1),
                vue.createElementVNode("br")
              ])
            ])
          ]);
        }), 256))
      ]),
      vue.createCommentVNode(" \u64CD\u4F5C\u9762\u677F "),
      vue.createElementVNode("view", { class: "button-bar" }, [
        vue.createVNode(_component_tui_button, {
          onClick: _cache[1] || (_cache[1] = ($event) => $options.commit())
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode("\u786E\u8BA4\u8BA2\u5355")
          ]),
          _: 1
        })
      ])
    ]);
  }
  const PagesTicketOut_ticket = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/pages/ticket/out_ticket.vue"]]);
  const _sfc_main$3 = {
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
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["tui-footer-class tui-footer", [$props.fixed ? "tui-fixed" : ""]]),
      style: vue.normalizeStyle({ backgroundColor: $props.backgroundColor })
    }, [
      $props.navigate.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "tui-footer-link"
      }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.navigate, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("navigator", {
            key: index,
            class: "tui-link",
            "hover-class": "tui-link-hover",
            "hover-stop-propagation": true,
            style: vue.normalizeStyle({ color: item.color || "#596d96", fontSize: (item.size || 28) + "rpx" }),
            "open-type": item.type,
            url: item.url,
            target: item.target,
            delta: item.delta,
            "app-id": item.appid,
            path: item.path,
            "extra-data": item.extradata,
            bindsuccess: item.bindsuccess,
            bindfail: item.bindfail
          }, vue.toDisplayString(item.text), 13, ["open-type", "url", "target", "delta", "app-id", "path", "extra-data", "bindsuccess", "bindfail"]);
        }), 128))
      ])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", {
        class: "tui-footer-copyright",
        style: vue.normalizeStyle({ color: $props.color, fontSize: $props.size + "rpx" })
      }, vue.toDisplayString($props.copyright), 5)
    ], 6);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-9bc96340"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-footer/tui-footer.vue"]]);
  const _imports_0 = "/static/images/seat/seat_blank.png";
  const _imports_1 = "/static/images/seat/seat_select.png";
  const _imports_2 = "/static/images/seat/seat_selected.png";
  const _sfc_main$2 = {
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
        getDataParam(this.query, "/schedule/queryScheduleAssociated").then((res) => {
          formatAppLog("log", "at pages/ticket/pick_ticket.vue:132", res);
          this.scheduleDataRes = res.data;
          formatAppLog("log", "at pages/ticket/pick_ticket.vue:134", this.scheduleDataRes);
          this.pageTotal = res.pageTotal || 10;
        });
      },
      insertOrder() {
        insertData(this.order, "/order/createOrder").then((res) => {
          formatAppLog("log", "at pages/ticket/pick_ticket.vue:141", res);
          this.orderId = res.data;
          uni.navigateTo({
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
          uni.showToast({
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
        formatAppLog("log", "at pages/ticket/pick_ticket.vue:177", this.showTime());
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
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tui_divider = resolveEasycom(vue.resolveDynamicComponent("tui-divider"), __easycom_0$1);
    const _component_tui_tag = resolveEasycom(vue.resolveDynamicComponent("tui-tag"), __easycom_1$2);
    const _component_tui_footer = resolveEasycom(vue.resolveDynamicComponent("tui-footer"), __easycom_2);
    const _component_tui_button = resolveEasycom(vue.resolveDynamicComponent("tui-button"), __easycom_3$1);
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(" \u9875\u9762 "),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createCommentVNode(" \u7AD9\u70B9\u663E\u793A "),
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.scheduleDataRes, (item) => {
          return vue.openBlock(), vue.createElementBlock("view", { class: "card" }, [
            vue.createElementVNode("view", { class: "card-flex card-station" }, [
              vue.createCommentVNode(" \u59CB\u53D1\u7AD9 "),
              vue.createElementVNode("view", { class: "title-outline" }, [
                vue.createElementVNode("text", { class: "card-title" }, vue.toDisplayString(item.startLocation), 1),
                vue.createElementVNode("text", { class: "card-sub-title sub-title-size" }, vue.toDisplayString(item.startStation), 1)
              ]),
              vue.createCommentVNode(" \u7ECF\u505C\u7AD9\u663E\u793A "),
              vue.createElementVNode("text", { class: "card-title" }, "\u53D1\u5F80"),
              vue.createCommentVNode(" \u7EC8\u70B9\u7AD9 "),
              vue.createElementVNode("view", { class: "title-outline" }, [
                vue.createElementVNode("text", { class: "card-title" }, vue.toDisplayString(item.endLocation), 1),
                vue.createElementVNode("text", { class: "card-sub-title sub-title-size" }, vue.toDisplayString(item.endStation), 1)
              ])
            ]),
            vue.createCommentVNode(" \u5206\u5272\u7EBF "),
            vue.createVNode(_component_tui_divider, {
              width: "90%",
              height: 20,
              gradual: ""
            }),
            vue.createCommentVNode(" \u5176\u4ED6\u4FE1\u606F "),
            vue.createElementVNode("view", { class: "card-flex card-info" }, [
              vue.createCommentVNode(" \u65F6\u95F4\u4FE1\u606F "),
              vue.createVNode(_component_tui_tag, {
                class: "card-time-tag",
                type: "light-blue",
                shape: "square"
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("2023\u5E7411\u670824\u65E5 " + vue.toDisplayString(item.startTime) + "\u53D1\u51FA", 1)
                ]),
                _: 2
              }, 1024),
              vue.createCommentVNode(" \u8F66\u8F86ID "),
              vue.createVNode(_component_tui_tag, {
                class: "card-bus-tag",
                type: "light-blue",
                shape: "square",
                plain: ""
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("\u8F66\u8F86\uFF1A" + vue.toDisplayString(item.busName), 1)
                ]),
                _: 2
              }, 1024)
            ])
          ]);
        }), 256)),
        vue.createCommentVNode(" \u63D0\u793A\u4FE1\u606F "),
        vue.createElementVNode("view", { class: "ticket-info" }, [
          vue.createElementVNode("img", {
            class: "ticket-info-seat",
            src: _imports_0
          }),
          vue.createElementVNode("text", { class: "ticket-info-font" }, "\u53EF\u9009"),
          vue.createElementVNode("img", {
            class: "ticket-info-seat",
            src: _imports_1
          }),
          vue.createElementVNode("text", { class: "ticket-info-font" }, "\u5DF2\u9009"),
          vue.createElementVNode("img", {
            class: "ticket-info-seat",
            src: _imports_2
          }),
          vue.createElementVNode("text", { class: "ticket-info-font" }, "\u4E0D\u53EF\u9009")
        ]),
        vue.createCommentVNode(" \u9009\u5EA7\u9762\u677F "),
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.scheduleDataRes, (bus) => {
          return vue.openBlock(), vue.createElementBlock("view", { class: "seat-panel" }, [
            vue.createCommentVNode(" \u5DE6\u5217\u6392\u53F7 "),
            vue.createElementVNode("view", { class: "column-container" }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(bus.busColumns, (col, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "info-font"
                }, vue.toDisplayString(col), 1);
              }), 128))
            ]),
            vue.createCommentVNode(" \u53F3\u4FA7 "),
            vue.createElementVNode("view", { class: "right-container" }, [
              vue.createCommentVNode(" \u8F66\u8F86\u524D\u65B9 "),
              vue.createElementVNode("view", { class: "bus-info" }, [
                vue.createElementVNode("text", { class: "bus-info-font" }, "\u8F66\u8F86\u524D\u65B9")
              ]),
              vue.createCommentVNode(" \u8F66\u8F86\u5185\u90E8 "),
              $data.seatShow ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "seat-container"
              }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.seatIJ, (itemI, indexI) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: indexI,
                    class: "seat-row"
                  }, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(itemI, (itemJ, indexJ) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        key: indexJ,
                        class: "seat-column"
                      }, [
                        indexJ == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "blank"
                        })) : vue.createCommentVNode("v-if", true),
                        itemJ == 0 ? (vue.openBlock(), vue.createElementBlock("img", {
                          key: 1,
                          onClick: ($event) => $options.selectSeat(indexI, indexJ),
                          class: "seat-img",
                          src: _imports_0
                        }, null, 8, ["onClick"])) : itemJ == 1 ? (vue.openBlock(), vue.createElementBlock("img", {
                          key: 2,
                          onClick: ($event) => $options.deleteSeat(indexI, indexJ),
                          class: "seat-img",
                          src: _imports_1
                        }, null, 8, ["onClick"])) : itemJ == 2 ? (vue.openBlock(), vue.createElementBlock("img", {
                          key: 3,
                          class: "seat-img",
                          src: _imports_2
                        })) : vue.createCommentVNode("v-if", true)
                      ]);
                    }), 128))
                  ]);
                }), 128))
              ])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" \u8F66\u8F86\u540E\u65B9 "),
              vue.createElementVNode("view", { class: "bus-info" }, [
                vue.createElementVNode("text", { class: "bus-info-font" }, "\u8F66\u8F86\u524D\u65B9")
              ])
            ])
          ]);
        }), 256)),
        vue.createCommentVNode(" footer "),
        vue.createElementVNode("view", { class: "blank-bar" }),
        vue.createVNode(_component_tui_footer, {
          copyright: "Copyright \xA9 2022-\u81F3\u4ECA Foocode.",
          fixed: false
        }),
        vue.createElementVNode("view", { class: "blank-bar" }),
        vue.createCommentVNode(" \u64CD\u4F5C\u9762\u677F "),
        vue.createElementVNode("view", { class: "button-bar" }, [
          $data.selected ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "select-panel"
          }, [
            vue.createElementVNode("view", { class: "select-panel-title" }, [
              vue.createElementVNode("text", null, vue.toDisplayString($data.column) + "\u6392" + vue.toDisplayString($data.row) + "\u5EA7\u4F4D", 1)
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createVNode(_component_tui_button, {
            disabled: !$data.selected,
            onClick: _cache[0] || (_cache[0] = ($event) => $options.buyTicket())
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("\u8D2D\u7968")
            ]),
            _: 1
          }, 8, ["disabled"])
        ])
      ])
    ], 2112);
  }
  const PagesTicketPick_ticket = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/pages/ticket/pick_ticket.vue"]]);
  var QRCode;
  (function() {
    function _getTypeNumber(sText, nCorrectLevel) {
      var nType = 1;
      var length = _getUTF8Length(sText);
      for (var i2 = 0, len = QRCodeLimitLength.length; i2 <= len; i2++) {
        var nLimit = 0;
        switch (nCorrectLevel) {
          case QRErrorCorrectLevel.L:
            nLimit = QRCodeLimitLength[i2][0];
            break;
          case QRErrorCorrectLevel.M:
            nLimit = QRCodeLimitLength[i2][1];
            break;
          case QRErrorCorrectLevel.Q:
            nLimit = QRCodeLimitLength[i2][2];
            break;
          case QRErrorCorrectLevel.H:
            nLimit = QRCodeLimitLength[i2][3];
            break;
        }
        if (length <= nLimit) {
          break;
        } else {
          nType++;
        }
      }
      if (nType > QRCodeLimitLength.length) {
        throw new Error("Too long data");
      }
      return nType;
    }
    function _getUTF8Length(sText) {
      var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, "a");
      return replacedText.length + (replacedText.length != sText ? 3 : 0);
    }
    function QR8bitByte(data) {
      this.mode = QRMode.MODE_8BIT_BYTE;
      this.data = data;
      this.parsedData = [];
      for (var i2 = 0, l = this.data.length; i2 < l; i2++) {
        var byteArray = [];
        var code = this.data.charCodeAt(i2);
        if (code > 65536) {
          byteArray[0] = 240 | (code & 1835008) >>> 18;
          byteArray[1] = 128 | (code & 258048) >>> 12;
          byteArray[2] = 128 | (code & 4032) >>> 6;
          byteArray[3] = 128 | code & 63;
        } else if (code > 2048) {
          byteArray[0] = 224 | (code & 61440) >>> 12;
          byteArray[1] = 128 | (code & 4032) >>> 6;
          byteArray[2] = 128 | code & 63;
        } else if (code > 128) {
          byteArray[0] = 192 | (code & 1984) >>> 6;
          byteArray[1] = 128 | code & 63;
        } else {
          byteArray[0] = code;
        }
        this.parsedData.push(byteArray);
      }
      this.parsedData = Array.prototype.concat.apply([], this.parsedData);
      if (this.parsedData.length != this.data.length) {
        this.parsedData.unshift(191);
        this.parsedData.unshift(187);
        this.parsedData.unshift(239);
      }
    }
    QR8bitByte.prototype = {
      getLength: function(buffer) {
        return this.parsedData.length;
      },
      write: function(buffer) {
        for (var i2 = 0, l = this.parsedData.length; i2 < l; i2++) {
          buffer.put(this.parsedData[i2], 8);
        }
      }
    };
    function QRCodeModel(typeNumber, errorCorrectLevel) {
      this.typeNumber = typeNumber;
      this.errorCorrectLevel = errorCorrectLevel;
      this.modules = null;
      this.moduleCount = 0;
      this.dataCache = null;
      this.dataList = [];
    }
    QRCodeModel.prototype = {
      addData: function(data) {
        var newData = new QR8bitByte(data);
        this.dataList.push(newData);
        this.dataCache = null;
      },
      isDark: function(row, col) {
        if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
          throw new Error(row + "," + col);
        }
        return this.modules[row][col];
      },
      getModuleCount: function() {
        return this.moduleCount;
      },
      make: function() {
        this.makeImpl(false, this.getBestMaskPattern());
      },
      makeImpl: function(test, maskPattern) {
        this.moduleCount = this.typeNumber * 4 + 17;
        this.modules = new Array(this.moduleCount);
        for (var row = 0; row < this.moduleCount; row++) {
          this.modules[row] = new Array(this.moduleCount);
          for (var col = 0; col < this.moduleCount; col++) {
            this.modules[row][col] = null;
          }
        }
        this.setupPositionProbePattern(0, 0);
        this.setupPositionProbePattern(this.moduleCount - 7, 0);
        this.setupPositionProbePattern(0, this.moduleCount - 7);
        this.setupPositionAdjustPattern();
        this.setupTimingPattern();
        this.setupTypeInfo(test, maskPattern);
        if (this.typeNumber >= 7) {
          this.setupTypeNumber(test);
        }
        if (this.dataCache == null) {
          this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
        }
        this.mapData(this.dataCache, maskPattern);
      },
      setupPositionProbePattern: function(row, col) {
        for (var r = -1; r <= 7; r++) {
          if (row + r <= -1 || this.moduleCount <= row + r)
            continue;
          for (var c = -1; c <= 7; c++) {
            if (col + c <= -1 || this.moduleCount <= col + c)
              continue;
            if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      },
      getBestMaskPattern: function() {
        var minLostPoint = 0;
        var pattern = 0;
        for (var i2 = 0; i2 < 8; i2++) {
          this.makeImpl(true, i2);
          var lostPoint = QRUtil.getLostPoint(this);
          if (i2 == 0 || minLostPoint > lostPoint) {
            minLostPoint = lostPoint;
            pattern = i2;
          }
        }
        return pattern;
      },
      createMovieClip: function(target_mc, instance_name, depth) {
        var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
        var cs = 1;
        this.make();
        for (var row = 0; row < this.modules.length; row++) {
          var y = row * cs;
          for (var col = 0; col < this.modules[row].length; col++) {
            var x = col * cs;
            var dark = this.modules[row][col];
            if (dark) {
              qr_mc.beginFill(0, 100);
              qr_mc.moveTo(x, y);
              qr_mc.lineTo(x + cs, y);
              qr_mc.lineTo(x + cs, y + cs);
              qr_mc.lineTo(x, y + cs);
              qr_mc.endFill();
            }
          }
        }
        return qr_mc;
      },
      setupTimingPattern: function() {
        for (var r = 8; r < this.moduleCount - 8; r++) {
          if (this.modules[r][6] != null) {
            continue;
          }
          this.modules[r][6] = r % 2 == 0;
        }
        for (var c = 8; c < this.moduleCount - 8; c++) {
          if (this.modules[6][c] != null) {
            continue;
          }
          this.modules[6][c] = c % 2 == 0;
        }
      },
      setupPositionAdjustPattern: function() {
        var pos = QRUtil.getPatternPosition(this.typeNumber);
        for (var i2 = 0; i2 < pos.length; i2++) {
          for (var j = 0; j < pos.length; j++) {
            var row = pos[i2];
            var col = pos[j];
            if (this.modules[row][col] != null) {
              continue;
            }
            for (var r = -2; r <= 2; r++) {
              for (var c = -2; c <= 2; c++) {
                if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                  this.modules[row + r][col + c] = true;
                } else {
                  this.modules[row + r][col + c] = false;
                }
              }
            }
          }
        }
      },
      setupTypeNumber: function(test) {
        var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
        for (var i2 = 0; i2 < 18; i2++) {
          var mod = !test && (bits >> i2 & 1) == 1;
          this.modules[Math.floor(i2 / 3)][i2 % 3 + this.moduleCount - 8 - 3] = mod;
        }
        for (var i2 = 0; i2 < 18; i2++) {
          var mod = !test && (bits >> i2 & 1) == 1;
          this.modules[i2 % 3 + this.moduleCount - 8 - 3][Math.floor(i2 / 3)] = mod;
        }
      },
      setupTypeInfo: function(test, maskPattern) {
        var data = this.errorCorrectLevel << 3 | maskPattern;
        var bits = QRUtil.getBCHTypeInfo(data);
        for (var i2 = 0; i2 < 15; i2++) {
          var mod = !test && (bits >> i2 & 1) == 1;
          if (i2 < 6) {
            this.modules[i2][8] = mod;
          } else if (i2 < 8) {
            this.modules[i2 + 1][8] = mod;
          } else {
            this.modules[this.moduleCount - 15 + i2][8] = mod;
          }
        }
        for (var i2 = 0; i2 < 15; i2++) {
          var mod = !test && (bits >> i2 & 1) == 1;
          if (i2 < 8) {
            this.modules[8][this.moduleCount - i2 - 1] = mod;
          } else if (i2 < 9) {
            this.modules[8][15 - i2 - 1 + 1] = mod;
          } else {
            this.modules[8][15 - i2 - 1] = mod;
          }
        }
        this.modules[this.moduleCount - 8][8] = !test;
      },
      mapData: function(data, maskPattern) {
        var inc = -1;
        var row = this.moduleCount - 1;
        var bitIndex = 7;
        var byteIndex = 0;
        for (var col = this.moduleCount - 1; col > 0; col -= 2) {
          if (col == 6)
            col--;
          while (true) {
            for (var c = 0; c < 2; c++) {
              if (this.modules[row][col - c] == null) {
                var dark = false;
                if (byteIndex < data.length) {
                  dark = (data[byteIndex] >>> bitIndex & 1) == 1;
                }
                var mask = QRUtil.getMask(maskPattern, row, col - c);
                if (mask) {
                  dark = !dark;
                }
                this.modules[row][col - c] = dark;
                bitIndex--;
                if (bitIndex == -1) {
                  byteIndex++;
                  bitIndex = 7;
                }
              }
            }
            row += inc;
            if (row < 0 || this.moduleCount <= row) {
              row -= inc;
              inc = -inc;
              break;
            }
          }
        }
      }
    };
    QRCodeModel.PAD0 = 236;
    QRCodeModel.PAD1 = 17;
    QRCodeModel.createData = function(typeNumber, errorCorrectLevel, dataList) {
      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
      var buffer = new QRBitBuffer();
      for (var i2 = 0; i2 < dataList.length; i2++) {
        var data = dataList[i2];
        buffer.put(data.mode, 4);
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
        data.write(buffer);
      }
      var totalDataCount = 0;
      for (var i2 = 0; i2 < rsBlocks.length; i2++) {
        totalDataCount += rsBlocks[i2].dataCount;
      }
      if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
      }
      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
      }
      while (true) {
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(QRCodeModel.PAD0, 8);
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(QRCodeModel.PAD1, 8);
      }
      return QRCodeModel.createBytes(buffer, rsBlocks);
    };
    QRCodeModel.createBytes = function(buffer, rsBlocks) {
      var offset = 0;
      var maxDcCount = 0;
      var maxEcCount = 0;
      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);
      for (var r = 0; r < rsBlocks.length; r++) {
        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;
        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);
        dcdata[r] = new Array(dcCount);
        for (var i2 = 0; i2 < dcdata[r].length; i2++) {
          dcdata[r][i2] = 255 & buffer.buffer[i2 + offset];
        }
        offset += dcCount;
        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i2 = 0; i2 < ecdata[r].length; i2++) {
          var modIndex = i2 + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i2] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
        }
      }
      var totalCodeCount = 0;
      for (var i2 = 0; i2 < rsBlocks.length; i2++) {
        totalCodeCount += rsBlocks[i2].totalCount;
      }
      var data = new Array(totalCodeCount);
      var index = 0;
      for (var i2 = 0; i2 < maxDcCount; i2++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i2 < dcdata[r].length) {
            data[index++] = dcdata[r][i2];
          }
        }
      }
      for (var i2 = 0; i2 < maxEcCount; i2++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i2 < ecdata[r].length) {
            data[index++] = ecdata[r][i2];
          }
        }
      }
      return data;
    };
    var QRMode = { MODE_NUMBER: 1 << 0, MODE_ALPHA_NUM: 1 << 1, MODE_8BIT_BYTE: 1 << 2, MODE_KANJI: 1 << 3 };
    var QRErrorCorrectLevel = { L: 1, M: 0, Q: 3, H: 2 };
    var QRMaskPattern = { PATTERN000: 0, PATTERN001: 1, PATTERN010: 2, PATTERN011: 3, PATTERN100: 4, PATTERN101: 5, PATTERN110: 6, PATTERN111: 7 };
    var QRUtil = {
      PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
      G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
      G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
      G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
      getBCHTypeInfo: function(data) {
        var d = data << 10;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
          d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
        }
        return (data << 10 | d) ^ QRUtil.G15_MASK;
      },
      getBCHTypeNumber: function(data) {
        var d = data << 12;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
          d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
        }
        return data << 12 | d;
      },
      getBCHDigit: function(data) {
        var digit = 0;
        while (data != 0) {
          digit++;
          data >>>= 1;
        }
        return digit;
      },
      getPatternPosition: function(typeNumber) {
        return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
      },
      getMask: function(maskPattern, i2, j) {
        switch (maskPattern) {
          case QRMaskPattern.PATTERN000:
            return (i2 + j) % 2 == 0;
          case QRMaskPattern.PATTERN001:
            return i2 % 2 == 0;
          case QRMaskPattern.PATTERN010:
            return j % 3 == 0;
          case QRMaskPattern.PATTERN011:
            return (i2 + j) % 3 == 0;
          case QRMaskPattern.PATTERN100:
            return (Math.floor(i2 / 2) + Math.floor(j / 3)) % 2 == 0;
          case QRMaskPattern.PATTERN101:
            return i2 * j % 2 + i2 * j % 3 == 0;
          case QRMaskPattern.PATTERN110:
            return (i2 * j % 2 + i2 * j % 3) % 2 == 0;
          case QRMaskPattern.PATTERN111:
            return (i2 * j % 3 + (i2 + j) % 2) % 2 == 0;
          default:
            throw new Error("bad maskPattern:" + maskPattern);
        }
      },
      getErrorCorrectPolynomial: function(errorCorrectLength) {
        var a = new QRPolynomial([1], 0);
        for (var i2 = 0; i2 < errorCorrectLength; i2++) {
          a = a.multiply(new QRPolynomial([1, QRMath.gexp(i2)], 0));
        }
        return a;
      },
      getLengthInBits: function(mode, type) {
        if (1 <= type && type < 10) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 10;
            case QRMode.MODE_ALPHA_NUM:
              return 9;
            case QRMode.MODE_8BIT_BYTE:
              return 8;
            case QRMode.MODE_KANJI:
              return 8;
            default:
              throw new Error("mode:" + mode);
          }
        } else if (type < 27) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 12;
            case QRMode.MODE_ALPHA_NUM:
              return 11;
            case QRMode.MODE_8BIT_BYTE:
              return 16;
            case QRMode.MODE_KANJI:
              return 10;
            default:
              throw new Error("mode:" + mode);
          }
        } else if (type < 41) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 14;
            case QRMode.MODE_ALPHA_NUM:
              return 13;
            case QRMode.MODE_8BIT_BYTE:
              return 16;
            case QRMode.MODE_KANJI:
              return 12;
            default:
              throw new Error("mode:" + mode);
          }
        } else {
          throw new Error("type:" + type);
        }
      },
      getLostPoint: function(qrCode2) {
        var moduleCount = qrCode2.getModuleCount();
        var lostPoint = 0;
        for (var row = 0; row < moduleCount; row++) {
          for (var col = 0; col < moduleCount; col++) {
            var sameCount = 0;
            var dark = qrCode2.isDark(row, col);
            for (var r = -1; r <= 1; r++) {
              if (row + r < 0 || moduleCount <= row + r) {
                continue;
              }
              for (var c = -1; c <= 1; c++) {
                if (col + c < 0 || moduleCount <= col + c) {
                  continue;
                }
                if (r == 0 && c == 0) {
                  continue;
                }
                if (dark == qrCode2.isDark(row + r, col + c)) {
                  sameCount++;
                }
              }
            }
            if (sameCount > 5) {
              lostPoint += 3 + sameCount - 5;
            }
          }
        }
        for (var row = 0; row < moduleCount - 1; row++) {
          for (var col = 0; col < moduleCount - 1; col++) {
            var count = 0;
            if (qrCode2.isDark(row, col))
              count++;
            if (qrCode2.isDark(row + 1, col))
              count++;
            if (qrCode2.isDark(row, col + 1))
              count++;
            if (qrCode2.isDark(row + 1, col + 1))
              count++;
            if (count == 0 || count == 4) {
              lostPoint += 3;
            }
          }
        }
        for (var row = 0; row < moduleCount; row++) {
          for (var col = 0; col < moduleCount - 6; col++) {
            if (qrCode2.isDark(row, col) && !qrCode2.isDark(row, col + 1) && qrCode2.isDark(row, col + 2) && qrCode2.isDark(row, col + 3) && qrCode2.isDark(row, col + 4) && !qrCode2.isDark(row, col + 5) && qrCode2.isDark(row, col + 6)) {
              lostPoint += 40;
            }
          }
        }
        for (var col = 0; col < moduleCount; col++) {
          for (var row = 0; row < moduleCount - 6; row++) {
            if (qrCode2.isDark(row, col) && !qrCode2.isDark(row + 1, col) && qrCode2.isDark(row + 2, col) && qrCode2.isDark(row + 3, col) && qrCode2.isDark(row + 4, col) && !qrCode2.isDark(row + 5, col) && qrCode2.isDark(row + 6, col)) {
              lostPoint += 40;
            }
          }
        }
        var darkCount = 0;
        for (var col = 0; col < moduleCount; col++) {
          for (var row = 0; row < moduleCount; row++) {
            if (qrCode2.isDark(row, col)) {
              darkCount++;
            }
          }
        }
        var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
        lostPoint += ratio * 10;
        return lostPoint;
      }
    };
    var QRMath = {
      glog: function(n) {
        if (n < 1) {
          throw new Error("glog(" + n + ")");
        }
        return QRMath.LOG_TABLE[n];
      },
      gexp: function(n) {
        while (n < 0) {
          n += 255;
        }
        while (n >= 256) {
          n -= 255;
        }
        return QRMath.EXP_TABLE[n];
      },
      EXP_TABLE: new Array(256),
      LOG_TABLE: new Array(256)
    };
    for (var i = 0; i < 8; i++) {
      QRMath.EXP_TABLE[i] = 1 << i;
    }
    for (var i = 8; i < 256; i++) {
      QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
    }
    for (var i = 0; i < 255; i++) {
      QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
    }
    function QRPolynomial(num, shift) {
      if (num.length == void 0) {
        throw new Error(num.length + "/" + shift);
      }
      var offset = 0;
      while (offset < num.length && num[offset] == 0) {
        offset++;
      }
      this.num = new Array(num.length - offset + shift);
      for (var i2 = 0; i2 < num.length - offset; i2++) {
        this.num[i2] = num[i2 + offset];
      }
    }
    QRPolynomial.prototype = {
      get: function(index) {
        return this.num[index];
      },
      getLength: function() {
        return this.num.length;
      },
      multiply: function(e) {
        var num = new Array(this.getLength() + e.getLength() - 1);
        for (var i2 = 0; i2 < this.getLength(); i2++) {
          for (var j = 0; j < e.getLength(); j++) {
            num[i2 + j] ^= QRMath.gexp(QRMath.glog(this.get(i2)) + QRMath.glog(e.get(j)));
          }
        }
        return new QRPolynomial(num, 0);
      },
      mod: function(e) {
        if (this.getLength() - e.getLength() < 0) {
          return this;
        }
        var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
        var num = new Array(this.getLength());
        for (var i2 = 0; i2 < this.getLength(); i2++) {
          num[i2] = this.get(i2);
        }
        for (var i2 = 0; i2 < e.getLength(); i2++) {
          num[i2] ^= QRMath.gexp(QRMath.glog(e.get(i2)) + ratio);
        }
        return new QRPolynomial(num, 0).mod(e);
      }
    };
    function QRRSBlock(totalCount, dataCount) {
      this.totalCount = totalCount;
      this.dataCount = dataCount;
    }
    QRRSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
    QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
      var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
      if (rsBlock == void 0) {
        throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
      }
      var length = rsBlock.length / 3;
      var list = [];
      for (var i2 = 0; i2 < length; i2++) {
        var count = rsBlock[i2 * 3 + 0];
        var totalCount = rsBlock[i2 * 3 + 1];
        var dataCount = rsBlock[i2 * 3 + 2];
        for (var j = 0; j < count; j++) {
          list.push(new QRRSBlock(totalCount, dataCount));
        }
      }
      return list;
    };
    QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {
      switch (errorCorrectLevel) {
        case QRErrorCorrectLevel.L:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
        case QRErrorCorrectLevel.M:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
        case QRErrorCorrectLevel.Q:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
        case QRErrorCorrectLevel.H:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    function QRBitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    QRBitBuffer.prototype = {
      get: function(index) {
        var bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
      },
      put: function(num, length) {
        for (var i2 = 0; i2 < length; i2++) {
          this.putBit((num >>> length - i2 - 1 & 1) == 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        var bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    var QRCodeLimitLength = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];
    QRCode = function(canvasId, vOption) {
      this._htOption = {
        width: 256,
        height: 256,
        typeNumber: 4,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRErrorCorrectLevel.H
      };
      if (typeof vOption === "string") {
        vOption = {
          text: vOption
        };
      }
      if (vOption) {
        for (var i2 in vOption) {
          this._htOption[i2] = vOption[i2];
        }
      }
      this._oQRCode = null;
      this.canvasId = canvasId;
      if (this._htOption.text && this.canvasId) {
        this.makeCode(this._htOption.text);
      }
    };
    QRCode.prototype.makeCode = function(sText) {
      this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel);
      this._oQRCode.addData(sText);
      this._oQRCode.make();
      this.makeImage();
    };
    QRCode.prototype.makeImage = function() {
      var _oContext;
      if (this._htOption.usingIn) {
        _oContext = wx.createCanvasContext(this.canvasId, this._htOption.usingIn);
      } else {
        _oContext = wx.createCanvasContext(this.canvasId);
      }
      var _htOption = this._htOption;
      var oQRCode = this._oQRCode;
      var nCount = oQRCode.getModuleCount();
      var nWidth = _htOption.width / nCount;
      var nHeight = _htOption.height / nCount;
      var nRoundedWidth = Math.round(nWidth);
      var nRoundedHeight = Math.round(nHeight);
      if (_htOption.image && _htOption.image != "") {
        _oContext.drawImage(_htOption.image, 0, 0, _htOption.width, _htOption.height);
      }
      for (var row = 0; row < nCount; row++) {
        for (var col = 0; col < nCount; col++) {
          var bIsDark = oQRCode.isDark(row, col);
          var nLeft = col * nWidth;
          var nTop = row * nHeight;
          _oContext.setStrokeStyle(bIsDark ? _htOption.colorDark : _htOption.colorLight);
          _oContext.setLineWidth(1);
          _oContext.setFillStyle(bIsDark ? _htOption.colorDark : _htOption.colorLight);
          _oContext.fillRect(nLeft, nTop, nWidth, nHeight);
          _oContext.strokeRect(
            Math.floor(nLeft) + 0.5,
            Math.floor(nTop) + 0.5,
            nRoundedWidth,
            nRoundedHeight
          );
          _oContext.strokeRect(
            Math.ceil(nLeft) - 0.5,
            Math.ceil(nTop) - 0.5,
            nRoundedWidth,
            nRoundedHeight
          );
        }
      }
      _oContext.draw();
    };
    QRCode.prototype.exportImage = function(callback) {
      if (!callback) {
        return;
      }
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: this._htOption.width,
        height: this._htOption.height,
        destWidth: this._htOption.width,
        destHeight: this._htOption.height,
        canvasId: this.canvasId,
        success: function(res) {
          formatAppLog("log", "at libs/weapp-qrcode.js:415", res.tempFilePath);
          callback(res.tempFilePath);
        }
      });
    };
    QRCode.CorrectLevel = QRErrorCorrectLevel;
  })();
  const qrCode = QRCode;
  const _sfc_main$1 = {
    data() {
      return {
        show: false,
        pageTotal: 0,
        query: {
          mode: "user",
          options: "1",
          pageIndex: 1,
          pageSize: 10
        },
        orderDataRes: [],
        couponList: [
          {
            name: "\u8D2D\u7269\u5238",
            code: "xyz0900100200",
            invalidTime: "2019-07-01",
            spread: false,
            sendTime: "2019-06-01",
            suitStore: "\u5168\u90E8",
            useDescribe: ["1\u3001\u53EF\u5728\u4EFB\u4F55\u9002\u7528\u5546\u5BB6\u5185\u6D88\u8D39", "2\u3001\u89E3\u91CA\u6743\u5F52Thor\u6240\u6709"]
          },
          {
            name: "\u6253\u8F66\u5238",
            code: "xyz0900100300",
            invalidTime: "2019-07-01",
            spread: false,
            sendTime: "2019-06-01",
            suitStore: "\u6EF4\u6EF4\u6253\u8F66",
            useDescribe: ["1\u3001\u53EF\u5728\u4EFB\u4F55\u9002\u7528\u5546\u5BB6\u5185\u6D88\u8D39", "2\u3001\u89E3\u91CA\u6743\u5F52Thor\u6240\u6709"]
          }
        ],
        qrcode_w: uni.upx2px(240)
      };
    },
    onLoad: function(options) {
      uni.hideTabBar({});
      this.getOrderData();
      setTimeout(() => {
        this.couponQrCode(this.couponList[0].code, "couponQrcode0");
      }, 60);
    },
    methods: {
      getOrderData: function() {
        getDataParam(this.query, "/order/queryOrderAssociated").then((res) => {
          formatAppLog("log", "at pages/ticket/ticket.vue:115", res);
          this.orderDataRes = res.data;
          formatAppLog("log", "at pages/ticket/ticket.vue:117", this.orderDataRes);
          for (var item in this.orderDataRes) {
            formatAppLog("log", "at pages/ticket/ticket.vue:119", this.orderDataRes[item]);
            this.orderDataRes[item].spread = false;
          }
          formatAppLog("log", "at pages/ticket/ticket.vue:122", this.orderDataRes);
          this.pageTotal = res.pageTotal || 10;
        });
      },
      spread: function(index) {
        let orderDataRes = this.orderDataRes;
        if (!orderDataRes[index].spread) {
          setTimeout(() => {
            this.couponQrCode(orderDataRes[index].orderId, "couponQrcode" + index);
          }, 60);
        }
        orderDataRes[index].spread = !orderDataRes[index].spread;
        this.orderDataRes = orderDataRes;
      },
      couponQrCode(text, canvasId) {
        new qrCode(canvasId, {
          text,
          width: this.qrcode_w,
          height: this.qrcode_w,
          colorDark: "#333333",
          colorLight: "#FFFFFF",
          correctLevel: qrCode.CorrectLevel.H
        });
        if (canvasId == "couponQrcode0") {
          setTimeout(() => {
            if (!this.show) {
              this.show = true;
            }
          }, 0);
        }
      },
      navigateBack() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_tui_icon = resolveEasycom(vue.resolveDynamicComponent("tui-icon"), __easycom_0$2);
    const _component_tui_navigation_bar = resolveEasycom(vue.resolveDynamicComponent("tui-navigation-bar"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5BFC\u822A\u680F "),
      vue.createVNode(_component_tui_navigation_bar, {
        isOpacity: false,
        title: "\u786E\u8BA4\u8BA2\u5355",
        backgroundColor: "#5677fc",
        color: "#f1f1f1"
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "header-box" }, [
            vue.createVNode(_component_tui_icon, {
              name: "arrowleft",
              color: "#fff",
              onClick: $options.navigateBack
            }, null, 8, ["onClick"])
          ])
        ]),
        _: 1
      }),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", null, "\u60A8\u5171\u6709"),
        vue.createElementVNode("view", { class: "coupon-num" }, vue.toDisplayString($data.pageTotal) + "\u5F20", 1),
        vue.createElementVNode("view", null, "\u8F66\u7968")
      ]),
      vue.createElementVNode("view", { class: "coupon-list" }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.orderDataRes, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "coupon-item",
            key: index
          }, [
            vue.createElementVNode("view", { class: "coupon" }, [
              vue.createElementVNode("image", {
                src: "/static/images/ticket/img_fuwuquan_blue_3x.png",
                class: "coupon-img"
              }),
              vue.createElementVNode("view", { class: "left-tit-box" }, [
                vue.createElementVNode("view", { class: "tit" }, vue.toDisplayString(item.startLocation) + "->" + vue.toDisplayString(item.endLocation), 1),
                vue.createElementVNode("view", { class: "term" }, "\u671F\u9650\uFF1A" + vue.toDisplayString(item.orderStatus), 1)
              ]),
              vue.createElementVNode("view", {
                class: "right-detail",
                onClick: ($event) => $options.spread(index)
              }, [
                vue.createElementVNode("text", { class: "detail-txt" }, "\u67E5\u770B\u8BE6\u60C5"),
                vue.createElementVNode("image", {
                  src: "/static/images/ticket/icon_next_3x.png",
                  class: vue.normalizeClass(["arrow", { "tui-rotate_90": item.spread }])
                }, null, 2)
              ], 8, ["onClick"])
            ]),
            vue.withDirectives(vue.createElementVNode("view", { class: "hidden-box" }, [
              vue.createElementVNode("view", { class: "code-tit" }, "\u8BA2\u5355\u53F7"),
              vue.createElementVNode("view", { class: "code-num" }, vue.toDisplayString(item.orderId), 1),
              vue.createElementVNode("view", { class: "qrcode-box" }, [
                vue.createElementVNode("view", { class: "qrcode" }, [
                  vue.createElementVNode("canvas", {
                    class: vue.normalizeClass({ "my-canvas": !item.spread }),
                    style: vue.normalizeStyle({ width: $data.qrcode_w + "px", height: $data.qrcode_w + "px" }),
                    "canvas-id": "couponQrcode" + index,
                    id: "couponQrcode" + index
                  }, null, 14, ["canvas-id", "id"])
                ])
              ]),
              vue.createElementVNode("view", { class: "list-item" }, [
                vue.createElementVNode("view", { class: "item-tit" }, "\u4E58\u8F66\u65F6\u95F4"),
                vue.createElementVNode("view", { class: "item-con" }, vue.toDisplayString(item.orderStatus), 1)
              ]),
              vue.createElementVNode("view", { class: "list-item" }, [
                vue.createElementVNode("view", { class: "item-tit" }, "\u4E58\u5750\u8F66\u8F86"),
                vue.createElementVNode("view", { class: "item-con" }, vue.toDisplayString(item.busName) + ": " + vue.toDisplayString(item.seatInfo) + "\u5EA7", 1)
              ]),
              vue.createElementVNode("view", { class: "list-item" }, [
                vue.createElementVNode("view", { class: "item-tit" }, "\u4E58\u8F66\u5730\u70B9"),
                vue.createElementVNode("view", { class: "item-con" }, vue.toDisplayString(item.startStation), 1)
              ])
            ], 512), [
              [vue.vShow, item.spread]
            ])
          ]);
        }), 128))
      ]),
      vue.withDirectives(vue.createElementVNode("view", { class: "none" }, "\u6682\u65E0\u53EF\u7528\u6D17\u8F66\u5238~", 512), [
        [vue.vShow, _ctx.couponNum == 0]
      ])
    ]);
  }
  const PagesTicketTicket = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/pages/ticket/ticket.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/my/change_my", PagesMyChange_my);
  __definePage("pages/my/my", PagesMyMy);
  __definePage("pages/ticket/out_ticket", PagesTicketOut_ticket);
  __definePage("pages/ticket/pick_ticket", PagesTicketPick_ticket);
  __definePage("pages/ticket/ticket", PagesTicketTicket);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
