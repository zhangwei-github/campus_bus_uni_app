"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.days
  }, $props.days ? {
    b: common_vendor.t($data.d),
    c: common_vendor.n($props.scale ? "tui-countdown-scale" : ""),
    d: $props.size + "rpx",
    e: $props.color,
    f: $props.size + "rpx",
    g: $props.backgroundColor,
    h: $props.borderColor,
    i: $options.getWidth($data.d, $props.width) + "rpx",
    j: $props.height + "rpx"
  } : {}, {
    k: $props.days
  }, $props.days ? {
    l: common_vendor.t($props.isColon ? ":" : "\u5929"),
    m: $props.borderColor == "transparent" ? 1 : "",
    n: $props.colonSize + "rpx",
    o: $props.colonSize + "rpx",
    p: $props.colonColor
  } : {}, {
    q: $props.hours
  }, $props.hours ? {
    r: common_vendor.t($data.h),
    s: common_vendor.n($props.scale ? "tui-countdown-scale" : ""),
    t: $props.size + "rpx",
    v: $props.color,
    w: $props.size + "rpx",
    x: $props.backgroundColor,
    y: $props.borderColor,
    z: $options.getWidth($data.h, $props.width) + "rpx",
    A: $props.height + "rpx"
  } : {}, {
    B: $props.hours
  }, $props.hours ? {
    C: common_vendor.t($props.isColon ? ":" : "\u65F6"),
    D: $props.borderColor == "transparent" ? 1 : "",
    E: $props.colonSize + "rpx",
    F: $props.colonSize + "rpx",
    G: $props.colonColor
  } : {}, {
    H: $props.minutes
  }, $props.minutes ? {
    I: common_vendor.t($data.i),
    J: common_vendor.n($props.scale ? "tui-countdown-scale" : ""),
    K: $props.size + "rpx",
    L: $props.color,
    M: $props.size + "rpx",
    N: $props.backgroundColor,
    O: $props.borderColor,
    P: $options.getWidth($data.i, $props.width) + "rpx",
    Q: $props.height + "rpx"
  } : {}, {
    R: $props.minutes
  }, $props.minutes ? {
    S: common_vendor.t($props.isColon ? ":" : "\u5206"),
    T: $props.borderColor == "transparent" ? 1 : "",
    U: $props.colonSize + "rpx",
    V: $props.colonSize + "rpx",
    W: $props.colonColor
  } : {}, {
    X: $props.seconds
  }, $props.seconds ? {
    Y: common_vendor.t($data.s),
    Z: common_vendor.n($props.scale ? "tui-countdown-scale" : ""),
    aa: $props.size + "rpx",
    ab: $props.color,
    ac: $props.size + "rpx",
    ad: $props.backgroundColor,
    ae: $props.borderColor,
    af: $options.getWidth($data.s, $props.width) + "rpx",
    ag: $props.height + "rpx"
  } : {}, {
    ah: $props.seconds && !$props.isColon
  }, $props.seconds && !$props.isColon ? {
    ai: common_vendor.t($props.unitEn ? "s" : "\u79D2"),
    aj: $props.borderColor == "transparent" ? 1 : "",
    ak: $props.colonSize + "rpx",
    al: $props.colonSize + "rpx",
    am: $props.colonColor
  } : {}, {
    an: $props.seconds && $props.isMs && $props.isColon
  }, $props.seconds && $props.isMs && $props.isColon ? {
    ao: $props.colonSize + "rpx",
    ap: $props.colonSize + "rpx",
    aq: $props.colonColor
  } : {}, {
    ar: $props.seconds && $props.isMs
  }, $props.seconds && $props.isMs ? {
    as: common_vendor.f($data.ms, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    at: common_vendor.n($props.scale ? "tui-countdown-scale" : ""),
    av: $props.height + "rpx",
    aw: $data.ani ? 1 : "",
    ax: $props.backgroundColor,
    ay: $props.borderColor,
    az: $props.msSize + "rpx",
    aA: $props.msColor,
    aB: $props.height + "rpx",
    aC: $props.msWidth > 0 ? $props.msWidth + "rpx" : "auto"
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7a2d6973"], ["__file", "/Users/zhangwei/Downloads/campus_bus_sys-master/campus_bus/components/thorui/tui-countdown/tui-countdown.vue"]]);
wx.createComponent(Component);
