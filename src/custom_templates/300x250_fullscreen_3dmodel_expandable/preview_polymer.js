window.Polymer = window.Polymer || {};
window.Polymer['dom'] = 'shadow';
(function() {
  var G = {}, F = {}, M = {};
  (function(x, v) {
    function k() {
      this._endDelay = this._delay = 0;
      this._fill = 'none';
      this._iterationStart = 0;
      this._iterations = 1;
      this._duration = 0;
      this._playbackRate = 1;
      this._direction = 'normal';
      this._easing = 'linear';
      this._easingFunction = n;
    }

    function f() {
      return x.isDeprecated('Invalid timing inputs', '2016-03-02', 'TypeError exceptions will be thrown instead.', !0);
    }

    function h(m, A, B) {
      var C = new k;
      A && (C.fill = 'both', C.duration = 'auto');
      'number' != typeof m || isNaN(m) ? void 0 !== m && Object.getOwnPropertyNames(m).forEach(function(w) {
        if ('auto' !=
          m[w]) {
          if ('number' == typeof C[w] || 'duration' == w) if ('number' != typeof m[w] || isNaN(m[w])) return;
          'fill' == w && -1 == d.indexOf(m[w]) || 'direction' == w && -1 == l.indexOf(m[w]) || 'playbackRate' == w && 1 !== m[w] && x.isDeprecated('AnimationEffectTiming.playbackRate', '2014-11-28', 'Use Animation.playbackRate instead.') || (C[w] = m[w]);
        }
      }) : C.duration = m;
      return C;
    }

    function e(m, A, B, C) {
      return 0 > m || 1 < m || 0 > B || 1 < B ? n : function(w) {
        if (0 >= w) {
          var D = 0;
          0 < m ? D = A / m : !A && 0 < B && (D = C / B);
          return D * w;
        }
        if (1 <= w) return D = 0, 1 > B ? D = (C - 1) / (B - 1) : 1 == B && 1 > m && (D = (A - 1) /
          (m - 1)), 1 + D * (w - 1);
        D = 0;
        for (var H = 1; D < H;) {
          var E = (D + H) / 2, I = 3 * m * (1 - E) * (1 - E) * E + 3 * B * (1 - E) * E * E + E * E * E;
          if (1E-5 > Math.abs(w - I)) break;
          I < w ? D = E : H = E;
        }
        return 3 * A * (1 - E) * (1 - E) * E + 3 * C * (1 - E) * E * E + E * E * E;
      };
    }

    function a(m, A) {
      return function(B) {
        if (1 <= B) return 1;
        var C = 1 / m;
        B += A * C;
        return B - B % C;
      };
    }

    function c(m) {
      u || (u = document.createElement('div').style);
      u.animationTimingFunction = '';
      u.animationTimingFunction = m;
      var A = u.animationTimingFunction;
      if ('' == A && f()) throw new TypeError(m + ' is not a valid value for easing');
      return A;
    }

    function b(m) {
      if ('linear' ==
        m) return n;
      var A = r.exec(m);
      return A ? e.apply(this, A.slice(1).map(Number)) : (A = y.exec(m)) ? a(Number(A[1]), {
        start: t,
        middle: p,
        end: q,
      }[A[2]]) : (m = z[m]) ? m : n;
    }

    function g(m, A, B) {
      if (null == A) return 0;
      var C = B.delay + m + B.endDelay;
      return A < Math.min(B.delay, C) ? 1 : A >= Math.min(B.delay + m, C) ? 2 : 3;
    }

    var d = ['backwards', 'forwards', 'both', 'none'], l = ['reverse', 'alternate', 'alternate-reverse'],
      n = function(m) {
        return m;
      };
    k.prototype = {
      _setMember: function(m, A) {
        this['_' + m] = A;
        this._effect && (this._effect._timingInput[m] = A, this._effect._timing =
          x.normalizeTimingInput(this._effect._timingInput), this._effect.activeDuration = x.calculateActiveDuration(this._effect._timing), this._effect._animation && this._effect._animation._rebuildUnderlyingAnimation());
      }, get playbackRate() {
        return this._playbackRate;
      }, set delay(m) {
        this._setMember('delay', m);
      }, get delay() {
        return this._delay;
      }, set endDelay(m) {
        this._setMember('endDelay', m);
      }, get endDelay() {
        return this._endDelay;
      }, set fill(m) {
        this._setMember('fill', m);
      }, get fill() {
        return this._fill;
      }, set iterationStart(m) {
        if ((isNaN(m) ||
          0 > m) && f()) throw new TypeError('iterationStart must be a non-negative number, received: ' + m);
        this._setMember('iterationStart', m);
      }, get iterationStart() {
        return this._iterationStart;
      }, set duration(m) {
        if ('auto' != m && (isNaN(m) || 0 > m) && f()) throw new TypeError('duration must be non-negative or auto, received: ' + m);
        this._setMember('duration', m);
      }, get duration() {
        return this._duration;
      }, set direction(m) {
        this._setMember('direction', m);
      }, get direction() {
        return this._direction;
      }, set easing(m) {
        this._easingFunction = b(c(m));
        this._setMember('easing', m);
      }, get easing() {
        return this._easing;
      }, set iterations(m) {
        if ((isNaN(m) || 0 > m) && f()) throw new TypeError('iterations must be non-negative, received: ' + m);
        this._setMember('iterations', m);
      }, get iterations() {
        return this._iterations;
      },
    };
    var t = 1, p = .5, q = 0, z = {
        ease: e(.25, .1, .25, 1),
        'ease-in': e(.42, 0, 1, 1),
        'ease-out': e(0, 0, .58, 1),
        'ease-in-out': e(.42, 0, .58, 1),
        'step-start': a(1, t),
        'step-middle': a(1, p),
        'step-end': a(1, q),
      }, u = null,
      r = /cubic-bezier\(\s*(-?\d+\.?\d*|-?\.\d+)\s*,\s*(-?\d+\.?\d*|-?\.\d+)\s*,\s*(-?\d+\.?\d*|-?\.\d+)\s*,\s*(-?\d+\.?\d*|-?\.\d+)\s*\)/,
      y = /steps\(\s*(\d+)\s*,\s*(start|middle|end)\s*\)/;
    x.cloneTimingInput = function(m) {
      if ('number' == typeof m) return m;
      var A = {}, B;
      for (B in m) A[B] = m[B];
      return A;
    };
    x.makeTiming = h;
    x.numericTimingToObject = function(m) {
      'number' == typeof m && (m = isNaN(m) ? { duration: 0 } : { duration: m });
      return m;
    };
    x.normalizeTimingInput = function(m, A) {
      m = x.numericTimingToObject(m);
      return h(m, A);
    };
    x.calculateActiveDuration = function(m) {
      return Math.abs((0 === m.duration || 0 === m.iterations ? 0 : m.duration * m.iterations) / m.playbackRate);
    };
    x.calculateIterationProgress =
      function(m, A, B) {
        var C = g(m, A, B);
        a:{
          var w = B.fill;
          switch (C) {
            case 1:
              m = 'backwards' == w || 'both' == w ? 0 : null;
              break a;
            case 3:
              m = A - B.delay;
              break a;
            case 2:
              m = 'forwards' == w || 'both' == w ? m : null;
              break a;
            case 0:
              m = null;
              break a;
          }
          m = void 0;
        }
        if (null === m) return null;
        A = B.duration;
        w = B.iterationStart;
        0 === A ? 1 !== C && (w += B.iterations) : w += m / A;
        A = w;
        w = Infinity === A ? B.iterationStart % 1 : A % 1;
        0 !== w || 2 !== C || 0 === B.iterations || 0 === m && 0 !== B.duration || (w = 1);
        m = w;
        w = 2 === C && Infinity === B.iterations ? Infinity : 1 === m ? Math.floor(A) - 1 : Math.floor(A);
        A = C = B.direction;
        'normal' !== C && 'reverse' !== C && ('alternate-reverse' === C && (w += 1), A = 'normal', Infinity !== w && 0 !== w % 2 && (A = 'reverse'));
        return B._easingFunction('normal' === A ? m : 1 - m);
      };
    x.calculatePhase = g;
    x.normalizeEasing = c;
    x.parseEasingFunction = b;
  })(G, null);
  (function(x, v) {
    function k(a) {
      var c = [], b;
      for (b in a) if (!(b in ['easing', 'offset', 'composite'])) {
        var g = a[b];
        Array.isArray(g) || (g = [g]);
        for (var d, l = g.length, n = 0; n < l; n++) d = {}, d.offset = 'offset' in a ? a.offset : 1 == l ? 1 : n / (l - 1), 'easing' in a && (d.easing = a.easing), 'composite' in a && (d.composite =
          a.composite), d[b] = g[n], c.push(d);
      }
      c.sort(function(t, p) {
        return t.offset - p.offset;
      });
      return c;
    }

    var f = {
      background: 'backgroundImage backgroundPosition backgroundSize backgroundRepeat backgroundAttachment backgroundOrigin backgroundClip backgroundColor'.split(' '),
      border: 'borderTopColor borderTopStyle borderTopWidth borderRightColor borderRightStyle borderRightWidth borderBottomColor borderBottomStyle borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth'.split(' '),
      borderBottom: ['borderBottomWidth',
        'borderBottomStyle', 'borderBottomColor'],
      borderColor: ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
      borderLeft: ['borderLeftWidth', 'borderLeftStyle', 'borderLeftColor'],
      borderRadius: ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'],
      borderRight: ['borderRightWidth', 'borderRightStyle', 'borderRightColor'],
      borderTop: ['borderTopWidth', 'borderTopStyle', 'borderTopColor'],
      borderWidth: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth',
        'borderLeftWidth'],
      flex: ['flexGrow', 'flexShrink', 'flexBasis'],
      font: 'fontFamily fontSize fontStyle fontVariant fontWeight lineHeight'.split(' '),
      margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
      outline: ['outlineColor', 'outlineStyle', 'outlineWidth'],
      padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
    }, h = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    v = { thin: '1px', medium: '3px', thick: '5px' };
    var e = {
      borderBottomWidth: v,
      borderLeftWidth: v,
      borderRightWidth: v,
      borderTopWidth: v,
      fontSize: {
        'xx-small': '60%',
        'x-small': '75%',
        small: '89%',
        medium: '100%',
        large: '120%',
        'x-large': '150%',
        'xx-large': '200%',
      },
      fontWeight: { normal: '400', bold: '700' },
      outlineWidth: v,
      textShadow: { none: '0px 0px 0px transparent' },
      boxShadow: { none: '0px 0px 0px 0px transparent' },
    };
    x.convertToArrayForm = k;
    x.normalizeKeyframes = function(a) {
      function c() {
        var n = b.length;
        null == b[n - 1].offset && (b[n - 1].offset = 1);
        1 < n && null == b[0].offset && (b[0].offset = 0);
        for (var t = 0, p = b[0].offset, q = 1; q < n; q++) {
          var z = b[q].offset;
          if (null != z) {
            for (var u =
              1; u < q - t; u++) b[t + u].offset = p + (z - p) * u / (q - t);
            t = q;
            p = z;
          }
        }
      }

      if (null == a) return [];
      window.Symbol && Symbol.iterator && Array.prototype.from && a[Symbol.iterator] && (a = Array.from(a));
      Array.isArray(a) || (a = k(a));
      var b = a.map(function(n) {
        var t = {}, p;
        for (p in n) {
          var q = n[p];
          if ('offset' == p) {
            if (null != q) {
              q = Number(q);
              if (!isFinite(q)) throw new TypeError('Keyframe offsets must be numbers.');
              if (0 > q || 1 < q) throw new TypeError('Keyframe offsets must be between 0 and 1.');
            }
          } else if ('composite' == p) {
            if ('add' == q || 'accumulate' == q) throw{
              type: DOMException.NOT_SUPPORTED_ERR,
              name: 'NotSupportedError', message: 'add compositing is not supported',
            };
            if ('replace' != q) throw new TypeError('Invalid composite mode ' + q + '.');
          } else q = 'easing' == p ? x.normalizeEasing(q) : '' + q;
          var z = void 0, u = p, r = q;
          q = t;
          var y = u;
          if ('display' !== y && 0 !== y.lastIndexOf('animation', 0) && 0 !== y.lastIndexOf('transition', 0)) if (y = f[u]) for (z in h.style[u] = r, y) u = y[z], r = h.style[u], q[u] = u in e ? e[u][r] || r : r; else q[u] = u in e ? e[u][r] || r : r;
        }
        void 0 == t.offset && (t.offset = null);
        void 0 == t.easing && (t.easing = 'linear');
        return t;
      });
      a = !0;
      for (var g =
        -Infinity, d = 0; d < b.length; d++) {
        var l = b[d].offset;
        if (null != l) {
          if (l < g) throw new TypeError('Keyframes are not loosely sorted by offset. Sort or specify offsets.');
          g = l;
        } else a = !1;
      }
      b = b.filter(function(n) {
        return 0 <= n.offset && 1 >= n.offset;
      });
      a || c();
      return b;
    };
  })(G, null);
  (function(x) {
    var v = {};
    x.isDeprecated = function(k, f, h, e) {
      e = e ? 'are' : 'is';
      var a = new Date;
      f = new Date(f);
      f.setMonth(f.getMonth() + 3);
      return a < f ? (k in v || console.warn('Web Animations: ' + k + ' ' + e + ' deprecated and will stop working on ' + f.toDateString() + '. ' +
        h), v[k] = !0, !1) : !0;
    };
    x.deprecated = function(k, f, h, e) {
      var a = e ? 'are' : 'is';
      if (x.isDeprecated(k, f, h, e)) throw Error(k + ' ' + a + ' no longer supported. ' + h);
    };
  })(G);
  (function() {
    if (document.documentElement.animate) {
      var x = document.documentElement.animate([], 0), v = !0;
      x && (v = !1, 'play currentTime pause reverse playbackRate cancel finish startTime playState'.split(' ').forEach(function(k) {
        void 0 === x[k] && (v = !0);
      }));
      if (!v) return;
    }
    (function(k, f, h) {
      function e(c) {
        for (var b = {}, g = 0; g < c.length; g++) for (var d in c[g]) if ('offset' !=
          d && 'easing' != d && 'composite' != d) {
          var l = { offset: c[g].offset, easing: c[g].easing, value: c[g][d] };
          b[d] = b[d] || [];
          b[d].push(l);
        }
        for (var n in b) if (c = b[n], 0 != c[0].offset || 1 != c[c.length - 1].offset) throw{
          type: DOMException.NOT_SUPPORTED_ERR,
          name: 'NotSupportedError',
          message: 'Partial keyframes are not supported',
        };
        return b;
      }

      function a(c) {
        var b = [], g;
        for (g in c) for (var d = c[g], l = 0; l < d.length - 1; l++) {
          var n = l, t = l + 1, p = d[n].offset, q = d[t].offset, z = p, u = q;
          0 == l && (z = -Infinity, 0 == q && (t = n));
          l == d.length - 2 && (u = Infinity, 1 == p && (n = t));
          b.push({
            applyFrom: z,
            applyTo: u,
            startOffset: d[n].offset,
            endOffset: d[t].offset,
            easingFunction: k.parseEasingFunction(d[n].easing),
            property: g,
            interpolation: f.propertyInterpolation(g, d[n].value, d[t].value),
          });
        }
        b.sort(function(r, y) {
          return r.startOffset - y.startOffset;
        });
        return b;
      }

      f.convertEffectInput = function(c) {
        c = k.normalizeKeyframes(c);
        var b = e(c), g = a(b);
        return function(d, l) {
          if (null != l) g.filter(function(t) {
            return l >= t.applyFrom && l < t.applyTo;
          }).forEach(function(t) {
            var p = l - t.startOffset, q = t.endOffset - t.startOffset;
            p = 0 == q ? 0 : t.easingFunction(p / q);
            f.apply(d, t.property, t.interpolation(p));
          }); else for (var n in b) 'offset' != n && 'easing' != n && 'composite' != n && f.clear(d, n);
        };
      };
    })(G, F, null);
    (function(k, f, h) {
      function e(b) {
        return b.replace(/-(.)/g, function(g, d) {
          return d.toUpperCase();
        });
      }

      var a = {};
      f.addPropertiesHandler = function(b, g, d) {
        for (var l = 0; l < d.length; l++) {
          var n = b, t = g, p = e(d[l]);
          a[p] = a[p] || [];
          a[p].push([n, t]);
        }
      };
      var c = {
        backgroundColor: 'transparent',
        backgroundPosition: '0% 0%',
        borderBottomColor: 'currentColor',
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px',
        borderBottomWidth: '3px',
        borderLeftColor: 'currentColor',
        borderLeftWidth: '3px',
        borderRightColor: 'currentColor',
        borderRightWidth: '3px',
        borderSpacing: '2px',
        borderTopColor: 'currentColor',
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
        borderTopWidth: '3px',
        bottom: 'auto',
        clip: 'rect(0px, 0px, 0px, 0px)',
        color: 'black',
        fontSize: '100%',
        fontWeight: '400',
        height: 'auto',
        left: 'auto',
        letterSpacing: 'normal',
        lineHeight: '120%',
        marginBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        maxHeight: 'none',
        maxWidth: 'none',
        minHeight: '0px',
        minWidth: '0px',
        opacity: '1.0',
        outlineColor: 'invert',
        outlineOffset: '0px',
        outlineWidth: '3px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        right: 'auto',
        strokeDasharray: 'none',
        strokeDashoffset: '0px',
        textIndent: '0px',
        textShadow: '0px 0px 0px transparent',
        top: 'auto',
        transform: '',
        verticalAlign: '0px',
        visibility: 'visible',
        width: 'auto',
        wordSpacing: 'normal',
        zIndex: 'auto',
      };
      f.propertyInterpolation = function(b, g, d) {
        var l = b;
        /-/.test(b) &&
        !k.isDeprecated('Hyphenated property names', '2016-03-22', 'Use camelCase instead.', !0) && (l = e(b));
        if ('initial' == g || 'initial' == d) 'initial' == g && (g = c[l]), 'initial' == d && (d = c[l]);
        b = g == d ? [] : a[l];
        for (l = 0; b && l < b.length; l++) {
          var n = b[l][0](g), t = b[l][0](d);
          if (void 0 !== n && void 0 !== t && (n = b[l][1](n, t))) {
            var p = f.Interpolation.apply(null, n);
            return function(q) {
              return 0 == q ? g : 1 == q ? d : p(q);
            };
          }
        }
        return f.Interpolation(!1, !0, function(q) {
          return q ? d : g;
        });
      };
    })(G, F, null);
    (function(k, f, h) {
      function e(a) {
        var c = k.calculateActiveDuration(a),
          b = function(g) {
            return k.calculateIterationProgress(c, g, a);
          };
        b._totalDuration = a.delay + c + a.endDelay;
        return b;
      }

      f.KeyframeEffect = function(a, c, b, g) {
        var d = e(k.normalizeTimingInput(b)), l = f.convertEffectInput(c), n;
        c = function() {
          l(a, n);
        };
        c._update = function(t) {
          n = d(t);
          return null !== n;
        };
        c._clear = function() {
          l(a, null);
        };
        c._hasSameTarget = function(t) {
          return a === t;
        };
        c._target = a;
        c._totalDuration = d._totalDuration;
        c._id = g;
        return c;
      };
    })(G, F, null);
    (function(k, f) {
      k.apply = function(h, e, a) {
        h.style[k.propertyName(e)] = a;
      };
      k.clear = function(h,
                         e) {
        h.style[k.propertyName(e)] = '';
      };
    })(F, null);
    (function(k) {
      window.Element.prototype.animate = function(f, h) {
        var e = '';
        h && h.id && (e = h.id);
        return k.timeline._play(k.KeyframeEffect(this, f, h, e));
      };
    })(F);
    (function(k, f) {
      function h(e, a, c) {
        if ('number' == typeof e && 'number' == typeof a) return e * (1 - c) + a * c;
        if ('boolean' == typeof e && 'boolean' == typeof a) return .5 > c ? e : a;
        if (e.length == a.length) {
          for (var b = [], g = 0; g < e.length; g++) b.push(h(e[g], a[g], c));
          return b;
        }
        throw'Mismatched interpolation arguments ' + e + ':' + a;
      }

      k.Interpolation = function(e,
                                 a, c) {
        return function(b) {
          return c(h(e, a, b));
        };
      };
    })(F, null);
    (function(k, f, h) {
      k.sequenceNumber = 0;
      var e = function(a, c, b) {
        this.target = a;
        this.currentTime = c;
        this.timelineTime = b;
        this.type = 'finish';
        this.cancelable = this.bubbles = !1;
        this.currentTarget = a;
        this.defaultPrevented = !1;
        this.eventPhase = Event.AT_TARGET;
        this.timeStamp = Date.now();
      };
      f.Animation = function(a) {
        this.id = '';
        a && a._id && (this.id = a._id);
        this._sequenceNumber = k.sequenceNumber++;
        this._currentTime = 0;
        this._startTime = null;
        this._paused = !1;
        this._playbackRate = 1;
        this._finishedFlag = this._inTimeline = !0;
        this.onfinish = null;
        this._finishHandlers = [];
        this._effect = a;
        this._inEffect = this._effect._update(0);
        this._idle = !0;
        this._currentTimePending = !1;
      };
      f.Animation.prototype = {
        _ensureAlive: function() {
          this._inEffect = 0 > this.playbackRate && 0 === this.currentTime ? this._effect._update(-1) : this._effect._update(this.currentTime);
          this._inTimeline || !this._inEffect && this._finishedFlag || (this._inTimeline = !0, f.timeline._animations.push(this));
        }, _tickCurrentTime: function(a, c) {
          a != this._currentTime &&
          (this._currentTime = a, this._isFinished && !c && (this._currentTime = 0 < this._playbackRate ? this._totalDuration : 0), this._ensureAlive());
        }, get currentTime() {
          return this._idle || this._currentTimePending ? null : this._currentTime;
        }, set currentTime(a) {
          a = +a;
          isNaN(a) || (f.restart(), this._paused || null == this._startTime || (this._startTime = this._timeline.currentTime - a / this._playbackRate), this._currentTimePending = !1, this._currentTime != a && (this._idle && (this._idle = !1, this._paused = !0), this._tickCurrentTime(a, !0), f.applyDirtiedAnimation(this)));
        },
        get startTime() {
          return this._startTime;
        }, set startTime(a) {
          a = +a;
          isNaN(a) || this._paused || this._idle || (this._startTime = a, this._tickCurrentTime((this._timeline.currentTime - this._startTime) * this.playbackRate), f.applyDirtiedAnimation(this));
        }, get playbackRate() {
          return this._playbackRate;
        }, set playbackRate(a) {
          if (a != this._playbackRate) {
            var c = this.currentTime;
            this._playbackRate = a;
            this._startTime = null;
            'paused' != this.playState && 'idle' != this.playState && (this._idle = this._finishedFlag = !1, this._ensureAlive(), f.applyDirtiedAnimation(this));
            null != c && (this.currentTime = c);
          }
        }, get _isFinished() {
          return !this._idle && (0 < this._playbackRate && this._currentTime >= this._totalDuration || 0 > this._playbackRate && 0 >= this._currentTime);
        }, get _totalDuration() {
          return this._effect._totalDuration;
        }, get playState() {
          return this._idle ? 'idle' : null == this._startTime && !this._paused && 0 != this.playbackRate || this._currentTimePending ? 'pending' : this._paused ? 'paused' : this._isFinished ? 'finished' : 'running';
        }, _rewind: function() {
          if (0 <= this._playbackRate) this._currentTime = 0; else if (Infinity >
            this._totalDuration) this._currentTime = this._totalDuration; else throw new DOMException('Unable to rewind negative playback rate animation with infinite duration', 'InvalidStateError');
        }, play: function() {
          this._paused = !1;
          if (this._isFinished || this._idle) this._rewind(), this._startTime = null;
          this._idle = this._finishedFlag = !1;
          this._ensureAlive();
          f.applyDirtiedAnimation(this);
        }, pause: function() {
          this._isFinished || this._paused || this._idle ? this._idle && (this._rewind(), this._idle = !1) : this._currentTimePending = !0;
          this._startTime =
            null;
          this._paused = !0;
        }, finish: function() {
          this._idle || (this.currentTime = 0 < this._playbackRate ? this._totalDuration : 0, this._startTime = this._totalDuration - this.currentTime, this._currentTimePending = !1, f.applyDirtiedAnimation(this));
        }, cancel: function() {
          this._inEffect && (this._inEffect = !1, this._idle = !0, this._paused = !1, this._finishedFlag = !0, this._currentTime = 0, this._startTime = null, this._effect._update(null), f.applyDirtiedAnimation(this));
        }, reverse: function() {
          this.playbackRate *= -1;
          this.play();
        }, addEventListener: function(a,
                                      c) {
          'function' == typeof c && 'finish' == a && this._finishHandlers.push(c);
        }, removeEventListener: function(a, c) {
          'finish' == a && (a = this._finishHandlers.indexOf(c), 0 <= a && this._finishHandlers.splice(a, 1));
        }, _fireEvents: function(a) {
          if (this._isFinished) {
            if (!this._finishedFlag) {
              var c = new e(this, this._currentTime, a),
                b = this._finishHandlers.concat(this.onfinish ? [this.onfinish] : []);
              setTimeout(function() {
                b.forEach(function(g) {
                  g.call(c.target, c);
                });
              }, 0);
              this._finishedFlag = !0;
            }
          } else this._finishedFlag = !1;
        }, _tick: function(a, c) {
          this._idle ||
          this._paused || (null == this._startTime ? c && (this.startTime = a - this._currentTime / this.playbackRate) : this._isFinished || this._tickCurrentTime((a - this._startTime) * this.playbackRate));
          c && (this._currentTimePending = !1, this._fireEvents(a));
        }, get _needsTick() {
          return this.playState in { pending: 1, running: 1 } || !this._finishedFlag;
        }, _targetAnimations: function() {
          var a = this._effect._target;
          a._activeAnimations || (a._activeAnimations = []);
          return a._activeAnimations;
        }, _markTarget: function() {
          var a = this._targetAnimations();
          -1 ===
          a.indexOf(this) && a.push(this);
        }, _unmarkTarget: function() {
          var a = this._targetAnimations(), c = a.indexOf(this);
          -1 !== c && a.splice(c, 1);
        },
      };
    })(G, F, null);
    (function(k, f, h) {
      function e(r) {
        var y = l;
        l = [];
        r < u.currentTime && (r = u.currentTime);
        u._animations.sort(a);
        u._animations = g(r, !0, u._animations)[0];
        y.forEach(function(m) {
          m[1](r);
        });
        b();
      }

      function a(r, y) {
        return r._sequenceNumber - y._sequenceNumber;
      }

      function c() {
        this._animations = [];
        this.currentTime = window.performance && performance.now ? performance.now() : 0;
      }

      function b() {
        q.forEach(function(r) {
          r();
        });
        q.length = 0;
      }

      function g(r, y, m) {
        z = !0;
        p = !1;
        f.timeline.currentTime = r;
        t = !1;
        var A = [], B = [], C = [], w = [];
        m.forEach(function(D) {
          D._tick(r, y);
          D._inEffect ? (B.push(D._effect), D._markTarget()) : (A.push(D._effect), D._unmarkTarget());
          D._needsTick && (t = !0);
          var H = D._inEffect || D._needsTick;
          (D._inTimeline = H) ? C.push(D) : w.push(D);
        });
        q.push.apply(q, A);
        q.push.apply(q, B);
        t && requestAnimationFrame(function() {
        });
        z = !1;
        return [C, w];
      }

      var d = window.requestAnimationFrame, l = [], n = 0;
      window.requestAnimationFrame = function(r) {
        var y = n++;
        0 != l.length ||
        d(e);
        l.push([y, r]);
        return y;
      };
      window.cancelAnimationFrame = function(r) {
        l.forEach(function(y) {
          y[0] == r && (y[1] = function() {
          });
        });
      };
      c.prototype = {
        _play: function(r) {
          r._timing = k.normalizeTimingInput(r.timing);
          r = new f.Animation(r);
          r._idle = !1;
          r._timeline = this;
          this._animations.push(r);
          f.restart();
          f.applyDirtiedAnimation(r);
          return r;
        },
      };
      var t = !1, p = !1;
      f.restart = function() {
        t || (t = !0, requestAnimationFrame(function() {
        }), p = !0);
        return p;
      };
      f.applyDirtiedAnimation = function(r) {
        z || (r._markTarget(), r = r._targetAnimations(), r.sort(a),
          g(f.timeline.currentTime, !1, r.slice())[1].forEach(function(y) {
            y = u._animations.indexOf(y);
            -1 !== y && u._animations.splice(y, 1);
          }), b());
      };
      var q = [], z = !1, u = new c;
      f.timeline = u;
    })(G, F, null);
    (function(k) {
      function f(c, b) {
        var g = c.exec(b);
        if (g) return g = c.ignoreCase ? g[0].toLowerCase() : g[0], [g, b.substr(g.length)];
      }

      function h(c, b) {
        b = b.replace(/^\s*/, '');
        if (c = c(b)) return [c[0], c[1].replace(/^\s*/, '')];
      }

      function e(c, b) {
        for (var g = c, d = b; g && d;) g > d ? g %= d : d %= g;
        return c * b / (g + d);
      }

      function a(c, b, g, d, l) {
        for (var n = [], t = [], p = [], q = e(d.length,
          l.length), z = 0; z < q; z++) {
          var u = b(d[z % d.length], l[z % l.length]);
          if (!u) return;
          n.push(u[0]);
          t.push(u[1]);
          p.push(u[2]);
        }
        return [n, t, function(r) {
          r = r.map(function(y, m) {
            return p[m](y);
          }).join(g);
          return c ? c(r) : r;
        }];
      }

      k.consumeToken = f;
      k.consumeTrimmed = h;
      k.consumeRepeated = function(c, b, g) {
        c = h.bind(null, c);
        for (var d = []; ;) {
          var l = c(g);
          if (!l) return [d, g];
          d.push(l[0]);
          g = l[1];
          l = f(b, g);
          if (!l || '' == l[1]) return [d, g];
          g = l[1];
        }
      };
      k.consumeParenthesised = function(c, b) {
        for (var g = 0, d = 0; d < b.length && (!/\s|,/.test(b[d]) || 0 != g); d++) if ('(' ==
          b[d]) g++; else if (')' == b[d] && (g--, 0 == g && d++, 0 >= g)) break;
        c = c(b.substr(0, d));
        return void 0 == c ? void 0 : [c, b.substr(d)];
      };
      k.ignore = function(c) {
        return function(b) {
          (b = c(b)) && (b[0] = void 0);
          return b;
        };
      };
      k.optional = function(c, b) {
        return function(g) {
          var d = c(g);
          return d ? d : [b, g];
        };
      };
      k.consumeList = function(c, b) {
        for (var g = [], d = 0; d < c.length; d++) {
          b = k.consumeTrimmed(c[d], b);
          if (!b || '' == b[0]) return;
          void 0 !== b[0] && g.push(b[0]);
          b = b[1];
        }
        if ('' == b) return g;
      };
      k.mergeNestedRepeated = a.bind(null, null);
      k.mergeWrappedNestedRepeated = a;
      k.mergeList =
        function(c, b, g) {
          for (var d = [], l = [], n = [], t = 0, p = 0; p < g.length; p++) if ('function' == typeof g[p]) {
            var q = g[p](c[t], b[t++]);
            d.push(q[0]);
            l.push(q[1]);
            n.push(q[2]);
          } else (function(z) {
            d.push(!1);
            l.push(!1);
            n.push(function() {
              return g[z];
            });
          })(p);
          return [d, l, function(z) {
            for (var u = '', r = 0; r < z.length; r++) u += n[r](z[r]);
            return u;
          }];
        };
    })(F);
    (function(k) {
      function f(e) {
        var a = { inset: !1, lengths: [], color: null };
        if ((e = k.consumeRepeated(function(c) {
          var b = k.consumeToken(/^inset/i, c);
          if (b) return a.inset = !0, b;
          if (b = k.consumeLengthOrPercent(c)) return a.lengths.push(b[0]),
            b;
          if (b = k.consumeColor(c)) return a.color = b[0], b;
        }, /^/, e)) && e[0].length) return [a, e[1]];
      }

      var h = function(e, a, c, b) {
        function g(q) {
          return { inset: q, color: [0, 0, 0, 0], lengths: [{ px: 0 }, { px: 0 }, { px: 0 }, { px: 0 }] };
        }

        for (var d = [], l = [], n = 0; n < c.length || n < b.length; n++) {
          var t = c[n] || g(b[n].inset), p = b[n] || g(c[n].inset);
          d.push(t);
          l.push(p);
        }
        return k.mergeNestedRepeated(e, a, d, l);
      }.bind(null, function(e, a) {
        for (; e.lengths.length < Math.max(e.lengths.length, a.lengths.length);) e.lengths.push({ px: 0 });
        for (; a.lengths.length < Math.max(e.lengths.length,
          a.lengths.length);) a.lengths.push({ px: 0 });
        if (e.inset == a.inset && !!e.color == !!a.color) {
          for (var c = [], b, g = [[], 0], d = [[], 0], l = 0; l < e.lengths.length; l++) {
            var n = k.mergeDimensions(e.lengths[l], a.lengths[l], 2 == l);
            g[0].push(n[0]);
            d[0].push(n[1]);
            c.push(n[2]);
          }
          e.color && a.color && (a = k.mergeColors(e.color, a.color), g[1] = a[0], d[1] = a[1], b = a[2]);
          return [g, d, function(t) {
            for (var p = e.inset ? 'inset ' : ' ', q = 0; q < c.length; q++) p += c[q](t[0][q]) + ' ';
            b && (p += b(t[1]));
            return p;
          }];
        }
      }, ', ');
      k.addPropertiesHandler(function(e) {
        if ((e = k.consumeRepeated(f,
          /^,/, e)) && '' == e[1]) return e[0];
      }, h, ['box-shadow', 'text-shadow']);
    })(F);
    (function(k, f) {
      function h(g) {
        return g.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
      }

      function e(g, d, l) {
        return Math.min(d, Math.max(g, l));
      }

      function a(g) {
        if (/^\s*[-+]?(\d*\.)?\d+\s*$/.test(g)) return Number(g);
      }

      function c(g, d) {
        return function(l, n) {
          return [l, n, function(t) {
            return h(e(g, d, t));
          }];
        };
      }

      function b(g) {
        g = g.trim().split(/\s*[\s,]\s*/);
        if (0 !== g.length) {
          for (var d = [], l = 0; l < g.length; l++) {
            var n = a(g[l]);
            if (void 0 === n) return;
            d.push(n);
          }
          return d;
        }
      }

      k.clamp = e;
      k.addPropertiesHandler(b, function(g, d) {
        if (g.length == d.length) return [g, d, function(l) {
          return l.map(h).join(' ');
        }];
      }, ['stroke-dasharray']);
      k.addPropertiesHandler(a, c(0, Infinity), ['border-image-width', 'line-height']);
      k.addPropertiesHandler(a, c(0, 1), ['opacity', 'shape-image-threshold']);
      k.addPropertiesHandler(a, function(g, d) {
        if (0 != g) return c(0, Infinity)(g, d);
      }, ['flex-grow', 'flex-shrink']);
      k.addPropertiesHandler(a, function(g, d) {
        return [g, d, function(l) {
          return Math.round(e(1, Infinity, l));
        }];
      }, ['orphans',
        'widows']);
      k.addPropertiesHandler(a, function(g, d) {
        return [g, d, Math.round];
      }, ['z-index']);
      k.parseNumber = a;
      k.parseNumberList = b;
      k.mergeNumbers = function(g, d) {
        return [g, d, h];
      };
      k.numberToString = h;
    })(F, null);
    (function(k, f) {
      k.addPropertiesHandler(String, function(h, e) {
        if ('visible' == h || 'visible' == e) return [0, 1, function(a) {
          return 0 >= a ? h : 1 <= a ? e : 'visible';
        }];
      }, ['visibility']);
    })(F);
    (function(k, f) {
      function h(c) {
        c = c.trim();
        a.fillStyle = '#000';
        a.fillStyle = c;
        var b = a.fillStyle;
        a.fillStyle = '#fff';
        a.fillStyle = c;
        if (b == a.fillStyle) return a.fillRect(0,
          0, 1, 1), c = a.getImageData(0, 0, 1, 1).data, a.clearRect(0, 0, 1, 1), b = c[3] / 255, [c[0] * b, c[1] * b, c[2] * b, b];
      }

      function e(c, b) {
        return [c, b, function(g) {
          if (g[3]) for (var d = 0; 3 > d; d++) g[d] = Math.round(Math.max(0, Math.min(255, g[d] / g[3])));
          g[3] = k.numberToString(k.clamp(0, 1, g[3]));
          return 'rgba(' + g.join(',') + ')';
        }];
      }

      f = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
      f.width = f.height = 1;
      var a = f.getContext('2d');
      k.addPropertiesHandler(h, e, 'background-color border-bottom-color border-left-color border-right-color border-top-color color fill flood-color lighting-color outline-color stop-color stroke text-decoration-color'.split(' '));
      k.consumeColor = k.consumeParenthesised.bind(null, h);
      k.mergeColors = e;
    })(F, null);
    (function(k, f) {
      function h(l) {
        function n() {
          var r = z.exec(l);
          u = r ? r[0] : void 0;
        }

        function t() {
          if ('(' !== u) {
            var r = Number(u);
            n();
            return r;
          }
          n();
          r = q();
          if (')' !== u) return NaN;
          n();
          return r;
        }

        function p() {
          for (var r = t(); "*" === u || "/" === u;) {
            var y = u;
            n();
            var m = t();
            r = '*' === y ? r * m : r / m;
          }
          return r;
        }

        function q() {
          for (var r = p(); "+" === u || "-" === u;) {
            var y = u;
            n();
            var m = p();
            r = '+' === y ? r + m : r - m;
          }
          return r;
        }

        var z = /([\+\-\w\.]+|[\(\)\*\/])/g, u;
        n();
        return q();
      }

      function e(l,
                 n) {
        n = n.trim().toLowerCase();
        if ('0' == n && 0 <= 'px'.search(l)) return { px: 0 };
        if (/^[^(]*$|^calc/.test(n)) {
          n = n.replace(/calc\(/g, '(');
          var t = {};
          n = n.replace(l, function(r) {
            t[r] = null;
            return 'U' + r;
          });
          l = 'U(' + l.source + ')';
          for (var p = n.replace(/[-+]?(\d*\.)?\d+([Ee][-+]?\d+)?/g, 'N').replace(new RegExp('N' + l, 'g'), 'D').replace(/\s[+-]\s/g, 'O').replace(/\s/g, ''), q = [/N\*(D)/g, /(N|D)[*/]N/g, /(N|D)O\1/g, /\((N|D)\)/g], z = 0; z < q.length;) q[z].test(p) ? (p = p.replace(q[z], '$1'), z = 0) : z++;
          if ('D' == p) {
            for (var u in t) {
              p = h(n.replace(new RegExp('U' +
                u, 'g'), '').replace(new RegExp(l, 'g'), '*0'));
              if (!isFinite(p)) return;
              t[u] = p;
            }
            return t;
          }
        }
      }

      function a(l, n) {
        return c(l, n, !0);
      }

      function c(l, n, t) {
        var p = [], q;
        for (q in l) p.push(q);
        for (q in n) 0 > p.indexOf(q) && p.push(q);
        l = p.map(function(z) {
          return l[z] || 0;
        });
        n = p.map(function(z) {
          return n[z] || 0;
        });
        return [l, n, function(z) {
          var u = z.map(function(r, y) {
            1 == z.length && t && (r = Math.max(r, 0));
            return k.numberToString(r) + p[y];
          }).join(' + ');
          return 1 < z.length ? 'calc(' + u + ')' : u;
        }];
      }

      var b = e.bind(null, /px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc/g);
      f = e.bind(null, /px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|%/g);
      var g = e.bind(null, /deg|rad|grad|turn/g);
      k.parseLength = b;
      k.parseLengthOrPercent = f;
      k.consumeLengthOrPercent = k.consumeParenthesised.bind(null, f);
      k.parseAngle = g;
      k.mergeDimensions = c;
      b = k.consumeParenthesised.bind(null, b);
      b = k.consumeRepeated.bind(void 0, b, /^/);
      var d = k.consumeRepeated.bind(void 0, b, /^,/);
      k.consumeSizePairList = d;
      b = k.mergeNestedRepeated.bind(void 0, a, ' ');
      g = k.mergeNestedRepeated.bind(void 0, b, ',');
      k.mergeNonNegativeSizePair =
        b;
      k.addPropertiesHandler(function(l) {
        if ((l = d(l)) && '' == l[1]) return l[0];
      }, g, ['background-size']);
      k.addPropertiesHandler(f, a, 'border-bottom-width border-image-width border-left-width border-right-width border-top-width flex-basis font-size height line-height max-height max-width outline-width width'.split(' '));
      k.addPropertiesHandler(f, c, 'border-bottom-left-radius border-bottom-right-radius border-top-left-radius border-top-right-radius bottom left letter-spacing margin-bottom margin-left margin-right margin-top min-height min-width outline-offset padding-bottom padding-left padding-right padding-top perspective right shape-margin stroke-dashoffset text-indent top vertical-align word-spacing'.split(' '));
    })(F,
      null);
    (function(k, f) {
      function h(a) {
        return k.consumeLengthOrPercent(a) || k.consumeToken(/^auto/, a);
      }

      function e(a) {
        if ((a = k.consumeList([k.ignore(k.consumeToken.bind(null, /^rect/)), k.ignore(k.consumeToken.bind(null, /^\(/)), k.consumeRepeated.bind(null, h, /^,/), k.ignore(k.consumeToken.bind(null, /^\)/))], a)) && 4 == a[0].length) return a[0];
      }

      f = k.mergeWrappedNestedRepeated.bind(null, function(a) {
        return 'rect(' + a + ')';
      }, function(a, c) {
        return 'auto' == a || 'auto' == c ? [!0, !1, function(b) {
          b = b ? a : c;
          if ('auto' == b) return 'auto';
          b = k.mergeDimensions(b,
            b);
          return b[2](b[0]);
        }] : k.mergeDimensions(a, c);
      }, ', ');
      k.parseBox = e;
      k.mergeBoxes = f;
      k.addPropertiesHandler(e, f, ['clip']);
    })(F, null);
    (function(k, f) {
      function h(p) {
        return function(q) {
          var z = 0;
          return p.map(function(u) {
            return u === d ? q[z++] : u;
          });
        };
      }

      function e(p) {
        return p;
      }

      function a(p) {
        p = p.toLowerCase().trim();
        if ('none' == p) return [];
        for (var q = /\s*(\w+)\(([^)]*)\)/g, z = [], u, r = 0; (u = q.exec(p)) && u.index == r;) {
          r = u.index + u[0].length;
          var y = u[1], m = t[y];
          if (!m) break;
          u = u[2].split(',');
          m = m[0];
          if (m.length < u.length) break;
          for (var A =
            [], B = 0; B < m.length; B++) {
            var C = u[B], w = m[B];
            C = C ? {
              A: function(D) {
                return '0' == D.trim() ? n : k.parseAngle(D);
              }, N: k.parseNumber, T: k.parseLengthOrPercent, L: k.parseLength,
            }[w.toUpperCase()](C) : { a: n, n: A[0], t: l }[w];
            if (void 0 === C) return;
            A.push(C);
          }
          z.push({ t: y, d: A });
          if (q.lastIndex == p.length) return z;
        }
      }

      function c(p) {
        return p.toFixed(6).replace('.000000', '');
      }

      function b(p, q) {
        if (p.decompositionPair !== q) {
          p.decompositionPair = q;
          var z = k.makeMatrixDecomposition(p);
        }
        if (q.decompositionPair !== p) {
          q.decompositionPair = p;
          var u = k.makeMatrixDecomposition(q);
        }
        if (null ==
          z[0] || null == u[0]) return [[!1], [!0], function(r) {
          return r ? q[0].d : p[0].d;
        }];
        z[0].push(0);
        u[0].push(1);
        return [z, u, function(r) {
          var y = k.quat(z[0][3], u[0][3], r[5]);
          return k.composeMatrix(r[0], r[1], r[2], y, r[4]).map(c).join(',');
        }];
      }

      function g(p) {
        return p.replace(/(x|y|z|3d)?$/, '3d');
      }

      var d = null, l = { px: 0 }, n = { deg: 0 }, t = {
        matrix: ['NNNNNN', [d, d, 0, 0, d, d, 0, 0, 0, 0, 1, 0, d, d, 0, 1], e],
        matrix3d: ['NNNNNNNNNNNNNNNN', e],
        rotate: ['A'],
        rotatex: ['A'],
        rotatey: ['A'],
        rotatez: ['A'],
        rotate3d: ['NNNA'],
        perspective: ['L'],
        scale: ['Nn', h([d, d,
          1]), e],
        scalex: ['N', h([d, 1, 1]), h([d, 1])],
        scaley: ['N', h([1, d, 1]), h([1, d])],
        scalez: ['N', h([1, 1, d])],
        scale3d: ['NNN', e],
        skew: ['Aa', null, e],
        skewx: ['A', null, h([d, n])],
        skewy: ['A', null, h([n, d])],
        translate: ['Tt', h([d, d, l]), e],
        translatex: ['T', h([d, l, l]), h([d, l])],
        translatey: ['T', h([l, d, l]), h([l, d])],
        translatez: ['L', h([l, l, d])],
        translate3d: ['TTL', e],
      };
      k.addPropertiesHandler(a, function(p, q) {
        var z = k.makeMatrixDecomposition && !0, u = !1;
        if (!p.length || !q.length) {
          p.length || (u = !0, p = q, q = []);
          for (var r = 0; r < p.length; r++) {
            var y =
              p[r].t, m = p[r].d, A = 'scale' == y.substr(0, 5) ? 1 : 0;
            q.push({
              t: y, d: m.map(function(N) {
                if ('number' == typeof N) return A;
                var J = {}, K;
                for (K in N) J[K] = A;
                return J;
              }),
            });
          }
        }
        m = [];
        var B = [], C = [];
        if (p.length != q.length) {
          if (!z) return;
          var w = b(p, q);
          m = [w[0]];
          B = [w[1]];
          C = [['matrix', [w[2]]]];
        } else for (r = 0; r < p.length; r++) {
          y = p[r].t;
          var D = q[r].t, H = p[r].d, E = q[r].d;
          w = t[y];
          var I = t[D];
          if ('perspective' == y && 'perspective' == D || !('matrix' != y && 'matrix3d' != y || 'matrix' != D && 'matrix3d' != D)) {
            if (!z) return;
            w = b([p[r]], [q[r]]);
            m.push(w[0]);
            B.push(w[1]);
            C.push(['matrix', [w[2]]]);
          } else {
            if (y != D) if (w[2] && I[2] && y.replace(/[xy]/, '') == D.replace(/[xy]/, '')) y = y.replace(/[xy]/, ''), H = w[2](H), E = I[2](E); else if (w[1] && I[1] && g(y) == g(D)) y = g(y), H = w[1](H), E = I[1](E); else {
              if (!z) return;
              w = b(p, q);
              m = [w[0]];
              B = [w[1]];
              C = [['matrix', [w[2]]]];
              break;
            }
            I = [];
            D = [];
            for (var O = [], L = 0; L < H.length; L++) w = ('number' == typeof H[L] ? k.mergeNumbers : k.mergeDimensions)(H[L], E[L]), I[L] = w[0], D[L] = w[1], O.push(w[2]);
            m.push(I);
            B.push(D);
            C.push([y, O]);
          }
        }
        u && (p = m, m = B, B = p);
        return [m, B, function(N) {
          return N.map(function(J,
                                K) {
            J = J.map(function(P, Q) {
              return C[K][1][Q](P);
            }).join(',');
            'matrix' == C[K][0] && 16 == J.split(',').length && (C[K][0] = 'matrix3d');
            return C[K][0] + '(' + J + ')';
          }).join(' ');
        }];
      }, ['transform']);
      k.transformToSvgMatrix = function(p) {
        p = k.transformListToMatrix(a(p));
        return 'matrix(' + c(p[0]) + ' ' + c(p[1]) + ' ' + c(p[4]) + ' ' + c(p[5]) + ' ' + c(p[12]) + ' ' + c(p[13]) + ')';
      };
    })(F, null);
    (function(k, f) {
      function h(c, b) {
        b.concat([c]).forEach(function(g) {
          g in document.documentElement.style && (e[c] = g);
          a[g] = c;
        });
      }

      var e = {}, a = {};
      h('transform', ['webkitTransform',
        'msTransform']);
      h('transformOrigin', ['webkitTransformOrigin']);
      h('perspective', ['webkitPerspective']);
      h('perspectiveOrigin', ['webkitPerspectiveOrigin']);
      k.propertyName = function(c) {
        return e[c] || c;
      };
      k.unprefixedPropertyName = function(c) {
        return a[c] || c;
      };
    })(F, null);
  })();
  (function() {
    if (void 0 === document.createElement('div').animate([]).oncancel) {
      var x = window.performance && performance.now ? function() {
        return performance.now();
      } : function() {
        return Date.now();
      }, v = function(f, h, e) {
        this.target = f;
        this.currentTime = h;
        this.timelineTime =
          e;
        this.type = 'cancel';
        this.cancelable = this.bubbles = !1;
        this.currentTarget = f;
        this.defaultPrevented = !1;
        this.eventPhase = Event.AT_TARGET;
        this.timeStamp = Date.now();
      }, k = window.Element.prototype.animate;
      window.Element.prototype.animate = function(f, h) {
        f = k.call(this, f, h);
        f._cancelHandlers = [];
        f.oncancel = null;
        var e = f.cancel;
        f.cancel = function() {
          e.call(this);
          var b = new v(this, null, x()), g = this._cancelHandlers.concat(this.oncancel ? [this.oncancel] : []);
          setTimeout(function() {
              g.forEach(function(d) {
                d.call(b.target, b);
              });
            },
            0);
        };
        var a = f.addEventListener;
        f.addEventListener = function(b, g) {
          'function' == typeof g && 'cancel' == b ? this._cancelHandlers.push(g) : a.call(this, b, g);
        };
        var c = f.removeEventListener;
        f.removeEventListener = function(b, g) {
          'cancel' == b ? (b = this._cancelHandlers.indexOf(g), 0 <= b && this._cancelHandlers.splice(b, 1)) : c.call(this, b, g);
        };
        return f;
      };
    }
  })();
  (function(x) {
    var v = document.documentElement, k = null, f = !1;
    try {
      var h = '0' == getComputedStyle(v).getPropertyValue('opacity') ? '1' : '0';
      k = v.animate({ opacity: [h, h] }, { duration: 1 });
      k.currentTime =
        0;
      f = getComputedStyle(v).getPropertyValue('opacity') == h;
    } catch (a) {
    } finally {
      k && k.cancel();
    }
    if (!f) {
      var e = window.Element.prototype.animate;
      window.Element.prototype.animate = function(a, c) {
        window.Symbol && Symbol.iterator && Array.prototype.from && a[Symbol.iterator] && (a = Array.from(a));
        Array.isArray(a) || null === a || (a = x.convertToArrayForm(a));
        return e.call(this, a, c);
      };
    }
  })(G);
  (function(x, v, k) {
    function f(c) {
      var b = v.timeline;
      b.currentTime = c;
      b._discardAnimations();
      0 == b._animations.length ? e = !1 : requestAnimationFrame(f);
    }

    var h =
      window.requestAnimationFrame;
    window.requestAnimationFrame = function(c) {
      return h(function(b) {
        v.timeline._updateAnimationsPromises();
        c(b);
        v.timeline._updateAnimationsPromises();
      });
    };
    v.AnimationTimeline = function() {
      this._animations = [];
      this.currentTime = void 0;
    };
    v.AnimationTimeline.prototype = {
      getAnimations: function() {
        this._discardAnimations();
        return this._animations.slice();
      }, _updateAnimationsPromises: function() {
        v.animationsWithPromises = v.animationsWithPromises.filter(function(c) {
          return c._updatePromises();
        });
      },
      _discardAnimations: function() {
        this._updateAnimationsPromises();
        this._animations = this._animations.filter(function(c) {
          return 'finished' != c.playState && 'idle' != c.playState;
        });
      }, _play: function(c) {
        c = new v.Animation(c, this);
        this._animations.push(c);
        v.restartWebAnimationsNextTick();
        c._updatePromises();
        c._animation.play();
        c._updatePromises();
        return c;
      }, play: function(c) {
        c && c.remove();
        return this._play(c);
      },
    };
    var e = !1;
    v.restartWebAnimationsNextTick = function() {
      e || (e = !0, requestAnimationFrame(f));
    };
    var a = new v.AnimationTimeline;
    v.timeline = a;
    try {
      Object.defineProperty(window.document, 'timeline', {
        configurable: !0, get: function() {
          return a;
        },
      });
    } catch (c) {
    }
    try {
      window.document.timeline = a;
    } catch (c$0) {
    }
  })(G, M, null);
  (function(x, v, k) {
    v.animationsWithPromises = [];
    v.Animation = function(f, h) {
      this.id = '';
      f && f._id && (this.id = f._id);
      if (this.effect = f) f._animation = this;
      if (!h) throw Error('Animation with null timeline is not supported');
      this._timeline = h;
      this._sequenceNumber = x.sequenceNumber++;
      this._holdTime = 0;
      this._isGroup = this._paused = !1;
      this._animation =
        null;
      this._childAnimations = [];
      this._callback = null;
      this._oldPlayState = 'idle';
      this._rebuildUnderlyingAnimation();
      this._animation.cancel();
      this._updatePromises();
    };
    v.Animation.prototype = {
      _updatePromises: function() {
        var f = this._oldPlayState, h = this.playState;
        this._readyPromise && h !== f && ('idle' == h ? (this._rejectReadyPromise(), this._readyPromise = void 0) : 'pending' == f ? this._resolveReadyPromise() : 'pending' == h && (this._readyPromise = void 0));
        this._finishedPromise && h !== f && ('idle' == h ? (this._rejectFinishedPromise(),
          this._finishedPromise = void 0) : 'finished' == h ? this._resolveFinishedPromise() : 'finished' == f && (this._finishedPromise = void 0));
        this._oldPlayState = this.playState;
        return this._readyPromise || this._finishedPromise;
      }, _rebuildUnderlyingAnimation: function() {
        this._updatePromises();
        var f = this._animation ? !0 : !1;
        if (f) {
          var h = this.playbackRate;
          var e = this._paused;
          var a = this.startTime;
          var c = this.currentTime;
          this._animation.cancel();
          this._animation = this._animation._wrapper = null;
        }
        if (!this.effect || this.effect instanceof window.KeyframeEffect) this._animation =
          v.newUnderlyingAnimationForKeyframeEffect(this.effect), v.bindAnimationForKeyframeEffect(this);
        if (this.effect instanceof window.SequenceEffect || this.effect instanceof window.GroupEffect) this._animation = v.newUnderlyingAnimationForGroup(this.effect), v.bindAnimationForGroup(this);
        this.effect && this.effect._onsample && v.bindAnimationForCustomEffect(this);
        f && (1 != h && (this.playbackRate = h), null !== a ? this.startTime = a : null !== c ? this.currentTime = c : null !== this._holdTime && (this.currentTime = this._holdTime), e && this.pause());
        this._updatePromises();
      }, _updateChildren: function() {
        if (this.effect && 'idle' != this.playState) {
          var f = this.effect._timing.delay;
          this._childAnimations.forEach(function(h) {
            this._arrangeChildren(h, f);
            this.effect instanceof window.SequenceEffect && (f += v.groupChildDuration(h.effect));
          }.bind(this));
        }
      }, _setExternalAnimation: function(f) {
        if (this.effect && this._isGroup) for (var h = 0; h < this.effect.children.length; h++) this.effect.children[h]._animation = f, this._childAnimations[h]._setExternalAnimation(f);
      }, _constructChildAnimations: function() {
        if (this.effect &&
          this._isGroup) {
          var f = this.effect._timing.delay;
          this._removeChildAnimations();
          this.effect.children.forEach(function(h) {
            var e = v.timeline._play(h);
            this._childAnimations.push(e);
            e.playbackRate = this.playbackRate;
            this._paused && e.pause();
            h._animation = this.effect._animation;
            this._arrangeChildren(e, f);
            this.effect instanceof window.SequenceEffect && (f += v.groupChildDuration(h));
          }.bind(this));
        }
      }, _arrangeChildren: function(f, h) {
        null === this.startTime ? f.currentTime = this.currentTime - h / this.playbackRate : f.startTime !==
          this.startTime + h / this.playbackRate && (f.startTime = this.startTime + h / this.playbackRate);
      }, get timeline() {
        return this._timeline;
      }, get playState() {
        return this._animation ? this._animation.playState : 'idle';
      }, get finished() {
        if (!window.Promise) return console.warn('Animation Promises require JavaScript Promise constructor'), null;
        this._finishedPromise || (-1 == v.animationsWithPromises.indexOf(this) && v.animationsWithPromises.push(this), this._finishedPromise = new Promise(function(f, h) {
          this._resolveFinishedPromise = function() {
            f(this);
          };
          this._rejectFinishedPromise = function() {
            h({ type: DOMException.ABORT_ERR, name: 'AbortError' });
          };
        }.bind(this)), 'finished' == this.playState && this._resolveFinishedPromise());
        return this._finishedPromise;
      }, get ready() {
        if (!window.Promise) return console.warn('Animation Promises require JavaScript Promise constructor'), null;
        this._readyPromise || (-1 == v.animationsWithPromises.indexOf(this) && v.animationsWithPromises.push(this), this._readyPromise = new Promise(function(f, h) {
          this._resolveReadyPromise = function() {
            f(this);
          };
          this._rejectReadyPromise = function() {
            h({ type: DOMException.ABORT_ERR, name: 'AbortError' });
          };
        }.bind(this)), 'pending' !== this.playState && this._resolveReadyPromise());
        return this._readyPromise;
      }, get onfinish() {
        return this._animation.onfinish;
      }, set onfinish(f) {
        this._animation.onfinish = 'function' == typeof f ? function(h) {
          h.target = this;
          f.call(this, h);
        }.bind(this) : f;
      }, get oncancel() {
        return this._animation.oncancel;
      }, set oncancel(f) {
        this._animation.oncancel = 'function' == typeof f ? function(h) {
            h.target = this;
            f.call(this, h);
          }.bind(this) :
          f;
      }, get currentTime() {
        this._updatePromises();
        var f = this._animation.currentTime;
        this._updatePromises();
        return f;
      }, set currentTime(f) {
        this._updatePromises();
        this._animation.currentTime = isFinite(f) ? f : Math.sign(f) * Number.MAX_VALUE;
        this._register();
        this._forEachChild(function(h, e) {
          h.currentTime = f - e;
        });
        this._updatePromises();
      }, get startTime() {
        return this._animation.startTime;
      }, set startTime(f) {
        this._updatePromises();
        this._animation.startTime = isFinite(f) ? f : Math.sign(f) * Number.MAX_VALUE;
        this._register();
        this._forEachChild(function(h,
                                    e) {
          h.startTime = f + e;
        });
        this._updatePromises();
      }, get playbackRate() {
        return this._animation.playbackRate;
      }, set playbackRate(f) {
        this._updatePromises();
        var h = this.currentTime;
        this._animation.playbackRate = f;
        this._forEachChild(function(e) {
          e.playbackRate = f;
        });
        null !== h && (this.currentTime = h);
        this._updatePromises();
      }, play: function() {
        this._updatePromises();
        this._paused = !1;
        this._animation.play();
        -1 == this._timeline._animations.indexOf(this) && this._timeline._animations.push(this);
        this._register();
        v.awaitStartTime(this);
        this._forEachChild(function(f) {
          var h = f.currentTime;
          f.play();
          f.currentTime = h;
        });
        this._updatePromises();
      }, pause: function() {
        this._updatePromises();
        this.currentTime && (this._holdTime = this.currentTime);
        this._animation.pause();
        this._register();
        this._forEachChild(function(f) {
          f.pause();
        });
        this._paused = !0;
        this._updatePromises();
      }, finish: function() {
        this._updatePromises();
        this._animation.finish();
        this._register();
        this._updatePromises();
      }, cancel: function() {
        this._updatePromises();
        this._animation.cancel();
        this._register();
        this._removeChildAnimations();
        this._updatePromises();
      }, reverse: function() {
        this._updatePromises();
        var f = this.currentTime;
        this._animation.reverse();
        this._forEachChild(function(h) {
          h.reverse();
        });
        null !== f && (this.currentTime = f);
        this._updatePromises();
      }, addEventListener: function(f, h) {
        var e = h;
        'function' == typeof h && (e = function(a) {
          a.target = this;
          h.call(this, a);
        }.bind(this), h._wrapper = e);
        this._animation.addEventListener(f, e);
      }, removeEventListener: function(f, h) {
        this._animation.removeEventListener(f, h && h._wrapper ||
          h);
      }, _removeChildAnimations: function() {
        for (; this._childAnimations.length;) this._childAnimations.pop().cancel();
      }, _forEachChild: function(f) {
        var h = 0;
        this.effect.children && this._childAnimations.length < this.effect.children.length && this._constructChildAnimations();
        this._childAnimations.forEach(function(c) {
          f.call(this, c, h);
          this.effect instanceof window.SequenceEffect && (h += c.effect.activeDuration);
        }.bind(this));
        if ('pending' != this.playState) {
          var e = this.effect._timing, a = this.currentTime;
          null !== a && (a = x.calculateIterationProgress(x.calculateActiveDuration(e),
            a, e));
          (null == a || isNaN(a)) && this._removeChildAnimations();
        }
      },
    };
    window.Animation = v.Animation;
  })(G, M, null);
  (function(x, v, k) {
    function f(d) {
      this._frames = x.normalizeKeyframes(d);
    }

    function h() {
      for (var d = !1; b.length;) b.shift()._updateChildren(), d = !0;
      return d;
    }

    var e = function(d) {
      d._animation = void 0;
      if (d instanceof window.SequenceEffect || d instanceof window.GroupEffect) for (var l = 0; l < d.children.length; l++) e(d.children[l]);
    };
    v.removeMulti = function(d) {
      for (var l = [], n = 0; n < d.length; n++) {
        var t = d[n];
        t._parent ? (-1 == l.indexOf(t._parent) &&
        l.push(t._parent), t._parent.children.splice(t._parent.children.indexOf(t), 1), t._parent = null, e(t)) : t._animation && t._animation.effect == t && (t._animation.cancel(), t._animation.effect = new KeyframeEffect(null, []), t._animation._callback && (t._animation._callback._animation = null), t._animation._rebuildUnderlyingAnimation(), e(t));
      }
      for (n = 0; n < l.length; n++) l[n]._rebuild();
    };
    v.KeyframeEffect = function(d, l, n, t) {
      this.target = d;
      this._parent = null;
      n = x.numericTimingToObject(n);
      this._timingInput = x.cloneTimingInput(n);
      this._timing =
        x.normalizeTimingInput(n);
      this.timing = x.makeTiming(n, !1, this);
      this.timing._effect = this;
      'function' == typeof l ? (x.deprecated('Custom KeyframeEffect', '2015-06-22', 'Use KeyframeEffect.onsample instead.'), this._normalizedKeyframes = l) : this._normalizedKeyframes = new f(l);
      this._keyframes = l;
      this.activeDuration = x.calculateActiveDuration(this._timing);
      this._id = t;
      return this;
    };
    v.KeyframeEffect.prototype = {
      getFrames: function() {
        return 'function' == typeof this._normalizedKeyframes ? this._normalizedKeyframes : this._normalizedKeyframes._frames;
      },
      set onsample(d) {
        if ('function' == typeof this.getFrames()) throw Error('Setting onsample on custom effect KeyframeEffect is not supported.');
        this._onsample = d;
        this._animation && this._animation._rebuildUnderlyingAnimation();
      }, get parent() {
        return this._parent;
      }, clone: function() {
        if ('function' == typeof this.getFrames()) throw Error('Cloning custom effects is not supported.');
        var d = new KeyframeEffect(this.target, [], x.cloneTimingInput(this._timingInput), this._id);
        d._normalizedKeyframes = this._normalizedKeyframes;
        d._keyframes = this._keyframes;
        return d;
      }, remove: function() {
        v.removeMulti([this]);
      },
    };
    var a = Element.prototype.animate;
    Element.prototype.animate = function(d, l) {
      var n = '';
      l && l.id && (n = l.id);
      return v.timeline._play(new v.KeyframeEffect(this, d, l, n));
    };
    var c = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    v.newUnderlyingAnimationForKeyframeEffect = function(d) {
      if (d) {
        var l = d.target || c, n = d._keyframes;
        'function' == typeof n && (n = []);
        var t = d._timingInput;
        t.id = d._id;
      } else l = c, n = [], t = 0;
      return a.apply(l, [n, t]);
    };
    v.bindAnimationForKeyframeEffect = function(d) {
      d.effect && 'function' == typeof d.effect._normalizedKeyframes && v.bindAnimationForCustomEffect(d);
    };
    var b = [];
    v.awaitStartTime = function(d) {
      null === d.startTime && d._isGroup && (0 == b.length && requestAnimationFrame(h), b.push(d));
    };
    var g = window.getComputedStyle;
    Object.defineProperty(window, 'getComputedStyle', {
      configurable: !0, enumerable: !0, value: function() {
        v.timeline._updateAnimationsPromises();
        var d = g.apply(this, arguments);
        h() && (d = g.apply(this, arguments));
        v.timeline._updateAnimationsPromises();
        return d;
      },
    });
    window.KeyframeEffect = v.KeyframeEffect;
    window.Element.prototype.getAnimations = function() {
      return document.timeline.getAnimations().filter(function(d) {
        return null !== d.effect && d.effect.target == this;
      }.bind(this));
    };
  })(G, M, null);
  (function(x, v, k) {
    function f(b) {
      b._registered || (b._registered = !0, a.push(b), c || (c = !0, requestAnimationFrame(h)));
    }

    function h(b) {
      b = a;
      a = [];
      b.sort(function(g, d) {
        return g._sequenceNumber - d._sequenceNumber;
      });
      b = b.filter(function(g) {
        g();
        var d = g._animation ? g._animation.playState :
          'idle';
        'running' != d && 'pending' != d && (g._registered = !1);
        return g._registered;
      });
      a.push.apply(a, b);
      a.length ? (c = !0, requestAnimationFrame(h)) : c = !1;
    }

    document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    var e = 0;
    v.bindAnimationForCustomEffect = function(b) {
      var g = b.effect.target, d = 'function' == typeof b.effect.getFrames();
      var l = d ? b.effect.getFrames() : b.effect._onsample;
      var n = b.effect.timing, t = null;
      n = x.normalizeTimingInput(n);
      var p = function() {
        var q = p._animation ? p._animation.currentTime : null;
        null !== q && (q =
          x.calculateIterationProgress(x.calculateActiveDuration(n), q, n), isNaN(q) && (q = null));
        q !== t && (d ? l(q, g, b.effect) : l(q, b.effect, b.effect._animation));
        t = q;
      };
      p._animation = b;
      p._registered = !1;
      p._sequenceNumber = e++;
      b._callback = p;
      f(p);
    };
    var a = [], c = !1;
    v.Animation.prototype._register = function() {
      this._callback && f(this._callback);
    };
  })(G, M, null);
  (function(x, v, k) {
    function f(e) {
      return e._timing.delay + e.activeDuration + e._timing.endDelay;
    }

    function h(e, a, c) {
      this._id = c;
      this._parent = null;
      this.children = e || [];
      this._reparent(this.children);
      a = x.numericTimingToObject(a);
      this._timingInput = x.cloneTimingInput(a);
      this._timing = x.normalizeTimingInput(a, !0);
      this.timing = x.makeTiming(a, !0, this);
      this.timing._effect = this;
      'auto' === this._timing.duration && (this._timing.duration = this.activeDuration);
    }

    window.SequenceEffect = function() {
      h.apply(this, arguments);
    };
    window.GroupEffect = function() {
      h.apply(this, arguments);
    };
    h.prototype = {
      _isAncestor: function(e) {
        for (var a = this; null !== a;) {
          if (a == e) return !0;
          a = a._parent;
        }
        return !1;
      }, _rebuild: function() {
        for (var e = this; e;) 'auto' ===
        e.timing.duration && (e._timing.duration = e.activeDuration), e = e._parent;
        this._animation && this._animation._rebuildUnderlyingAnimation();
      }, _reparent: function(e) {
        v.removeMulti(e);
        for (var a = 0; a < e.length; a++) e[a]._parent = this;
      }, _putChild: function(e, a) {
        for (var c = a ? 'Cannot append an ancestor or self' : 'Cannot prepend an ancestor or self', b = 0; b < e.length; b++) if (this._isAncestor(e[b])) throw{
          type: DOMException.HIERARCHY_REQUEST_ERR,
          name: 'HierarchyRequestError',
          message: c,
        };
        for (b = 0; b < e.length; b++) a ? this.children.push(e[b]) :
          this.children.unshift(e[b]);
        this._reparent(e);
        this._rebuild();
      }, append: function() {
        this._putChild(arguments, !0);
      }, prepend: function() {
        this._putChild(arguments, !1);
      }, get parent() {
        return this._parent;
      }, get firstChild() {
        return this.children.length ? this.children[0] : null;
      }, get lastChild() {
        return this.children.length ? this.children[this.children.length - 1] : null;
      }, clone: function() {
        for (var e = x.cloneTimingInput(this._timingInput), a = [], c = 0; c < this.children.length; c++) a.push(this.children[c].clone());
        return this instanceof
        GroupEffect ? new GroupEffect(a, e) : new SequenceEffect(a, e);
      }, remove: function() {
        v.removeMulti([this]);
      },
    };
    window.SequenceEffect.prototype = Object.create(h.prototype);
    Object.defineProperty(window.SequenceEffect.prototype, 'activeDuration', {
      get: function() {
        var e = 0;
        this.children.forEach(function(a) {
          e += f(a);
        });
        return Math.max(e, 0);
      },
    });
    window.GroupEffect.prototype = Object.create(h.prototype);
    Object.defineProperty(window.GroupEffect.prototype, 'activeDuration', {
      get: function() {
        var e = 0;
        this.children.forEach(function(a) {
          e =
            Math.max(e, f(a));
        });
        return e;
      },
    });
    v.newUnderlyingAnimationForGroup = function(e) {
      var a, c = null;
      e = new KeyframeEffect(null, [], e._timing, e._id);
      e.onsample = function(b) {
        var g = a._wrapper;
        g && 'pending' != g.playState && g.effect && (null == b ? g._removeChildAnimations() : 0 == b && 0 > g.playbackRate && (c || (c = x.normalizeTimingInput(g.effect.timing)), b = x.calculateIterationProgress(x.calculateActiveDuration(c), -1, c), isNaN(b) || null == b) && (g._forEachChild(function(d) {
          d.currentTime = -1;
        }), g._removeChildAnimations()));
      };
      return a = v.timeline._play(e);
    };
    v.bindAnimationForGroup = function(e) {
      e._animation._wrapper = e;
      e._isGroup = !0;
      v.awaitStartTime(e);
      e._constructChildAnimations();
      e._setExternalAnimation(e);
    };
    v.groupChildDuration = f;
  })(G, M, null);
})();
'use strict';
var m, aa = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
  };
}, q = function(a) {
  var b = 'undefined' != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : { next: aa(a) };
}, ba = function(a) {
  if (a instanceof Array) return a;
  a = q(a);
  for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
  return a = c;
}, ca = 'function' == typeof Object.create ? Object.create : function(a) {
  var b = function() {
  };
  b.prototype = a;
  return new b;
}, da;
if ('function' == typeof Object.setPrototypeOf) da = Object.setPrototypeOf; else {
  var ea;
  a:{
    var fa = { a: !0 }, ha = {};
    try {
      ha.__proto__ = fa;
      ea = ha.a;
      break a;
    } catch (a) {
    }
    ea = !1;
  }
  da = ea ? function(a, b) {
    a.__proto__ = b;
    if (a.__proto__ !== b) throw new TypeError(a + ' is not extensible');
    return a;
  } : null;
}
var ia = da, w = function(a, b) {
    a.prototype = ca(b.prototype);
    a.prototype.constructor = a;
    if (ia) ia(a, b); else for (var c in b) if ('prototype' != c) if (Object.defineProperties) {
      var d = Object.getOwnPropertyDescriptor(b, c);
      d && Object.defineProperty(a, c, d);
    } else a[c] = b[c];
    a.superClass_ = b.prototype;
  },
  x = 'undefined' != typeof window && window === this ? this : 'undefined' != typeof global && null != global ? global : this,
  ja = 'function' == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    a != Array.prototype && a != Object.prototype &&
    (a[b] = c.value);
  }, y = function(a, b) {
    if (b) {
      var c = x;
      a = a.split('.');
      for (var d = 0; d < a.length - 1; d++) {
        var e = a[d];
        e in c || (c[e] = {});
        c = c[e];
      }
      a = a[a.length - 1];
      d = c[a];
      b = b(d);
      b != d && null != b && ja(c, a, { configurable: !0, writable: !0, value: b });
    }
  };
y('Array.prototype.find', function(a) {
  return a ? a : a = function(b, c) {
    a:{
      var d = this;
      d instanceof String && (d = String(d));
      for (var e = d.length, f = 0; f < e; f++) {
        var g = d[f];
        if (b.call(c, g, f, d)) {
          d = g;
          break a;
        }
      }
      d = void 0;
    }
    return d;
  };
}, 'es6', 'es3');
y('Object.setPrototypeOf', function(a) {
  return a || ia;
}, 'es6', 'es5');
var ka = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}, la = 'function' == typeof Object.assign ? Object.assign : function(a, b) {
  for (var c = 1; c < arguments.length; c++) {
    var d = arguments[c];
    if (d) for (var e in d) ka(d, e) && (a[e] = d[e]);
  }
  return a;
};
y('Object.assign', function(a) {
  return a || la;
}, 'es6', 'es3');
y('Promise', function(a) {
  function b() {
    this.batch_ = null;
  }

  function c(l) {
    return l instanceof k ? l : new k(function(n) {
      n(l);
    });
  }

  if (a) return a;
  b.prototype.asyncExecute = function(l) {
    if (null == this.batch_) {
      this.batch_ = [];
      var n = this;
      this.asyncExecuteFunction(function() {
        n.executeBatch_();
      });
    }
    this.batch_.push(l);
  };
  var d = x.setTimeout;
  b.prototype.asyncExecuteFunction = function(l) {
    d(l, 0);
  };
  b.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var l = this.batch_;
      this.batch_ = [];
      for (var n = 0; n < l.length; ++n) {
        var p =
          l[n];
        l[n] = null;
        try {
          p();
        } catch (r) {
          this.asyncThrow_(r);
        }
      }
    }
    this.batch_ = null;
  };
  b.prototype.asyncThrow_ = function(l) {
    this.asyncExecuteFunction(function() {
      throw l;
    });
  };
  var e = 0, f = 1, g = 2, k = function(l) {
    this.state_ = e;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var n = this.createResolveAndReject_();
    try {
      l(n.resolve, n.reject);
    } catch (p) {
      n.reject(p);
    }
  };
  k.prototype.createResolveAndReject_ = function() {
    function l(r) {
      return function(t) {
        p || (p = !0, r.call(n, t));
      };
    }

    var n = this, p = !1;
    return { resolve: l(this.resolveTo_), reject: l(this.reject_) };
  };
  k.prototype.resolveTo_ = function(l) {
    if (l === this) this.reject_(new TypeError('A Promise cannot resolve to itself')); else if (l instanceof k) this.settleSameAsPromise_(l); else {
      a:switch (typeof l) {
        case 'object':
          var n = null != l;
          break a;
        case 'function':
          n = !0;
          break a;
        default:
          n = !1;
      }
      n ? this.resolveToNonPromiseObj_(l) : this.fulfill_(l);
    }
  };
  k.prototype.resolveToNonPromiseObj_ = function(l) {
    var n = void 0;
    try {
      n = l.then;
    } catch (p) {
      this.reject_(p);
      return;
    }
    'function' == typeof n ? this.settleSameAsThenable_(n, l) : this.fulfill_(l);
  };
  k.prototype.reject_ =
    function(l) {
      this.settle_(g, l);
    };
  k.prototype.fulfill_ = function(l) {
    this.settle_(f, l);
  };
  k.prototype.settle_ = function(l, n) {
    if (this.state_ != e) throw Error('Cannot settle(' + l + ', ' + n + '): Promise already settled in state' + this.state_);
    this.state_ = l;
    this.result_ = n;
    this.executeOnSettledCallbacks_();
  };
  k.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var l = 0; l < this.onSettledCallbacks_.length; ++l) h.asyncExecute(this.onSettledCallbacks_[l]);
      this.onSettledCallbacks_ = null;
    }
  };
  var h =
    new b;
  k.prototype.settleSameAsPromise_ = function(l) {
    var n = this.createResolveAndReject_();
    l.callWhenSettled_(n.resolve, n.reject);
  };
  k.prototype.settleSameAsThenable_ = function(l, n) {
    var p = this.createResolveAndReject_();
    try {
      l.call(n, p.resolve, p.reject);
    } catch (r) {
      p.reject(r);
    }
  };
  k.prototype.then = function(l, n) {
    function p(u, A) {
      return 'function' == typeof u ? function(E) {
        try {
          r(u(E));
        } catch (J) {
          t(J);
        }
      } : A;
    }

    var r, t, v = new k(function(u, A) {
      r = u;
      t = A;
    });
    this.callWhenSettled_(p(l, r), p(n, t));
    return v;
  };
  k.prototype.catch = function(l) {
    return this.then(void 0,
      l);
  };
  k.prototype.callWhenSettled_ = function(l, n) {
    function p() {
      switch (r.state_) {
        case f:
          l(r.result_);
          break;
        case g:
          n(r.result_);
          break;
        default:
          throw Error('Unexpected state: ' + r.state_);
      }
    }

    var r = this;
    null == this.onSettledCallbacks_ ? h.asyncExecute(p) : this.onSettledCallbacks_.push(p);
  };
  k.resolve = c;
  k.reject = function(l) {
    return new k(function(n, p) {
      p(l);
    });
  };
  k.race = function(l) {
    return new k(function(n, p) {
      for (var r = q(l), t = r.next(); !t.done; t = r.next()) c(t.value).callWhenSettled_(n, p);
    });
  };
  k.all = function(l) {
    var n = q(l), p =
      n.next();
    return p.done ? c([]) : new k(function(r, t) {
      function v(E) {
        return function(J) {
          u[E] = J;
          A--;
          0 == A && r(u);
        };
      }

      var u = [], A = 0;
      do u.push(void 0), A++, c(p.value).callWhenSettled_(v(u.length - 1), t), p = n.next(); while (!p.done);
    });
  };
  return k;
}, 'es6', 'es3');
var ma = function() {
  function a() {
    function e() {
    }

    function f() {
    }

    new e;
    Reflect.construct(e, [], f);
    return new e instanceof e;
  }

  function b(e, f, g) {
    void 0 === g && (g = e);
    g = g.prototype || Object.prototype;
    g = ca(g);
    var k = Function.prototype.apply;
    return (e = k.call(e, g, f)) || g;
  }

  if ('undefined' != typeof Reflect && Reflect.construct) {
    if (a()) return Reflect.construct;
    var c = Reflect.construct, d = function(e, f, g) {
      e = c(e, f);
      g && Reflect.setPrototypeOf(e, g.prototype);
      return e;
    };
    return d;
  }
  return b;
}();
y('Reflect.construct', function() {
  return ma;
}, 'es6', 'es3');
var na = function() {
  na = function() {
  };
  x.Symbol || (x.Symbol = oa);
}, pa = function(a, b) {
  this.$jscomp$symbol$id_ = a;
  ja(this, 'description', { configurable: !0, writable: !0, value: b });
};
pa.prototype.toString = function() {
  return this.$jscomp$symbol$id_;
};
var oa = function() {
  function a(c) {
    if (this instanceof a) throw new TypeError('Symbol is not a constructor');
    return new pa('jscomp_symbol_' + (c || '') + '_' + b++, c);
  }

  var b = 0;
  return a;
}(), ra = function() {
  na();
  var a = x.Symbol.iterator;
  a || (a = x.Symbol.iterator = x.Symbol('Symbol.iterator'));
  'function' != typeof Array.prototype[a] && ja(Array.prototype, a, {
    configurable: !0,
    writable: !0,
    value: function() {
      return qa(aa(this));
    },
  });
  ra = function() {
  };
}, qa = function(a) {
  ra();
  a = { next: a };
  a[x.Symbol.iterator] = function() {
    return this;
  };
  return a;
};
y('WeakMap', function(a) {
  function b() {
    if (!a || !Object.seal) return !1;
    try {
      var h = Object.seal({}), l = Object.seal({}), n = new a([[h, 2], [l, 3]]);
      if (2 != n.get(h) || 3 != n.get(l)) return !1;
      n.delete(h);
      n.set(l, 4);
      return !n.has(h) && 4 == n.get(l);
    } catch (p) {
      return !1;
    }
  }

  function c() {
  }

  function d(h) {
    if (!ka(h, f)) {
      var l = new c;
      ja(h, f, { value: l });
    }
  }

  function e(h) {
    var l = Object[h];
    l && (Object[h] = function(n) {
      if (n instanceof c) return n;
      d(n);
      return l(n);
    });
  }

  if (b()) return a;
  var f = '$jscomp_hidden_' + Math.random();
  e('freeze');
  e('preventExtensions');
  e('seal');
  var g = 0, k = function(h) {
    this.id_ = (g += Math.random() + 1).toString();
    if (h) {
      h = q(h);
      for (var l; !(l = h.next()).done;) l = l.value, this.set(l[0], l[1]);
    }
  };
  k.prototype.set = function(h, l) {
    d(h);
    if (!ka(h, f)) throw Error('WeakMap key fail: ' + h);
    h[f][this.id_] = l;
    return this;
  };
  k.prototype.get = function(h) {
    return ka(h, f) ? h[f][this.id_] : void 0;
  };
  k.prototype.has = function(h) {
    return ka(h, f) && ka(h[f], this.id_);
  };
  k.prototype.delete = function(h) {
    return ka(h, f) && ka(h[f], this.id_) ? delete h[f][this.id_] : !1;
  };
  return k;
}, 'es6', 'es3');
y('Map', function(a) {
  function b() {
    if (!a || 'function' != typeof a || !a.prototype.entries || 'function' != typeof Object.seal) return !1;
    try {
      var h = Object.seal({ x: 4 }), l = new a(q([[h, 's']]));
      if ('s' != l.get(h) || 1 != l.size || l.get({ x: 4 }) || l.set({ x: 4 }, 't') != l || 2 != l.size) return !1;
      var n = l.entries(), p = n.next();
      if (p.done || p.value[0] != h || 's' != p.value[1]) return !1;
      p = n.next();
      return p.done || 4 != p.value[0].x || 't' != p.value[1] || !n.next().done ? !1 : !0;
    } catch (r) {
      return !1;
    }
  }

  if (b()) return a;
  ra();
  var c = new WeakMap, d = function(h) {
    this.data_ =
      {};
    this.head_ = g();
    this.size = 0;
    if (h) {
      h = q(h);
      for (var l; !(l = h.next()).done;) l = l.value, this.set(l[0], l[1]);
    }
  };
  d.prototype.set = function(h, l) {
    h = 0 === h ? 0 : h;
    var n = e(this, h);
    n.list || (n.list = this.data_[n.id] = []);
    n.entry ? n.entry.value = l : (n.entry = {
      next: this.head_,
      previous: this.head_.previous,
      head: this.head_,
      key: h,
      value: l,
    }, n.list.push(n.entry), this.head_.previous.next = n.entry, this.head_.previous = n.entry, this.size++);
    return this;
  };
  d.prototype.delete = function(h) {
    h = e(this, h);
    return h.entry && h.list ? (h.list.splice(h.index,
      1), h.list.length || delete this.data_[h.id], h.entry.previous.next = h.entry.next, h.entry.next.previous = h.entry.previous, h.entry.head = null, this.size--, !0) : !1;
  };
  d.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = g();
    this.size = 0;
  };
  d.prototype.has = function(h) {
    return !!e(this, h).entry;
  };
  d.prototype.get = function(h) {
    return (h = e(this, h).entry) && h.value;
  };
  d.prototype.entries = function() {
    return f(this, function(h) {
      return [h.key, h.value];
    });
  };
  d.prototype.keys = function() {
    return f(this, function(h) {
      return h.key;
    });
  };
  d.prototype.values = function() {
    return f(this, function(h) {
      return h.value;
    });
  };
  d.prototype.forEach = function(h, l) {
    for (var n = this.entries(), p; !(p = n.next()).done;) p = p.value, h.call(l, p[1], p[0], this);
  };
  d.prototype[Symbol.iterator] = d.prototype.entries;
  var e = function(h, l) {
    var n;
    var p = (n = l) && typeof n;
    'object' == p || 'function' == p ? c.has(n) ? n = c.get(n) : (p = '' + ++k, c.set(n, p), n = p) : n = 'p_' + n;
    if ((p = h.data_[n]) && ka(h.data_, n)) for (h = 0; h < p.length; h++) {
      var r = p[h];
      if (l !== l && r.key !== r.key || l === r.key) return {
        id: n, list: p, index: h,
        entry: r,
      };
    }
    return { id: n, list: p, index: -1, entry: void 0 };
  }, f = function(h, l) {
    var n = h.head_;
    return qa(function() {
      if (n) {
        for (; n.head != h.head_;) n = n.previous;
        for (; n.next != n.head;) return n = n.next, { done: !1, value: l(n) };
        n = null;
      }
      return { done: !0, value: void 0 };
    });
  }, g = function() {
    var h = {};
    return h.previous = h.next = h.head = h;
  }, k = 0;
  return d;
}, 'es6', 'es3');
y('Array.from', function(a) {
  return a ? a : a = function(b, c, d) {
    c = null != c ? c : function(k) {
      return k;
    };
    var e = [], f = 'undefined' != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
    if ('function' == typeof f) {
      b = f.call(b);
      for (var g = 0; !(f = b.next()).done;) e.push(c.call(d, f.value, g++));
    } else for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
    return e;
  };
}, 'es6', 'es3');
y('Set', function(a) {
  function b() {
    if (!a || 'function' != typeof a || !a.prototype.entries || 'function' != typeof Object.seal) return !1;
    try {
      var d = Object.seal({ x: 4 }), e = new a(q([d]));
      if (!e.has(d) || 1 != e.size || e.add(d) != e || 1 != e.size || e.add({ x: 4 }) != e || 2 != e.size) return !1;
      var f = e.entries(), g = f.next();
      if (g.done || g.value[0] != d || g.value[1] != d) return !1;
      g = f.next();
      return g.done || g.value[0] == d || 4 != g.value[0].x || g.value[1] != g.value[0] ? !1 : f.next().done;
    } catch (k) {
      return !1;
    }
  }

  if (b()) return a;
  ra();
  var c = function(d) {
    this.map_ = new Map;
    if (d) {
      d = q(d);
      for (var e; !(e = d.next()).done;) e = e.value, this.add(e);
    }
    this.size = this.map_.size;
  };
  c.prototype.add = function(d) {
    d = 0 === d ? 0 : d;
    this.map_.set(d, d);
    this.size = this.map_.size;
    return this;
  };
  c.prototype.delete = function(d) {
    d = this.map_.delete(d);
    this.size = this.map_.size;
    return d;
  };
  c.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  c.prototype.has = function(d) {
    return this.map_.has(d);
  };
  c.prototype.entries = function() {
    return this.map_.entries();
  };
  c.prototype.values = function() {
    return this.map_.values();
  };
  c.prototype.keys = c.prototype.values;
  c.prototype[Symbol.iterator] = c.prototype.values;
  c.prototype.forEach = function(d, e) {
    var f = this;
    this.map_.forEach(function(g) {
      return d.call(e, g, g, f);
    });
  };
  return c;
}, 'es6', 'es3');
y('Object.is', function(a) {
  return a ? a : a = function(b, c) {
    return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
  };
}, 'es6', 'es3');
y('Array.prototype.includes', function(a) {
  return a ? a : a = function(b, c) {
    var d = this;
    d instanceof String && (d = String(d));
    var e = d.length;
    c = c || 0;
    for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
      var f = d[c];
      if (f === b || Object.is(f, b)) return !0;
    }
    return !1;
  };
}, 'es7', 'es3');
var sa = this, ta = function(a) {
  return void 0 !== a;
}, va = function(a) {
  return 'string' == typeof a;
}, wa = null, z = function(a) {
  var b = typeof a;
  if ('object' == b) if (a) {
    if (a instanceof Array) return 'array';
    if (a instanceof Object) return b;
    var c = Object.prototype.toString.call(a);
    if ('[object Window]' == c) return 'object';
    if ('[object Array]' == c || 'number' == typeof a.length && 'undefined' != typeof a.splice && 'undefined' != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable('splice')) return 'array';
    if ('[object Function]' == c || 'undefined' !=
      typeof a.call && 'undefined' != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable('call')) return 'function';
  } else return 'null'; else if ('function' == b && 'undefined' == typeof a.call) return 'object';
  return b;
}, xa = function(a, b, c) {
  return a.call.apply(a.bind, arguments);
}, ya = function(a, b, c) {
  if (!a) throw Error();
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var e = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(e, d);
      return a.apply(b, e);
    };
  }
  return function() {
    return a.apply(b,
      arguments);
  };
}, za = function(a, b, c) {
  za = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf('native code') ? xa : ya;
  return za.apply(null, arguments);
}, Aa = function(a, b) {
  function c() {
  }

  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a;
  a.base = function(d, e, f) {
    for (var g = Array(arguments.length - 2), k = 2; k < arguments.length; k++) g[k - 2] = arguments[k];
    return b.prototype[e].apply(d, g);
  };
};
var Ba = function(a) {
  if (Error.captureStackTrace) Error.captureStackTrace(this, Ba); else {
    var b = Error().stack;
    b && (this.stack = b);
  }
  a && (this.message = String(a));
  this.reportErrorToServer = !0;
};
Aa(Ba, Error);
Ba.prototype.name = 'CustomError';
var Da = function(a, b) {
  Ba.call(this, Ca(a, b));
  this.messagePattern = a;
};
Aa(Da, Ba);
Da.prototype.name = 'AssertionError';
var Ea = function(a) {
  throw a;
}, Fa = Ea, Ca = function(a, b) {
  a = a.split('%s');
  for (var c = '', d = a.length - 1, e = 0; e < d; e++) {
    var f = e < b.length ? b[e] : '%s';
    c += a[e] + f;
  }
  return c + a[d];
}, Ga = function(a, b, c, d) {
  var e = 'Assertion failed';
  if (c) {
    e += ': ' + c;
    var f = d;
  } else a && (e += ': ' + a, f = b);
  a = new Da('' + e, f || []);
  Fa(a);
}, B = function(a, b, c) {
  a || Ga('', null, b, Array.prototype.slice.call(arguments, 2));
  return a;
}, C = function(a, b) {
  Fa(new Da('Failure' + (a ? ': ' + a : ''), Array.prototype.slice.call(arguments, 1)));
}, Ha = function(a, b, c) {
  va(a) || Ga('Expected string but got %s: %s.',
    [z(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
}, Ia = function(a, b, c) {
  'array' == z(a) || Ga('Expected array but got %s: %s.', [z(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
var Ja = Array.prototype.map ? function(a, b, c) {
  B(null != a.length);
  return Array.prototype.map.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = Array(d), f = va(a) ? a.split('') : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
  return e;
};
var D = function(a) {
  this.tagName_ = a;
};
D.prototype.toString = function() {
  return this.tagName_;
};
new D('A');
new D('ABBR');
new D('ACRONYM');
new D('ADDRESS');
new D('APPLET');
new D('AREA');
new D('ARTICLE');
new D('ASIDE');
new D('AUDIO');
new D('B');
new D('BASE');
new D('BASEFONT');
new D('BDI');
new D('BDO');
new D('BIG');
new D('BLOCKQUOTE');
new D('BODY');
new D('BR');
new D('BUTTON');
new D('CANVAS');
new D('CAPTION');
new D('CENTER');
new D('CITE');
new D('CODE');
new D('COL');
new D('COLGROUP');
new D('COMMAND');
new D('DATA');
new D('DATALIST');
new D('DD');
new D('DEL');
new D('DETAILS');
new D('DFN');
new D('DIALOG');
new D('DIR');
new D('DIV');
new D('DL');
new D('DT');
new D('EM');
new D('EMBED');
new D('FIELDSET');
new D('FIGCAPTION');
new D('FIGURE');
new D('FONT');
new D('FOOTER');
new D('FORM');
new D('FRAME');
new D('FRAMESET');
new D('H1');
new D('H2');
new D('H3');
new D('H4');
new D('H5');
new D('H6');
new D('HEAD');
new D('HEADER');
new D('HGROUP');
new D('HR');
new D('HTML');
new D('I');
new D('IFRAME');
new D('IMG');
new D('INPUT');
new D('INS');
new D('ISINDEX');
new D('KBD');
new D('KEYGEN');
new D('LABEL');
new D('LEGEND');
new D('LI');
new D('LINK');
new D('MAIN');
new D('MAP');
new D('MARK');
new D('MATH');
new D('MENU');
new D('MENUITEM');
new D('META');
new D('METER');
new D('NAV');
new D('NOFRAMES');
new D('NOSCRIPT');
new D('OBJECT');
new D('OL');
new D('OPTGROUP');
new D('OPTION');
new D('OUTPUT');
new D('P');
new D('PARAM');
new D('PICTURE');
new D('PRE');
new D('PROGRESS');
new D('Q');
new D('RP');
new D('RT');
new D('RTC');
new D('RUBY');
new D('S');
new D('SAMP');
new D('SCRIPT');
new D('SECTION');
new D('SELECT');
new D('SMALL');
new D('SOURCE');
new D('SPAN');
new D('STRIKE');
new D('STRONG');
new D('STYLE');
new D('SUB');
new D('SUMMARY');
new D('SUP');
new D('SVG');
new D('TABLE');
new D('TBODY');
new D('TD');
new D('TEMPLATE');
new D('TEXTAREA');
new D('TFOOT');
new D('TH');
new D('THEAD');
new D('TIME');
new D('TITLE');
new D('TR');
new D('TRACK');
new D('TT');
new D('U');
new D('UL');
new D('VAR');
new D('VIDEO');
new D('WBR');
var H = function(a, b) {
  this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = a === Ka && b || '';
  this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = La;
};
H.prototype.implementsGoogStringTypedString = !0;
H.prototype.getTypedStringValue = function() {
  return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
};
H.prototype.toString = function() {
  return 'Const{' + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + '}';
};
var Ma = function(a) {
  if (a instanceof H && a.constructor === H && a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === La) return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
  C('expected object of type Const, got \'' + a + '\'');
  return 'type_error:Const';
}, La = {}, Ka = {};
new H(Ka, '');
var Oa = function() {
  this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = '';
  this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = Na;
};
Oa.prototype.implementsGoogStringTypedString = !0;
var Na = {};
Oa.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeScriptWrappedValue_.toString();
};
Oa.prototype.toString = function() {
  return 'SafeScript{' + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + '}';
};
var Pa = function(a) {
  a instanceof Oa && a.constructor === Oa && a.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === Na ? a = a.privateDoNotAccessOrElseSafeScriptWrappedValue_ : (C('expected object of type SafeScript, got \'' + a + '\' of type ' + z(a)), a = 'type_error:SafeScript');
  return a.toString();
};
Oa.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
  this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = a;
  return this;
};
(new Oa).initSecurityPrivateDoNotAccessOrElse_('');
var Ra = function() {
  this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = '';
  this.trustedURL_ = null;
  this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = Qa;
};
m = Ra.prototype;
m.implementsGoogStringTypedString = !0;
m.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_.toString();
};
m.implementsGoogI18nBidiDirectionalString = !0;
m.getDirection = function() {
  return 1;
};
m.cloneWithParams = function(a, b) {
  var c = Sa(this), d = Ta.exec(c);
  c = d[1];
  var e = d[2] || '';
  d = d[3] || '';
  return Ua(c + Va('?', e, a) + Va('#', d, b));
};
m.toString = function() {
  return 'TrustedResourceUrl{' + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + '}';
};
var Sa = function(a) {
    a instanceof Ra && a.constructor === Ra && a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === Qa ? a = a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ : (C('expected object of type TrustedResourceUrl, got \'' + a + '\' of type ' + z(a)), a = 'type_error:TrustedResourceUrl');
    return a.toString();
  }, Ya = function(a, b) {
    var c = Ma(a);
    if (!Wa.test(c)) throw Error('Invalid TrustedResourceUrl format: ' + c);
    a = c.replace(Xa, function(d, e) {
      if (!Object.prototype.hasOwnProperty.call(b, e)) throw Error('Found marker, "' +
        e + '", in format string, "' + c + '", but no valid label mapping found in args: ' + JSON.stringify(b));
      d = b[e];
      return d instanceof H ? Ma(d) : encodeURIComponent(String(d));
    });
    return Ua(a);
  }, Xa = /%{(\w+)}/g, Wa = /^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i,
  Ta = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/, Qa = {}, Ua = function(a) {
    var b = new Ra;
    b.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = a;
    return b;
  }, Va = function(a, b, c) {
    if (null == c) return b;
    if (va(c)) return c ? a + encodeURIComponent(c) :
      '';
    for (var d in c) {
      var e = c[d];
      e = 'array' == z(e) ? e : [e];
      for (var f = 0; f < e.length; f++) {
        var g = e[f];
        null != g && (b || (b = a), b += (b.length > a.length ? '&' : '') + encodeURIComponent(d) + '=' + encodeURIComponent(String(g)));
      }
    }
    return b;
  };
var Za = /&/g, $a = /</g, ab = />/g, bb = /"/g, cb = /'/g, db = /\x00/g, eb = /[\x00&<>"']/;
var gb = function() {
  this.privateDoNotAccessOrElseSafeUrlWrappedValue_ = '';
  this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = fb;
};
m = gb.prototype;
m.implementsGoogStringTypedString = !0;
m.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString();
};
m.implementsGoogI18nBidiDirectionalString = !0;
m.getDirection = function() {
  return 1;
};
m.toString = function() {
  return 'SafeUrl{' + this.privateDoNotAccessOrElseSafeUrlWrappedValue_ + '}';
};
var hb = function(a) {
    a instanceof gb && a.constructor === gb && a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === fb ? a = a.privateDoNotAccessOrElseSafeUrlWrappedValue_ : (C('expected object of type SafeUrl, got \'' + a + '\' of type ' + z(a)), a = 'type_error:SafeUrl');
    return a.toString();
  }, ib = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i, kb = function(a) {
    if (a instanceof gb) return a;
    a = 'object' == typeof a && a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
    ib.test(a) || (a = 'about:invalid#zClosurez');
    return jb(a);
  },
  fb = {}, jb = function(a) {
    var b = new gb;
    b.privateDoNotAccessOrElseSafeUrlWrappedValue_ = a;
    return b;
  };
jb('about:blank');
var mb = function() {
  this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = '';
  this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = lb;
};
mb.prototype.implementsGoogStringTypedString = !0;
var lb = {};
mb.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeStyleWrappedValue_;
};
mb.prototype.toString = function() {
  return 'SafeStyle{' + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + '}';
};
var nb = function(a) {
  if (a instanceof mb && a.constructor === mb && a.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === lb) return a.privateDoNotAccessOrElseSafeStyleWrappedValue_;
  C('expected object of type SafeStyle, got \'' + a + '\' of type ' + z(a));
  return 'type_error:SafeStyle';
};
mb.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
  this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = a;
  return this;
};
var ob = (new mb).initSecurityPrivateDoNotAccessOrElse_(''), qb = function(a) {
    var b = '', c;
    for (c in a) {
      if (!/^[-_a-zA-Z0-9]+$/.test(c)) throw Error('Name allows only [-_a-zA-Z0-9], got: ' + c);
      var d = a[c];
      null != d && (d = 'array' == z(d) ? Ja(d, pb).join(' ') : pb(d), b += c + ':' + d + ';');
    }
    b ? (a = b, a = (new mb).initSecurityPrivateDoNotAccessOrElse_(a)) : a = ob;
    return a;
  }, pb = function(a) {
    if (a instanceof gb) return a = hb(a), 'url("' + a.replace(/</g, '%3c').replace(/[\\"]/g, '\\$&') + '")';
    a = a instanceof H ? Ma(a) : rb(String(a));
    if (/[{;}]/.test(a)) throw new Da('Value does not allow [{;}], got: %s.',
      [a]);
    return a;
  }, rb = function(a) {
    var b = a.replace(sb, '$1').replace(sb, '$1').replace(tb, 'url');
    if (ub.test(b)) {
      if (vb.test(a)) return C('String value disallows comments, got: ' + a), 'zClosurez';
      b = a;
      for (var c = !0, d = !0, e = 0; e < b.length; e++) {
        var f = b.charAt(e);
        '\'' == f && d ? c = !c : '"' == f && c && (d = !d);
      }
      b = c && d;
      if (!b) return C('String value requires balanced quotes, got: ' + a), 'zClosurez';
      if (!wb(a)) return C('String value requires balanced square brackets and one identifier per pair of brackets, got: ' + a), 'zClosurez';
    } else return C('String value allows only [-,."\'%_!# a-zA-Z0-9\\[\\]] and simple functions, got: ' +
      a), 'zClosurez';
    return xb(a);
  }, wb = function(a) {
    for (var b = !0, c = /^[-_a-zA-Z0-9]$/, d = 0; d < a.length; d++) {
      var e = a.charAt(d);
      if (']' == e) {
        if (b) return !1;
        b = !0;
      } else if ('[' == e) {
        if (!b) return !1;
        b = !1;
      } else if (!b && !c.test(e)) return !1;
    }
    return b;
  }, ub = /^[-,."'%_!# a-zA-Z0-9\[\]]+$/,
  tb = /\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g,
  sb = /\b(hsl|hsla|rgb|rgba|matrix|calc|minmax|fit-content|repeat|(rotate|scale|translate)(X|Y|Z|3d)?)\([-+*/0-9a-z.%\[\], ]+\)/g,
  vb = /\/\*/, xb = function(a) {
    return a.replace(tb,
      function(b, c, d, e) {
        var f = '';
        d = d.replace(/^(['"])(.*)\1$/, function(g, k, h) {
          f = k;
          return h;
        });
        b = kb(d).getTypedStringValue();
        return c + f + b + f + e;
      });
  };
var zb = function() {
  this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = '';
  this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = yb;
};
zb.prototype.implementsGoogStringTypedString = !0;
var yb = {};
zb.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
};
zb.prototype.toString = function() {
  return 'SafeStyleSheet{' + this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ + '}';
};
zb.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
  this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = a;
  return this;
};
(new zb).initSecurityPrivateDoNotAccessOrElse_('');
var Bb = function() {
  this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = '';
  this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = Ab;
  this.dir_ = null;
};
m = Bb.prototype;
m.implementsGoogI18nBidiDirectionalString = !0;
m.getDirection = function() {
  return this.dir_;
};
m.implementsGoogStringTypedString = !0;
m.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_.toString();
};
m.toString = function() {
  return 'SafeHtml{' + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + '}';
};
var Cb = function(a) {
  a instanceof Bb && a.constructor === Bb && a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === Ab ? a = a.privateDoNotAccessOrElseSafeHtmlWrappedValue_ : (C('expected object of type SafeHtml, got \'' + a + '\' of type ' + z(a)), a = 'type_error:SafeHtml');
  return a.toString();
}, Ab = {};
Bb.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a, b) {
  this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
  this.dir_ = b;
  return this;
};
(new Bb).initSecurityPrivateDoNotAccessOrElse_('<!DOCTYPE html>', 0);
(new Bb).initSecurityPrivateDoNotAccessOrElse_('', 0);
(new Bb).initSecurityPrivateDoNotAccessOrElse_('<br>', 0);
var Db = function(a, b) {
  b ? a = a.replace(Za, '&amp;').replace($a, '&lt;').replace(ab, '&gt;').replace(bb, '&quot;').replace(cb, '&#39;').replace(db, '&#0;') : eb.test(a) && (-1 != a.indexOf('&') && (a = a.replace(Za, '&amp;')), -1 != a.indexOf('<') && (a = a.replace($a, '&lt;')), -1 != a.indexOf('>') && (a = a.replace(ab, '&gt;')), -1 != a.indexOf('"') && (a = a.replace(bb, '&quot;')), -1 != a.indexOf('\'') && (a = a.replace(cb, '&#39;')), -1 != a.indexOf('\x00') && (a = a.replace(db, '&#0;')));
  return a;
}, Eb = String.prototype.repeat ? function(a, b) {
    return a.repeat(b);
  } :
  function(a, b) {
    return Array(b + 1).join(a);
  }, Fb = function(a) {
  return String(a).replace(/\-([a-z])/g, function(b, c) {
    return c.toUpperCase();
  });
};/*
 Copyright (c) Microsoft Corporation. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 this file except in compliance with the License. You may obtain a copy of the
 License at http://www.apache.org/licenses/LICENSE-2.0

 THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
 WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 MERCHANTABLITY OR NON-INFRINGEMENT.

 See the Apache Version 2.0 License for specific language governing permissions
 and limitations under the License.
*/
var Gb = function() {
}, Hb = !/^\s*class\s*\{\s*\}\s*$/.test(Gb.toString());/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
(function() {
  if (Hb && !HTMLElement.es5Shimmed && void 0 !== window.Reflect && void 0 !== window.customElements && !window.customElements.polyfillWrapFlushCallback) {
    var a = HTMLElement;
    window.HTMLElement = function() {
      return Reflect.construct(a, [], this.constructor);
    };
    HTMLElement.prototype = a.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    HTMLElement.es5Shimmed = !0;
    Object.setPrototypeOf(HTMLElement, a);
  }
})();/*

Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
function Ib() {
  var a = window.COMPILED || !1;
  a || window.goog || (window.goog = {
    require: function(b) {
      if ('webcomponentsjs.custom_elements.auto_es5_shim' !== b) throw Error('Called goog.require without loading //javascript/closure:base');
    },
  }, window.goog.require.isDevModeNoOpImpl = !0);
}

Ib();/*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
window.JSCompiler_renameProperty = function(a) {
  return a;
};

function Jb() {
  var a = window.COMPILED || !1;
  if (!a) {
    var b = window.goog && window.goog.declareModuleId || function() {
    }, c = function(d) {
      var e;
      e = (e = !!wa && 'es6' == wa.type) ? !0 : (e = sa.$jscomp) ? 'function' != typeof e.getCurrentModulePath ? !1 : !!e.getCurrentModulePath() : !1;
      if (e) return b(d);
    };
    window.goog.declareModuleId || (window.goog.isInEs6ModuleLoader_ = function() {
      return !1;
    }, Object.defineProperty(window.goog, 'declareModuleId', {
      get: function() {
        return c;
      }, set: function(d) {
        b = d;
        return c;
      },
    }));
  }
}

Jb();
var Kb = window.Polymer;
window.Polymer = function(a) {
  return window.Polymer._polymerFn(a);
};
Kb && Object.assign(Polymer, Kb);
Polymer._polymerFn = function() {
  throw Error('Load polymer.html to use the Polymer() function.');
};
var Lb = /(url\()([^)]*)(\))/g, Mb = /(^\/)|(^#)|(^[\w-\d]*:)/, Nb, I;

function Ob(a, b) {
  if (a && Mb.test(a)) return a;
  if (void 0 === Nb) {
    Nb = !1;
    try {
      var c = new URL('b', 'http://a');
      c.pathname = 'c%20d';
      Nb = 'http://a/c%20d' === c.href;
    } catch (d) {
    }
  }
  b || (b = document.baseURI || window.location.href);
  if (Nb) return (new URL(a, b)).href;
  I || (I = document.implementation.createHTMLDocument('temp'), I.base = I.createElement('base'), I.head.appendChild(I.base), I.anchor = I.createElement('a'), I.body.appendChild(I.anchor));
  I.base.href = b;
  I.anchor.href = a;
  return I.anchor.href || a;
}

function Pb(a, b) {
  return a.replace(Lb, function(c, d, e, f) {
    return d + '\'' + Ob(e.replace(/["']/g, ''), b) + '\'' + f;
  });
}

function Qb(a) {
  return a.substring(0, a.lastIndexOf('/') + 1);
};/*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Polymer.ResolveUrl = { resolveCss: Pb, resolveUrl: Ob, pathFromUrl: Qb };
var Rb = !window.ShadyDOM, Sb = !(window.ShadyCSS && !window.ShadyCSS.nativeCss),
  Tb = !window.customElements.polyfillWrapFlushCallback, Ub = Qb(document.baseURI || window.location.href),
  Vb = function(a) {
    Ub = a;
  }, Wb = window.Polymer && window.Polymer.sanitizeDOMValue || void 0, Xb = function(a) {
    Wb = a;
  }, Yb = !1, Zb = function(a) {
    Yb = a;
  }, $b = !1, ac = function(a) {
    $b = a;
  }, bc = !1, cc = function(a) {
    bc = a;
  }, dc = window.Polymer && window.Polymer.legacyOptimizations || !1, ec = function(a) {
    dc = a;
  }, fc = !1, gc = function(a) {
    fc = a;
  }, hc = !1, ic = function(a) {
    hc = a;
  }, jc = !1, kc = function(a) {
    jc =
      a;
  }, lc = !1, mc = function(a) {
    lc = a;
  }, nc = !1, oc = function(a) {
    nc = a;
  };
Polymer.Settings = {
  useShadow: Rb, useNativeCSSProperties: Sb, useNativeCustomElements: Tb, get rootPath() {
    return Ub;
  }, setRootPath: Vb, get sanitizeDOMValue() {
    return Wb;
  }, setSanitizeDOMValue: Xb, get passiveTouchGestures() {
    return Yb;
  }, setPassiveTouchGestures: Zb, get strictTemplatePolicy() {
    return $b;
  }, setStrictTemplatePolicy: ac, get allowTemplateFromDomModule() {
    return bc;
  }, setAllowTemplateFromDomModule: cc, get legacyOptimizations() {
    return dc;
  }, setLegacyOptimizations: ec, get syncInitialRender() {
    return hc;
  }, setSyncInitialRender: ic,
  get legacyUndefined() {
    return jc;
  }, setLegacyUndefined: kc, get legacyNoBatch() {
    return lc;
  }, setLegacyNoBatch: mc, get legacyWarnings() {
    return fc;
  }, setLegacyWarnings: gc, get legacyNotifyOrder() {
    return nc;
  }, setLegacyNotifyOrder: oc,
};
void 0 !== Polymer.rootPath && (Ub = Polymer.rootPath);
void 0 !== Polymer.sanitizeDOMValue && (Wb = Polymer.sanitizeDOMValue);
void 0 !== Polymer.passiveTouchGestures && (Yb = Polymer.passiveTouchGestures);
void 0 !== Polymer.strictTemplatePolicy && ($b = Polymer.strictTemplatePolicy);
bc = void 0 !== Polymer.allowTemplateFromDomModule ? Polymer.allowTemplateFromDomModule : !0;
void 0 !== Polymer.legacyOptimizations && (dc = Polymer.legacyOptimizations);
void 0 !== Polymer.syncInitialRender && (hc = Polymer.syncInitialRender);
void 0 !== Polymer.legacyUndefined && (jc = Polymer.legacyUndefined);
void 0 !== Polymer.legacyNoBatch && (lc = Polymer.legacyNoBatch);
void 0 !== Polymer.legacyWarnings && (fc = Polymer.legacyWarnings);
void 0 !== Polymer.legacyNotifyOrder && (nc = Polymer.legacyNotifyOrder);
Object.defineProperty(Polymer, 'sanitizeDOMValue', {
  get: function() {
    return Wb;
  }, set: function(a) {
    Wb = a;
  },
});/*

 Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at
 http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at
 http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at
 http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at
 http://polymer.github.io/PATENTS.txt
*/
var qc = {
  align: 1,
  alt: 1,
  'aria-activedescendant': 10,
  'aria-atomic': 1,
  'aria-autocomplete': 1,
  'aria-busy': 1,
  'aria-checked': 1,
  'aria-disabled': 1,
  'aria-dropeffect': 1,
  'aria-expanded': 1,
  'aria-haspopup': 1,
  'aria-hidden': 1,
  'aria-invalid': 1,
  'aria-label': 1,
  'aria-level': 1,
  'aria-live': 1,
  'aria-multiline': 1,
  'aria-multiselectable': 1,
  'aria-orientation': 1,
  'aria-posinset': 1,
  'aria-pressed': 1,
  'aria-readonly': 1,
  'aria-relevant': 1,
  'aria-required': 1,
  'aria-selected': 1,
  'aria-setsize': 1,
  'aria-sort': 1,
  'aria-valuemax': 1,
  'aria-valuemin': 1,
  'aria-valuenow': 1,
  'aria-valuetext': 1,
  autocapitalize: 1,
  autocomplete: 1,
  autocorrect: 1,
  autofocus: 1,
  bgcolor: 1,
  border: 1,
  checked: 1,
  'class': 1,
  color: 1,
  cols: 1,
  colspan: 1,
  dir: 8,
  disabled: 1,
  draggable: 1,
  enctype: 1,
  face: 1,
  'for': 10,
  formenctype: 1,
  frameborder: 1,
  height: 1,
  hidden: 1,
  href: 4,
  hreflang: 1,
  id: 10,
  ismap: 1,
  itemid: 1,
  itemprop: 1,
  itemref: 1,
  itemscope: 1,
  itemtype: 1,
  label: 1,
  lang: 1,
  list: 10,
  loop: 1,
  max: 1,
  maxlength: 1,
  min: 1,
  multiple: 1,
  muted: 1,
  name: 10,
  placeholder: 1,
  preload: 1,
  rel: 1,
  required: 1,
  reversed: 1,
  role: 1,
  rows: 1,
  rowspan: 1,
  selected: 1,
  shape: 1,
  size: 1,
  sizes: 1,
  span: 1,
  spellcheck: 1,
  src: 4,
  start: 1,
  step: 1,
  style: 5,
  summary: 1,
  tabindex: 1,
  target: 8,
  title: 1,
  translate: 1,
  valign: 1,
  value: 1,
  width: 1,
  wrap: 1,
}, rc = {
  a: { href: [{ contract: 3 }] },
  area: { href: [{ contract: 3 }] },
  audio: { src: [{ contract: 3 }] },
  blockquote: { cite: [{ contract: 3 }] },
  button: { formaction: [{ contract: 3 }], formmethod: [{ contract: 1 }], type: [{ contract: 1 }] },
  command: { type: [{ contract: 1 }] },
  content: { select: [{ contract: 1 }] },
  del: { cite: [{ contract: 3 }] },
  details: { open: [{ contract: 1 }] },
  form: {
    action: [{ contract: 3 }],
    method: [{ contract: 1 }],
  },
  iframe: { srcdoc: [{ contract: 2 }] },
  img: { src: [{ contract: 3 }] },
  input: {
    formaction: [{ contract: 3 }],
    formmethod: [{ contract: 1 }],
    pattern: [{ contract: 1 }],
    readonly: [{ contract: 1 }],
    src: [{ contract: 3 }],
    type: [{ contract: 1 }],
  },
  ins: { cite: [{ contract: 3 }] },
  li: { type: [{ contract: 1 }] },
  link: {
    href: [{ contract: 3, contingentAttribute: 'rel', requiredValue: 'alternate' }, {
      contract: 3,
      contingentAttribute: 'rel',
      requiredValue: 'author',
    }, { contract: 3, contingentAttribute: 'rel', requiredValue: 'bookmark' }, {
      contract: 3, contingentAttribute: 'rel',
      requiredValue: 'canonical',
    }, { contract: 3, contingentAttribute: 'rel', requiredValue: 'cite' }, {
      contract: 3,
      contingentAttribute: 'rel',
      requiredValue: 'help',
    }, { contract: 3, contingentAttribute: 'rel', requiredValue: 'icon' }, {
      contract: 3,
      contingentAttribute: 'rel',
      requiredValue: 'license',
    }, { contract: 3, contingentAttribute: 'rel', requiredValue: 'next' }, {
      contract: 3,
      contingentAttribute: 'rel',
      requiredValue: 'prefetch',
    }, { contract: 3, contingentAttribute: 'rel', requiredValue: 'dns-prefetch' }, {
      contract: 3,
      contingentAttribute: 'rel',
      requiredValue: 'prerender',
    },
      { contract: 3, contingentAttribute: 'rel', requiredValue: 'preconnect' }, {
        contract: 3,
        contingentAttribute: 'rel',
        requiredValue: 'preload',
      }, { contract: 3, contingentAttribute: 'rel', requiredValue: 'prev' }, {
        contract: 3,
        contingentAttribute: 'rel',
        requiredValue: 'search',
      }, { contract: 3, contingentAttribute: 'rel', requiredValue: 'subresource' }],
    media: [{ contract: 1 }],
    nonce: [{ contract: 1 }],
    type: [{ contract: 1 }],
  },
  menuitem: { icon: [{ contract: 3 }] },
  ol: { type: [{ contract: 1 }] },
  q: { cite: [{ contract: 3 }] },
  script: { nonce: [{ contract: 1 }], type: [{ contract: 1 }] },
  source: { media: [{ contract: 1 }], src: [{ contract: 3 }] },
  style: { media: [{ contract: 1 }], nonce: [{ contract: 1 }] },
  table: { cellpadding: [{ contract: 1 }], cellspacing: [{ contract: 1 }] },
  textarea: { readonly: [{ contract: 1 }] },
  time: { datetime: [{ contract: 1 }] },
  video: { autoplay: [{ contract: 1 }], controls: [{ contract: 1 }], poster: [{ contract: 3 }], src: [{ contract: 3 }] },
}, sc = {
  a: 1,
  abbr: 1,
  address: 1,
  applet: 4,
  area: 5,
  article: 1,
  aside: 1,
  audio: 1,
  b: 1,
  base: 4,
  bdi: 1,
  bdo: 1,
  blockquote: 1,
  body: 1,
  br: 5,
  button: 1,
  canvas: 1,
  caption: 1,
  cite: 1,
  code: 1,
  col: 5,
  colgroup: 1,
  command: 1,
  content: 1,
  data: 1,
  datalist: 1,
  dd: 1,
  del: 1,
  details: 1,
  dfn: 1,
  dialog: 1,
  div: 1,
  dl: 1,
  dt: 1,
  em: 1,
  embed: 4,
  fieldset: 1,
  figcaption: 1,
  figure: 1,
  font: 1,
  footer: 1,
  form: 1,
  frame: 1,
  frameset: 1,
  h1: 1,
  h2: 1,
  h3: 1,
  h4: 1,
  h5: 1,
  h6: 1,
  head: 1,
  header: 1,
  hr: 5,
  html: 1,
  i: 1,
  iframe: 1,
  img: 5,
  input: 5,
  ins: 1,
  kbd: 1,
  keygen: 5,
  label: 1,
  legend: 1,
  li: 1,
  link: 5,
  main: 1,
  map: 1,
  mark: 1,
  math: 4,
  menu: 1,
  menuitem: 1,
  meta: 4,
  meter: 1,
  nav: 1,
  noscript: 1,
  object: 4,
  ol: 1,
  optgroup: 1,
  option: 1,
  output: 1,
  p: 1,
  param: 5,
  picture: 1,
  pre: 1,
  progress: 1,
  q: 1,
  rb: 1,
  rp: 1,
  rt: 1,
  rtc: 1,
  ruby: 1,
  s: 1,
  samp: 1,
  script: 3,
  section: 1,
  select: 1,
  slot: 1,
  small: 1,
  source: 5,
  span: 1,
  strong: 1,
  style: 2,
  sub: 1,
  summary: 1,
  sup: 1,
  svg: 4,
  table: 1,
  tbody: 1,
  td: 1,
  template: 4,
  textarea: 6,
  tfoot: 1,
  th: 1,
  thead: 1,
  time: 1,
  title: 6,
  tr: 1,
  track: 5,
  u: 1,
  ul: 1,
  'var': 1,
  video: 1,
  wbr: 5,
}, tc = [{ auto: !0, ltr: !0, rtl: !0 }, { _self: !0, _blank: !0 }], uc = { '*': { dir: 0, target: 1 } };
var yc = function() {
    if (!vc) {
      var a = {}, b;
      for (b in wc) a[b] = wc[b];
      vc = a;
      a = 0;
      for (b = xc.length; a < b; ++a) {
        var c = xc[a];
        vc[c.toLowerCase()] = c;
      }
    }
    return vc;
  },
  xc = 'aLink accessKey allowFullscreen bgColor cellPadding cellSpacing codeBase codeType contentEditable crossOrigin dateTime dirName formAction formEnctype formMethod formNoValidate formTarget frameBorder innerHTML innerText inputMode isMap longDesc marginHeight marginWidth maxLength mediaGroup minLength noHref noResize noShade noValidate noWrap nodeValue outerHTML outerText readOnly tabIndex textContent trueSpeed useMap vAlign vLink valueAsDate valueAsNumber valueType'.split(' '),
  wc = {
    accept_charset: 'acceptCharset',
    'char': 'ch',
    charoff: 'chOff',
    checked: 'defaultChecked',
    'class': 'className',
    'for': 'htmlFor',
    http_equiv: 'httpEquiv',
    muted: 'defaultMuted',
    selected: 'defaultSelected',
    value: 'defaultValue',
  }, vc = null, zc = null;
var Ac = {}, Bc = !1, Cc = 0,
  Dc = /^(?!(?:annotation-xml|color-profile|font-face|font-face(?:-(?:src|uri|format|name))?|missing-glyph)$)[a-z][a-z.0-9_\u00b7\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u037d\u200c\u200d\u203f-\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\udfff\uf900-\ufdcf\ufdf0-\ufffd]*-[\-a-z.0-9_\u00b7\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u037d\u200c\u200d\u203f-\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\udfff\uf900-\ufdcf\ufdf0-\ufffd]*$/,
  Ec = function(a, b) {
    var c = window.customElements;
    if (Bc) {
      for (var d = window.Polymer.telemetry.registrations,
             e = d.length, f = Cc; f < e; ++f) {
        var g = d[f].is;
        Ac[g] = Ac;
      }
      Cc = e;
    }
    return c && c.get(a) || Ac[a] === Ac ? 2 : 'HTMLUnknownElement' === b.name ? 1 : 'HTMLElement' === b.name && Dc.test(a) ? 3 : 0;
  };/*

 Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at
 http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at
 http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at
 http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at
 http://polymer.github.io/PATENTS.txt
*/
var Fc = function(a) {
  return a && a.implementsGoogStringTypedString ? a.getTypedStringValue() : a;
}, Gc = {
  CONSTANT: { typeToUnwrap: H, unwrap: Ma },
  JAVASCRIPT: { typeToUnwrap: Oa, unwrap: Pa },
  HTML: { typeToUnwrap: Bb, unwrap: Cb },
  RESOURCE_URL: { typeToUnwrap: Ra, unwrap: Sa },
  STRING: { typeToUnwrap: Object, unwrap: Fc },
  STYLE: { typeToUnwrap: mb, unwrap: nb },
  URL: { typeToUnwrap: gb, unwrap: hb },
}, Hc = function(a, b) {
  return b;
}, Ic = {
  CONSTANT: Hc, JAVASCRIPT: Hc, HTML: Db, RESOURCE_URL: Hc, STRING: String, STYLE: Hc, URL: function(a, b) {
    a = kb(a).getTypedStringValue();
    return 'about:invalid#zClosurez' === a ? b : a;
  },
}, Jc = function(a, b, c) {
  var d = Gc[b];
  if (a instanceof d.typeToUnwrap && (d = d.unwrap(a, c), d !== c)) return d;
  b = Ic[b];
  return b('' + Fc(a), c);
};
var Kc = function(a, b, c) {
  for (var d = [b], e = 2, f = arguments.length; e < f; ++e) d[e - 1] = arguments[e];
  a ? console.warn.apply(console, d) : console.log.apply(console, d);
}, Lc = function(a, b, c) {
  return c;
}, Mc = function(a) {
  function b(t) {
    var v = this.getAttribute(t);
    return !v || /[\[\{]/.test(t) ? null : v;
  }

  function c(t, v, u, A) {
    if (!A && A !== document.all) return A;
    var E = t.nodeType;
    if (E !== Node.ELEMENT_NODE) {
      if (E === Node.TEXT_NODE) {
        v = t.parentElement;
        E = !v;
        if (v && v.nodeType === Node.ELEMENT_NODE) {
          var J = v.localName;
          v = Ec(J, v.constructor);
          switch (v) {
            case 0:
            case 1:
              E =
                J;
              E = Object.hasOwnProperty.call(sc, E) ? sc[E] : null;
              E = 1 === E || 6 === E;
              break;
            case 3:
            case 2:
              E = !0;
          }
        }
        if (E) return '' + e(A, 'STRING', A);
      }
      d && d(!0, 'Failed to sanitize %s %s%s node to value %O', t.parentElement && t.parentElement.nodeName, '#text', '', A);
      return 'zClosurez';
    }
    E = t;
    t = E.localName;
    a:{
      var F = E;
      var G = F.localName;
      var T = F.getAttribute('is');
      if (!T && (F = Ec(G, F.constructor), 2 === F)) {
        G = p;
        break a;
      }
      (F = n[G]) || (F = n[G] = document.createElement(G));
      G = F;
    }
    switch (u) {
      case 'attribute':
        F = String(v).toLowerCase();
        T = yc();
        T = T[F];
        F = va(T) ? T : Fb(F);
        if (F in G) break;
        return A;
      case 'property':
        if (v in G) break;
        F = v.toLowerCase();
        T = yc();
        F = T[F];
        F = va(F) ? F : null;
        if (F && F in G) break;
        return A;
      default:
        throw Error(u + ': ' + typeof u);
    }
    if ('attribute' == u) J = v.toLowerCase(); else {
      u = zc;
      if (!u) {
        u = yc();
        G = {};
        for (J in u) G[u[J]] = J;
        u = zc = J = G;
      }
      J = u[v];
      J = va(J) ? J : String(v).replace(/([A-Z])/g, '-$1').toLowerCase();
    }
    a:{
      u = t;
      v = J;
      E = za(b, E);
      if (Object.hasOwnProperty.call(rc, u) && (u = rc[u], Object.hasOwnProperty.call(u, v) && (u = u[v], u instanceof Array))) {
        G = null;
        F = !1;
        T = 0;
        for (var Ti = u.length; T < Ti; ++T) {
          var pc =
            u[T], ua = pc.contingentAttribute;
          if (!ua) {
            u = pc.contract;
            break a;
          }
          null === G && (G = {});
          ua = Object.hasOwnProperty.call(G, ua) ? G[ua] : G[ua] = E(ua);
          if (ua === pc.requiredValue) {
            u = pc.contract;
            break a;
          } else null == ua && (F = !0);
        }
        if (F) {
          u = null;
          break a;
        }
      }
      E = qc[v];
      u = 'number' === typeof E ? E : null;
    }
    v = r;
    E = null;
    null != u && (u = l[u], G = u.safeType, E = u.safeReplacement, G && (v = e(A, G, r)), v === r && u.filter && (v = '' + e(A, 'STRING', A), v = u.filter(t, J, v)));
    v === r && (v = E || 'zClosurez', d && d(!0, 'Failed to sanitize attribute of <%s>: <%s %s="%O">', t, t, J, A));
    return v;
  }

  var d = a.reportHandler || void 0, e = a.safeTypesBridge || Lc, f = a.UNSAFE_passThruDisallowedValues, g = !1;
  null != f && (g = !0 === f);
  var k = /^$/;
  if (a = a.allowedIdentifierPrefixes) {
    f = 0;
    for (var h = a.length; f < h; ++f) k = new RegExp(k.source + '|^' + String(a[f]).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08'));
  }
  void 0 === d && 'undefined' !== typeof console && (d = Kc);
  d && d(!1, 'initResin');
  var l = [, {
    filter: function(t, v, u) {
      return u;
    }, safeReplacement: null, safeType: null,
  }, { filter: null, safeReplacement: null, safeType: 'HTML' },
    { filter: null, safeReplacement: 'about:invalid#zClosurez', safeType: 'URL' }, {
      filter: null,
      safeReplacement: 'about:invalid#zClosurez',
      safeType: 'RESOURCE_URL',
    }, { filter: null, safeReplacement: 'zClosurez', safeType: 'STYLE' }, , {
      filter: null,
      safeReplacement: ' /*zClosurez*/ ',
      safeType: 'JAVASCRIPT',
    }, {
      filter: function(t, v, u) {
        u = String(u).toLowerCase();
        a:{
          var A = null;
          (t = uc[t]) && (A = t[v]);
          if ('number' !== typeof A && ((t = uc['*']) && (A = t[v]), 'number' !== typeof A)) {
            v = !1;
            break a;
          }
          v = tc[A];
          t = String(u).toLowerCase();
          v = !0 === v[t];
        }
        return v ?
          u : 'zClosurez';
      }, safeReplacement: 'zClosurez', safeType: null,
    }, { filter: null, safeReplacement: 'zClosurez', safeType: 'CONSTANT' }, {
      filter: function(t, v, u) {
        return k.test(u) ? u : 'zClosurez';
      }, safeReplacement: 'zClosurez', safeType: 'CONSTANT',
    }], n = {}, p = document.createElement('polyresinuncustomized'), r = {};
  return g ? g = function(t, v, u, A) {
    c(t, v, u, A);
    return A;
  } : c;
};
var Nc = function(a) {
  var b = Mc(a || {});
  if (/^1\./.test(Polymer.version)) {
    Bc = !0;
    var c = Polymer.Base._computeFinalAnnotationValue;
    a = function(e, f, g, k) {
      g = c.call(this, e, f, g, k);
      var h = 'property';
      k && k.propertyName ? f = k.propertyName : h = k && k.kind || 'property';
      return b(e, f, h, g);
    };
    Polymer.Base._computeFinalAnnotationValue = a;
    if (Polymer.Base._computeFinalAnnotationValue !== a) throw Error('Cannot replace _computeFinalAnnotationValue.  Is Polymer frozen?');
  } else {
    var d = Polymer.sanitizeDOMValue || Polymer.Settings && Polymer.Settings.sanitizeDOMValue;
    a = function(e, f, g, k) {
      e = d ? d.call(Polymer, e, f, g, k) : e;
      return f = k ? b(k, f, g, e) : 'zClosurez';
    };
    if (Polymer.Settings && Polymer.Settings.setSanitizeDOMValue) Polymer.Settings.setSanitizeDOMValue(a); else if (Polymer.sanitizeDOMValue = a, Polymer.sanitizeDOMValue !== a) throw Error('Cannot install sanitizeDOMValue.  Is Polymer frozen?');
  }
};
Nc({ allowedIdentifierPrefixes: [''], reportHandler: Kc, safeTypesBridge: Jc });
var K = {}, Oc = function() {
  }, Pc, Qc = function() {
  }, Rc = function() {
  }, Sc = {
    ALL_FEEDS: 'allfeeds',
    ALL_SIZES: 'allsizes',
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
    PARALLAX: 'parallax',
    SINGLE: 'single',
  }, Tc = function() {
  }, Uc = { ALL: 'all', PORTRAIT: 'portrait', LANDSCAPE: 'landscape' },
  Vc = { DEVICE: 'device', DEVICE_SIZE: 'deviceSize', FEED: 'feed', FEEDS: 'feeds', SIZE: 'size', SIZES: 'sizes' },
  Wc = new Map([['allfeeds', ['size', 'feeds']], ['allsizes', ['sizes', 'feed']], ['desktop', ['feed']], ['mobile', ['device', 'feed']], ['parallax', ['size', 'device', 'feed']],
    ['single', ['size', 'feed']]]), Xc = { ADVANCED: 'advanced', STANDARD: 'standard' },
  Yc = new Map([['standard', '336x280 300x250 250x250 200x200 970x90 728x90 468x60 120x600 160x600 300x600 320x100 320x50'.split(' ')], ['advanced', '336x280 300x250 250x250 200x200 970x90 728x90 468x60 120x600 160x600 300x600 320x100 320x50 319x480 360x640 414x736 600x960 768x1024 800x1280 1024x90 180x150 234x60 300x100 480x32 480x70 536x150 600x120 600x90 620x60 645x120 680x60 728x300 970x250 50x50'.split(' ')]]),
  Zc = new Map([['standard',
    '300x250 320x50 728x90 160x600 300x600 300x50 970x90'.split(' ')], ['advanced', '300x250 300x600 120x600 160x600 250x250 300x50 300x100 300x1050 320x50 320x100 320x320 336x280 468x60 728x90 800x250 970x90 970x250 320x480'.split(' ')]]),
  $c = new Map([['standard', ['300x250', '320x50', '728x90']], ['advanced', ['300x250', '320x50', '728x90']]]),
  ad = new Map([['standard', ['300x250', '320x50', '300x600', '160x600', '728x90']], ['advanced', '300x250 320x50 300x600 160x600 728x90 970x250 300x50 970x90 300x1050 120x60'.split(' ')]]),
  bd = new Map([['pixel2xl', { name: 'Pixel 1/1XL/2/2XL', width: 412, height: 732 }], ['pixel3', {
    name: 'Pixel 3',
    width: 412,
    height: 824,
  }], ['pixel3xl', { name: 'Pixel 3 XL', width: 412, height: 847 }], ['nexus5', {
    name: 'Nexus 5',
    width: 360,
    height: 640,
  }], ['nexus6p', { name: 'Nexus 5x/6/6P', width: 412, height: 732 }], ['iphone5', {
    name: 'iPhone 5',
    width: 320,
    height: 568,
  }], ['iphone8', { name: 'iPhone 6/6S/7/8', width: 375, height: 667 }], ['iphone8plus', {
    name: 'iPhone 6/6S/7/8 Plus',
    width: 414,
    height: 736,
  }], ['iphonexs', { name: 'iPhone X/XS', width: 375, height: 812 }],
    ['iphonexr', { name: 'iPhone XS Max/XR', width: 414, height: 896 }], ['nexus7', {
      name: 'Nexus 7 (\'13)',
      width: 960,
      height: 600,
    }], ['nexus10', { name: 'Nexus 10', width: 1280, height: 800 }], ['ipad', {
      name: 'iPad',
      width: 1024,
      height: 768,
    }]]);
K.ADMOB_SIZES = $c;
K.ADWORDS_SIZES = Yc;
K.DOUBLECLICK_SIZES = Zc;
K.GENERIC_SIZES = ad;
K.PREVIEW_MODE_SETTINGS_METADATA = Wc;
K.Breakpoints = Tc;
K.Devices = bd;
K.OrientationType = Uc;
K.PreviewAdSizesSet = Xc;
K.PreviewConfig = Qc;
K.PreviewMode = Sc;
K.PreviewSettings = Rc;
K.SamplePayload = Oc;
K.SamplePayloads = Pc;
K.SettingType = Vc;
var cd = ['ninja', 'preview', 'publicConstants'], dd = sa;
cd[0] in dd || 'undefined' == typeof dd.execScript || dd.execScript('var ' + cd[0]);
for (var ed; cd.length && (ed = cd.shift());) !cd.length && ta(K) ? dd[ed] = K : dd = dd[ed] && dd[ed] !== Object.prototype[ed] ? dd[ed] : dd[ed] = {};
var fd = {
  COMPACT_DECIMAL_SHORT_PATTERN: {
    1E3: { other: '0K' },
    1E4: { other: '00K' },
    1E5: { other: '000K' },
    1E6: { other: '0M' },
    1E7: { other: '00M' },
    1E8: { other: '000M' },
    1E9: { other: '0B' },
    1E10: { other: '00B' },
    1E11: { other: '000B' },
    1E12: { other: '0T' },
    1E13: { other: '00T' },
    1E14: { other: '000T' },
  }, COMPACT_DECIMAL_LONG_PATTERN: {
    1E3: { other: '0 thousand' },
    1E4: { other: '00 thousand' },
    1E5: { other: '000 thousand' },
    1E6: { other: '0 million' },
    1E7: { other: '00 million' },
    1E8: { other: '000 million' },
    1E9: { other: '0 billion' },
    1E10: { other: '00 billion' },
    1E11: { other: '000 billion' },
    1E12: { other: '0 trillion' },
    1E13: { other: '00 trillion' },
    1E14: { other: '000 trillion' },
  },
}, gd = fd;
gd = fd;
var id = function(a, b) {
  var c = ['0'];
  b = hd[b];
  b = b[0] & 7;
  if (0 < b) {
    c.push('.');
    for (var d = 0; d < b; d++) c.push('0');
  }
  return a.replace(/0.00/g, c.join(''));
}, hd = {
  AED: [2, 'dh', '\u062f.\u0625.'],
  ALL: [0, 'Lek', 'Lek'],
  AUD: [2, '$', 'AU$'],
  BDT: [2, '\u09f3', 'Tk'],
  BGN: [2, 'lev', 'lev'],
  BRL: [2, 'R$', 'R$'],
  CAD: [2, '$', 'C$'],
  CDF: [2, 'FrCD', 'CDF'],
  CHF: [2, 'CHF', 'CHF'],
  CLP: [0, '$', 'CL$'],
  CNY: [2, '\u00a5', 'RMB\u00a5'],
  COP: [32, '$', 'COL$'],
  CRC: [0, '\u20a1', 'CR\u20a1'],
  CZK: [50, 'K\u010d', 'K\u010d'],
  DKK: [50, 'kr.', 'kr.'],
  DOP: [2, 'RD$', 'RD$'],
  EGP: [2,
    '\u00a3', 'LE'],
  ETB: [2, 'Birr', 'Birr'],
  EUR: [2, '\u20ac', '\u20ac'],
  GBP: [2, '\u00a3', 'GB\u00a3'],
  HKD: [2, '$', 'HK$'],
  HRK: [2, 'kn', 'kn'],
  HUF: [34, 'Ft', 'Ft'],
  IDR: [0, 'Rp', 'Rp'],
  ILS: [34, '\u20aa', 'IL\u20aa'],
  INR: [2, '\u20b9', 'Rs'],
  IRR: [0, 'Rial', 'IRR'],
  ISK: [0, 'kr', 'kr'],
  JMD: [2, '$', 'JA$'],
  JPY: [0, '\u00a5', 'JP\u00a5'],
  KRW: [0, '\u20a9', 'KR\u20a9'],
  LKR: [2, 'Rs', 'SLRs'],
  LTL: [2, 'Lt', 'Lt'],
  MNT: [0, '\u20ae', 'MN\u20ae'],
  MVR: [2, 'Rf', 'MVR'],
  MXN: [2, '$', 'Mex$'],
  MYR: [2, 'RM', 'RM'],
  NOK: [50, 'kr', 'NOkr'],
  PAB: [2, 'B/.', 'B/.'],
  PEN: [2, 'S/.',
    'S/.'],
  PHP: [2, '\u20b1', 'PHP'],
  PKR: [0, 'Rs', 'PKRs.'],
  PLN: [50, 'z\u0142', 'z\u0142'],
  RON: [2, 'RON', 'RON'],
  RSD: [0, 'din', 'RSD'],
  RUB: [50, '\u20bd', 'RUB'],
  SAR: [2, 'Rial', 'Rial'],
  SEK: [50, 'kr', 'kr'],
  SGD: [2, '$', 'S$'],
  THB: [2, '\u0e3f', 'THB'],
  TRY: [2, '\u20ba', 'TRY'],
  TWD: [2, 'NT$', 'NT$'],
  TZS: [0, 'TSh', 'TSh'],
  UAH: [2, '\u0433\u0440\u043d.', 'UAH'],
  USD: [2, '$', 'US$'],
  UYU: [2, '$', '$U'],
  VND: [48, '\u20ab', 'VN\u20ab'],
  YER: [0, 'Rial', 'Rial'],
  ZAR: [2, 'R', 'ZAR'],
};
var jd = {
  DECIMAL_SEP: '.',
  GROUP_SEP: ',',
  PERCENT: '%',
  ZERO_DIGIT: '0',
  PLUS_SIGN: '+',
  MINUS_SIGN: '-',
  EXP_SYMBOL: 'E',
  PERMILL: '\u2030',
  INFINITY: '\u221e',
  NAN: 'NaN',
  DECIMAL_PATTERN: '#,##0.###',
  SCIENTIFIC_PATTERN: '#E0',
  PERCENT_PATTERN: '#,##0%',
  CURRENCY_PATTERN: '\u00a4#,##0.00',
  DEF_CURRENCY_CODE: 'USD',
}, kd = jd, ld = jd;
ld = kd = jd;
var md = function(a, b, c, d) {
  this.intlCurrencyCode_ = b || null;
  this.currencyStyle_ = c || 0;
  this.overrideNumberFormatSymbols_ = d || null;
  this.maximumIntegerDigits_ = 40;
  this.minimumIntegerDigits_ = 1;
  this.significantDigits_ = 0;
  this.maximumFractionDigits_ = 3;
  this.minExponentDigits_ = this.minimumFractionDigits_ = 0;
  this.showTrailingZeros_ = this.useSignForPositiveExponent_ = !1;
  this.positiveSuffix_ = this.positivePrefix_ = '';
  this.negativePrefix_ = this.getNumberFormatSymbols_().MINUS_SIGN;
  this.negativeSuffix_ = '';
  this.multiplier_ =
    1;
  this.negativePercentSignExpected_ = !1;
  this.groupingArray_ = [];
  this.useExponentialNotation_ = this.decimalSeparatorAlwaysShown_ = !1;
  this.compactStyle_ = 0;
  this.baseFormattingNumber_ = null;
  'number' == typeof a ? this.applyStandardPattern_(a) : this.applyPattern_(a);
}, nd = !1;
m = md.prototype;
m.getNumberFormatSymbols_ = function() {
  return this.overrideNumberFormatSymbols_ || (nd ? ld : kd);
};
m.getCurrencyCode_ = function() {
  return this.intlCurrencyCode_ || this.getNumberFormatSymbols_().DEF_CURRENCY_CODE;
};
m.setMinimumFractionDigits = function(a) {
  if (0 < this.significantDigits_ && 0 < a) throw Error('Can\'t combine significant digits and minimum fraction digits');
  this.minimumFractionDigits_ = a;
  return this;
};
m.getMinimumFractionDigits = function() {
  return this.minimumFractionDigits_;
};
m.setMaximumFractionDigits = function(a) {
  if (308 < a) throw Error('Unsupported maximum fraction digits: ' + a);
  this.maximumFractionDigits_ = a;
  return this;
};
m.getMaximumFractionDigits = function() {
  return this.maximumFractionDigits_;
};
m.setSignificantDigits = function(a) {
  if (0 < this.minimumFractionDigits_ && 0 <= a) throw Error('Can\'t combine significant digits and minimum fraction digits');
  this.significantDigits_ = a;
  return this;
};
m.getSignificantDigits = function() {
  return this.significantDigits_;
};
m.setShowTrailingZeros = function(a) {
  this.showTrailingZeros_ = a;
  return this;
};
m.setBaseFormatting = function(a) {
  B(null === a || isFinite(a));
  this.baseFormattingNumber_ = a;
  return this;
};
m.getBaseFormatting = function() {
  return this.baseFormattingNumber_;
};
m.applyPattern_ = function(a) {
  this.pattern_ = a.replace(/ /g, '\u00a0');
  var b = [0];
  this.positivePrefix_ = this.parseAffix_(a, b);
  var c = b[0];
  this.parseTrunk_(a, b);
  c = b[0] - c;
  this.positiveSuffix_ = this.parseAffix_(a, b);
  b[0] < a.length && ';' == a.charAt(b[0]) ? (b[0]++, 1 != this.multiplier_ && (this.negativePercentSignExpected_ = !0), this.negativePrefix_ = this.parseAffix_(a, b), b[0] += c, this.negativeSuffix_ = this.parseAffix_(a, b)) : (this.negativePrefix_ += this.positivePrefix_, this.negativeSuffix_ += this.positiveSuffix_);
};
m.applyStandardPattern_ = function(a) {
  switch (a) {
    case 1:
      this.applyPattern_(this.getNumberFormatSymbols_().DECIMAL_PATTERN);
      break;
    case 2:
      this.applyPattern_(this.getNumberFormatSymbols_().SCIENTIFIC_PATTERN);
      break;
    case 3:
      this.applyPattern_(this.getNumberFormatSymbols_().PERCENT_PATTERN);
      break;
    case 4:
      this.applyPattern_(id(this.getNumberFormatSymbols_().CURRENCY_PATTERN, this.getCurrencyCode_()));
      break;
    case 5:
      this.applyCompactStyle_(1);
      break;
    case 6:
      this.applyCompactStyle_(2);
      break;
    default:
      throw Error('Unsupported pattern type.');
  }
};
m.applyCompactStyle_ = function(a) {
  this.compactStyle_ = a;
  this.applyPattern_(this.getNumberFormatSymbols_().DECIMAL_PATTERN);
  this.setMinimumFractionDigits(0);
  this.setMaximumFractionDigits(2);
  this.setSignificantDigits(2);
};
m.parse = function(a, b) {
  b = b || [0];
  if (0 != this.compactStyle_) throw Error('Parsing of compact numbers is unimplemented');
  a = a.replace(/ |\u202f/g, '\u00a0');
  var c = a.indexOf(this.positivePrefix_, b[0]) == b[0], d = a.indexOf(this.negativePrefix_, b[0]) == b[0];
  c && d && (this.positivePrefix_.length > this.negativePrefix_.length ? d = !1 : this.positivePrefix_.length < this.negativePrefix_.length && (c = !1));
  c ? b[0] += this.positivePrefix_.length : d && (b[0] += this.negativePrefix_.length);
  if (a.indexOf(this.getNumberFormatSymbols_().INFINITY,
    b[0]) == b[0]) {
    b[0] += this.getNumberFormatSymbols_().INFINITY.length;
    var e = Infinity;
  } else e = this.parseNumber_(a, b);
  if (c) {
    if (a.indexOf(this.positiveSuffix_, b[0]) != b[0]) return NaN;
    b[0] += this.positiveSuffix_.length;
  } else if (d) {
    if (a.indexOf(this.negativeSuffix_, b[0]) != b[0]) return NaN;
    b[0] += this.negativeSuffix_.length;
  }
  return d ? -e : e;
};
m.parseNumber_ = function(a, b) {
  var c = !1, d = !1, e = !1, f = -1, g = 1, k = this.getNumberFormatSymbols_().DECIMAL_SEP,
    h = this.getNumberFormatSymbols_().GROUP_SEP, l = this.getNumberFormatSymbols_().EXP_SYMBOL;
  if (0 != this.compactStyle_) throw Error('Parsing of compact style numbers is not implemented');
  h = h.replace(/\u202f/g, '\u00a0');
  for (var n = ''; b[0] < a.length; b[0]++) {
    var p = a.charAt(b[0]), r = this.getDigit_(p);
    if (0 <= r && 9 >= r) n += r, e = !0; else if (p == k.charAt(0)) {
      if (c || d) break;
      n += '.';
      c = !0;
    } else if (p == h.charAt(0) && ('\u00a0' != h.charAt(0) ||
      b[0] + 1 < a.length && 0 <= this.getDigit_(a.charAt(b[0] + 1)))) {
      if (c || d) break;
    } else if (p == l.charAt(0)) {
      if (d) break;
      n += 'E';
      d = !0;
      f = b[0];
    } else if ('+' == p || '-' == p) {
      if (e && f != b[0] - 1) break;
      n += p;
    } else if (1 == this.multiplier_ && p == this.getNumberFormatSymbols_().PERCENT.charAt(0)) {
      if (1 != g) break;
      g = 100;
      if (e) {
        b[0]++;
        break;
      }
    } else if (1 == this.multiplier_ && p == this.getNumberFormatSymbols_().PERMILL.charAt(0)) {
      if (1 != g) break;
      g = 1E3;
      if (e) {
        b[0]++;
        break;
      }
    } else break;
  }
  1 != this.multiplier_ && (g = this.multiplier_);
  return parseFloat(n) / g;
};
m.format = function(a) {
  if (isNaN(a)) return this.getNumberFormatSymbols_().NAN;
  var b = [], c = null === this.baseFormattingNumber_ ? a : this.baseFormattingNumber_;
  c = this.getUnitAfterRounding_(c, a);
  a = L(a, -c.divisorBase);
  b.push(c.prefix);
  var d = 0 > a || 0 == a && 0 > 1 / a;
  b.push(d ? this.negativePrefix_ : this.positivePrefix_);
  isFinite(a) ? (a *= d ? -1 : 1, a *= this.multiplier_, this.useExponentialNotation_ ? this.subformatExponential_(a, b) : this.subformatFixed_(a, this.minimumIntegerDigits_, b)) : b.push(this.getNumberFormatSymbols_().INFINITY);
  b.push(d ? this.negativeSuffix_ : this.positiveSuffix_);
  b.push(c.suffix);
  return b.join('');
};
m.roundNumber_ = function(a) {
  var b = L(a, this.maximumFractionDigits_);
  0 < this.significantDigits_ && (b = this.roundToSignificantDigits_(b, this.significantDigits_, this.maximumFractionDigits_));
  b = Math.round(b);
  isFinite(b) ? (a = Math.floor(L(b, -this.maximumFractionDigits_)), b = Math.floor(b - L(a, this.maximumFractionDigits_))) : b = 0;
  return { intValue: a, fracValue: b };
};
m.formatNumberGroupingRepeatingDigitsParts_ = function(a, b, c, d, e) {
  for (var f = 0, g = 0, k, h = this.getNumberFormatSymbols_().GROUP_SEP, l = c.length, n = 0; n < l; n++) if (a.push(String.fromCharCode(b + 1 * Number(c.charAt(n)))), 1 < l - n) if (k = d[g], n < e) {
    var p = e - n;
    (1 === k || 0 < k && 1 === p % k) && a.push(h);
  } else g < d.length && (n === e ? g += 1 : k === n - e - f + 1 && (a.push(h), f += k, g += 1));
  return a;
};
m.formatNumberGroupingNonRepeatingDigitsParts_ = function(a, b, c, d) {
  var e = this.getNumberFormatSymbols_().GROUP_SEP, f, g = c.length, k = [];
  for (f = d.length - 1; 0 <= f && 0 < g; f--) {
    var h = d[f];
    for (var l = 0; l < h && 0 <= g - l - 1; l++) k.push(String.fromCharCode(b + 1 * Number(c.charAt(g - l - 1))));
    g -= h;
    0 < g && k.push(e);
  }
  a.push.apply(a, k.reverse());
  return a;
};
m.subformatFixed_ = function(a, b, c) {
  if (this.minimumFractionDigits_ > this.maximumFractionDigits_) throw Error('Min value must be less than max value');
  c || (c = []);
  a = this.roundNumber_(a);
  var d = a.intValue, e = a.fracValue, f = 0 == d ? 0 : this.intLog10_(d) + 1,
    g = 0 < this.minimumFractionDigits_ || 0 < e || this.showTrailingZeros_ && f < this.significantDigits_;
  a = this.minimumFractionDigits_;
  g && (a = this.showTrailingZeros_ && 0 < this.significantDigits_ ? this.significantDigits_ - f : this.minimumFractionDigits_);
  var k = '';
  for (f = d; 1E20 < f;) k = '0' +
    k, f = Math.round(L(f, -1));
  k = f + k;
  var h = this.getNumberFormatSymbols_().DECIMAL_SEP;
  f = this.getNumberFormatSymbols_().ZERO_DIGIT.charCodeAt(0);
  var l = k.length, n = 0;
  if (0 < d || 0 < b) {
    for (d = l; d < b; d++) c.push(String.fromCharCode(f));
    if (2 <= this.groupingArray_.length) for (b = 1; b < this.groupingArray_.length; b++) n += this.groupingArray_[b];
    b = l - n;
    c = 0 < b ? this.formatNumberGroupingRepeatingDigitsParts_(c, f, k, this.groupingArray_, b) : this.formatNumberGroupingNonRepeatingDigitsParts_(c, f, k, this.groupingArray_);
  } else g || c.push(String.fromCharCode(f));
  (this.decimalSeparatorAlwaysShown_ || g) && c.push(h);
  b = String(e);
  e = b.split('e+');
  2 == e.length && (b = parseFloat(e[0]), b = String(this.roundToSignificantDigits_(b, this.significantDigits_, 1)), b = b.replace('.', ''), e = parseInt(e[1], 10), b += Eb('0', e - b.length + 1));
  this.maximumFractionDigits_ + 1 > b.length && (e = this.maximumFractionDigits_ - b.length, b = '1' + Eb('0', e) + b);
  for (e = b.length; "0" == b.charAt(e - 1) && e > a + 1;) e--;
  for (d = 1; d < e; d++) c.push(String.fromCharCode(f + 1 * Number(b.charAt(d))));
};
m.addExponentPart_ = function(a, b) {
  b.push(this.getNumberFormatSymbols_().EXP_SYMBOL);
  0 > a ? (a = -a, b.push(this.getNumberFormatSymbols_().MINUS_SIGN)) : this.useSignForPositiveExponent_ && b.push(this.getNumberFormatSymbols_().PLUS_SIGN);
  a = '' + a;
  for (var c = this.getNumberFormatSymbols_().ZERO_DIGIT, d = a.length; d < this.minExponentDigits_; d++) b.push(c);
  b.push(a);
};
m.getMantissa_ = function(a, b) {
  return L(a, -b);
};
m.subformatExponential_ = function(a, b) {
  if (0 == a) this.subformatFixed_(a, this.minimumIntegerDigits_, b), this.addExponentPart_(0, b); else {
    var c = Math.log(a) / Math.log(10);
    B(!ta(void 0) || !1);
    c = Math.floor(c + 2E-15);
    a = this.getMantissa_(a, c);
    var d = this.minimumIntegerDigits_;
    1 < this.maximumIntegerDigits_ && this.maximumIntegerDigits_ > this.minimumIntegerDigits_ ? (d = c % this.maximumIntegerDigits_, 0 > d && (d = this.maximumIntegerDigits_ + d), a = L(a, d), c -= d, d = 1) : 1 > this.minimumIntegerDigits_ ? (c++, a = L(a, -1)) : (c -= this.minimumIntegerDigits_ -
      1, a = L(a, this.minimumIntegerDigits_ - 1));
    this.subformatFixed_(a, d, b);
    this.addExponentPart_(c, b);
  }
};
m.getDigit_ = function(a) {
  a = a.charCodeAt(0);
  if (48 <= a && 58 > a) return a - 48;
  var b = this.getNumberFormatSymbols_().ZERO_DIGIT.charCodeAt(0);
  return b <= a && a < b + 10 ? a - b : -1;
};
m.parseAffix_ = function(a, b) {
  for (var c = '', d = !1, e = a.length; b[0] < e; b[0]++) {
    var f = a.charAt(b[0]);
    if ('\'' == f) b[0] + 1 < e && '\'' == a.charAt(b[0] + 1) ? (b[0]++, c += '\'') : d = !d; else if (d) c += f; else switch (f) {
      case '#':
      case '0':
      case ',':
      case '.':
      case ';':
        return c;
      case '\u00a4':
        if (b[0] + 1 < e && '\u00a4' == a.charAt(b[0] + 1)) b[0]++, c += this.getCurrencyCode_(); else switch (this.currencyStyle_) {
          case 0:
            c += hd[this.getCurrencyCode_()][1];
            break;
          case 2:
            f = this.getCurrencyCode_();
            var g = hd[f];
            f = f == g[1] ? f : f + ' ' + g[1];
            c += f;
            break;
          case 1:
            c += hd[this.getCurrencyCode_()][2];
        }
        break;
      case '%':
        if (!this.negativePercentSignExpected_ && 1 != this.multiplier_) throw Error('Too many percent/permill');
        if (this.negativePercentSignExpected_ && 100 != this.multiplier_) throw Error('Inconsistent use of percent/permill characters');
        this.multiplier_ = 100;
        this.negativePercentSignExpected_ = !1;
        c += this.getNumberFormatSymbols_().PERCENT;
        break;
      case '\u2030':
        if (!this.negativePercentSignExpected_ && 1 != this.multiplier_) throw Error('Too many percent/permill');
        if (this.negativePercentSignExpected_ && 1E3 != this.multiplier_) throw Error('Inconsistent use of percent/permill characters');
        this.multiplier_ = 1E3;
        this.negativePercentSignExpected_ = !1;
        c += this.getNumberFormatSymbols_().PERMILL;
        break;
      default:
        c += f;
    }
  }
  return c;
};
m.parseTrunk_ = function(a, b) {
  for (var c = -1, d = 0, e = 0, f = 0, g = -1, k = a.length, h = !0; b[0] < k && h; b[0]++) {
    var l = a.charAt(b[0]);
    switch (l) {
      case '#':
        0 < e ? f++ : d++;
        0 <= g && 0 > c && g++;
        break;
      case '0':
        if (0 < f) throw Error('Unexpected "0" in pattern "' + a + '"');
        e++;
        0 <= g && 0 > c && g++;
        break;
      case ',':
        0 < g && this.groupingArray_.push(g);
        g = 0;
        break;
      case '.':
        if (0 <= c) throw Error('Multiple decimal separators in pattern "' + a + '"');
        c = d + e + f;
        break;
      case 'E':
        if (this.useExponentialNotation_) throw Error('Multiple exponential symbols in pattern "' + a + '"');
        this.useExponentialNotation_ = !0;
        this.minExponentDigits_ = 0;
        b[0] + 1 < k && '+' == a.charAt(b[0] + 1) && (b[0]++, this.useSignForPositiveExponent_ = !0);
        for (; b[0] + 1 < k && "0" == a.charAt(b[0] + 1);) b[0]++, this.minExponentDigits_++;
        if (1 > d + e || 1 > this.minExponentDigits_) throw Error('Malformed exponential pattern "' + a + '"');
        h = !1;
        break;
      default:
        b[0]--, h = !1;
    }
  }
  0 == e && 0 < d && 0 <= c && (e = c, 0 == e && e++, f = d - e, d = e - 1, e = 1);
  if (0 > c && 0 < f || 0 <= c && (c < d || c > d + e) || 0 == g) throw Error('Malformed pattern "' + a + '"');
  a = d + e + f;
  this.maximumFractionDigits_ = 0 <= c ? a - c :
    0;
  0 <= c && (this.minimumFractionDigits_ = d + e - c, 0 > this.minimumFractionDigits_ && (this.minimumFractionDigits_ = 0));
  e = 0 <= c ? c : a;
  this.minimumIntegerDigits_ = e - d;
  this.useExponentialNotation_ && (this.maximumIntegerDigits_ = d + this.minimumIntegerDigits_, 0 == this.maximumFractionDigits_ && 0 == this.minimumIntegerDigits_ && (this.minimumIntegerDigits_ = 1));
  this.groupingArray_.push(Math.max(0, g));
  this.decimalSeparatorAlwaysShown_ = 0 == c || c == a;
};
var od = { prefix: '', suffix: '', divisorBase: 0 };
md.prototype.getUnitFor_ = function(a, b) {
  var c = 1 == this.compactStyle_ ? gd.COMPACT_DECIMAL_SHORT_PATTERN : gd.COMPACT_DECIMAL_LONG_PATTERN;
  null == c && (c = gd.COMPACT_DECIMAL_SHORT_PATTERN);
  if (3 > a) return od;
  a = Math.min(14, a);
  var d = c[L(1, a)];
  for (--a; !d && 3 <= a;) d = c[L(1, a)], a--;
  if (!d) return od;
  b = d[b];
  return b && '0' != b ? (b = /([^0]*)(0+)(.*)/.exec(b)) ? {
    prefix: b[1],
    suffix: b[3],
    divisorBase: a + 1 - (b[2].length - 1),
  } : od : od;
};
md.prototype.getUnitAfterRounding_ = function(a, b) {
  if (0 == this.compactStyle_) return od;
  a = Math.abs(a);
  b = Math.abs(b);
  var c = this.pluralForm_(a), d = 1 >= a ? 0 : this.intLog10_(a);
  c = this.getUnitFor_(d, c).divisorBase;
  b = L(b, -c);
  b = this.roundNumber_(b);
  a = L(a, -c);
  a = this.roundNumber_(a);
  b = this.pluralForm_(b.intValue + b.fracValue);
  return this.getUnitFor_(c + this.intLog10_(a.intValue), b);
};
md.prototype.intLog10_ = function(a) {
  if (!isFinite(a)) return 0 < a ? a : 0;
  for (var b = 0; 1 <= (a /= 10);) b++;
  return b;
};
var L = function(a, b) {
  B(0 == b % 1, 'Cannot shift by fractional digits "%s".', b);
  if (!a || !isFinite(a) || 0 == b) return a;
  a = String(a).split('e');
  b = parseInt(a[1] || 0, 10) + b;
  return parseFloat(a[0] + 'e' + b);
}, pd = function(a, b) {
  B(0 == b % 1, 'Cannot round to fractional digits "%s".', b);
  return a && isFinite(a) ? L(Math.round(L(a, b)), -b) : a;
};
md.prototype.roundToSignificantDigits_ = function(a, b, c) {
  if (!a) return a;
  var d = this.intLog10_(a);
  b = b - d - 1;
  return b < -c ? pd(a, -c) : pd(a, b);
};
md.prototype.pluralForm_ = function() {
  return 'other';
};
md.prototype.isCurrencyCodeBeforeValue = function() {
  var a = this.pattern_.indexOf('\u00a4'), b = this.pattern_.indexOf('#'), c = this.pattern_.indexOf('0'),
    d = Number.MAX_VALUE;
  0 <= b && b < d && (d = b);
  0 <= c && c < d && (d = c);
  return a < d;
};
var qd = function(a) {
  return 1 == a % 10 && 11 != a % 100 ? 'one' : 2 == a % 10 && 12 != a % 100 ? 'two' : 3 == a % 10 && 13 != a % 100 ? 'few' : 'other';
}, rd = qd;
rd = qd;
var sd = function(a) {
  a += '';
  var b = a.indexOf('.');
  return -1 == b ? 0 : a.length - b - 1;
}, td = function(a, b) {
  var c = a | 0;
  b = void 0 === b ? Math.min(sd(a), 3) : b;
  var d = Math.pow(10, b);
  d = (a * d | 0) % d;
  a = b;
  b = d;
  return 1 == c && 0 == a ? 'one' : 'other';
}, ud = td;
ud = td;
var yd = function(a) {
  this.pattern_ = a;
  this.parsedPattern_ = this.literals_ = this.initialLiterals_ = null;
  a = kd;
  var b = gd;
  if (vd !== a || wd !== b) vd = a, wd = b, xd = new md(1);
  this.numberFormatter_ = a = xd;
}, vd = null, wd = null, xd = null, zd = /'([{}#].*?)'/g, Ad = /''/g;
m = yd.prototype;
m.format = function(a) {
  return this.format_(a, !1);
};
m.formatIgnoringPound = function(a) {
  return this.format_(a, !0);
};
m.format_ = function(a, b) {
  this.init_();
  if (!this.parsedPattern_ || 0 == this.parsedPattern_.length) return '';
  var c = this.initialLiterals_;
  var d = c.length;
  if (0 < d) {
    for (var e = Array(d), f = 0; f < d; f++) e[f] = c[f];
    c = e;
  } else c = [];
  this.literals_ = c;
  c = [];
  this.formatBlock_(this.parsedPattern_, a, b, c);
  a = c.join('');
  for (b || B(-1 == a.search('#'), 'Not all # were replaced.'); 0 < this.literals_.length;) a = a.replace(this.buildPlaceholder_(this.literals_), this.literals_.pop());
  return a;
};
m.formatBlock_ = function(a, b, c, d) {
  for (var e = 0; e < a.length; e++) switch (a[e].type) {
    case 4:
      d.push(a[e].value);
      break;
    case 3:
      var f = a[e].value;
      this.formatSimplePlaceholder_(f, b, d);
      break;
    case 2:
      f = a[e].value;
      this.formatSelectBlock_(f, b, c, d);
      break;
    case 0:
      f = a[e].value;
      this.formatPluralOrdinalBlock_(f, b, ud, c, d);
      break;
    case 1:
      f = a[e].value;
      this.formatPluralOrdinalBlock_(f, b, rd, c, d);
      break;
    default:
      C('Unrecognized block type: ' + a[e].type);
  }
};
m.formatSimplePlaceholder_ = function(a, b, c) {
  b = b[a];
  ta(b) ? (this.literals_.push(b), c.push(this.buildPlaceholder_(this.literals_))) : c.push('Undefined parameter - ' + a);
};
m.formatSelectBlock_ = function(a, b, c, d) {
  var e = a.argumentIndex;
  ta(b[e]) ? (e = a[b[e]], ta(e) || (e = a.other, Ia(e, 'Invalid option or missing other option for select block.')), this.formatBlock_(e, b, c, d)) : d.push('Undefined parameter - ' + e);
};
m.formatPluralOrdinalBlock_ = function(a, b, c, d, e) {
  var f = a.argumentIndex, g = a.argumentOffset, k = +b[f];
  isNaN(k) ? e.push('Undefined or invalid parameter - ' + f) : (g = k - g, f = a[b[f]], ta(f) || (B(0 <= g, 'Argument index smaller than offset.'), c = c(g), Ha(c, 'Invalid plural key.'), f = a[c], ta(f) || (f = a.other), Ia(f, 'Invalid option or missing other option for plural block.')), a = [], this.formatBlock_(f, b, d, a), b = a.join(''), Ha(b, 'Empty block in plural.'), d ? e.push(b) : (d = this.numberFormatter_.format(g), e.push(b.replace(/#/g, d))));
};
m.init_ = function() {
  if (this.pattern_) {
    this.initialLiterals_ = [];
    var a = this.insertPlaceholders_(this.pattern_);
    this.parsedPattern_ = this.parseBlock_(a);
    this.pattern_ = null;
  }
};
m.insertPlaceholders_ = function(a) {
  var b = this.initialLiterals_, c = za(this.buildPlaceholder_, this);
  a = a.replace(Ad, function() {
    b.push('\'');
    return c(b);
  });
  return a = a.replace(zd, function(d, e) {
    b.push(e);
    return c(b);
  });
};
m.extractParts_ = function(a) {
  var b = 0, c = [], d = [], e = /[{}]/g;
  e.lastIndex = 0;
  for (var f; f = e.exec(a);) {
    var g = f.index;
    '}' == f[0] ? (f = c.pop(), B(ta(f) && '{' == f, 'No matching { for }.'), 0 == c.length && (f = { type: 1 }, f.value = a.substring(b, g), d.push(f), b = g + 1)) : (0 == c.length && (b = a.substring(b, g), '' != b && d.push({
      type: 0,
      value: b,
    }), b = g + 1), c.push('{'));
  }
  B(0 == c.length, 'There are mismatched { or } in the pattern.');
  b = a.substring(b);
  '' != b && d.push({ type: 0, value: b });
  return d;
};
var Bd = /^\s*(\w+)\s*,\s*plural\s*,(?:\s*offset:(\d+))?/, Cd = /^\s*(\w+)\s*,\s*selectordinal\s*,/,
  Dd = /^\s*(\w+)\s*,\s*select\s*,/;
m = yd.prototype;
m.parseBlockType_ = function(a) {
  return Bd.test(a) ? 0 : Cd.test(a) ? 1 : Dd.test(a) ? 2 : /^\s*\w+\s*/.test(a) ? 3 : 5;
};
m.parseBlock_ = function(a) {
  var b = [];
  a = this.extractParts_(a);
  for (var c = 0; c < a.length; c++) {
    var d = {};
    if (0 == a[c].type) d.type = 4, d.value = a[c].value; else if (1 == a[c].type) {
      var e = this.parseBlockType_(a[c].value);
      switch (e) {
        case 2:
          d.type = 2;
          d.value = this.parseSelectBlock_(a[c].value);
          break;
        case 0:
          d.type = 0;
          d.value = this.parsePluralBlock_(a[c].value);
          break;
        case 1:
          d.type = 1;
          d.value = this.parseOrdinalBlock_(a[c].value);
          break;
        case 3:
          d.type = 3;
          d.value = a[c].value;
          break;
        default:
          C('Unknown block type for pattern: ' + a[c].value);
      }
    } else C('Unknown part of the pattern.');
    b.push(d);
  }
  return b;
};
m.parseSelectBlock_ = function(a) {
  var b = '';
  a = a.replace(Dd, function(g, k) {
    b = k;
    return '';
  });
  var c = {};
  c.argumentIndex = b;
  a = this.extractParts_(a);
  for (var d = 0; d < a.length;) {
    var e = a[d].value;
    Ha(e, 'Missing select key element.');
    d++;
    B(d < a.length, 'Missing or invalid select value element.');
    if (1 == a[d].type) var f = this.parseBlock_(a[d].value); else C('Expected block type.');
    c[e.replace(/\s/g, '')] = f;
    d++;
  }
  Ia(c.other, 'Missing other key in select statement.');
  return c;
};
m.parsePluralBlock_ = function(a) {
  var b = '', c = 0;
  a = a.replace(Bd, function(k, h, l) {
    b = h;
    l && (c = parseInt(l, 10));
    return '';
  });
  var d = {};
  d.argumentIndex = b;
  d.argumentOffset = c;
  a = this.extractParts_(a);
  for (var e = 0; e < a.length;) {
    var f = a[e].value;
    Ha(f, 'Missing plural key element.');
    e++;
    B(e < a.length, 'Missing or invalid plural value element.');
    if (1 == a[e].type) var g = this.parseBlock_(a[e].value); else C('Expected block type.');
    d[f.replace(/\s*(?:=)?(\w+)\s*/, '$1')] = g;
    e++;
  }
  Ia(d.other, 'Missing other key in plural statement.');
  return d;
};
m.parseOrdinalBlock_ = function(a) {
  var b = '';
  a = a.replace(Cd, function(g, k) {
    b = k;
    return '';
  });
  var c = {};
  c.argumentIndex = b;
  c.argumentOffset = 0;
  a = this.extractParts_(a);
  for (var d = 0; d < a.length;) {
    var e = a[d].value;
    Ha(e, 'Missing ordinal key element.');
    d++;
    B(d < a.length, 'Missing or invalid ordinal value element.');
    if (1 == a[d].type) var f = this.parseBlock_(a[d].value); else C('Expected block type.');
    c[e.replace(/\s*(?:=)?(\w+)\s*/, '$1')] = f;
    d++;
  }
  Ia(c.other, 'Missing other key in selectordinal statement.');
  return c;
};
m.buildPlaceholder_ = function(a) {
  B(0 < a.length, 'Literal array is empty.');
  a = (a.length - 1).toString(10);
  return '\ufddf_' + a + '_';
};
var M = function(a) {
  var b = a.split('x');
  a = { width: 0, height: 0 };
  if (2 == b.length) {
    var c = parseInt(b[0], 10);
    isNaN(c) || (a.width = c);
    b = parseInt(b[1], 10);
    isNaN(b) || (a.height = b);
  }
  return a;
}, N = function(a) {
  return a.width + 'x' + a.height;
}, Ed = function(a, b) {
  var c = window.gwdPreview || {};
  a = 'MSG_' + a;
  return (c = c.strings[a] || '') && b ? (c = new yd(c), c.format(b)) : c;
}, Fd = function(a) {
  (a = a.contentWindow) && a.location.reload();
};
var Gd = K.Devices, Hd = K.SettingType, Id = function(a) {
  this.element_ = a;
  this.initialize_();
};
Id.prototype.initialize_ = function() {
  var a = this.getPreviewConfig_();
  if (a) {
    var b = a;
    a = b.previewPath;
    var c = b.modes, d = b.sizes, e = b.breakpoints, f = b.feedNames, g = b.defaults;
    b = b.reloadOnResize;
    var k = this.getSavedSettings_();
    if (k) g = k; else {
      g = g || {};
      g.modeSettings = g.modeSettings || {};
      for (var h in g.modeSettings) if (k = g.modeSettings[h], k[Hd.DEVICE]) {
        var l = Gd.get(k[Hd.DEVICE]);
        if (l) {
          var n = l;
          l = n.width;
          n = n.height;
          k[Hd.DEVICE_SIZE] = N({ width: l, height: n });
        }
      }
    }
    this.element_.previewPath = a || '';
    this.element_.modes = c || [];
    this.element_.sizes =
      d || [];
    this.element_.breakpoints = e || {};
    this.element_.feeds = f || [];
    this.element_.mode = g.mode || '';
    this.element_.modeSettings = g.modeSettings || {};
    this.element_.reloadOnResize = b;
    this.element_.addEventListener('setting-change', this.saveSettings_.bind(this));
  } else window.console && console.error('Cannot initialize preview because no configuration was found.');
};
Id.prototype.getPreviewConfig_ = function() {
  return window.gwdPreview && window.gwdPreview.config || null;
};
Id.prototype.getSavedSettings_ = function() {
  var a = window.sessionStorage.getItem('gwdPreviewSettings');
  return a ? JSON.parse(a) : null;
};
Id.prototype.saveSettings_ = function() {
  var a = { mode: this.element_.mode, modeSettings: this.element_.modeSettings };
  a = JSON.stringify(a);
  window.sessionStorage.setItem('gwdPreviewSettings', a);
};
window.addEventListener('WebComponentsReady', function Jd() {
  var b = document.getElementById('preview-app');
  new Id(b);
  window.removeEventListener('WebComponentsReady', Jd);
});
var Kd = document.createElement('template');
Kd.innerHTML = '<style>\n  /* Hide spinner in Firefox. */\n  ::slotted(input[type="number"]) {\n    -moz-appearance: textfield;\n  }\n\n  /* Hide spinner in Webkit.  This will not work in v2, ::slotted doesn\'t allow styling non\n   * tree-abiding pseudo elements.  These styles must be set in the component which creates the\n   * element which is being slotted. */\n  ::content input[type="number"]::-webkit-outer-spin-button,\n  ::content input[type="number"]::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n\n  ::content input,\n  ::slotted(input) {\n    /* In webcomponents v1, when using <slot> instead of <content>, the spec does not allow\n     * styling the children of slotted elements, so styles must be forwarded from this element\n     * to the input.\n     */\n    @apply --paper-input-container-input-style-forward;\n  }\n</style>\n<slot name="sliderinput"></slot>\n';/*

Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var Ld = { 'U+0008': 'backspace', 'U+0009': 'tab', 'U+001B': 'esc', 'U+0020': 'space', 'U+007F': 'del' }, Md = {
    8: 'backspace',
    9: 'tab',
    13: 'enter',
    27: 'esc',
    33: 'pageup',
    34: 'pagedown',
    35: 'end',
    36: 'home',
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    46: 'del',
    106: '*',
  }, Nd = { shift: 'shiftKey', ctrl: 'ctrlKey', alt: 'altKey', meta: 'metaKey' }, Od = /[a-z0-9*]/, Pd = /U\+/,
  Qd = /^arrow/, Rd = /^space(bar)?/, Sd = /^escape$/;

function Td(a, b) {
  var c = '';
  if (a) if (a = a.toLowerCase(), ' ' === a || Rd.test(a)) c = 'space'; else if (Sd.test(a)) c = 'esc'; else if (1 == a.length) {
    if (!b || Od.test(a)) c = a;
  } else c = Qd.test(a) ? a.replace('arrow', '') : 'multiply' == a ? '*' : a;
  return c;
}

function Ud(a, b) {
  var c = b;
  var d = a.hasModifiers;
  if (c.key) c = Td(c.key, d); else if (c.detail && c.detail.key) c = Td(c.detail.key, d); else {
    d = c.keyIdentifier;
    var e = '';
    d && (d in Ld ? e = Ld[d] : Pd.test(d) ? (d = parseInt(d.replace('U+', '0x'), 16), e = String.fromCharCode(d).toLowerCase()) : e = d.toLowerCase());
    d = e;
    d || (c = c.keyCode, d = '', Number(c) && (d = 65 <= c && 90 >= c ? String.fromCharCode(32 + c) : 112 <= c && 123 >= c ? 'f' + (c - 112 + 1) : 48 <= c && 57 >= c ? String(c - 48) : 96 <= c && 105 >= c ? String(c - 96) : Md[c]));
    c = d || '';
  }
  return c === a.key && (!a.hasModifiers || !!b.shiftKey ===
    !!a.shiftKey && !!b.ctrlKey === !!a.ctrlKey && !!b.altKey === !!a.altKey && !!b.metaKey === !!a.metaKey);
}

function Vd(a) {
  return 1 === a.length ? { combo: a, key: a, event: 'keydown' } : a.split('+').reduce(function(b, c) {
    var d = c.split(':');
    c = d[0];
    d = d[1];
    c in Nd ? (b[Nd[c]] = !0, b.hasModifiers = !0) : (b.key = c, b.event = d || 'keydown');
    return b;
  }, { combo: a.split(':').shift() });
}

function Wd(a) {
  return a.trim().split(' ').map(function(b) {
    return Vd(b);
  });
}

var Xd = {
  properties: {
    keyEventTarget: {
      type: Object, value: function() {
        return this;
      },
    }, stopKeyboardEventPropagation: { type: Boolean, value: !1 }, _boundKeyHandlers: {
      type: Array, value: function() {
        return [];
      },
    }, _imperativeKeyBindings: {
      type: Object, value: function() {
        return {};
      },
    },
  },
  observers: ['_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)'],
  keyBindings: {},
  registered: function() {
    this._prepKeyBindings();
  },
  attached: function() {
    this._listenKeyEventListeners();
  },
  detached: function() {
    this._unlistenKeyEventListeners();
  },
  addOwnKeyBinding: function(a,
                             b) {
    this._imperativeKeyBindings[a] = b;
    this._prepKeyBindings();
    this._resetKeyEventListeners();
  },
  removeOwnKeyBindings: function() {
    this._imperativeKeyBindings = {};
    this._prepKeyBindings();
    this._resetKeyEventListeners();
  },
  keyboardEventMatchesKeys: function(a, b) {
    b = Wd(b);
    for (var c = 0; c < b.length; ++c) if (Ud(b[c], a)) return !0;
    return !1;
  },
  _collectKeyBindings: function() {
    var a = this.behaviors.map(function(b) {
      return b.keyBindings;
    });
    -1 === a.indexOf(this.keyBindings) && a.push(this.keyBindings);
    return a;
  },
  _prepKeyBindings: function() {
    this._keyBindings =
      {};
    this._collectKeyBindings().forEach(function(c) {
      for (var d in c) this._addKeyBinding(d, c[d]);
    }, this);
    for (var a in this._imperativeKeyBindings) this._addKeyBinding(a, this._imperativeKeyBindings[a]);
    for (var b in this._keyBindings) this._keyBindings[b].sort(function(c, d) {
      c = c[0].hasModifiers;
      d = d[0].hasModifiers;
      return c === d ? 0 : c ? -1 : 1;
    });
  },
  _addKeyBinding: function(a, b) {
    Wd(a).forEach(function(c) {
      this._keyBindings[c.event] = this._keyBindings[c.event] || [];
      this._keyBindings[c.event].push([c, b]);
    }, this);
  },
  _resetKeyEventListeners: function() {
    this._unlistenKeyEventListeners();
    this.isAttached && this._listenKeyEventListeners();
  },
  _listenKeyEventListeners: function() {
    this.keyEventTarget && Object.keys(this._keyBindings).forEach(function(a) {
      var b = this._keyBindings[a];
      b = this._onKeyBindingEvent.bind(this, b);
      this._boundKeyHandlers.push([this.keyEventTarget, a, b]);
      this.keyEventTarget.addEventListener(a, b);
    }, this);
  },
  _unlistenKeyEventListeners: function() {
    for (var a, b, c; this._boundKeyHandlers.length;) a = this._boundKeyHandlers.pop(), b = a[0], c = a[1], a = a[2], b.removeEventListener(c, a);
  },
  _onKeyBindingEvent: function(a,
                               b) {
    this.stopKeyboardEventPropagation && b.stopPropagation();
    if (!b.defaultPrevented) for (var c = 0; c < a.length; c++) {
      var d = a[c][0], e = a[c][1];
      if (Ud(d, b) && (this._triggerKeyHandler(d, e, b), b.defaultPrevented)) break;
    }
  },
  _triggerKeyHandler: function(a, b, c) {
    var d = Object.create(a);
    d.keyboardEvent = c;
    a = new CustomEvent(a.event, { detail: d, cancelable: !0 });
    this[b].call(this, a);
    a.defaultPrevented && c.preventDefault();
  },
};
Polymer.IronA11yKeysBehavior = Xd;
var Yd = {}, Zd = {}, O = function(a) {
  return HTMLElement.apply(this, arguments) || this;
};
w(O, HTMLElement);
O.import = function(a, b) {
  return a ? (a = Yd[a] || Zd[a.toLowerCase()]) && b ? a.querySelector(b) : a : null;
};
O.prototype.attributeChangedCallback = function(a, b, c) {
  b !== c && this.register();
};
O.prototype.register = function(a) {
  if (a = a || this.id) {
    if ($b && void 0 !== (Yd[a] || Zd[a.toLowerCase()])) throw Yd[a] = Zd[a.toLowerCase()] = null, Error('strictTemplatePolicy: dom-module ' + a + ' re-registered');
    this.id = a;
    Yd[a] = Zd[a.toLowerCase()] = this;
    this.querySelector('style') && console.warn('dom-module %s has style outside template', this.id);
  }
};
x.Object.defineProperties(O.prototype, {
  assetpath: {
    configurable: !0, enumerable: !0, get: function() {
      if (!this.__assetpath) {
        var a = window.HTMLImports && HTMLImports.importForElement ? HTMLImports.importForElement(this) || document : this.ownerDocument;
        a = Ob(this.getAttribute('assetpath') || '', a.baseURI);
        this.__assetpath = Qb(a);
      }
      return this.__assetpath;
    },
  },
});
x.Object.defineProperties(O, {
  observedAttributes: {
    configurable: !0, enumerable: !0, get: function() {
      return ['id'];
    },
  },
});
O.prototype.modules = Yd;
customElements.define('dom-module', O);
var $d = 0, ae = 0, be = [], ce = 0, de = document.createTextNode('');
(new window.MutationObserver(ee)).observe(de, { characterData: !0 });

function ee() {
  for (var a = be.length, b = 0; b < a; b++) {
    var c = be[b];
    if (c) try {
      c();
    } catch (d) {
      setTimeout(function() {
        throw d;
      });
    }
  }
  be.splice(0, a);
  ae += a;
}

var fe = {
  after: function(a) {
    return {
      run: function(b) {
        return window.setTimeout(b, a);
      }, cancel: function(b) {
        window.clearTimeout(b);
      },
    };
  }, run: function(a, b) {
    return window.setTimeout(a, b);
  }, cancel: function(a) {
    window.clearTimeout(a);
  },
}, ge = {
  run: function(a) {
    return window.requestAnimationFrame(a);
  }, cancel: function(a) {
    window.cancelAnimationFrame(a);
  },
}, he = {
  run: function(a) {
    return window.requestIdleCallback ? window.requestIdleCallback(a) : window.setTimeout(a, 16);
  }, cancel: function(a) {
    window.cancelIdleCallback ? window.cancelIdleCallback(a) :
      window.clearTimeout(a);
  },
}, ie = {
  run: function(a) {
    de.textContent = ce++;
    be.push(a);
    return $d++;
  }, cancel: function(a) {
    var b = a - ae;
    if (0 <= b) {
      if (!be[b]) throw Error('invalid async handle: ' + a);
      be[b] = null;
    }
  },
};
var je = 0, P = function(a) {
  function b(e) {
    var f = e.__mixinSet;
    if (f && f[d]) return e;
    var g = c, k = g.get(e);
    k || (k = a(e), g.set(e, k));
    e = Object.create(k.__mixinSet || f || null);
    e[d] = !0;
    k.__mixinSet = e;
    return k;
  }

  var c = a.__mixinApplications;
  c || (c = new WeakMap, a.__mixinApplications = c);
  var d = je++;
  return b;
};
var Q = window.ShadyDOM && window.ShadyDOM.noPatch && window.ShadyDOM.wrap ? window.ShadyDOM.wrap : function(a) {
  return a;
};
var ke = P(function(a) {
  var b = function() {
    var c = a.call(this) || this;
    c.__dataEnabled = !1;
    c.__dataReady = !1;
    c.__dataInvalid = !1;
    c.__data = {};
    c.__dataPending = null;
    c.__dataOld = null;
    c.__dataInstanceProps = null;
    c.__serializing = !1;
    c._initializeProperties();
    return c;
  };
  w(b, a);
  b.createProperties = function(c) {
    var d = this.prototype, e;
    for (e in c) e in d || d._createPropertyAccessor(e);
  };
  b.attributeNameForProperty = function(c) {
    return c.toLowerCase();
  };
  b.typeForProperty = function() {
  };
  b.prototype._createPropertyAccessor = function(c,
                                                 d) {
    this._addPropertyToAttributeMap(c);
    this.hasOwnProperty('__dataHasAccessor') || (this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor));
    this.__dataHasAccessor[c] || (this.__dataHasAccessor[c] = !0, this._definePropertyAccessor(c, d));
  };
  b.prototype._addPropertyToAttributeMap = function(c) {
    this.hasOwnProperty('__dataAttributes') || (this.__dataAttributes = Object.assign({}, this.__dataAttributes));
    if (!this.__dataAttributes[c]) {
      var d = this.constructor.attributeNameForProperty(c);
      this.__dataAttributes[d] =
        c;
    }
  };
  b.prototype._definePropertyAccessor = function(c, d) {
    Object.defineProperty(this, c, {
      get: function() {
        return this._getProperty(c);
      }, set: d ? function() {
      } : function(e) {
        this._setProperty(c, e);
      },
    });
  };
  b.prototype.ready = function() {
    this.__dataReady = !0;
    this._flushProperties();
  };
  b.prototype._initializeProperties = function() {
    for (var c in this.__dataHasAccessor) this.hasOwnProperty(c) && (this.__dataInstanceProps = this.__dataInstanceProps || {}, this.__dataInstanceProps[c] = this[c], delete this[c]);
  };
  b.prototype._initializeInstanceProperties =
    function(c) {
      Object.assign(this, c);
    };
  b.prototype._setProperty = function(c, d) {
    this._setPendingProperty(c, d) && this._invalidateProperties();
  };
  b.prototype._getProperty = function(c) {
    return this.__data[c];
  };
  b.prototype._setPendingProperty = function(c, d) {
    var e = this.__data[c], f = this._shouldPropertyChange(c, d, e);
    f && (this.__dataPending || (this.__dataPending = {}, this.__dataOld = {}), !this.__dataOld || c in this.__dataOld || (this.__dataOld[c] = e), this.__data[c] = d, this.__dataPending[c] = d);
    return f;
  };
  b.prototype._invalidateProperties =
    function() {
      var c = this;
      !this.__dataInvalid && this.__dataReady && (this.__dataInvalid = !0, ie.run(function() {
        c.__dataInvalid && (c.__dataInvalid = !1, c._flushProperties());
      }));
    };
  b.prototype._enableProperties = function() {
    this.__dataEnabled || (this.__dataEnabled = !0, this.__dataInstanceProps && (this._initializeInstanceProperties(this.__dataInstanceProps), this.__dataInstanceProps = null), this.ready());
  };
  b.prototype._flushProperties = function() {
    var c = this.__data, d = this.__dataPending, e = this.__dataOld;
    this._shouldPropertiesChange(c,
      d, e) && (this.__dataOld = this.__dataPending = null, this._propertiesChanged(c, d, e));
  };
  b.prototype._shouldPropertiesChange = function(c, d) {
    return !!d;
  };
  b.prototype._propertiesChanged = function() {
  };
  b.prototype._shouldPropertyChange = function(c, d, e) {
    return e !== d && (e === e || d === d);
  };
  b.prototype.attributeChangedCallback = function(c, d, e, f) {
    d !== e && this._attributeToProperty(c, e);
    a.prototype.attributeChangedCallback && a.prototype.attributeChangedCallback.call(this, c, d, e, f);
  };
  b.prototype._attributeToProperty = function(c, d, e) {
    if (!this.__serializing) {
      var f =
        this.__dataAttributes;
      c = f && f[c] || c;
      this[c] = this._deserializeValue(d, e || this.constructor.typeForProperty(c));
    }
  };
  b.prototype._propertyToAttribute = function(c, d, e) {
    this.__serializing = !0;
    e = 3 > arguments.length ? this[c] : e;
    this._valueToNodeAttribute(this, e, d || this.constructor.attributeNameForProperty(c));
    this.__serializing = !1;
  };
  b.prototype._valueToNodeAttribute = function(c, d, e) {
    d = this._serializeValue(d);
    if (void 0 === d) c.removeAttribute(e); else {
      if ('class' === e || 'name' === e || 'slot' === e) c = Q(c);
      c.setAttribute(e, d);
    }
  };
  b.prototype._serializeValue = function(c) {
    switch (typeof c) {
      case 'boolean':
        return c ? '' : void 0;
      default:
        return null != c ? c.toString() : void 0;
    }
  };
  b.prototype._deserializeValue = function(c, d) {
    switch (d) {
      case Boolean:
        return null !== c;
      case Number:
        return Number(c);
      default:
        return c;
    }
  };
  return b;
});
var le = 0;

function me() {
  le++;
}

var ne = [];

function _regLog$$module$third_party$javascript$polymer$v2$polymer$lib$utils$telemetry(a) {
  console.log('[' + a.is + ']: registered');
}

function oe(a) {
  ne.push(a);
}

function pe() {
  ne.forEach(_regLog$$module$third_party$javascript$polymer$v2$polymer$lib$utils$telemetry);
};var qe = P(function(a) {
  function b(f) {
    f = Object.getPrototypeOf(f);
    return f.prototype instanceof e ? f : null;
  }

  function c(f) {
    if (!f.hasOwnProperty('__ownProperties')) {
      var g = null;
      if (f.hasOwnProperty('properties')) {
        var k = f.properties;
        if (k) {
          g = {};
          for (var h in k) {
            var l = k[h];
            g[h] = 'function' === typeof l ? { type: l } : l;
          }
        }
      }
      f.__ownProperties = g;
    }
    return f.__ownProperties;
  }

  var d = ke(a), e = function(f) {
    return d.apply(this, arguments) || this;
  };
  w(e, d);
  e.finalize = function() {
    if (!this.hasOwnProperty('__finalized')) {
      var f = b(this);
      f && f.finalize();
      this.__finalized = !0;
      this._finalizeClass();
    }
  };
  e._finalizeClass = function() {
    var f = c(this);
    f && this.createProperties(f);
  };
  e.typeForProperty = function(f) {
    return (f = this._properties[f]) && f.type;
  };
  e.prototype._initializeProperties = function() {
    le++;
    this.constructor.finalize();
    d.prototype._initializeProperties.call(this);
  };
  e.prototype.connectedCallback = function() {
    d.prototype.connectedCallback && d.prototype.connectedCallback.call(this);
    this._enableProperties();
  };
  e.prototype.disconnectedCallback = function() {
    d.prototype.disconnectedCallback &&
    d.prototype.disconnectedCallback.call(this);
  };
  x.Object.defineProperties(e, {
    observedAttributes: {
      configurable: !0, enumerable: !0, get: function() {
        var f = this;
        if (!this.hasOwnProperty('__observedAttributes')) {
          oe(this.prototype);
          var g = this._properties;
          this.__observedAttributes = g ? Object.keys(g).map(function(k) {
            return f.attributeNameForProperty(k);
          }) : [];
        }
        return this.__observedAttributes;
      },
    }, _properties: {
      configurable: !0, enumerable: !0, get: function() {
        if (!this.hasOwnProperty('__properties')) {
          var f = b(this);
          this.__properties =
            Object.assign({}, f && f._properties, c(this));
        }
        return this.__properties;
      },
    },
  });
  return e;
});
var re = {}, se = /-[a-z]/g, te = /([A-Z])/g;

function ue(a) {
  return re[a] || (re[a] = 0 > a.indexOf('-') ? a : a.replace(se, function(b) {
    return b[1].toUpperCase();
  }));
}

function ve(a) {
  return re[a] || (re[a] = a.replace(te, '-$1').toLowerCase());
};
for (var we = {}, xe = HTMLElement.prototype; xe;) {
  for (var ye = Object.getOwnPropertyNames(xe), ze = 0; ze < ye.length; ze++) we[ye[ze]] = !0;
  xe = Object.getPrototypeOf(xe);
}

function Ae(a, b) {
  if (!we[b]) {
    var c = a[b];
    void 0 !== c && (a.__data ? a._setPendingProperty(b, c) : (a.__dataProto ? a.hasOwnProperty('__dataProto') || (a.__dataProto = Object.create(a.__dataProto)) : a.__dataProto = {}, a.__dataProto[b] = c));
  }
}

var Be = P(function(a) {
  var b = ke(a);
  a = function(c) {
    return b.apply(this, arguments) || this;
  };
  w(a, b);
  a.createPropertiesForAttributes = function() {
    for (var c = this.observedAttributes, d = 0; d < c.length; d++) this.prototype._createPropertyAccessor(ue(c[d]));
  };
  a.attributeNameForProperty = function(c) {
    return ve(c);
  };
  a.prototype._initializeProperties = function() {
    this.__dataProto && (this._initializeProtoProperties(this.__dataProto), this.__dataProto = null);
    b.prototype._initializeProperties.call(this);
  };
  a.prototype._initializeProtoProperties =
    function(c) {
      for (var d in c) this._setProperty(d, c[d]);
    };
  a.prototype._ensureAttribute = function(c, d) {
    var e = this;
    e.hasAttribute(c) || this._valueToNodeAttribute(e, d, c);
  };
  a.prototype._serializeValue = function(c) {
    switch (typeof c) {
      case 'object':
        if (c instanceof Date) return c.toString();
        if (c) try {
          return JSON.stringify(c);
        } catch (d) {
          return '';
        }
      default:
        return b.prototype._serializeValue.call(this, c);
    }
  };
  a.prototype._deserializeValue = function(c, d) {
    switch (d) {
      case Object:
        try {
          var e = JSON.parse(c);
        } catch (f) {
          e = c;
        }
        break;
      case Array:
        try {
          e =
            JSON.parse(c);
        } catch (f) {
          e = null, console.warn('Polymer::Attributes: couldn\'t decode Array as JSON: ' + c);
        }
        break;
      case Date:
        e = isNaN(c) ? String(c) : Number(c);
        e = new Date(e);
        break;
      default:
        e = b.prototype._deserializeValue.call(this, c, d);
    }
    return e;
  };
  a.prototype._definePropertyAccessor = function(c, d) {
    if (lc) {
      var e = this.__dataReady;
      this.__dataReady = !1;
      Ae(this, c);
      this.__dataReady = e;
    } else Ae(this, c);
    b.prototype._definePropertyAccessor.call(this, c, d);
  };
  a.prototype._hasAccessor = function(c) {
    return this.__dataHasAccessor && this.__dataHasAccessor[c];
  };
  a.prototype._isPropertyPending = function(c) {
    return !!(this.__dataPending && c in this.__dataPending);
  };
  return a;
});
var Ce = { 'dom-if': !0, 'dom-repeat': !0 };

function De(a, b) {
  var c = b.parentInfo && De(a, b.parentInfo);
  if (c) for (a = c.firstChild, c = 0; a; a = a.nextSibling) {
    if (b.parentIndex === c++) return a;
  } else return a;
}

function Ee(a, b, c) {
  a = a._methodHost || a;
  return b = function(d) {
    if (a[c]) a[c](d, d.detail); else console.warn('listener method `' + c + '` not defined');
  };
}

var Fe = P(function(a) {
  var b = function(c) {
    return a.apply(this, arguments) || this;
  };
  w(b, a);
  b._parseTemplate = function(c, d) {
    if (!c._templateInfo) {
      var e = c._templateInfo = {};
      e.nodeInfoList = [];
      e.nestedTemplate = !!d;
      e.stripWhiteSpace = d && d.stripWhiteSpace || c.hasAttribute('strip-whitespace');
      this._parseTemplateContent(c, e, { parent: null });
    }
    return c._templateInfo;
  };
  b._parseTemplateContent = function(c, d, e) {
    return this._parseTemplateNode(c.content, d, e);
  };
  b._parseTemplateNode = function(c, d, e) {
    if ('template' != c.localName || c.hasAttribute('preserve-content')) 'slot' ===
    c.localName && (d.hasInsertionPoint = !0); else var f = this._parseTemplateNestedTemplate(c, d, e) || f;
    c.firstChild && (f = this._parseTemplateChildNodes(c, d, e) || f);
    c.hasAttributes && c.hasAttributes() && (f = this._parseTemplateNodeAttributes(c, d, e) || f);
    return f;
  };
  b._parseTemplateChildNodes = function(c, d, e) {
    if ('script' !== c.localName && 'style' !== c.localName) for (var f = c.firstChild, g = 0, k; f; f = k) {
      if ('template' == f.localName && (k = f.getAttribute('is')) && Ce[k]) {
        var h = f;
        h.removeAttribute('is');
        f = h.ownerDocument.createElement(k);
        h.parentNode.replaceChild(f, h);
        for (f.appendChild(h); h.attributes.length;) f.setAttribute(h.attributes[0].name, h.attributes[0].value), h.removeAttribute(h.attributes[0].name);
      }
      k = f.nextSibling;
      if (f.nodeType === Node.TEXT_NODE) {
        for (h = k; h && h.nodeType === Node.TEXT_NODE;) f.textContent += h.textContent, k = h.nextSibling, c.removeChild(h), h = k;
        if (d.stripWhiteSpace && !f.textContent.trim()) {
          c.removeChild(f);
          continue;
        }
      }
      h = { parentIndex: g, parentInfo: e };
      this._parseTemplateNode(f, d, h) && (h.infoIndex = d.nodeInfoList.push(h) - 1);
      f.parentNode &&
      g++;
    }
  };
  b._parseTemplateNestedTemplate = function(c, d, e) {
    d = this._parseTemplate(c, d);
    var f = d.content = c.content.ownerDocument.createDocumentFragment();
    f.appendChild(c.content);
    e.templateInfo = d;
    return !0;
  };
  b._parseTemplateNodeAttributes = function(c, d, e) {
    for (var f = !1, g = Array.from(c.attributes), k = g.length - 1, h; h = g[k]; k--) f = this._parseTemplateNodeAttribute(c, d, e, h.name, h.value) || f;
    return f;
  };
  b._parseTemplateNodeAttribute = function(c, d, e, f, g) {
    return 'on-' === f.slice(0, 3) ? (c.removeAttribute(f), e.events = e.events || [],
      e.events.push({ name: f.slice(3), value: g }), !0) : 'id' === f ? (e.id = g, !0) : !1;
  };
  b._contentForTemplate = function(c) {
    var d = c._templateInfo;
    return d && d.content || c.content;
  };
  b.prototype._stampTemplate = function(c) {
    c && !c.content && window.HTMLTemplateElement && HTMLTemplateElement.decorate && HTMLTemplateElement.decorate(c);
    var d = this.constructor._parseTemplate(c), e = d.nodeInfoList;
    c = d.content || c.content;
    c = document.importNode(c, !0);
    c.__noInsertionPoint = !d.hasInsertionPoint;
    d = c.nodeList = Array(e.length);
    c.$ = {};
    for (var f = 0,
           g = e.length, k = void 0; f < g && (k = e[f]); f++) {
      var h = d[f] = De(c, k);
      k.id && (c.$[k.id] = h);
      k.templateInfo && (h._templateInfo = k.templateInfo);
      if (k.events && k.events.length) for (var l = 0, n = k.events, p = void 0; l < n.length && (p = n[l]); l++) this._addMethodEventListenerToNode(h, p.name, p.value, this);
    }
    return c;
  };
  b.prototype._addMethodEventListenerToNode = function(c, d, e, f) {
    f = f || c;
    e = Ee(f, d, e);
    this._addEventListenerToNode(c, d, e);
    return e;
  };
  b.prototype._addEventListenerToNode = function(c, d, e) {
    c.addEventListener(d, e);
  };
  b.prototype._removeEventListenerFromNode =
    function(c, d, e) {
      c.removeEventListener(d, e);
    };
  return b;
});

function Ge(a) {
  return 0 <= a.indexOf('.');
}

function He(a) {
  var b = a.indexOf('.');
  return -1 === b ? a : a.slice(0, b);
}

function Ie(a, b) {
  return 0 === a.indexOf(b + '.');
}

function Je(a, b) {
  return 0 === b.indexOf(a + '.');
}

function Ke(a, b, c) {
  return b + c.slice(a.length);
}

function Le(a, b) {
  return a === b || Ie(a, b) || Je(a, b);
}

function Me(a) {
  if (Array.isArray(a)) {
    for (var b = [], c = 0; c < a.length; c++) for (var d = a[c].toString().split('.'), e = 0; e < d.length; e++) b.push(d[e]);
    return b.join('.');
  }
  return a;
}

function Ne(a) {
  return Array.isArray(a) ? Me(a).split('.') : a.toString().split('.');
}

function R(a, b, c) {
  b = Ne(b);
  for (var d = 0; d < b.length; d++) {
    if (!a) return;
    var e = b[d];
    a = a[e];
  }
  c && (c.path = b.join('.'));
  return a;
}

function Oe(a, b, c) {
  var d = Ne(b), e = d[d.length - 1];
  if (1 < d.length) {
    for (b = 0; b < d.length - 1; b++) {
      var f = d[b];
      a = a[f];
      if (!a) return;
    }
    a[e] = c;
  } else a[b] = c;
  return d.join('.');
};/*
 Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at
 http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 Google as part of the polymer project is also subject to an additional IP
 rights grant found at http://polymer.github.io/PATENTS.txt
*/
var Pe = 0, Qe = [], Re = {
  COMPUTE: '__computeEffects',
  REFLECT: '__reflectEffects',
  NOTIFY: '__notifyEffects',
  PROPAGATE: '__propagateEffects',
  OBSERVE: '__observeEffects',
  READ_ONLY: '__readOnly',
}, Se = /[A-Z]/;

function Te(a, b) {
  var c = a[b];
  if (!c) c = a[b] = {}; else if (!a.hasOwnProperty(b)) {
    c = a[b] = Object.create(a[b]);
    for (var d in c) {
      a = c[d];
      b = c[d] = Array(a.length);
      for (var e = 0; e < a.length; e++) b[e] = a[e];
    }
  }
  return c;
}

function Ue(a, b, c, d, e, f) {
  if (b) {
    var g = !1, k = Pe++, h;
    for (h in c) Ve(a, b, k, h, c, d, e, f) && (g = !0);
    return g;
  }
  return !1;
}

function Ve(a, b, c, d, e, f, g, k) {
  var h = !1, l = g ? He(d) : d;
  if (b = b[l]) {
    l = 0;
    for (var n = b.length, p = void 0; l < n && (p = b[l]); l++) {
      var r;
      if ((r = !p.info || p.info.lastRun !== c) && !(r = !g)) {
        r = d;
        var t = p.trigger;
        if (t) {
          var v = t.name;
          r = v == r || !(!t.structured || !Ie(v, r)) || !(!t.wildcard || !Je(v, r));
        } else r = !0;
      }
      r && (p.info && (p.info.lastRun = c), p.fn(a, d, e, f, p.info, g, k), h = !0);
    }
  }
  return h;
}

function We(a, b, c, d, e) {
  b = 'string' === typeof e.method ? a[e.method] : e.method;
  c = e.property;
  b ? b.call(a, a.__data[c], d[c]) : e.dynamicFn || console.warn('observer method `' + e.method + '` not defined');
}

function Xe(a, b, c, d, e) {
  var f = a.__notifyEffects, g = Pe++, k;
  for (k in b) if (b[k]) if (f && Ve(a, f, g, k, c, d, e)) var h = !0; else {
    var l;
    if (l = e) {
      l = a;
      var n = k, p = c, r = He(n);
      r !== n ? (r = ve(r) + '-changed', Ye(l, r, p[n], n), l = !0) : l = !1;
    }
    l && (h = !0);
  }
  var t;
  h && (t = a.__dataHost) && t._invalidateProperties && t._invalidateProperties();
}

function Ye(a, b, c, d) {
  c = { value: c, queueProperty: !0 };
  d && (c.path = d);
  Q(a).dispatchEvent(new CustomEvent(b, { detail: c }));
}

function Ze(a, b, c, d, e, f) {
  d = f ? He(b) : b;
  f = (d = d != b ? b : null) ? R(a, d) : a.__data[b];
  d && void 0 === f && (f = c[b]);
  Ye(a, e.eventName, f, d);
}

function $e(a, b, c, d, e) {
  c = a.__data[b];
  Wb && (c = Wb(c, e.attrName, 'attribute', a));
  a._propertyToAttribute(b, e.attrName, c);
}

function af(a, b, c, d, e) {
  b = bf(a, b, c, d, e);
  b !== Qe && (e = e.methodInfo, a.__dataHasAccessor && a.__dataHasAccessor[e] ? a._setPendingProperty(e, b, !0) : a[e] = b);
}

function cf(a, b, c, d, e, f, g) {
  c.bindings = c.bindings || [];
  d = { kind: d, target: e, parts: f, literal: g, isCompound: 1 !== f.length };
  c.bindings.push(d);
  d.target && 'attribute' != d.kind && 'text' != d.kind && !d.isCompound && '{' === d.parts[0].mode && (f = d.parts[0], c = f.event, f = f.negate, d.listenerEvent = c || ve(e) + '-changed', d.listenerNegate = f);
  e = b.nodeInfoList.length;
  for (c = 0; c < d.parts.length; c++) {
    var k = d.parts[c];
    k.compoundIndex = c;
    f = a;
    g = b;
    var h = d, l = k, n = e;
    if (!l.literal) if ('attribute' === h.kind && '-' === h.target[0]) console.warn('Cannot set attribute ' +
      h.target + ' because "-" is not a valid attribute starting character'); else for (k = l.dependencies, h = {
      index: n,
      binding: h,
      part: l,
      evaluator: f,
    }, l = 0; l < k.length; l++) n = k[l], 'string' == typeof n && (n = df(n), n.wildcard = !0), f._addTemplatePropertyEffect(g, n.rootProperty, {
      fn: ef,
      info: h,
      trigger: n,
    });
  }
}

function ef(a, b, c, d, e, f, g) {
  var k = g[e.index], h = e.binding;
  g = e.part;
  f && g.source && b.length > g.source.length && 'property' == h.kind && !h.isCompound && k.__isPropertyEffectsClient && k.__dataHasAccessor && k.__dataHasAccessor[h.target] ? (c = c[b], b = Ke(g.source, h.target, b), k._setPendingPropertyOrPath(b, c, !1, !0) && a._enqueueClient(k)) : (b = e.evaluator._evaluateBinding(a, g, b, c, d, f), b !== Qe && (c = b, b = k, d = h, d.isCompound && (e = b.__dataCompoundStorage[d.target], e[g.compoundIndex] = c, c = e.join('')), 'attribute' === d.kind || 'textContent' !==
  d.target && ('value' !== d.target || 'input' !== b.localName && 'textarea' !== b.localName) || (c = void 0 == c ? '' : c), Wb && (c = Wb(c, h.target, h.kind, k)), 'attribute' == h.kind ? a._valueToNodeAttribute(k, c, h.target) : (g = h.target, k.__isPropertyEffectsClient && k.__dataHasAccessor && k.__dataHasAccessor[g] ? k.__readOnly && k.__readOnly[g] || k._setPendingProperty(g, c) && a._enqueueClient(k) : (!lc || a.__dataReady) && a._setUnmanagedPropertyToNode(k, g, c))));
}

function ff(a, b, c) {
  if (c.listenerEvent) {
    var d = c.parts[0];
    a.addEventListener(c.listenerEvent, function(e) {
      var f = e;
      e = b;
      var g = c.target, k = d.source, h = d.negate, l = f.detail, n = l && l.path;
      n ? (k = Ke(g, k, n), f = l && l.value) : f = f.currentTarget[g];
      f = h ? !f : f;
      e.__readOnly && e.__readOnly[k] || !e._setPendingPropertyOrPath(k, f, !0, !!n) || l && l.queueProperty || e._invalidateProperties();
    });
  }
}

function gf(a, b, c, d, e, f) {
  f = b.static || f && ('object' !== typeof f || f[b.methodName]);
  e = { methodName: b.methodName, args: b.args, methodInfo: e, dynamicFn: f };
  for (var g = 0, k = void 0; g < b.args.length && (k = b.args[g]); g++) k.literal || a._addPropertyEffect(k.rootProperty, c, {
    fn: d,
    info: e,
    trigger: k,
  });
  f && a._addPropertyEffect(b.methodName, c, { fn: d, info: e });
}

function bf(a, b, c, d, e) {
  d = a._methodHost || a;
  var f = d[e.methodName];
  if (f) return a = a._marshalArgs(e.args, b, c), a === Qe ? Qe : f.apply(d, a);
  e.dynamicFn || console.warn('method `' + e.methodName + '` not defined');
}

var hf = [],
  jf = '(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:\'(?:[^\'\\\\]|\\\\.)*\')|(?:"(?:[^"\\\\]|\\\\.)*")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:\'(?:[^\'\\\\]|\\\\.)*\')|(?:"(?:[^"\\\\]|\\\\.)*")))\\s*))*)',
  kf = '(?:\\(\\s*(?:' + jf + '?)\\)\\s*)', lf = '((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*' + kf + '?)',
  mf = '(\\[\\[|{{)\\s*(?:(!)\\s*)?' + lf + '(?:]]|}})', nf = new RegExp(mf, 'g');

function of(a) {
  for (var b = '', c = 0; c < a.length; c++) {
    var d = a[c].literal;
    b += d || '';
  }
  return b;
}

function pf(a) {
  if (a = a.match(/([^\s]+?)\(([\s\S]*)\)/)) {
    var b = a[1];
    b = { methodName: b, static: !0, args: hf };
    return a[2].trim() ? (a = a[2].replace(/\\,/g, '&comma;').split(','), qf(a, b)) : b;
  }
  return null;
}

function qf(a, b) {
  b.args = a.map(function(c) {
    c = df(c);
    c.literal || (b.static = !1);
    return c;
  }, this);
  return b;
}

function df(a) {
  a = a.trim().replace(/&comma;/g, ',').replace(/\\(.)/g, '$1');
  var b = { name: a, value: '', literal: !1 }, c = a[0];
  '-' === c && (c = a[1]);
  '0' <= c && '9' >= c && (c = '#');
  switch (c) {
    case '\'':
    case '"':
      b.value = a.slice(1, -1);
      b.literal = !0;
      break;
    case '#':
      b.value = Number(a), b.literal = !0;
  }
  b.literal || (b.rootProperty = He(a), b.structured = Ge(a), b.structured && (b.wildcard = '.*' == a.slice(-2), b.wildcard && (b.name = a.slice(0, -2))));
  return b;
}

function rf(a, b, c) {
  a = R(a, c);
  void 0 === a && (a = b[c]);
  return a;
}

function sf(a, b, c, d) {
  d = { indexSplices: d };
  jc && (b.splices = d);
  a.notifyPath(c + '.splices', d);
  a.notifyPath(c + '.length', b.length);
  jc && (d.indexSplices = []);
}

function tf(a, b, c, d, e, f) {
  sf(a, b, c, [{ index: d, addedCount: e, removed: f, object: b, type: 'splice' }]);
}

function uf(a) {
  return a[0].toUpperCase() + a.substring(1);
}

var wf = P(function(a) {
  var b = Fe(Be(a));
  a = function() {
    var c = b.call(this) || this;
    c.__isPropertyEffectsClient = !0;
    c.__dataCounter = 0;
    return c;
  };
  w(a, b);
  a.prototype._initializeProperties = function() {
    b.prototype._initializeProperties.call(this);
    vf.registerHost(this);
    this.__dataClientsReady = !1;
    this.__dataLinkedPaths = this.__dataToNotify = this.__dataPendingClients = null;
    this.__dataHasPaths = !1;
    this.__dataCompoundStorage = this.__dataCompoundStorage || null;
    this.__dataHost = this.__dataHost || null;
    this.__dataTemp = {};
    this.__dataClientsInitialized =
      !1;
  };
  a.prototype._initializeProtoProperties = function(c) {
    this.__data = Object.create(c);
    this.__dataPending = Object.create(c);
    this.__dataOld = {};
  };
  a.prototype._initializeInstanceProperties = function(c) {
    var d = this.__readOnly, e;
    for (e in c) d && d[e] || (this.__dataPending = this.__dataPending || {}, this.__dataOld = this.__dataOld || {}, this.__data[e] = this.__dataPending[e] = c[e]);
  };
  a.prototype._addPropertyEffect = function(c, d, e) {
    this._createPropertyAccessor(c, '__readOnly' == d);
    var f = Te(this, d)[c];
    f || (f = this[d][c] = []);
    f.push(e);
  };
  a.prototype._removePropertyEffect = function(c, d, e) {
    c = Te(this, d)[c];
    e = c.indexOf(e);
    0 <= e && c.splice(e, 1);
  };
  a.prototype._hasPropertyEffect = function(c, d) {
    d = this[d];
    return !(!d || !d[c]);
  };
  a.prototype._hasReadOnlyEffect = function(c) {
    return this._hasPropertyEffect(c, '__readOnly');
  };
  a.prototype._hasNotifyEffect = function(c) {
    return this._hasPropertyEffect(c, '__notifyEffects');
  };
  a.prototype._hasReflectEffect = function(c) {
    return this._hasPropertyEffect(c, '__reflectEffects');
  };
  a.prototype._hasComputedEffect = function(c) {
    return this._hasPropertyEffect(c,
      '__computeEffects');
  };
  a.prototype._setPendingPropertyOrPath = function(c, d, e, f) {
    if (f || He(Array.isArray(c) ? c[0] : c) !== c) {
      if (!f && (f = R(this, c), c = Oe(this, c, d), !c || !b.prototype._shouldPropertyChange.call(this, c, d, f))) return !1;
      this.__dataHasPaths = !0;
      if (this._setPendingProperty(c, d, e)) {
        if (e = this.__dataLinkedPaths) for (var g in e) f = e[g], Je(g, c) ? (f = Ke(g, f, c), this._setPendingPropertyOrPath(f, d, !0, !0)) : Je(f, c) && (f = Ke(f, g, c), this._setPendingPropertyOrPath(f, d, !0, !0));
        return !0;
      }
    } else {
      if (this.__dataHasAccessor && this.__dataHasAccessor[c]) return this._setPendingProperty(c,
        d, e);
      this[c] = d;
    }
    return !1;
  };
  a.prototype._setUnmanagedPropertyToNode = function(c, d, e) {
    if (e !== c[d] || 'object' == typeof e) 'className' === d && (c = Q(c)), c[d] = e;
  };
  a.prototype._setPendingProperty = function(c, d, e) {
    var f = this.__dataHasPaths && Ge(c), g = f ? this.__dataTemp : this.__data;
    if (this._shouldPropertyChange(c, d, g[c])) {
      this.__dataPending || (this.__dataPending = {}, this.__dataOld = {});
      c in this.__dataOld || (this.__dataOld[c] = this.__data[c]);
      f ? this.__dataTemp[c] = d : this.__data[c] = d;
      this.__dataPending[c] = d;
      if (f || this.__notifyEffects &&
        this.__notifyEffects[c]) this.__dataToNotify = this.__dataToNotify || {}, this.__dataToNotify[c] = e;
      return lc ? (this._invalidateProperties(), !1) : !0;
    }
    return !1;
  };
  a.prototype._setProperty = function(c, d) {
    this._setPendingProperty(c, d, !0) && this._invalidateProperties();
  };
  a.prototype._invalidateProperties = function() {
    this.__dataReady && this._flushProperties();
  };
  a.prototype._enqueueClient = function(c) {
    this.__dataPendingClients = this.__dataPendingClients || [];
    c !== this && this.__dataPendingClients.push(c);
  };
  a.prototype._flushProperties =
    function() {
      this.__dataCounter++;
      if (lc && !this.__dataReady) {
        this._propagatePropertyChanges(this.__dataPending, {}, !1);
        this._flushClients();
        var c = this.__data, d = this.__dataToNotify;
        this.__data = {};
        this.__dataPending = this.__dataToNotify = null;
        for (var e in c) {
          var f = c[e];
          this.__data[e] = f;
          var g = {};
          this.__dataPending = (g[e] = f, g);
          this.__dataOld = {};
          f = {};
          this.__dataToNotify = (f[e] = d && d[e], f);
          b.prototype._flushProperties.call(this);
        }
      } else b.prototype._flushProperties.call(this);
      this.__dataCounter--;
    };
  a.prototype._flushClients =
    function() {
      this.__dataClientsReady ? this.__enableOrFlushClients() : (this.__dataClientsReady = !0, this._readyClients(), this.__dataReady = !0);
    };
  a.prototype.__enableOrFlushClients = function() {
    var c = this.__dataPendingClients;
    if (c) {
      this.__dataPendingClients = null;
      for (var d = 0; d < c.length; d++) {
        var e = c[d];
        e.__dataEnabled ? e.__dataPending && e._flushProperties() : e._enableProperties();
      }
    }
  };
  a.prototype._readyClients = function() {
    this.__enableOrFlushClients();
  };
  a.prototype.setProperties = function(c, d) {
    for (var e in c) !d && this.__readOnly &&
    this.__readOnly[e] || this._setPendingPropertyOrPath(e, c[e], !0);
    this._invalidateProperties();
  };
  a.prototype.ready = function() {
    this._flushProperties();
    this.__dataClientsReady || this._flushClients();
    this.__dataPending && this._flushProperties();
  };
  a.prototype._propertiesChanged = function(c, d, e) {
    c = this.__dataHasPaths;
    this.__dataHasPaths = !1;
    if (lc) {
      var f = this.__dataToNotify;
      this.__dataToNotify = null;
      Ue(this, this.__computeEffects, d, e, c);
    } else {
      f = d;
      var g = e, k = c, h = this.__computeEffects;
      if (h) for (var l = f; Ue(this, h, l, g, k);) Object.assign(g,
        this.__dataOld), Object.assign(f, this.__dataPending), l = this.__dataPending, this.__dataPending = null;
      f = this.__dataToNotify;
      this.__dataToNotify = null;
    }
    this._propagatePropertyChanges(d, e, c);
    this._flushClients();
    Ue(this, this.__reflectEffects, d, e, c);
    f && nc && Xe(this, f, d, e, c);
    Ue(this, this.__observeEffects, d, e, c);
    f && !nc && Xe(this, f, d, e, c);
    1 == this.__dataCounter && (this.__dataTemp = {});
  };
  a.prototype._propagatePropertyChanges = function(c, d, e) {
    this.__propagateEffects && Ue(this, this.__propagateEffects, c, d, e);
    for (var f = this.__templateInfo; f;) Ue(this,
      f.propertyEffects, c, d, e, f.nodeList), f = f.nextTemplateInfo;
  };
  a.prototype.linkPaths = function(c, d) {
    c = Me(c);
    d = Me(d);
    this.__dataLinkedPaths = this.__dataLinkedPaths || {};
    this.__dataLinkedPaths[c] = d;
  };
  a.prototype.unlinkPaths = function(c) {
    c = Me(c);
    this.__dataLinkedPaths && delete this.__dataLinkedPaths[c];
  };
  a.prototype.notifySplices = function(c, d) {
    var e = { path: '' };
    c = R(this, c, e);
    sf(this, c, e.path, d);
  };
  a.prototype.get = function(c, d) {
    return R(d || this, c);
  };
  a.prototype.set = function(c, d, e) {
    e ? Oe(e, c, d) : this.__readOnly && this.__readOnly[c] ||
      this._setPendingPropertyOrPath(c, d, !0) && this._invalidateProperties();
  };
  a.prototype.push = function(c, d) {
    for (var e = [], f = 1; f < arguments.length; ++f) e[f - 1] = arguments[f];
    f = { path: '' };
    var g = R(this, c, f), k = g.length, h = g.push.apply(g, ba(e));
    e.length && tf(this, g, f.path, k, e.length, []);
    return h;
  };
  a.prototype.pop = function(c) {
    var d = { path: '' };
    c = R(this, c, d);
    var e = !!c.length, f = c.pop();
    e && tf(this, c, d.path, c.length, 0, [f]);
    return f;
  };
  a.prototype.splice = function(c, d, e, f) {
    for (var g = [], k = 3; k < arguments.length; ++k) g[k - 3] = arguments[k];
    k = { path: '' };
    var h = R(this, c, k);
    0 > d ? d = h.length - Math.floor(-d) : d && (d = Math.floor(d));
    var l = 2 === arguments.length ? h.splice(d) : h.splice.apply(h, [d, e].concat(ba(g)));
    (g.length || l.length) && tf(this, h, k.path, d, g.length, l);
    return l;
  };
  a.prototype.shift = function(c) {
    var d = { path: '' };
    c = R(this, c, d);
    var e = !!c.length, f = c.shift();
    e && tf(this, c, d.path, 0, 0, [f]);
    return f;
  };
  a.prototype.unshift = function(c, d) {
    for (var e = [], f = 1; f < arguments.length; ++f) e[f - 1] = arguments[f];
    f = { path: '' };
    var g = R(this, c, f), k = g.unshift.apply(g, ba(e));
    e.length &&
    tf(this, g, f.path, 0, e.length, []);
    return k;
  };
  a.prototype.notifyPath = function(c, d) {
    if (1 == arguments.length) {
      var e = { path: '' };
      d = R(this, c, e);
      e = e.path;
    } else e = Array.isArray(c) ? Me(c) : c;
    this._setPendingPropertyOrPath(e, d, !0, !0) && this._invalidateProperties();
  };
  a.prototype._createReadOnlyProperty = function(c, d) {
    this._addPropertyEffect(c, '__readOnly');
    d && (this['_set' + uf(c)] = function(e) {
      this._setProperty(c, e);
    });
  };
  a.prototype._createPropertyObserver = function(c, d, e) {
    var f = { property: c, method: d, dynamicFn: !!e };
    this._addPropertyEffect(c,
      '__observeEffects', { fn: We, info: f, trigger: { name: c } });
    e && this._addPropertyEffect(d, '__observeEffects', { fn: We, info: f, trigger: { name: d } });
  };
  a.prototype._createMethodObserver = function(c, d) {
    var e = pf(c);
    if (!e) throw Error('Malformed observer expression \'' + c + '\'');
    gf(this, e, '__observeEffects', bf, null, d);
  };
  a.prototype._createNotifyingProperty = function(c) {
    this._addPropertyEffect(c, '__notifyEffects', { fn: Ze, info: { eventName: ve(c) + '-changed', property: c } });
  };
  a.prototype._createReflectedProperty = function(c) {
    var d = this.constructor.attributeNameForProperty(c);
    '-' === d[0] ? console.warn('Property ' + c + ' cannot be reflected to attribute ' + d + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.') : this._addPropertyEffect(c, '__reflectEffects', {
      fn: $e,
      info: { attrName: d },
    });
  };
  a.prototype._createComputedProperty = function(c, d, e) {
    var f = pf(d);
    if (!f) throw Error('Malformed computed expression \'' + d + '\'');
    gf(this, f, '__computeEffects', af, c, e);
  };
  a.prototype._marshalArgs = function(c, d, e) {
    for (var f = this.__data, g = [], k = 0, h = c.length; k <
    h; k++) {
      var l = c[k], n = l.name, p = l.structured, r = l.wildcard, t = l.value;
      l = l.literal;
      l || (r ? (p = Je(n, d), r = rf(f, e, p ? d : n), t = {
        path: p ? d : n,
        value: r,
        base: p ? R(f, n) : r,
      }) : t = p ? rf(f, e, n) : f[n]);
      if (jc && void 0 === t && 1 < c.length) return Qe;
      g[k] = t;
    }
    return g;
  };
  a.addPropertyEffect = function(c, d, e) {
    this.prototype._addPropertyEffect(c, d, e);
  };
  a.createPropertyObserver = function(c, d, e) {
    this.prototype._createPropertyObserver(c, d, e);
  };
  a.createMethodObserver = function(c, d) {
    this.prototype._createMethodObserver(c, d);
  };
  a.createNotifyingProperty = function(c) {
    this.prototype._createNotifyingProperty(c);
  };
  a.createReadOnlyProperty = function(c, d) {
    this.prototype._createReadOnlyProperty(c, d);
  };
  a.createReflectedProperty = function(c) {
    this.prototype._createReflectedProperty(c);
  };
  a.createComputedProperty = function(c, d, e) {
    this.prototype._createComputedProperty(c, d, e);
  };
  a.bindTemplate = function(c) {
    return this.prototype._bindTemplate(c);
  };
  a.prototype._bindTemplate = function(c, d) {
    c = this.constructor._parseTemplate(c);
    var e = this.__templateInfo == c;
    if (!e) for (var f in c.propertyEffects) this._createPropertyAccessor(f);
    return d &&
    (c = Object.create(c), c.wasPreBound = e, !e && this.__templateInfo) ? (d = this.__templateInfoLast || this.__templateInfo, this.__templateInfoLast = d.nextTemplateInfo = c, c.previousTemplateInfo = d, c) : this.__templateInfo = c;
  };
  a._addTemplatePropertyEffect = function(c, d, e) {
    var f = c.hostProps = c.hostProps || {};
    f[d] = !0;
    c = c.propertyEffects = c.propertyEffects || {};
    d = c[d] = c[d] || [];
    d.push(e);
  };
  a.prototype._stampTemplate = function(c) {
    vf.beginHosting(this);
    var d = b.prototype._stampTemplate.call(this, c);
    vf.endHosting(this);
    c = this._bindTemplate(c,
      !0);
    c.nodeList = d.nodeList;
    if (!c.wasPreBound) for (var e = c.childNodes = [], f = d.firstChild; f; f = f.nextSibling) e.push(f);
    f = d.templateInfo = c;
    e = f.nodeList;
    f = f.nodeInfoList;
    if (f.length) for (var g = 0; g < f.length; g++) {
      var k = f[g], h = e[g];
      if (k = k.bindings) for (var l = 0; l < k.length; l++) {
        var n = k[l], p = h, r = n;
        if (r.isCompound) {
          for (var t = p.__dataCompoundStorage || (p.__dataCompoundStorage = {}), v = r.parts, u = Array(v.length), A = 0; A < v.length; A++) u[A] = v[A].literal;
          v = r.target;
          t[v] = u;
          r.literal && 'property' == r.kind && ('className' === v && (p = Q(p)),
            p[v] = r.literal);
        }
        ff(h, this, n);
      }
      h.__dataHost = this;
    }
    this.__dataReady && Ue(this, c.propertyEffects, this.__data, null, !1, c.nodeList);
    return d;
  };
  a.prototype._removeBoundDom = function(c) {
    c = c.templateInfo;
    c.previousTemplateInfo && (c.previousTemplateInfo.nextTemplateInfo = c.nextTemplateInfo);
    c.nextTemplateInfo && (c.nextTemplateInfo.previousTemplateInfo = c.previousTemplateInfo);
    this.__templateInfoLast == c && (this.__templateInfoLast = c.previousTemplateInfo);
    c.previousTemplateInfo = c.nextTemplateInfo = null;
    c = c.childNodes;
    for (var d =
      0; d < c.length; d++) {
      var e = c[d];
      e.parentNode.removeChild(e);
    }
  };
  a._parseTemplateNode = function(c, d, e) {
    var f = b._parseTemplateNode.call(this, c, d, e);
    if (c.nodeType === Node.TEXT_NODE) {
      var g = this._parseBindings(c.textContent, d);
      g && (c.textContent = of(g) || ' ', cf(this, d, e, 'text', 'textContent', g), f = !0);
    }
    return f;
  };
  a._parseTemplateNodeAttribute = function(c, d, e, f, g) {
    var k = this._parseBindings(g, d);
    if (k) {
      g = f;
      var h = 'property';
      Se.test(f) ? h = 'attribute' : '$' == f[f.length - 1] && (f = f.slice(0, -1), h = 'attribute');
      var l = of(k);
      l && 'attribute' ==
      h && ('class' == f && c.hasAttribute('class') && (l += ' ' + c.getAttribute(f)), c.setAttribute(f, l));
      'input' === c.localName && 'value' === g && c.setAttribute(g, '');
      c.removeAttribute(g);
      'property' === h && (f = ue(f));
      cf(this, d, e, h, f, k, l);
      return !0;
    }
    return b._parseTemplateNodeAttribute.call(this, c, d, e, f, g);
  };
  a._parseTemplateNestedTemplate = function(c, d, e) {
    c = b._parseTemplateNestedTemplate.call(this, c, d, e);
    var f = e.templateInfo.hostProps, g;
    for (g in f) f = [{ mode: '{', source: g, dependencies: [g], hostProp: !0 }], cf(this, d, e, 'property', '_host_' +
      g, f);
    return c;
  };
  a._parseBindings = function(c, d) {
    for (var e = [], f = 0, g; null !== (g = nf.exec(c));) {
      g.index > f && e.push({ literal: c.slice(f, g.index) });
      f = g[1][0];
      var k = !!g[2];
      g = g[3].trim();
      var h = !1, l = '', n = -1;
      '{' == f && 0 < (n = g.indexOf('::')) && (l = g.substring(n + 2), g = g.substring(0, n), h = !0);
      n = pf(g);
      var p = [];
      if (n) {
        var r = n, t = r.args;
        r = r.methodName;
        for (var v = 0; v < t.length; v++) {
          var u = t[v];
          u.literal || p.push(u);
        }
        if ((t = d.dynamicFns) && t[r] || n.static) p.push(r), n.dynamicFn = !0;
      } else p.push(g);
      e.push({
        source: g, mode: f, negate: k, customEvent: h,
        signature: n, dependencies: p, event: l,
      });
      f = nf.lastIndex;
    }
    f && f < c.length && (c = c.substring(f)) && e.push({ literal: c });
    return e.length ? e : null;
  };
  a._evaluateBinding = function(c, d, e, f, g, k) {
    c = d.signature ? bf(c, e, f, g, d.signature) : e != d.source ? R(c, d.source) : k && Ge(e) ? R(c, e) : c.__data[e];
    d.negate && (c = !c);
    return c;
  };
  x.Object.defineProperties(a.prototype, {
    PROPERTY_EFFECT_TYPES: {
      configurable: !0, enumerable: !0, get: function() {
        return Re;
      },
    },
  });
  return a;
}), xf = function() {
  this.stack = [];
};
xf.prototype.registerHost = function(a) {
  if (this.stack.length) {
    var b = this.stack[this.stack.length - 1];
    b._enqueueClient(a);
  }
};
xf.prototype.beginHosting = function(a) {
  this.stack.push(a);
};
xf.prototype.endHosting = function(a) {
  var b = this.stack.length;
  b && this.stack[b - 1] == a && this.stack.pop();
};
var vf = new xf;

function yf(a) {
  var b = a.body ? a.body : a;
  a = Pb(b.textContent, a.baseURI);
  b = document.createElement('style');
  b.textContent = a;
  return b;
}

function zf(a) {
  a = a.trim().split(/\s+/);
  for (var b = [], c = 0; c < a.length; c++) b.push.apply(b, ba(Af(a[c])));
  return b;
}

function Af(a) {
  var b = O.import(a);
  if (!b) return console.warn('Could not find style data in module named', a), [];
  if (void 0 === b._styles) {
    a = [];
    a.push.apply(a, ba(_stylesFromModuleImports$$module$third_party$javascript$polymer$v2$polymer$lib$utils$style_gather(b)));
    var c = b.querySelector('template');
    c && a.push.apply(a, ba(Bf(c, b.assetpath)));
    b._styles = a;
  }
  return b._styles;
}

function Bf(a, b) {
  if (!a._styles) {
    for (var c = [], d = a.content.querySelectorAll('style'), e = 0; e < d.length; e++) {
      var f = d[e], g = f.getAttribute('include');
      g && c.push.apply(c, ba(zf(g).filter(function(k, h, l) {
        return l.indexOf(k) === h;
      })));
      b && (f.textContent = Pb(f.textContent, b));
      c.push(f);
    }
    a._styles = c;
  }
  return a._styles;
}

function Cf(a) {
  return (a = O.import(a)) ? _stylesFromModuleImports$$module$third_party$javascript$polymer$v2$polymer$lib$utils$style_gather(a) : [];
}

function _stylesFromModuleImports$$module$third_party$javascript$polymer$v2$polymer$lib$utils$style_gather(a) {
  var b = [];
  a = a.querySelectorAll('link[rel=import][type~=css]');
  for (var c = 0; c < a.length; c++) {
    var d = a[c];
    if (d.import) {
      var e = d.import;
      if ((d = d.hasAttribute('shady-unscoped')) && !e._unscopedStyle) {
        var f = yf(e);
        f.setAttribute('shady-unscoped', '');
        e._unscopedStyle = f;
      } else e._style || (e._style = yf(e));
      b.push(d ? e._unscopedStyle : e._style);
    }
  }
  return b;
}

function Df(a) {
  a = a.trim().split(/\s+/);
  for (var b = '', c = 0; c < a.length; c++) b += Ef(a[c]);
  return b;
}

function Ef(a) {
  var b = O.import(a);
  if (b && void 0 === b._cssText) {
    var c = _cssFromModuleImports$$module$third_party$javascript$polymer$v2$polymer$lib$utils$style_gather(b),
      d = b.querySelector('template');
    d && (c += Ff(d, b.assetpath));
    b._cssText = c || null;
  }
  b || console.warn('Could not find style data in module named', a);
  return b && b._cssText || '';
}

function Ff(a, b) {
  var c = '';
  a = Bf(a, b);
  for (b = 0; b < a.length; b++) {
    var d = a[b];
    d.parentNode && d.parentNode.removeChild(d);
    c += d.textContent;
  }
  return c;
}

function Gf(a) {
  return (a = O.import(a)) ? _cssFromModuleImports$$module$third_party$javascript$polymer$v2$polymer$lib$utils$style_gather(a) : '';
}

function _cssFromModuleImports$$module$third_party$javascript$polymer$v2$polymer$lib$utils$style_gather(a) {
  var b = '';
  a = _stylesFromModuleImports$$module$third_party$javascript$polymer$v2$polymer$lib$utils$style_gather(a);
  for (var c = 0; c < a.length; c++) b += a[c].textContent;
  return b;
};var Hf = window.ShadyCSS && window.ShadyCSS.cssBuild, If = P(function(a) {
  var b = qe(wf(a));
  a = function() {
    var c;
    return c = b.call(this) || this;
  };
  w(a, b);
  a._finalizeClass = function() {
    b._finalizeClass.call(this);
    var c;
    this.hasOwnProperty('__ownObservers') || (this.__ownObservers = this.hasOwnProperty('observers') ? this.observers : null);
    (c = this.__ownObservers) && this.createObservers(c, this._properties);
    this._prepareTemplate();
  };
  a._prepareTemplate = function() {
    var c = this.template;
    c && ('string' === typeof c ? (console.error('template getter must return HTMLTemplateElement'),
      c = null) : dc || (c = c.cloneNode(!0)));
    this.prototype._template = c;
  };
  a.createProperties = function(c) {
    for (var d in c) {
      var e = this.prototype, f = d, g = c[d], k = c;
      g.computed && (g.readOnly = !0);
      g.computed && (e._hasReadOnlyEffect(f) ? console.warn('Cannot redefine computed property \'' + f + '\'.') : e._createComputedProperty(f, g.computed, k));
      g.readOnly && !e._hasReadOnlyEffect(f) ? e._createReadOnlyProperty(f, !g.computed) : !1 === g.readOnly && e._hasReadOnlyEffect(f) && console.warn('Cannot make readOnly property \'' + f + '\' non-readOnly.');
      g.reflectToAttribute &&
      !e._hasReflectEffect(f) ? e._createReflectedProperty(f) : !1 === g.reflectToAttribute && e._hasReflectEffect(f) && console.warn('Cannot make reflected property \'' + f + '\' non-reflected.');
      g.notify && !e._hasNotifyEffect(f) ? e._createNotifyingProperty(f) : !1 === g.notify && e._hasNotifyEffect(f) && console.warn('Cannot make notify property \'' + f + '\' non-notify.');
      g.observer && e._createPropertyObserver(f, g.observer, k[g.observer]);
      e._addPropertyToAttributeMap(f);
    }
  };
  a.createObservers = function(c, d) {
    for (var e = this.prototype, f = 0; f <
    c.length; f++) e._createMethodObserver(c[f], d);
  };
  a.prototype._initializeProperties = function() {
    this.constructor.finalize();
    this.constructor._finalizeTemplate(this.localName);
    b.prototype._initializeProperties.call(this);
    this.rootPath = Ub;
    this.importPath = this.constructor.importPath;
    var c = this.constructor;
    if (!c.hasOwnProperty('__propertyDefaults')) {
      c.__propertyDefaults = null;
      var d = c._properties, e;
      for (e in d) {
        var f = d[e];
        'value' in f && (c.__propertyDefaults = c.__propertyDefaults || {}, c.__propertyDefaults[e] = f);
      }
    }
    if (c =
      c.__propertyDefaults) for (var g in c) d = c[g], this.hasOwnProperty(g) || (d = 'function' == typeof d.value ? d.value.call(this) : d.value, this._hasAccessor(g) ? this._setPendingProperty(g, d, !0) : this[g] = d);
  };
  a._processStyleText = function(c, d) {
    return Pb(c, d);
  };
  a._finalizeTemplate = function(c) {
    var d = this.prototype._template;
    if (d && !d.__polymerFinalized) {
      d.__polymerFinalized = !0;
      var e = this.importPath;
      e = e ? Ob(e) : '';
      if (!Hf) {
        for (var f = d.content.querySelectorAll('style'), g = Bf(d), k = Cf(c), h = d.content.firstElementChild, l = 0; l < k.length; l++) {
          var n =
            k[l];
          n.textContent = this._processStyleText(n.textContent, e);
          d.content.insertBefore(n, h);
        }
        for (h = k = 0; h < g.length; h++) l = g[h], n = f[k], n !== l ? (l = l.cloneNode(!0), n.parentNode.insertBefore(l, n)) : k++, l.textContent = this._processStyleText(l.textContent, e);
      }
      window.ShadyCSS && window.ShadyCSS.prepareTemplate(d, c);
      this.prototype._bindTemplate(d);
    }
  };
  a.prototype.connectedCallback = function() {
    window.ShadyCSS && this._template && window.ShadyCSS.styleElement(this);
    b.prototype.connectedCallback.call(this);
  };
  a.prototype.ready = function() {
    this._template &&
    (this.root = this._stampTemplate(this._template), this.$ = this.root.$);
    b.prototype.ready.call(this);
  };
  a.prototype._readyClients = function() {
    this._template && (this.root = this._attachDom(this.root));
    b.prototype._readyClients.call(this);
  };
  a.prototype._attachDom = function(c) {
    var d = Q(this);
    if (d.attachShadow) return c ? (d.shadowRoot || d.attachShadow({ mode: 'open' }), d.shadowRoot.appendChild(c), hc && window.ShadyDOM && ShadyDOM.flushInitial(d.shadowRoot), d.shadowRoot) : null;
    throw Error('ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.');
  };
  a.prototype.updateStyles = function(c) {
    window.ShadyCSS && window.ShadyCSS.styleSubtree(this, c);
  };
  a.prototype.resolveUrl = function(c, d) {
    !d && this.importPath && (d = Ob(this.importPath));
    return Ob(c, d);
  };
  a._parseTemplateContent = function(c, d, e) {
    d.dynamicFns = d.dynamicFns || this._properties;
    return b._parseTemplateContent.call(this, c, d, e);
  };
  a._addTemplatePropertyEffect = function(c, d, e) {
    !fc || d in this._properties || e.info.part.signature && e.info.part.signature.static || e.info.part.hostProp || c.nestedTemplate || console.warn('Property \'' +
      d + '\' used in template but not declared in \'properties\'; attribute will not be observed.');
    return b._addTemplatePropertyEffect.call(this, c, d, e);
  };
  x.Object.defineProperties(a, {
    polymerElementVersion: {
      configurable: !0, enumerable: !0, get: function() {
        return '3.2.0';
      },
    }, template: {
      configurable: !0, enumerable: !0, get: function() {
        if (!this.hasOwnProperty('_template')) {
          if (this.prototype.hasOwnProperty('_template')) var c = this.prototype._template; else {
            c = this.is;
            var d = null;
            if (c && (!$b || bc) && (d = O.import(c, 'template'), $b && !d)) throw Error('strictTemplatePolicy: expecting dom-module or null template for ' +
              c);
            c = (c = d) || Object.getPrototypeOf(this.prototype).constructor.template;
          }
          this._template = c;
        }
        return this._template;
      }, set: function(c) {
        this._template = c;
      },
    }, importPath: {
      configurable: !0, enumerable: !0, get: function() {
        if (!this.hasOwnProperty('_importPath')) {
          var c = this.importMeta;
          this._importPath = c ? Qb(c.url) : (c = O.import(this.is)) && c.assetpath || Object.getPrototypeOf(this.prototype).constructor.importPath;
        }
        return this._importPath;
      },
    },
  });
  return a;
}), Jf = function(a) {
  window.ShadyCSS && window.ShadyCSS.styleDocument(a);
};

function Kf(a, b, c) {
  return { index: a, removed: b, addedCount: c };
}

function Lf(a, b, c, d, e, f) {
  var g = 0, k = 0, h = Math.min(c - b, f - e);
  if (0 == b && 0 == e) a:{
    g = a;
    for (var l = d, n = h, p = 0; p < n; p++) if (g[p] !== l[p]) {
      g = p;
      break a;
    }
    g = n;
  }
  if (c == a.length && f == d.length) {
    k = a;
    l = d;
    h -= g;
    n = k.length;
    p = l.length;
    for (var r = 0; r < h && Mf(k[--n], l[--p]);) r++;
    k = r;
  }
  b += g;
  e += g;
  c -= k;
  f -= k;
  if (0 == c - b && 0 == f - e) return [];
  if (b == c) {
    for (c = Kf(b, [], 0); e < f;) c.removed.push(d[e++]);
    return [c];
  }
  if (e == f) return [Kf(b, [], c - b)];
  g = b;
  h = d;
  k = e;
  f = f - k + 1;
  c = c - g + 1;
  l = Array(f);
  for (n = 0; n < f; n++) l[n] = Array(c), l[n][0] = n;
  for (n = 0; n < c; n++) l[0][n] = n;
  for (n = 1; n <
  f; n++) for (p = 1; p < c; p++) if (a[g + p - 1] === h[k + n - 1]) l[n][p] = l[n - 1][p - 1]; else {
    r = l[n - 1][p] + 1;
    var t = l[n][p - 1] + 1;
    l[n][p] = r < t ? r : t;
  }
  c = l;
  f = c.length - 1;
  a = c[0].length - 1;
  g = c[f][a];
  for (h = []; 0 < f || 0 < a;) 0 == f ? (h.push(2), a--) : 0 == a ? (h.push(3), f--) : (k = c[f - 1][a - 1], l = c[f - 1][a], n = c[f][a - 1], p = l < n ? l < k ? l : k : n < k ? n : k, p == k ? (k == g ? h.push(0) : (h.push(1), g = k), f--, a--) : p == l ? (h.push(3), f--, g = l) : (h.push(2), a--, g = n));
  h.reverse();
  f = h;
  c = void 0;
  a = [];
  for (g = 0; g < f.length; g++) switch (f[g]) {
    case 0:
      c && (a.push(c), c = void 0);
      b++;
      e++;
      break;
    case 1:
      c || (c = Kf(b,
        [], 0));
      c.addedCount++;
      b++;
      c.removed.push(d[e]);
      e++;
      break;
    case 2:
      c || (c = Kf(b, [], 0));
      c.addedCount++;
      b++;
      break;
    case 3:
      c || (c = Kf(b, [], 0)), c.removed.push(d[e]), e++;
  }
  c && a.push(c);
  return a;
}

function Nf(a, b) {
  return Lf(a, 0, a.length, b, 0, b.length);
}

function Mf(a, b) {
  return a === b;
};var Of = function(a) {
  this.value = a.toString();
};
Of.prototype.toString = function() {
  return this.value;
};

function Pf(a) {
  if (a instanceof Of) return a.value;
  throw Error('non-literal value passed to Polymer\'s htmlLiteral function: ' + a);
}

var S = function(a, b) {
  for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
  d = document.createElement('template');
  d.innerHTML = c.reduce(function(e, f, g) {
    if (f instanceof HTMLTemplateElement) f = f.innerHTML; else if (f instanceof Of) f = Pf(f); else throw Error('non-template value passed to Polymer\'s html function: ' + f);
    return e + f + a[g + 1];
  }, a[0]);
  return d;
}, Qf = function(a, b) {
  for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
  return new Of(c.reduce(function(e, f, g) {
    return e + Pf(f) + a[g + 1];
  }, a[0]));
};
var U = If(HTMLElement);
var Rf = P(function(a) {
  var b = If(a);
  a = function() {
    var c = b.call(this) || this;
    c.__lastItems = null;
    c.__lastMulti = null;
    c.__selectedMap = null;
    return c;
  };
  w(a, b);
  a.prototype.__updateSelection = function(c, d) {
    var e = d.path;
    if ('items' == e) {
      d = d.base || [];
      e = this.__lastItems;
      var f = this.__lastMulti;
      c !== f && this.clearSelection();
      e && (e = Nf(d, e), this.__applySplices(e));
      this.__lastItems = d;
      this.__lastMulti = c;
    } else 'items.splices' == d.path ? this.__applySplices(d.value.indexSplices) : (c = e.slice(6), d = parseInt(c, 10), 0 > c.indexOf('.') && c ==
    d && this.__deselectChangedIdx(d));
  };
  a.prototype.__applySplices = function(c) {
    for (var d = this, e = this.__selectedMap, f = {}, g = 0; g < c.length; f = { $jscomp$loop$prop$s$146: f.$jscomp$loop$prop$s$146 }, g++) {
      f.$jscomp$loop$prop$s$146 = c[g];
      e.forEach(function(n) {
        return function(p, r) {
          p < n.$jscomp$loop$prop$s$146.index || (p >= n.$jscomp$loop$prop$s$146.index + n.$jscomp$loop$prop$s$146.removed.length ? e.set(r, p + n.$jscomp$loop$prop$s$146.addedCount - n.$jscomp$loop$prop$s$146.removed.length) : e.set(r, -1));
        };
      }(f));
      for (var k = 0; k < f.$jscomp$loop$prop$s$146.addedCount; k++) {
        var h =
          f.$jscomp$loop$prop$s$146.index + k;
        e.has(this.items[h]) && e.set(this.items[h], h);
      }
    }
    this.__updateLinks();
    var l = 0;
    e.forEach(function(n, p) {
      0 > n ? (d.multi ? d.splice('selected', l, 1) : d.selected = d.selectedItem = null, e.delete(p)) : l++;
    });
  };
  a.prototype.__updateLinks = function() {
    var c = this;
    this.__dataLinkedPaths = {};
    if (this.multi) {
      var d = 0;
      this.__selectedMap.forEach(function(e) {
        0 <= e && c.linkPaths('items.' + e, 'selected.' + d++);
      });
    } else this.__selectedMap.forEach(function(e) {
      c.linkPaths('selected', 'items.' + e);
      c.linkPaths('selectedItem',
        'items.' + e);
    });
  };
  a.prototype.clearSelection = function() {
    this.__dataLinkedPaths = {};
    this.__selectedMap = new Map;
    this.selected = this.multi ? [] : null;
    this.selectedItem = null;
  };
  a.prototype.isSelected = function(c) {
    return this.__selectedMap.has(c);
  };
  a.prototype.isIndexSelected = function(c) {
    return this.isSelected(this.items[c]);
  };
  a.prototype.__deselectChangedIdx = function(c) {
    var d = this, e = this.__selectedIndexForItemIndex(c);
    if (0 <= e) {
      var f = 0;
      this.__selectedMap.forEach(function(g, k) {
        e == f++ && d.deselect(k);
      });
    }
  };
  a.prototype.__selectedIndexForItemIndex =
    function(c) {
      if (c = this.__dataLinkedPaths['items.' + c]) return parseInt(c.slice(9), 10);
    };
  a.prototype.deselect = function(c) {
    var d = this.__selectedMap.get(c);
    if (0 <= d) {
      this.__selectedMap.delete(c);
      var e;
      this.multi && (e = this.__selectedIndexForItemIndex(d));
      this.__updateLinks();
      this.multi ? this.splice('selected', e, 1) : this.selected = this.selectedItem = null;
    }
  };
  a.prototype.deselectIndex = function(c) {
    this.deselect(this.items[c]);
  };
  a.prototype.select = function(c) {
    this.selectIndex(this.items.indexOf(c));
  };
  a.prototype.selectIndex =
    function(c) {
      var d = this.items[c];
      this.isSelected(d) ? this.toggle && this.deselectIndex(c) : (this.multi || this.__selectedMap.clear(), this.__selectedMap.set(d, c), this.__updateLinks(), this.multi ? this.push('selected', d) : this.selected = this.selectedItem = d);
    };
  x.Object.defineProperties(a, {
    properties: {
      configurable: !0, enumerable: !0, get: function() {
        return {
          items: { type: Array },
          multi: { type: Boolean, value: !1 },
          selected: { type: Object, notify: !0 },
          selectedItem: { type: Object, notify: !0 },
          toggle: { type: Boolean, value: !1 },
        };
      },
    }, observers: {
      configurable: !0,
      enumerable: !0, get: function() {
        return ['__updateSelection(multi, items.*)'];
      },
    },
  });
  return a;
}), Sf = Rf(U), Tf = function(a) {
  return Sf.apply(this, arguments) || this;
};
w(Tf, Sf);
x.Object.defineProperties(Tf, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'array-selector';
    },
  }, template: {
    configurable: !0, enumerable: !0, get: function() {
      return null;
    },
  },
});
customElements.define(Tf.is, Tf);
Polymer.DomModule = O;
Polymer.Async = { timeOut: fe, animationFrame: ge, idlePeriod: he, microTask: ie };
Polymer.dedupingMixin = P;
Polymer.wrap = Q;
Polymer.PropertiesChanged = ke;
Polymer.telemetry = {
  instanceCount: le,
  incrementInstanceCount: me,
  registrations: ne,
  register: oe,
  dumpRegistrations: pe,
};
Polymer.PropertiesMixin = qe;
Polymer.CaseMap = { dashToCamelCase: ue, camelToDashCase: ve };
Polymer.PropertyAccessors = Be;
Polymer.TemplateStamp = Fe;
Polymer.Path = {
  isPath: Ge,
  root: He,
  isAncestor: Ie,
  isDescendant: Je,
  translate: Ke,
  matches: Le,
  normalize: Me,
  split: Ne,
  get: R,
  set: Oe,
  isDeep: Ge,
};
Polymer.PropertyEffects = wf;
Polymer.StyleGather = {
  stylesFromModules: zf,
  stylesFromModule: Af,
  stylesFromTemplate: Bf,
  stylesFromModuleImports: Cf,
  cssFromModules: Df,
  cssFromModule: Ef,
  cssFromTemplate: Ff,
  cssFromModuleImports: Gf,
};
Polymer.ElementMixin = If;
Polymer.updateStyles = Jf;
Polymer.version = '3.2.0';
Polymer.ArraySplice = { calculateSplices: Nf };
Polymer.html = S;
Polymer.htmlLiteral = Qf;
Polymer.Element = U;
Polymer.ArraySelectorMixin = Rf;
Polymer.ArraySelector = Tf;
var Uf = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
  Vf = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi, Wf = /@media\s(.*)/;

function Xf(a, b) {
  for (var c in b) null === c ? a.style.removeProperty(c) : a.style.setProperty(c, b[c]);
}

function Yf(a, b) {
  return (a = window.getComputedStyle(a).getPropertyValue(b)) ? a.trim() : '';
};var Zf = null, $f = window.HTMLImports && window.HTMLImports.whenReady || null, ag;

function bg(a) {
  requestAnimationFrame(function() {
    $f ? $f(a) : (Zf || (Zf = new Promise(function(b) {
      ag = b;
    }), 'complete' === document.readyState ? ag() : document.addEventListener('readystatechange', function() {
      'complete' === document.readyState && ag();
    })), Zf.then(function() {
      a && a();
    }));
  });
};var cg = null, dg = null, V = function() {
  this.customStyles = [];
  this.enqueued = !1;
  bg(function() {
    window.ShadyCSS.flushCustomStyles && window.ShadyCSS.flushCustomStyles();
  });
};
V.prototype.enqueueDocumentValidation = function() {
  !this.enqueued && dg && (this.enqueued = !0, bg(dg));
};
V.prototype.addCustomStyle = function(a) {
  a.__seenByShadyCSS || (a.__seenByShadyCSS = !0, this.customStyles.push(a), this.enqueueDocumentValidation());
};
V.prototype.getStyleForCustomStyle = function(a) {
  return a.__shadyCSSCachedStyle ? a.__shadyCSSCachedStyle : a = a.getStyle ? a.getStyle() : a;
};
V.prototype.processStyles = function() {
  for (var a = this.customStyles, b = 0; b < a.length; b++) {
    var c = a[b];
    if (!c.__shadyCSSCachedStyle) {
      var d = this.getStyleForCustomStyle(c);
      d && (d = d.__appliedElement || d, cg && cg(d), c.__shadyCSSCachedStyle = d);
    }
  }
  return a;
};
V.prototype.addCustomStyle = V.prototype.addCustomStyle;
V.prototype.getStyleForCustomStyle = V.prototype.getStyleForCustomStyle;
V.prototype.processStyles = V.prototype.processStyles;
Object.defineProperties(V.prototype, {
  transformCallback: {
    get: function() {
      return cg;
    }, set: function(a) {
      cg = a;
    },
  }, validateCallback: {
    get: function() {
      return dg;
    }, set: function(a) {
      var b = !1;
      dg || (b = !0);
      dg = a;
      b && this.enqueueDocumentValidation();
    },
  },
});
var eg = !(window.ShadyDOM && window.ShadyDOM.inUse), fg;

function gg(a) {
  fg = a && a.shimcssproperties ? !1 : eg || !(navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) || !window.CSS || !CSS.supports || !CSS.supports('box-shadow', '0 0 0 var(--foo)'));
}

var hg;
window.ShadyCSS && void 0 !== window.ShadyCSS.cssBuild && (hg = window.ShadyCSS.cssBuild);
var ig = !(!window.ShadyCSS || !window.ShadyCSS.disableRuntime);
window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss ? fg = window.ShadyCSS.nativeCss : window.ShadyCSS ? (gg(window.ShadyCSS), window.ShadyCSS = void 0) : gg(window.WebComponents && window.WebComponents.flags);
var jg = fg;
var kg = new V;
window.ShadyCSS || (window.ShadyCSS = {
  prepareTemplate: function() {
  }, prepareTemplateDom: function() {
  }, prepareTemplateStyles: function() {
  }, styleSubtree: function(a, b) {
    kg.processStyles();
    Xf(a, b);
  }, styleElement: function() {
    kg.processStyles();
  }, styleDocument: function(a) {
    kg.processStyles();
    Xf(document.body, a);
  }, getComputedStyleValue: function(a, b) {
    return Yf(a, b);
  }, flushCustomStyles: function() {
  }, nativeCss: jg, nativeShadow: eg, cssBuild: hg, disableRuntime: ig,
});
window.ShadyCSS.CustomStyleInterface = kg;
var lg = window.ShadyCSS.CustomStyleInterface, mg = function() {
  var a = HTMLElement.call(this) || this;
  a._style = null;
  lg.addCustomStyle(a);
  return a;
};
w(mg, HTMLElement);
mg.prototype.getStyle = function() {
  if (this._style) return this._style;
  var a = this.querySelector('style');
  if (!a) return null;
  this._style = a;
  var b = a.getAttribute('include');
  b && (a.removeAttribute('include'), a.textContent = Df(b) + a.textContent);
  this.ownerDocument !== window.document && window.document.head.appendChild(this);
  return this._style;
};
window.customElements.define('custom-style', mg);
Polymer.CustomStyle = mg;
var ng = function() {
  this._timer = this._callback = this._asyncModule = null;
};
m = ng.prototype;
m.setConfig = function(a, b) {
  var c = this;
  this._asyncModule = a;
  this._callback = b;
  this._timer = this._asyncModule.run(function() {
    c._timer = null;
    og.delete(c);
    c._callback();
  });
};
m.cancel = function() {
  this.isActive() && (this._cancelAsync(), og.delete(this));
};
m._cancelAsync = function() {
  this.isActive() && (this._asyncModule.cancel(this._timer), this._timer = null);
};
m.flush = function() {
  this.isActive() && (this.cancel(), this._callback());
};
m.isActive = function() {
  return null != this._timer;
};
var pg = function(a, b, c) {
  a instanceof ng ? a._cancelAsync() : a = new ng;
  a.setConfig(b, c);
  return a;
}, og = new Set, qg = function(a) {
  og.add(a);
}, rg = function() {
  var a = !!og.size;
  og.forEach(function(b) {
    try {
      b.flush();
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  });
  return a;
};
var sg = 'string' === typeof document.head.style.touchAction, tg = ['mousedown', 'mousemove', 'mouseup', 'click'],
  ug = [0, 1, 4, 2], vg;
try {
  vg = 1 === (new MouseEvent('test', { buttons: 1 })).buttons;
} catch (a) {
  vg = !1;
}
var wg = !1;
(function() {
  try {
    var a = Object.defineProperty({}, 'passive', {
      get: function() {
        wg = !0;
      },
    });
    window.addEventListener('test', null, a);
    window.removeEventListener('test', null, a);
  } catch (b) {
  }
})();

function xg(a) {
  if (!(-1 < tg.indexOf(a) || 'touchend' === a) && sg && wg && Yb) return { passive: !0 };
}

var yg = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/), zg = [],
  Ag = { button: !0, input: !0, keygen: !0, meter: !0, output: !0, textarea: !0, progress: !0, select: !0 }, Bg = {
    button: !0,
    command: !0,
    fieldset: !0,
    input: !0,
    keygen: !0,
    optgroup: !0,
    option: !0,
    select: !0,
    textarea: !0,
  }, Eg = function(a) {
    var b = a.sourceCapabilities;
    if (!b || b.firesTouchEvents) if (a.__polymerGesturesHandled = { skip: !0 }, 'click' === a.type) {
      b = !1;
      for (var c = Cg(a), d = 0; d < c.length; d++) {
        if (c[d].nodeType === Node.ELEMENT_NODE) if ('label' === c[d].localName) zg.push(c[d]);
        else if (Ag[c[d].localName]) {
          var e = c[d];
          var f = Array.prototype.slice.call(e.labels || []);
          if (!f.length) {
            f = [];
            var g = e.getRootNode();
            if (e.id) for (e = g.querySelectorAll('label[for = ' + e.id + ']'), g = 0; g < e.length; g++) f.push(e[g]);
          }
          for (e = 0; e < f.length; e++) b = b || -1 < zg.indexOf(f[e]);
        }
        if (c[d] === Dg) return;
      }
      b || (a.preventDefault(), a.stopPropagation());
    }
  };

function Fg(a) {
  for (var b = yg ? ['click'] : tg, c = 0, d; c < b.length; c++) d = b[c], a ? (zg.length = 0, document.addEventListener(d, Eg, !0)) : document.removeEventListener(d, Eg, !0);
}

function Gg(a) {
  Hg || Fg(!0);
  var b = function() {
    Fg();
    Hg = Dg = null;
  };
  Dg = Cg(a)[0];
  Hg = pg(Hg, fe.after(2500), b);
}

function Ig(a) {
  var b = a.type;
  if (!(-1 < tg.indexOf(b))) return !1;
  if ('mousemove' === b) return b = void 0 === a.buttons ? 1 : a.buttons, a instanceof window.MouseEvent && !vg && (b = ug[a.which] || 0), !!(b & 1);
  a = void 0 === a.button ? 0 : a.button;
  return 0 === a;
}

function Jg(a) {
  if ('click' === a.type) {
    if (0 === a.detail) return !0;
    var b = _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a);
    if (!b.nodeType || b.nodeType !== Node.ELEMENT_NODE) return !0;
    b = b.getBoundingClientRect();
    var c = a.pageX;
    a = a.pageY;
    return !(c >= b.left && c <= b.right && a >= b.top && a <= b.bottom);
  }
  return !1;
}

var Dg = null, Hg = null, Kg = 0, Lg = 0, Mg = -1, Ng = !1;

function Og(a, b, c) {
  a.movefn = b;
  a.upfn = c;
  document.addEventListener('mousemove', b);
  document.addEventListener('mouseup', c);
}

function Pg(a) {
  document.removeEventListener('mousemove', a.movefn);
  document.removeEventListener('mouseup', a.upfn);
  a.movefn = null;
  a.upfn = null;
}

document.addEventListener('touchend', Gg, wg ? { passive: !0 } : !1);
var Cg = window.ShadyDOM && window.ShadyDOM.noPatch ? window.ShadyDOM.composedPath : function(a) {
  return a.composedPath && a.composedPath() || [];
}, Qg = {}, Rg = [];

function Sg(a, b) {
  for (var c = document.elementFromPoint(a, b), d = c; d && d.shadowRoot && !window.ShadyDOM;) {
    var e = d;
    d = d.shadowRoot.elementFromPoint(a, b);
    if (e === d) break;
    d && (c = d);
  }
  return c;
}

function _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a) {
  var b = Cg(a);
  return 0 < b.length ? b[0] : a.target;
}

function _handleNative$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a) {
  var b = a.type, c = a.currentTarget;
  if (c = c.__polymerGestures) if (c = c[b]) {
    if (!a.__polymerGesturesHandled && (a.__polymerGesturesHandled = {}, 'touch' === b.slice(0, 5))) {
      var d = a.changedTouches[0];
      'touchstart' === b && 1 === a.touches.length && (Mg = d.identifier);
      if (Mg !== d.identifier) return;
      sg || ('touchstart' === b || 'touchmove' === b) && _handleTouchAction$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a);
    }
    d = a.__polymerGesturesHandled;
    if (!d.skip) {
      for (var e = 0, f; e < Rg.length; e++) f = Rg[e], c[f.name] && !d[f.name] && f.flow && -1 < f.flow.start.indexOf(a.type) && f.reset && f.reset();
      for (e = 0; e < Rg.length; e++) f = Rg[e], c[f.name] && !d[f.name] && (d[f.name] = !0, f[b](a));
    }
  }
}

function _handleTouchAction$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a) {
  var b = a.changedTouches[0], c = a.type;
  if ('touchstart' === c) Kg = b.clientX, Lg = b.clientY, Ng = !1; else if ('touchmove' === c && !Ng) {
    Ng = !0;
    c = 'auto';
    for (var d = Cg(a), e = 0, f; e < d.length; e++) if (f = d[e], f.__polymerGesturesTouchAction) {
      c = f.__polymerGesturesTouchAction;
      break;
    }
    d = !1;
    e = Math.abs(Kg - b.clientX);
    b = Math.abs(Lg - b.clientY);
    a.cancelable && ('none' === c ? d = !0 : 'pan-x' === c ? d = b > e : 'pan-y' === c && (d = e > b));
    d ? a.preventDefault() : Tg('track');
  }
}

function Ug(a, b, c) {
  return Qg[b] ? (_add$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a, b, c), !0) : !1;
}

function Vg(a, b, c) {
  return Qg[b] ? (_remove$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a, b, c), !0) : !1;
}

function _add$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a, b, c) {
  var d = Qg[b], e = d.deps, f = d.name, g = a.__polymerGestures;
  g || (a.__polymerGestures = g = {});
  for (var k = 0, h, l; k < e.length; k++) h = e[k], yg && -1 < tg.indexOf(h) && 'click' !== h || ((l = g[h]) || (g[h] = l = { _count: 0 }), 0 === l._count && a.addEventListener(h, _handleNative$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures, xg(h)), l[f] = (l[f] || 0) + 1, l._count = (l._count || 0) + 1);
  a.addEventListener(b, c);
  d.touchAction && Wg(a, d.touchAction);
}

function _remove$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a, b, c) {
  var d = Qg[b], e = d.deps;
  d = d.name;
  var f = a.__polymerGestures;
  if (f) for (var g = 0, k, h; g < e.length; g++) k = e[g], (h = f[k]) && h[d] && (h[d] = (h[d] || 1) - 1, h._count = (h._count || 1) - 1, 0 === h._count && a.removeEventListener(k, _handleNative$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures, xg(k)));
  a.removeEventListener(b, c);
}

function Xg(a) {
  Rg.push(a);
  for (var b = 0; b < a.emits.length; b++) Qg[a.emits[b]] = a;
}

function _findRecognizerByEvent$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a) {
  for (var b = 0, c; b < Rg.length; b++) {
    c = Rg[b];
    for (var d = 0, e; d < c.emits.length; d++) if (e = c.emits[d], e === a) return c;
  }
  return null;
}

function Wg(a, b) {
  sg && a instanceof HTMLElement && ie.run(function() {
    a.style.touchAction = b;
  });
  a.__polymerGesturesTouchAction = b;
}

function _fire$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a, b, c) {
  b = new Event(b, { bubbles: !0, cancelable: !0, composed: !0 });
  b.detail = c;
  Q(a).dispatchEvent(b);
  b.defaultPrevented && (a = c.preventer || c.sourceEvent) && a.preventDefault && a.preventDefault();
}

function Tg(a) {
  a = _findRecognizerByEvent$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a);
  a.info && (a.info.prevent = !0);
}

function Yg() {
  Hg && Hg.flush();
}

Xg({
  name: 'downup',
  deps: ['mousedown', 'touchstart', 'touchend'],
  flow: { start: ['mousedown', 'touchstart'], end: ['mouseup', 'touchend'] },
  emits: ['down', 'up'],
  info: { movefn: null, upfn: null },
  reset: function() {
    Pg(this.info);
  },
  mousedown: function(a) {
    if (Ig(a)) {
      var b = _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a), c = this,
        d = function(f) {
          Ig(f) || (Zg('up', b, f), Pg(c.info));
        }, e = function(f) {
          Ig(f) && Zg('up', b, f);
          Pg(c.info);
        };
      Og(this.info, d, e);
      Zg('down', b, a);
    }
  },
  touchstart: function(a) {
    Zg('down',
      _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a), a.changedTouches[0], a);
  },
  touchend: function(a) {
    Zg('up', _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a), a.changedTouches[0], a);
  },
});

function Zg(a, b, c, d) {
  b && _fire$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(b, a, {
    x: c.clientX,
    y: c.clientY,
    sourceEvent: c,
    preventer: d,
    prevent: function(e) {
      return Tg(e);
    },
  });
}

Xg({
  name: 'track',
  touchAction: 'none',
  deps: ['mousedown', 'touchstart', 'touchmove', 'touchend'],
  flow: { start: ['mousedown', 'touchstart'], end: ['mouseup', 'touchend'] },
  emits: ['track'],
  info: {
    x: 0, y: 0, state: 'start', started: !1, moves: [], addMove: function(a) {
      2 < this.moves.length && this.moves.shift();
      this.moves.push(a);
    }, movefn: null, upfn: null, prevent: !1,
  },
  reset: function() {
    this.info.state = 'start';
    this.info.started = !1;
    this.info.moves = [];
    this.info.x = 0;
    this.info.y = 0;
    this.info.prevent = !1;
    Pg(this.info);
  },
  mousedown: function(a) {
    if (Ig(a)) {
      var b =
          _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a), c = this,
        d = function(f) {
          var g = f.clientX, k = f.clientY;
          $g(c.info, g, k) && (c.info.state = c.info.started ? 'mouseup' === f.type ? 'end' : 'track' : 'start', 'start' === c.info.state && Tg('tap'), c.info.addMove({
            x: g,
            y: k,
          }), Ig(f) || (c.info.state = 'end', Pg(c.info)), b && ah(c.info, b, f), c.info.started = !0);
        }, e = function(f) {
          c.info.started && d(f);
          Pg(c.info);
        };
      Og(this.info, d, e);
      this.info.x = a.clientX;
      this.info.y = a.clientY;
    }
  },
  touchstart: function(a) {
    a = a.changedTouches[0];
    this.info.x = a.clientX;
    this.info.y = a.clientY;
  },
  touchmove: function(a) {
    var b = _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a);
    a = a.changedTouches[0];
    var c = a.clientX, d = a.clientY;
    $g(this.info, c, d) && ('start' === this.info.state && Tg('tap'), this.info.addMove({
      x: c,
      y: d,
    }), ah(this.info, b, a), this.info.state = 'track', this.info.started = !0);
  },
  touchend: function(a) {
    var b = _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a);
    a = a.changedTouches[0];
    this.info.started && (this.info.state = 'end', this.info.addMove({
      x: a.clientX,
      y: a.clientY,
    }), ah(this.info, b, a));
  },
});

function $g(a, b, c) {
  if (a.prevent) return !1;
  if (a.started) return !0;
  b = Math.abs(a.x - b);
  a = Math.abs(a.y - c);
  return 5 <= b || 5 <= a;
}

function ah(a, b, c) {
  if (b) {
    var d = a.moves[a.moves.length - 2], e = a.moves[a.moves.length - 1], f = e.x - a.x, g = e.y - a.y, k = 0;
    if (d) {
      var h = e.x - d.x;
      k = e.y - d.y;
    }
    _fire$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(b, 'track', {
      state: a.state,
      x: c.clientX,
      y: c.clientY,
      dx: f,
      dy: g,
      ddx: h,
      ddy: k,
      sourceEvent: c,
      hover: function() {
        return Sg(c.clientX, c.clientY);
      },
    });
  }
}

Xg({
  name: 'tap',
  deps: ['mousedown', 'click', 'touchstart', 'touchend'],
  flow: { start: ['mousedown', 'touchstart'], end: ['click', 'touchend'] },
  emits: ['tap'],
  info: { x: NaN, y: NaN, prevent: !1 },
  reset: function() {
    this.info.x = NaN;
    this.info.y = NaN;
    this.info.prevent = !1;
  },
  mousedown: function(a) {
    Ig(a) && (this.info.x = a.clientX, this.info.y = a.clientY);
  },
  click: function(a) {
    Ig(a) && bh(this.info, a);
  },
  touchstart: function(a) {
    a = a.changedTouches[0];
    this.info.x = a.clientX;
    this.info.y = a.clientY;
  },
  touchend: function(a) {
    bh(this.info, a.changedTouches[0],
      a);
  },
});

function bh(a, b, c) {
  var d = Math.abs(b.clientX - a.x), e = Math.abs(b.clientY - a.y),
    f = _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(c || b);
  !f || Bg[f.localName] && f.hasAttribute('disabled') || !(isNaN(d) || isNaN(e) || 25 >= d && 25 >= e || Jg(b)) || a.prevent || _fire$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(f, 'tap', {
    x: b.clientX,
    y: b.clientY,
    sourceEvent: b,
    preventer: c,
  });
};var _GestureEventListeners$$module$third_party$javascript$polymer$v2$polymer$lib$mixins$gesture_event_listeners = P(function(a) {
  var b = function(c) {
    return a.apply(this, arguments) || this;
  };
  w(b, a);
  b.prototype._addEventListenerToNode = function(c, d, e) {
    Ug(c, d, e) || a.prototype._addEventListenerToNode.call(this, c, d, e);
  };
  b.prototype._removeEventListenerFromNode = function(c, d, e) {
    Vg(c, d, e) || a.prototype._removeEventListenerFromNode.call(this, c, d, e);
  };
  return b;
}), ch = function(a) {
  return _GestureEventListeners$$module$third_party$javascript$polymer$v2$polymer$lib$mixins$gesture_event_listeners(a);
};

function dh(a, b, c, d, e) {
  var f;
  e && (f = 'object' === typeof c && null !== c) && (d = a.__dataTemp[b]);
  d = d !== c && (d === d || c === c);
  f && d && (a.__dataTemp[b] = c);
  return d;
}

var eh = P(function(a) {
  var b = function(c) {
    return a.apply(this, arguments) || this;
  };
  w(b, a);
  b.prototype._shouldPropertyChange = function(c, d, e) {
    return dh(this, c, d, e, !0);
  };
  return b;
}), fh = P(function(a) {
  var b = function(c) {
    return a.apply(this, arguments) || this;
  };
  w(b, a);
  b.prototype._shouldPropertyChange = function(c, d, e) {
    return dh(this, c, d, e, this.mutableData);
  };
  x.Object.defineProperties(b, {
    properties: {
      configurable: !0, enumerable: !0, get: function() {
        return { mutableData: Boolean };
      },
    },
  });
  return b;
});
eh._mutablePropertyChange = dh;
var gh = _GestureEventListeners$$module$third_party$javascript$polymer$v2$polymer$lib$mixins$gesture_event_listeners(fh(wf(HTMLElement))),
  hh = function() {
    var a = gh.call(this) || this;
    if ($b) throw Error('strictTemplatePolicy: dom-bind not allowed');
    a.root = null;
    a.$ = null;
    a.__children = null;
    return a;
  };
w(hh, gh);
m = hh.prototype;
m.attributeChangedCallback = function() {
  this.mutableData = !0;
};
m.connectedCallback = function() {
  this.style.display = 'none';
  this.render();
};
m.disconnectedCallback = function() {
  this.__removeChildren();
};
m.__insertChildren = function() {
  Q(Q(this).parentNode).insertBefore(this.root, this);
};
m.__removeChildren = function() {
  if (this.__children) for (var a = 0; a < this.__children.length; a++) this.root.appendChild(this.__children[a]);
};
m.render = function() {
  var a = this;
  if (!this.__children) {
    var b = b || this.querySelector('template');
    if (!b) {
      var c = new MutationObserver(function() {
        if (b = a.querySelector('template')) c.disconnect(), a.render(); else throw Error('dom-bind requires a <template> child');
      });
      c.observe(this, { childList: !0 });
      return;
    }
    this.root = this._stampTemplate(b);
    this.$ = this.root.$;
    this.__children = [];
    for (var d = this.root.firstChild; d; d = d.nextSibling) this.__children[this.__children.length] = d;
    this._enableProperties();
  }
  this.__insertChildren();
  this.dispatchEvent(new CustomEvent('dom-change', { bubbles: !0, composed: !0 }));
};
x.Object.defineProperties(hh, {
  observedAttributes: {
    configurable: !0, enumerable: !0, get: function() {
      return ['mutable-data'];
    },
  },
});
customElements.define('dom-bind', hh);
Polymer.Debouncer = ng;
Polymer.Gestures = {
  gestures: Qg,
  recognizers: Rg,
  deepTargetFind: Sg,
  addListener: Ug,
  removeListener: Vg,
  register: Xg,
  setTouchAction: Wg,
  prevent: Tg,
  resetMouseCanceller: Yg,
  findOriginalTarget: _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures,
  add: Ug,
  remove: Vg,
};
Polymer.GestureEventListeners = ch;
Polymer.MutableData = eh;
Polymer.OptionalMutableData = fh;
Polymer.DomBind = hh;
var ih = function() {
  do {
    var a = window.ShadyDOM && ShadyDOM.flush();
    window.ShadyCSS && window.ShadyCSS.ScopingShim && window.ShadyCSS.ScopingShim.flush();
    var b = rg();
  } while (a || b);
};
var jh = null;

function kh() {
  return jh;
}

kh.prototype = Object.create(HTMLTemplateElement.prototype, { constructor: { value: kh, writable: !0 } });
var lh = wf(kh), mh = eh(lh);

function nh(a, b) {
  jh = a;
  Object.setPrototypeOf(a, b.prototype);
  new b;
  jh = null;
}

var oh = function() {
}, ph = wf(oh), qh = function(a) {
  var b = ph.call(this) || this;
  b._configureProperties(a);
  b.root = b._stampTemplate(b.__dataHost);
  for (var c = b.children = [], d = b.root.firstChild; d; d = d.nextSibling) c.push(d), d.__templatizeInstance = b;
  b.__templatizeOwner && b.__templatizeOwner.__hideTemplateChildren__ && b._showHideChildren(!0);
  c = b.__templatizeOptions;
  (a && c.instanceProps || !c.instanceProps) && b._enableProperties();
  return b;
};
w(qh, ph);
m = qh.prototype;
m._configureProperties = function(a) {
  var b = this.__templatizeOptions;
  if (b.forwardHostProp) for (var c in this.__hostProps) this._setPendingProperty(c, this.__dataHost['_host_' + c]);
  for (var d in a) this._setPendingProperty(d, a[d]);
};
m.forwardHostProp = function(a, b) {
  this._setPendingPropertyOrPath(a, b, !1, !0) && this.__dataHost._enqueueClient(this);
};
m._addEventListenerToNode = function(a, b, c) {
  var d = this;
  if (this._methodHost && this.__templatizeOptions.parentModel) this._methodHost._addEventListenerToNode(a, b, function(f) {
    f.model = d;
    c(f);
  }); else {
    var e = this.__dataHost.__dataHost;
    e && e._addEventListenerToNode(a, b, c);
  }
};
m._showHideChildren = function(a) {
  for (var b = this.children, c = 0; c < b.length; c++) {
    var d = b[c];
    if (!!a != !!d.__hideTemplateChildren__) if (d.nodeType === Node.TEXT_NODE) a ? (d.__polymerTextContent__ = d.textContent, d.textContent = '') : d.textContent = d.__polymerTextContent__; else if ('slot' === d.localName) if (a) d.__polymerReplaced__ = document.createComment('hidden-slot'), Q(Q(d).parentNode).replaceChild(d.__polymerReplaced__, d); else {
      var e = d.__polymerReplaced__;
      e && Q(Q(e).parentNode).replaceChild(d, e);
    } else d.style && (a ? (d.__polymerDisplay__ =
      d.style.display, d.style.display = 'none') : d.style.display = d.__polymerDisplay__);
    d.__hideTemplateChildren__ = a;
    d._showHideChildren && d._showHideChildren(a);
  }
};
m._setUnmanagedPropertyToNode = function(a, b, c) {
  a.__hideTemplateChildren__ && a.nodeType == Node.TEXT_NODE && 'textContent' == b ? a.__polymerTextContent__ = c : ph.prototype._setUnmanagedPropertyToNode.call(this, a, b, c);
};
m.dispatchEvent = function() {
  return !0;
};
x.Object.defineProperties(qh.prototype, {
  parentModel: {
    configurable: !0, enumerable: !0, get: function() {
      var a = this.__parentModel;
      if (!a) {
        var b;
        a = this;
        do a = a.__dataHost.__dataHost; while ((b = a.__templatizeOptions) && !b.parentModel);
        this.__parentModel = a;
      }
      return a;
    },
  },
});
var rh = eh(qh);

function sh(a) {
  return (a = a.__dataHost) && a._methodHost || a;
}

function th(a, b, c) {
  var d = c.mutableData ? rh : qh;
  uh.mixin && (d = uh.mixin(d));
  var e = function(f) {
    return d.apply(this, arguments) || this;
  };
  w(e, d);
  e.prototype.__templatizeOptions = c;
  e.prototype._bindTemplate(a);
  vh(e, a, b, c);
  return e;
}

function wh(a, b, c, d) {
  var e = c.forwardHostProp;
  if (e) {
    var f = b.templatizeTemplateClass;
    if (!f) {
      var g = c.mutableData ? mh : lh;
      f = function(l) {
        return g.apply(this, arguments) || this;
      };
      w(f, g);
      f = b.templatizeTemplateClass = f;
      var k = b.hostProps, h;
      for (h in k) f.prototype._addPropertyEffect('_host_' + h, f.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE, { fn: xh(h, e) }), f.prototype._createNotifyingProperty('_host_' + h);
      fc && d && yh(b, c, d);
    }
    nh(a, f);
    a.__dataProto && Object.assign(a.__data, a.__dataProto);
    a.__dataTemp = {};
    a.__dataPending = null;
    a.__dataOld =
      null;
    a._enableProperties();
  }
}

function xh(a, b) {
  return function(c, d, e) {
    b.call(c.__templatizeOwner, d.substring(6), e[d]);
  };
}

function vh(a, b, c, d) {
  c = c.hostProps || {};
  for (var e in d.instanceProps) {
    delete c[e];
    var f = d.notifyInstanceProp;
    f && a.prototype._addPropertyEffect(e, a.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, { fn: zh(e, f) });
  }
  if (d.forwardHostProp && b.__dataHost) for (var g in c) a.prototype._addPropertyEffect(g, a.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, { fn: Ah() });
}

function zh(a, b) {
  return function(c, d, e) {
    b.call(c.__templatizeOwner, c, d, e[d]);
  };
}

function Ah() {
  return function(a, b, c) {
    a.__dataHost._setPendingPropertyOrPath('_host_' + b, c[b], !0, !0);
  };
}

function uh(a, b, c) {
  if ($b && !sh(a)) throw Error('strictTemplatePolicy: template owner not trusted');
  c = c || {};
  if (a.__templatizeOwner) throw Error('A <template> can only be templatized once');
  var d = (a.__templatizeOwner = b) ? b.constructor : qh;
  d = d._parseTemplate(a);
  var e = d.templatizeInstanceClass;
  e || (e = th(a, d, c), d.templatizeInstanceClass = e);
  var f = sh(a);
  wh(a, d, c, f);
  c = function(g) {
    return e.apply(this, arguments) || this;
  };
  w(c, e);
  c.prototype._methodHost = f;
  c.prototype.__dataHost = a;
  c.prototype.__templatizeOwner = b;
  c.prototype.__hostProps =
    d.hostProps;
  return c;
}

function yh(a, b, c) {
  c = c.constructor._properties;
  a = a.propertyEffects;
  b = b.instanceProps;
  for (var d in a) if (!(c[d] || b && b[d])) for (var e = a[d], f = 0; f < e.length; f++) {
    var g = e[f].info;
    g = g.part;
    if (!g.signature || !g.signature.static) {
      console.warn('Property \'' + d + '\' used in template but not declared in \'properties\'; attribute will not be observed.');
      break;
    }
  }
}

function Bh(a, b) {
  for (var c; b;) if (c = b.__templatizeInstance) if (c.__dataHost != a) b = c.__dataHost; else return c; else b = Q(b).parentNode;
  return null;
};var Ch = function() {
  var a = U.call(this) || this;
  a.__renderDebouncer = null;
  a.__invalidProps = null;
  a.__instance = null;
  a._lastIf = !1;
  a.__ctor = null;
  a.__hideTemplateChildren__ = !1;
  return a;
};
w(Ch, U);
m = Ch.prototype;
m.__debounceRender = function() {
  var a = this;
  this.__renderDebouncer = pg(this.__renderDebouncer, ie, function() {
    return a.__render();
  });
  qg(this.__renderDebouncer);
};
m.disconnectedCallback = function() {
  U.prototype.disconnectedCallback.call(this);
  var a = Q(this).parentNode;
  a && (a.nodeType != Node.DOCUMENT_FRAGMENT_NODE || Q(a).host) || this.__teardownInstance();
};
m.connectedCallback = function() {
  U.prototype.connectedCallback.call(this);
  this.style.display = 'none';
  this.if && this.__debounceRender();
};
m.render = function() {
  ih();
};
m.__render = function() {
  if (this.if) {
    if (!this.__ensureInstance()) return;
    this._showHideChildren();
  } else this.restamp && this.__teardownInstance();
  !this.restamp && this.__instance && this._showHideChildren();
  this.if != this._lastIf && (this.dispatchEvent(new CustomEvent('dom-change', {
    bubbles: !0,
    composed: !0,
  })), this._lastIf = this.if);
};
m.__ensureInstance = function() {
  var a = this, b = Q(this).parentNode;
  if (b) {
    if (!this.__ctor) {
      var c = Q(this).querySelector('template');
      if (!c) {
        var d = new MutationObserver(function() {
          if (Q(a).querySelector('template')) d.disconnect(), a.__render(); else throw Error('dom-if requires a <template> child');
        });
        d.observe(this, { childList: !0 });
        return !1;
      }
      this.__ctor = uh(c, this, {
        mutableData: !0, forwardHostProp: function(g, k) {
          this.__instance && (this.if ? this.__instance.forwardHostProp(g, k) : (this.__invalidProps = this.__invalidProps ||
            Object.create(null), this.__invalidProps[He(g)] = !0));
        },
      });
    }
    if (this.__instance) {
      if (this.__syncHostProperties(), (c = this.__instance.children) && c.length) {
        var e = Q(this).previousSibling;
        if (e !== c[c.length - 1]) {
          e = 0;
          for (var f = void 0; e < c.length && (f = c[e]); e++) Q(b).insertBefore(f, this);
        }
      }
    } else this.__instance = new this.__ctor, Q(b).insertBefore(this.__instance.root, this);
  }
  return !0;
};
m.__syncHostProperties = function() {
  var a = this.__invalidProps;
  if (a) {
    for (var b in a) this.__instance._setPendingProperty(b, this.__dataHost[b]);
    this.__invalidProps = null;
    this.__instance._flushProperties();
  }
};
m.__teardownInstance = function() {
  if (this.__instance) {
    var a = this.__instance.children;
    if (a && a.length) {
      var b = Q(a[0]).parentNode;
      if (b) {
        b = Q(b);
        for (var c = 0, d = void 0; c < a.length && (d = a[c]); c++) b.removeChild(d);
      }
    }
    this.__invalidProps = this.__instance = null;
  }
};
m._showHideChildren = function() {
  var a = this.__hideTemplateChildren__ || !this.if;
  this.__instance && this.__instance._showHideChildren(a);
};
x.Object.defineProperties(Ch, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'dom-if';
    },
  }, template: {
    configurable: !0, enumerable: !0, get: function() {
      return null;
    },
  }, properties: {
    configurable: !0, enumerable: !0, get: function() {
      return {
        if: { type: Boolean, observer: '__debounceRender' },
        restamp: { type: Boolean, observer: '__debounceRender' },
      };
    },
  },
});
customElements.define(Ch.is, Ch);
Polymer.enqueueDebouncer = qg;
Polymer.flush = ih;
Polymer.Templatize = { templatize: uh, modelForElement: Bh };
Polymer.TemplateInstanceBase = qh;
Polymer.DomIf = Ch;
var Dh = fh(U), Eh = function() {
  var a = Dh.call(this) || this;
  a.__instances = [];
  a.__limit = Infinity;
  a.__pool = [];
  a.__renderDebouncer = null;
  a.__itemsIdxToInstIdx = {};
  a.__chunkCount = null;
  a.__lastChunkTime = null;
  a.__sortFn = null;
  a.__filterFn = null;
  a.__observePaths = null;
  a.__ctor = null;
  a.__isDetached = !0;
  a.template = null;
  return a;
};
w(Eh, Dh);
m = Eh.prototype;
m.disconnectedCallback = function() {
  Dh.prototype.disconnectedCallback.call(this);
  this.__isDetached = !0;
  for (var a = 0; a < this.__instances.length; a++) this.__detachInstance(a);
};
m.connectedCallback = function() {
  Dh.prototype.connectedCallback.call(this);
  this.style.display = 'none';
  if (this.__isDetached) {
    this.__isDetached = !1;
    for (var a = Q(Q(this).parentNode), b = 0; b < this.__instances.length; b++) this.__attachInstance(b, a);
  }
};
m.__ensureTemplatized = function() {
  var a = this;
  if (!this.__ctor) {
    var b = this.template = this.querySelector('template');
    if (!b) {
      var c = new MutationObserver(function() {
        if (a.querySelector('template')) c.disconnect(), a.__render(); else throw Error('dom-repeat requires a <template> child');
      });
      c.observe(this, { childList: !0 });
      return !1;
    }
    var d = {};
    d[this.as] = !0;
    d[this.indexAs] = !0;
    d[this.itemsIndexAs] = !0;
    this.__ctor = uh(b, this, {
      mutableData: this.mutableData, parentModel: !0, instanceProps: d, forwardHostProp: function(e, f) {
        for (var g =
          this.__instances, k = 0, h = void 0; k < g.length && (h = g[k]); k++) h.forwardHostProp(e, f);
      }, notifyInstanceProp: function(e, f, g) {
        Le(this.as, f) && (e = e[this.itemsIndexAs], f == this.as && (this.items[e] = g), f = Ke(this.as, 'items.' + e, f), this.notifyPath(f, g));
      },
    });
  }
  return !0;
};
m.__getMethodHost = function() {
  return this.__dataHost._methodHost || this.__dataHost;
};
m.__functionFromPropertyValue = function(a) {
  if ('string' === typeof a) {
    var b = a, c = this.__getMethodHost();
    return function() {
      return c[b].apply(c, arguments);
    };
  }
  return a;
};
m.__sortChanged = function(a) {
  this.__sortFn = this.__functionFromPropertyValue(a);
  this.items && this.__debounceRender(this.__render);
};
m.__filterChanged = function(a) {
  this.__filterFn = this.__functionFromPropertyValue(a);
  this.items && this.__debounceRender(this.__render);
};
m.__computeFrameTime = function(a) {
  return Math.ceil(1E3 / a);
};
m.__initializeChunking = function() {
  this.initialCount && (this.__chunkCount = this.__limit = this.initialCount, this.__lastChunkTime = performance.now());
};
m.__tryRenderChunk = function() {
  this.items && this.__limit < this.items.length && this.__debounceRender(this.__requestRenderChunk);
};
m.__requestRenderChunk = function() {
  var a = this;
  requestAnimationFrame(function() {
    return a.__renderChunk();
  });
};
m.__renderChunk = function() {
  var a = performance.now(), b = this._targetFrameTime / (a - this.__lastChunkTime);
  this.__chunkCount = Math.round(this.__chunkCount * b) || 1;
  this.__limit += this.__chunkCount;
  this.__lastChunkTime = a;
  this.__debounceRender(this.__render);
};
m.__observeChanged = function() {
  this.__observePaths = this.observe && this.observe.replace('.*', '.').split(' ');
};
m.__itemsChanged = function(a) {
  this.items && !Array.isArray(this.items) && console.warn('dom-repeat expected array for `items`, found', this.items);
  this.__handleItemPath(a.path, a.value) || (this.__initializeChunking(), this.__debounceRender(this.__render));
};
m.__handleObservedPaths = function(a) {
  if (this.__sortFn || this.__filterFn) if (!a) this.__debounceRender(this.__render, this.delay); else if (this.__observePaths) for (var b = this.__observePaths, c = 0; c < b.length; c++) 0 === a.indexOf(b[c]) && this.__debounceRender(this.__render, this.delay);
};
m.__debounceRender = function(a, b) {
  b = void 0 === b ? 0 : b;
  this.__renderDebouncer = pg(this.__renderDebouncer, 0 < b ? fe.after(b) : ie, a.bind(this));
  qg(this.__renderDebouncer);
};
m.render = function() {
  this.__debounceRender(this.__render);
  ih();
};
m.__render = function() {
  this.__ensureTemplatized() && (this.__applyFullRefresh(), this.__pool.length = 0, this._setRenderedItemCount(this.__instances.length), this.dispatchEvent(new CustomEvent('dom-change', {
    bubbles: !0,
    composed: !0,
  })), this.__tryRenderChunk());
};
m.__applyFullRefresh = function() {
  for (var a = this, b = this.items || [], c = Array(b.length), d = 0; d < b.length; d++) c[d] = d;
  this.__filterFn && (c = c.filter(function(l, n, p) {
    return a.__filterFn(b[l], n, p);
  }));
  this.__sortFn && c.sort(function(l, n) {
    return a.__sortFn(b[l], b[n]);
  });
  var e = this.__itemsIdxToInstIdx = {};
  d = 0;
  for (var f = Math.min(c.length, this.__limit); d < f; d++) {
    var g = this.__instances[d], k = c[d], h = b[k];
    e[k] = d;
    g ? (g._setPendingProperty(this.as, h), g._setPendingProperty(this.indexAs, d), g._setPendingProperty(this.itemsIndexAs,
      k), g._flushProperties()) : this.__insertInstance(h, d, k);
  }
  for (c = this.__instances.length - 1; c >= d; c--) this.__detachAndRemoveInstance(c);
};
m.__detachInstance = function(a) {
  a = this.__instances[a];
  for (var b = Q(a.root), c = 0; c < a.children.length; c++) {
    var d = a.children[c];
    b.appendChild(d);
  }
  return a;
};
m.__attachInstance = function(a, b) {
  a = this.__instances[a];
  b.insertBefore(a.root, this);
};
m.__detachAndRemoveInstance = function(a) {
  var b = this.__detachInstance(a);
  b && this.__pool.push(b);
  this.__instances.splice(a, 1);
};
m.__stampInstance = function(a, b, c) {
  var d = {};
  d[this.as] = a;
  d[this.indexAs] = b;
  d[this.itemsIndexAs] = c;
  return new this.__ctor(d);
};
m.__insertInstance = function(a, b, c) {
  var d = this.__pool.pop();
  d ? (d._setPendingProperty(this.as, a), d._setPendingProperty(this.indexAs, b), d._setPendingProperty(this.itemsIndexAs, c), d._flushProperties()) : d = this.__stampInstance(a, b, c);
  a = (a = this.__instances[b + 1]) ? a.children[0] : this;
  Q(Q(this).parentNode).insertBefore(d.root, a);
  return this.__instances[b] = d;
};
m._showHideChildren = function(a) {
  for (var b = 0; b < this.__instances.length; b++) this.__instances[b]._showHideChildren(a);
};
m.__handleItemPath = function(a, b) {
  var c = a.slice(6), d = c.indexOf('.');
  a = 0 > d ? c : c.substring(0, d);
  if (a == parseInt(a, 10)) {
    c = 0 > d ? '' : c.substring(d + 1);
    this.__handleObservedPaths(c);
    a = this.__itemsIdxToInstIdx[a];
    if (a = this.__instances[a]) c = this.as + (c ? '.' + c : ''), a._setPendingPropertyOrPath(c, b, !1, !0), a._flushProperties();
    return !0;
  }
};
m.itemForElement = function(a) {
  return (a = this.modelForElement(a)) && a[this.as];
};
m.indexForElement = function(a) {
  return (a = this.modelForElement(a)) && a[this.indexAs];
};
m.modelForElement = function(a) {
  return Bh(this.template, a);
};
x.Object.defineProperties(Eh, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'dom-repeat';
    },
  }, template: {
    configurable: !0, enumerable: !0, get: function() {
      return null;
    },
  }, properties: {
    configurable: !0, enumerable: !0, get: function() {
      return {
        items: { type: Array },
        as: { type: String, value: 'item' },
        indexAs: { type: String, value: 'index' },
        itemsIndexAs: { type: String, value: 'itemsIndex' },
        sort: { type: Function, observer: '__sortChanged' },
        filter: { type: Function, observer: '__filterChanged' },
        observe: { type: String, observer: '__observeChanged' },
        delay: Number,
        renderedItemCount: { type: Number, notify: !0, readOnly: !0 },
        initialCount: { type: Number, observer: '__initializeChunking' },
        targetFramerate: { type: Number, value: 20 },
        _targetFrameTime: { type: Number, computed: '__computeFrameTime(targetFramerate)' },
      };
    },
  }, observers: {
    configurable: !0, enumerable: !0, get: function() {
      return ['__itemsChanged(items.*)'];
    },
  },
});
Eh.prototype._setRenderedItemCount = function() {
};
customElements.define(Eh.is, Eh);
Polymer.DomRepeat = Eh;

function Fh(a) {
  return 'slot' === a.localName;
}

var Gh = function(a, b) {
  var c = this;
  this._nativeChildrenObserver = this._shadyChildrenObserver = null;
  this._connected = !1;
  this._target = a;
  this.callback = b;
  this._effectiveNodes = [];
  this._observer = null;
  this._scheduled = !1;
  this._boundSchedule = function() {
    c._schedule();
  };
  this.connect();
  this._schedule();
};
Gh.getFlattenedNodes = function(a) {
  var b = Q(a);
  return Fh(a) ? b.assignedNodes({ flatten: !0 }) : Array.from(b.childNodes).map(function(c) {
    return Fh(c) ? Q(c).assignedNodes({ flatten: !0 }) : [c];
  }).reduce(function(c, d) {
    return c.concat(d);
  }, []);
};
m = Gh.prototype;
m.connect = function() {
  var a = this;
  Fh(this._target) ? this._listenSlots([this._target]) : Q(this._target).children && (this._listenSlots(Q(this._target).children), window.ShadyDOM ? this._shadyChildrenObserver = ShadyDOM.observeChildren(this._target, function(b) {
    a._processMutations(b);
  }) : (this._nativeChildrenObserver = new MutationObserver(function(b) {
    a._processMutations(b);
  }), this._nativeChildrenObserver.observe(this._target, { childList: !0 })));
  this._connected = !0;
};
m.disconnect = function() {
  Fh(this._target) ? this._unlistenSlots([this._target]) : Q(this._target).children && (this._unlistenSlots(Q(this._target).children), window.ShadyDOM && this._shadyChildrenObserver ? (ShadyDOM.unobserveChildren(this._shadyChildrenObserver), this._shadyChildrenObserver = null) : this._nativeChildrenObserver && (this._nativeChildrenObserver.disconnect(), this._nativeChildrenObserver = null));
  this._connected = !1;
};
m._schedule = function() {
  var a = this;
  this._scheduled || (this._scheduled = !0, ie.run(function() {
    return a.flush();
  }));
};
m._processMutations = function(a) {
  this._processSlotMutations(a);
  this.flush();
};
m._processSlotMutations = function(a) {
  if (a) for (var b = 0; b < a.length; b++) {
    var c = a[b];
    c.addedNodes && this._listenSlots(c.addedNodes);
    c.removedNodes && this._unlistenSlots(c.removedNodes);
  }
};
m.flush = function() {
  if (!this._connected) return !1;
  window.ShadyDOM && ShadyDOM.flush();
  this._nativeChildrenObserver ? this._processSlotMutations(this._nativeChildrenObserver.takeRecords()) : this._shadyChildrenObserver && this._processSlotMutations(this._shadyChildrenObserver.takeRecords());
  this._scheduled = !1;
  for (var a = {
    target: this._target,
    addedNodes: [],
    removedNodes: [],
  }, b = this.constructor.getFlattenedNodes(this._target), c = Nf(b, this._effectiveNodes), d = 0, e = void 0; d < c.length && (e = c[d]); d++) for (var f = 0, g = void 0; f <
  e.removed.length && (g = e.removed[f]); f++) a.removedNodes.push(g);
  d = 0;
  for (e = void 0; d < c.length && (e = c[d]); d++) for (f = e.index; f < e.index + e.addedCount; f++) a.addedNodes.push(b[f]);
  this._effectiveNodes = b;
  b = !1;
  if (a.addedNodes.length || a.removedNodes.length) b = !0, this.callback.call(this._target, a);
  return b;
};
m._listenSlots = function(a) {
  for (var b = 0; b < a.length; b++) {
    var c = a[b];
    Fh(c) && c.addEventListener('slotchange', this._boundSchedule);
  }
};
m._unlistenSlots = function(a) {
  for (var b = 0; b < a.length; b++) {
    var c = a[b];
    Fh(c) && c.removeEventListener('slotchange', this._boundSchedule);
  }
};
var Hh = Element.prototype,
  Ih = Hh.matches || Hh.matchesSelector || Hh.mozMatchesSelector || Hh.msMatchesSelector || Hh.oMatchesSelector || Hh.webkitMatchesSelector,
  Jh = function(a, b) {
    return Ih.call(a, b);
  }, Kh = function(a) {
    this.node = a;
  };
m = Kh.prototype;
m.observeNodes = function(a) {
  return new Gh(this.node, a);
};
m.unobserveNodes = function(a) {
  a.disconnect();
};
m.notifyObserver = function() {
};
m.deepContains = function(a) {
  if (Q(this.node).contains(a)) return !0;
  var b = a;
  for (a = a.ownerDocument; b && b !== a && b !== this.node;) b = Q(b).parentNode || Q(b).host;
  return b === this.node;
};
m.getOwnerRoot = function() {
  return Q(this.node).getRootNode();
};
m.getDistributedNodes = function() {
  return 'slot' === this.node.localName ? Q(this.node).assignedNodes({ flatten: !0 }) : [];
};
m.getDestinationInsertionPoints = function() {
  for (var a = [], b = Q(this.node).assignedSlot; b;) a.push(b), b = Q(b).assignedSlot;
  return a;
};
m.importNode = function(a, b) {
  var c = this.node instanceof Document ? this.node : this.node.ownerDocument;
  return Q(c).importNode(a, b);
};
m.getEffectiveChildNodes = function() {
  return Gh.getFlattenedNodes(this.node);
};
m.queryDistributedElements = function(a) {
  for (var b = this.getEffectiveChildNodes(), c = [], d = 0, e = b.length, f = void 0; d < e && (f = b[d]); d++) f.nodeType === Node.ELEMENT_NODE && Jh(f, a) && c.push(f);
  return c;
};
x.Object.defineProperties(Kh.prototype, {
  activeElement: {
    configurable: !0, enumerable: !0, get: function() {
      var a = this.node;
      return void 0 !== a._activeElement ? a._activeElement : a.activeElement;
    },
  },
});

function Lh(a, b) {
  for (var c = {}, d = 0; d < b.length; c = { $jscomp$loop$prop$method$148: c.$jscomp$loop$prop$method$148 }, d++) c.$jscomp$loop$prop$method$148 = b[d], a[c.$jscomp$loop$prop$method$148] = function(e) {
    return function() {
      return this.node[e.$jscomp$loop$prop$method$148].apply(this.node, arguments);
    };
  }(c);
}

function Mh(a, b) {
  for (var c = {}, d = 0; d < b.length; c = { $jscomp$loop$prop$name$150: c.$jscomp$loop$prop$name$150 }, d++) c.$jscomp$loop$prop$name$150 = b[d], Object.defineProperty(a, c.$jscomp$loop$prop$name$150, {
    get: function(e) {
      return function() {
        var f = this;
        return f.node[e.$jscomp$loop$prop$name$150];
      };
    }(c), configurable: !0,
  });
}

function Nh(a, b) {
  for (var c = {}, d = 0; d < b.length; c = { $jscomp$loop$prop$name$153: c.$jscomp$loop$prop$name$153 }, d++) c.$jscomp$loop$prop$name$153 = b[d], Object.defineProperty(a, c.$jscomp$loop$prop$name$153, {
    get: function(e) {
      return function() {
        return this.node[e.$jscomp$loop$prop$name$153];
      };
    }(c), set: function(e) {
      return function(f) {
        this.node[e.$jscomp$loop$prop$name$153] = f;
      };
    }(c), configurable: !0,
  });
}

var Oh = function(a) {
  this.event = a;
};
x.Object.defineProperties(Oh.prototype, {
  rootTarget: {
    configurable: !0, enumerable: !0, get: function() {
      return this.path[0];
    },
  }, localTarget: {
    configurable: !0, enumerable: !0, get: function() {
      return this.event.target;
    },
  }, path: {
    configurable: !0, enumerable: !0, get: function() {
      return this.event.composedPath();
    },
  },
});
var Ph = Kh;
if (window.ShadyDOM && window.ShadyDOM.inUse && window.ShadyDOM.noPatch && window.ShadyDOM.Wrapper) {
  var Qh = window.ShadyDOM.Wrapper, Rh = function(a) {
    return Qh.apply(this, arguments) || this;
  };
  w(Rh, Qh);
  Object.getOwnPropertyNames(Kh.prototype).forEach(function(a) {
    'activeElement' != a && (Rh.prototype[a] = Kh.prototype[a]);
  });
  Mh(Rh.prototype, ['classList']);
  Ph = Rh;
  Object.defineProperties(Oh.prototype, {
    localTarget: {
      get: function() {
        return this.event.currentTarget;
      }, configurable: !0,
    }, path: {
      get: function() {
        return window.ShadyDOM.composedPath(this.event);
      },
      configurable: !0,
    },
  });
} else Lh(Kh.prototype, 'cloneNode appendChild insertBefore removeChild replaceChild setAttribute removeAttribute querySelector querySelectorAll'.split(' ')), Mh(Kh.prototype, 'parentNode firstChild lastChild nextSibling previousSibling firstElementChild lastElementChild nextElementSibling previousElementSibling childNodes children classList'.split(' ')), Nh(Kh.prototype, ['textContent', 'innerHTML', 'className']);
var Sh = Ph, W = function(a) {
  a = a || document;
  if (a instanceof Ph) return a;
  if (a instanceof Oh) return a;
  var b = a.__domApi;
  b || (b = a instanceof Event ? new Oh(a) : new Ph(a), a.__domApi = b);
  return b;
};
var Th = /:host\(:dir\((ltr|rtl)\)\)/g, Uh = /([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g, Vh = /:dir\((?:ltr|rtl)\)/,
  Wh = !(!window.ShadyDOM || !window.ShadyDOM.inUse), Xh = [], Yh = null, Zh = '';

function $h(a) {
  a.__autoDirOptOut || a.setAttribute('dir', Zh);
}

function ai() {
  Zh = document.documentElement.getAttribute('dir');
  Zh = document.documentElement.getAttribute('dir');
  for (var a = 0; a < Xh.length; a++) $h(Xh[a]);
}

var bi = P(function(a) {
  Wh || Yh || (Zh = document.documentElement.getAttribute('dir'), Yh = new MutationObserver(ai), Yh.observe(document.documentElement, {
    attributes: !0,
    attributeFilter: ['dir'],
  }));
  var b = Be(a);
  a = function() {
    var c = b.call(this) || this;
    c.__autoDirOptOut = !1;
    return c;
  };
  w(a, b);
  a._processStyleText = function(c, d) {
    c = b._processStyleText.call(this, c, d);
    !Wh && Vh.test(c) && (c = this._replaceDirInCssText(c), this.__activateDir = !0);
    return c;
  };
  a._replaceDirInCssText = function(c) {
    c = c.replace(Th, ':host([dir="$1"])');
    return c =
      c.replace(Uh, ':host([dir="$2"]) $1');
  };
  a.prototype.ready = function() {
    b.prototype.ready.call(this);
    this.__autoDirOptOut = this.hasAttribute('dir');
  };
  a.prototype.connectedCallback = function() {
    b.prototype.connectedCallback && b.prototype.connectedCallback.call(this);
    this.constructor.__activateDir && (Yh && Yh.takeRecords().length && ai(), Xh.push(this), $h(this));
  };
  a.prototype.disconnectedCallback = function() {
    b.prototype.disconnectedCallback && b.prototype.disconnectedCallback.call(this);
    if (this.constructor.__activateDir) {
      var c =
        Xh.indexOf(this);
      -1 < c && Xh.splice(c, 1);
    }
  };
  a.__activateDir = !1;
  return a;
});
var ci = !1, di = [], ei = [];

function fi() {
  ci = !0;
  requestAnimationFrame(function() {
    ci = !1;
    gi(di);
    setTimeout(function() {
      for (var a = ei, b = 0, c = a.length; b < c; b++) hi(a.shift());
    });
  });
}

function gi(a) {
  for (; a.length;) hi(a.shift());
}

function hi(a) {
  var b = a[0], c = a[1];
  a = a[2];
  try {
    c.apply(b, a);
  } catch (d) {
    setTimeout(function() {
      throw d;
    });
  }
}

function ii() {
  for (; di.length || ei.length;) gi(di), gi(ei);
  ci = !1;
}

function ji(a, b, c) {
  ci || fi();
  di.push([a, b, c]);
}

function ki(a, b, c) {
  ci || fi();
  ei.push([a, b, c]);
};

function li() {
  document.body.removeAttribute('unresolved');
}

window.WebComponents ? window.addEventListener('WebComponentsReady', li) : 'interactive' === document.readyState || 'complete' === document.readyState ? li() : window.addEventListener('DOMContentLoaded', li);
var mi = function() {
  this.end = this.start = 0;
  this.rules = this.parent = this.previous = null;
  this.cssText = this.parsedCssText = '';
  this.atRule = !1;
  this.type = 0;
  this.parsedSelector = this.selector = this.keyframesName = '';
};

function ni(a) {
  a = a.replace(oi, '').replace(pi, '');
  var b = qi;
  var c = a;
  var d = new mi;
  d.start = 0;
  d.end = c.length;
  for (var e = d, f = 0, g = c.length; f < g; f++) if ('{' === c[f]) {
    e.rules || (e.rules = []);
    var k = e, h = k.rules[k.rules.length - 1] || null;
    e = new mi;
    e.start = f + 1;
    e.parent = k;
    e.previous = h;
    k.rules.push(e);
  } else '}' === c[f] && (e.end = f + 1, e = e.parent || d);
  c = d;
  return b(c, a);
}

function qi(a, b) {
  var c = b.substring(a.start, a.end - 1);
  a.parsedCssText = a.cssText = c.trim();
  a.parent && (c = a.previous ? a.previous.end : a.parent.start, c = b.substring(c, a.start - 1), c = _expandUnicodeEscapes$$module$third_party$javascript$polymer$v2$shadycss$src$css_parse(c), c = c.replace(ri, ' '), c = c.substring(c.lastIndexOf(';') + 1), c = a.parsedSelector = a.selector = c.trim(), a.atRule = 0 === c.indexOf('@'), a.atRule ? 0 === c.indexOf('@media') ? a.type = 4 : c.match(si) && (a.type = 7, a.keyframesName = a.selector.split(ri).pop()) : 0 === c.indexOf('--') ?
    a.type = 1E3 : a.type = 1);
  if (c = a.rules) for (var d = 0, e = c.length, f = void 0; d < e && (f = c[d]); d++) qi(f, b);
  return a;
}

function _expandUnicodeEscapes$$module$third_party$javascript$polymer$v2$shadycss$src$css_parse(a) {
  return a.replace(/\\([0-9a-f]{1,6})\s/gi, function(b, c) {
    b = c;
    for (c = 6 - b.length; c--;) b = '0' + b;
    return '\\' + b;
  });
}

function ti(a, b, c) {
  c = void 0 === c ? '' : c;
  var d = '';
  if (a.cssText || a.rules) {
    var e = a.rules;
    if (e && !_hasMixinRules$$module$third_party$javascript$polymer$v2$shadycss$src$css_parse(e)) for (var f = 0, g = e.length, k = void 0; f < g && (k = e[f]); f++) d = ti(k, b, d); else b ? b = a.cssText : (b = a.cssText, b = b.replace(ui, '').replace(vi, ''), b = b.replace(wi, '').replace(xi, '')), d = b, (d = d.trim()) && (d = '  ' + d + '\n');
  }
  d && (a.selector && (c += a.selector + ' {\n'), c += d, a.selector && (c += '}\n\n'));
  return c;
}

function _hasMixinRules$$module$third_party$javascript$polymer$v2$shadycss$src$css_parse(a) {
  a = a[0];
  return !!a && !!a.selector && 0 === a.selector.indexOf('--');
}

var oi = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim, pi = /@import[^;]*;/gim,
  ui = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
  vi = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim, wi = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
  xi = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim, si = /^@[^\s]*keyframes/, ri = /\s+/g;
var yi = {};
var zi = Promise.resolve();

function Ai(a) {
  if (a = yi[a]) a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0, a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0, a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1;
}

function Bi(a) {
  return a._applyShimCurrentVersion === a._applyShimNextVersion;
}

function Ci(a) {
  a._applyShimValidatingVersion = a._applyShimNextVersion;
  a._validating || (a._validating = !0, zi.then(function() {
    a._applyShimCurrentVersion = a._applyShimNextVersion;
    a._validating = !1;
  }));
};var Di = new Set;

function Ei(a, b) {
  if (!a) return '';
  'string' === typeof a && (a = ni(a));
  b && Fi(a, b);
  return ti(a, jg);
}

function Gi(a) {
  !a.__cssRules && a.textContent && (a.__cssRules = ni(a.textContent));
  return a.__cssRules || null;
}

function Fi(a, b, c, d) {
  if (a) {
    var e = !1, f = a.type;
    if (d && 4 === f) {
      var g = a.selector.match(Wf);
      g && (window.matchMedia(g[1]).matches || (e = !0));
    }
    1 === f ? b(a) : c && 7 === f ? c(a) : 1E3 === f && (e = !0);
    if ((a = a.rules) && !e) for (e = 0, f = a.length, g = void 0; e < f && (g = a[e]); e++) Fi(g, b, c, d);
  }
}

function Hi(a, b) {
  var c = a.indexOf('var(');
  if (-1 === c) return b(a, '', '', '');
  a:{
    var d = 0;
    var e = c + 3;
    for (var f = a.length; e < f; e++) if ('(' === a[e]) d++; else if (')' === a[e] && 0 === --d) break a;
    e = -1;
  }
  d = a.substring(c + 4, e);
  c = a.substring(0, c);
  a = Hi(a.substring(e + 1), b);
  f = d.indexOf(',');
  if (-1 === f) return b(c, d.trim(), '', a);
  e = d.substring(0, f).trim();
  d = d.substring(f + 1).trim();
  return b(c, e, d, a);
}

function Ii(a) {
  if (void 0 !== hg) return hg;
  if (void 0 === a.__cssBuild) {
    var b = a.getAttribute('css-build');
    if (b) a.__cssBuild = b; else {
      a:{
        b = 'template' === a.localName ? a.content.firstChild : a.firstChild;
        if (b instanceof Comment && (b = b.textContent.trim().split(':'), 'css-build' === b[0])) {
          b = b[1];
          break a;
        }
        b = '';
      }
      if ('' !== b) {
        var c = 'template' === a.localName ? a.content.firstChild : a.firstChild;
        c.parentNode.removeChild(c);
      }
      a.__cssBuild = b;
    }
  }
  return a.__cssBuild || '';
};var Ji = /;\s*/m, Ki = /^\s*(initial)|(inherit)\s*$/, Li = /\s*!important/, Mi = function() {
  this._map = {};
};
Mi.prototype.set = function(a, b) {
  a = a.trim();
  this._map[a] = { properties: b, dependants: {} };
};
Mi.prototype.get = function(a) {
  a = a.trim();
  return this._map[a] || null;
};
var Ni = null, X = function() {
  this._measureElement = this._currentElement = null;
  this._map = new Mi;
};
m = X.prototype;
m.detectMixin = function(a) {
  a = Vf.test(a) || Uf.test(a);
  Vf.lastIndex = 0;
  Uf.lastIndex = 0;
  return a;
};
m.gatherStyles = function(a) {
  var b = [];
  for (var c = a.content.querySelectorAll('style'), d = 0; d < c.length; d++) {
    var e = c[d];
    if (e.hasAttribute('shady-unscoped')) {
      if (!eg) {
        var f = e.textContent;
        Di.has(f) || (Di.add(f), f = e.cloneNode(!0), document.head.appendChild(f));
        e.parentNode.removeChild(e);
      }
    } else b.push(e.textContent), e.parentNode.removeChild(e);
  }
  return (b = b.join('').trim()) ? (c = document.createElement('style'), c.textContent = b, a.content.insertBefore(c, a.content.firstChild), c) : null;
};
m.transformTemplate = function(a, b) {
  void 0 === a._gatheredStyle && (a._gatheredStyle = this.gatherStyles(a));
  return (a = a._gatheredStyle) ? this.transformStyle(a, b) : null;
};
m.transformStyle = function(a, b) {
  b = void 0 === b ? '' : b;
  var c = Gi(a);
  this.transformRules(c, b);
  a.textContent = Ei(c);
  return c;
};
m.transformCustomStyle = function(a) {
  var b = this, c = Gi(a);
  Fi(c, function(d) {
    ':root' === d.selector && (d.selector = 'html');
    b.transformRule(d);
  });
  a.textContent = Ei(c);
  return c;
};
m.transformRules = function(a, b) {
  var c = this;
  this._currentElement = b;
  Fi(a, function(d) {
    c.transformRule(d);
  });
  this._currentElement = null;
};
m.transformRule = function(a) {
  a.cssText = this.transformCssText(a.parsedCssText, a);
  ':root' === a.selector && (a.selector = ':host > *');
};
m.transformCssText = function(a, b) {
  var c = this;
  a = a.replace(Uf, function(d, e, f, g) {
    return c._produceCssProperties(d, e, f, g, b);
  });
  return this._consumeCssProperties(a, b);
};
m._getInitialValueForProperty = function(a) {
  this._measureElement || (this._measureElement = document.createElement('meta'), this._measureElement.setAttribute('apply-shim-measure', ''), this._measureElement.style.all = 'initial', document.head.appendChild(this._measureElement));
  return window.getComputedStyle(this._measureElement).getPropertyValue(a);
};
m._fallbacksFromPreviousRules = function(a) {
  for (var b = this, c = a; c.parent;) c = c.parent;
  var d = {}, e = !1;
  Fi(c, function(f) {
    (e = e || f === a) || f.selector === a.selector && Object.assign(d, b._cssTextToMap(f.parsedCssText));
  });
  return d;
};
m._consumeCssProperties = function(a, b) {
  for (var c; c = Vf.exec(a);) {
    var d = c[0], e = c[1];
    c = c.index;
    var f = c + d.indexOf('@apply'), g = c + d.length;
    d = a.slice(0, f);
    a = a.slice(g);
    f = b ? this._fallbacksFromPreviousRules(b) : {};
    Object.assign(f, this._cssTextToMap(d));
    e = this._atApplyToCssProperties(e, f);
    a = '' + d + e + a;
    Vf.lastIndex = c + e.length;
  }
  return a;
};
m._atApplyToCssProperties = function(a, b) {
  a = a.replace(Ji, '');
  var c = [], d = this._map.get(a);
  d || (this._map.set(a, {}), d = this._map.get(a));
  if (d) {
    this._currentElement && (d.dependants[this._currentElement] = !0);
    var e, f = d.properties;
    for (e in f) {
      var g = b && b[e];
      d = [e, ': var(', a, '_-_', e];
      g && d.push(',', g.replace(Li, ''));
      d.push(')');
      Li.test(f[e]) && d.push(' !important');
      c.push(d.join(''));
    }
  }
  return c.join('; ');
};
m._replaceInitialOrInherit = function(a, b) {
  var c = Ki.exec(b);
  c && (b = c[1] ? this._getInitialValueForProperty(a) : 'apply-shim-inherit');
  return b;
};
m._cssTextToMap = function(a, b) {
  b = void 0 === b ? !1 : b;
  a = a.split(';');
  for (var c, d, e = {}, f = 0; f < a.length; f++) if (c = a[f]) d = c.split(':'), 1 < d.length && (c = d[0].trim(), d = d.slice(1).join(':'), b && (d = this._replaceInitialOrInherit(c, d)), e[c] = d);
  return e;
};
m._invalidateMixinEntry = function(a) {
  if (Ni) for (var b in a.dependants) b !== this._currentElement && Ni(b);
};
m._produceCssProperties = function(a, b, c, d, e) {
  var f = this;
  c && Hi(c, function(v, u) {
    u && f._map.get(u) && (d = '@apply ' + u + ';');
  });
  if (!d) return a;
  var g = this._consumeCssProperties('' + d, e);
  e = a.slice(0, a.indexOf('--'));
  var k = g = this._cssTextToMap(g, !0), h = this._map.get(b), l = h && h.properties;
  l ? k = Object.assign(Object.create(l), g) : this._map.set(b, k);
  var n = [], p, r = !1;
  for (p in k) {
    var t = g[p];
    void 0 === t && (t = 'initial');
    !l || p in l || (r = !0);
    n.push('' + b + '_-_' + p + ': ' + t);
  }
  r && this._invalidateMixinEntry(h);
  h && (h.properties = k);
  c && (e = a +
    ';' + e);
  return '' + e + n.join('; ') + ';';
};
X.prototype.detectMixin = X.prototype.detectMixin;
X.prototype.transformStyle = X.prototype.transformStyle;
X.prototype.transformCustomStyle = X.prototype.transformCustomStyle;
X.prototype.transformRules = X.prototype.transformRules;
X.prototype.transformRule = X.prototype.transformRule;
X.prototype.transformTemplate = X.prototype.transformTemplate;
X.prototype._separator = '_-_';
Object.defineProperty(X.prototype, 'invalidCallback', {
  get: function() {
    return Ni;
  }, set: function(a) {
    Ni = a;
  },
});
var Oi = new X, Pi = function() {
  this.customStyleInterface = null;
  Oi.invalidCallback = Ai;
};
m = Pi.prototype;
m.ensure = function() {
  var a = this;
  !this.customStyleInterface && window.ShadyCSS.CustomStyleInterface && (this.customStyleInterface = window.ShadyCSS.CustomStyleInterface, this.customStyleInterface.transformCallback = function(b) {
    Oi.transformCustomStyle(b);
  }, this.customStyleInterface.validateCallback = function() {
    requestAnimationFrame(function() {
      a.customStyleInterface.enqueued && a.flushCustomStyles();
    });
  });
};
m.prepareTemplate = function(a, b) {
  this.ensure();
  '' === Ii(a) && (yi[b] = a, b = Oi.transformTemplate(a, b), a._styleAst = b);
};
m.flushCustomStyles = function() {
  this.ensure();
  if (this.customStyleInterface) {
    var a = this.customStyleInterface.processStyles();
    if (this.customStyleInterface.enqueued) {
      for (var b = 0; b < a.length; b++) {
        var c = a[b];
        (c = this.customStyleInterface.getStyleForCustomStyle(c)) && Oi.transformCustomStyle(c);
      }
      this.customStyleInterface.enqueued = !1;
    }
  }
};
m.styleSubtree = function(a, b) {
  this.ensure();
  b && Xf(a, b);
  if (a.shadowRoot) for (this.styleElement(a), a = a.shadowRoot.children || a.shadowRoot.childNodes, b = 0; b < a.length; b++) this.styleSubtree(a[b]); else for (a = a.children || a.childNodes, b = 0; b < a.length; b++) this.styleSubtree(a[b]);
};
m.styleElement = function(a) {
  this.ensure();
  var b = a;
  var c = b.localName;
  c = b = c ? -1 < c.indexOf('-') ? c : b.getAttribute && b.getAttribute('is') || '' : b.is;
  b = yi[c];
  if ((!b || '' === Ii(b)) && b && !Bi(b)) {
    var d = b;
    d = !Bi(d) && d._applyShimValidatingVersion === d._applyShimNextVersion;
    d || (this.prepareTemplate(b, c), Ci(b));
    if (a = a.shadowRoot) if (a = a.querySelector('style')) a.__cssRules = b._styleAst, a.textContent = Ei(b._styleAst);
  }
};
m.styleDocument = function(a) {
  this.ensure();
  this.styleSubtree(document.body, a);
};
if (!window.ShadyCSS || !window.ShadyCSS.ScopingShim) {
  var Qi = new Pi, Ri = window.ShadyCSS && window.ShadyCSS.CustomStyleInterface;
  window.ShadyCSS = {
    prepareTemplate: function(a, b) {
      Qi.flushCustomStyles();
      Qi.prepareTemplate(a, b);
    }, prepareTemplateStyles: function(a, b, c) {
      window.ShadyCSS.prepareTemplate(a, b, c);
    }, prepareTemplateDom: function() {
    }, styleSubtree: function(a, b) {
      Qi.flushCustomStyles();
      Qi.styleSubtree(a, b);
    }, styleElement: function(a) {
      Qi.flushCustomStyles();
      Qi.styleElement(a);
    }, styleDocument: function(a) {
      Qi.flushCustomStyles();
      Qi.styleDocument(a);
    }, getComputedStyleValue: function(a, b) {
      return Yf(a, b);
    }, flushCustomStyles: function() {
      Qi.flushCustomStyles();
    }, nativeCss: jg, nativeShadow: eg, cssBuild: hg, disableRuntime: ig,
  };
  Ri && (window.ShadyCSS.CustomStyleInterface = Ri);
}
window.ShadyCSS.ApplyShim = Oi;
var Si = window.ShadyCSS, Ui = P(function(a) {
  var b = bi(_GestureEventListeners$$module$third_party$javascript$polymer$v2$polymer$lib$mixins$gesture_event_listeners(If(a))),
    c = { x: 'pan-x', y: 'pan-y', none: 'none', all: 'auto' };
  a = function() {
    var d;
    return d = b.call(this) || this;
  };
  w(a, b);
  a.prototype.created = function() {
  };
  a.prototype.connectedCallback = function() {
    b.prototype.connectedCallback.call(this);
    this.isAttached = !0;
    this.attached();
  };
  a.prototype.attached = function() {
  };
  a.prototype.disconnectedCallback = function() {
    b.prototype.disconnectedCallback.call(this);
    this.isAttached = !1;
    this.detached();
  };
  a.prototype.detached = function() {
  };
  a.prototype.attributeChangedCallback = function(d, e, f, g) {
    e !== f && (b.prototype.attributeChangedCallback.call(this, d, e, f, g), this.attributeChanged(d, e, f));
  };
  a.prototype.attributeChanged = function() {
  };
  a.prototype._initializeProperties = function() {
    var d = Object.getPrototypeOf(this);
    d.hasOwnProperty('__hasRegisterFinished') || (this._registered(), d.__hasRegisterFinished = !0);
    b.prototype._initializeProperties.call(this);
    this.root = this;
    this.created();
    this._applyListeners();
  };
  a.prototype._registered = function() {
  };
  a.prototype.ready = function() {
    this._ensureAttributes();
    b.prototype.ready.call(this);
  };
  a.prototype._ensureAttributes = function() {
  };
  a.prototype._applyListeners = function() {
  };
  a.prototype.serialize = function(d) {
    return this._serializeValue(d);
  };
  a.prototype.deserialize = function(d, e) {
    return this._deserializeValue(d, e);
  };
  a.prototype.reflectPropertyToAttribute = function(d, e, f) {
    this._propertyToAttribute(d, e, f);
  };
  a.prototype.serializeValueToAttribute = function(d,
                                                   e, f) {
    this._valueToNodeAttribute(f || this, d, e);
  };
  a.prototype.extend = function(d, e) {
    if (!d || !e) return d || e;
    for (var f = Object.getOwnPropertyNames(e), g = 0, k = void 0; g < f.length && (k = f[g]); g++) {
      var h = Object.getOwnPropertyDescriptor(e, k);
      h && Object.defineProperty(d, k, h);
    }
    return d;
  };
  a.prototype.mixin = function(d, e) {
    for (var f in e) d[f] = e[f];
    return d;
  };
  a.prototype.chainObject = function(d, e) {
    d && e && d !== e && (d.__proto__ = e);
    return d;
  };
  a.prototype.instanceTemplate = function(d) {
    d = this.constructor._contentForTemplate(d);
    return d =
      document.importNode(d, !0);
  };
  a.prototype.fire = function(d, e, f) {
    f = f || {};
    e = null === e || void 0 === e ? {} : e;
    d = new Event(d, {
      bubbles: void 0 === f.bubbles ? !0 : f.bubbles,
      cancelable: !!f.cancelable,
      composed: void 0 === f.composed ? !0 : f.composed,
    });
    d.detail = e;
    e = f.node || this;
    Q(e).dispatchEvent(d);
    return d;
  };
  a.prototype.listen = function(d, e, f) {
    d = d || this;
    var g = this.__boundListeners || (this.__boundListeners = new WeakMap), k = g.get(d);
    k || (k = {}, g.set(d, k));
    g = e + f;
    k[g] || (k[g] = this._addMethodEventListenerToNode(d, e, f, this));
  };
  a.prototype.unlisten =
    function(d, e, f) {
      d = d || this;
      var g = this.__boundListeners && this.__boundListeners.get(d);
      f = e + f;
      var k = g && g[f];
      k && (this._removeEventListenerFromNode(d, e, k), g[f] = null);
    };
  a.prototype.setScrollDirection = function(d, e) {
    Wg(e || this, c[d] || 'auto');
  };
  a.prototype.$$ = function(d) {
    return this.root.querySelector(d);
  };
  a.prototype.distributeContent = function() {
    var d = this;
    d = W(d);
    window.ShadyDOM && d.shadowRoot && ShadyDOM.flush();
  };
  a.prototype.getEffectiveChildNodes = function() {
    var d = this;
    d = W(d);
    return d.getEffectiveChildNodes();
  };
  a.prototype.queryDistributedElements = function(d) {
    var e = this;
    e = W(e);
    return e.queryDistributedElements(d);
  };
  a.prototype.getEffectiveChildren = function() {
    var d = this.getEffectiveChildNodes();
    return d.filter(function(e) {
      return e.nodeType === Node.ELEMENT_NODE;
    });
  };
  a.prototype.getEffectiveTextContent = function() {
    for (var d = this.getEffectiveChildNodes(), e = [], f = 0, g; g = d[f]; f++) g.nodeType !== Node.COMMENT_NODE && e.push(g.textContent);
    return e.join('');
  };
  a.prototype.queryEffectiveChildren = function(d) {
    return (d = this.queryDistributedElements(d)) &&
      d[0];
  };
  a.prototype.queryAllEffectiveChildren = function(d) {
    return this.queryDistributedElements(d);
  };
  a.prototype.getContentChildNodes = function(d) {
    return (d = this.root.querySelector(d || 'slot')) ? W(d).getDistributedNodes() : [];
  };
  a.prototype.getContentChildren = function(d) {
    return d = this.getContentChildNodes(d).filter(function(e) {
      return e.nodeType === Node.ELEMENT_NODE;
    });
  };
  a.prototype.isLightDescendant = function(d) {
    var e = this;
    return e !== d && Q(e).contains(d) && Q(e).getRootNode() === Q(d).getRootNode();
  };
  a.prototype.isLocalDescendant =
    function(d) {
      return this.root === Q(d).getRootNode();
    };
  a.prototype.scopeSubtree = function() {
  };
  a.prototype.getComputedStyleValue = function(d) {
    return Si.getComputedStyleValue(this, d);
  };
  a.prototype.debounce = function(d, e, f) {
    this._debouncers = this._debouncers || {};
    return this._debouncers[d] = pg(this._debouncers[d], 0 < f ? fe.after(f) : ie, e.bind(this));
  };
  a.prototype.isDebouncerActive = function(d) {
    this._debouncers = this._debouncers || {};
    d = this._debouncers[d];
    return !(!d || !d.isActive());
  };
  a.prototype.flushDebouncer = function(d) {
    this._debouncers =
      this._debouncers || {};
    (d = this._debouncers[d]) && d.flush();
  };
  a.prototype.cancelDebouncer = function(d) {
    this._debouncers = this._debouncers || {};
    (d = this._debouncers[d]) && d.cancel();
  };
  a.prototype.async = function(d, e) {
    return 0 < e ? fe.run(d.bind(this), e) : ~ie.run(d.bind(this));
  };
  a.prototype.cancelAsync = function(d) {
    0 > d ? ie.cancel(~d) : fe.cancel(d);
  };
  a.prototype.create = function(d, e) {
    d = document.createElement(d);
    if (e) if (d.setProperties) d.setProperties(e); else for (var f in e) d[f] = e[f];
    return d;
  };
  a.prototype.elementMatches = function(d,
                                        e) {
    return Jh(e || this, d);
  };
  a.prototype.toggleAttribute = function(d, e) {
    var f = this;
    3 === arguments.length && (f = arguments[2]);
    1 == arguments.length && (e = !f.hasAttribute(d));
    if (e) return Q(f).setAttribute(d, ''), !0;
    Q(f).removeAttribute(d);
    return !1;
  };
  a.prototype.toggleClass = function(d, e, f) {
    f = f || this;
    1 == arguments.length && (e = !f.classList.contains(d));
    e ? f.classList.add(d) : f.classList.remove(d);
  };
  a.prototype.transform = function(d, e) {
    e = e || this;
    e.style.webkitTransform = d;
    e.style.transform = d;
  };
  a.prototype.translate3d = function(d,
                                     e, f, g) {
    g = g || this;
    this.transform('translate3d(' + d + ',' + e + ',' + f + ')', g);
  };
  a.prototype.arrayDelete = function(d, e) {
    if (Array.isArray(d)) {
      if (e = d.indexOf(e), 0 <= e) return d.splice(e, 1);
    } else {
      var f = R(this, d);
      e = f.indexOf(e);
      if (0 <= e) return this.splice(d, e, 1);
    }
    return null;
  };
  a.prototype._logger = function(d, e) {
    Array.isArray(e) && 1 === e.length && Array.isArray(e[0]) && (e = e[0]);
    switch (d) {
      case 'log':
      case 'warn':
      case 'error':
        console[d].apply(console, ba(e));
    }
  };
  a.prototype._log = function(d) {
    for (var e = [], f = 0; f < arguments.length; ++f) e[f -
    0] = arguments[f];
    this._logger('log', e);
  };
  a.prototype._warn = function(d) {
    for (var e = [], f = 0; f < arguments.length; ++f) e[f - 0] = arguments[f];
    this._logger('warn', e);
  };
  a.prototype._error = function(d) {
    for (var e = [], f = 0; f < arguments.length; ++f) e[f - 0] = arguments[f];
    this._logger('error', e);
  };
  a.prototype._logf = function(d, e) {
    for (var f = [], g = 1; g < arguments.length; ++g) f[g - 1] = arguments[g];
    return ['[%s::%s]', this.is, d].concat(ba(f));
  };
  x.Object.defineProperties(a.prototype, {
    domHost: {
      configurable: !0, enumerable: !0, get: function() {
        var d =
          Q(this).getRootNode();
        return d instanceof DocumentFragment ? d.host : d;
      },
    },
  });
  x.Object.defineProperties(a, {
    importMeta: {
      configurable: !0, enumerable: !0, get: function() {
        return this.prototype.importMeta;
      },
    },
  });
  a.prototype.is = '';
  return a;
});
Polymer.FlattenedNodesObserver = Gh;
Polymer.DomApi = Sh;
Polymer.EventApi = Oh;
Polymer.dom = W;
Polymer.dom.matchesSelector = Jh;
Polymer.dom.flush = ih;
Polymer.dom.addDebouncer = qg;
Polymer.DirMixin = bi;
Polymer.RenderStatus = { beforeNextRender: ji, afterNextRender: ki, flush: ii };
Polymer.LegacyElementMixin = Ui;
var Vi;
Vi = eh._mutablePropertyChange;
var Wi = {
  _shouldPropertyChange: function(a, b, c) {
    return Vi(this, a, b, c, !0);
  },
}, Xi = {
  properties: { mutableData: Boolean }, _shouldPropertyChange: function(a, b, c) {
    return Vi(this, a, b, c, this.mutableData);
  },
};
Polymer.MutableDataBehavior = Wi;
Polymer.OptionalMutableDataBehavior = Xi;
var Yi = {
  attached: !0,
  detached: !0,
  ready: !0,
  created: !0,
  beforeRegister: !0,
  registered: !0,
  attributeChanged: !0,
  listeners: !0,
  hostAttributes: !0,
}, Zi = {
  attached: !0,
  detached: !0,
  ready: !0,
  created: !0,
  beforeRegister: !0,
  registered: !0,
  attributeChanged: !0,
  behaviors: !0,
  _noAccessors: !0,
}, $i = Object.assign({ listeners: !0, hostAttributes: !0, properties: !0, observers: !0 }, Zi);

function aj(a, b) {
  return bj({}, Ui(b), a);
}

function cj(a, b, c, d) {
  for (var e = b, f = e._noAccessors, g = Object.getOwnPropertyNames(e), k = 0; k < g.length; k++) {
    var h = g[k];
    if (!(h in d)) if (f) a[h] = e[h]; else {
      var l = Object.getOwnPropertyDescriptor(e, h);
      l && (l.configurable = !0, Object.defineProperty(a, h, l));
    }
  }
  for (var n in Yi) b[n] && (c[n] = c[n] || [], c[n].push(b[n]));
}

function dj(a, b, c) {
  b = b || [];
  for (var d = a.length - 1; 0 <= d; d--) {
    var e = a[d];
    e ? Array.isArray(e) ? dj(e, b) : 0 > b.indexOf(e) && (!c || 0 > c.indexOf(e)) && b.unshift(e) : console.warn('behavior is null, check for missing or 404 import');
  }
  return b;
}

function ej(a, b) {
  for (var c in b) {
    var d = a[c], e = b[c];
    a[c] = !('value' in e) && d && 'value' in d ? Object.assign({ value: d.value }, e) : e;
  }
}

function bj(a, b, c) {
  var d = {}, e = function(h) {
    return b.apply(this, arguments) || this;
  };
  w(e, b);
  e._finalizeClass = function() {
    if (this.hasOwnProperty('generatedFrom')) {
      if (g) for (var h = 0, l; h < g.length; h++) l = g[h], l.properties && this.createProperties(l.properties), l.observers && this.createObservers(l.observers, l.properties);
      a.properties && this.createProperties(a.properties);
      a.observers && this.createObservers(a.observers, a.properties);
      this._prepareTemplate();
    } else b._finalizeClass.call(this);
  };
  e.prototype.created = function() {
    b.prototype.created.call(this);
    var h = d.created;
    if (h) for (var l = 0; l < h.length; l++) h[l].call(this);
  };
  e.prototype._registered = function() {
    var h = e.prototype;
    if (!h.hasOwnProperty('__hasRegisterFinished')) {
      h.__hasRegisterFinished = !0;
      b.prototype._registered.call(this);
      dc && k(h);
      h = Object.getPrototypeOf(this);
      var l = d.beforeRegister;
      if (l) for (var n = 0; n < l.length; n++) l[n].call(h);
      if (l = d.registered) for (n = 0; n < l.length; n++) l[n].call(h);
    }
  };
  e.prototype._applyListeners = function() {
    b.prototype._applyListeners.call(this);
    var h = d.listeners;
    if (h) for (var l =
      0; l < h.length; l++) {
      var n = h[l];
      if (n) for (var p in n) this._addMethodEventListenerToNode(this, p, n[p]);
    }
  };
  e.prototype._ensureAttributes = function() {
    var h = d.hostAttributes;
    if (h) for (var l = h.length - 1; 0 <= l; l--) {
      var n = h[l], p;
      for (p in n) this._ensureAttribute(p, n[p]);
    }
    b.prototype._ensureAttributes.call(this);
  };
  e.prototype.ready = function() {
    b.prototype.ready.call(this);
    var h = d.ready;
    if (h) for (var l = 0; l < h.length; l++) h[l].call(this);
  };
  e.prototype.attached = function() {
    b.prototype.attached.call(this);
    var h = d.attached;
    if (h) for (var l =
      0; l < h.length; l++) h[l].call(this);
  };
  e.prototype.detached = function() {
    b.prototype.detached.call(this);
    var h = d.detached;
    if (h) for (var l = 0; l < h.length; l++) h[l].call(this);
  };
  e.prototype.attributeChanged = function(h, l, n) {
    b.prototype.attributeChanged.call(this);
    var p = d.attributeChanged;
    if (p) for (var r = 0; r < p.length; r++) p[r].call(this, h, l, n);
  };
  x.Object.defineProperties(e, {
    properties: {
      configurable: !0, enumerable: !0, get: function() {
        var h = {};
        if (g) for (var l = 0; l < g.length; l++) ej(h, g[l].properties);
        ej(h, a.properties);
        return h;
      },
    },
    observers: {
      configurable: !0, enumerable: !0, get: function() {
        var h = [];
        if (g) for (var l = 0, n; l < g.length; l++) n = g[l], n.observers && (h = h.concat(n.observers));
        a.observers && (h = h.concat(a.observers));
        return h;
      },
    },
  });
  if (c) {
    Array.isArray(c) || (c = [c]);
    var f = b.prototype.behaviors;
    var g = dj(c, null, f);
    e.prototype.behaviors = f ? f.concat(c) : g;
  }
  var k = function(h) {
    if (g) for (var l = h, n = g, p = 0; p < n.length; p++) cj(l, n[p], d, $i);
    cj(h, a, d, Zi);
  };
  dc || k(e.prototype);
  e.generatedFrom = a;
  return e;
}

var fj = function(a, b) {
  a || console.warn('Polymer.Class requires `info` argument');
  b = b ? b(Ui(HTMLElement)) : Ui(HTMLElement);
  b = bj(a, b, a.behaviors);
  b.is = b.prototype.is = a.is;
  return b;
};
Polymer.Class = fj;
Polymer.mixinBehaviors = aj;
var Y = function(a) {
  a = 'function' === typeof a ? a : Y.Class(a);
  customElements.define(a.is, a);
  return a;
};
Y.Class = fj;
Polymer._polymerFn = Y;
var gj = window.onLegacyPolymerFunctionDefinedCallback;
gj && gj();
var hj = {
  templatize: function(a, b) {
    this._templatizerTemplate = a;
    this.ctor = uh(a, this, {
      mutableData: !!b,
      parentModel: this._parentModel,
      instanceProps: this._instanceProps,
      forwardHostProp: this._forwardHostPropV2,
      notifyInstanceProp: this._notifyInstancePropV2,
    });
  }, stamp: function(a) {
    return new this.ctor(a);
  }, modelForElement: function(a) {
    return Bh(this._templatizerTemplate, a);
  },
};
Polymer.Templatizer = hj;
var ij = Ui(HTMLElement).prototype;
Polymer.Base = ij;
Polymer({
  is: 'tf-text-slider',
  _template: Kd,
  behaviors: [Polymer.IronA11yKeysBehavior],
  listeners: { track: 'handleTrack' },
  properties: {
    _inputSelector: { type: String, value: 'input' },
    decimalDigits: { type: Number, value: 2 },
    shiftStepFactor: { type: Number, value: 10 },
    hasMouseupAfterFocus: Boolean,
    resetValue: Number,
  },
  keyBindings: {
    enter: '_blurInput',
    up: '_increase',
    down: '_decrease',
    'shift+up': '_increase',
    'shift+down': '_decrease',
  },
  get _inputElement() {
    return Polymer.dom(this).querySelector(this._inputSelector);
  },
  get _step() {
    var a =
      1;
    this._inputElement && (a = parseFloat(this._inputElement.getAttribute('step')) || a);
    return a;
  },
  ready: function() {
    this.keyEventTarget = this._inputElement;
    this._inputElement.allowedPattern = /[\d+\-*/. ()]/;
  },
  attached: function() {
    this._inputElement && this.listen(this._inputElement, 'dragstart', 'handleInputDragStart');
  },
  detached: function() {
    this._inputElement && this.unlisten(this._inputElement, 'dragstart', 'handleInputDragStart');
  },
  handleInputDragStart: function(a) {
    a.preventDefault();
    a.stopPropagation();
  },
  handleTrack: function(a) {
    var b =
      a.detail;
    this.hasMouseupAfterFocus && 'track' == b.state || ('start' == b.state ? this._oldValue = this._inputElement.value : 'track' == b.state ? (a = parseFloat(b.ddx), b = -1 * parseFloat(b.ddy), b = Math.abs(a) > Math.abs(b) ? a : b, a = this._sanitizeNumericValue(), b = this._sanitizeNumericValue() + this._step * b, this._maybeChangeValue(b), a != this._inputElement.value && this._inputElement.dispatchEvent(new Event('changing', {
      bubbles: !0,
      composed: !0,
    }))) : 'end' == b.state && this._oldValue != this._inputElement.value && (this._inputElement.dispatchEvent(new Event('change')),
      document.activeElement.blur()));
  },
  _maybeChangeValue: function(a) {
    if (!this._inputElement.disabled) {
      var b = this._inputElement.value;
      a = parseFloat(a);
      var c = parseFloat(this._inputElement.getAttribute('max')),
        d = parseFloat(this._inputElement.getAttribute('min'));
      a < d ? a = d : a > c && (a = c);
      a = parseFloat(a.toFixed(this.decimalDigits)).toString();
      this._inputElement.value == a || isNaN(a) || (this._inputElement.value = a, this._inputElement.checkValidity() ? this._inputElement.dispatchEvent(new Event('input')) : this._inputElement.value =
        b);
    }
  },
  _sanitizeNumericValue: function() {
    var a = parseFloat(this._inputElement.value);
    isNaN(a) && ('undefined' != typeof this.resetValue ? a = this.resetValue : (a = parseFloat(this._inputElement.getAttribute('min')), isNaN(a) && (a = 0)), this._inputElement.value = a.toString());
    return a;
  },
  _increase: function(a) {
    this.handleStep(a, this._step);
  },
  _decrease: function(a) {
    this.handleStep(a, -this._step);
  },
  handleStep: function(a, b) {
    b = a.detail.shiftKey ? b * this.shiftStepFactor : b;
    b = this._sanitizeNumericValue() + b;
    var c = this._sanitizeNumericValue();
    this._maybeChangeValue(b);
    c != this._inputElement.value && this._inputElement.dispatchEvent(new Event('change'));
    a.detail.keyboardEvent.preventDefault();
  },
  _blurInput: function() {
    this._inputElement.blur();
  },
});
var jj = function(a) {
  return Polymer.Element.apply(this, arguments) || this;
};
w(jj, Polymer.Element);
x.Object.defineProperties(jj, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'tf-creative-preview-gwd-logo';
    },
  },
});
customElements.define(jj.is, jj);
var kj = document.createElement('template');
kj.setAttribute('style', 'display: none;');
kj.innerHTML = '<custom-style>\n  <style is="custom-style">\n    html {\n\n      /* Material Design color palette for Google products */\n\n      --google-red-100: #f4c7c3;\n      --google-red-300: #e67c73;\n      --google-red-500: #db4437;\n      --google-red-700: #c53929;\n\n      --google-blue-100: #c6dafc;\n      --google-blue-300: #7baaf7;\n      --google-blue-500: #4285f4;\n      --google-blue-700: #3367d6;\n\n      --google-green-100: #b7e1cd;\n      --google-green-300: #57bb8a;\n      --google-green-500: #0f9d58;\n      --google-green-700: #0b8043;\n\n      --google-yellow-100: #fce8b2;\n      --google-yellow-300: #f7cb4d;\n      --google-yellow-500: #f4b400;\n      --google-yellow-700: #f09300;\n\n      --google-grey-100: #f5f5f5;\n      --google-grey-300: #e0e0e0;\n      --google-grey-500: #9e9e9e;\n      --google-grey-700: #616161;\n\n      /* Material Design color palette from online spec document */\n\n      --paper-red-50: #ffebee;\n      --paper-red-100: #ffcdd2;\n      --paper-red-200: #ef9a9a;\n      --paper-red-300: #e57373;\n      --paper-red-400: #ef5350;\n      --paper-red-500: #f44336;\n      --paper-red-600: #e53935;\n      --paper-red-700: #d32f2f;\n      --paper-red-800: #c62828;\n      --paper-red-900: #b71c1c;\n      --paper-red-a100: #ff8a80;\n      --paper-red-a200: #ff5252;\n      --paper-red-a400: #ff1744;\n      --paper-red-a700: #d50000;\n\n      --paper-pink-50: #fce4ec;\n      --paper-pink-100: #f8bbd0;\n      --paper-pink-200: #f48fb1;\n      --paper-pink-300: #f06292;\n      --paper-pink-400: #ec407a;\n      --paper-pink-500: #e91e63;\n      --paper-pink-600: #d81b60;\n      --paper-pink-700: #c2185b;\n      --paper-pink-800: #ad1457;\n      --paper-pink-900: #880e4f;\n      --paper-pink-a100: #ff80ab;\n      --paper-pink-a200: #ff4081;\n      --paper-pink-a400: #f50057;\n      --paper-pink-a700: #c51162;\n\n      --paper-purple-50: #f3e5f5;\n      --paper-purple-100: #e1bee7;\n      --paper-purple-200: #ce93d8;\n      --paper-purple-300: #ba68c8;\n      --paper-purple-400: #ab47bc;\n      --paper-purple-500: #9c27b0;\n      --paper-purple-600: #8e24aa;\n      --paper-purple-700: #7b1fa2;\n      --paper-purple-800: #6a1b9a;\n      --paper-purple-900: #4a148c;\n      --paper-purple-a100: #ea80fc;\n      --paper-purple-a200: #e040fb;\n      --paper-purple-a400: #d500f9;\n      --paper-purple-a700: #aa00ff;\n\n      --paper-deep-purple-50: #ede7f6;\n      --paper-deep-purple-100: #d1c4e9;\n      --paper-deep-purple-200: #b39ddb;\n      --paper-deep-purple-300: #9575cd;\n      --paper-deep-purple-400: #7e57c2;\n      --paper-deep-purple-500: #673ab7;\n      --paper-deep-purple-600: #5e35b1;\n      --paper-deep-purple-700: #512da8;\n      --paper-deep-purple-800: #4527a0;\n      --paper-deep-purple-900: #311b92;\n      --paper-deep-purple-a100: #b388ff;\n      --paper-deep-purple-a200: #7c4dff;\n      --paper-deep-purple-a400: #651fff;\n      --paper-deep-purple-a700: #6200ea;\n\n      --paper-indigo-50: #e8eaf6;\n      --paper-indigo-100: #c5cae9;\n      --paper-indigo-200: #9fa8da;\n      --paper-indigo-300: #7986cb;\n      --paper-indigo-400: #5c6bc0;\n      --paper-indigo-500: #3f51b5;\n      --paper-indigo-600: #3949ab;\n      --paper-indigo-700: #303f9f;\n      --paper-indigo-800: #283593;\n      --paper-indigo-900: #1a237e;\n      --paper-indigo-a100: #8c9eff;\n      --paper-indigo-a200: #536dfe;\n      --paper-indigo-a400: #3d5afe;\n      --paper-indigo-a700: #304ffe;\n\n      --paper-blue-50: #e3f2fd;\n      --paper-blue-100: #bbdefb;\n      --paper-blue-200: #90caf9;\n      --paper-blue-300: #64b5f6;\n      --paper-blue-400: #42a5f5;\n      --paper-blue-500: #2196f3;\n      --paper-blue-600: #1e88e5;\n      --paper-blue-700: #1976d2;\n      --paper-blue-800: #1565c0;\n      --paper-blue-900: #0d47a1;\n      --paper-blue-a100: #82b1ff;\n      --paper-blue-a200: #448aff;\n      --paper-blue-a400: #2979ff;\n      --paper-blue-a700: #2962ff;\n\n      --paper-light-blue-50: #e1f5fe;\n      --paper-light-blue-100: #b3e5fc;\n      --paper-light-blue-200: #81d4fa;\n      --paper-light-blue-300: #4fc3f7;\n      --paper-light-blue-400: #29b6f6;\n      --paper-light-blue-500: #03a9f4;\n      --paper-light-blue-600: #039be5;\n      --paper-light-blue-700: #0288d1;\n      --paper-light-blue-800: #0277bd;\n      --paper-light-blue-900: #01579b;\n      --paper-light-blue-a100: #80d8ff;\n      --paper-light-blue-a200: #40c4ff;\n      --paper-light-blue-a400: #00b0ff;\n      --paper-light-blue-a700: #0091ea;\n\n      --paper-cyan-50: #e0f7fa;\n      --paper-cyan-100: #b2ebf2;\n      --paper-cyan-200: #80deea;\n      --paper-cyan-300: #4dd0e1;\n      --paper-cyan-400: #26c6da;\n      --paper-cyan-500: #00bcd4;\n      --paper-cyan-600: #00acc1;\n      --paper-cyan-700: #0097a7;\n      --paper-cyan-800: #00838f;\n      --paper-cyan-900: #006064;\n      --paper-cyan-a100: #84ffff;\n      --paper-cyan-a200: #18ffff;\n      --paper-cyan-a400: #00e5ff;\n      --paper-cyan-a700: #00b8d4;\n\n      --paper-teal-50: #e0f2f1;\n      --paper-teal-100: #b2dfdb;\n      --paper-teal-200: #80cbc4;\n      --paper-teal-300: #4db6ac;\n      --paper-teal-400: #26a69a;\n      --paper-teal-500: #009688;\n      --paper-teal-600: #00897b;\n      --paper-teal-700: #00796b;\n      --paper-teal-800: #00695c;\n      --paper-teal-900: #004d40;\n      --paper-teal-a100: #a7ffeb;\n      --paper-teal-a200: #64ffda;\n      --paper-teal-a400: #1de9b6;\n      --paper-teal-a700: #00bfa5;\n\n      --paper-green-50: #e8f5e9;\n      --paper-green-100: #c8e6c9;\n      --paper-green-200: #a5d6a7;\n      --paper-green-300: #81c784;\n      --paper-green-400: #66bb6a;\n      --paper-green-500: #4caf50;\n      --paper-green-600: #43a047;\n      --paper-green-700: #388e3c;\n      --paper-green-800: #2e7d32;\n      --paper-green-900: #1b5e20;\n      --paper-green-a100: #b9f6ca;\n      --paper-green-a200: #69f0ae;\n      --paper-green-a400: #00e676;\n      --paper-green-a700: #00c853;\n\n      --paper-light-green-50: #f1f8e9;\n      --paper-light-green-100: #dcedc8;\n      --paper-light-green-200: #c5e1a5;\n      --paper-light-green-300: #aed581;\n      --paper-light-green-400: #9ccc65;\n      --paper-light-green-500: #8bc34a;\n      --paper-light-green-600: #7cb342;\n      --paper-light-green-700: #689f38;\n      --paper-light-green-800: #558b2f;\n      --paper-light-green-900: #33691e;\n      --paper-light-green-a100: #ccff90;\n      --paper-light-green-a200: #b2ff59;\n      --paper-light-green-a400: #76ff03;\n      --paper-light-green-a700: #64dd17;\n\n      --paper-lime-50: #f9fbe7;\n      --paper-lime-100: #f0f4c3;\n      --paper-lime-200: #e6ee9c;\n      --paper-lime-300: #dce775;\n      --paper-lime-400: #d4e157;\n      --paper-lime-500: #cddc39;\n      --paper-lime-600: #c0ca33;\n      --paper-lime-700: #afb42b;\n      --paper-lime-800: #9e9d24;\n      --paper-lime-900: #827717;\n      --paper-lime-a100: #f4ff81;\n      --paper-lime-a200: #eeff41;\n      --paper-lime-a400: #c6ff00;\n      --paper-lime-a700: #aeea00;\n\n      --paper-yellow-50: #fffde7;\n      --paper-yellow-100: #fff9c4;\n      --paper-yellow-200: #fff59d;\n      --paper-yellow-300: #fff176;\n      --paper-yellow-400: #ffee58;\n      --paper-yellow-500: #ffeb3b;\n      --paper-yellow-600: #fdd835;\n      --paper-yellow-700: #fbc02d;\n      --paper-yellow-800: #f9a825;\n      --paper-yellow-900: #f57f17;\n      --paper-yellow-a100: #ffff8d;\n      --paper-yellow-a200: #ffff00;\n      --paper-yellow-a400: #ffea00;\n      --paper-yellow-a700: #ffd600;\n\n      --paper-amber-50: #fff8e1;\n      --paper-amber-100: #ffecb3;\n      --paper-amber-200: #ffe082;\n      --paper-amber-300: #ffd54f;\n      --paper-amber-400: #ffca28;\n      --paper-amber-500: #ffc107;\n      --paper-amber-600: #ffb300;\n      --paper-amber-700: #ffa000;\n      --paper-amber-800: #ff8f00;\n      --paper-amber-900: #ff6f00;\n      --paper-amber-a100: #ffe57f;\n      --paper-amber-a200: #ffd740;\n      --paper-amber-a400: #ffc400;\n      --paper-amber-a700: #ffab00;\n\n      --paper-orange-50: #fff3e0;\n      --paper-orange-100: #ffe0b2;\n      --paper-orange-200: #ffcc80;\n      --paper-orange-300: #ffb74d;\n      --paper-orange-400: #ffa726;\n      --paper-orange-500: #ff9800;\n      --paper-orange-600: #fb8c00;\n      --paper-orange-700: #f57c00;\n      --paper-orange-800: #ef6c00;\n      --paper-orange-900: #e65100;\n      --paper-orange-a100: #ffd180;\n      --paper-orange-a200: #ffab40;\n      --paper-orange-a400: #ff9100;\n      --paper-orange-a700: #ff6500;\n\n      --paper-deep-orange-50: #fbe9e7;\n      --paper-deep-orange-100: #ffccbc;\n      --paper-deep-orange-200: #ffab91;\n      --paper-deep-orange-300: #ff8a65;\n      --paper-deep-orange-400: #ff7043;\n      --paper-deep-orange-500: #ff5722;\n      --paper-deep-orange-600: #f4511e;\n      --paper-deep-orange-700: #e64a19;\n      --paper-deep-orange-800: #d84315;\n      --paper-deep-orange-900: #bf360c;\n      --paper-deep-orange-a100: #ff9e80;\n      --paper-deep-orange-a200: #ff6e40;\n      --paper-deep-orange-a400: #ff3d00;\n      --paper-deep-orange-a700: #dd2c00;\n\n      --paper-brown-50: #efebe9;\n      --paper-brown-100: #d7ccc8;\n      --paper-brown-200: #bcaaa4;\n      --paper-brown-300: #a1887f;\n      --paper-brown-400: #8d6e63;\n      --paper-brown-500: #795548;\n      --paper-brown-600: #6d4c41;\n      --paper-brown-700: #5d4037;\n      --paper-brown-800: #4e342e;\n      --paper-brown-900: #3e2723;\n\n      --paper-grey-50: #fafafa;\n      --paper-grey-100: #f5f5f5;\n      --paper-grey-200: #eeeeee;\n      --paper-grey-300: #e0e0e0;\n      --paper-grey-400: #bdbdbd;\n      --paper-grey-500: #9e9e9e;\n      --paper-grey-600: #757575;\n      --paper-grey-700: #616161;\n      --paper-grey-800: #424242;\n      --paper-grey-900: #212121;\n\n      --paper-blue-grey-50: #eceff1;\n      --paper-blue-grey-100: #cfd8dc;\n      --paper-blue-grey-200: #b0bec5;\n      --paper-blue-grey-300: #90a4ae;\n      --paper-blue-grey-400: #78909c;\n      --paper-blue-grey-500: #607d8b;\n      --paper-blue-grey-600: #546e7a;\n      --paper-blue-grey-700: #455a64;\n      --paper-blue-grey-800: #37474f;\n      --paper-blue-grey-900: #263238;\n\n      /* opacity for dark text on a light background */\n      --dark-divider-opacity: 0.12;\n      --dark-disabled-opacity: 0.38; /* or hint text or icon */\n      --dark-secondary-opacity: 0.54;\n      --dark-primary-opacity: 0.87;\n\n      /* opacity for light text on a dark background */\n      --light-divider-opacity: 0.12;\n      --light-disabled-opacity: 0.3; /* or hint text or icon */\n      --light-secondary-opacity: 0.7;\n      --light-primary-opacity: 1.0;\n\n    }\n\n  </style>\n</custom-style>';
document.head.appendChild(kj.content);
var lj = document.createElement('template');
lj.setAttribute('style', 'display: none;');
lj.innerHTML = '<custom-style>\n  <style is="custom-style">\n    html {\n      /*\n       * You can use these generic variables in your elements for easy theming.\n       * For example, if all your elements use `--primary-text-color` as its main\n       * color, then switching from a light to a dark theme is just a matter of\n       * changing the value of `--primary-text-color` in your application.\n       */\n      --primary-text-color: var(--light-theme-text-color);\n      --primary-background-color: var(--light-theme-background-color);\n      --secondary-text-color: var(--light-theme-secondary-color);\n      --disabled-text-color: var(--light-theme-disabled-color);\n      --divider-color: var(--light-theme-divider-color);\n      --error-color: var(--paper-deep-orange-a700);\n\n      /*\n       * Primary and accent colors. Also see color.html for more colors.\n       */\n      --primary-color: var(--paper-indigo-500);\n      --light-primary-color: var(--paper-indigo-100);\n      --dark-primary-color: var(--paper-indigo-700);\n\n      --accent-color: var(--paper-pink-a200);\n      --light-accent-color: var(--paper-pink-a100);\n      --dark-accent-color: var(--paper-pink-a400);\n\n\n      /*\n       * Material Design Light background theme\n       */\n      --light-theme-background-color: #ffffff;\n      --light-theme-base-color: #000000;\n      --light-theme-text-color: var(--paper-grey-900);\n      --light-theme-secondary-color: #737373;  /* for secondary text and icons */\n      --light-theme-disabled-color: #9b9b9b;  /* disabled/hint text */\n      --light-theme-divider-color: #dbdbdb;\n\n      /*\n       * Material Design Dark background theme\n       */\n      --dark-theme-background-color: var(--paper-grey-900);\n      --dark-theme-base-color: #ffffff;\n      --dark-theme-text-color: #ffffff;\n      --dark-theme-secondary-color: #bcbcbc;  /* for secondary text and icons */\n      --dark-theme-disabled-color: #646464;  /* disabled/hint text */\n      --dark-theme-divider-color: #3c3c3c;\n\n      /*\n       * Deprecated values because of their confusing names.\n       */\n      --text-primary-color: var(--dark-theme-text-color);\n      --default-primary-color: var(--primary-color);\n    }\n  </style>\n</custom-style>';
document.head.appendChild(lj.content);/*

Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/*

Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var mj = {
  properties: {
    name: { type: String },
    value: { notify: !0, type: String },
    required: { type: Boolean, value: !1 },
  }, attached: function() {
  }, detached: function() {
  },
};
var nj = function(a) {
  nj[' '](a);
  this.type = a && a.type || 'default';
  this.key = a && a.key;
  a && 'value' in a && (this.value = a.value);
};
nj.prototype.byKey = function(a) {
  this.key = a;
  return this.value;
};
x.Object.defineProperties(nj.prototype, {
  value: {
    configurable: !0, enumerable: !0, get: function() {
      var a = this.type, b = this.key;
      if (a && b) return oj[a] && oj[a][b];
    }, set: function(a) {
      var b = this.type, c = this.key;
      b && c && (b = oj[b] = oj[b] || {}, null == a ? delete b[c] : b[c] = a);
    },
  }, list: {
    configurable: !0, enumerable: !0, get: function() {
      var a = this.type;
      if (a) return (a = oj[this.type]) ? Object.keys(a).map(function(b) {
        return oj[this.type][b];
      }, this) : [];
    },
  },
});
nj[' '] = function() {
};
var oj = {};
Y({
  is: 'iron-meta',
  _template: null,
  properties: {
    type: { type: String, value: 'default' },
    key: { type: String },
    value: { type: String, notify: !0 },
    self: { type: Boolean, observer: '_selfChanged' },
    __meta: { type: Boolean, computed: '__computeMeta(type, key, value)' },
  },
  hostAttributes: { hidden: !0 },
  __computeMeta: function(a, b, c) {
    a = new nj({ type: a, key: b });
    void 0 !== c && c !== a.value ? a.value = c : this.value !== a.value && (this.value = a.value);
    return a;
  },
  get list() {
    return this.__meta && this.__meta.list;
  },
  _selfChanged: function(a) {
    a && (this.value = this);
  },
  byKey: function(a) {
    return (new nj({ type: this.type, key: a })).value;
  },
});
var pj = null, qj = {
  properties: {
    validator: { type: String },
    invalid: { notify: !0, reflectToAttribute: !0, type: Boolean, value: !1, observer: '_invalidChanged' },
  }, registered: function() {
    pj = new nj({ type: 'validator' });
  }, _invalidChanged: function() {
    this.invalid ? this.setAttribute('aria-invalid', 'true') : this.removeAttribute('aria-invalid');
  }, get _validator() {
    return pj && pj.byKey(this.validator);
  }, hasValidator: function() {
    return null != this._validator;
  }, validate: function(a) {
    this.invalid = void 0 === a && void 0 !== this.value ? !this._getValidity(this.value) :
      !this._getValidity(a);
    return !this.invalid;
  }, _getValidity: function(a) {
    return this.hasValidator() ? this._validator.validate(a) : !0;
  },
};
var rj = {
  properties: {
    checked: { type: Boolean, value: !1, reflectToAttribute: !0, notify: !0, observer: '_checkedChanged' },
    toggles: { type: Boolean, value: !0, reflectToAttribute: !0 },
    value: { type: String, value: 'on', observer: '_valueChanged' },
  }, observers: ['_requiredChanged(required)'], created: function() {
    this._hasIronCheckedElementBehavior = !0;
  }, _getValidity: function() {
    return this.disabled || !this.required || this.checked;
  }, _requiredChanged: function() {
    this.required ? this.setAttribute('aria-required', 'true') : this.removeAttribute('aria-required');
  },
  _checkedChanged: function() {
    this.active = this.checked;
    this.fire('iron-change');
  }, _valueChanged: function() {
    if (void 0 === this.value || null === this.value) this.value = 'on';
  },
}, sj = [mj, qj, rj];
var tj = {
  properties: {
    focused: { type: Boolean, value: !1, notify: !0, readOnly: !0, reflectToAttribute: !0 },
    disabled: { type: Boolean, value: !1, notify: !0, observer: '_disabledChanged', reflectToAttribute: !0 },
    _oldTabIndex: { type: String },
    _boundFocusBlurHandler: {
      type: Function, value: function() {
        return this._focusBlurHandler.bind(this);
      },
    },
  }, observers: ['_changedControlState(focused, disabled)'], ready: function() {
    this.addEventListener('focus', this._boundFocusBlurHandler, !0);
    this.addEventListener('blur', this._boundFocusBlurHandler,
      !0);
  }, _focusBlurHandler: function(a) {
    this._setFocused('focus' === a.type);
  }, _disabledChanged: function(a) {
    this.setAttribute('aria-disabled', a ? 'true' : 'false');
    this.style.pointerEvents = a ? 'none' : '';
    a ? (this._oldTabIndex = this.getAttribute('tabindex'), this._setFocused(!1), this.tabIndex = -1, this.blur()) : void 0 !== this._oldTabIndex && (null === this._oldTabIndex ? this.removeAttribute('tabindex') : this.setAttribute('tabindex', this._oldTabIndex));
  }, _changedControlState: function() {
    this._controlStateChanged && this._controlStateChanged();
  },
};
var uj = {
  properties: {
    pressed: {
      type: Boolean,
      readOnly: !0,
      value: !1,
      reflectToAttribute: !0,
      observer: '_pressedChanged',
    },
    toggles: { type: Boolean, value: !1, reflectToAttribute: !0 },
    active: { type: Boolean, value: !1, notify: !0, reflectToAttribute: !0 },
    pointerDown: { type: Boolean, readOnly: !0, value: !1 },
    receivedFocusFromKeyboard: { type: Boolean, readOnly: !0 },
    ariaActiveAttribute: { type: String, value: 'aria-pressed', observer: '_ariaActiveAttributeChanged' },
  },
  listeners: { down: '_downHandler', up: '_upHandler', tap: '_tapHandler' },
  observers: ['_focusChanged(focused)',
    '_activeChanged(active, ariaActiveAttribute)'],
  keyBindings: {
    'enter:keydown': '_asyncClick',
    'space:keydown': '_spaceKeyDownHandler',
    'space:keyup': '_spaceKeyUpHandler',
  },
  _mouseEventRe: /^mouse/,
  _tapHandler: function() {
    this.toggles ? this._userActivate(!this.active) : this.active = !1;
  },
  _focusChanged: function(a) {
    this._detectKeyboardFocus(a);
    a || this._setPressed(!1);
  },
  _detectKeyboardFocus: function(a) {
    this._setReceivedFocusFromKeyboard(!this.pointerDown && a);
  },
  _userActivate: function(a) {
    this.active !== a && (this.active = a,
      this.fire('change'));
  },
  _downHandler: function() {
    this._setPointerDown(!0);
    this._setPressed(!0);
    this._setReceivedFocusFromKeyboard(!1);
  },
  _upHandler: function() {
    this._setPointerDown(!1);
    this._setPressed(!1);
  },
  _spaceKeyDownHandler: function(a) {
    a = a.detail.keyboardEvent;
    var b = W(a).localTarget;
    this.isLightDescendant(b) || (a.preventDefault(), a.stopImmediatePropagation(), this._setPressed(!0));
  },
  _spaceKeyUpHandler: function(a) {
    a = a.detail.keyboardEvent;
    a = W(a).localTarget;
    this.isLightDescendant(a) || (this.pressed && this._asyncClick(),
      this._setPressed(!1));
  },
  _asyncClick: function() {
    this.async(function() {
      this.click();
    }, 1);
  },
  _pressedChanged: function() {
    this._changedButtonState();
  },
  _ariaActiveAttributeChanged: function(a, b) {
    b && b != a && this.hasAttribute(b) && this.removeAttribute(b);
  },
  _activeChanged: function(a) {
    this.toggles ? this.setAttribute(this.ariaActiveAttribute, a ? 'true' : 'false') : this.removeAttribute(this.ariaActiveAttribute);
    this._changedButtonState();
  },
  _controlStateChanged: function() {
    this.disabled ? this._setPressed(!1) : this._changedButtonState();
  },
  _changedButtonState: function() {
    this._buttonStateChanged && this._buttonStateChanged();
  },
}, vj = [Xd, uj];/*

Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var wj = ['\n    <style>\n      :host {\n        display: block;\n        position: absolute;\n        border-radius: inherit;\n        overflow: hidden;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n\n        /* See PolymerElements/paper-behaviors/issues/34. On non-Chrome browsers,\n         * creating a node (with a position:absolute) in the middle of an event\n         * handler "interrupts" that event handler (which happens when the\n         * ripple is created on demand) */\n        pointer-events: none;\n      }\n\n      :host([animating]) {\n        /* This resolves a rendering issue in Chrome (as of 40) where the\n           ripple is not properly clipped by its parent (which may have\n           rounded corners). See: http://jsbin.com/temexa/4\n\n           Note: We only apply this style conditionally. Otherwise, the browser\n           will create a new compositing layer for every ripple element on the\n           page, and that would be bad. */\n        -webkit-transform: translate(0, 0);\n        transform: translate3d(0, 0, 0);\n      }\n\n      #background,\n      #waves,\n      .wave-container,\n      .wave {\n        pointer-events: none;\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n      }\n\n      #background,\n      .wave {\n        opacity: 0;\n      }\n\n      #waves,\n      .wave {\n        overflow: hidden;\n      }\n\n      .wave-container,\n      .wave {\n        border-radius: 50%;\n      }\n\n      :host(.circle) #background,\n      :host(.circle) #waves {\n        border-radius: 50%;\n      }\n\n      :host(.circle) .wave-container {\n        overflow: hidden;\n      }\n    </style>\n\n    <div id="background"></div>\n    <div id="waves"></div>\n'];
wj.raw = wj.slice();
var xj = function(a, b, c, d) {
  a -= c;
  b -= d;
  return Math.sqrt(a * a + b * b);
}, yj = window.performance && window.performance.now ? window.performance.now.bind(window.performance) : Date.now;

function zj(a) {
  this.element = a;
  this.width = this.boundingRect.width;
  this.height = this.boundingRect.height;
  this.size = Math.max(this.width, this.height);
}

zj.prototype = {
  get boundingRect() {
    return this.element.getBoundingClientRect();
  }, furthestCornerDistanceFrom: function(a, b) {
    var c = xj(a, b, 0, 0), d = xj(a, b, this.width, 0), e = xj(a, b, 0, this.height);
    a = xj(a, b, this.width, this.height);
    return Math.max(c, d, e, a);
  },
};

function Aj(a) {
  this.element = a;
  this.color = window.getComputedStyle(a).color;
  this.wave = document.createElement('div');
  this.waveContainer = document.createElement('div');
  this.wave.style.backgroundColor = this.color;
  this.wave.classList.add('wave');
  this.waveContainer.classList.add('wave-container');
  W(this.waveContainer).appendChild(this.wave);
  this.resetInteractionState();
}

Aj.prototype = {
  get recenters() {
    return this.element.recenters;
  }, get center() {
    return this.element.center;
  }, get mouseDownElapsed() {
    if (!this.mouseDownStart) return 0;
    var a = yj() - this.mouseDownStart;
    this.mouseUpStart && (a -= this.mouseUpElapsed);
    return a;
  }, get mouseUpElapsed() {
    return this.mouseUpStart ? yj() - this.mouseUpStart : 0;
  }, get mouseDownElapsedSeconds() {
    return this.mouseDownElapsed / 1E3;
  }, get mouseUpElapsedSeconds() {
    return this.mouseUpElapsed / 1E3;
  }, get mouseInteractionSeconds() {
    return this.mouseDownElapsedSeconds +
      this.mouseUpElapsedSeconds;
  }, get initialOpacity() {
    return this.element.initialOpacity;
  }, get opacityDecayVelocity() {
    return this.element.opacityDecayVelocity;
  }, get radius() {
    var a = this.containerMetrics.width * this.containerMetrics.width,
      b = this.containerMetrics.height * this.containerMetrics.height;
    a = 1.1 * Math.min(Math.sqrt(a + b), 300) + 5;
    b = 1.1 - a / 300 * .2;
    b = this.mouseInteractionSeconds / b;
    a *= 1 - Math.pow(80, -b);
    return Math.abs(a);
  }, get opacity() {
    return this.mouseUpStart ? Math.max(0, this.initialOpacity - this.mouseUpElapsedSeconds *
      this.opacityDecayVelocity) : this.initialOpacity;
  }, get outerOpacity() {
    var a = .3 * this.mouseUpElapsedSeconds, b = this.opacity;
    return Math.max(0, Math.min(a, b));
  }, get isOpacityFullyDecayed() {
    return .01 > this.opacity && this.radius >= Math.min(this.maxRadius, 300);
  }, get isRestingAtMaxRadius() {
    return this.opacity >= this.initialOpacity && this.radius >= Math.min(this.maxRadius, 300);
  }, get isAnimationComplete() {
    return this.mouseUpStart ? this.isOpacityFullyDecayed : this.isRestingAtMaxRadius;
  }, get translationFraction() {
    return Math.min(1,
      this.radius / this.containerMetrics.size * 2 / Math.sqrt(2));
  }, get xNow() {
    return this.xEnd ? this.xStart + this.translationFraction * (this.xEnd - this.xStart) : this.xStart;
  }, get yNow() {
    return this.yEnd ? this.yStart + this.translationFraction * (this.yEnd - this.yStart) : this.yStart;
  }, get isMouseDown() {
    return this.mouseDownStart && !this.mouseUpStart;
  }, resetInteractionState: function() {
    this.slideDistance = this.yEnd = this.xEnd = this.yStart = this.xStart = this.mouseUpStart = this.mouseDownStart = this.maxRadius = 0;
    this.containerMetrics = new zj(this.element);
  },
  draw: function() {
    this.wave.style.opacity = this.opacity;
    var a = this.radius / (this.containerMetrics.size / 2);
    var b = this.xNow - this.containerMetrics.width / 2;
    var c = this.yNow - this.containerMetrics.height / 2;
    this.waveContainer.style.webkitTransform = 'translate(' + b + 'px, ' + c + 'px)';
    this.waveContainer.style.transform = 'translate3d(' + b + 'px, ' + c + 'px, 0)';
    this.wave.style.webkitTransform = 'scale(' + a + ',' + a + ')';
    this.wave.style.transform = 'scale3d(' + a + ',' + a + ',1)';
  }, downAction: function(a) {
    var b = this.containerMetrics.width / 2, c =
      this.containerMetrics.height / 2;
    this.resetInteractionState();
    this.mouseDownStart = yj();
    this.center ? (this.xStart = b, this.yStart = c, this.slideDistance = xj(this.xStart, this.yStart, this.xEnd, this.yEnd)) : (this.xStart = a ? a.detail.x - this.containerMetrics.boundingRect.left : this.containerMetrics.width / 2, this.yStart = a ? a.detail.y - this.containerMetrics.boundingRect.top : this.containerMetrics.height / 2);
    this.recenters && (this.xEnd = b, this.yEnd = c, this.slideDistance = xj(this.xStart, this.yStart, this.xEnd, this.yEnd));
    this.maxRadius =
      this.containerMetrics.furthestCornerDistanceFrom(this.xStart, this.yStart);
    this.waveContainer.style.top = (this.containerMetrics.height - this.containerMetrics.size) / 2 + 'px';
    this.waveContainer.style.left = (this.containerMetrics.width - this.containerMetrics.size) / 2 + 'px';
    this.waveContainer.style.width = this.containerMetrics.size + 'px';
    this.waveContainer.style.height = this.containerMetrics.size + 'px';
  }, upAction: function() {
    this.isMouseDown && (this.mouseUpStart = yj());
  }, remove: function() {
    W(this.waveContainer.parentNode).removeChild(this.waveContainer);
  },
};
Y({
  _template: S(wj),
  is: 'paper-ripple',
  behaviors: [Xd],
  properties: {
    initialOpacity: { type: Number, value: .25 },
    opacityDecayVelocity: { type: Number, value: .8 },
    recenters: { type: Boolean, value: !1 },
    center: { type: Boolean, value: !1 },
    ripples: {
      type: Array, value: function() {
        return [];
      },
    },
    animating: { type: Boolean, readOnly: !0, reflectToAttribute: !0, value: !1 },
    holdDown: { type: Boolean, value: !1, observer: '_holdDownChanged' },
    noink: { type: Boolean, value: !1 },
    _animating: { type: Boolean },
    _boundAnimate: {
      type: Function, value: function() {
        return this.animate.bind(this);
      },
    },
  },
  get target() {
    return this.keyEventTarget;
  },
  keyBindings: {
    'enter:keydown': '_onEnterKeydown',
    'space:keydown': '_onSpaceKeydown',
    'space:keyup': '_onSpaceKeyup',
  },
  attached: function() {
    var a = this.keyEventTarget = 11 == this.parentNode.nodeType ? W(this).getOwnerRoot().host : this.parentNode;
    this.listen(a, 'up', 'uiUpAction');
    this.listen(a, 'down', 'uiDownAction');
  },
  detached: function() {
    this.unlisten(this.keyEventTarget, 'up', 'uiUpAction');
    this.unlisten(this.keyEventTarget, 'down', 'uiDownAction');
    this.keyEventTarget = null;
  },
  get shouldKeepAnimating() {
    for (var a =
      0; a < this.ripples.length; ++a) if (!this.ripples[a].isAnimationComplete) return !0;
    return !1;
  },
  simulatedRipple: function() {
    this.downAction(null);
    this.async(function() {
      this.upAction();
    }, 1);
  },
  uiDownAction: function(a) {
    this.noink || this.downAction(a);
  },
  downAction: function(a) {
    if (!(this.holdDown && 0 < this.ripples.length)) {
      var b = this.addRipple();
      b.downAction(a);
      this._animating || (this._animating = !0, this.animate());
    }
  },
  uiUpAction: function(a) {
    this.noink || this.upAction(a);
  },
  upAction: function(a) {
    this.holdDown || (this.ripples.forEach(function(b) {
      b.upAction(a);
    }),
      this._animating = !0, this.animate());
  },
  onAnimationComplete: function() {
    this._animating = !1;
    this.$.background.style.backgroundColor = null;
    this.fire('transitionend');
  },
  addRipple: function() {
    var a = new Aj(this);
    W(this.$.waves).appendChild(a.waveContainer);
    this.$.background.style.backgroundColor = a.color;
    this.ripples.push(a);
    this._setAnimating(!0);
    return a;
  },
  removeRipple: function(a) {
    var b = this.ripples.indexOf(a);
    0 > b || (this.ripples.splice(b, 1), a.remove(), this.ripples.length || this._setAnimating(!1));
  },
  animate: function() {
    if (this._animating) {
      var a;
      for (a = 0; a < this.ripples.length; ++a) {
        var b = this.ripples[a];
        b.draw();
        this.$.background.style.opacity = b.outerOpacity;
        b.isOpacityFullyDecayed && !b.isRestingAtMaxRadius && this.removeRipple(b);
      }
      if (this.shouldKeepAnimating || 0 !== this.ripples.length) window.requestAnimationFrame(this._boundAnimate); else this.onAnimationComplete();
    }
  },
  _onEnterKeydown: function() {
    this.uiDownAction();
    this.async(this.uiUpAction, 1);
  },
  _onSpaceKeydown: function() {
    this.uiDownAction();
  },
  _onSpaceKeyup: function() {
    this.uiUpAction();
  },
  _holdDownChanged: function(a,
                             b) {
    void 0 !== b && (a ? this.downAction() : this.upAction());
  },
});
var Bj = {
  properties: { noink: { type: Boolean, observer: '_noinkChanged' }, _rippleContainer: { type: Object } },
  _buttonStateChanged: function() {
    this.focused && this.ensureRipple();
  },
  _downHandler: function(a) {
    uj._downHandler.call(this, a);
    this.pressed && this.ensureRipple(a);
  },
  ensureRipple: function(a) {
    if (!this.hasRipple()) {
      this._ripple = this._createRipple();
      this._ripple.noink = this.noink;
      var b = this._rippleContainer || this.root;
      b && W(b).appendChild(this._ripple);
      if (a) {
        b = W(this._rippleContainer || this);
        var c = W(a).rootTarget;
        b.deepContains(c) &&
        this._ripple.uiDownAction(a);
      }
    }
  },
  getRipple: function() {
    this.ensureRipple();
    return this._ripple;
  },
  hasRipple: function() {
    return !!this._ripple;
  },
  _createRipple: function() {
    var a = document.createElement('paper-ripple');
    return a;
  },
  _noinkChanged: function(a) {
    this.hasRipple() && (this._ripple.noink = a);
  },
};
var Cj = {
  observers: ['_focusedChanged(receivedFocusFromKeyboard)'], _focusedChanged: function(a) {
    a && this.ensureRipple();
    this.hasRipple() && (this._ripple.holdDown = a);
  }, _createRipple: function() {
    var a = Bj._createRipple();
    a.id = 'ink';
    a.setAttribute('center', '');
    a.classList.add('circle');
    return a;
  },
}, Dj = [vj, tj, Bj, Cj];
var Ej = {
  _checkedChanged: function() {
    rj._checkedChanged.call(this);
    this.hasRipple() && (this.checked ? this._ripple.setAttribute('checked', '') : this._ripple.removeAttribute('checked'));
  }, _buttonStateChanged: function() {
    Bj._buttonStateChanged.call(this);
    !this.disabled && this.isAttached && (this.checked = this.active);
  },
}, Fj = [Dj, sj, Ej];/*

Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var Gj = ['<style>\n  :host {\n    display: inline-block;\n    white-space: nowrap;\n    cursor: pointer;\n    --calculated-paper-checkbox-size: var(--paper-checkbox-size, 18px);\n    /* -1px is a sentinel for the default and is replaced in `attached`. */\n    --calculated-paper-checkbox-ink-size: var(--paper-checkbox-ink-size, -1px);\n    @apply --paper-font-common-base;\n    line-height: 0;\n    -webkit-tap-highlight-color: transparent;\n  }\n\n  :host([hidden]) {\n    display: none !important;\n  }\n\n  :host(:focus) {\n    outline: none;\n  }\n\n  .hidden {\n    display: none;\n  }\n\n  #checkboxContainer {\n    display: inline-block;\n    position: relative;\n    width: var(--calculated-paper-checkbox-size);\n    height: var(--calculated-paper-checkbox-size);\n    min-width: var(--calculated-paper-checkbox-size);\n    margin: var(--paper-checkbox-margin, initial);\n    vertical-align: var(--paper-checkbox-vertical-align, middle);\n    background-color: var(--paper-checkbox-unchecked-background-color, transparent);\n  }\n\n  #ink {\n    position: absolute;\n\n    /* Center the ripple in the checkbox by negative offsetting it by\n     * (inkWidth - rippleWidth) / 2 */\n    top: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);\n    left: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);\n    width: var(--calculated-paper-checkbox-ink-size);\n    height: var(--calculated-paper-checkbox-ink-size);\n    color: var(--paper-checkbox-unchecked-ink-color, var(--primary-text-color));\n    opacity: 0.6;\n    pointer-events: none;\n  }\n\n  #ink:dir(rtl) {\n    right: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);\n    left: auto;\n  }\n\n  #ink[checked] {\n    color: var(--paper-checkbox-checked-ink-color, var(--primary-color));\n  }\n\n  #checkbox {\n    position: relative;\n    box-sizing: border-box;\n    height: 100%;\n    border: solid 2px;\n    border-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));\n    border-radius: 2px;\n    pointer-events: none;\n    -webkit-transition: background-color 140ms, border-color 140ms;\n    transition: background-color 140ms, border-color 140ms;\n\n    -webkit-transition-duration: var(--paper-checkbox-animation-duration, 140ms);\n    transition-duration: var(--paper-checkbox-animation-duration, 140ms);\n  }\n\n  /* checkbox checked animations */\n  #checkbox.checked #checkmark {\n    -webkit-animation: checkmark-expand 140ms ease-out forwards;\n    animation: checkmark-expand 140ms ease-out forwards;\n\n    -webkit-animation-duration: var(--paper-checkbox-animation-duration, 140ms);\n    animation-duration: var(--paper-checkbox-animation-duration, 140ms);\n  }\n\n  @-webkit-keyframes checkmark-expand {\n    0% {\n      -webkit-transform: scale(0, 0) rotate(45deg);\n    }\n    100% {\n      -webkit-transform: scale(1, 1) rotate(45deg);\n    }\n  }\n\n  @keyframes checkmark-expand {\n    0% {\n      transform: scale(0, 0) rotate(45deg);\n    }\n    100% {\n      transform: scale(1, 1) rotate(45deg);\n    }\n  }\n\n  #checkbox.checked {\n    background-color: var(--paper-checkbox-checked-color, var(--primary-color));\n    border-color: var(--paper-checkbox-checked-color, var(--primary-color));\n  }\n\n  #checkmark {\n    position: absolute;\n    width: 36%;\n    height: 70%;\n    border-style: solid;\n    border-top: none;\n    border-left: none;\n    border-right-width: calc(2/15 * var(--calculated-paper-checkbox-size));\n    border-bottom-width: calc(2/15 * var(--calculated-paper-checkbox-size));\n    border-color: var(--paper-checkbox-checkmark-color, white);\n    -webkit-transform-origin: 97% 86%;\n    transform-origin: 97% 86%;\n    box-sizing: content-box; /* protect against page-level box-sizing */\n  }\n\n  #checkmark:dir(rtl) {\n    -webkit-transform-origin: 50% 14%;\n    transform-origin: 50% 14%;\n  }\n\n  /* label */\n  #checkboxLabel {\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n    padding-left: var(--paper-checkbox-label-spacing, 8px);\n    white-space: normal;\n    line-height: normal;\n    color: var(--paper-checkbox-label-color, var(--primary-text-color));\n    @apply --paper-checkbox-label;\n  }\n\n  :host([checked]) #checkboxLabel {\n    color: var(--paper-checkbox-label-checked-color, var(--paper-checkbox-label-color, var(--primary-text-color)));\n    @apply --paper-checkbox-label-checked;\n  }\n\n  #checkboxLabel:dir(rtl) {\n    padding-right: var(--paper-checkbox-label-spacing, 8px);\n    padding-left: 0;\n  }\n\n  #checkboxLabel[hidden] {\n    display: none;\n  }\n\n  /* disabled state */\n\n  :host([disabled]) #checkbox {\n    opacity: 0.5;\n    border-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));\n  }\n\n  :host([disabled][checked]) #checkbox {\n    background-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));\n    opacity: 0.5;\n  }\n\n  :host([disabled]) #checkboxLabel  {\n    opacity: 0.65;\n  }\n\n  /* invalid state */\n  #checkbox.invalid:not(.checked) {\n    border-color: var(--paper-checkbox-error-color, var(--error-color));\n  }\n</style>\n\n<div id="checkboxContainer">\n  <div id="checkbox" class$="[[_computeCheckboxClass(checked, invalid)]]">\n    <div id="checkmark" class$="[[_computeCheckmarkClass(checked)]]"></div>\n  </div>\n</div>\n\n<div id="checkboxLabel"><slot></slot></div>'];
Gj.raw = ['<style>\n  :host {\n    display: inline-block;\n    white-space: nowrap;\n    cursor: pointer;\n    --calculated-paper-checkbox-size: var(--paper-checkbox-size, 18px);\n    /* -1px is a sentinel for the default and is replaced in \\`attached\\`. */\n    --calculated-paper-checkbox-ink-size: var(--paper-checkbox-ink-size, -1px);\n    @apply --paper-font-common-base;\n    line-height: 0;\n    -webkit-tap-highlight-color: transparent;\n  }\n\n  :host([hidden]) {\n    display: none !important;\n  }\n\n  :host(:focus) {\n    outline: none;\n  }\n\n  .hidden {\n    display: none;\n  }\n\n  #checkboxContainer {\n    display: inline-block;\n    position: relative;\n    width: var(--calculated-paper-checkbox-size);\n    height: var(--calculated-paper-checkbox-size);\n    min-width: var(--calculated-paper-checkbox-size);\n    margin: var(--paper-checkbox-margin, initial);\n    vertical-align: var(--paper-checkbox-vertical-align, middle);\n    background-color: var(--paper-checkbox-unchecked-background-color, transparent);\n  }\n\n  #ink {\n    position: absolute;\n\n    /* Center the ripple in the checkbox by negative offsetting it by\n     * (inkWidth - rippleWidth) / 2 */\n    top: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);\n    left: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);\n    width: var(--calculated-paper-checkbox-ink-size);\n    height: var(--calculated-paper-checkbox-ink-size);\n    color: var(--paper-checkbox-unchecked-ink-color, var(--primary-text-color));\n    opacity: 0.6;\n    pointer-events: none;\n  }\n\n  #ink:dir(rtl) {\n    right: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);\n    left: auto;\n  }\n\n  #ink[checked] {\n    color: var(--paper-checkbox-checked-ink-color, var(--primary-color));\n  }\n\n  #checkbox {\n    position: relative;\n    box-sizing: border-box;\n    height: 100%;\n    border: solid 2px;\n    border-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));\n    border-radius: 2px;\n    pointer-events: none;\n    -webkit-transition: background-color 140ms, border-color 140ms;\n    transition: background-color 140ms, border-color 140ms;\n\n    -webkit-transition-duration: var(--paper-checkbox-animation-duration, 140ms);\n    transition-duration: var(--paper-checkbox-animation-duration, 140ms);\n  }\n\n  /* checkbox checked animations */\n  #checkbox.checked #checkmark {\n    -webkit-animation: checkmark-expand 140ms ease-out forwards;\n    animation: checkmark-expand 140ms ease-out forwards;\n\n    -webkit-animation-duration: var(--paper-checkbox-animation-duration, 140ms);\n    animation-duration: var(--paper-checkbox-animation-duration, 140ms);\n  }\n\n  @-webkit-keyframes checkmark-expand {\n    0% {\n      -webkit-transform: scale(0, 0) rotate(45deg);\n    }\n    100% {\n      -webkit-transform: scale(1, 1) rotate(45deg);\n    }\n  }\n\n  @keyframes checkmark-expand {\n    0% {\n      transform: scale(0, 0) rotate(45deg);\n    }\n    100% {\n      transform: scale(1, 1) rotate(45deg);\n    }\n  }\n\n  #checkbox.checked {\n    background-color: var(--paper-checkbox-checked-color, var(--primary-color));\n    border-color: var(--paper-checkbox-checked-color, var(--primary-color));\n  }\n\n  #checkmark {\n    position: absolute;\n    width: 36%;\n    height: 70%;\n    border-style: solid;\n    border-top: none;\n    border-left: none;\n    border-right-width: calc(2/15 * var(--calculated-paper-checkbox-size));\n    border-bottom-width: calc(2/15 * var(--calculated-paper-checkbox-size));\n    border-color: var(--paper-checkbox-checkmark-color, white);\n    -webkit-transform-origin: 97% 86%;\n    transform-origin: 97% 86%;\n    box-sizing: content-box; /* protect against page-level box-sizing */\n  }\n\n  #checkmark:dir(rtl) {\n    -webkit-transform-origin: 50% 14%;\n    transform-origin: 50% 14%;\n  }\n\n  /* label */\n  #checkboxLabel {\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n    padding-left: var(--paper-checkbox-label-spacing, 8px);\n    white-space: normal;\n    line-height: normal;\n    color: var(--paper-checkbox-label-color, var(--primary-text-color));\n    @apply --paper-checkbox-label;\n  }\n\n  :host([checked]) #checkboxLabel {\n    color: var(--paper-checkbox-label-checked-color, var(--paper-checkbox-label-color, var(--primary-text-color)));\n    @apply --paper-checkbox-label-checked;\n  }\n\n  #checkboxLabel:dir(rtl) {\n    padding-right: var(--paper-checkbox-label-spacing, 8px);\n    padding-left: 0;\n  }\n\n  #checkboxLabel[hidden] {\n    display: none;\n  }\n\n  /* disabled state */\n\n  :host([disabled]) #checkbox {\n    opacity: 0.5;\n    border-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));\n  }\n\n  :host([disabled][checked]) #checkbox {\n    background-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));\n    opacity: 0.5;\n  }\n\n  :host([disabled]) #checkboxLabel  {\n    opacity: 0.65;\n  }\n\n  /* invalid state */\n  #checkbox.invalid:not(.checked) {\n    border-color: var(--paper-checkbox-error-color, var(--error-color));\n  }\n</style>\n\n<div id="checkboxContainer">\n  <div id="checkbox" class$="[[_computeCheckboxClass(checked, invalid)]]">\n    <div id="checkmark" class$="[[_computeCheckmarkClass(checked)]]"></div>\n  </div>\n</div>\n\n<div id="checkboxLabel"><slot></slot></div>'];
Y({
  _template: S(Gj),
  is: 'paper-checkbox',
  behaviors: [Fj],
  hostAttributes: { role: 'checkbox', 'aria-checked': !1, tabindex: 0 },
  properties: { ariaActiveAttribute: { type: String, value: 'aria-checked' } },
  attached: function() {
    ki(this, function() {
      var a = this.getComputedStyleValue('--calculated-paper-checkbox-ink-size').trim();
      if ('-1px' === a) {
        var b = this.getComputedStyleValue('--calculated-paper-checkbox-size').trim();
        a = 'px';
        var c = b.match(/[A-Za-z]+$/);
        null !== c && (a = c[0]);
        b = parseFloat(b);
        c = 8 / 3 * b;
        'px' === a && (c = Math.floor(c), c %
        2 !== b % 2 && c++);
        this.updateStyles({ '--paper-checkbox-ink-size': c + a });
      }
    });
  },
  _computeCheckboxClass: function(a, b) {
    var c = '';
    a && (c += 'checked ');
    b && (c += 'invalid');
    return c;
  },
  _computeCheckmarkClass: function(a) {
    return a ? '' : 'hidden';
  },
  _createRipple: function() {
    this._rippleContainer = this.$.checkboxContainer;
    return Cj._createRipple.call(this);
  },
  registered: function() {
    this._template.setAttribute('strip-whitespace', '');
  },
});
var Hj = ['\n<custom-style>\n  <style is="custom-style">\n    [hidden] {\n      display: none !important;\n    }\n  </style>\n</custom-style>\n<custom-style>\n  <style is="custom-style">\n    html {\n\n      --layout: {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n      };\n\n      --layout-inline: {\n        display: -ms-inline-flexbox;\n        display: -webkit-inline-flex;\n        display: inline-flex;\n      };\n\n      --layout-horizontal: {\n        @apply --layout;\n\n        -ms-flex-direction: row;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n      };\n\n      --layout-horizontal-reverse: {\n        @apply --layout;\n\n        -ms-flex-direction: row-reverse;\n        -webkit-flex-direction: row-reverse;\n        flex-direction: row-reverse;\n      };\n\n      --layout-vertical: {\n        @apply --layout;\n\n        -ms-flex-direction: column;\n        -webkit-flex-direction: column;\n        flex-direction: column;\n      };\n\n      --layout-vertical-reverse: {\n        @apply --layout;\n\n        -ms-flex-direction: column-reverse;\n        -webkit-flex-direction: column-reverse;\n        flex-direction: column-reverse;\n      };\n\n      --layout-wrap: {\n        -ms-flex-wrap: wrap;\n        -webkit-flex-wrap: wrap;\n        flex-wrap: wrap;\n      };\n\n      --layout-wrap-reverse: {\n        -ms-flex-wrap: wrap-reverse;\n        -webkit-flex-wrap: wrap-reverse;\n        flex-wrap: wrap-reverse;\n      };\n\n      --layout-flex-auto: {\n        -ms-flex: 1 1 auto;\n        -webkit-flex: 1 1 auto;\n        flex: 1 1 auto;\n      };\n\n      --layout-flex-none: {\n        -ms-flex: none;\n        -webkit-flex: none;\n        flex: none;\n      };\n\n      --layout-flex: {\n        -ms-flex: 1 1 0.000000001px;\n        -webkit-flex: 1;\n        flex: 1;\n        -webkit-flex-basis: 0.000000001px;\n        flex-basis: 0.000000001px;\n      };\n\n      --layout-flex-2: {\n        -ms-flex: 2;\n        -webkit-flex: 2;\n        flex: 2;\n      };\n\n      --layout-flex-3: {\n        -ms-flex: 3;\n        -webkit-flex: 3;\n        flex: 3;\n      };\n\n      --layout-flex-4: {\n        -ms-flex: 4;\n        -webkit-flex: 4;\n        flex: 4;\n      };\n\n      --layout-flex-5: {\n        -ms-flex: 5;\n        -webkit-flex: 5;\n        flex: 5;\n      };\n\n      --layout-flex-6: {\n        -ms-flex: 6;\n        -webkit-flex: 6;\n        flex: 6;\n      };\n\n      --layout-flex-7: {\n        -ms-flex: 7;\n        -webkit-flex: 7;\n        flex: 7;\n      };\n\n      --layout-flex-8: {\n        -ms-flex: 8;\n        -webkit-flex: 8;\n        flex: 8;\n      };\n\n      --layout-flex-9: {\n        -ms-flex: 9;\n        -webkit-flex: 9;\n        flex: 9;\n      };\n\n      --layout-flex-10: {\n        -ms-flex: 10;\n        -webkit-flex: 10;\n        flex: 10;\n      };\n\n      --layout-flex-11: {\n        -ms-flex: 11;\n        -webkit-flex: 11;\n        flex: 11;\n      };\n\n      --layout-flex-12: {\n        -ms-flex: 12;\n        -webkit-flex: 12;\n        flex: 12;\n      };\n\n      /* alignment in cross axis */\n\n      --layout-start: {\n        -ms-flex-align: start;\n        -webkit-align-items: flex-start;\n        align-items: flex-start;\n      };\n\n      --layout-center: {\n        -ms-flex-align: center;\n        -webkit-align-items: center;\n        align-items: center;\n      };\n\n      --layout-end: {\n        -ms-flex-align: end;\n        -webkit-align-items: flex-end;\n        align-items: flex-end;\n      };\n\n      --layout-baseline: {\n        -ms-flex-align: baseline;\n        -webkit-align-items: baseline;\n        align-items: baseline;\n      };\n\n      /* alignment in main axis */\n\n      --layout-start-justified: {\n        -ms-flex-pack: start;\n        -webkit-justify-content: flex-start;\n        justify-content: flex-start;\n      };\n\n      --layout-center-justified: {\n        -ms-flex-pack: center;\n        -webkit-justify-content: center;\n        justify-content: center;\n      };\n\n      --layout-end-justified: {\n        -ms-flex-pack: end;\n        -webkit-justify-content: flex-end;\n        justify-content: flex-end;\n      };\n\n      --layout-around-justified: {\n        -ms-flex-pack: distribute;\n        -webkit-justify-content: space-around;\n        justify-content: space-around;\n      };\n\n      --layout-justified: {\n        -ms-flex-pack: justify;\n        -webkit-justify-content: space-between;\n        justify-content: space-between;\n      };\n\n      --layout-center-center: {\n        @apply --layout-center;\n        @apply --layout-center-justified;\n      };\n\n      /* self alignment */\n\n      --layout-self-start: {\n        -ms-align-self: flex-start;\n        -webkit-align-self: flex-start;\n        align-self: flex-start;\n      };\n\n      --layout-self-center: {\n        -ms-align-self: center;\n        -webkit-align-self: center;\n        align-self: center;\n      };\n\n      --layout-self-end: {\n        -ms-align-self: flex-end;\n        -webkit-align-self: flex-end;\n        align-self: flex-end;\n      };\n\n      --layout-self-stretch: {\n        -ms-align-self: stretch;\n        -webkit-align-self: stretch;\n        align-self: stretch;\n      };\n\n      --layout-self-baseline: {\n        -ms-align-self: baseline;\n        -webkit-align-self: baseline;\n        align-self: baseline;\n      };\n\n      /* multi-line alignment in main axis */\n\n      --layout-start-aligned: {\n        -ms-flex-line-pack: start;  /* IE10 */\n        -ms-align-content: flex-start;\n        -webkit-align-content: flex-start;\n        align-content: flex-start;\n      };\n\n      --layout-end-aligned: {\n        -ms-flex-line-pack: end;  /* IE10 */\n        -ms-align-content: flex-end;\n        -webkit-align-content: flex-end;\n        align-content: flex-end;\n      };\n\n      --layout-center-aligned: {\n        -ms-flex-line-pack: center;  /* IE10 */\n        -ms-align-content: center;\n        -webkit-align-content: center;\n        align-content: center;\n      };\n\n      --layout-between-aligned: {\n        -ms-flex-line-pack: justify;  /* IE10 */\n        -ms-align-content: space-between;\n        -webkit-align-content: space-between;\n        align-content: space-between;\n      };\n\n      --layout-around-aligned: {\n        -ms-flex-line-pack: distribute;  /* IE10 */\n        -ms-align-content: space-around;\n        -webkit-align-content: space-around;\n        align-content: space-around;\n      };\n\n      /*******************************\n                Other Layout\n      *******************************/\n\n      --layout-block: {\n        display: block;\n      };\n\n      --layout-invisible: {\n        visibility: hidden !important;\n      };\n\n      --layout-relative: {\n        position: relative;\n      };\n\n      --layout-fit: {\n        position: absolute;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n      };\n\n      --layout-scroll: {\n        -webkit-overflow-scrolling: touch;\n        overflow: auto;\n      };\n\n      --layout-fullbleed: {\n        margin: 0;\n        height: 100vh;\n      };\n\n      /* fixed position */\n\n      --layout-fixed-top: {\n        position: fixed;\n        top: 0;\n        left: 0;\n        right: 0;\n      };\n\n      --layout-fixed-right: {\n        position: fixed;\n        top: 0;\n        right: 0;\n        bottom: 0;\n      };\n\n      --layout-fixed-bottom: {\n        position: fixed;\n        right: 0;\n        bottom: 0;\n        left: 0;\n      };\n\n      --layout-fixed-left: {\n        position: fixed;\n        top: 0;\n        bottom: 0;\n        left: 0;\n      };\n\n    }\n  </style>\n</custom-style>'];
Hj.raw = Hj.slice();
var Ij = S(Hj);
Ij.setAttribute('style', 'display: none;');
document.head.appendChild(Ij.content);
var Jj = document.createElement('style');
Jj.textContent = '[hidden] { display: none !important; }';
document.head.appendChild(Jj);
var Kj = ['\n    <style>\n      :host {\n        @apply --layout-inline;\n        @apply --layout-center-center;\n        position: relative;\n\n        vertical-align: middle;\n\n        fill: var(--iron-icon-fill-color, currentcolor);\n        stroke: var(--iron-icon-stroke-color, none);\n\n        width: var(--iron-icon-width, 24px);\n        height: var(--iron-icon-height, 24px);\n        @apply --iron-icon;\n      }\n\n      :host([hidden]) {\n        display: none;\n      }\n    </style>\n'];
Kj.raw = Kj.slice();
var Lj = new nj({ type: 'iconset' });
Y({
  _template: S(Kj),
  is: 'iron-icon',
  properties: {
    icon: { type: String },
    theme: { type: String },
    src: { type: String },
    _meta: { value: ij.create('iron-meta', { type: 'iconset' }) },
  },
  observers: ['_updateIcon(isAttached)', '_updateIcon(theme, isAttached)', '_srcChanged(src, isAttached)', '_iconChanged(icon, isAttached)'],
  _DEFAULT_ICONSET: 'icons',
  _iconChanged: function(a) {
    a = (a || '').split(':');
    this._iconName = a.pop();
    this._iconsetName = a.pop() || this._DEFAULT_ICONSET;
    this._updateIcon();
  },
  _srcChanged: function() {
    this._updateIcon();
  },
  _usesIconset: function() {
    return this.icon ||
      !this.src;
  },
  _updateIcon: function() {
    this._usesIconset() ? (this._img && this._img.parentNode && W(this.root).removeChild(this._img), '' === this._iconName ? this._iconset && this._iconset.removeIcon(this) : this._iconsetName && ((this._iconset = Lj.byKey(this._iconsetName)) ? (this._iconset.applyIcon(this, this._iconName, this.theme), this.unlisten(window, 'iron-iconset-added', '_updateIcon')) : this.listen(window, 'iron-iconset-added', '_updateIcon'))) : (this._iconset && this._iconset.removeIcon(this), this._img || (this._img = document.createElement('img'),
      this._img.style.width = '100%', this._img.style.height = '100%', this._img.draggable = !1), this._img.src = this.src, W(this.root).appendChild(this._img));
  },
});
Y({
  is: 'iron-iconset-svg',
  _template: null,
  properties: {
    name: { type: String, observer: '_nameChanged' },
    size: { type: Number, value: 24 },
    rtlMirroring: { type: Boolean, value: !1 },
    useGlobalRtlAttribute: { type: Boolean, value: !1 },
  },
  created: function() {
    this._meta = new nj({ type: 'iconset', key: null, value: null });
  },
  attached: function() {
    this.style.display = 'none';
  },
  getIconNames: function() {
    this._icons = this._createIconMap();
    return Object.keys(this._icons).map(function(a) {
      return this.name + ':' + a;
    }, this);
  },
  applyIcon: function(a, b) {
    this.removeIcon(a);
    if (b = this._cloneIcon(b, this.rtlMirroring && this._targetIsRTL(a))) {
      var c = W(a.root || a);
      c.insertBefore(b, c.childNodes[0]);
      return a._svgIcon = b;
    }
    return null;
  },
  removeIcon: function(a) {
    a._svgIcon && (W(a.root || a).removeChild(a._svgIcon), a._svgIcon = null);
  },
  _targetIsRTL: function(a) {
    null == this.__targetIsRTL && (this.useGlobalRtlAttribute ? (a = document.body && document.body.hasAttribute('dir') ? document.body : document.documentElement, this.__targetIsRTL = 'rtl' === a.getAttribute('dir')) : (a && a.nodeType !== Node.ELEMENT_NODE && (a =
      a.host), this.__targetIsRTL = a && 'rtl' === window.getComputedStyle(a).direction));
    return this.__targetIsRTL;
  },
  _nameChanged: function() {
    this._meta.value = null;
    this._meta.key = this.name;
    this._meta.value = this;
    this.async(function() {
      this.fire('iron-iconset-added', this, { node: window });
    });
  },
  _createIconMap: function() {
    var a = Object.create(null);
    W(this).querySelectorAll('[id]').forEach(function(b) {
      a[b.id] = b;
    });
    return a;
  },
  _cloneIcon: function(a, b) {
    this._icons = this._icons || this._createIconMap();
    return this._prepareSvgClone(this._icons[a],
      this.size, b);
  },
  _prepareSvgClone: function(a, b, c) {
    if (a) {
      a = a.cloneNode(!0);
      var d = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      b = a.getAttribute('viewBox') || '0 0 ' + b + ' ' + b;
      var e = 'pointer-events: none; display: block; width: 100%; height: 100%;';
      c && a.hasAttribute('mirror-in-rtl') && (e += '-webkit-transform:scale(-1,1);transform:scale(-1,1);transform-origin:center;');
      d.setAttribute('viewBox', b);
      d.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      d.setAttribute('focusable', 'false');
      d.style.cssText =
        e;
      d.appendChild(a).removeAttribute('id');
      return d;
    }
    return null;
  },
});
var Mj = document.createElement('template');
Mj.setAttribute('style', 'display: none;');
Mj.innerHTML = '<iron-iconset-svg name="paper-dropdown-menu" size="24">\n<svg><defs>\n<g id="arrow-drop-down"><path d="M7 10l5 5 5-5z"></path></g>\n</defs></svg>\n</iron-iconset-svg>';
document.head.appendChild(Mj.content);
var Nj = document.createElement('template');
Nj.setAttribute('style', 'display: none;');
Nj.innerHTML = '<dom-module id="paper-dropdown-menu-shared-styles">\n  <template>\n    <style>\n      :host {\n        display: inline-block;\n        position: relative;\n        text-align: left;\n\n        /* NOTE(cdata): Both values are needed, since some phones require the\n         * value to be `transparent`.\n         */\n        -webkit-tap-highlight-color: rgba(0,0,0,0);\n        -webkit-tap-highlight-color: transparent;\n\n        --paper-input-container-input: {\n          overflow: hidden;\n          white-space: nowrap;\n          text-overflow: ellipsis;\n          max-width: 100%;\n          box-sizing: border-box;\n          cursor: pointer;\n        };\n\n        @apply --paper-dropdown-menu;\n      }\n\n      :host(:dir(rtl)) {\n        text-align: right;\n\n        @apply(--paper-dropdown-menu);\n      }\n\n      :host([disabled]) {\n        @apply --paper-dropdown-menu-disabled;\n      }\n\n      :host([noink]) paper-ripple {\n        display: none;\n      }\n\n      :host([no-label-float]) paper-ripple {\n        top: 8px;\n      }\n\n      paper-ripple {\n        top: 12px;\n        left: 0px;\n        bottom: 8px;\n        right: 0px;\n\n        @apply --paper-dropdown-menu-ripple;\n      }\n\n      paper-menu-button {\n        display: block;\n        padding: 0;\n\n        @apply --paper-dropdown-menu-button;\n      }\n\n      paper-input {\n        @apply --paper-dropdown-menu-input;\n      }\n\n      iron-icon {\n        color: var(--disabled-text-color);\n\n        @apply --paper-dropdown-menu-icon;\n      }\n    </style>\n  </template>\n</dom-module>';
document.head.appendChild(Nj.content);
var Oj = ['\n    <style>\n      :host {\n        display: inline-block;\n        position: fixed;\n        clip: rect(0px,0px,0px,0px);\n      }\n    </style>\n    <div aria-live$="[[mode]]">[[_text]]</div>\n'];
Oj.raw = Oj.slice();
var Pj = function() {
};
Pj = Y({
  _template: S(Oj),
  is: 'iron-a11y-announcer',
  properties: { mode: { type: String, value: 'polite' }, _text: { type: String, value: '' } },
  created: function() {
    Pj.instance || (Pj.instance = this);
    document.body.addEventListener('iron-announce', this._onIronAnnounce.bind(this));
  },
  announce: function(a) {
    this._text = '';
    this.async(function() {
      this._text = a;
    }, 100);
  },
  _onIronAnnounce: function(a) {
    a.detail && a.detail.text && this.announce(a.detail.text);
  },
});
Pj.instance = null;
Pj.requestAvailability = function() {
  Pj.instance || (Pj.instance = document.createElement('iron-a11y-announcer'));
  document.body.appendChild(Pj.instance);
};
var Qj = ['\n    <style>\n      :host {\n        display: inline-block;\n      }\n    </style>\n    <slot id="content"></slot>\n'];
Qj.raw = Qj.slice();
Y({
  _template: S(Qj),
  is: 'iron-input',
  behaviors: [qj],
  properties: {
    bindValue: { type: String, value: '' },
    value: { type: String, computed: '_computeValue(bindValue)' },
    allowedPattern: { type: String },
    autoValidate: { type: Boolean, value: !1 },
    _inputElement: Object,
  },
  observers: ['_bindValueChanged(bindValue, _inputElement)'],
  listeners: { input: '_onInput', keypress: '_onKeypress' },
  created: function() {
    Pj.requestAvailability();
    this._previousValidInput = '';
    this._patternAlreadyChecked = !1;
  },
  attached: function() {
    this._observer = W(this).observeNodes(function() {
      this._initSlottedInput();
    }.bind(this));
  },
  detached: function() {
    this._observer && (W(this).unobserveNodes(this._observer), this._observer = null);
  },
  get inputElement() {
    return this._inputElement;
  },
  _initSlottedInput: function() {
    this._inputElement = this.getEffectiveChildren()[0];
    this.inputElement && this.inputElement.value && (this.bindValue = this.inputElement.value);
    this.fire('iron-input-ready');
  },
  get _patternRegExp() {
    if (this.allowedPattern) var a = new RegExp(this.allowedPattern); else switch (this.inputElement.type) {
      case 'number':
        a = /[0-9.,e-]/;
    }
    return a;
  },
  _bindValueChanged: function(a,
                              b) {
    b && (void 0 === a ? b.value = null : a !== b.value && (this.inputElement.value = a), this.autoValidate && this.validate(), this.fire('bind-value-changed', { value: a }));
  },
  _onInput: function() {
    if (this.allowedPattern && !this._patternAlreadyChecked) {
      var a = this._checkPatternValidity();
      a || (this._announceInvalidCharacter('Invalid string of characters not entered.'), this.inputElement.value = this._previousValidInput);
    }
    this.bindValue = this._previousValidInput = this.inputElement.value;
    this._patternAlreadyChecked = !1;
  },
  _isPrintable: function(a) {
    var b =
      8 == a.keyCode || 9 == a.keyCode || 13 == a.keyCode || 27 == a.keyCode,
      c = 19 == a.keyCode || 20 == a.keyCode || 45 == a.keyCode || 46 == a.keyCode || 144 == a.keyCode || 145 == a.keyCode || 32 < a.keyCode && 41 > a.keyCode || 111 < a.keyCode && 124 > a.keyCode;
    return !b && !(0 == a.charCode && c);
  },
  _onKeypress: function(a) {
    if (this.allowedPattern || 'number' === this.inputElement.type) {
      var b = this._patternRegExp;
      if (b && !(a.metaKey || a.ctrlKey || a.altKey)) {
        this._patternAlreadyChecked = !0;
        var c = String.fromCharCode(a.charCode);
        this._isPrintable(a) && !b.test(c) && (a.preventDefault(),
          this._announceInvalidCharacter('Invalid character ' + c + ' not entered.'));
      }
    }
  },
  _checkPatternValidity: function() {
    var a = this._patternRegExp;
    if (!a) return !0;
    for (var b = 0; b < this.inputElement.value.length; b++) if (!a.test(this.inputElement.value[b])) return !1;
    return !0;
  },
  validate: function() {
    if (!this.inputElement) return this.invalid = !1, !0;
    var a = this.inputElement.checkValidity();
    a && (this.required && '' === this.bindValue ? a = !1 : this.hasValidator() && (a = qj.validate.call(this, this.bindValue)));
    this.invalid = !a;
    this.fire('iron-input-validate');
    return a;
  },
  _announceInvalidCharacter: function(a) {
    this.fire('iron-announce', { text: a });
  },
  _computeValue: function(a) {
    return a;
  },
});
var Rj = 1, Sj = 1, Tj = 1, Uj = {
  properties: {
    label: { type: String },
    value: { notify: !0, type: String },
    disabled: { type: Boolean, value: !1 },
    invalid: { type: Boolean, value: !1, notify: !0 },
    allowedPattern: { type: String },
    type: { type: String },
    list: { type: String },
    pattern: { type: String },
    required: { type: Boolean, value: !1 },
    errorMessage: { type: String },
    charCounter: { type: Boolean, value: !1 },
    noLabelFloat: { type: Boolean, value: !1 },
    alwaysFloatLabel: { type: Boolean, value: !1 },
    autoValidate: { type: Boolean, value: !1 },
    validator: { type: String },
    autocomplete: {
      type: String,
      value: 'off',
    },
    autofocus: { type: Boolean, observer: '_autofocusChanged' },
    inputmode: { type: String },
    minlength: { type: Number },
    maxlength: { type: Number },
    min: { type: String },
    max: { type: String },
    step: { type: String },
    name: { type: String },
    placeholder: { type: String, value: '' },
    readonly: { type: Boolean, value: !1 },
    size: { type: Number },
    autocapitalize: { type: String, value: 'none' },
    autocorrect: { type: String, value: 'off' },
    autosave: { type: String },
    results: { type: Number },
    accept: { type: String },
    multiple: { type: Boolean },
    _ariaDescribedBy: { type: String, value: '' },
    _ariaLabelledBy: { type: String, value: '' },
    _inputId: { type: String, value: '' },
  },
  listeners: { 'addon-attached': '_onAddonAttached' },
  keyBindings: { 'shift+tab:keydown': '_onShiftTabDown' },
  hostAttributes: { tabindex: 0 },
  get inputElement() {
    this.$ || (this.$ = {});
    this.$.input || (this._generateInputId(), this.$.input = this.$$('#' + this._inputId));
    return this.$.input;
  },
  get _focusableElement() {
    return this.inputElement;
  },
  created: function() {
    this._typesThatHaveText = 'date datetime datetime-local month time week file'.split(' ');
  },
  attached: function() {
    this._updateAriaLabelledBy();
    !U && this.inputElement && -1 !== this._typesThatHaveText.indexOf(this.inputElement.type) && (this.alwaysFloatLabel = !0);
  },
  _appendStringWithSpace: function(a, b) {
    return a = a ? a + ' ' + b : b;
  },
  _onAddonAttached: function(a) {
    a = W(a).rootTarget;
    if (a.id) this._ariaDescribedBy = this._appendStringWithSpace(this._ariaDescribedBy, a.id); else {
      var b = 'paper-input-add-on-' + Sj++;
      a.id = b;
      this._ariaDescribedBy = this._appendStringWithSpace(this._ariaDescribedBy, b);
    }
  },
  validate: function() {
    return this.inputElement.validate();
  },
  _focusBlurHandler: function(a) {
    tj._focusBlurHandler.call(this,
      a);
    this.focused && !this._shiftTabPressed && this._focusableElement && this._focusableElement.focus();
  },
  _onShiftTabDown: function() {
    var a = this.getAttribute('tabindex');
    this._shiftTabPressed = !0;
    this.setAttribute('tabindex', '-1');
    this.async(function() {
      this.setAttribute('tabindex', a);
      this._shiftTabPressed = !1;
    }, 1);
  },
  _handleAutoValidate: function() {
    this.autoValidate && this.validate();
  },
  updateValueAndPreserveCaret: function(a) {
    try {
      var b = this.inputElement.selectionStart;
      this.value = a;
      this.inputElement.selectionStart = b;
      this.inputElement.selectionEnd = b;
    } catch (c) {
      this.value = a;
    }
  },
  _computeAlwaysFloatLabel: function(a, b) {
    return b || a;
  },
  _updateAriaLabelledBy: function() {
    var a = W(this.root).querySelector('label');
    if (a) {
      if (a.id) var b = a.id; else b = 'paper-input-label-' + Rj++, a.id = b;
      this._ariaLabelledBy = b;
    } else this._ariaLabelledBy = '';
  },
  _generateInputId: function() {
    this._inputId && '' !== this._inputId || (this._inputId = 'input-' + Tj++);
  },
  _onChange: function(a) {
    this.shadowRoot && this.fire(a.type, { sourceEvent: a }, {
      node: this,
      bubbles: a.bubbles,
      cancelable: a.cancelable,
    });
  },
  _autofocusChanged: function() {
    if (this.autofocus && this._focusableElement) {
      var a = document.activeElement, b = a instanceof HTMLElement;
      (a = b && a !== document.body && a !== document.documentElement) || this._focusableElement.focus();
    }
  },
}, Vj = [tj, Xd, Uj];
var Wj = {
  attached: function() {
    this.fire('addon-attached');
  }, update: function() {
  },
};
if (!window.polymerSkipLoadingFontRoboto) for (var Xj = ['https://fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,500,500italic,700,700italic', 'https://fonts.googleapis.com/css?family=Roboto+Mono:400,700'], Yj = q(Xj), Zj = Yj.next(); !Zj.done; Zj = Yj.next()) {
  var ak = Zj.value, bk = document.createElement('link');
  bk.rel = 'stylesheet';
  bk.href = ak;
  document.head.appendChild(bk);
}
;var ck = document.createElement('template');
ck.setAttribute('style', 'display: none;');
ck.innerHTML = '<custom-style>\n  <style is="custom-style">\n    html {\n\n      /* Shared Styles */\n      --paper-font-common-base: {\n        font-family: \'Roboto\', \'Noto\', sans-serif;\n        -webkit-font-smoothing: antialiased;\n      };\n\n      --paper-font-common-code: {\n        font-family: \'Roboto Mono\', \'Consolas\', \'Menlo\', monospace;\n        -webkit-font-smoothing: antialiased;\n      };\n\n      --paper-font-common-expensive-kerning: {\n        text-rendering: optimizeLegibility;\n      };\n\n      --paper-font-common-nowrap: {\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      };\n\n      /* Material Font Styles */\n\n      --paper-font-display4: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 112px;\n        font-weight: 300;\n        letter-spacing: -.044em;\n        line-height: 120px;\n      };\n\n      --paper-font-display3: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 56px;\n        font-weight: 400;\n        letter-spacing: -.026em;\n        line-height: 60px;\n      };\n\n      --paper-font-display2: {\n        @apply --paper-font-common-base;\n\n        font-size: 45px;\n        font-weight: 400;\n        letter-spacing: -.018em;\n        line-height: 48px;\n      };\n\n      --paper-font-display1: {\n        @apply --paper-font-common-base;\n\n        font-size: 34px;\n        font-weight: 400;\n        letter-spacing: -.01em;\n        line-height: 40px;\n      };\n\n      --paper-font-headline: {\n        @apply --paper-font-common-base;\n\n        font-size: 24px;\n        font-weight: 400;\n        letter-spacing: -.012em;\n        line-height: 32px;\n      };\n\n      --paper-font-title: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 20px;\n        font-weight: 500;\n        line-height: 28px;\n      };\n\n      --paper-font-subhead: {\n        @apply --paper-font-common-base;\n\n        font-size: 16px;\n        font-weight: 400;\n        line-height: 24px;\n      };\n\n      --paper-font-body2: {\n        @apply --paper-font-common-base;\n\n        font-size: 14px;\n        font-weight: 500;\n        line-height: 24px;\n      };\n\n      --paper-font-body1: {\n        @apply --paper-font-common-base;\n\n        font-size: 14px;\n        font-weight: 400;\n        line-height: 20px;\n      };\n\n      --paper-font-caption: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 12px;\n        font-weight: 400;\n        letter-spacing: 0.011em;\n        line-height: 20px;\n      };\n\n      --paper-font-menu: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 13px;\n        font-weight: 500;\n        line-height: 24px;\n      };\n\n      --paper-font-button: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 14px;\n        font-weight: 500;\n        letter-spacing: 0.018em;\n        line-height: 24px;\n        text-transform: uppercase;\n      };\n\n      --paper-font-code2: {\n        @apply --paper-font-common-code;\n\n        font-size: 14px;\n        font-weight: 700;\n        line-height: 20px;\n      };\n\n      --paper-font-code1: {\n        @apply --paper-font-common-code;\n\n        font-size: 14px;\n        font-weight: 500;\n        line-height: 20px;\n      };\n\n    }\n\n  </style>\n</custom-style>';
document.head.appendChild(ck.content);
var dk = ['\n    <style>\n      :host {\n        display: inline-block;\n        float: right;\n\n        @apply --paper-font-caption;\n        @apply --paper-input-char-counter;\n      }\n\n      :host([hidden]) {\n        display: none !important;\n      }\n\n      :host(:dir(rtl)) {\n        float: left;\n      }\n    </style>\n\n    <span>[[_charCounterStr]]</span>\n'];
dk.raw = dk.slice();
Y({
  _template: S(dk),
  is: 'paper-input-char-counter',
  behaviors: [Wj],
  properties: { _charCounterStr: { type: String, value: '0' } },
  update: function(a) {
    if (a.inputElement) {
      a.value = a.value || '';
      var b = a.value.toString().length.toString();
      a.inputElement.hasAttribute('maxlength') && (b += '/' + a.inputElement.getAttribute('maxlength'));
      this._charCounterStr = b;
    }
  },
});
var ek = ['\n    <style>\n      :host {\n        display: block;\n        padding: 8px 0;\n        @apply --paper-input-container;\n      }\n\n      :host([inline]) {\n        display: inline-block;\n      }\n\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.33;\n\n        @apply --paper-input-container-disabled;\n      }\n\n      :host([hidden]) {\n        display: none !important;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n\n      .floated-label-placeholder {\n        @apply --paper-font-caption;\n      }\n\n      .underline {\n        height: var(--paper-input-container-underline-wrapper-height, 2px);\n        position: relative;\n      }\n\n      .focused-line {\n        @apply --layout-fit;\n        border-bottom:\n            var(--paper-input-container-underline-focus-height, 2px)\n            solid\n            var(--paper-input-container-underline-focus-color,\n                var(--paper-input-container-focus-color,\n                var(--primary-color)));\n\n        -webkit-transform-origin: center center;\n        transform-origin: center center;\n        -webkit-transform: scale3d(0,1,1);\n        transform: scale3d(0,1,1);\n        display: var(--paper-input-container-underline-focus-display, block);\n\n        @apply --paper-input-container-underline-focus;\n      }\n\n      .underline.is-highlighted .focused-line {\n        -webkit-transform: none;\n        transform: none;\n        -webkit-transition: -webkit-transform 0.25s;\n        transition: transform 0.25s;\n\n        @apply --paper-transition-easing;\n      }\n\n      .underline.is-invalid .focused-line {\n        border-bottom:\n            var(--paper-input-container-underline-focus-height, 2px)\n            solid\n            var(--paper-input-container-underline-invalid-focus-color,\n                var(--paper-input-container-invalid-color,\n                var(--error-color)));\n        -webkit-transform: none;\n        transform: none;\n        -webkit-transition: -webkit-transform 0.25s;\n        transition: transform 0.25s;\n        display: var(--paper-input-container-underline-focus-display, block);\n\n        @apply --paper-transition-easing;\n      }\n\n      .unfocused-line {\n        @apply --layout-fit;\n        border-bottom:\n            var(--paper-input-container-underline-height, 1px)\n            solid\n            var(--paper-input-container-underline-color,\n                var(--paper-input-container-color,\n                var(--secondary-text-color)));\n        height: var(--paper-input-container-underline-legacy-height);\n        display: var(--paper-input-container-underline-display, block);\n\n        @apply --paper-input-container-underline;\n      }\n\n      :host([disabled]) .unfocused-line {\n        border-bottom:\n            var(--paper-input-container-underline-height, 1px)\n            dashed\n            var(--paper-input-container-underline-color,\n                var(--paper-input-container-color,\n                var(--secondary-text-color)));\n        display: var(--paper-input-container-underline-disabled-display, block);\n\n        @apply --paper-input-container-underline-disabled;\n      }\n\n      .input-wrapper {\n        @apply --layout-horizontal;\n        @apply --layout-center;\n        position: relative;\n      }\n\n      .input-content {\n        @apply --layout-flex-auto;\n        @apply --layout-relative;\n        max-width: 100%;\n      }\n\n      .input-content ::slotted(label),\n      .input-content ::slotted(.paper-input-label) {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        font: inherit;\n        color: var(--paper-input-container-color, var(--secondary-text-color));\n        -webkit-transition: -webkit-transform 0.25s, width 0.25s;\n        transition: transform 0.25s, width 0.25s;\n        -webkit-transform-origin: left top;\n        transform-origin: left top;\n        /* Fix for safari not focusing 0-height date/time inputs with -webkit-apperance: none; */\n        min-height: 1px;\n\n        @apply --paper-font-common-nowrap;\n        @apply --paper-font-subhead;\n        @apply --paper-input-container-label;\n        @apply --paper-transition-easing;\n      }\n\n      .input-content.label-is-floating ::slotted(label),\n      .input-content.label-is-floating ::slotted(.paper-input-label) {\n        -webkit-transform: translateY(-75%) scale(0.75);\n        transform: translateY(-75%) scale(0.75);\n\n        /* Since we scale to 75/100 of the size, we actually have 100/75 of the\n        original space now available */\n        width: 133%;\n\n        @apply --paper-input-container-label-floating;\n      }\n\n      :host(:dir(rtl)) .input-content.label-is-floating ::slotted(label),\n      :host(:dir(rtl)) .input-content.label-is-floating ::slotted(.paper-input-label) {\n        right: 0;\n        left: auto;\n        -webkit-transform-origin: right top;\n        transform-origin: right top;\n      }\n\n      .input-content.label-is-highlighted ::slotted(label),\n      .input-content.label-is-highlighted ::slotted(.paper-input-label) {\n        color: var(--paper-input-container-focus-color, var(--primary-color));\n\n        @apply --paper-input-container-label-focus;\n      }\n\n      .input-content.is-invalid ::slotted(label),\n      .input-content.is-invalid ::slotted(.paper-input-label) {\n        color: var(--paper-input-container-invalid-color, var(--error-color));\n      }\n\n      .input-content.label-is-hidden ::slotted(label),\n      .input-content.label-is-hidden ::slotted(.paper-input-label) {\n        visibility: hidden;\n      }\n\n      .input-content ::slotted(input),\n      .input-content ::slotted(iron-input),\n      .input-content ::slotted(textarea),\n      .input-content ::slotted(iron-autogrow-textarea),\n      .input-content ::slotted(.paper-input-input) {\n        @apply --paper-input-container-shared-input-style;\n        /* The apply shim doesn\'t apply the nested color custom property,\n          so we have to re-apply it here. */\n        color: var(--paper-input-container-input-color, var(--primary-text-color));\n        @apply --paper-input-container-input;\n      }\n\n      .input-content ::slotted(input)::-webkit-outer-spin-button,\n      .input-content ::slotted(input)::-webkit-inner-spin-button {\n        @apply --paper-input-container-input-webkit-spinner;\n      }\n\n      .input-content.focused ::slotted(input),\n      .input-content.focused ::slotted(iron-input),\n      .input-content.focused ::slotted(textarea),\n      .input-content.focused ::slotted(iron-autogrow-textarea),\n      .input-content.focused ::slotted(.paper-input-input) {\n        @apply --paper-input-container-input-focus;\n      }\n\n      .input-content.is-invalid ::slotted(input),\n      .input-content.is-invalid ::slotted(iron-input),\n      .input-content.is-invalid ::slotted(textarea),\n      .input-content.is-invalid ::slotted(iron-autogrow-textarea),\n      .input-content.is-invalid ::slotted(.paper-input-input) {\n        @apply --paper-input-container-input-invalid;\n      }\n\n      .prefix ::slotted(*) {\n        display: inline-block;\n        @apply --paper-font-subhead;\n        @apply --layout-flex-none;\n        @apply --paper-input-prefix;\n      }\n\n      .suffix ::slotted(*) {\n        display: inline-block;\n        @apply --paper-font-subhead;\n        @apply --layout-flex-none;\n\n        @apply --paper-input-suffix;\n      }\n\n      /* Firefox sets a min-width on the input, which can cause layout issues */\n      .input-content ::slotted(input) {\n        min-width: 0;\n      }\n\n      .input-content ::slotted(textarea) {\n        resize: none;\n      }\n\n      .add-on-content {\n        position: relative;\n      }\n\n      .add-on-content.is-invalid ::slotted(*) {\n        color: var(--paper-input-container-invalid-color, var(--error-color));\n      }\n\n      .add-on-content.is-highlighted ::slotted(*) {\n        color: var(--paper-input-container-focus-color, var(--primary-color));\n      }\n    </style>\n\n    <div class="floated-label-placeholder" aria-hidden="true" hidden="[[noLabelFloat]]">&nbsp;</div>\n\n    <div class="input-wrapper">\n      <span class="prefix"><slot name="prefix"></slot></span>\n\n      <div class$="[[_computeInputContentClass(noLabelFloat,alwaysFloatLabel,focused,invalid,_inputHasContent)]]" id="labelAndInputContainer">\n        <slot name="label"></slot>\n        <slot name="input"></slot><slot name="after-input"></slot>\n      </div>\n\n      <span class="suffix"><slot name="suffix"></slot></span>\n    </div>\n\n    <div class$="[[_computeUnderlineClass(focused,invalid)]]">\n      <div class="unfocused-line"></div>\n      <div class="focused-line"></div>\n    </div>\n\n    <div class$="[[_computeAddOnContentClass(focused,invalid)]]">\n      <slot name="add-on"></slot>\n    </div>\n'];
ek.raw = ek.slice();
var fk = ['\n<custom-style>\n  <style is="custom-style">\n    html {\n      --paper-input-container-shared-input-style: {\n        position: relative; /* to make a stacking context */\n        outline: none;\n        box-shadow: none;\n        padding: 0;\n        margin: 0;\n        width: 100%;\n        max-width: 100%;\n        background: transparent;\n        border: none;\n        color: var(--paper-input-container-input-color, var(--primary-text-color));\n        -webkit-appearance: none;\n        text-align: inherit;\n        vertical-align: var(--paper-input-container-input-align, bottom);\n\n        @apply --paper-font-subhead;\n      };\n    }\n  </style>\n</custom-style>\n'];
fk.raw = fk.slice();
var gk = S(fk);
gk.setAttribute('style', 'display: none;');
document.head.appendChild(gk.content);
Y({
  _template: S(ek),
  is: 'paper-input-container',
  properties: {
    noLabelFloat: { type: Boolean, value: !1 },
    alwaysFloatLabel: { type: Boolean, value: !1 },
    attrForValue: { type: String, value: 'bind-value' },
    autoValidate: { type: Boolean, value: !1 },
    invalid: { observer: '_invalidChanged', type: Boolean, value: !1 },
    focused: { readOnly: !0, type: Boolean, value: !1, notify: !0 },
    noUnfloatedLabelError: { type: Boolean, value: !1 },
    _addons: { type: Array },
    _inputHasContent: { type: Boolean, value: !1 },
    _inputSelector: { type: String, value: 'input,iron-input,textarea,.paper-input-input' },
    _boundOnFocus: {
      type: Function, value: function() {
        return this._onFocus.bind(this);
      },
    },
    _boundOnBlur: {
      type: Function, value: function() {
        return this._onBlur.bind(this);
      },
    },
    _boundOnInput: {
      type: Function, value: function() {
        return this._onInput.bind(this);
      },
    },
    _boundValueChanged: {
      type: Function, value: function() {
        return this._onValueChanged.bind(this);
      },
    },
  },
  listeners: { 'addon-attached': '_onAddonAttached', 'iron-input-validate': '_onIronInputValidate' },
  get _valueChangedEvent() {
    return this.attrForValue + '-changed';
  },
  get _propertyForValue() {
    return ue(this.attrForValue);
  },
  get _inputElement() {
    return W(this).querySelector(this._inputSelector);
  },
  get _inputElementValue() {
    return this._inputElement[this._propertyForValue] || this._inputElement.value;
  },
  ready: function() {
    this.__isFirstValueUpdate = !0;
    this._addons || (this._addons = []);
    this.addEventListener('focus', this._boundOnFocus, !0);
    this.addEventListener('blur', this._boundOnBlur, !0);
  },
  attached: function() {
    this.attrForValue ? this._inputElement.addEventListener(this._valueChangedEvent, this._boundValueChanged) : this.addEventListener('input',
      this._onInput);
    this._inputElementValue && '' != this._inputElementValue ? this._handleValueAndAutoValidate(this._inputElement) : this._handleValue(this._inputElement);
  },
  _onAddonAttached: function(a) {
    this._addons || (this._addons = []);
    a = a.target;
    -1 === this._addons.indexOf(a) && (this._addons.push(a), this.isAttached && this._handleValue(this._inputElement));
  },
  _onFocus: function() {
    this._setFocused(!0);
  },
  _onBlur: function() {
    this._setFocused(!1);
    this._handleValueAndAutoValidate(this._inputElement);
  },
  _onInput: function(a) {
    this._handleValueAndAutoValidate(a.target);
  },
  _onValueChanged: function(a) {
    var b = a.target;
    if (this.__isFirstValueUpdate && (this.__isFirstValueUpdate = !1, void 0 === b.value || '' === b.value)) return;
    this._handleValueAndAutoValidate(a.target);
  },
  _handleValue: function(a) {
    var b = this._inputElementValue;
    b || 0 === b || 'number' === a.type && !a.checkValidity() ? this._inputHasContent = !0 : this._inputHasContent = !1;
    this.updateAddons({ inputElement: a, value: b, invalid: this.invalid });
  },
  _handleValueAndAutoValidate: function(a) {
    if (this.autoValidate && a) {
      var b = a.validate ? a.validate(this._inputElementValue) :
        a.checkValidity();
      this.invalid = !b;
    }
    this._handleValue(a);
  },
  _onIronInputValidate: function() {
    this.invalid = this._inputElement.invalid;
  },
  _invalidChanged: function() {
    this._addons && this.updateAddons({ invalid: this.invalid });
  },
  updateAddons: function(a) {
    for (var b, c = 0; b = this._addons[c]; c++) b.update(a);
  },
  _computeInputContentClass: function(a, b, c, d, e) {
    var f = 'input-content';
    a ? (e && (f += ' label-is-hidden'), d && !this.noUnfloatedLabelError && (f += ' is-invalid')) : (a = this.querySelector('label'), b || e ? (f += ' label-is-floating', this.$.labelAndInputContainer.style.position =
      'static', d ? f += ' is-invalid' : c && (f += ' label-is-highlighted')) : (a && (this.$.labelAndInputContainer.style.position = 'relative'), d && !this.noUnfloatedLabelError && (f += ' is-invalid')));
    c && (f += ' focused');
    return f;
  },
  _computeUnderlineClass: function(a, b) {
    var c = 'underline';
    b ? c += ' is-invalid' : a && (c += ' is-highlighted');
    return c;
  },
  _computeAddOnContentClass: function(a, b) {
    var c = 'add-on-content';
    b ? c += ' is-invalid' : a && (c += ' is-highlighted');
    return c;
  },
});
var hk = ['\n    <style>\n      :host {\n        display: inline-block;\n        visibility: hidden;\n\n        color: var(--paper-input-container-invalid-color, var(--error-color));\n\n        @apply --paper-font-caption;\n        @apply --paper-input-error;\n        position: absolute;\n        left:0;\n        right:0;\n      }\n\n      :host([invalid]) {\n        visibility: visible;\n      }\n\n      #a11yWrapper {\n        visibility: hidden;\n      }\n\n      :host([invalid]) #a11yWrapper {\n        visibility: visible;\n      }\n    </style>\n\n    \x3c!--\n    If the paper-input-error element is directly referenced by an\n    `aria-describedby` attribute, such as when used as a paper-input add-on,\n    then applying `visibility: hidden;` to the paper-input-error element itself\n    does not hide the error.\n\n    For more information, see:\n    https://www.w3.org/TR/accname-1.1/#mapping_additional_nd_description\n    --\x3e\n    <div id="a11yWrapper">\n      <slot></slot>\n    </div>\n'];
hk.raw = ['\n    <style>\n      :host {\n        display: inline-block;\n        visibility: hidden;\n\n        color: var(--paper-input-container-invalid-color, var(--error-color));\n\n        @apply --paper-font-caption;\n        @apply --paper-input-error;\n        position: absolute;\n        left:0;\n        right:0;\n      }\n\n      :host([invalid]) {\n        visibility: visible;\n      }\n\n      #a11yWrapper {\n        visibility: hidden;\n      }\n\n      :host([invalid]) #a11yWrapper {\n        visibility: visible;\n      }\n    </style>\n\n    \x3c!--\n    If the paper-input-error element is directly referenced by an\n    \\`aria-describedby\\` attribute, such as when used as a paper-input add-on,\n    then applying \\`visibility: hidden;\\` to the paper-input-error element itself\n    does not hide the error.\n\n    For more information, see:\n    https://www.w3.org/TR/accname-1.1/#mapping_additional_nd_description\n    --\x3e\n    <div id="a11yWrapper">\n      <slot></slot>\n    </div>\n'];
Y({
  _template: S(hk),
  is: 'paper-input-error',
  behaviors: [Wj],
  properties: { invalid: { readOnly: !0, reflectToAttribute: !0, type: Boolean } },
  update: function(a) {
    this._setInvalid(a.invalid);
  },
});
var ik = ['\n    <style>\n      :host {\n        display: block;\n      }\n\n      :host([focused]) {\n        outline: none;\n      }\n\n      :host([hidden]) {\n        display: none !important;\n      }\n\n      input {\n        /* Firefox sets a min-width on the input, which can cause layout issues */\n        min-width: 0;\n      }\n\n      /* In 1.x, the <input> is distributed to paper-input-container, which styles it.\n      In 2.x the <iron-input> is distributed to paper-input-container, which styles\n      it, but in order for this to work correctly, we need to reset some\n      of the native input\'s properties to inherit (from the iron-input) */\n      iron-input > input {\n        @apply --paper-input-container-shared-input-style;\n        font-family: inherit;\n        font-weight: inherit;\n        font-size: inherit;\n        letter-spacing: inherit;\n        word-spacing: inherit;\n        line-height: inherit;\n        text-shadow: inherit;\n        color: inherit;\n        cursor: inherit;\n      }\n\n      input:disabled {\n        @apply --paper-input-container-input-disabled;\n      }\n\n      input::-webkit-outer-spin-button,\n      input::-webkit-inner-spin-button {\n        @apply --paper-input-container-input-webkit-spinner;\n      }\n\n      input::-webkit-clear-button {\n        @apply --paper-input-container-input-webkit-clear;\n      }\n\n      input::-webkit-calendar-picker-indicator {\n        @apply --paper-input-container-input-webkit-calendar-picker-indicator;\n      }\n\n      input::-webkit-input-placeholder {\n        color: var(--paper-input-container-color, var(--secondary-text-color));\n      }\n\n      input:-moz-placeholder {\n        color: var(--paper-input-container-color, var(--secondary-text-color));\n      }\n\n      input::-moz-placeholder {\n        color: var(--paper-input-container-color, var(--secondary-text-color));\n      }\n\n      input::-ms-clear {\n        @apply --paper-input-container-ms-clear;\n      }\n\n      input::-ms-reveal {\n        @apply --paper-input-container-ms-reveal;\n      }\n\n      input:-ms-input-placeholder {\n        color: var(--paper-input-container-color, var(--secondary-text-color));\n      }\n\n      label {\n        pointer-events: none;\n      }\n    </style>\n\n    <paper-input-container id="container" no-label-float="[[noLabelFloat]]" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" auto-validate$="[[autoValidate]]" disabled$="[[disabled]]" invalid="[[invalid]]" no-unfloated-label-error="[[noUnfloatedLabelError]]">\n\n      <slot name="prefix" slot="prefix"></slot>\n\n      <label hidden$="[[!label]]" aria-hidden="true" for$="[[_inputId]]" slot="label">[[label]]</label>\n\n      \x3c!-- Need to bind maxlength so that the paper-input-char-counter works correctly --\x3e\n      <iron-input bind-value="{{value}}" slot="input" class="input-element" id$="[[_inputId]]" maxlength$="[[maxlength]]" allowed-pattern="[[allowedPattern]]" invalid="{{invalid}}" validator="[[validator]]">\n        <input aria-labelledby$="[[_ariaLabelledBy]]" aria-describedby$="[[_ariaDescribedBy]]" disabled$="[[disabled]]" title$="[[title]]" type$="[[type]]" pattern$="[[pattern]]" required$="[[required]]" autocomplete$="[[autocomplete]]" autofocus$="[[autofocus]]" inputmode$="[[inputmode]]" minlength$="[[minlength]]" maxlength$="[[maxlength]]" min$="[[min]]" max$="[[max]]" step$="[[step]]" name$="[[name]]" placeholder$="[[placeholder]]" readonly$="[[readonly]]" list$="[[list]]" size$="[[size]]" autocapitalize$="[[autocapitalize]]" autocorrect$="[[autocorrect]]" on-change="_onChange" tabindex$="[[tabIndex]]" autosave$="[[autosave]]" results$="[[results]]" accept$="[[accept]]" multiple$="[[multiple]]">\n      </iron-input>\n\n      <slot name="suffix" slot="suffix"></slot>\n\n      <template is="dom-if" if="[[errorMessage]]">\n        <paper-input-error aria-live="assertive" slot="add-on">[[errorMessage]]</paper-input-error>\n      </template>\n\n      <template is="dom-if" if="[[charCounter]]">\n        <paper-input-char-counter slot="add-on"></paper-input-char-counter>\n      </template>\n\n    </paper-input-container>\n  '];
ik.raw = ik.slice();
Y({
  is: 'paper-input',
  _template: S(ik),
  behaviors: [Vj, mj],
  properties: { value: { type: String }, noUnfloatedLabelError: { type: Boolean, value: !1 } },
  get _focusableElement() {
    return this.inputElement._inputElement;
  },
  listeners: { 'iron-input-ready': '_onIronInputReady' },
  _onIronInputReady: function() {
    this.$.nativeInput || (this.$.nativeInput = this.$$('input'));
    this.inputElement && -1 !== this._typesThatHaveText.indexOf(this.$.nativeInput.type) && (this.alwaysFloatLabel = !0);
    this.inputElement.bindValue && this.$.container._handleValueAndAutoValidate(this.inputElement);
  },
});
var jk = {
  properties: {
    sizingTarget: {
      type: Object, value: function() {
        return this;
      },
    },
    fitInto: { type: Object, value: window },
    noOverlap: { type: Boolean },
    positionTarget: { type: Element },
    horizontalAlign: { type: String },
    verticalAlign: { type: String },
    dynamicAlign: { type: Boolean },
    horizontalOffset: { type: Number, value: 0, notify: !0 },
    verticalOffset: { type: Number, value: 0, notify: !0 },
    autoFitOnAttach: { type: Boolean, value: !1 },
    _fitInfo: { type: Object },
  }, get _fitWidth() {
    var a;
    return a = this.fitInto === window ? this.fitInto.innerWidth : this.fitInto.getBoundingClientRect().width;
  },
  get _fitHeight() {
    var a;
    return a = this.fitInto === window ? this.fitInto.innerHeight : this.fitInto.getBoundingClientRect().height;
  }, get _fitLeft() {
    var a;
    return a = this.fitInto === window ? 0 : this.fitInto.getBoundingClientRect().left;
  }, get _fitTop() {
    var a;
    return a = this.fitInto === window ? 0 : this.fitInto.getBoundingClientRect().top;
  }, get _defaultPositionTarget() {
    var a = W(this).parentNode;
    a && a.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (a = a.host);
    return a;
  }, get _localeHorizontalAlign() {
    if (this._isRTL) {
      if ('right' === this.horizontalAlign) return 'left';
      if ('left' === this.horizontalAlign) return 'right';
    }
    return this.horizontalAlign;
  }, get __shouldPosition() {
    return (this.horizontalAlign || this.verticalAlign) && this.positionTarget;
  }, attached: function() {
    'undefined' === typeof this._isRTL && (this._isRTL = 'rtl' == window.getComputedStyle(this).direction);
    this.positionTarget = this.positionTarget || this._defaultPositionTarget;
    this.autoFitOnAttach && ('none' === window.getComputedStyle(this).display ? setTimeout(function() {
      this.fit();
    }.bind(this)) : (window.ShadyDOM && ShadyDOM.flush(),
      this.fit()));
  }, detached: function() {
    this.__deferredFit && (clearTimeout(this.__deferredFit), this.__deferredFit = null);
  }, fit: function() {
    this.position();
    this.constrain();
    this.center();
  }, _discoverInfo: function() {
    if (!this._fitInfo) {
      var a = window.getComputedStyle(this), b = window.getComputedStyle(this.sizingTarget);
      this._fitInfo = {
        inlineStyle: { top: this.style.top || '', left: this.style.left || '', position: this.style.position || '' },
        sizerInlineStyle: {
          maxWidth: this.sizingTarget.style.maxWidth || '', maxHeight: this.sizingTarget.style.maxHeight ||
            '', boxSizing: this.sizingTarget.style.boxSizing || '',
        },
        positionedBy: {
          vertically: 'auto' !== a.top ? 'top' : 'auto' !== a.bottom ? 'bottom' : null,
          horizontally: 'auto' !== a.left ? 'left' : 'auto' !== a.right ? 'right' : null,
        },
        sizedBy: {
          height: 'none' !== b.maxHeight,
          width: 'none' !== b.maxWidth,
          minWidth: parseInt(b.minWidth, 10) || 0,
          minHeight: parseInt(b.minHeight, 10) || 0,
        },
        margin: {
          top: parseInt(a.marginTop, 10) || 0,
          right: parseInt(a.marginRight, 10) || 0,
          bottom: parseInt(a.marginBottom, 10) || 0,
          left: parseInt(a.marginLeft, 10) || 0,
        },
      };
    }
  }, resetFit: function() {
    var a =
      this._fitInfo || {}, b;
    for (b in a.sizerInlineStyle) this.sizingTarget.style[b] = a.sizerInlineStyle[b];
    for (b in a.inlineStyle) this.style[b] = a.inlineStyle[b];
    this._fitInfo = null;
  }, refit: function() {
    var a = this.sizingTarget.scrollLeft, b = this.sizingTarget.scrollTop;
    this.resetFit();
    this.fit();
    this.sizingTarget.scrollLeft = a;
    this.sizingTarget.scrollTop = b;
  }, position: function() {
    if (this.__shouldPosition) {
      this._discoverInfo();
      this.style.position = 'fixed';
      this.sizingTarget.style.boxSizing = 'border-box';
      this.style.left = '0px';
      this.style.top = '0px';
      var a = this.getBoundingClientRect(), b = this.__getNormalizedRect(this.positionTarget),
        c = this.__getNormalizedRect(this.fitInto), d = this._fitInfo.margin,
        e = { width: a.width + d.left + d.right, height: a.height + d.top + d.bottom };
      e = this.__getPosition(this._localeHorizontalAlign, this.verticalAlign, e, a, b, c);
      b = e.left + d.left;
      e = e.top + d.top;
      var f = Math.min(c.right - d.right, b + a.width), g = Math.min(c.bottom - d.bottom, e + a.height);
      b = Math.max(c.left + d.left, Math.min(b, f - this._fitInfo.sizedBy.minWidth));
      e = Math.max(c.top +
        d.top, Math.min(e, g - this._fitInfo.sizedBy.minHeight));
      this.sizingTarget.style.maxWidth = Math.max(f - b, this._fitInfo.sizedBy.minWidth) + 'px';
      this.sizingTarget.style.maxHeight = Math.max(g - e, this._fitInfo.sizedBy.minHeight) + 'px';
      this.style.left = b - a.left + 'px';
      this.style.top = e - a.top + 'px';
    }
  }, constrain: function() {
    if (!this.__shouldPosition) {
      this._discoverInfo();
      var a = this._fitInfo;
      a.positionedBy.vertically || (this.style.position = 'fixed', this.style.top = '0px');
      a.positionedBy.horizontally || (this.style.position = 'fixed',
        this.style.left = '0px');
      this.sizingTarget.style.boxSizing = 'border-box';
      var b = this.getBoundingClientRect();
      a.sizedBy.height || this.__sizeDimension(b, a.positionedBy.vertically, 'top', 'bottom', 'Height');
      a.sizedBy.width || this.__sizeDimension(b, a.positionedBy.horizontally, 'left', 'right', 'Width');
    }
  }, _sizeDimension: function(a, b, c, d, e) {
    this.__sizeDimension(a, b, c, d, e);
  }, __sizeDimension: function(a, b, c, d, e) {
    var f = this._fitInfo, g = this.__getNormalizedRect(this.fitInto);
    g = 'Width' === e ? g.width : g.height;
    a = (b = b === d) ? g -
      a[d] : a[c];
    c = f.margin[b ? c : d];
    d = 'offset' + e;
    d = this[d] - this.sizingTarget[d];
    this.sizingTarget.style['max' + e] = g - c - a - d + 'px';
  }, center: function() {
    if (!this.__shouldPosition) {
      this._discoverInfo();
      var a = this._fitInfo.positionedBy;
      if (!a.vertically || !a.horizontally) {
        this.style.position = 'fixed';
        a.vertically || (this.style.top = '0px');
        a.horizontally || (this.style.left = '0px');
        var b = this.getBoundingClientRect(), c = this.__getNormalizedRect(this.fitInto);
        if (!a.vertically) {
          var d = c.top - b.top + (c.height - b.height) / 2;
          this.style.top =
            d + 'px';
        }
        a.horizontally || (a = c.left - b.left + (c.width - b.width) / 2, this.style.left = a + 'px');
      }
    }
  }, __getNormalizedRect: function(a) {
    return a === document.documentElement || a === window ? {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      right: window.innerWidth,
      bottom: window.innerHeight,
    } : a.getBoundingClientRect();
  }, __getOffscreenArea: function(a, b, c) {
    var d = Math.min(0, a.top) + Math.min(0, c.bottom - (a.top + b.height));
    a = Math.min(0, a.left) + Math.min(0, c.right - (a.left + b.width));
    return Math.abs(d) * b.width + Math.abs(a) *
      b.height;
  }, __getPosition: function(a, b, c, d, e, f) {
    var g = [{
      verticalAlign: 'top',
      horizontalAlign: 'left',
      top: e.top + this.verticalOffset,
      left: e.left + this.horizontalOffset,
    }, {
      verticalAlign: 'top',
      horizontalAlign: 'right',
      top: e.top + this.verticalOffset,
      left: e.right - c.width - this.horizontalOffset,
    }, {
      verticalAlign: 'bottom',
      horizontalAlign: 'left',
      top: e.bottom - c.height - this.verticalOffset,
      left: e.left + this.horizontalOffset,
    }, {
      verticalAlign: 'bottom', horizontalAlign: 'right', top: e.bottom - c.height - this.verticalOffset, left: e.right -
        c.width - this.horizontalOffset,
    }];
    if (this.noOverlap) {
      for (var k = 0, h = g.length; k < h; k++) {
        var l = {}, n;
        for (n in g[k]) l[n] = g[k][n];
        g.push(l);
      }
      g[0].top = g[1].top += e.height;
      g[2].top = g[3].top -= e.height;
      g[4].left = g[6].left += e.width;
      g[5].left = g[7].left -= e.width;
    }
    b = 'auto' === b ? null : b;
    a = 'auto' === a ? null : a;
    a && 'center' !== a || (g.push({
      verticalAlign: 'top',
      horizontalAlign: 'center',
      top: e.top + this.verticalOffset + (this.noOverlap ? e.height : 0),
      left: e.left - d.width / 2 + e.width / 2 + this.horizontalOffset,
    }), g.push({
      verticalAlign: 'bottom',
      horizontalAlign: 'center',
      top: e.bottom - c.height - this.verticalOffset - (this.noOverlap ? e.height : 0),
      left: e.left - d.width / 2 + e.width / 2 + this.horizontalOffset,
    }));
    b && 'middle' !== b || (g.push({
      verticalAlign: 'middle',
      horizontalAlign: 'left',
      top: e.top - d.height / 2 + e.height / 2 + this.verticalOffset,
      left: e.left + this.horizontalOffset + (this.noOverlap ? e.width : 0),
    }), g.push({
      verticalAlign: 'middle',
      horizontalAlign: 'right',
      top: e.top - d.height / 2 + e.height / 2 + this.verticalOffset,
      left: e.right - c.width - this.horizontalOffset - (this.noOverlap ?
        e.width : 0),
    }));
    'middle' === b && 'center' === a && g.push({
      verticalAlign: 'middle',
      horizontalAlign: 'center',
      top: e.top - d.height / 2 + e.height / 2 + this.verticalOffset,
      left: e.left - d.width / 2 + e.width / 2 + this.horizontalOffset,
    });
    for (k = 0; k < g.length; k++) {
      d = g[k];
      e = d.verticalAlign === b;
      h = d.horizontalAlign === a;
      if (!this.dynamicAlign && !this.noOverlap && e && h) {
        var p = d;
        break;
      }
      l = (!b || e) && (!a || h);
      if (this.dynamicAlign || l) {
        d.offscreenArea = this.__getOffscreenArea(d, c, f);
        if (0 === d.offscreenArea && l) {
          p = d;
          break;
        }
        p = p || d;
        l = d.offscreenArea - p.offscreenArea;
        if (0 > l || 0 === l && (e || h)) p = d;
      }
    }
    return p;
  },
};/*

Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var kk = Element.prototype,
  lk = kk.matches || kk.matchesSelector || kk.mozMatchesSelector || kk.msMatchesSelector || kk.oMatchesSelector || kk.webkitMatchesSelector,
  mk = function() {
  };
m = mk.prototype;
m.getTabbableNodes = function(a) {
  var b = [];
  return (a = this._collectTabbableNodes(a, b)) ? this._sortByTabIndex(b) : b;
};
m.isFocusable = function(a) {
  return lk.call(a, 'input, select, textarea, button, object') ? lk.call(a, ':not([disabled])') : lk.call(a, 'a[href], area[href], iframe, [tabindex], [contentEditable]');
};
m.isTabbable = function(a) {
  return this.isFocusable(a) && lk.call(a, ':not([tabindex="-1"])') && this._isVisible(a);
};
m._normalizedTabIndex = function(a) {
  return this.isFocusable(a) ? (a = a.getAttribute('tabindex') || 0, Number(a)) : -1;
};
m._collectTabbableNodes = function(a, b) {
  if (a.nodeType !== Node.ELEMENT_NODE || !this._isVisible(a)) return !1;
  var c = a, d = this._normalizedTabIndex(c);
  a = 0 < d;
  0 <= d && b.push(c);
  c = 'content' === c.localName || 'slot' === c.localName ? W(c).getDistributedNodes() : W(c.root || c).children;
  for (d = 0; d < c.length; d++) a = this._collectTabbableNodes(c[d], b) || a;
  return a;
};
m._isVisible = function(a) {
  var b = a.style;
  return 'hidden' !== b.visibility && 'none' !== b.display ? (b = window.getComputedStyle(a), 'hidden' !== b.visibility && 'none' !== b.display) : !1;
};
m._sortByTabIndex = function(a) {
  var b = a.length;
  if (2 > b) return a;
  var c = Math.ceil(b / 2);
  b = this._sortByTabIndex(a.slice(0, c));
  a = this._sortByTabIndex(a.slice(c));
  return this._mergeSortByTabIndex(b, a);
};
m._mergeSortByTabIndex = function(a, b) {
  for (var c = []; 0 < a.length && 0 < b.length;) this._hasLowerTabOrder(a[0], b[0]) ? c.push(b.shift()) : c.push(a.shift());
  return c.concat(a, b);
};
m._hasLowerTabOrder = function(a, b) {
  a = Math.max(a.tabIndex, 0);
  b = Math.max(b.tabIndex, 0);
  return 0 === a || 0 === b ? b > a : a > b;
};
var nk = new mk;
var ok = ['\n    <style>\n      :host {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: var(--iron-overlay-backdrop-background-color, #000);\n        opacity: 0;\n        transition: opacity 0.2s;\n        pointer-events: none;\n        @apply --iron-overlay-backdrop;\n      }\n\n      :host(.opened) {\n        opacity: var(--iron-overlay-backdrop-opacity, 0.6);\n        pointer-events: auto;\n        @apply --iron-overlay-backdrop-opened;\n      }\n    </style>\n\n    <slot></slot>\n'];
ok.raw = ok.slice();
Y({
  _template: S(ok),
  is: 'iron-overlay-backdrop',
  properties: { opened: { reflectToAttribute: !0, type: Boolean, value: !1, observer: '_openedChanged' } },
  listeners: { transitionend: '_onTransitionend' },
  created: function() {
    this.__openedRaf = null;
  },
  attached: function() {
    this.opened && this._openedChanged(this.opened);
  },
  prepare: function() {
    this.opened && !this.parentNode && W(document.body).appendChild(this);
  },
  open: function() {
    this.opened = !0;
  },
  close: function() {
    this.opened = !1;
  },
  complete: function() {
    this.opened || this.parentNode !== document.body ||
    W(this.parentNode).removeChild(this);
  },
  _onTransitionend: function(a) {
    a && a.target === this && this.complete();
  },
  _openedChanged: function(a) {
    a ? this.prepare() : (a = window.getComputedStyle(this), '0s' !== a.transitionDuration && 0 != a.opacity || this.complete());
    this.isAttached && (this.__openedRaf && (window.cancelAnimationFrame(this.__openedRaf), this.__openedRaf = null), this.scrollTop = this.scrollTop, this.__openedRaf = window.requestAnimationFrame(function() {
      this.__openedRaf = null;
      this.toggleClass('opened', this.opened);
    }.bind(this)));
  },
});
var pk = function() {
  this._overlays = [];
  this._minimumZ = 101;
  this._backdropElement = null;
  Ug(document.documentElement, 'tap', function() {
  });
  document.addEventListener('tap', this._onCaptureClick.bind(this), !0);
  document.addEventListener('focus', this._onCaptureFocus.bind(this), !0);
  document.addEventListener('keydown', this._onCaptureKeyDown.bind(this), !0);
};
pk.prototype = {
  constructor: pk, get backdropElement() {
    this._backdropElement || (this._backdropElement = document.createElement('iron-overlay-backdrop'));
    return this._backdropElement;
  }, get deepActiveElement() {
    var a = document.activeElement;
    a && !1 !== a instanceof Element || (a = document.body);
    for (; a.root && W(a.root).activeElement;) a = W(a.root).activeElement;
    return a;
  }, _bringOverlayAtIndexToFront: function(a) {
    var b = this._overlays[a];
    if (b) {
      var c = this._overlays.length - 1, d = this._overlays[c];
      d && this._shouldBeBehindOverlay(b,
        d) && c--;
      if (!(a >= c)) {
        d = Math.max(this.currentOverlayZ(), this._minimumZ);
        for (this._getZ(b) <= d && this._applyOverlayZ(b, d); a < c;) this._overlays[a] = this._overlays[a + 1], a++;
        this._overlays[c] = b;
      }
    }
  }, addOrRemoveOverlay: function(a) {
    a.opened ? this.addOverlay(a) : this.removeOverlay(a);
  }, addOverlay: function(a) {
    var b = this._overlays.indexOf(a);
    if (0 <= b) this._bringOverlayAtIndexToFront(b); else {
      b = this._overlays.length;
      var c = this._overlays[b - 1], d = Math.max(this._getZ(c), this._minimumZ), e = this._getZ(a);
      c && this._shouldBeBehindOverlay(a,
        c) && (this._applyOverlayZ(c, d), b--, c = this._overlays[b - 1], d = Math.max(this._getZ(c), this._minimumZ));
      e <= d && this._applyOverlayZ(a, d);
      this._overlays.splice(b, 0, a);
    }
    this.trackBackdrop();
  }, removeOverlay: function(a) {
    a = this._overlays.indexOf(a);
    -1 !== a && (this._overlays.splice(a, 1), this.trackBackdrop());
  }, currentOverlay: function() {
    var a = this._overlays.length - 1;
    return this._overlays[a];
  }, currentOverlayZ: function() {
    return this._getZ(this.currentOverlay());
  }, ensureMinimumZ: function(a) {
    this._minimumZ = Math.max(this._minimumZ,
      a);
  }, focusOverlay: function() {
    var a = this.currentOverlay();
    a && a._applyFocus();
  }, trackBackdrop: function() {
    var a = this._overlayWithBackdrop();
    if (a || this._backdropElement) this.backdropElement.style.zIndex = this._getZ(a) - 1, this.backdropElement.opened = !!a, this.backdropElement.prepare();
  }, getBackdrops: function() {
    for (var a = [], b = 0; b < this._overlays.length; b++) this._overlays[b].withBackdrop && a.push(this._overlays[b]);
    return a;
  }, backdropZ: function() {
    return this._getZ(this._overlayWithBackdrop()) - 1;
  }, _overlayWithBackdrop: function() {
    for (var a =
      this._overlays.length - 1; 0 <= a; a--) if (this._overlays[a].withBackdrop) return this._overlays[a];
  }, _getZ: function(a) {
    var b = this._minimumZ;
    a && (a = Number(a.style.zIndex || window.getComputedStyle(a).zIndex), a === a && (b = a));
    return b;
  }, _setZ: function(a, b) {
    a.style.zIndex = b;
  }, _applyOverlayZ: function(a, b) {
    this._setZ(a, b + 2);
  }, _overlayInPath: function(a) {
    a = a || [];
    for (var b = 0; b < a.length; b++) if (a[b]._manager === this) return a[b];
  }, _onCaptureClick: function(a) {
    var b = this._overlays.length - 1;
    if (-1 !== b) for (var c = W(a).path, d; (d = this._overlays[b]) &&
    this._overlayInPath(c) !== d;) if (d._onCaptureClick(a), d.allowClickThrough) b--; else break;
  }, _onCaptureFocus: function(a) {
    var b = this.currentOverlay();
    b && b._onCaptureFocus(a);
  }, _onCaptureKeyDown: function(a) {
    var b = this.currentOverlay();
    b && (Xd.keyboardEventMatchesKeys(a, 'esc') ? b._onCaptureEsc(a) : Xd.keyboardEventMatchesKeys(a, 'tab') && b._onCaptureTab(a));
  }, _shouldBeBehindOverlay: function(a, b) {
    return !a.alwaysOnTop && b.alwaysOnTop;
  },
};
var qk = new pk;
var rk = 0, sk = 0, tk = null, uk = [], vk = ['wheel', 'mousewheel', 'DOMMouseScroll', 'touchstart', 'touchmove'],
  _boundScrollHandler$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager, wk;
'TODO(modulizer): A namespace named Polymer.IronScrollManager was\ndeclared here. The surrounding comments should be reviewed,\nand this string can then be deleted';
var _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager = [],
  _lockedElementCache$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager = null,
  _unlockedElementCache$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager = null;

function _hasCachedLockedElement$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(a) {
  return -1 < _lockedElementCache$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.indexOf(a);
}

function _hasCachedUnlockedElement$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(a) {
  return -1 < _unlockedElementCache$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.indexOf(a);
}

function _composedTreeContains$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(a, b) {
  var c, d;
  if (a.contains(b)) return !0;
  a = W(a).querySelectorAll('content,slot');
  for (c = 0; c < a.length; ++c) {
    var e = W(a[c]).getDistributedNodes();
    for (d = 0; d < e.length; ++d) if (e[d].nodeType === Node.ELEMENT_NODE && _composedTreeContains$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(e[d], b)) return !0;
  }
  return !1;
}

function _scrollInteractionHandler$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(a) {
  a.cancelable && _shouldPreventScrolling$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(a) && a.preventDefault();
  a.targetTouches && (a = a.targetTouches[0], rk = a.pageX, sk = a.pageY);
}

function _lockScrollInteractions$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager() {
  _boundScrollHandler$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager = _boundScrollHandler$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager || _scrollInteractionHandler$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.bind(void 0);
  for (var a = 0, b = vk.length; a < b; a++) document.addEventListener(vk[a],
    _boundScrollHandler$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager, {
      capture: !0,
      passive: !1,
    });
}

function _unlockScrollInteractions$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager() {
  for (var a = 0, b = vk.length; a < b; a++) document.removeEventListener(vk[a], _boundScrollHandler$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager, {
    capture: !0,
    passive: !1,
  });
}

function _shouldPreventScrolling$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(a) {
  var b = W(a).rootTarget;
  'touchmove' !== a.type && tk !== b && (tk = b, uk = _getScrollableNodes$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(W(a).path));
  if (!uk.length) return !0;
  if ('touchstart' === a.type) return !1;
  a = _getScrollInfo$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(a);
  return !_getScrollingNode$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(uk,
    a.deltaX, a.deltaY);
}

function _getScrollableNodes$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(a) {
  for (var b = [], c = a.indexOf(wk), d = 0; d <= c; d++) if (a[d].nodeType === Node.ELEMENT_NODE) {
    var e = a[d], f = e.style;
    'scroll' !== f.overflow && 'auto' !== f.overflow && (f = window.getComputedStyle(e));
    'scroll' !== f.overflow && 'auto' !== f.overflow || b.push(e);
  }
  return b;
}

function _getScrollingNode$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(a, b, c) {
  if (b || c) for (var d = Math.abs(c) >= Math.abs(b), e = 0; e < a.length; e++) {
    var f = a[e], g;
    if (g = d ? 0 > c ? 0 < f.scrollTop : f.scrollTop < f.scrollHeight - f.clientHeight : 0 > b ? 0 < f.scrollLeft : f.scrollLeft < f.scrollWidth - f.clientWidth) return f;
  }
}

function _getScrollInfo$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(a) {
  var b = { deltaX: a.deltaX, deltaY: a.deltaY };
  'deltaX' in a || ('wheelDeltaX' in a && 'wheelDeltaY' in a ? (b.deltaX = -a.wheelDeltaX, b.deltaY = -a.wheelDeltaY) : 'wheelDelta' in a ? (b.deltaX = 0, b.deltaY = -a.wheelDelta) : 'axis' in a ? (b.deltaX = 1 === a.axis ? a.detail : 0, b.deltaY = 2 === a.axis ? a.detail : 0) : a.targetTouches && (a = a.targetTouches[0], b.deltaX = rk - a.pageX, b.deltaY = sk - a.pageY));
  return b;
};var xk = new Set, yk = {
  properties: {
    _parentResizable: { type: Object, observer: '_parentResizableChanged' },
    _notifyingDescendant: { type: Boolean, value: !1 },
  }, listeners: { 'iron-request-resize-notifications': '_onIronRequestResizeNotifications' }, created: function() {
    this._interestedResizables = [];
    this._boundNotifyResize = this.notifyResize.bind(this);
    this._boundOnDescendantIronResize = this._onDescendantIronResize.bind(this);
  }, attached: function() {
    this._requestResizeNotifications();
  }, detached: function() {
    this._parentResizable ?
      this._parentResizable.stopResizeNotificationsFor(this) : (xk.delete(this), window.removeEventListener('resize', this._boundNotifyResize));
    this._parentResizable = null;
  }, notifyResize: function() {
    this.isAttached && (this._interestedResizables.forEach(function(a) {
      this.resizerShouldNotify(a) && this._notifyDescendant(a);
    }, this), this._fireResize());
  }, assignParentResizable: function(a) {
    this._parentResizable && this._parentResizable.stopResizeNotificationsFor(this);
    (this._parentResizable = a) && -1 === a._interestedResizables.indexOf(this) &&
    (a._interestedResizables.push(this), a._subscribeIronResize(this));
  }, stopResizeNotificationsFor: function(a) {
    var b = this._interestedResizables.indexOf(a);
    -1 < b && (this._interestedResizables.splice(b, 1), this._unsubscribeIronResize(a));
  }, _subscribeIronResize: function(a) {
    a.addEventListener('iron-resize', this._boundOnDescendantIronResize);
  }, _unsubscribeIronResize: function(a) {
    a.removeEventListener('iron-resize', this._boundOnDescendantIronResize);
  }, resizerShouldNotify: function() {
    return !0;
  }, _onDescendantIronResize: function(a) {
    this._notifyingDescendant ?
      a.stopPropagation() : Rb || this._fireResize();
  }, _fireResize: function() {
    this.fire('iron-resize', null, { node: this, bubbles: !1 });
  }, _onIronRequestResizeNotifications: function(a) {
    var b = W(a).rootTarget;
    b !== this && (b.assignParentResizable(this), this._notifyDescendant(b), a.stopPropagation());
  }, _parentResizableChanged: function(a) {
    a && window.removeEventListener('resize', this._boundNotifyResize);
  }, _notifyDescendant: function(a) {
    this.isAttached && (this._notifyingDescendant = !0, a.notifyResize(), this._notifyingDescendant = !1);
  },
  _requestResizeNotifications: function() {
    if (this.isAttached) if ('loading' === document.readyState) {
      var a = this._requestResizeNotifications.bind(this);
      document.addEventListener('readystatechange', function c() {
        document.removeEventListener('readystatechange', c);
        a();
      });
    } else this._findParent(), this._parentResizable ? this._parentResizable._interestedResizables.forEach(function(b) {
      b !== this && b._findParent();
    }, this) : (xk.forEach(function(b) {
      b !== this && b._findParent();
    }, this), window.addEventListener('resize', this._boundNotifyResize),
      this.notifyResize());
  }, _findParent: function() {
    this.assignParentResizable(null);
    this.fire('iron-request-resize-notifications', null, { node: this, bubbles: !0, cancelable: !0 });
    this._parentResizable ? xk.delete(this) : xk.add(this);
  },
};
var zk = {
  properties: {
    opened: { observer: '_openedChanged', type: Boolean, value: !1, notify: !0 },
    canceled: { observer: '_canceledChanged', readOnly: !0, type: Boolean, value: !1 },
    withBackdrop: { observer: '_withBackdropChanged', type: Boolean },
    noAutoFocus: { type: Boolean, value: !1 },
    noCancelOnEscKey: { type: Boolean, value: !1 },
    noCancelOnOutsideClick: { type: Boolean, value: !1 },
    closingReason: { type: Object },
    restoreFocusOnClose: { type: Boolean, value: !1 },
    allowClickThrough: { type: Boolean },
    alwaysOnTop: { type: Boolean },
    scrollAction: { type: String },
    _manager: { type: Object, value: qk },
    _focusedChild: { type: Object },
  },
  listeners: { 'iron-resize': '_onIronResize' },
  observers: ['__updateScrollObservers(isAttached, opened, scrollAction)'],
  get backdropElement() {
    return this._manager.backdropElement;
  },
  get _focusNode() {
    return this._focusedChild || W(this).querySelector('[autofocus]') || this;
  },
  get _focusableNodes() {
    return nk.getTabbableNodes(this);
  },
  ready: function() {
    this.__shouldRemoveTabIndex = this.__isAnimating = !1;
    this.__firstFocusableNode = this.__lastFocusableNode = null;
    this.__rafs = {};
    this.__scrollTop = this.__scrollLeft = this.__restoreFocusNode = null;
    this.__onCaptureScroll = this.__onCaptureScroll.bind(this);
    this.__rootNodes = null;
    this._ensureSetup();
  },
  attached: function() {
    this.opened && this._openedChanged(this.opened);
    this._observer = W(this).observeNodes(this._onNodesChange);
  },
  detached: function() {
    W(this).unobserveNodes(this._observer);
    this._observer = null;
    for (var a in this.__rafs) null !== this.__rafs[a] && cancelAnimationFrame(this.__rafs[a]);
    this.__rafs = {};
    this._manager.removeOverlay(this);
    this.__isAnimating && (this.opened ? this._finishRenderOpened() : (this._applyFocus(), this._finishRenderClosed()));
  },
  toggle: function() {
    this._setCanceled(!1);
    this.opened = !this.opened;
  },
  open: function() {
    this._setCanceled(!1);
    this.opened = !0;
  },
  close: function() {
    this._setCanceled(!1);
    this.opened = !1;
  },
  cancel: function(a) {
    a = this.fire('iron-overlay-canceled', a, { cancelable: !0 });
    a.defaultPrevented || (this._setCanceled(!0), this.opened = !1);
  },
  invalidateTabbables: function() {
    this.__firstFocusableNode = this.__lastFocusableNode =
      null;
  },
  _ensureSetup: function() {
    this._overlaySetup || (this._overlaySetup = !0, this.style.outline = 'none', this.style.display = 'none');
  },
  _openedChanged: function(a) {
    a ? this.removeAttribute('aria-hidden') : this.setAttribute('aria-hidden', 'true');
    this.isAttached && (this.__isAnimating = !0, this.__deraf('__openedChanged', this.__openedChanged));
  },
  _canceledChanged: function() {
    this.closingReason = this.closingReason || {};
    this.closingReason.canceled = this.canceled;
  },
  _withBackdropChanged: function() {
    this.withBackdrop && !this.hasAttribute('tabindex') ?
      (this.setAttribute('tabindex', '-1'), this.__shouldRemoveTabIndex = !0) : this.__shouldRemoveTabIndex && (this.removeAttribute('tabindex'), this.__shouldRemoveTabIndex = !1);
    this.opened && this.isAttached && this._manager.trackBackdrop();
  },
  _prepareRenderOpened: function() {
    this.__restoreFocusNode = this._manager.deepActiveElement;
    this._preparePositioning();
    this.refit();
    this._finishPositioning();
    this.noAutoFocus && document.activeElement === this._focusNode && (this._focusNode.blur(), this.__restoreFocusNode.focus());
  },
  _renderOpened: function() {
    this._finishRenderOpened();
  },
  _renderClosed: function() {
    this._finishRenderClosed();
  },
  _finishRenderOpened: function() {
    this.notifyResize();
    this.__isAnimating = !1;
    this.fire('iron-overlay-opened');
  },
  _finishRenderClosed: function() {
    this.style.display = 'none';
    this.style.zIndex = '';
    this.notifyResize();
    this.__isAnimating = !1;
    this.fire('iron-overlay-closed', this.closingReason);
  },
  _preparePositioning: function() {
    this.style.transition = this.style.webkitTransition = 'none';
    this.style.transform = this.style.webkitTransform = 'none';
    this.style.display = '';
  },
  _finishPositioning: function() {
    this.style.display =
      'none';
    this.scrollTop = this.scrollTop;
    this.style.transition = this.style.webkitTransition = '';
    this.style.transform = this.style.webkitTransform = '';
    this.style.display = '';
    this.scrollTop = this.scrollTop;
  },
  _applyFocus: function() {
    if (this.opened) this.noAutoFocus || this._focusNode.focus(); else {
      if (this.restoreFocusOnClose && this.__restoreFocusNode) {
        var a = this._manager.deepActiveElement;
        (a === document.body || W(this).deepContains(a)) && this.__restoreFocusNode.focus();
      }
      this.__restoreFocusNode = null;
      this._focusNode.blur();
      this._focusedChild = null;
    }
  },
  _onCaptureClick: function(a) {
    this.noCancelOnOutsideClick || this.cancel(a);
  },
  _onCaptureFocus: function(a) {
    if (this.withBackdrop) {
      var b = W(a).path;
      -1 === b.indexOf(this) ? (a.stopPropagation(), this._applyFocus()) : this._focusedChild = b[0];
    }
  },
  _onCaptureEsc: function(a) {
    this.noCancelOnEscKey || this.cancel(a);
  },
  _onCaptureTab: function(a) {
    if (this.withBackdrop) {
      this.__ensureFirstLastFocusables();
      var b = a.shiftKey, c = b ? this.__firstFocusableNode : this.__lastFocusableNode;
      b = b ? this.__lastFocusableNode :
        this.__firstFocusableNode;
      if (c === b) c = !0; else {
        var d = this._manager.deepActiveElement;
        c = d === c || d === this;
      }
      c && (a.preventDefault(), this._focusedChild = b, this._applyFocus());
    }
  },
  _onIronResize: function() {
    this.opened && !this.__isAnimating && this.__deraf('refit', this.refit);
  },
  _onNodesChange: function() {
    this.opened && !this.__isAnimating && (this.invalidateTabbables(), this.notifyResize());
  },
  __ensureFirstLastFocusables: function() {
    var a = this._focusableNodes;
    this.__firstFocusableNode = a[0];
    this.__lastFocusableNode = a[a.length -
    1];
  },
  __openedChanged: function() {
    this.opened ? (this._prepareRenderOpened(), this._manager.addOverlay(this), this._applyFocus(), this._renderOpened()) : (this._manager.removeOverlay(this), this._applyFocus(), this._renderClosed());
  },
  __deraf: function(a, b) {
    var c = this.__rafs;
    null !== c[a] && cancelAnimationFrame(c[a]);
    c[a] = requestAnimationFrame(function() {
      c[a] = null;
      b.call(this);
    }.bind(this));
  },
  __updateScrollObservers: function(a, b, c) {
    a && b && this.__isValidScrollAction(c) ? ('lock' === c && (this.__saveScrollPosition(), 0 <= _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.indexOf(this) ||
    (0 === _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.length && _lockScrollInteractions$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(), _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.push(this), wk = _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager[_lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.length -
    1], _lockedElementCache$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager = [], _unlockedElementCache$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager = [])), this.__addScrollListeners()) : (a = _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.indexOf(this), -1 !== a && (_lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.splice(a, 1), wk = _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager[_lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.length -
    1], _lockedElementCache$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager = [], _unlockedElementCache$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager = [], 0 === _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.length && _unlockScrollInteractions$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager()), this.__removeScrollListeners());
  },
  __addScrollListeners: function() {
    if (!this.__rootNodes) {
      this.__rootNodes =
        [];
      if (Rb) for (var a = this; a;) a.nodeType === Node.DOCUMENT_FRAGMENT_NODE && a.host && this.__rootNodes.push(a), a = a.host || a.assignedSlot || a.parentNode;
      this.__rootNodes.push(document);
    }
    this.__rootNodes.forEach(function(b) {
      b.addEventListener('scroll', this.__onCaptureScroll, { capture: !0, passive: !0 });
    }, this);
  },
  __removeScrollListeners: function() {
    this.__rootNodes && this.__rootNodes.forEach(function(a) {
      a.removeEventListener('scroll', this.__onCaptureScroll, { capture: !0, passive: !0 });
    }, this);
    this.isAttached || (this.__rootNodes =
      null);
  },
  __isValidScrollAction: function(a) {
    return 'lock' === a || 'refit' === a || 'cancel' === a;
  },
  __onCaptureScroll: function(a) {
    if (!(this.__isAnimating || 0 <= W(a).path.indexOf(this))) switch (this.scrollAction) {
      case 'lock':
        this.__restoreScrollPosition();
        break;
      case 'refit':
        this.__deraf('refit', this.refit);
        break;
      case 'cancel':
        this.cancel(a);
    }
  },
  __saveScrollPosition: function() {
    document.scrollingElement ? (this.__scrollTop = document.scrollingElement.scrollTop, this.__scrollLeft = document.scrollingElement.scrollLeft) : (this.__scrollTop =
      Math.max(document.documentElement.scrollTop, document.body.scrollTop), this.__scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft));
  },
  __restoreScrollPosition: function() {
    document.scrollingElement ? (document.scrollingElement.scrollTop = this.__scrollTop, document.scrollingElement.scrollLeft = this.__scrollLeft) : (document.documentElement.scrollTop = document.body.scrollTop = this.__scrollTop, document.documentElement.scrollLeft = document.body.scrollLeft = this.__scrollLeft);
  },
}, Ak = [jk, yk, zk];
var Bk = {
  properties: {
    animationConfig: { type: Object },
    entryAnimation: { observer: '_entryAnimationChanged', type: String },
    exitAnimation: { observer: '_exitAnimationChanged', type: String },
  }, _entryAnimationChanged: function() {
    this.animationConfig = this.animationConfig || {};
    this.animationConfig.entry = [{ name: this.entryAnimation, node: this }];
  }, _exitAnimationChanged: function() {
    this.animationConfig = this.animationConfig || {};
    this.animationConfig.exit = [{ name: this.exitAnimation, node: this }];
  }, _copyProperties: function(a, b) {
    for (var c in b) a[c] =
      b[c];
  }, _cloneConfig: function(a) {
    var b = { isClone: !0 };
    this._copyProperties(b, a);
    return b;
  }, _getAnimationConfigRecursive: function(a, b, c) {
    if (this.animationConfig) if (this.animationConfig.value && 'function' === typeof this.animationConfig.value) this._warn(this._logf('playAnimation', 'Please put \'animationConfig\' inside of your components \'properties\' object instead of outside of it.')); else {
      var d = a ? this.animationConfig[a] : this.animationConfig;
      Array.isArray(d) || (d = [d]);
      if (d) for (var e, f = 0; e = d[f]; f++) if (e.animatable) e.animatable._getAnimationConfigRecursive(e.type ||
        a, b, c); else if (e.id) {
        var g = b[e.id];
        g ? (g.isClone || (b[e.id] = this._cloneConfig(g), g = b[e.id]), this._copyProperties(g, e)) : b[e.id] = e;
      } else c.push(e);
    }
  }, getAnimationConfig: function(a) {
    var b = {}, c = [];
    this._getAnimationConfigRecursive(a, b, c);
    for (var d in b) c.push(b[d]);
    return c;
  },
};
var Ck = {
  _configureAnimations: function(a) {
    var b = [], c = [];
    if (0 < a.length) for (var d, e = 0; d = a[e]; e++) {
      var f = document.createElement(d.name);
      if (f.isNeonAnimation) {
        var g = null;
        f.configure || (f.configure = function() {
          return null;
        });
        g = f.configure(d);
        c.push({ result: g, config: d });
      } else console.warn(this.is + ':', d.name, 'not found!');
    }
    for (a = 0; a < c.length; a++) {
      g = c[a].result;
      d = c[a].config;
      try {
        'function' != typeof g.cancel && (g = document.timeline.play(g));
      } catch (k) {
        g = null, console.warn('Couldnt play', '(', d.name, ').', k);
      }
      g && b.push({
        neonAnimation: f,
        config: d, animation: g,
      });
    }
    return b;
  }, _shouldComplete: function(a) {
    for (var b = !0, c = 0; c < a.length; c++) if ('finished' != a[c].animation.playState) {
      b = !1;
      break;
    }
    return b;
  }, _complete: function(a) {
    for (var b = 0; b < a.length; b++) a[b].neonAnimation.complete(a[b].config);
    for (b = 0; b < a.length; b++) a[b].animation.cancel();
  }, playAnimation: function(a, b) {
    var c = this.getAnimationConfig(a);
    if (c) {
      this._active = this._active || {};
      this._active[a] && (this._complete(this._active[a]), delete this._active[a]);
      var d = this._configureAnimations(c);
      if (0 ==
        d.length) this.fire('neon-animation-finish', b, { bubbles: !1 }); else for (this._active[a] = d, c = 0; c < d.length; c++) d[c].animation.onfinish = function() {
        this._shouldComplete(d) && (this._complete(d), delete this._active[a], this.fire('neon-animation-finish', b, { bubbles: !1 }));
      }.bind(this);
    }
  }, cancelAnimation: function() {
    for (var a in this._active) {
      var b = this._active[a], c;
      for (c in b) b[c].animation.cancel();
    }
    this._active = {};
  },
}, Dk = [Bk, Ck];
var Ek = ['\n    <style>\n      :host {\n        position: fixed;\n      }\n\n      #contentWrapper ::slotted(*) {\n        overflow: auto;\n      }\n\n      #contentWrapper.animating ::slotted(*) {\n        overflow: hidden;\n        pointer-events: none;\n      }\n    </style>\n\n    <div id="contentWrapper">\n      <slot id="content" name="dropdown-content"></slot>\n    </div>\n'];
Ek.raw = Ek.slice();
Y({
  _template: S(Ek),
  is: 'iron-dropdown',
  behaviors: [tj, Xd, Ak, Dk],
  properties: {
    horizontalAlign: { type: String, value: 'left', reflectToAttribute: !0 },
    verticalAlign: { type: String, value: 'top', reflectToAttribute: !0 },
    openAnimationConfig: { type: Object },
    closeAnimationConfig: { type: Object },
    focusTarget: { type: Object },
    noAnimations: { type: Boolean, value: !1 },
    allowOutsideScroll: { type: Boolean, value: !1, observer: '_allowOutsideScrollChanged' },
  },
  listeners: { 'neon-animation-finish': '_onNeonAnimationFinish' },
  observers: ['_updateOverlayPosition(positionTarget, verticalAlign, horizontalAlign, verticalOffset, horizontalOffset)'],
  get containedElement() {
    for (var a = W(this.$.content).getDistributedNodes(), b = 0, c = a.length; b < c; b++) if (a[b].nodeType === Node.ELEMENT_NODE) return a[b];
  },
  ready: function() {
    this.scrollAction || (this.scrollAction = this.allowOutsideScroll ? 'refit' : 'lock');
    this._readied = !0;
  },
  attached: function() {
    this.sizingTarget && this.sizingTarget !== this || (this.sizingTarget = this.containedElement || this);
  },
  detached: function() {
    this.cancelAnimation();
  },
  _openedChanged: function() {
    this.opened && this.disabled ? this.cancel() : (this.cancelAnimation(),
      this._updateAnimationConfig(), zk._openedChanged.apply(this, arguments));
  },
  _renderOpened: function() {
    !this.noAnimations && this.animationConfig.open ? (this.$.contentWrapper.classList.add('animating'), this.playAnimation('open')) : zk._renderOpened.apply(this, arguments);
  },
  _renderClosed: function() {
    !this.noAnimations && this.animationConfig.close ? (this.$.contentWrapper.classList.add('animating'), this.playAnimation('close')) : zk._renderClosed.apply(this, arguments);
  },
  _onNeonAnimationFinish: function() {
    this.$.contentWrapper.classList.remove('animating');
    this.opened ? this._finishRenderOpened() : this._finishRenderClosed();
  },
  _updateAnimationConfig: function() {
    for (var a = this.containedElement, b = [].concat(this.openAnimationConfig || []).concat(this.closeAnimationConfig || []), c = 0; c < b.length; c++) b[c].node = a;
    this.animationConfig = { open: this.openAnimationConfig, close: this.closeAnimationConfig };
  },
  _updateOverlayPosition: function() {
    this.isAttached && this.notifyResize();
  },
  _allowOutsideScrollChanged: function(a) {
    this._readied && (a ? this.scrollAction && 'lock' !== this.scrollAction ||
      (this.scrollAction = 'refit') : this.scrollAction = 'lock');
  },
  _applyFocus: function() {
    var a = this.focusTarget || this.containedElement;
    a && this.opened && !this.noAutoFocus ? a.focus() : zk._applyFocus.apply(this, arguments);
  },
});
var Fk = {
  properties: {
    animationTiming: {
      type: Object, value: function() {
        return { duration: 500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'both' };
      },
    },
  }, isNeonAnimation: !0, created: function() {
    document.body.animate || console.warn('No web animations detected. This element will not function without a web animations polyfill.');
  }, timingFromConfig: function(a) {
    if (a.timing) for (var b in a.timing) this.animationTiming[b] = a.timing[b];
    return this.animationTiming;
  }, setPrefixedProperty: function(a, b, c) {
    var d = {
      transform: ['webkitTransform'],
      transformOrigin: ['mozTransformOrigin', 'webkitTransformOrigin'],
    };
    d = d[b];
    for (var e, f = 0; e = d[f]; f++) a.style[e] = c;
    a.style[b] = c;
  }, complete: function() {
  },
};
Y({
  is: 'fade-in-animation', _template: null, behaviors: [Fk], configure: function(a) {
    var b = a.node;
    return this._effect = new KeyframeEffect(b, [{ opacity: '0' }, { opacity: '1' }], this.timingFromConfig(a));
  },
});
Y({
  is: 'fade-out-animation', _template: null, behaviors: [Fk], configure: function(a) {
    var b = a.node;
    return this._effect = new KeyframeEffect(b, [{ opacity: '1' }, { opacity: '0' }], this.timingFromConfig(a));
  },
});
Y({
  is: 'paper-menu-grow-height-animation', _template: null, behaviors: [Fk], configure: function(a) {
    var b = a.node, c = b.getBoundingClientRect();
    c = c.height;
    return this._effect = new KeyframeEffect(b, [{ height: c / 2 + 'px' }, { height: c + 'px' }], this.timingFromConfig(a));
  },
});
Y({
  is: 'paper-menu-grow-width-animation', _template: null, behaviors: [Fk], configure: function(a) {
    var b = a.node, c = b.getBoundingClientRect();
    c = c.width;
    return this._effect = new KeyframeEffect(b, [{ width: c / 2 + 'px' }, { width: c + 'px' }], this.timingFromConfig(a));
  },
});
Y({
  is: 'paper-menu-shrink-width-animation', _template: null, behaviors: [Fk], configure: function(a) {
    var b = a.node, c = b.getBoundingClientRect();
    c = c.width;
    return this._effect = new KeyframeEffect(b, [{ width: c + 'px' }, { width: c - c / 20 + 'px' }], this.timingFromConfig(a));
  },
});
Y({
  is: 'paper-menu-shrink-height-animation', _template: null, behaviors: [Fk], configure: function(a) {
    var b = a.node, c = b.getBoundingClientRect();
    c = c.height;
    this.setPrefixedProperty(b, 'transformOrigin', '0 0');
    return this._effect = new KeyframeEffect(b, [{
      height: c + 'px',
      transform: 'translateY(0)',
    }, { height: c / 2 + 'px', transform: 'translateY(-20px)' }], this.timingFromConfig(a));
  },
});
var Gk = document.createElement('template');
Gk.setAttribute('style', 'display: none;');
Gk.innerHTML = '<custom-style>\n  <style is="custom-style">\n    html {\n\n      --shadow-transition: {\n        transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);\n      };\n\n      --shadow-none: {\n        box-shadow: none;\n      };\n\n      /* from http://codepen.io/shyndman/pen/c5394ddf2e8b2a5c9185904b57421cdb */\n\n      --shadow-elevation-2dp: {\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n                    0 1px 5px 0 rgba(0, 0, 0, 0.12),\n                    0 3px 1px -2px rgba(0, 0, 0, 0.2);\n      };\n\n      --shadow-elevation-3dp: {\n        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),\n                    0 1px 8px 0 rgba(0, 0, 0, 0.12),\n                    0 3px 3px -2px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-4dp: {\n        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),\n                    0 1px 10px 0 rgba(0, 0, 0, 0.12),\n                    0 2px 4px -1px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-6dp: {\n        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),\n                    0 1px 18px 0 rgba(0, 0, 0, 0.12),\n                    0 3px 5px -1px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-8dp: {\n        box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),\n                    0 3px 14px 2px rgba(0, 0, 0, 0.12),\n                    0 5px 5px -3px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-12dp: {\n        box-shadow: 0 12px 16px 1px rgba(0, 0, 0, 0.14),\n                    0 4px 22px 3px rgba(0, 0, 0, 0.12),\n                    0 6px 7px -4px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-16dp: {\n        box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),\n                    0  6px 30px 5px rgba(0, 0, 0, 0.12),\n                    0  8px 10px -5px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-24dp: {\n        box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),\n                    0 9px 46px 8px rgba(0, 0, 0, 0.12),\n                    0 11px 15px -7px rgba(0, 0, 0, 0.4);\n      };\n    }\n  </style>\n</custom-style>';
document.head.appendChild(Gk.content);
var Hk = ['\n    <style>\n      :host {\n        display: inline-block;\n        position: relative;\n        padding: 8px;\n        outline: none;\n\n        @apply --paper-menu-button;\n      }\n\n      :host([disabled]) {\n        cursor: auto;\n        color: var(--disabled-text-color);\n\n        @apply --paper-menu-button-disabled;\n      }\n\n      iron-dropdown {\n        @apply --paper-menu-button-dropdown;\n      }\n\n      .dropdown-content {\n        @apply --shadow-elevation-2dp;\n\n        position: relative;\n        border-radius: 2px;\n        background-color: var(--paper-menu-button-dropdown-background, var(--primary-background-color));\n\n        @apply --paper-menu-button-content;\n      }\n\n      :host([vertical-align="top"]) .dropdown-content {\n        margin-bottom: 20px;\n        margin-top: -10px;\n        top: 10px;\n      }\n\n      :host([vertical-align="bottom"]) .dropdown-content {\n        bottom: 10px;\n        margin-bottom: -10px;\n        margin-top: 20px;\n      }\n\n      #trigger {\n        cursor: pointer;\n      }\n    </style>\n\n    <div id="trigger" on-tap="toggle">\n      <slot name="dropdown-trigger"></slot>\n    </div>\n\n    <iron-dropdown id="dropdown" opened="{{opened}}" horizontal-align="[[horizontalAlign]]" vertical-align="[[verticalAlign]]" dynamic-align="[[dynamicAlign]]" horizontal-offset="[[horizontalOffset]]" vertical-offset="[[verticalOffset]]" no-overlap="[[noOverlap]]" open-animation-config="[[openAnimationConfig]]" close-animation-config="[[closeAnimationConfig]]" no-animations="[[noAnimations]]" focus-target="[[_dropdownContent]]" allow-outside-scroll="[[allowOutsideScroll]]" restore-focus-on-close="[[restoreFocusOnClose]]" on-iron-overlay-canceled="__onIronOverlayCanceled">\n      <div slot="dropdown-content" class="dropdown-content">\n        <slot id="content" name="dropdown-content"></slot>\n      </div>\n    </iron-dropdown>\n'];
Hk.raw = Hk.slice();
var Ik = { ANIMATION_CUBIC_BEZIER: 'cubic-bezier(.3,.95,.5,1)', MAX_ANIMATION_TIME_MS: 400 }, Jk = function() {
};
m = Jk.prototype;
m.registered = function() {
  this._prepKeyBindings();
};
m.addOwnKeyBinding = function(a, b) {
  this._imperativeKeyBindings[a] = b;
  this._prepKeyBindings();
  this._resetKeyEventListeners();
};
m.removeOwnKeyBindings = function() {
  this._imperativeKeyBindings = {};
  this._prepKeyBindings();
  this._resetKeyEventListeners();
};
m.keyboardEventMatchesKeys = function(a, b) {
  b = Wd(b);
  for (var c = 0; c < b.length; ++c) if (Ud(b[c], a)) return !0;
  return !1;
};
m._collectKeyBindings = function() {
  var a = this.behaviors.map(function(b) {
    return b.keyBindings;
  });
  -1 === a.indexOf(this.keyBindings) && a.push(this.keyBindings);
  return a;
};
m._prepKeyBindings = function() {
  this._keyBindings = {};
  this._collectKeyBindings().forEach(function(c) {
    for (var d in c) this._addKeyBinding(d, c[d]);
  }, this);
  for (var a in this._imperativeKeyBindings) this._addKeyBinding(a, this._imperativeKeyBindings[a]);
  for (var b in this._keyBindings) this._keyBindings[b].sort(function(c, d) {
    c = c[0].hasModifiers;
    d = d[0].hasModifiers;
    return c === d ? 0 : c ? -1 : 1;
  });
};
m._addKeyBinding = function(a, b) {
  Wd(a).forEach(function(c) {
    this._keyBindings[c.event] = this._keyBindings[c.event] || [];
    this._keyBindings[c.event].push([c, b]);
  }, this);
};
m._resetKeyEventListeners = function() {
  this._unlistenKeyEventListeners();
  this.isAttached && this._listenKeyEventListeners();
};
m._listenKeyEventListeners = function() {
  this.keyEventTarget && Object.keys(this._keyBindings).forEach(function(a) {
    var b = this._keyBindings[a];
    b = this._onKeyBindingEvent.bind(this, b);
    this._boundKeyHandlers.push([this.keyEventTarget, a, b]);
    this.keyEventTarget.addEventListener(a, b);
  }, this);
};
m._unlistenKeyEventListeners = function() {
  for (var a, b, c; this._boundKeyHandlers.length;) a = this._boundKeyHandlers.pop(), b = a[0], c = a[1], a = a[2], b.removeEventListener(c, a);
};
m._onKeyBindingEvent = function(a, b) {
  this.stopKeyboardEventPropagation && b.stopPropagation();
  if (!b.defaultPrevented) for (var c = 0; c < a.length; c++) {
    var d = a[c][0], e = a[c][1];
    if (Ud(d, b) && (this._triggerKeyHandler(d, e, b), b.defaultPrevented)) break;
  }
};
m._triggerKeyHandler = function(a, b, c) {
  var d = Object.create(a);
  d.keyboardEvent = c;
  a = new CustomEvent(a.event, { detail: d, cancelable: !0 });
  this[b].call(this, a);
  a.defaultPrevented && c.preventDefault();
};
m._focusBlurHandler = function(a) {
  this._setFocused('focus' === a.type);
};
m._changedControlState = function() {
  this._controlStateChanged && this._controlStateChanged();
};
m._setFocused = function() {
};
Jk = Y({
  _template: S(Hk),
  is: 'paper-menu-button',
  behaviors: [Xd, tj],
  properties: {
    opened: { type: Boolean, value: !1, notify: !0, observer: '_openedChanged' },
    horizontalAlign: { type: String, value: 'left', reflectToAttribute: !0 },
    verticalAlign: { type: String, value: 'top', reflectToAttribute: !0 },
    dynamicAlign: { type: Boolean },
    horizontalOffset: { type: Number, value: 0, notify: !0 },
    verticalOffset: { type: Number, value: 0, notify: !0 },
    noOverlap: { type: Boolean },
    noAnimations: { type: Boolean, value: !1 },
    ignoreSelect: { type: Boolean, value: !1 },
    closeOnActivate: {
      type: Boolean,
      value: !1,
    },
    openAnimationConfig: {
      type: Object, value: function() {
        return [{
          name: 'fade-in-animation',
          timing: { delay: 100, duration: 200 },
        }, {
          name: 'paper-menu-grow-width-animation',
          timing: { delay: 100, duration: 150, easing: Ik.ANIMATION_CUBIC_BEZIER },
        }, {
          name: 'paper-menu-grow-height-animation',
          timing: { delay: 100, duration: 275, easing: Ik.ANIMATION_CUBIC_BEZIER },
        }];
      },
    },
    closeAnimationConfig: {
      type: Object, value: function() {
        return [{ name: 'fade-out-animation', timing: { duration: 150 } }, {
          name: 'paper-menu-shrink-width-animation', timing: {
            delay: 100,
            duration: 50, easing: Ik.ANIMATION_CUBIC_BEZIER,
          },
        }, { name: 'paper-menu-shrink-height-animation', timing: { duration: 200, easing: 'ease-in' } }];
      },
    },
    allowOutsideScroll: { type: Boolean, value: !1 },
    restoreFocusOnClose: { type: Boolean, value: !0 },
    _dropdownContent: { type: Object },
  },
  hostAttributes: { role: 'group', 'aria-haspopup': 'true' },
  listeners: { 'iron-activate': '_onIronActivate', 'iron-select': '_onIronSelect' },
  get contentElement() {
    for (var a = W(this.$.content).getDistributedNodes(), b = 0, c = a.length; b < c; b++) if (a[b].nodeType === Node.ELEMENT_NODE) return a[b];
  },
  toggle: function() {
    this.opened ? this.close() : this.open();
  },
  open: function() {
    this.disabled || this.$.dropdown.open();
  },
  close: function() {
    this.$.dropdown.close();
  },
  _onIronSelect: function() {
    this.ignoreSelect || this.close();
  },
  _onIronActivate: function() {
    this.closeOnActivate && this.close();
  },
  _openedChanged: function(a, b) {
    a ? (this._dropdownContent = this.contentElement, this.fire('paper-dropdown-open')) : null != b && this.fire('paper-dropdown-close');
  },
  _disabledChanged: function(a) {
    tj._disabledChanged.apply(this, arguments);
    a && this.opened &&
    this.close();
  },
  __onIronOverlayCanceled: function(a) {
    var b = a.detail, c = this.$.trigger;
    b = W(b).path;
    -1 < b.indexOf(c) && a.preventDefault();
  },
});
Object.keys(Ik).forEach(function(a) {
  Jk[a] = Ik[a];
});
var Kk = ['\n    <style include="paper-dropdown-menu-shared-styles"></style>\n\n    \x3c!-- this div fulfills an a11y requirement for combobox, do not remove --\x3e\n    <span role="button"></span>\n    <paper-menu-button id="menuButton" vertical-align="[[verticalAlign]]" horizontal-align="[[horizontalAlign]]" dynamic-align="[[dynamicAlign]]" vertical-offset="[[_computeMenuVerticalOffset(noLabelFloat, verticalOffset)]]" disabled="[[disabled]]" no-animations="[[noAnimations]]" on-iron-select="_onIronSelect" on-iron-deselect="_onIronDeselect" opened="{{opened}}" close-on-activate="" allow-outside-scroll="[[allowOutsideScroll]]" restore-focus-on-close="[[restoreFocusOnClose]]">\n      \x3c!-- support hybrid mode: user might be using paper-menu-button 1.x which distributes via <content> --\x3e\n      <div class="dropdown-trigger" slot="dropdown-trigger">\n        <paper-ripple></paper-ripple>\n        \x3c!-- paper-input has type="text" for a11y, do not remove --\x3e\n        <paper-input type="text" invalid="[[invalid]]" readonly="" disabled="[[disabled]]" value="[[value]]" placeholder="[[placeholder]]" error-message="[[errorMessage]]" always-float-label="[[alwaysFloatLabel]]" no-label-float="[[noLabelFloat]]" label="[[label]]">\n          \x3c!-- support hybrid mode: user might be using paper-input 1.x which distributes via <content> --\x3e\n          <iron-icon icon="paper-dropdown-menu:arrow-drop-down" suffix="" slot="suffix"></iron-icon>\n        </paper-input>\n      </div>\n      <slot id="content" name="dropdown-content" slot="dropdown-content"></slot>\n    </paper-menu-button>\n'];
Kk.raw = Kk.slice();
Y({
  _template: S(Kk),
  is: 'paper-dropdown-menu',
  behaviors: [vj, tj, mj, qj],
  properties: {
    selectedItemLabel: { type: String, notify: !0, readOnly: !0 },
    selectedItem: { type: Object, notify: !0, readOnly: !0 },
    value: { type: String, notify: !0 },
    label: { type: String },
    placeholder: { type: String },
    errorMessage: { type: String },
    opened: { type: Boolean, notify: !0, value: !1, observer: '_openedChanged' },
    allowOutsideScroll: { type: Boolean, value: !1 },
    noLabelFloat: { type: Boolean, value: !1, reflectToAttribute: !0 },
    alwaysFloatLabel: { type: Boolean, value: !1 },
    noAnimations: {
      type: Boolean,
      value: !1,
    },
    horizontalAlign: { type: String, value: 'right' },
    verticalAlign: { type: String, value: 'top' },
    verticalOffset: Number,
    dynamicAlign: { type: Boolean },
    restoreFocusOnClose: { type: Boolean, value: !0 },
  },
  listeners: { tap: '_onTap' },
  keyBindings: { 'up down': 'open', esc: 'close' },
  hostAttributes: { role: 'combobox', 'aria-autocomplete': 'none', 'aria-haspopup': 'true' },
  observers: ['_selectedItemChanged(selectedItem)'],
  attached: function() {
    var a = this.contentElement;
    a && a.selectedItem && this._setSelectedItem(a.selectedItem);
  },
  get contentElement() {
    for (var a =
      W(this.$.content).getDistributedNodes(), b = 0, c = a.length; b < c; b++) if (a[b].nodeType === Node.ELEMENT_NODE) return a[b];
  },
  open: function() {
    this.$.menuButton.open();
  },
  close: function() {
    this.$.menuButton.close();
  },
  _onIronSelect: function(a) {
    this._setSelectedItem(a.detail.item);
  },
  _onIronDeselect: function() {
    this._setSelectedItem(null);
  },
  _onTap: function(a) {
    _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(a) === this && this.open();
  },
  _selectedItemChanged: function(a) {
    this.value = a = a ? a.label ||
      a.getAttribute('label') || a.textContent.trim() : '';
    this._setSelectedItemLabel(a);
  },
  _computeMenuVerticalOffset: function(a, b) {
    return b ? b : a ? -4 : 8;
  },
  _getValidity: function() {
    return this.disabled || !this.required || this.required && !!this.value;
  },
  _openedChanged: function() {
    var a = this.opened ? 'true' : 'false', b = this.contentElement;
    b && b.setAttribute('aria-expanded', a);
  },
});
var Lk = { hostAttributes: { role: 'option', tabindex: '0' } }, Mk = [vj, tj, Lk];
var Nk = document.createElement('template');
Nk.setAttribute('style', 'display: none;');
Nk.innerHTML = '<dom-module id="paper-item-shared-styles">\n  <template>\n    <style>\n      :host, .paper-item {\n        display: block;\n        position: relative;\n        min-height: var(--paper-item-min-height, 48px);\n        padding: 0px 16px;\n      }\n\n      .paper-item {\n        @apply --paper-font-subhead;\n        border:none;\n        outline: none;\n        background: white;\n        width: 100%;\n        text-align: left;\n      }\n\n      :host([hidden]), .paper-item[hidden] {\n        display: none !important;\n      }\n\n      :host(.iron-selected), .paper-item.iron-selected {\n        font-weight: var(--paper-item-selected-weight, bold);\n\n        @apply --paper-item-selected;\n      }\n\n      :host([disabled]), .paper-item[disabled] {\n        color: var(--paper-item-disabled-color, var(--disabled-text-color));\n\n        @apply --paper-item-disabled;\n      }\n\n      :host(:focus), .paper-item:focus {\n        position: relative;\n        outline: 0;\n\n        @apply --paper-item-focused;\n      }\n\n      :host(:focus):before, .paper-item:focus:before {\n        @apply --layout-fit;\n\n        background: currentColor;\n        content: \'\';\n        opacity: var(--dark-divider-opacity);\n        pointer-events: none;\n\n        @apply --paper-item-focused-before;\n      }\n    </style>\n  </template>\n</dom-module>';
document.head.appendChild(Nk.content);
var Ok = ['\n    <style include="paper-item-shared-styles">\n      :host {\n        @apply --layout-horizontal;\n        @apply --layout-center;\n        @apply --paper-font-subhead;\n\n        @apply --paper-item;\n      }\n    </style>\n    <slot></slot>\n'];
Ok.raw = Ok.slice();
Y({ _template: S(Ok), is: 'paper-item', behaviors: [Mk] });
var Pk = function(a) {
  this.selection = [];
  this.selectCallback = a;
};
m = Pk.prototype;
m.get = function() {
  return this.multi ? this.selection.slice() : this.selection[0];
};
m.clear = function(a) {
  this.selection.slice().forEach(function(b) {
    (!a || 0 > a.indexOf(b)) && this.setItemSelected(b, !1);
  }, this);
};
m.isSelected = function(a) {
  return 0 <= this.selection.indexOf(a);
};
m.setItemSelected = function(a, b) {
  if (null != a && b !== this.isSelected(a)) {
    if (b) this.selection.push(a); else {
      var c = this.selection.indexOf(a);
      0 <= c && this.selection.splice(c, 1);
    }
    this.selectCallback && this.selectCallback(a, b);
  }
};
m.select = function(a) {
  this.multi ? this.toggle(a) : this.get() !== a && (this.setItemSelected(this.get(), !1), this.setItemSelected(a, !0));
};
m.toggle = function(a) {
  this.setItemSelected(a, !this.isSelected(a));
};
var Qk = {
  properties: {
    attrForSelected: { type: String, value: null },
    selected: { type: String, notify: !0 },
    selectedItem: { type: Object, readOnly: !0, notify: !0 },
    activateEvent: { type: String, value: 'tap', observer: '_activateEventChanged' },
    selectable: String,
    selectedClass: { type: String, value: 'iron-selected' },
    selectedAttribute: { type: String, value: null },
    fallbackSelection: { type: String, value: null },
    items: {
      type: Array, readOnly: !0, notify: !0, value: function() {
        return [];
      },
    },
    _excludedLocalNames: {
      type: Object, value: function() {
        return {
          template: 1,
          'dom-bind': 1, 'dom-if': 1, 'dom-repeat': 1,
        };
      },
    },
  },
  observers: ['_updateAttrForSelected(attrForSelected)', '_updateSelected(selected)', '_checkFallback(fallbackSelection)'],
  created: function() {
    this._bindFilterItem = this._filterItem.bind(this);
    this._selection = new Pk(this._applySelection.bind(this));
  },
  attached: function() {
    this._observer = this._observeItems(this);
    this._addListener(this.activateEvent);
  },
  detached: function() {
    this._observer && W(this).unobserveNodes(this._observer);
    this._removeListener(this.activateEvent);
  },
  indexOf: function(a) {
    return this.items ? this.items.indexOf(a) : -1;
  },
  select: function(a) {
    this.selected = a;
  },
  selectPrevious: function() {
    var a = this.items.length, b = a - 1;
    void 0 !== this.selected && (b = (Number(this._valueToIndex(this.selected)) - 1 + a) % a);
    this.selected = this._indexToValue(b);
  },
  selectNext: function() {
    var a = 0;
    void 0 !== this.selected && (a = (Number(this._valueToIndex(this.selected)) + 1) % this.items.length);
    this.selected = this._indexToValue(a);
  },
  selectIndex: function(a) {
    this.select(this._indexToValue(a));
  },
  forceSynchronousItemUpdate: function() {
    this._observer &&
    'function' === typeof this._observer.flush ? this._observer.flush() : this._updateItems();
  },
  get _shouldUpdateSelection() {
    return null != this.selected;
  },
  _checkFallback: function() {
    this._updateSelected();
  },
  _addListener: function(a) {
    this.listen(this, a, '_activateHandler');
  },
  _removeListener: function(a) {
    this.unlisten(this, a, '_activateHandler');
  },
  _activateEventChanged: function(a, b) {
    this._removeListener(b);
    this._addListener(a);
  },
  _updateItems: function() {
    var a = W(this).queryDistributedElements(this.selectable || '*');
    a = Array.prototype.filter.call(a,
      this._bindFilterItem);
    this._setItems(a);
  },
  _updateAttrForSelected: function() {
    this.selectedItem && (this.selected = this._valueForItem(this.selectedItem));
  },
  _updateSelected: function() {
    this._selectSelected(this.selected);
  },
  _selectSelected: function() {
    if (this.items) {
      var a = this._valueToItem(this.selected);
      a ? this._selection.select(a) : this._selection.clear();
      this.fallbackSelection && this.items.length && void 0 === this._selection.get() && (this.selected = this.fallbackSelection);
    }
  },
  _filterItem: function(a) {
    return !this._excludedLocalNames[a.localName];
  },
  _valueToItem: function(a) {
    return null == a ? null : this.items[this._valueToIndex(a)];
  },
  _valueToIndex: function(a) {
    if (this.attrForSelected) for (var b = 0, c; c = this.items[b]; b++) {
      if (this._valueForItem(c) == a) return b;
    } else return Number(a);
  },
  _indexToValue: function(a) {
    if (this.attrForSelected) {
      if (a = this.items[a]) return this._valueForItem(a);
    } else return a;
  },
  _valueForItem: function(a) {
    if (!a) return null;
    if (!this.attrForSelected) return a = this.indexOf(a), -1 === a ? null : a;
    var b = a[ue(this.attrForSelected)];
    return void 0 != b ? b : a.getAttribute(this.attrForSelected);
  },
  _applySelection: function(a, b) {
    this.selectedClass && this.toggleClass(this.selectedClass, b, a);
    this.selectedAttribute && this.toggleAttribute(this.selectedAttribute, b, a);
    this._selectionChange();
    this.fire('iron-' + (b ? 'select' : 'deselect'), { item: a });
  },
  _selectionChange: function() {
    this._setSelectedItem(this._selection.get());
  },
  _observeItems: function(a) {
    return W(a).observeNodes(function(b) {
      this._updateItems();
      this._updateSelected();
      this.fire('iron-items-changed', b, { bubbles: !1, cancelable: !1 });
    });
  },
  _activateHandler: function(a) {
    a =
      a.target;
    for (var b = this.items; a && a != this;) {
      var c = b.indexOf(a);
      if (0 <= c) {
        b = this._indexToValue(c);
        this._itemActivate(b, a);
        break;
      }
      a = a.parentNode;
    }
  },
  _itemActivate: function(a, b) {
    this.fire('iron-activate', { selected: a, item: b }, { cancelable: !0 }).defaultPrevented || this.select(a);
  },
};
var Rk = {
  properties: {
    multi: { type: Boolean, value: !1, observer: 'multiChanged' },
    selectedValues: {
      type: Array, notify: !0, value: function() {
        return [];
      },
    },
    selectedItems: {
      type: Array, readOnly: !0, notify: !0, value: function() {
        return [];
      },
    },
  }, observers: ['_updateSelected(selectedValues.splices)'], select: function(a) {
    this.multi ? this._toggleSelected(a) : this.selected = a;
  }, multiChanged: function(a) {
    this._selection.multi = a;
    this._updateSelected();
  }, get _shouldUpdateSelection() {
    return null != this.selected || null != this.selectedValues && this.selectedValues.length;
  },
  _updateAttrForSelected: function() {
    this.multi ? this.selectedItems && 0 < this.selectedItems.length && (this.selectedValues = this.selectedItems.map(function(a) {
      return this._indexToValue(this.indexOf(a));
    }, this).filter(function(a) {
      return null != a;
    }, this)) : Qk._updateAttrForSelected.apply(this);
  }, _updateSelected: function() {
    this.multi ? this._selectMulti(this.selectedValues) : this._selectSelected(this.selected);
  }, _selectMulti: function(a) {
    a = a || [];
    a = (this._valuesToItems(a) || []).filter(function(c) {
      return null !== c && void 0 !==
        c;
    });
    this._selection.clear(a);
    for (var b = 0; b < a.length; b++) this._selection.setItemSelected(a[b], !0);
    this.fallbackSelection && !this._selection.get().length && (a = this._valueToItem(this.fallbackSelection)) && this.select(this.fallbackSelection);
  }, _selectionChange: function() {
    var a = this._selection.get();
    this.multi ? (this._setSelectedItems(a), this._setSelectedItem(a.length ? a[0] : null)) : null !== a && void 0 !== a ? (this._setSelectedItems([a]), this._setSelectedItem(a)) : (this._setSelectedItems([]), this._setSelectedItem(null));
  },
  _toggleSelected: function(a) {
    var b = this.selectedValues.indexOf(a), c = 0 > b;
    c ? this.push('selectedValues', a) : this.splice('selectedValues', b, 1);
  }, _valuesToItems: function(a) {
    return null == a ? null : a.map(function(b) {
      return this._valueToItem(b);
    }, this);
  },
}, Sk = [Qk, Rk];
var Tk = {
  properties: {
    focusedItem: { observer: '_focusedItemChanged', readOnly: !0, type: Object },
    attrForItemTitle: { type: String },
    disabled: { type: Boolean, value: !1, observer: '_disabledChanged' },
  },
  _MODIFIER_KEYS: 'Alt AltGraph CapsLock Control Fn FnLock Hyper Meta NumLock OS ScrollLock Shift Super Symbol SymbolLock'.split(' '),
  _SEARCH_RESET_TIMEOUT_MS: 1E3,
  _previousTabIndex: 0,
  hostAttributes: { role: 'menu' },
  observers: ['_updateMultiselectable(multi)'],
  listeners: { focus: '_onFocus', keydown: '_onKeydown', 'iron-items-changed': '_onIronItemsChanged' },
  keyBindings: { up: '_onUpKey', down: '_onDownKey', esc: '_onEscKey', 'shift+tab:keydown': '_onShiftTabDown' },
  attached: function() {
    this._resetTabindices();
  },
  select: function(a) {
    this._defaultFocusAsync && (this.cancelAsync(this._defaultFocusAsync), this._defaultFocusAsync = null);
    var b = this._valueToItem(a);
    b && b.hasAttribute('disabled') || (this._setFocusedItem(b), Rk.select.apply(this, arguments));
  },
  _resetTabindices: function() {
    var a = this.multi ? this.selectedItems && this.selectedItems[0] : this.selectedItem;
    this.items.forEach(function(b) {
      b.setAttribute('tabindex',
        b === a ? '0' : '-1');
      b.setAttribute('aria-selected', this._selection.isSelected(b));
    }, this);
  },
  _updateMultiselectable: function(a) {
    a ? this.setAttribute('aria-multiselectable', 'true') : this.removeAttribute('aria-multiselectable');
  },
  _focusWithKeyboardEvent: function(a) {
    if (-1 === this._MODIFIER_KEYS.indexOf(a.key)) {
      this.cancelDebouncer('_clearSearchText');
      var b = this._searchText || '';
      a = a.key && 1 == a.key.length ? a.key : String.fromCharCode(a.keyCode);
      b += a.toLocaleLowerCase();
      a = b.length;
      for (var c = 0, d; d = this.items[c]; c++) if (!d.hasAttribute('disabled')) {
        var e =
          this.attrForItemTitle || 'textContent';
        e = (d[e] || d.getAttribute(e) || '').trim();
        if (!(e.length < a) && e.slice(0, a).toLocaleLowerCase() == b) {
          this._setFocusedItem(d);
          break;
        }
      }
      this._searchText = b;
      this.debounce('_clearSearchText', this._clearSearchText, this._SEARCH_RESET_TIMEOUT_MS);
    }
  },
  _clearSearchText: function() {
    this._searchText = '';
  },
  _focusPrevious: function() {
    for (var a = this.items.length, b = Number(this.indexOf(this.focusedItem)), c = 1; c < a + 1; c++) {
      var d = this.items[(b - c + a) % a];
      if (!d.hasAttribute('disabled')) {
        var e = W(d).getOwnerRoot() ||
          document;
        this._setFocusedItem(d);
        if (W(e).activeElement == d) break;
      }
    }
  },
  _focusNext: function() {
    for (var a = this.items.length, b = Number(this.indexOf(this.focusedItem)), c = 1; c < a + 1; c++) {
      var d = this.items[(b + c) % a];
      if (!d.hasAttribute('disabled')) {
        var e = W(d).getOwnerRoot() || document;
        this._setFocusedItem(d);
        if (W(e).activeElement == d) break;
      }
    }
  },
  _applySelection: function(a, b) {
    b ? a.setAttribute('aria-selected', 'true') : a.setAttribute('aria-selected', 'false');
    Qk._applySelection.apply(this, arguments);
  },
  _focusedItemChanged: function(a,
                                b) {
    b && b.setAttribute('tabindex', '-1');
    !a || a.hasAttribute('disabled') || this.disabled || (a.setAttribute('tabindex', '0'), a.focus());
  },
  _onIronItemsChanged: function(a) {
    a.detail.addedNodes.length && this._resetTabindices();
  },
  _onShiftTabDown: function() {
    var a = this.getAttribute('tabindex');
    Tk._shiftTabPressed = !0;
    this._setFocusedItem(null);
    this.setAttribute('tabindex', '-1');
    this.async(function() {
      this.setAttribute('tabindex', a);
      Tk._shiftTabPressed = !1;
    }, 1);
  },
  _onFocus: function(a) {
    !Tk._shiftTabPressed && (a = W(a).rootTarget,
    a === this || 'undefined' === typeof a.tabIndex || this.isLightDescendant(a)) && (this._defaultFocusAsync = this.async(function() {
      var b = this.multi ? this.selectedItems && this.selectedItems[0] : this.selectedItem;
      this._setFocusedItem(null);
      b ? this._setFocusedItem(b) : this.items[0] && this._focusNext();
    }));
  },
  _onUpKey: function(a) {
    this._focusPrevious();
    a.detail.keyboardEvent.preventDefault();
  },
  _onDownKey: function(a) {
    this._focusNext();
    a.detail.keyboardEvent.preventDefault();
  },
  _onEscKey: function() {
    var a = this.focusedItem;
    a && a.blur();
  },
  _onKeydown: function(a) {
    this.keyboardEventMatchesKeys(a, 'up down esc') || this._focusWithKeyboardEvent(a);
    a.stopPropagation();
  },
  _activateHandler: function(a) {
    Qk._activateHandler.call(this, a);
    a.stopPropagation();
  },
  _disabledChanged: function(a) {
    a ? (this._previousTabIndex = this.hasAttribute('tabindex') ? this.tabIndex : 0, this.removeAttribute('tabindex')) : this.hasAttribute('tabindex') || this.setAttribute('tabindex', this._previousTabIndex);
  },
  _shiftTabPressed: !1,
}, Uk = [Sk, Xd, Tk];
var Vk = ['\n    <style>\n      :host {\n        display: block;\n        padding: 8px 0;\n\n        background: var(--paper-listbox-background-color, var(--primary-background-color));\n        color: var(--paper-listbox-color, var(--primary-text-color));\n\n        @apply --paper-listbox;\n      }\n    </style>\n\n    <slot></slot>\n'];
Vk.raw = Vk.slice();
Y({ _template: S(Vk), is: 'paper-listbox', behaviors: [Uk], hostAttributes: { role: 'listbox' } });
var Wk = function(a) {
  return U.apply(this, arguments) || this;
};
w(Wk, U);
m = Wk.prototype;
m.getMsg_ = function(a) {
  return Ed(a);
};
m.computeDisplayedValue_ = function() {
  var a = this.values.length;
  return 0 == a ? Ed('NONE_SELECTED') : Ed('SELECTED', { num: a });
};
m.onSelectAllClick_ = function(a) {
  this.values = this.items.map(function(b) {
    return b = b.value;
  });
  a.target.blur();
};
m.onSelectNoneClick_ = function(a) {
  this.values = [];
  a.target.blur();
};
m.onIronEvent_ = function(a) {
  a.stopPropagation();
};
m.onOpenedChanged_ = function(a) {
  if (a = a.detail.value) a = new CustomEvent('overlay-will-open', { bubbles: !0, composed: !0 }), this.dispatchEvent(a);
};
x.Object.defineProperties(Wk, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'tf-creative-preview-multi-selector';
    },
  }, properties: {
    configurable: !0, enumerable: !0, get: function() {
      return {
        label: String,
        items: Array,
        values: { type: Array, notify: !0 },
        displayedValue_: { type: String, computed: 'computeDisplayedValue_(values, values.*)', readOnly: !0 },
      };
    },
  },
});
Wk.prototype._setDisplayedValue_ = function() {
};
customElements.define(Wk.is, Wk);
var Xk = function(a) {
  return U.apply(this, arguments) || this;
};
w(Xk, U);
Xk.prototype.getCustomLabel_ = function() {
  return Ed('CUSTOM');
};
Xk.prototype.onOpenedChanged_ = function(a) {
  if (a = a.detail.value) a = new CustomEvent('overlay-will-open', { bubbles: !0, composed: !0 }), this.dispatchEvent(a);
};
x.Object.defineProperties(Xk, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'tf-creative-preview-selector';
    },
  }, properties: {
    configurable: !0, enumerable: !0, get: function() {
      return { label: String, items: Array, showCustomOption: Boolean, value: { type: String, notify: !0 } };
    },
  },
});
customElements.define(Xk.is, Xk);
var Yk = function(a) {
  return U.apply(this, arguments) || this;
};
w(Yk, U);
m = Yk.prototype;
m.labelChanged_ = function(a) {
  this.setAttribute('title', a);
};
m.valueChanged_ = function() {
  var a = M(this.value);
  a.width = this.validateValue_(a.width);
  a.height = this.validateValue_(a.height);
  var b = N(a);
  b == this.value ? (this.$.width.value = a.width, this.$.height.value = a.height) : this.value = N(a);
};
m.commitChange_ = function() {
  var a = { width: this.$.width.value, height: this.$.height.value };
  this.value = N(a);
};
m.onKeypress_ = function(a) {
  'Enter' == a.key && (this.commitChange_(), a.target.blur());
};
m.validateValue_ = function(a) {
  a = Number(a);
  isNaN(a) && (a = 0);
  return Math.min(Math.max(a, this.min), this.max);
};
x.Object.defineProperties(Yk, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'tf-creative-preview-size-input';
    },
  }, properties: {
    configurable: !0, enumerable: !0, get: function() {
      return {
        label: { type: String, observer: 'labelChanged_' },
        value: { type: String, observer: 'valueChanged_', notify: !0 },
        min: { type: Number, value: 0 },
        max: { type: Number, value: Number.POSITIVE_INFINITY },
        disabled: { type: Boolean, reflectToAttribute: !0 },
      };
    },
  },
});
customElements.define(Yk.is, Yk);
var Zk = document.createElement('template');
Zk.setAttribute('style', 'display: none;');
Zk.innerHTML = '<iron-iconset-svg name="device" size="24">\n<svg><defs>\n<g id="access-alarm"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>\n<g id="access-alarms"><path d="M22 5.7l-4.6-3.9-1.3 1.5 4.6 3.9L22 5.7zM7.9 3.4L6.6 1.9 2 5.7l1.3 1.5 4.6-3.8zM12.5 8H11v6l4.7 2.9.8-1.2-4-2.4V8zM12 4c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"></path></g>\n<g id="access-time"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>\n<g id="add-alarm"><path d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z"></path></g>\n<g id="airplanemode-active"><path d="M10.18 9"></path><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"></path></g>\n<g id="airplanemode-inactive"><path d="M13 9V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5v3.68l7.83 7.83L21 16v-2l-8-5zM3 5.27l4.99 4.99L2 14v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-3.73L18.73 21 20 19.73 4.27 4 3 5.27z"></path></g>\n<g id="battery-20"><path d="M7 17v3.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V17H7z"></path><path fill-opacity=".3" d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V17h10V5.33z"></path></g>\n<g id="battery-30"><path fill-opacity=".3" d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V15h10V5.33z"></path><path d="M7 15v5.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V15H7z"></path></g>\n<g id="battery-50"><path fill-opacity=".3" d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V13h10V5.33z"></path><path d="M7 13v7.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V13H7z"></path></g>\n<g id="battery-60"><path fill-opacity=".3" d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V11h10V5.33z"></path><path d="M7 11v9.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V11H7z"></path></g>\n<g id="battery-80"><path fill-opacity=".3" d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V9h10V5.33z"></path><path d="M7 9v11.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V9H7z"></path></g>\n<g id="battery-90"><path fill-opacity=".3" d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V8h10V5.33z"></path><path d="M7 8v12.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V8H7z"></path></g>\n<g id="battery-alert"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM13 18h-2v-2h2v2zm0-4h-2V9h2v5z"></path></g>\n<g id="battery-charging-20"><path d="M11 20v-3H7v3.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V17h-4.4L11 20z"></path><path fill-opacity=".3" d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V17h4v-2.5H9L13 7v5.5h2L12.6 17H17V5.33C17 4.6 16.4 4 15.67 4z"></path></g>\n<g id="battery-charging-30"><path fill-opacity=".3" d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v9.17h2L13 7v5.5h2l-1.07 2H17V5.33C17 4.6 16.4 4 15.67 4z"></path><path d="M11 20v-5.5H7v6.17C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V14.5h-3.07L11 20z"></path></g>\n<g id="battery-charging-50"><path d="M14.47 13.5L11 20v-5.5H9l.53-1H7v7.17C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V13.5h-2.53z"></path><path fill-opacity=".3" d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v8.17h2.53L13 7v5.5h2l-.53 1H17V5.33C17 4.6 16.4 4 15.67 4z"></path></g>\n<g id="battery-charging-60"><path fill-opacity=".3" d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V11h3.87L13 7v4h4V5.33C17 4.6 16.4 4 15.67 4z"></path><path d="M13 12.5h2L11 20v-5.5H9l1.87-3.5H7v9.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V11h-4v1.5z"></path></g>\n<g id="battery-charging-80"><path fill-opacity=".3" d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V9h4.93L13 7v2h4V5.33C17 4.6 16.4 4 15.67 4z"></path><path d="M13 12.5h2L11 20v-5.5H9L11.93 9H7v11.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V9h-4v3.5z"></path></g>\n<g id="battery-charging-90"><path fill-opacity=".3" d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V8h5.47L13 7v1h4V5.33C17 4.6 16.4 4 15.67 4z"></path><path d="M13 12.5h2L11 20v-5.5H9L12.47 8H7v12.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V8h-4v4.5z"></path></g>\n<g id="battery-charging-full"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM11 20v-5.5H9L13 7v5.5h2L11 20z"></path></g>\n<g id="battery-full"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"></path></g>\n<g id="battery-std"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"></path></g>\n<g id="battery-unknown"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zm-2.72 13.95h-1.9v-1.9h1.9v1.9zm1.35-5.26s-.38.42-.67.71c-.48.48-.83 1.15-.83 1.6h-1.6c0-.83.46-1.52.93-2l.93-.94c.27-.27.44-.65.44-1.06 0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5H9c0-1.66 1.34-3 3-3s3 1.34 3 3c0 .66-.27 1.26-.7 1.69z"></path></g>\n<g id="bluetooth"><path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"></path></g>\n<g id="bluetooth-connected"><path d="M7 12l-2-2-2 2 2 2 2-2zm10.71-4.29L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88zM19 10l-2 2 2 2 2-2-2-2z"></path></g>\n<g id="bluetooth-disabled"><path d="M13 5.83l1.88 1.88-1.6 1.6 1.41 1.41 3.02-3.02L12 2h-1v5.03l2 2v-3.2zM5.41 4L4 5.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l4.29-4.29 2.3 2.29L20 18.59 5.41 4zM13 18.17v-3.76l1.88 1.88L13 18.17z"></path></g>\n<g id="bluetooth-searching"><path d="M14.24 12.01l2.32 2.32c.28-.72.44-1.51.44-2.33 0-.82-.16-1.59-.43-2.31l-2.33 2.32zm5.29-5.3l-1.26 1.26c.63 1.21.98 2.57.98 4.02s-.36 2.82-.98 4.02l1.2 1.2c.97-1.54 1.54-3.36 1.54-5.31-.01-1.89-.55-3.67-1.48-5.19zm-3.82 1L10 2H9v7.59L4.41 5 3 6.41 8.59 12 3 17.59 4.41 19 9 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM11 5.83l1.88 1.88L11 9.59V5.83zm1.88 10.46L11 18.17v-3.76l1.88 1.88z"></path></g>\n<g id="brightness-auto"><path d="M10.85 12.65h2.3L12 9l-1.15 3.65zM20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM14.3 16l-.7-2h-3.2l-.7 2H7.8L11 7h2l3.2 9h-1.9z"></path></g>\n<g id="brightness-high"><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path></g>\n<g id="brightness-low"><path d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path></g>\n<g id="brightness-medium"><path d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18V6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"></path></g>\n<g id="data-usage"><path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"></path></g>\n<g id="developer-mode"><path d="M7 5h10v2h2V3c0-1.1-.9-1.99-2-1.99L7 1c-1.1 0-2 .9-2 2v4h2V5zm8.41 11.59L20 12l-4.59-4.59L14 8.83 17.17 12 14 15.17l1.41 1.42zM10 15.17L6.83 12 10 8.83 8.59 7.41 4 12l4.59 4.59L10 15.17zM17 19H7v-2H5v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4h-2v2z"></path></g>\n<g id="devices"><path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"></path></g>\n<g id="dvr"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zm-2-9H8v2h11V8zm0 4H8v2h11v-2zM7 8H5v2h2V8zm0 4H5v2h2v-2z"></path></g>\n<g id="gps-fixed"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>\n<g id="gps-not-fixed"><path d="M20.94 11c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>\n<g id="gps-off"><path d="M20.94 11c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06c-1.13.12-2.19.46-3.16.97l1.5 1.5C10.16 5.19 11.06 5 12 5c3.87 0 7 3.13 7 7 0 .94-.19 1.84-.52 2.65l1.5 1.5c.5-.96.84-2.02.97-3.15H23v-2h-2.06zM3 4.27l2.04 2.04C3.97 7.62 3.25 9.23 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c1.77-.2 3.38-.91 4.69-1.98L19.73 21 21 19.73 4.27 3 3 4.27zm13.27 13.27C15.09 18.45 13.61 19 12 19c-3.87 0-7-3.13-7-7 0-1.61.55-3.09 1.46-4.27l9.81 9.81z"></path></g>\n<g id="graphic-eq"><path d="M7 18h2V6H7v12zm4 4h2V2h-2v20zm-8-8h2v-4H3v4zm12 4h2V6h-2v12zm4-8v4h2v-4h-2z"></path></g>\n<g id="location-disabled"><path d="M20.94 11c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06c-1.13.12-2.19.46-3.16.97l1.5 1.5C10.16 5.19 11.06 5 12 5c3.87 0 7 3.13 7 7 0 .94-.19 1.84-.52 2.65l1.5 1.5c.5-.96.84-2.02.97-3.15H23v-2h-2.06zM3 4.27l2.04 2.04C3.97 7.62 3.25 9.23 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c1.77-.2 3.38-.91 4.69-1.98L19.73 21 21 19.73 4.27 3 3 4.27zm13.27 13.27C15.09 18.45 13.61 19 12 19c-3.87 0-7-3.13-7-7 0-1.61.55-3.09 1.46-4.27l9.81 9.81z"></path></g>\n<g id="location-searching"><path d="M20.94 11c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>\n<g id="network-cell"><path fill-opacity=".3" d="M2 22h20V2z"></path><path d="M17 7L2 22h15z"></path></g>\n<g id="network-wifi"><path fill-opacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"></path><path d="M3.53 10.95l8.46 10.54.01.01.01-.01 8.46-10.54C20.04 10.62 16.81 8 12 8c-4.81 0-8.04 2.62-8.47 2.95z"></path></g>\n<g id="nfc"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16zM18 6h-5c-1.1 0-2 .9-2 2v2.28c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V8h3v8H8V8h2V6H6v12h12V6z"></path></g>\n<g id="screen-lock-landscape"><path d="M21 5H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-2 12H5V7h14v10zm-9-1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1v-1c0-1.11-.9-2-2-2-1.11 0-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm.8-6c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2v1h-2.4v-1z"></path></g>\n<g id="screen-lock-portrait"><path d="M10 16h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1v-1c0-1.11-.9-2-2-2-1.11 0-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm.8-6c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2v1h-2.4v-1zM17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14z"></path></g>\n<g id="screen-lock-rotation"><path d="M23.25 12.77l-2.57-2.57-1.41 1.41 2.22 2.22-5.66 5.66L4.51 8.17l5.66-5.66 2.1 2.1 1.41-1.41L11.23.75c-.59-.59-1.54-.59-2.12 0L2.75 7.11c-.59.59-.59 1.54 0 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12zM8.47 20.48C5.2 18.94 2.86 15.76 2.5 12H1c.51 6.16 5.66 11 11.95 11l.66-.03-3.81-3.82-1.33 1.33zM16 9h5c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1v-.5C21 1.12 19.88 0 18.5 0S16 1.12 16 2.5V3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm.8-6.5c0-.94.76-1.7 1.7-1.7s1.7.76 1.7 1.7V3h-3.4v-.5z"></path></g>\n<g id="screen-rotation"><path d="M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32zm-6.25-.77c-.59-.59-1.54-.59-2.12 0L1.75 8.11c-.59.59-.59 1.54 0 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12L10.23 1.75zm4.6 19.44L2.81 9.17l6.36-6.36 12.02 12.02-6.36 6.36zm-7.31.29C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32z"></path></g>\n<g id="sd-storage"><path d="M18 2h-8L4.02 8 4 20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 6h-2V4h2v4zm3 0h-2V4h2v4zm3 0h-2V4h2v4z"></path></g>\n<g id="settings-system-daydream"><path d="M9 16h6.5c1.38 0 2.5-1.12 2.5-2.5S16.88 11 15.5 11h-.05c-.24-1.69-1.69-3-3.45-3-1.4 0-2.6.83-3.16 2.02h-.16C7.17 10.18 6 11.45 6 13c0 1.66 1.34 3 3 3zM21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>\n<g id="signal-cellular-0-bar"><path fill-opacity=".3" d="M2 22h20V2z"></path></g>\n<g id="signal-cellular-1-bar"><path fill-opacity=".3" d="M2 22h20V2z"></path><path d="M12 12L2 22h10z"></path></g>\n<g id="signal-cellular-2-bar"><path fill-opacity=".3" d="M2 22h20V2z"></path><path d="M14 10L2 22h12z"></path></g>\n<g id="signal-cellular-3-bar"><path fill-opacity=".3" d="M2 22h20V2z"></path><path d="M17 7L2 22h15z"></path></g>\n<g id="signal-cellular-4-bar"><path d="M2 22h20V2z"></path></g>\n<g id="signal-cellular-connected-no-internet-0-bar"><path fill-opacity=".3" d="M22 8V2L2 22h16V8z"></path><path d="M20 22h2v-2h-2v2zm0-12v8h2v-8h-2z"></path></g>\n<g id="signal-cellular-connected-no-internet-1-bar"><path fill-opacity=".3" d="M22 8V2L2 22h16V8z"></path><path d="M20 10v8h2v-8h-2zm-8 12V12L2 22h10zm8 0h2v-2h-2v2z"></path></g>\n<g id="signal-cellular-connected-no-internet-2-bar"><path fill-opacity=".3" d="M22 8V2L2 22h16V8z"></path><path d="M14 22V10L2 22h12zm6-12v8h2v-8h-2zm0 12h2v-2h-2v2z"></path></g>\n<g id="signal-cellular-connected-no-internet-3-bar"><path fill-opacity=".3" d="M22 8V2L2 22h16V8z"></path><path d="M17 22V7L2 22h15zm3-12v8h2v-8h-2zm0 12h2v-2h-2v2z"></path></g>\n<g id="signal-cellular-connected-no-internet-4-bar"><path d="M20 18h2v-8h-2v8zm0 4h2v-2h-2v2zM2 22h16V8h4V2L2 22z"></path></g>\n<g id="signal-cellular-no-sim"><path d="M18.99 5c0-1.1-.89-2-1.99-2h-7L7.66 5.34 19 16.68 18.99 5zM3.65 3.88L2.38 5.15 5 7.77V19c0 1.1.9 2 2 2h10.01c.35 0 .67-.1.96-.26l1.88 1.88 1.27-1.27L3.65 3.88z"></path></g>\n<g id="signal-cellular-null"><path d="M20 6.83V20H6.83L20 6.83M22 2L2 22h20V2z"></path></g>\n<g id="signal-cellular-off"><path d="M21 1l-8.59 8.59L21 18.18V1zM4.77 4.5L3.5 5.77l6.36 6.36L1 21h17.73l2 2L22 21.73 4.77 4.5z"></path></g>\n<g id="signal-wifi-0-bar"><path fill-opacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"></path></g>\n<g id="signal-wifi-1-bar"><path fill-opacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"></path><path d="M6.67 14.86L12 21.49v.01l.01-.01 5.33-6.63C17.06 14.65 15.03 13 12 13s-5.06 1.65-5.33 1.86z"></path></g>\n<g id="signal-wifi-1-bar-lock"><path d="M23 16v-1.5c0-1.4-1.1-2.5-2.5-2.5S18 13.1 18 14.5V16c-.5 0-1 .5-1 1v4c0 .5.5 1 1 1h5c.5 0 1-.5 1-1v-4c0-.5-.5-1-1-1zm-1 0h-3v-1.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V16z"></path><path d="M15.5 14.5c0-2.8 2.2-5 5-5 .4 0 .7 0 1 .1L23.6 7c-.4-.3-4.9-4-11.6-4C5.3 3 .8 6.7.4 7L12 21.5l3.5-4.3v-2.7z" opacity=".3"></path><path d="M6.7 14.9l5.3 6.6 3.5-4.3v-2.6c0-.2 0-.5.1-.7-.9-.5-2.2-.9-3.6-.9-3 0-5.1 1.7-5.3 1.9z"></path></g>\n<g id="signal-wifi-2-bar"><path fill-opacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"></path><path d="M4.79 12.52l7.2 8.98H12l.01-.01 7.2-8.98C18.85 12.24 16.1 10 12 10s-6.85 2.24-7.21 2.52z"></path></g>\n<g id="signal-wifi-2-bar-lock"><path d="M23 16v-1.5c0-1.4-1.1-2.5-2.5-2.5S18 13.1 18 14.5V16c-.5 0-1 .5-1 1v4c0 .5.5 1 1 1h5c.5 0 1-.5 1-1v-4c0-.5-.5-1-1-1zm-1 0h-3v-1.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V16z"></path><path d="M15.5 14.5c0-2.8 2.2-5 5-5 .4 0 .7 0 1 .1L23.6 7c-.4-.3-4.9-4-11.6-4C5.3 3 .8 6.7.4 7L12 21.5l3.5-4.3v-2.7z" opacity=".3"></path><path d="M4.8 12.5l7.2 9 3.5-4.4v-2.6c0-1.3.5-2.5 1.4-3.4C15.6 10.5 14 10 12 10c-4.1 0-6.8 2.2-7.2 2.5z"></path></g>\n<g id="signal-wifi-3-bar"><path fill-opacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"></path><path d="M3.53 10.95l8.46 10.54.01.01.01-.01 8.46-10.54C20.04 10.62 16.81 8 12 8c-4.81 0-8.04 2.62-8.47 2.95z"></path></g>\n<g id="signal-wifi-3-bar-lock"><path opacity=".3" d="M12 3C5.3 3 .8 6.7.4 7l3.2 3.9L12 21.5l3.5-4.3v-2.6c0-2.2 1.4-4 3.3-4.7.3-.1.5-.2.8-.2.3-.1.6-.1.9-.1.4 0 .7 0 1 .1L23.6 7c-.4-.3-4.9-4-11.6-4z"></path><path d="M23 16v-1.5c0-1.4-1.1-2.5-2.5-2.5S18 13.1 18 14.5V16c-.5 0-1 .5-1 1v4c0 .5.5 1 1 1h5c.5 0 1-.5 1-1v-4c0-.5-.5-1-1-1zm-1 0h-3v-1.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V16zm-10 5.5l3.5-4.3v-2.6c0-2.2 1.4-4 3.3-4.7C17.3 9 14.9 8 12 8c-4.8 0-8 2.6-8.5 2.9"></path></g>\n<g id="signal-wifi-4-bar"><path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"></path></g>\n<g id="signal-wifi-4-bar-lock"><path d="M23 16v-1.5c0-1.4-1.1-2.5-2.5-2.5S18 13.1 18 14.5V16c-.5 0-1 .5-1 1v4c0 .5.5 1 1 1h5c.5 0 1-.5 1-1v-4c0-.5-.5-1-1-1zm-1 0h-3v-1.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V16zm-6.5-1.5c0-2.8 2.2-5 5-5 .4 0 .7 0 1 .1L23.6 7c-.4-.3-4.9-4-11.6-4C5.3 3 .8 6.7.4 7L12 21.5l3.5-4.4v-2.6z"></path></g>\n<g id="signal-wifi-off"><path d="M23.64 7c-.45-.34-4.93-4-11.64-4-1.5 0-2.89.19-4.15.48L18.18 13.8 23.64 7zm-6.6 8.22L3.27 1.44 2 2.72l2.05 2.06C1.91 5.76.59 6.82.36 7l11.63 14.49.01.01.01-.01 3.9-4.86 3.32 3.32 1.27-1.27-3.46-3.46z"></path></g>\n<g id="storage"><path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"></path></g>\n<g id="usb"><path d="M15 7v4h1v2h-3V5h2l-3-4-3 4h2v8H8v-2.07c.7-.37 1.2-1.08 1.2-1.93 0-1.21-.99-2.2-2.2-2.2-1.21 0-2.2.99-2.2 2.2 0 .85.5 1.56 1.2 1.93V13c0 1.11.89 2 2 2h3v3.05c-.71.37-1.2 1.1-1.2 1.95 0 1.22.99 2.2 2.2 2.2 1.21 0 2.2-.98 2.2-2.2 0-.85-.49-1.58-1.2-1.95V15h3c1.11 0 2-.89 2-2v-2h1V7h-4z"></path></g>\n<g id="wallpaper"><path d="M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z"></path></g>\n<g id="widgets"><path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z"></path></g>\n<g id="wifi-lock"><path d="M20.5 9.5c.28 0 .55.04.81.08L24 6c-3.34-2.51-7.5-4-12-4S3.34 3.49 0 6l12 16 3.5-4.67V14.5c0-2.76 2.24-5 5-5zM23 16v-1.5c0-1.38-1.12-2.5-2.5-2.5S18 13.12 18 14.5V16c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1zm-1 0h-3v-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V16z"></path></g>\n<g id="wifi-tethering"><path d="M12 11c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 2c0-3.31-2.69-6-6-6s-6 2.69-6 6c0 2.22 1.21 4.15 3 5.19l1-1.74c-1.19-.7-2-1.97-2-3.45 0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.48-.81 2.75-2 3.45l1 1.74c1.79-1.04 3-2.97 3-5.19zM12 3C6.48 3 2 7.48 2 13c0 3.7 2.01 6.92 4.99 8.65l1-1.73C5.61 18.53 4 15.96 4 13c0-4.42 3.58-8 8-8s8 3.58 8 8c0 2.96-1.61 5.53-4 6.92l1 1.73c2.99-1.73 5-4.95 5-8.65 0-5.52-4.48-10-10-10z"></path></g>\n</defs></svg>\n</iron-iconset-svg>';
document.head.appendChild(Zk.content);
var $k = document.createElement('template');
$k.setAttribute('style', 'display: none;');
$k.innerHTML = '<iron-iconset-svg name="icons" size="24">\n<svg><defs>\n<g id="3d-rotation"><path d="M7.52 21.48C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32zm.89-6.52c-.19 0-.37-.03-.52-.08-.16-.06-.29-.13-.4-.24-.11-.1-.2-.22-.26-.37-.06-.14-.09-.3-.09-.47h-1.3c0 .36.07.68.21.95.14.27.33.5.56.69.24.18.51.32.82.41.3.1.62.15.96.15.37 0 .72-.05 1.03-.15.32-.1.6-.25.83-.44s.42-.43.55-.72c.13-.29.2-.61.2-.97 0-.19-.02-.38-.07-.56-.05-.18-.12-.35-.23-.51-.1-.16-.24-.3-.4-.43-.17-.13-.37-.23-.61-.31.2-.09.37-.2.52-.33.15-.13.27-.27.37-.42.1-.15.17-.3.22-.46.05-.16.07-.32.07-.48 0-.36-.06-.68-.18-.96-.12-.28-.29-.51-.51-.69-.2-.19-.47-.33-.77-.43C9.1 8.05 8.76 8 8.39 8c-.36 0-.69.05-1 .16-.3.11-.57.26-.79.45-.21.19-.38.41-.51.67-.12.26-.18.54-.18.85h1.3c0-.17.03-.32.09-.45s.14-.25.25-.34c.11-.09.23-.17.38-.22.15-.05.3-.08.48-.08.4 0 .7.1.89.31.19.2.29.49.29.86 0 .18-.03.34-.08.49-.05.15-.14.27-.25.37-.11.1-.25.18-.41.24-.16.06-.36.09-.58.09H7.5v1.03h.77c.22 0 .42.02.6.07s.33.13.45.23c.12.11.22.24.29.4.07.16.1.35.1.57 0 .41-.12.72-.35.93-.23.23-.55.33-.95.33zm8.55-5.92c-.32-.33-.7-.59-1.14-.77-.43-.18-.92-.27-1.46-.27H12v8h2.3c.55 0 1.06-.09 1.51-.27.45-.18.84-.43 1.16-.76.32-.33.57-.73.74-1.19.17-.47.26-.99.26-1.57v-.4c0-.58-.09-1.1-.26-1.57-.18-.47-.43-.87-.75-1.2zm-.39 3.16c0 .42-.05.79-.14 1.13-.1.33-.24.62-.43.85-.19.23-.43.41-.71.53-.29.12-.62.18-.99.18h-.91V9.12h.97c.72 0 1.27.23 1.64.69.38.46.57 1.12.57 1.99v.4zM12 0l-.66.03 3.81 3.81 1.33-1.33c3.27 1.55 5.61 4.72 5.96 8.48h1.5C23.44 4.84 18.29 0 12 0z"></path></g>\n<g id="accessibility"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"></path></g>\n<g id="accessible"><circle cx="12" cy="4" r="2"></circle><path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"></path></g>\n<g id="account-balance"><path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"></path></g>\n<g id="account-balance-wallet"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>\n<g id="account-box"><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"></path></g>\n<g id="account-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></g>\n<g id="add"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g>\n<g id="add-alert"><path d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72C7.37 5.03 5.12 7.75 5.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z"></path></g>\n<g id="add-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>\n<g id="add-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>\n<g id="add-circle-outline"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>\n<g id="add-shopping-cart"><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"></path></g>\n<g id="alarm"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>\n<g id="alarm-add"><path d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z"></path></g>\n<g id="alarm-off"><path d="M12 6c3.87 0 7 3.13 7 7 0 .84-.16 1.65-.43 2.4l1.52 1.52c.58-1.19.91-2.51.91-3.92 0-4.97-4.03-9-9-9-1.41 0-2.73.33-3.92.91L9.6 6.43C10.35 6.16 11.16 6 12 6zm10-.28l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM2.92 2.29L1.65 3.57 2.98 4.9l-1.11.93 1.42 1.42 1.11-.94.8.8C3.83 8.69 3 10.75 3 13c0 4.97 4.02 9 9 9 2.25 0 4.31-.83 5.89-2.2l2.2 2.2 1.27-1.27L3.89 3.27l-.97-.98zm13.55 16.1C15.26 19.39 13.7 20 12 20c-3.87 0-7-3.13-7-7 0-1.7.61-3.26 1.61-4.47l9.86 9.86zM8.02 3.28L6.6 1.86l-.86.71 1.42 1.42.86-.71z"></path></g>\n<g id="alarm-on"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-1.46-5.47L8.41 12.4l-1.06 1.06 3.18 3.18 6-6-1.06-1.06-4.93 4.95z"></path></g>\n<g id="all-out"><path d="M16.21 4.16l4 4v-4zm4 12l-4 4h4zm-12 4l-4-4v4zm-4-12l4-4h-4zm12.95-.95c-2.73-2.73-7.17-2.73-9.9 0s-2.73 7.17 0 9.9 7.17 2.73 9.9 0 2.73-7.16 0-9.9zm-1.1 8.8c-2.13 2.13-5.57 2.13-7.7 0s-2.13-5.57 0-7.7 5.57-2.13 7.7 0 2.13 5.57 0 7.7z"></path></g>\n<g id="android"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"></path></g>\n<g id="announcement"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"></path></g>\n<g id="apps"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></g>\n<g id="archive"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></g>\n<g id="arrow-back"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g>\n<g id="arrow-downward"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></g>\n<g id="arrow-drop-down"><path d="M7 10l5 5 5-5z"></path></g>\n<g id="arrow-drop-down-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 12l-4-4h8l-4 4z"></path></g>\n<g id="arrow-drop-up"><path d="M7 14l5-5 5 5z"></path></g>\n<g id="arrow-forward"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g>\n<g id="arrow-upward"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path></g>\n<g id="aspect-ratio"><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>\n<g id="assessment"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g>\n<g id="assignment"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></g>\n<g id="assignment-ind"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"></path></g>\n<g id="assignment-late"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 15h-2v-2h2v2zm0-4h-2V8h2v6zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></g>\n<g id="assignment-return"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 12h-4v3l-5-5 5-5v3h4v4z"></path></g>\n<g id="assignment-returned"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 15l-5-5h3V9h4v4h3l-5 5z"></path></g>\n<g id="assignment-turned-in"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>\n<g id="attachment"><path d="M2 12.5C2 9.46 4.46 7 7.5 7H18c2.21 0 4 1.79 4 4s-1.79 4-4 4H9.5C8.12 15 7 13.88 7 12.5S8.12 10 9.5 10H17v2H9.41c-.55 0-.55 1 0 1H18c1.1 0 2-.9 2-2s-.9-2-2-2H7.5C5.57 9 4 10.57 4 12.5S5.57 16 7.5 16H17v2H7.5C4.46 18 2 15.54 2 12.5z"></path></g>\n<g id="autorenew"><path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"></path></g>\n<g id="backspace"><path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"></path></g>\n<g id="backup"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>\n<g id="block"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"></path></g>\n<g id="book"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>\n<g id="bookmark"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>\n<g id="bookmark-border"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>\n<g id="bug-report"><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"></path></g>\n<g id="build"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"></path></g>\n<g id="cached"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"></path></g>\n<g id="camera-enhance"><path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-1l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z"></path></g>\n<g id="cancel"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g>\n<g id="card-giftcard"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>\n<g id="card-membership"><path d="M20 2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h4v5l4-2 4 2v-5h4c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zm0 13H4v-2h16v2zm0-5H4V4h16v6z"></path></g>\n<g id="card-travel"><path d="M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-2h16v2zm0-5H4V8h3v2h2V8h6v2h2V8h3v6z"></path></g>\n<g id="change-history"><path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"></path></g>\n<g id="check"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></g>\n<g id="check-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>\n<g id="check-box-outline-blank"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>\n<g id="check-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>\n<g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>\n<g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>\n<g id="chrome-reader-mode"><path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"></path></g>\n<g id="class"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>\n<g id="clear"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>\n<g id="close"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>\n<g id="cloud"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"></path></g>\n<g id="cloud-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14H8c-1.66 0-3-1.34-3-3s1.34-3 3-3l.14.01C8.58 8.28 10.13 7 12 7c2.21 0 4 1.79 4 4h.5c1.38 0 2.5 1.12 2.5 2.5S17.88 16 16.5 16z"></path></g>\n<g id="cloud-done"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.18 9l1.41 1.41L10 17z"></path></g>\n<g id="cloud-download"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"></path></g>\n<g id="cloud-off"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"></path></g>\n<g id="cloud-queue"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"></path></g>\n<g id="cloud-upload"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>\n<g id="code"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></g>\n<g id="compare-arrows"><path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"></path></g>\n<g id="content-copy"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></g>\n<g id="content-cut"><path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z"></path></g>\n<g id="content-paste"><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"></path></g>\n<g id="copyright"><path d="M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91 1.05.34 1.7.34c.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>\n<g id="create"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>\n<g id="create-new-folder"><path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"></path></g>\n<g id="credit-card"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>\n<g id="dashboard"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></g>\n<g id="date-range"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path></g>\n<g id="delete"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></g>\n<g id="delete-forever"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></g>\n<g id="delete-sweep"><path d="M15 16h4v2h-4zm0-8h7v2h-7zm0 4h6v2h-6zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zM14 5h-3l-1-1H6L5 5H2v2h12z"></path></g>\n<g id="description"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path></g>\n<g id="dns"><path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>\n<g id="done"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></g>\n<g id="done-all"><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path></g>\n<g id="donut-large"><path d="M11 5.08V2c-5 .5-9 4.81-9 10s4 9.5 9 10v-3.08c-3-.48-6-3.4-6-6.92s3-6.44 6-6.92zM18.97 11H22c-.47-5-4-8.53-9-9v3.08C16 5.51 18.54 8 18.97 11zM13 18.92V22c5-.47 8.53-4 9-9h-3.03c-.43 3-2.97 5.49-5.97 5.92z"></path></g>\n<g id="donut-small"><path d="M11 9.16V2c-5 .5-9 4.79-9 10s4 9.5 9 10v-7.16c-1-.41-2-1.52-2-2.84s1-2.43 2-2.84zM14.86 11H22c-.48-4.75-4-8.53-9-9v7.16c1 .3 1.52.98 1.86 1.84zM13 14.84V22c5-.47 8.52-4.25 9-9h-7.14c-.34.86-.86 1.54-1.86 1.84z"></path></g>\n<g id="drafts"><path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z"></path></g>\n<g id="eject"><path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"></path></g>\n<g id="error"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></g>\n<g id="error-outline"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>\n<g id="euro-symbol"><path d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1 0 .34.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z"></path></g>\n<g id="event"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></g>\n<g id="event-seat"><path d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"></path></g>\n<g id="exit-to-app"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>\n<g id="expand-less"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></g>\n<g id="expand-more"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></g>\n<g id="explore"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"></path></g>\n<g id="extension"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"></path></g>\n<g id="face"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"></path></g>\n<g id="favorite"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></g>\n<g id="favorite-border"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></g>\n<g id="feedback"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"></path></g>\n<g id="file-download"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>\n<g id="file-upload"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path></g>\n<g id="filter-list"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></g>\n<g id="find-in-page"><path d="M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z"></path></g>\n<g id="find-replace"><path d="M11 6c1.38 0 2.63.56 3.54 1.46L12 10h6V4l-2.05 2.05C14.68 4.78 12.93 4 11 4c-3.53 0-6.43 2.61-6.92 6H6.1c.46-2.28 2.48-4 4.9-4zm5.64 9.14c.66-.9 1.12-1.97 1.28-3.14H15.9c-.46 2.28-2.48 4-4.9 4-1.38 0-2.63-.56-3.54-1.46L10 12H4v6l2.05-2.05C7.32 17.22 9.07 18 11 18c1.55 0 2.98-.51 4.14-1.36L20 21.49 21.49 20l-4.85-4.86z"></path></g>\n<g id="fingerprint"><path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"></path></g>\n<g id="first-page"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path></g>\n<g id="flag"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path></g>\n<g id="flight-land"><path d="M2.5 19h19v2h-19zm7.18-5.73l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z"></path></g>\n<g id="flight-takeoff"><path d="M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 1.82 3.16.77 1.33 1.6-.43 5.31-1.42 4.35-1.16L21 11.49c.81-.23 1.28-1.05 1.07-1.85z"></path></g>\n<g id="flip-to-back"><path d="M9 7H7v2h2V7zm0 4H7v2h2v-2zm0-8c-1.11 0-2 .9-2 2h2V3zm4 12h-2v2h2v-2zm6-12v2h2c0-1.1-.9-2-2-2zm-6 0h-2v2h2V3zM9 17v-2H7c0 1.1.89 2 2 2zm10-4h2v-2h-2v2zm0-4h2V7h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zM5 7H3v12c0 1.1.89 2 2 2h12v-2H5V7zm10-2h2V3h-2v2zm0 12h2v-2h-2v2z"></path></g>\n<g id="flip-to-front"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.89 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9c-1.11 0-2 .9-2 2v10c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z"></path></g>\n<g id="folder"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></g>\n<g id="folder-open"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"></path></g>\n<g id="folder-shared"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z"></path></g>\n<g id="font-download"><path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"></path></g>\n<g id="forward"><path d="M12 8V4l8 8-8 8v-4H4V8z"></path></g>\n<g id="fullscreen"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></g>\n<g id="fullscreen-exit"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path></g>\n<g id="g-translate"><path d="M20 5h-9.12L10 2H4c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h7l1 3h8c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zM7.17 14.59c-2.25 0-4.09-1.83-4.09-4.09s1.83-4.09 4.09-4.09c1.04 0 1.99.37 2.74 1.07l.07.06-1.23 1.18-.06-.05c-.29-.27-.78-.59-1.52-.59-1.31 0-2.38 1.09-2.38 2.42s1.07 2.42 2.38 2.42c1.37 0 1.96-.87 2.12-1.46H7.08V9.91h3.95l.01.07c.04.21.05.4.05.61 0 2.35-1.61 4-3.92 4zm6.03-1.71c.33.6.74 1.18 1.19 1.7l-.54.53-.65-2.23zm.77-.76h-.99l-.31-1.04h3.99s-.34 1.31-1.56 2.74c-.52-.62-.89-1.23-1.13-1.7zM21 20c0 .55-.45 1-1 1h-7l2-2-.81-2.77.92-.92L17.79 18l.73-.73-2.71-2.68c.9-1.03 1.6-2.25 1.92-3.51H19v-1.04h-3.64V9h-1.04v1.04h-1.96L11.18 6H20c.55 0 1 .45 1 1v13z"></path></g>\n<g id="gavel"><path d="M1 21h12v2H1zM5.245 8.07l2.83-2.827 14.14 14.142-2.828 2.828zM12.317 1l5.657 5.656-2.83 2.83-5.654-5.66zM3.825 9.485l5.657 5.657-2.828 2.828-5.657-5.657z"></path></g>\n<g id="gesture"><path d="M4.59 6.89c.7-.71 1.4-1.35 1.71-1.22.5.2 0 1.03-.3 1.52-.25.42-2.86 3.89-2.86 6.31 0 1.28.48 2.34 1.34 2.98.75.56 1.74.73 2.64.46 1.07-.31 1.95-1.4 3.06-2.77 1.21-1.49 2.83-3.44 4.08-3.44 1.63 0 1.65 1.01 1.76 1.79-3.78.64-5.38 3.67-5.38 5.37 0 1.7 1.44 3.09 3.21 3.09 1.63 0 4.29-1.33 4.69-6.1H21v-2.5h-2.47c-.15-1.65-1.09-4.2-4.03-4.2-2.25 0-4.18 1.91-4.94 2.84-.58.73-2.06 2.48-2.29 2.72-.25.3-.68.84-1.11.84-.45 0-.72-.83-.36-1.92.35-1.09 1.4-2.86 1.85-3.52.78-1.14 1.3-1.92 1.3-3.28C8.95 3.69 7.31 3 6.44 3 5.12 3 3.97 4 3.72 4.25c-.36.36-.66.66-.88.93l1.75 1.71zm9.29 11.66c-.31 0-.74-.26-.74-.72 0-.6.73-2.2 2.87-2.76-.3 2.69-1.43 3.48-2.13 3.48z"></path></g>\n<g id="get-app"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>\n<g id="gif"><path d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"></path></g>\n<g id="grade"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>\n<g id="group-work"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9.5 8c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8zm6.5 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>\n<g id="help"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path></g>\n<g id="help-outline"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></g>\n<g id="highlight-off"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>\n<g id="history"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>\n<g id="home"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></g>\n<g id="hourglass-empty"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"></path></g>\n<g id="hourglass-full"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"></path></g>\n<g id="http"><path d="M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V15H10v-4.5h1.5V9H7v1.5zm5.5 0H14V15h1.5v-4.5H17V9h-4.5v1.5zm9-1.5H18v6h1.5v-2h2c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z"></path></g>\n<g id="https"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>\n<g id="important-devices"><path d="M23 11.01L18 11c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-9c0-.55-.45-.99-1-.99zM23 20h-5v-7h5v7zM20 2H2C.89 2 0 2.89 0 4v12c0 1.1.89 2 2 2h7v2H7v2h8v-2h-2v-2h2v-2H2V4h18v5h2V4c0-1.11-.9-2-2-2zm-8.03 7L11 6l-.97 3H7l2.47 1.76-.94 2.91 2.47-1.8 2.47 1.8-.94-2.91L15 9h-3.03z"></path></g>\n<g id="inbox"><path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"></path></g>\n<g id="indeterminate-check-box"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"></path></g>\n<g id="info"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></g>\n<g id="info-outline"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></g>\n<g id="input"><path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"></path></g>\n<g id="invert-colors"><path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"></path></g>\n<g id="label"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"></path></g>\n<g id="label-outline"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></g>\n<g id="language"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path></g>\n<g id="last-page"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path></g>\n<g id="launch"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>\n<g id="lightbulb-outline"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path></g>\n<g id="line-style"><path d="M3 16h5v-2H3v2zm6.5 0h5v-2h-5v2zm6.5 0h5v-2h-5v2zM3 20h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM3 12h8v-2H3v2zm10 0h8v-2h-8v2zM3 4v4h18V4H3z"></path></g>\n<g id="line-weight"><path d="M3 17h18v-2H3v2zm0 3h18v-1H3v1zm0-7h18v-3H3v3zm0-9v4h18V4H3z"></path></g>\n<g id="link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>\n<g id="list"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path></g>\n<g id="lock"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>\n<g id="lock-open"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"></path></g>\n<g id="lock-outline"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"></path></g>\n<g id="low-priority"><path d="M14 5h8v2h-8zm0 5.5h8v2h-8zm0 5.5h8v2h-8zM2 11.5C2 15.08 4.92 18 8.5 18H9v2l3-3-3-3v2h-.5C6.02 16 4 13.98 4 11.5S6.02 7 8.5 7H12V5H8.5C4.92 5 2 7.92 2 11.5z"></path></g>\n<g id="loyalty"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7zm11.77 8.27L13 19.54l-4.27-4.27C8.28 14.81 8 14.19 8 13.5c0-1.38 1.12-2.5 2.5-2.5.69 0 1.32.28 1.77.74l.73.72.73-.73c.45-.45 1.08-.73 1.77-.73 1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.32-.73 1.77z"></path></g>\n<g id="mail"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>\n<g id="markunread"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>\n<g id="markunread-mailbox"><path d="M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"></path></g>\n<g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>\n<g id="more-horiz"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>\n<g id="more-vert"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>\n<g id="motorcycle"><path d="M19.44 9.03L15.41 5H11v2h3.59l2 2H5c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h1.65l2.77-2.77c-.21.54-.32 1.14-.32 1.77 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.65-1.97-4.77-4.56-4.97zM7.82 15C7.4 16.15 6.28 17 5 17c-1.63 0-3-1.37-3-3s1.37-3 3-3c1.28 0 2.4.85 2.82 2H5v2h2.82zM19 17c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path></g>\n<g id="move-to-inbox"><path d="M19 3H4.99c-1.11 0-1.98.9-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10zm-3-5h-2V7h-4v3H8l4 4 4-4z"></path></g>\n<g id="next-week"><path d="M20 7h-4V5c0-.55-.22-1.05-.59-1.41C15.05 3.22 14.55 3 14 3h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm1 13.5l-1-1 3-3-3-3 1-1 4 4-4 4z"></path></g>\n<g id="note-add"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"></path></g>\n<g id="offline-pin"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z"></path></g>\n<g id="opacity"><path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z"></path></g>\n<g id="open-in-browser"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z"></path></g>\n<g id="open-in-new"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>\n<g id="open-with"><path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"></path></g>\n<g id="pageview"><path d="M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z"></path></g>\n<g id="pan-tool"><path d="M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"></path></g>\n<g id="payment"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>\n<g id="perm-camera-mic"><path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v-2.09c-2.83-.48-5-2.94-5-5.91h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 2.97-2.17 5.43-5 5.91V21h7c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-6 8c0 1.1-.9 2-2 2s-2-.9-2-2V9c0-1.1.9-2 2-2s2 .9 2 2v4z"></path></g>\n<g id="perm-contact-calendar"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"></path></g>\n<g id="perm-data-setting"><path d="M18.99 11.5c.34 0 .67.03 1 .07L20 0 0 20h11.56c-.04-.33-.07-.66-.07-1 0-4.14 3.36-7.5 7.5-7.5zm3.71 7.99c.02-.16.04-.32.04-.49 0-.17-.01-.33-.04-.49l1.06-.83c.09-.08.12-.21.06-.32l-1-1.73c-.06-.11-.19-.15-.31-.11l-1.24.5c-.26-.2-.54-.37-.85-.49l-.19-1.32c-.01-.12-.12-.21-.24-.21h-2c-.12 0-.23.09-.25.21l-.19 1.32c-.3.13-.59.29-.85.49l-1.24-.5c-.11-.04-.24 0-.31.11l-1 1.73c-.06.11-.04.24.06.32l1.06.83c-.02.16-.03.32-.03.49 0 .17.01.33.03.49l-1.06.83c-.09.08-.12.21-.06.32l1 1.73c.06.11.19.15.31.11l1.24-.5c.26.2.54.37.85.49l.19 1.32c.02.12.12.21.25.21h2c.12 0 .23-.09.25-.21l.19-1.32c.3-.13.59-.29.84-.49l1.25.5c.11.04.24 0 .31-.11l1-1.73c.06-.11.03-.24-.06-.32l-1.07-.83zm-3.71 1.01c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>\n<g id="perm-device-information"><path d="M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm4-9.99L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"></path></g>\n<g id="perm-identity"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path></g>\n<g id="perm-media"><path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"></path></g>\n<g id="perm-phone-msg"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z"></path></g>\n<g id="perm-scan-wifi"><path d="M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3zm1 13h-2v-6h2v6zm-2-8V6h2v2h-2z"></path></g>\n<g id="pets"><circle cx="4.5" cy="9.5" r="2.5"></circle><circle cx="9" cy="5.5" r="2.5"></circle><circle cx="15" cy="5.5" r="2.5"></circle><circle cx="19.5" cy="9.5" r="2.5"></circle><path d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"></path></g>\n<g id="picture-in-picture"><path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"></path></g>\n<g id="picture-in-picture-alt"><path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"></path></g>\n<g id="play-for-work"><path d="M11 5v5.59H7.5l4.5 4.5 4.5-4.5H13V5h-2zm-5 9c0 3.31 2.69 6 6 6s6-2.69 6-6h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H6z"></path></g>\n<g id="polymer"><path d="M19 4h-4L7.11 16.63 4.5 12 9 4H5L.5 12 5 20h4l7.89-12.63L19.5 12 15 20h4l4.5-8z"></path></g>\n<g id="power-settings-new"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path></g>\n<g id="pregnant-woman"><path d="M9 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm7 9c-.01-1.34-.83-2.51-2-3 0-1.66-1.34-3-3-3s-3 1.34-3 3v7h2v5h3v-5h3v-4z"></path></g>\n<g id="print"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"></path></g>\n<g id="query-builder"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>\n<g id="question-answer"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"></path></g>\n<g id="radio-button-checked"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>\n<g id="radio-button-unchecked"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>\n<g id="receipt"><path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"></path></g>\n<g id="record-voice-over"><circle cx="9" cy="9" r="4"></circle><path d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64l-1.68 1.69c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27zM20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14z"></path></g>\n<g id="redeem"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>\n<g id="redo"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"></path></g>\n<g id="refresh"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></g>\n<g id="remove"><path d="M19 13H5v-2h14v2z"></path></g>\n<g id="remove-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></g>\n<g id="remove-circle-outline"><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>\n<g id="remove-shopping-cart"><path d="M22.73 22.73L2.77 2.77 2 2l-.73-.73L0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.27-1.27zM7.42 15c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h2.36l2 2H7.42zm8.13-2c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H6.54l9.01 9zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z"></path></g>\n<g id="reorder"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"></path></g>\n<g id="reply"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>\n<g id="reply-all"><path d="M7 8V5l-7 7 7 7v-3l-4-4 4-4zm6 1V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>\n<g id="report"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"></path></g>\n<g id="report-problem"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>\n<g id="restore"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>\n<g id="restore-page"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 16c-2.05 0-3.81-1.24-4.58-3h1.71c.63.9 1.68 1.5 2.87 1.5 1.93 0 3.5-1.57 3.5-3.5S13.93 9.5 12 9.5c-1.35 0-2.52.78-3.1 1.9l1.6 1.6h-4V9l1.3 1.3C8.69 8.92 10.23 8 12 8c2.76 0 5 2.24 5 5s-2.24 5-5 5z"></path></g>\n<g id="room"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>\n<g id="rounded-corner"><path d="M19 19h2v2h-2v-2zm0-2h2v-2h-2v2zM3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm0-4h2V3H3v2zm4 0h2V3H7v2zm8 16h2v-2h-2v2zm-4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm-8 0h2v-2H7v2zm-4 0h2v-2H3v2zM21 8c0-2.76-2.24-5-5-5h-5v2h5c1.65 0 3 1.35 3 3v5h2V8z"></path></g>\n<g id="rowing"><path d="M8.5 14.5L4 19l1.5 1.5L9 17h2l-2.5-2.5zM15 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 20.01L18 24l-2.99-3.01V19.5l-7.1-7.09c-.31.05-.61.07-.91.07v-2.16c1.66.03 3.61-.87 4.67-2.04l1.4-1.55c.19-.21.43-.38.69-.5.29-.14.62-.23.96-.23h.03C15.99 6.01 17 7.02 17 8.26v5.75c0 .84-.35 1.61-.92 2.16l-3.58-3.58v-2.27c-.63.52-1.43 1.02-2.29 1.39L16.5 18H18l3 3.01z"></path></g>\n<g id="save"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></g>\n<g id="schedule"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>\n<g id="search"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></g>\n<g id="select-all"><path d="M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z"></path></g>\n<g id="send"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></g>\n<g id="settings"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g>\n<g id="settings-applications"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z"></path></g>\n<g id="settings-backup-restore"><path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"></path></g>\n<g id="settings-bluetooth"><path d="M11 24h2v-2h-2v2zm-4 0h2v-2H7v2zm8 0h2v-2h-2v2zm2.71-18.29L12 0h-1v7.59L6.41 3 5 4.41 10.59 10 5 15.59 6.41 17 11 12.41V20h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 3.83l1.88 1.88L13 7.59V3.83zm1.88 10.46L13 16.17v-3.76l1.88 1.88z"></path></g>\n<g id="settings-brightness"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02zM8 16h2.5l1.5 1.5 1.5-1.5H16v-2.5l1.5-1.5-1.5-1.5V8h-2.5L12 6.5 10.5 8H8v2.5L6.5 12 8 13.5V16zm4-7c1.66 0 3 1.34 3 3s-1.34 3-3 3V9z"></path></g>\n<g id="settings-cell"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM16 .01L8 0C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-1.99-2-1.99zM16 16H8V4h8v12z"></path></g>\n<g id="settings-ethernet"><path d="M7.77 6.76L6.23 5.48.82 12l5.41 6.52 1.54-1.28L3.42 12l4.35-5.24zM7 13h2v-2H7v2zm10-2h-2v2h2v-2zm-6 2h2v-2h-2v2zm6.77-7.52l-1.54 1.28L20.58 12l-4.35 5.24 1.54 1.28L23.18 12l-5.41-6.52z"></path></g>\n<g id="settings-input-antenna"><path d="M12 5c-3.87 0-7 3.13-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.87-3.13-7-7-7zm1 9.29c.88-.39 1.5-1.26 1.5-2.29 0-1.38-1.12-2.5-2.5-2.5S9.5 10.62 9.5 12c0 1.02.62 1.9 1.5 2.29v3.3L7.59 21 9 22.41l3-3 3 3L16.41 21 13 17.59v-3.3zM12 1C5.93 1 1 5.93 1 12h2c0-4.97 4.03-9 9-9s9 4.03 9 9h2c0-6.07-4.93-11-11-11z"></path></g>\n<g id="settings-input-component"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>\n<g id="settings-input-composite"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>\n<g id="settings-input-hdmi"><path d="M18 7V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3H5v6l3 6v3h8v-3l3-6V7h-1zM8 4h8v3h-2V5h-1v2h-2V5h-1v2H8V4z"></path></g>\n<g id="settings-input-svideo"><path d="M8 11.5c0-.83-.67-1.5-1.5-1.5S5 10.67 5 11.5 5.67 13 6.5 13 8 12.33 8 11.5zm7-5c0-.83-.67-1.5-1.5-1.5h-3C9.67 5 9 5.67 9 6.5S9.67 8 10.5 8h3c.83 0 1.5-.67 1.5-1.5zM8.5 15c-.83 0-1.5.67-1.5 1.5S7.67 18 8.5 18s1.5-.67 1.5-1.5S9.33 15 8.5 15zM12 1C5.93 1 1 5.93 1 12s4.93 11 11 11 11-4.93 11-11S18.07 1 12 1zm0 20c-4.96 0-9-4.04-9-9s4.04-9 9-9 9 4.04 9 9-4.04 9-9 9zm5.5-11c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-2 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path></g>\n<g id="settings-overscan"><path d="M12.01 5.5L10 8h4l-1.99-2.5zM18 10v4l2.5-1.99L18 10zM6 10l-2.5 2.01L6 14v-4zm8 6h-4l2.01 2.5L14 16zm7-13H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>\n<g id="settings-phone"><path d="M13 9h-2v2h2V9zm4 0h-2v2h2V9zm3 6.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 9v2h2V9h-2z"></path></g>\n<g id="settings-power"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm2-22h-2v10h2V2zm3.56 2.44l-1.45 1.45C16.84 6.94 18 8.83 18 11c0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 4.44C5.36 5.88 4 8.28 4 11c0 4.42 3.58 8 8 8s8-3.58 8-8c0-2.72-1.36-5.12-3.44-6.56zM15 24h2v-2h-2v2z"></path></g>\n<g id="settings-remote"><path d="M15 9H9c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V10c0-.55-.45-1-1-1zm-3 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7.05 6.05l1.41 1.41C9.37 6.56 10.62 6 12 6s2.63.56 3.54 1.46l1.41-1.41C15.68 4.78 13.93 4 12 4s-3.68.78-4.95 2.05zM12 0C8.96 0 6.21 1.23 4.22 3.22l1.41 1.41C7.26 3.01 9.51 2 12 2s4.74 1.01 6.36 2.64l1.41-1.41C17.79 1.23 15.04 0 12 0z"></path></g>\n<g id="settings-voice"><path d="M7 24h2v-2H7v2zm5-11c1.66 0 2.99-1.34 2.99-3L15 4c0-1.66-1.34-3-3-3S9 2.34 9 4v6c0 1.66 1.34 3 3 3zm-1 11h2v-2h-2v2zm4 0h2v-2h-2v2zm4-14h-1.7c0 3-2.54 5.1-5.3 5.1S6.7 13 6.7 10H5c0 3.41 2.72 6.23 6 6.72V20h2v-3.28c3.28-.49 6-3.31 6-6.72z"></path></g>\n<g id="shop"><path d="M16 6V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H2v13c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6h-6zm-6-2h4v2h-4V4zM9 18V9l7.5 4L9 18z"></path></g>\n<g id="shop-two"><path d="M3 9H1v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2H3V9zm15-4V3c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H5v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5h-5zm-6-2h4v2h-4V3zm0 12V8l5.5 3-5.5 4z"></path></g>\n<g id="shopping-basket"><path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>\n<g id="shopping-cart"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></g>\n<g id="sort"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></g>\n<g id="speaker-notes"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 14H6v-2h2v2zm0-3H6V9h2v2zm0-3H6V6h2v2zm7 6h-5v-2h5v2zm3-3h-8V9h8v2zm0-3h-8V6h8v2z"></path></g>\n<g id="speaker-notes-off"><path d="M10.54 11l-.54-.54L7.54 8 6 6.46 2.38 2.84 1.27 1.73 0 3l2.01 2.01L2 22l4-4h9l5.73 5.73L22 22.46 17.54 18l-7-7zM8 14H6v-2h2v2zm-2-3V9l2 2H6zm14-9H4.08L10 7.92V6h8v2h-7.92l1 1H18v2h-4.92l6.99 6.99C21.14 17.95 22 17.08 22 16V4c0-1.1-.9-2-2-2z"></path></g>\n<g id="spellcheck"><path d="M12.45 16h2.09L9.43 3H7.57L2.46 16h2.09l1.12-3h5.64l1.14 3zm-6.02-5L8.5 5.48 10.57 11H6.43zm15.16.59l-8.09 8.09L9.83 16l-1.41 1.41 5.09 5.09L23 13l-1.41-1.41z"></path></g>\n<g id="star"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>\n<g id="star-border"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>\n<g id="star-half"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>\n<g id="stars"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path></g>\n<g id="store"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"></path></g>\n<g id="subdirectory-arrow-left"><path d="M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z"></path></g>\n<g id="subdirectory-arrow-right"><path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path></g>\n<g id="subject"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"></path></g>\n<g id="supervisor-account"><path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z"></path></g>\n<g id="swap-horiz"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></g>\n<g id="swap-vert"><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"></path></g>\n<g id="swap-vertical-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z"></path></g>\n<g id="system-update-alt"><path d="M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z"></path></g>\n<g id="tab"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h10v4h8v10z"></path></g>\n<g id="tab-unselected"><path d="M1 9h2V7H1v2zm0 4h2v-2H1v2zm0-8h2V3c-1.1 0-2 .9-2 2zm8 16h2v-2H9v2zm-8-4h2v-2H1v2zm2 4v-2H1c0 1.1.9 2 2 2zM21 3h-8v6h10V5c0-1.1-.9-2-2-2zm0 14h2v-2h-2v2zM9 5h2V3H9v2zM5 21h2v-2H5v2zM5 5h2V3H5v2zm16 16c1.1 0 2-.9 2-2h-2v2zm0-8h2v-2h-2v2zm-8 8h2v-2h-2v2zm4 0h2v-2h-2v2z"></path></g>\n<g id="text-format"><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"></path></g>\n<g id="theaters"><path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path></g>\n<g id="thumb-down"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path></g>\n<g id="thumb-up"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"></path></g>\n<g id="thumbs-up-down"><path d="M12 6c0-.55-.45-1-1-1H5.82l.66-3.18.02-.23c0-.31-.13-.59-.33-.8L5.38 0 .44 4.94C.17 5.21 0 5.59 0 6v6.5c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6zm10.5 4h-6.75c-.62 0-1.15.38-1.38.91l-2.26 5.29c-.07.17-.11.36-.11.55V18c0 .55.45 1 1 1h5.18l-.66 3.18-.02.24c0 .31.13.59.33.8l.79.78 4.94-4.94c.27-.27.44-.65.44-1.06v-6.5c0-.83-.67-1.5-1.5-1.5z"></path></g>\n<g id="timeline"><path d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z"></path></g>\n<g id="toc"><path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"></path></g>\n<g id="today"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path></g>\n<g id="toll"><path d="M15 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zM3 12c0-2.61 1.67-4.83 4-5.65V4.26C3.55 5.15 1 8.27 1 12s2.55 6.85 6 7.74v-2.09c-2.33-.82-4-3.04-4-5.65z"></path></g>\n<g id="touch-app"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"></path></g>\n<g id="track-changes"><path d="M19.07 4.93l-1.41 1.41C19.1 7.79 20 9.79 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-4.08 3.05-7.44 7-7.93v2.02C8.16 6.57 6 9.03 6 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.66-.67-3.16-1.76-4.24l-1.41 1.41C15.55 9.9 16 10.9 16 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.86 1.28-3.41 3-3.86v2.14c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V2h-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07z"></path></g>\n<g id="translate"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></g>\n<g id="trending-down"><path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"></path></g>\n<g id="trending-flat"><path d="M22 12l-4-4v3H3v2h15v3z"></path></g>\n<g id="trending-up"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></g>\n<g id="turned-in"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>\n<g id="turned-in-not"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>\n<g id="unarchive"><path d="M20.55 5.22l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.15.55L3.46 5.22C3.17 5.57 3 6.01 3 6.5V19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.49-.17-.93-.45-1.28zM12 9.5l5.5 5.5H14v2h-4v-2H6.5L12 9.5zM5.12 5l.82-1h12l.93 1H5.12z"></path></g>\n<g id="undo"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"></path></g>\n<g id="unfold-less"><path d="M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z"></path></g>\n<g id="unfold-more"><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path></g>\n<g id="update"><path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79 2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58 3.51-3.47 9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z"></path></g>\n<g id="verified-user"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>\n<g id="view-agenda"><path d="M20 13H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm0-10H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z"></path></g>\n<g id="view-array"><path d="M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z"></path></g>\n<g id="view-carousel"><path d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"></path></g>\n<g id="view-column"><path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"></path></g>\n<g id="view-day"><path d="M2 21h19v-3H2v3zM20 8H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zM2 3v3h19V3H2z"></path></g>\n<g id="view-headline"><path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"></path></g>\n<g id="view-list"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"></path></g>\n<g id="view-module"><path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"></path></g>\n<g id="view-quilt"><path d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z"></path></g>\n<g id="view-stream"><path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z"></path></g>\n<g id="view-week"><path d="M6 5H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm14 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-7 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z"></path></g>\n<g id="visibility"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></g>\n<g id="visibility-off"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></g>\n<g id="warning"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>\n<g id="watch-later"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"></path></g>\n<g id="weekend"><path d="M21 10c-1.1 0-2 .9-2 2v3H5v-3c0-1.1-.9-2-2-2s-2 .9-2 2v5c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2zm-3-5H6c-1.1 0-2 .9-2 2v2.15c1.16.41 2 1.51 2 2.82V14h12v-2.03c0-1.3.84-2.4 2-2.82V7c0-1.1-.9-2-2-2z"></path></g>\n<g id="work"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path></g>\n<g id="youtube-searched-for"><path d="M17.01 14h-.8l-.27-.27c.98-1.14 1.57-2.61 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 3-6.5 6.5H2l3.84 4 4.16-4H6.51C6.51 7 8.53 5 11.01 5s4.5 2.01 4.5 4.5c0 2.48-2.02 4.5-4.5 4.5-.65 0-1.26-.14-1.82-.38L7.71 15.1c.97.57 2.09.9 3.3.9 1.61 0 3.08-.59 4.22-1.57l.27.27v.79l5.01 4.99L22 19l-4.99-5z"></path></g>\n<g id="zoom-in"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm2.5-4h-2v2H9v-2H7V9h2V7h1v2h2v1z"></path></g>\n<g id="zoom-out"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"></path></g>\n</defs></svg>\n</iron-iconset-svg>';
document.head.appendChild($k.content);
var al = ['\n    <style>\n      :host {\n        display: inline-block;\n        position: relative;\n        padding: 8px;\n        outline: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        cursor: pointer;\n        z-index: 0;\n        line-height: 1;\n\n        width: 40px;\n        height: 40px;\n\n        /* NOTE: Both values are needed, since some phones require the value to be `transparent`. */\n        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n        -webkit-tap-highlight-color: transparent;\n\n        /* Because of polymer/2558, this style has lower specificity than * */\n        box-sizing: border-box !important;\n\n        @apply --paper-icon-button;\n      }\n\n      :host #ink {\n        color: var(--paper-icon-button-ink-color, var(--primary-text-color));\n        opacity: 0.6;\n      }\n\n      :host([disabled]) {\n        color: var(--paper-icon-button-disabled-text, var(--disabled-text-color));\n        pointer-events: none;\n        cursor: auto;\n\n        @apply --paper-icon-button-disabled;\n      }\n\n      :host([hidden]) {\n        display: none !important;\n      }\n\n      :host(:hover) {\n        @apply --paper-icon-button-hover;\n      }\n\n      iron-icon {\n        --iron-icon-width: 100%;\n        --iron-icon-height: 100%;\n      }\n    </style>\n\n    <iron-icon id="icon" src="[[src]]" icon="[[icon]]" alt$="[[alt]]"></iron-icon>\n  '];
al.raw = ['\n    <style>\n      :host {\n        display: inline-block;\n        position: relative;\n        padding: 8px;\n        outline: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        cursor: pointer;\n        z-index: 0;\n        line-height: 1;\n\n        width: 40px;\n        height: 40px;\n\n        /* NOTE: Both values are needed, since some phones require the value to be \\`transparent\\`. */\n        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n        -webkit-tap-highlight-color: transparent;\n\n        /* Because of polymer/2558, this style has lower specificity than * */\n        box-sizing: border-box !important;\n\n        @apply --paper-icon-button;\n      }\n\n      :host #ink {\n        color: var(--paper-icon-button-ink-color, var(--primary-text-color));\n        opacity: 0.6;\n      }\n\n      :host([disabled]) {\n        color: var(--paper-icon-button-disabled-text, var(--disabled-text-color));\n        pointer-events: none;\n        cursor: auto;\n\n        @apply --paper-icon-button-disabled;\n      }\n\n      :host([hidden]) {\n        display: none !important;\n      }\n\n      :host(:hover) {\n        @apply --paper-icon-button-hover;\n      }\n\n      iron-icon {\n        --iron-icon-width: 100%;\n        --iron-icon-height: 100%;\n      }\n    </style>\n\n    <iron-icon id="icon" src="[[src]]" icon="[[icon]]" alt$="[[alt]]"></iron-icon>\n  '];
Y({
  is: 'paper-icon-button',
  _template: S(al),
  hostAttributes: { role: 'button', tabindex: '0' },
  behaviors: [Dj],
  properties: { src: { type: String }, icon: { type: String }, alt: { type: String, observer: '_altChanged' } },
  _altChanged: function(a, b) {
    var c = this.getAttribute('aria-label');
    c && b != c || this.setAttribute('aria-label', a);
  },
  registered: function() {
    this._template.setAttribute('strip-whitespace', '');
  },
});
var bl = function(a) {
  var b = M(a);
  a = b.width;
  b = b.height;
  return N({ width: b, height: a });
}, cl = function(a) {
  return U.apply(this, arguments) || this;
};
w(cl, U);
m = cl.prototype;
m.ready = function() {
  this.minSize_ = 20;
  this.maxSize_ = 2E3;
  this.modeLabels_ = {};
  for (var a in K.PreviewMode) {
    var b = K.PreviewMode[a];
    this.modeLabels_[b] = this.getMsg_(a + '_MODE');
  }
  U.prototype.ready.call(this);
};
m.computeSortedSizes_ = function(a) {
  a = a.map(function(b) {
    return M(b);
  });
  a.sort(function(b, c) {
    return b.width == c.width ? b.height - c.height : b.width - c.width;
  });
  return a.map(function(b) {
    return N(b);
  });
};
m.computeEnabledControls_ = function(a, b, c) {
  var d = {};
  d = (d.mode = !1, d.size = !1, d.feed = !1, d);
  0 < a.length && (d.size = 1 < b.length, d.feed = 0 < c.length, 1 < a.length ? d.mode = !0 : (a = a[0] == K.PreviewMode.PARALLAX || a[0] == K.PreviewMode.MOBILE, d.mode = d.size || d.feed || a));
  return d;
};
m.computeHasControls_ = function(a) {
  for (var b in a) if (a[b]) return !0;
  return !1;
};
m.getMsg_ = function(a) {
  return Ed(a);
};
m.modeIs_ = function(a, b) {
  return a == b;
};
m.getModesItemsList_ = function(a) {
  var b = this;
  return a.map(function(c) {
    return { value: c, label: b.modeLabels_[c] };
  });
};
m.getSizesItemsList_ = function(a) {
  return a.map(function(b) {
    var c = M(b);
    c = c.width + ' x ' + c.height;
    return { value: b, label: c };
  });
};
m.getFeedsItemsList_ = function(a) {
  return a.map(function(b) {
    var c = b || Ed('NO_SAMPLE_DATA');
    return { value: b, label: c };
  });
};
m.getDevicesItemsList_ = function() {
  var a = [];
  K.Devices.forEach(function(b, c) {
    b = { value: c, label: b.name };
    a.push(b);
  });
  return a;
};
m.getSizeSelectorValue_ = function(a, b) {
  return b ? 'custom' : a;
};
m.getControlEnabledClass_ = function(a) {
  return a ? 'control-enabled' : '';
};
m.onSizeSelectorChange_ = function(a) {
  a = a.target.value;
  this.set('modeSettings.single.isCustomSize', 'custom' == a);
  'custom' != a && this.set('modeSettings.single.size', a);
};
m.onMobileDeviceSelectorChange_ = function(a) {
  this.handleDeviceSelectorChange_(K.PreviewMode.MOBILE, a.target.value);
};
m.onParallaxDeviceSelectorChange_ = function(a) {
  this.handleDeviceSelectorChange_(K.PreviewMode.PARALLAX, a.target.value);
};
m.handleDeviceSelectorChange_ = function(a, b) {
  this.set('modeSettings.' + a + '.isCustomSize', 'custom' == b);
  'custom' != b && (this.set('modeSettings.' + a + '.device', b), b = N(K.Devices.get(b)), this.modeSettings[a].isRotated && (b = bl(b)), this.set('modeSettings.' + a + '.deviceSize', b));
};
m.onMobileRotateButtonClick_ = function() {
  this.handleRotateButtonClick_(K.PreviewMode.MOBILE);
};
m.onParallaxRotateButtonClick_ = function() {
  this.handleRotateButtonClick_(K.PreviewMode.PARALLAX);
};
m.handleRotateButtonClick_ = function(a) {
  this.set('modeSettings.' + a + '.isRotated', !this.modeSettings[a].isRotated);
  var b = bl(this.modeSettings[a].deviceSize);
  this.set('modeSettings.' + a + '.deviceSize', b);
};
m.onReloadButtonClick_ = function() {
  this.dispatchEvent(new CustomEvent('reload-view'));
};
x.Object.defineProperties(cl, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'tf-creative-preview-controls';
    },
  }, properties: {
    configurable: !0, enumerable: !0, get: function() {
      return {
        modes: {
          type: Array, value: function() {
            return [];
          },
        }, sizes: {
          type: Array, value: function() {
            return [];
          },
        }, sortedSizes_: {
          type: Array, value: function() {
            return [];
          }, computed: 'computeSortedSizes_(sizes)', readOnly: !0,
        }, feeds: {
          type: Array, value: function() {
            return [];
          },
        }, mode: { type: String, notify: !0 }, modeSettings: { type: Object, notify: !0 }, hasControls: {
          type: Boolean,
          reflectToAttribute: !0, computed: 'computeHasControls_(enabledControls_)', readOnly: !0,
        }, enabledControls_: { type: Object, computed: 'computeEnabledControls_(modes, sizes, feeds)', readOnly: !0 },
      };
    },
  },
});
cl.prototype._setSortedSizes_ = function() {
};
cl.prototype._setHasControls = function() {
};
cl.prototype._setEnabledControls_ = function() {
};
customElements.define(cl.is, cl);
var dl = Ua(Ma(new H(Ka, 'about:blank'))), Z = function(a) {
  return U.apply(this, arguments) || this;
};
w(Z, U);
Z.prototype.getIframeSrc = function(a, b, c) {
  c ? (c = b, b = new H(Ka, './%{previewPath}'), c = c || void 0, a = { previewPath: a }, c = { feed: c }, b = Ya(b, a), b = b.cloneWithParams(c, void 0)) : b = dl;
  return b;
};
Z.prototype.reload = function() {
};
x.Object.defineProperties(Z, {
  properties: {
    configurable: !0, enumerable: !0, get: function() {
      return { previewPath: String, active: { type: Boolean, reflectToAttribute: !0 } };
    },
  },
});
var el = function(a) {
  return Z.apply(this, arguments) || this;
};
w(el, Z);
el.prototype.reload = function() {
  Fd(this.$.iframe);
};
x.Object.defineProperties(el, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'tf-creative-preview-desktop';
    },
  }, properties: {
    configurable: !0, enumerable: !0, get: function() {
      return { feed: String };
    },
  },
});
customElements.define(el.is, el);
var fl = document.createElement('template');
fl.setAttribute('style', 'display: none;');
fl.innerHTML = '<iron-iconset-svg name="editor" size="24">\n<svg><defs>\n<g id="attach-file"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"></path></g>\n<g id="attach-money"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path></g>\n<g id="border-all"><path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z"></path></g>\n<g id="border-bottom"><path d="M9 11H7v2h2v-2zm4 4h-2v2h2v-2zM9 3H7v2h2V3zm4 8h-2v2h2v-2zM5 3H3v2h2V3zm8 4h-2v2h2V7zm4 4h-2v2h2v-2zm-4-8h-2v2h2V3zm4 0h-2v2h2V3zm2 10h2v-2h-2v2zm0 4h2v-2h-2v2zM5 7H3v2h2V7zm14-4v2h2V3h-2zm0 6h2V7h-2v2zM5 11H3v2h2v-2zM3 21h18v-2H3v2zm2-6H3v2h2v-2z"></path></g>\n<g id="border-clear"><path d="M7 5h2V3H7v2zm0 8h2v-2H7v2zm0 8h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm-8 0h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2V7H3v2zm0-4h2V3H3v2zm8 8h2v-2h-2v2zm8 4h2v-2h-2v2zm0-4h2v-2h-2v2zm0 8h2v-2h-2v2zm0-12h2V7h-2v2zm-8 0h2V7h-2v2zm8-6v2h2V3h-2zm-8 2h2V3h-2v2zm4 16h2v-2h-2v2zm0-8h2v-2h-2v2zm0-8h2V3h-2v2z"></path></g>\n<g id="border-color"><path d="M17.75 7L14 3.25l-10 10V17h3.75l10-10zm2.96-2.96c.39-.39.39-1.02 0-1.41L18.37.29c-.39-.39-1.02-.39-1.41 0L15 2.25 18.75 6l1.96-1.96z"></path><path fill-opacity=".36" d="M0 20h24v4H0z"></path></g>\n<g id="border-horizontal"><path d="M3 21h2v-2H3v2zM5 7H3v2h2V7zM3 17h2v-2H3v2zm4 4h2v-2H7v2zM5 3H3v2h2V3zm4 0H7v2h2V3zm8 0h-2v2h2V3zm-4 4h-2v2h2V7zm0-4h-2v2h2V3zm6 14h2v-2h-2v2zm-8 4h2v-2h-2v2zm-8-8h18v-2H3v2zM19 3v2h2V3h-2zm0 6h2V7h-2v2zm-8 8h2v-2h-2v2zm4 4h2v-2h-2v2zm4 0h2v-2h-2v2z"></path></g>\n<g id="border-inner"><path d="M3 21h2v-2H3v2zm4 0h2v-2H7v2zM5 7H3v2h2V7zM3 17h2v-2H3v2zM9 3H7v2h2V3zM5 3H3v2h2V3zm12 0h-2v2h2V3zm2 6h2V7h-2v2zm0-6v2h2V3h-2zm-4 18h2v-2h-2v2zM13 3h-2v8H3v2h8v8h2v-8h8v-2h-8V3zm6 18h2v-2h-2v2zm0-4h2v-2h-2v2z"></path></g>\n<g id="border-left"><path d="M11 21h2v-2h-2v2zm0-4h2v-2h-2v2zm0-12h2V3h-2v2zm0 4h2V7h-2v2zm0 4h2v-2h-2v2zm-4 8h2v-2H7v2zM7 5h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2V3H3v18zM19 9h2V7h-2v2zm-4 12h2v-2h-2v2zm4-4h2v-2h-2v2zm0-14v2h2V3h-2zm0 10h2v-2h-2v2zm0 8h2v-2h-2v2zm-4-8h2v-2h-2v2zm0-8h2V3h-2v2z"></path></g>\n<g id="border-outer"><path d="M13 7h-2v2h2V7zm0 4h-2v2h2v-2zm4 0h-2v2h2v-2zM3 3v18h18V3H3zm16 16H5V5h14v14zm-6-4h-2v2h2v-2zm-4-4H7v2h2v-2z"></path></g>\n<g id="border-right"><path d="M7 21h2v-2H7v2zM3 5h2V3H3v2zm4 0h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2v-2H3v2zm8 0h2v-2h-2v2zm-8-8h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm8 8h2v-2h-2v2zm4-4h2v-2h-2v2zm4-10v18h2V3h-2zm-4 18h2v-2h-2v2zm0-16h2V3h-2v2zm-4 8h2v-2h-2v2zm0-8h2V3h-2v2zm0 4h2V7h-2v2z"></path></g>\n<g id="border-style"><path d="M15 21h2v-2h-2v2zm4 0h2v-2h-2v2zM7 21h2v-2H7v2zm4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zM3 3v18h2V5h16V3H3zm16 6h2V7h-2v2z"></path></g>\n<g id="border-top"><path d="M7 21h2v-2H7v2zm0-8h2v-2H7v2zm4 0h2v-2h-2v2zm0 8h2v-2h-2v2zm-8-4h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2v-2H3v2zm0-4h2V7H3v2zm8 8h2v-2h-2v2zm8-8h2V7h-2v2zm0 4h2v-2h-2v2zM3 3v2h18V3H3zm16 14h2v-2h-2v2zm-4 4h2v-2h-2v2zM11 9h2V7h-2v2zm8 12h2v-2h-2v2zm-4-8h2v-2h-2v2z"></path></g>\n<g id="border-vertical"><path d="M3 9h2V7H3v2zm0-4h2V3H3v2zm4 16h2v-2H7v2zm0-8h2v-2H7v2zm-4 0h2v-2H3v2zm0 8h2v-2H3v2zm0-4h2v-2H3v2zM7 5h2V3H7v2zm12 12h2v-2h-2v2zm-8 4h2V3h-2v18zm8 0h2v-2h-2v2zm0-8h2v-2h-2v2zm0-10v2h2V3h-2zm0 6h2V7h-2v2zm-4-4h2V3h-2v2zm0 16h2v-2h-2v2zm0-8h2v-2h-2v2z"></path></g>\n<g id="bubble-chart"><circle cx="7.2" cy="14.4" r="3.2"></circle><circle cx="14.8" cy="18" r="2"></circle><circle cx="15.2" cy="8.8" r="4.8"></circle></g>\n<g id="drag-handle"><path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path></g>\n<g id="format-align-center"><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"></path></g>\n<g id="format-align-justify"><path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"></path></g>\n<g id="format-align-left"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"></path></g>\n<g id="format-align-right"><path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"></path></g>\n<g id="format-bold"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path></g>\n<g id="format-clear"><path d="M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21 18 19.73 3.55 5.27 3.27 5zM6 5v.18L8.82 8h2.4l-.72 1.68 2.1 2.1L14.21 8H20V5H6z"></path></g>\n<g id="format-color-fill"><path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"></path><path fill-opacity=".36" d="M0 20h24v4H0z"></path></g>\n<g id="format-color-reset"><path d="M18 14c0-4-6-10.8-6-10.8s-1.33 1.51-2.73 3.52l8.59 8.59c.09-.42.14-.86.14-1.31zm-.88 3.12L12.5 12.5 5.27 5.27 4 6.55l3.32 3.32C6.55 11.32 6 12.79 6 14c0 3.31 2.69 6 6 6 1.52 0 2.9-.57 3.96-1.5l2.63 2.63 1.27-1.27-2.74-2.74z"></path></g>\n<g id="format-color-text"><path fill-opacity=".36" d="M0 20h24v4H0z"></path><path d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"></path></g>\n<g id="format-indent-decrease"><path d="M11 17h10v-2H11v2zm-8-5l4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"></path></g>\n<g id="format-indent-increase"><path d="M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"></path></g>\n<g id="format-italic"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path></g>\n<g id="format-line-spacing"><path d="M6 7h2.5L5 3.5 1.5 7H4v10H1.5L5 20.5 8.5 17H6V7zm4-2v2h12V5H10zm0 14h12v-2H10v2zm0-6h12v-2H10v2z"></path></g>\n<g id="format-list-bulleted"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"></path></g>\n<g id="format-list-numbered"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"></path></g>\n<g id="format-paint"><path d="M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4h-3z"></path></g>\n<g id="format-quote"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path></g>\n<g id="format-shapes"><path d="M23 7V1h-6v2H7V1H1v6h2v10H1v6h6v-2h10v2h6v-6h-2V7h2zM3 3h2v2H3V3zm2 18H3v-2h2v2zm12-2H7v-2H5V7h2V5h10v2h2v10h-2v2zm4 2h-2v-2h2v2zM19 5V3h2v2h-2zm-5.27 9h-3.49l-.73 2H7.89l3.4-9h1.4l3.41 9h-1.63l-.74-2zm-3.04-1.26h2.61L12 8.91l-1.31 3.83z"></path></g>\n<g id="format-size"><path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"></path></g>\n<g id="format-strikethrough"><path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"></path></g>\n<g id="format-textdirection-l-to-r"><path d="M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4zm12 8l-4-4v3H5v2h12v3l4-4z"></path></g>\n<g id="format-textdirection-r-to-l"><path d="M10 10v5h2V4h2v11h2V4h2V2h-8C7.79 2 6 3.79 6 6s1.79 4 4 4zm-2 7v-3l-4 4 4 4v-3h12v-2H8z"></path></g>\n<g id="format-underlined"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"></path></g>\n<g id="functions"><path d="M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7z"></path></g>\n<g id="highlight"><path d="M6 14l3 3v5h6v-5l3-3V9H6zm5-12h2v3h-2zM3.5 5.875L4.914 4.46l2.12 2.122L5.62 7.997zm13.46.71l2.123-2.12 1.414 1.414L18.375 8z"></path></g>\n<g id="insert-chart"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g>\n<g id="insert-comment"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path></g>\n<g id="insert-drive-file"><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"></path></g>\n<g id="insert-emoticon"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path></g>\n<g id="insert-invitation"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></g>\n<g id="insert-link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>\n<g id="insert-photo"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></g>\n<g id="linear-scale"><path d="M19.5 9.5c-1.03 0-1.9.62-2.29 1.5h-2.92c-.39-.88-1.26-1.5-2.29-1.5s-1.9.62-2.29 1.5H6.79c-.39-.88-1.26-1.5-2.29-1.5C3.12 9.5 2 10.62 2 12s1.12 2.5 2.5 2.5c1.03 0 1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5s1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5 1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z"></path></g>\n<g id="merge-type"><path d="M17 20.41L18.41 19 15 15.59 13.59 17 17 20.41zM7.5 8H11v5.59L5.59 19 7 20.41l6-6V8h3.5L12 3.5 7.5 8z"></path></g>\n<g id="mode-comment"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"></path></g>\n<g id="mode-edit"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>\n<g id="monetization-on"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"></path></g>\n<g id="money-off"><path d="M12.5 6.9c1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-.53.12-1.03.3-1.48.54l1.47 1.47c.41-.17.91-.27 1.51-.27zM5.33 4.06L4.06 5.33 7.5 8.77c0 2.08 1.56 3.21 3.91 3.91l3.51 3.51c-.34.48-1.05.91-2.42.91-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c.96-.18 1.82-.55 2.45-1.12l2.22 2.22 1.27-1.27L5.33 4.06z"></path></g>\n<g id="multiline-chart"><path d="M22 6.92l-1.41-1.41-2.85 3.21C15.68 6.4 12.83 5 9.61 5 6.72 5 4.07 6.16 2 8l1.42 1.42C5.12 7.93 7.27 7 9.61 7c2.74 0 5.09 1.26 6.77 3.24l-2.88 3.24-4-4L2 16.99l1.5 1.5 6-6.01 4 4 4.05-4.55c.75 1.35 1.25 2.9 1.44 4.55H21c-.22-2.3-.95-4.39-2.04-6.14L22 6.92z"></path></g>\n<g id="pie-chart"><path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"></path></g>\n<g id="pie-chart-outlined"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 2.07c3.61.45 6.48 3.33 6.93 6.93H13V4.07zM4 12c0-4.06 3.07-7.44 7-7.93v15.87c-3.93-.5-7-3.88-7-7.94zm9 7.93V13h6.93c-.45 3.61-3.32 6.48-6.93 6.93z"></path></g>\n<g id="publish"><path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z"></path></g>\n<g id="short-text"><path d="M4 9h16v2H4zm0 4h10v2H4z"></path></g>\n<g id="show-chart"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"></path></g>\n<g id="space-bar"><path d="M18 9v4H6V9H4v6h16V9z"></path></g>\n<g id="strikethrough-s"><path d="M7.24 8.75c-.26-.48-.39-1.03-.39-1.67 0-.61.13-1.16.4-1.67.26-.5.63-.93 1.11-1.29.48-.35 1.05-.63 1.7-.83.66-.19 1.39-.29 2.18-.29.81 0 1.54.11 2.21.34.66.22 1.23.54 1.69.94.47.4.83.88 1.08 1.43.25.55.38 1.15.38 1.81h-3.01c0-.31-.05-.59-.15-.85-.09-.27-.24-.49-.44-.68-.2-.19-.45-.33-.75-.44-.3-.1-.66-.16-1.06-.16-.39 0-.74.04-1.03.13-.29.09-.53.21-.72.36-.19.16-.34.34-.44.55-.1.21-.15.43-.15.66 0 .48.25.88.74 1.21.38.25.77.48 1.41.7H7.39c-.05-.08-.11-.17-.15-.25zM21 12v-2H3v2h9.62c.18.07.4.14.55.2.37.17.66.34.87.51.21.17.35.36.43.57.07.2.11.43.11.69 0 .23-.05.45-.14.66-.09.2-.23.38-.42.53-.19.15-.42.26-.71.35-.29.08-.63.13-1.01.13-.43 0-.83-.04-1.18-.13s-.66-.23-.91-.42c-.25-.19-.45-.44-.59-.75-.14-.31-.25-.76-.25-1.21H6.4c0 .55.08 1.13.24 1.58.16.45.37.85.65 1.21.28.35.6.66.98.92.37.26.78.48 1.22.65.44.17.9.3 1.38.39.48.08.96.13 1.44.13.8 0 1.53-.09 2.18-.28s1.21-.45 1.67-.79c.46-.34.82-.77 1.07-1.27s.38-1.07.38-1.71c0-.6-.1-1.14-.31-1.61-.05-.11-.11-.23-.17-.33H21z"></path></g>\n<g id="text-fields"><path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"></path></g>\n<g id="title"><path d="M5 4v3h5.5v12h3V7H19V4z"></path></g>\n<g id="vertical-align-bottom"><path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"></path></g>\n<g id="vertical-align-center"><path d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"></path></g>\n<g id="vertical-align-top"><path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"></path></g>\n<g id="wrap-text"><path d="M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3 3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"></path></g>\n</defs></svg>\n</iron-iconset-svg>';
document.head.appendChild(fl.content);
var gl = Polymer.GestureEventListeners(U), hl = function(a) {
  return gl.apply(this, arguments) || this;
};
w(hl, gl);
hl.prototype.ready = function() {
  this.resizing_ = !1;
  this.origSize_ = null;
  this.addEventListener('mousedown', this.onMousedown_);
  this.addEventListener('mouseup', this.onMouseup_);
  gl.prototype.ready.call(this);
};
hl.prototype.onMousedown_ = function() {
  if (this.resizable) {
    var a = this.querySelector('iframe');
    a.style.setProperty('pointer-events', 'none');
  }
};
hl.prototype.onMouseup_ = function() {
  if (this.resizable) {
    var a = this.querySelector('iframe');
    a.style.removeProperty('pointer-events');
  }
};
hl.prototype.onTrack_ = function(a) {
  var b = a.composedPath().find(function(f) {
    return f.classList && f.classList.contains('handle');
  });
  b = b.getAttribute('data-direction');
  var c = a.detail, d = c.dx;
  a = c.dy;
  c = c.state;
  'start' == c && (this.resizing_ = !0, this.origSize_ = {
    width: this.size.width,
    height: this.size.height,
  }, document.body.style.setProperty('cursor', b + '-resize'));
  var e = this.size.width;
  if ('e' == b || 'se' == b) e = Math.min(Math.max(this.origSize_.width + d, this.min), this.max);
  d = this.size.height;
  if ('s' == b || 'se' == b) d = Math.min(Math.max(this.origSize_.height +
    a, this.min), this.max);
  this.size = { width: e, height: d };
  'end' == c && (this.resizing_ = !1, this.origSize_ = null, document.body.style.removeProperty('cursor'));
};
x.Object.defineProperties(hl, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'tf-creative-preview-resizable-container';
    },
  }, properties: {
    configurable: !0, enumerable: !0, get: function() {
      return {
        size: { type: Object, notify: !0 },
        resizable: { type: Boolean, reflectToAttribute: !0 },
        min: { type: Number, value: 0 },
        max: { type: Number, value: Number.POSITIVE_INFINITY },
      };
    },
  },
});
customElements.define(hl.is, hl);
var il = function(a) {
  return Z.apply(this, arguments) || this;
};
w(il, Z);
il.prototype.ready = function() {
  this.minSize_ = 20;
  this.maxSize_ = 2E3;
  this.debouncer = null;
  Z.prototype.ready.call(this);
};
il.prototype.deviceSizeChanged_ = function(a) {
  this.parsedDeviceSize_ = M(a);
};
il.prototype.parsedDeviceSizeChanged_ = function(a, b) {
  var c = this;
  this.deviceSize = N(a);
  this.reloadOnResize && b && (this.debouncer = pg(this.debouncer, fe.after(250), function() {
    c.reload();
  }));
};
il.prototype.reload = function() {
  Fd(this.$.iframe);
};
x.Object.defineProperties(il, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'tf-creative-preview-mobile';
    },
  }, properties: {
    configurable: !0, enumerable: !0, get: function() {
      return {
        deviceSize: { type: String, notify: !0, observer: 'deviceSizeChanged_' },
        parsedDeviceSize_: { type: Object, observer: 'parsedDeviceSizeChanged_' },
        feed: String,
        responsive: { type: Boolean, reflectToAttribute: !0 },
        reloadOnResize: Boolean,
      };
    },
  },
});
customElements.define(il.is, il);
var jl = ['\n    <style>\n      :host {\n        display: inline-block;\n        overflow: hidden;\n        position: relative;\n      }\n\n      #baseURIAnchor {\n        display: none;\n      }\n\n      #sizedImgDiv {\n        position: absolute;\n        top: 0px;\n        right: 0px;\n        bottom: 0px;\n        left: 0px;\n\n        display: none;\n      }\n\n      #img {\n        display: block;\n        width: var(--iron-image-width, auto);\n        height: var(--iron-image-height, auto);\n      }\n\n      :host([sizing]) #sizedImgDiv {\n        display: block;\n      }\n\n      :host([sizing]) #img {\n        display: none;\n      }\n\n      #placeholder {\n        position: absolute;\n        top: 0px;\n        right: 0px;\n        bottom: 0px;\n        left: 0px;\n\n        background-color: inherit;\n        opacity: 1;\n\n        @apply --iron-image-placeholder;\n      }\n\n      #placeholder.faded-out {\n        transition: opacity 0.5s linear;\n        opacity: 0;\n      }\n    </style>\n\n    <a id="baseURIAnchor" href="#"></a>\n    <div id="sizedImgDiv" role="img" hidden$="[[_computeImgDivHidden(sizing)]]" aria-hidden$="[[_computeImgDivARIAHidden(alt)]]" aria-label$="[[_computeImgDivARIALabel(alt, src)]]"></div>\n    <img id="img" alt$="[[alt]]" hidden$="[[_computeImgHidden(sizing)]]" crossorigin$="[[crossorigin]]" on-load="_imgOnLoad" on-error="_imgOnError">\n    <div id="placeholder" hidden$="[[_computePlaceholderHidden(preload, fade, loading, loaded)]]" class$="[[_computePlaceholderClassName(preload, fade, loading, loaded)]]"></div>\n'];
jl.raw = ['\n    <style>\n      :host {\n        display: inline-block;\n        overflow: hidden;\n        position: relative;\n      }\n\n      #baseURIAnchor {\n        display: none;\n      }\n\n      #sizedImgDiv {\n        position: absolute;\n        top: 0px;\n        right: 0px;\n        bottom: 0px;\n        left: 0px;\n\n        display: none;\n      }\n\n      #img {\n        display: block;\n        width: var(--iron-image-width, auto);\n        height: var(--iron-image-height, auto);\n      }\n\n      :host([sizing]) #sizedImgDiv {\n        display: block;\n      }\n\n      :host([sizing]) #img {\n        display: none;\n      }\n\n      #placeholder {\n        position: absolute;\n        top: 0px;\n        right: 0px;\n        bottom: 0px;\n        left: 0px;\n\n        background-color: inherit;\n        opacity: 1;\n\n        @apply --iron-image-placeholder;\n      }\n\n      #placeholder.faded-out {\n        transition: opacity 0.5s linear;\n        opacity: 0;\n      }\n    </style>\n\n    <a id="baseURIAnchor" href="#"></a>\n    <div id="sizedImgDiv" role="img" hidden\\$="[[_computeImgDivHidden(sizing)]]" aria-hidden\\$="[[_computeImgDivARIAHidden(alt)]]" aria-label\\$="[[_computeImgDivARIALabel(alt, src)]]"></div>\n    <img id="img" alt\\$="[[alt]]" hidden\\$="[[_computeImgHidden(sizing)]]" crossorigin\\$="[[crossorigin]]" on-load="_imgOnLoad" on-error="_imgOnError">\n    <div id="placeholder" hidden\\$="[[_computePlaceholderHidden(preload, fade, loading, loaded)]]" class\\$="[[_computePlaceholderClassName(preload, fade, loading, loaded)]]"></div>\n'];
Y({
  _template: S(jl), is: 'iron-image', properties: {
    src: { type: String, value: '' },
    alt: { type: String, value: null },
    crossorigin: { type: String, value: null },
    preventLoad: { type: Boolean, value: !1 },
    sizing: { type: String, value: null, reflectToAttribute: !0 },
    position: { type: String, value: 'center' },
    preload: { type: Boolean, value: !1 },
    placeholder: { type: String, value: null, observer: '_placeholderChanged' },
    fade: { type: Boolean, value: !1 },
    loaded: { notify: !0, readOnly: !0, type: Boolean, value: !1 },
    loading: { notify: !0, readOnly: !0, type: Boolean, value: !1 },
    error: { notify: !0, readOnly: !0, type: Boolean, value: !1 },
    width: { observer: '_widthChanged', type: Number, value: null },
    height: { observer: '_heightChanged', type: Number, value: null },
  }, observers: ['_transformChanged(sizing, position)', '_loadStateObserver(src, preventLoad)'], created: function() {
    this._resolvedSrc = '';
  }, _imgOnLoad: function() {
    this.$.img.src === this._resolveSrc(this.src) && (this._setLoading(!1), this._setLoaded(!0), this._setError(!1));
  }, _imgOnError: function() {
    this.$.img.src === this._resolveSrc(this.src) && (this.$.img.removeAttribute('src'),
      this.$.sizedImgDiv.style.backgroundImage = '', this._setLoading(!1), this._setLoaded(!1), this._setError(!0));
  }, _computePlaceholderHidden: function() {
    return !this.preload || !this.fade && !this.loading && this.loaded;
  }, _computePlaceholderClassName: function() {
    return this.preload && this.fade && !this.loading && this.loaded ? 'faded-out' : '';
  }, _computeImgDivHidden: function() {
    return !this.sizing;
  }, _computeImgDivARIAHidden: function() {
    return '' === this.alt ? 'true' : void 0;
  }, _computeImgDivARIALabel: function() {
    if (null !== this.alt) return this.alt;
    if ('' === this.src) return '';
    var a = this._resolveSrc(this.src);
    return a.replace(/[?|#].*/g, '').split('/').pop();
  }, _computeImgHidden: function() {
    return !!this.sizing;
  }, _widthChanged: function() {
    this.style.width = isNaN(this.width) ? this.width : this.width + 'px';
  }, _heightChanged: function() {
    this.style.height = isNaN(this.height) ? this.height : this.height + 'px';
  }, _loadStateObserver: function(a, b) {
    var c = this._resolveSrc(a);
    c !== this._resolvedSrc && (this._resolvedSrc = '', this.$.img.removeAttribute('src'), this.$.sizedImgDiv.style.backgroundImage =
      '', '' === a || b ? this._setLoading(!1) : (this._resolvedSrc = c, this.$.img.src = this._resolvedSrc, this.$.sizedImgDiv.style.backgroundImage = 'url("' + this._resolvedSrc + '")', this._setLoading(!0)), this._setLoaded(!1), this._setError(!1));
  }, _placeholderChanged: function() {
    this.$.placeholder.style.backgroundImage = this.placeholder ? 'url("' + this.placeholder + '")' : '';
  }, _transformChanged: function() {
    var a = this.$.sizedImgDiv.style, b = this.$.placeholder.style;
    a.backgroundSize = b.backgroundSize = this.sizing;
    a.backgroundPosition = b.backgroundPosition =
      this.sizing ? this.position : '';
    a.backgroundRepeat = b.backgroundRepeat = this.sizing ? 'no-repeat' : '';
  }, _resolveSrc: function(a) {
    a = Ob(a, this.$.baseURIAnchor.href);
    '/' === a[0] && (a = (location.origin || location.protocol + '//' + location.host) + a);
    return a;
  },
});
var kl = document.createElement('template');
kl.setAttribute('style', 'display: none;');
kl.innerHTML = '<dom-module id="paper-material-styles">\n  <template>\n    <style>\n      :host, html {\n        --paper-material: {\n          display: block;\n          position: relative;\n        };\n        --paper-material-elevation-1: {\n          @apply --shadow-elevation-2dp;\n        };\n        --paper-material-elevation-2: {\n          @apply --shadow-elevation-4dp;\n        };\n        --paper-material-elevation-3: {\n          @apply --shadow-elevation-6dp;\n        };\n        --paper-material-elevation-4: {\n          @apply --shadow-elevation-8dp;\n        };\n        --paper-material-elevation-5: {\n          @apply --shadow-elevation-16dp;\n        };\n      }\n      :host(.paper-material), .paper-material {\n        @apply --paper-material;\n      }\n      :host(.paper-material[elevation="1"]), .paper-material[elevation="1"] {\n        @apply --paper-material-elevation-1;\n      }\n      :host(.paper-material[elevation="2"]), .paper-material[elevation="2"] {\n        @apply --paper-material-elevation-2;\n      }\n      :host(.paper-material[elevation="3"]), .paper-material[elevation="3"] {\n        @apply --paper-material-elevation-3;\n      }\n      :host(.paper-material[elevation="4"]), .paper-material[elevation="4"] {\n        @apply --paper-material-elevation-4;\n      }\n      :host(.paper-material[elevation="5"]), .paper-material[elevation="5"] {\n        @apply --paper-material-elevation-5;\n      }\n    </style>\n  </template>\n</dom-module>';
document.head.appendChild(kl.content);
var ll = ['\n    <style include="paper-material-styles">\n      :host {\n        display: inline-block;\n        position: relative;\n        box-sizing: border-box;\n        background-color: var(--paper-card-background-color, var(--primary-background-color));\n        border-radius: 2px;\n\n        @apply --paper-font-common-base;\n        @apply --paper-card;\n      }\n\n      /* IE 10 support for HTML5 hidden attr */\n      :host([hidden]), [hidden] {\n        display: none !important;\n      }\n\n      .header {\n        position: relative;\n        border-top-left-radius: inherit;\n        border-top-right-radius: inherit;\n        overflow: hidden;\n\n        @apply --paper-card-header;\n      }\n\n      .header iron-image {\n        display: block;\n        width: 100%;\n        --iron-image-width: 100%;\n        pointer-events: none;\n\n        @apply --paper-card-header-image;\n      }\n\n      .header .title-text {\n        padding: 16px;\n        font-size: 24px;\n        font-weight: 400;\n        color: var(--paper-card-header-color, #000);\n\n        @apply --paper-card-header-text;\n      }\n\n      .header .title-text.over-image {\n        position: absolute;\n        bottom: 0px;\n\n        @apply --paper-card-header-image-text;\n      }\n\n      :host ::slotted(.card-content) {\n        padding: 16px;\n        position:relative;\n\n        @apply --paper-card-content;\n      }\n\n      :host ::slotted(.card-actions) {\n        border-top: 1px solid #e8e8e8;\n        padding: 5px 16px;\n        position:relative;\n\n        @apply --paper-card-actions;\n      }\n\n      :host([elevation="1"]) {\n        @apply --paper-material-elevation-1;\n      }\n\n      :host([elevation="2"]) {\n        @apply --paper-material-elevation-2;\n      }\n\n      :host([elevation="3"]) {\n        @apply --paper-material-elevation-3;\n      }\n\n      :host([elevation="4"]) {\n        @apply --paper-material-elevation-4;\n      }\n\n      :host([elevation="5"]) {\n        @apply --paper-material-elevation-5;\n      }\n    </style>\n\n    <div class="header">\n      <iron-image hidden$="[[!image]]" aria-hidden$="[[_isHidden(image)]]" src="[[image]]" alt="[[alt]]" placeholder="[[placeholderImage]]" preload="[[preloadImage]]" fade="[[fadeImage]]"></iron-image>\n      <div hidden$="[[!heading]]" class$="title-text [[_computeHeadingClass(image)]]">[[heading]]</div>\n    </div>\n\n    <slot></slot>\n'];
ll.raw = ll.slice();
Y({
  _template: S(ll),
  is: 'paper-card',
  properties: {
    heading: { type: String, value: '', observer: '_headingChanged' },
    image: { type: String, value: '' },
    alt: { type: String },
    preloadImage: { type: Boolean, value: !1 },
    fadeImage: { type: Boolean, value: !1 },
    placeholderImage: { type: String, value: null },
    elevation: { type: Number, value: 1, reflectToAttribute: !0 },
    animatedShadow: { type: Boolean, value: !1 },
    animated: { type: Boolean, reflectToAttribute: !0, readOnly: !0, computed: '_computeAnimated(animatedShadow)' },
  },
  _isHidden: function(a) {
    return a ? 'false' : 'true';
  },
  _headingChanged: function(a) {
    var b = this.getAttribute('heading'), c = this.getAttribute('aria-label');
    'string' === typeof c && c !== b || this.setAttribute('aria-label', a);
  },
  _computeHeadingClass: function(a) {
    return a ? ' over-image' : '';
  },
  _computeAnimated: function(a) {
    return a;
  },
});
var ml = function(a) {
  return U.apply(this, arguments) || this;
};
w(ml, U);
ml.prototype.srcChanged_ = function(a, b) {
  b && a.getTypedStringValue() == b.getTypedStringValue() || this._setIframeSrc(a);
};
ml.prototype.onReloadButtonClick_ = function() {
  this.reload();
};
ml.prototype.getMsg_ = function(a) {
  return Ed(a);
};
ml.prototype.reload = function() {
  Fd(this.$.iframe);
};
x.Object.defineProperties(ml, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'tf-creative-preview-iframe-card';
    },
  }, properties: {
    configurable: !0, enumerable: !0, get: function() {
      return {
        src: { type: Object, observer: 'srcChanged_' },
        iframeSrc: { type: Object, readOnly: !0 },
        size: Object,
        label: String,
      };
    },
  },
});
ml.prototype._setIframeSrc = function() {
};
customElements.define(ml.is, ml);
var nl = function(a, b) {
  for (var c = q(this.instances_), d = c.next(); !d.done; d = c.next()) d = d.value, d.forwardHostProp(a, b);
}, ol = function() {
  var a = U.call(this) || this;
  a.instances_ = [];
  a.templateCtor_ = null;
  a.renderDebouncer_ = null;
  return a;
};
w(ol, U);
m = ol.prototype;
m.connectedCallback = function() {
  U.prototype.connectedCallback.call(this);
  this.style.display = 'none';
};
m.itemsChanged_ = function() {
  this.renderWhenReady_();
};
m.renderWhenReady_ = function() {
  var a = this;
  if (0 == this.children.length) {
    var b = new MutationObserver(function() {
      if (a.querySelector('template')) b.disconnect(), a.debounceRender_(); else throw Error('tf-creative-preview-repeat requires a <template>.');
    });
    b.observe(this, { childList: !0 });
  } else this.debounceRender_();
};
m.debounceRender_ = function() {
  this.renderDebouncer_ = pg(this.renderDebouncer_, ie, this.render_.bind(this));
  qg(this.renderDebouncer_);
};
m.render_ = function() {
  var a = this;
  this.ensureTemplateCtor_();
  for (var b = 0; b < this.items.length || b < this.instances_.length;) {
    var c = this.items[b], d = this.instances_[b], e = void 0;
    if (b < this.items.length && b < this.instances_.length) {
      var f = this.getItemHash_(c), g = d.get(this.as);
      g = this.getItemHash_(g);
      g == f ? (this.updateInstance_(d, c), b++) : (e = e || new Set(this.items.map(function(k) {
        return a.getItemHash_(k);
      })), e.has(g) ? (this.insertInstance_(c, b), b++) : this.removeInstance_(b));
    } else b >= this.instances_.length ? (this.insertInstance_(c,
      b), b++) : this.removeInstance_(b);
  }
};
m.ensureTemplateCtor_ = function() {
  if (!this.templateCtor_) {
    var a = this.querySelector('template'), b = { parentModel: !0, forwardHostProp: nl };
    this.templateCtor_ = uh(a, this, b);
  }
};
m.updateInstance_ = function(a, b) {
  a._setPendingProperty(this.as, b);
  a._flushProperties();
};
m.insertInstance_ = function(a, b) {
  var c = new this.templateCtor_;
  this.updateInstance_(c, a);
  a = (a = this.instances_[b]) ? a.children[0] : this;
  this.parentElement.insertBefore(c.root, a);
  this.instances_.splice(b, 0, c);
};
m.removeInstance_ = function(a) {
  for (var b = q(this.instances_[a].children), c = b.next(); !c.done; c = b.next()) c = c.value, this.parentElement.removeChild(c);
  this.instances_.splice(a, 1);
};
m.getItemHash_ = function(a) {
  if (!this.observe) return '';
  for (var b = {}, c = q(this.observe.split(',')), d = c.next(); !d.done; d = c.next()) (d = d.value) && (b[d] = a[d]);
  return JSON.stringify(b);
};
x.Object.defineProperties(ol, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'tf-creative-preview-repeat';
    },
  }, template: {
    configurable: !0, enumerable: !0, get: function() {
      return null;
    },
  }, properties: {
    configurable: !0, enumerable: !0, get: function() {
      return { items: Array, as: { type: String, value: 'item' }, observe: { type: String, value: '' } };
    },
  }, observers: {
    configurable: !0, enumerable: !0, get: function() {
      return ['itemsChanged_(items.*)'];
    },
  },
});
customElements.define(ol.is, ol);
var pl = function(a) {
  return Z.apply(this, arguments) || this;
};
w(pl, Z);
m = pl.prototype;
m.computeCardItems_ = function(a, b) {
  a = void 0 === a ? '' : a;
  b = void 0 === b ? [] : b;
  return b.map(function(c) {
    return c = { feed: c, size: a };
  });
};
m.getMsg_ = function(a) {
  return Ed(a);
};
m.getLabel_ = function(a) {
  return a || Ed('NO_SAMPLE_DATA');
};
m.parseSize_ = function(a) {
  return M(a);
};
m.getCards = function() {
  return this.root.querySelectorAll('tf-creative-preview-iframe-card');
};
m.reload = function() {
  for (var a = q(this.getCards()), b = a.next(); !b.done; b = a.next()) b = b.value, b.reload();
};
x.Object.defineProperties(pl, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'tf-creative-preview-multiple-feeds';
    },
  }, properties: {
    configurable: !0, enumerable: !0, get: function() {
      return {
        feeds: Array, cardItems_: {
          type: Array, value: function() {
            return [];
          }, computed: 'computeCardItems_(size, feeds, feeds.*)', readOnly: !0,
        }, size: String,
      };
    },
  },
});
pl.prototype._setCardItems_ = function() {
};
customElements.define(pl.is, pl);
var ql = function(a) {
  return Z.apply(this, arguments) || this;
};
w(ql, Z);
m = ql.prototype;
m.computeParsedSizes_ = function() {
  var a = this.sizes.map(M);
  a.sort(function(b, c) {
    return b.height == c.height ? b.width - c.width : b.height - c.height;
  });
  return a;
};
m.getMsg_ = function(a) {
  return Ed(a);
};
m.getLabel_ = function(a) {
  return a.width + ' x ' + a.height;
};
m.getCards = function() {
  return this.root.querySelectorAll('tf-creative-preview-iframe-card');
};
m.reload = function() {
  for (var a = q(this.getCards()), b = a.next(); !b.done; b = a.next()) b = b.value, b.reload();
};
x.Object.defineProperties(ql, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'tf-creative-preview-multiple-sizes';
    },
  }, properties: {
    configurable: !0, enumerable: !0, get: function() {
      return {
        sizes: Array, parsedSizes_: {
          type: Array, value: function() {
            return [];
          }, computed: 'computeParsedSizes_(sizes, sizes.*)', readOnly: !0,
        }, feed: String,
      };
    },
  },
});
ql.prototype._setParsedSizes_ = function() {
};
customElements.define(ql.is, ql);
var rl = function(a) {
  return Z.apply(this, arguments) || this;
};
w(rl, Z);
m = rl.prototype;
m.ready = function() {
  this.minSize_ = 20;
  this.maxSize_ = 2E3;
  this.debouncer = null;
  Z.prototype.ready.call(this);
};
m.computeParsedSize_ = function(a) {
  return M(a);
};
m.computeDeviceViewportStyle_ = function(a) {
  return qb({ width: a.width + 'px', height: a.height + 'px' });
};
m.computePlaceholderTextStyle_ = function(a) {
  a -= 32;
  0 >= a ? a = 0 : (a -= 8, a = Math.ceil(a / 20), a = 20 * a + 8);
  return qb({ height: a + 'px' });
};
m.deviceSizeChanged_ = function(a) {
  this.parsedDeviceSize_ = M(a);
};
m.parsedDeviceSizeChanged_ = function(a) {
  this.deviceSize = N(a);
};
m.deviceHeightChanged_ = function() {
  this.scheduleForwardScroll_();
};
m.onIframeLoad_ = function() {
  var a = this, b = this.$.iframe.contentDocument;
  if (b) {
    var c = this.$.dummyWindow;
    b.body.addEventListener('ready', function(d) {
      'GWD-PARALLAX' == d.target.nodeName && (d = (c.scrollHeight - c.clientHeight) / 2, c.scrollTop = d, a.scheduleForwardScroll_());
    }, !1);
  }
};
m.onScroll_ = function() {
  this.scheduleForwardScroll_();
};
m.scheduleForwardScroll_ = function() {
  this.debouncer = pg(this.debouncer, ge, this.forwardScroll_.bind(this));
};
m.forwardScroll_ = function() {
  var a = this.getIframeWindow();
  if (a) {
    var b = this.$.dummyWindow.scrollTop, c = this.$.iframe.getBoundingClientRect(),
      d = this.$.dummyWindow.getBoundingClientRect(), e = c.left - d.left, f = c.top - d.top, g = c.bottom - d.top;
    c = d.height + c.height;
    g = 1 - g / c;
    b = {
      eventType: 'hostpageScroll',
      creativeFrameTop: f,
      creativeFrameLeft: e,
      hostpageScrollY: b,
      hostpageScrollX: 0,
      windowHeight: d.height,
      windowWidth: d.width,
      creativeFramePercentY: g,
      creativeFramePercentX: 0,
    };
    b = JSON.stringify(b);
    a.postMessage(b, '*');
  }
};
m.getIframeWindow = function() {
  return this.$.iframe.contentWindow || null;
};
m.reload = function() {
  Fd(this.$.iframe);
};
x.Object.defineProperties(rl, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'tf-creative-preview-parallax';
    },
  }, properties: {
    configurable: !0, enumerable: !0, get: function() {
      return {
        size: String,
        parsedSize_: { type: Object, computed: 'computeParsedSize_(size)', readOnly: !0 },
        deviceSize: { type: String, notify: !0, observer: 'deviceSizeChanged_' },
        parsedDeviceSize_: { type: Object, observer: 'parsedDeviceSizeChanged_' },
        feed: String,
        responsive: { type: Boolean, reflectToAttribute: !0 },
      };
    },
  }, observers: {
    configurable: !0, enumerable: !0,
    get: function() {
      return ['deviceHeightChanged_(parsedDeviceSize_.height)'];
    },
  },
});
rl.prototype._setParsedSize_ = function() {
};
customElements.define(rl.is, rl);
var sl = function(a) {
  return U.apply(this, arguments) || this;
};
w(sl, U);
m = sl.prototype;
m.ready = function() {
  this.addEventListener('click', this.onClick_);
  U.prototype.ready.call(this);
};
m.computeIntervals_ = function(a) {
  var b = [0].concat(a);
  return b.map(function(c, d) {
    var e = d == b.length - 1;
    d = e ? Number.POSITIVE_INFINITY : b[d + 1] - 1;
    return { start: c, end: d };
  });
};
m.getIntervalStyle_ = function(a, b) {
  b = b ? 'height' : 'width';
  var c = a;
  a = c.start;
  c = c.end;
  a = isFinite(c) ? c - a + 1 + 'px' : 'auto';
  c = {};
  return qb((c[b] = a, c));
};
m.getIntervalClassnames_ = function(a) {
  var b = ['interval'];
  isFinite(a.end) || b.push('last');
  return b.join(' ');
};
m.getIntervalLabel_ = function(a, b) {
  return 0 < b.length ? (b = a, a = b.start, b = b.end, isFinite(b) ? a + '-' + b : a + '-') : '';
};
m.onClick_ = function(a) {
  var b = this.$.container.getBoundingClientRect();
  a = this.vertical ? a.clientY - b.top : a.clientX - b.left;
  a = new CustomEvent('ruler-click', { detail: { position: a } });
  this.dispatchEvent(a);
};
x.Object.defineProperties(sl, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'tf-creative-preview-ruler';
    },
  }, properties: {
    configurable: !0, enumerable: !0, get: function() {
      return {
        vertical: { type: Boolean, reflectToAttribute: !0 },
        breakpoints: Array,
        intervals_: { type: Array, readOnly: !0, computed: 'computeIntervals_(breakpoints)' },
      };
    },
  },
});
sl.prototype._setIntervals_ = function() {
};
customElements.define(sl.is, sl);
var tl = K.OrientationType.PORTRAIT, ul = K.OrientationType.LANDSCAPE, vl = function(a) {
  return 0 < a.length ? (a = a[a.length - 1], a + 100) : 0;
}, wl = function(a, b) {
  var c = b == tl ? 20 : 21, d = 20, e = 2E3;
  b = b == tl ? 2E3 : 1999;
  return { width: Math.min(Math.max(a.width, c), e), height: Math.min(Math.max(a.height, d), b) };
}, xl = function(a) {
  return Z.apply(this, arguments) || this;
};
w(xl, Z);
m = xl.prototype;
m.ready = function() {
  this.minSize_ = 20;
  this.maxSize_ = 2E3;
  this.debouncer = null;
  Z.prototype.ready.call(this);
};
m.computeOrientation_ = function(a) {
  return a.width <= a.height ? tl : ul;
};
m.computeScrollSize_ = function(a, b, c) {
  c || (c = { width: 0, height: 0 });
  var d = c.width + 24;
  c = c.height + 24;
  if (a) {
    var e = this.getBreakpoints_(a, b, 'width');
    e = vl(e);
    d = Math.max(d, e);
    a = this.getBreakpoints_(a, b, 'height');
    a = vl(a);
    c = Math.max(c, a);
  }
  return { width: d, height: c };
};
m.getBreakpoints_ = function(a, b, c) {
  return a ? (a = a[b] || a[K.OrientationType.ALL]) ? 'width' == c ? a.width : a.height : [] : [];
};
m.getStageScrollContentStyle_ = function(a, b) {
  return a && b ? qb({ 'min-width': b.width + 'px', 'min-height': b.height + 'px' }) : qb({});
};
m.getRulerStyle_ = function(a, b) {
  var c = 'min-' + b;
  a = ('width' == b ? a.width : a.height) + 30;
  b = {};
  return qb((b[c] = a + 'px', b));
};
m.parsedSizeChanged_ = function(a, b) {
  var c = this;
  this.size = N(a);
  this.reloadOnResize && b && (this.debouncer = pg(this.debouncer, fe.after(250), function() {
    c.reload();
  }));
};
m.sizeChanged_ = function(a) {
  this.parsedSize_ = M(a);
};
m.onStageScroll_ = function(a) {
  a = a.target;
  var b = this.root.querySelector('.ruler.vertical .scroll-overflow');
  b.scrollTop = a.scrollTop;
  b = this.root.querySelector('.ruler.horizontal .scroll-overflow');
  b.scrollLeft = a.scrollLeft;
};
m.onHorizontalRulerClick_ = function(a) {
  a = a.detail.position;
  var b = this.parsedSize_;
  b = b.height;
  var c = this.computeOrientation_({ width: a, height: b }) != this.orientation_;
  c && (b = this.parsedSize_.height / this.parsedSize_.width, b = Math.round(a * b));
  this.parsedSize_ = wl({ width: a, height: b }, this.orientation_);
};
m.onVerticalRulerClick_ = function(a) {
  a = a.detail.position;
  var b = this.parsedSize_;
  b = b.width;
  var c = this.computeOrientation_({ width: b, height: a }) != this.orientation_;
  c && (b = this.parsedSize_.width / this.parsedSize_.height, b = Math.round(a * b));
  this.parsedSize_ = wl({ width: b, height: a }, this.orientation_);
};
m.reload = function() {
  Fd(this.$.iframe);
};
x.Object.defineProperties(xl, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'tf-creative-preview-single';
    },
  }, properties: {
    configurable: !0, enumerable: !0, get: function() {
      return {
        size: { type: String, notify: !0, observer: 'sizeChanged_' },
        parsedSize_: { type: Object, observer: 'parsedSizeChanged_' },
        orientation_: { type: String, readOnly: !0, computed: 'computeOrientation_(parsedSize_)' },
        breakpoints: Object,
        scrollSize_: {
          type: Object,
          readOnly: !0,
          computed: 'computeScrollSize_(breakpoints, orientation_, parsedSize_)',
        },
        feed: String,
        responsive: { type: Boolean, reflectToAttribute: !0 },
        reloadOnResize: Boolean,
      };
    },
  },
});
xl.prototype._setOrientation_ = function() {
};
xl.prototype._setScrollSize_ = function() {
};
customElements.define(xl.is, xl);
var yl = function(a) {
  return U.apply(this, arguments) || this;
};
w(yl, U);
m = yl.prototype;
m.ready = function() {
  this.debouncer_ = null;
  U.prototype.ready.call(this);
};
m.modeEnabled_ = function(a) {
  return this.modes.includes(a);
};
m.modeIs_ = function(a, b) {
  return a == b;
};
m.matchOrder_ = function(a, b) {
  b = void 0 === b ? [] : b;
  if (0 == b.length) return [];
  var c = new Set(b);
  return a.filter(function(d) {
    return c.has(d);
  });
};
m.onSettingChange_ = function() {
  var a = this;
  this.debouncer_ = pg(this.debouncer_, fe.after(10), function() {
    var b = new CustomEvent('setting-change', { bubbles: !0, composed: !0 });
    a.dispatchEvent(b);
  });
};
m.onReloadView_ = function() {
  var a = this.getCurrentView_();
  a && a.reload();
};
m.onControlsTrack_ = function(a) {
  a = a.detail;
  a = a.state;
  var b = this.$.stage;
  'start' == a ? b.style.setProperty('pointer-events', 'none') : 'end' == a && b.style.removeProperty('pointer-events');
};
m.onDropdownWillOpen_ = function() {
  this.$.stage.style.setProperty('pointer-events', 'none');
};
m.onDropdownClosed_ = function() {
  this.$.stage.style.removeProperty('pointer-events');
};
m.getCurrentView_ = function() {
  return this.root.getElementById(this.mode + '-view') || null;
};
x.Object.defineProperties(yl, {
  is: {
    configurable: !0, enumerable: !0, get: function() {
      return 'tf-creative-preview';
    },
  }, properties: {
    configurable: !0, enumerable: !0, get: function() {
      return {
        previewPath: String, modes: {
          type: Array, value: function() {
            return [];
          },
        }, sizes: {
          type: Array, value: function() {
            return [];
          },
        }, breakpoints: Object, feeds: {
          type: Array, value: function() {
            return [];
          },
        }, mode: String, modeSettings: Object, reloadOnResize: Boolean,
      };
    },
  }, observers: {
    configurable: !0, enumerable: !0, get: function() {
      return ['onSettingChange_(mode, modeSettings.*)'];
    },
  },
});
customElements.define(yl.is, yl);
