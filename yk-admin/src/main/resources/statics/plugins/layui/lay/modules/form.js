/** layui-v2.2.5 MIT License By https://www.layui.com */
;layui.define("layer", function(e) {
    "use strict";
    var t = layui.$
        , i = layui.layer
        , a = layui.hint()
        , n = layui.device()
        , l = "form"
        , r = ".layui-form"
        , s = "layui-this"
        , o = "layui-hide"
        , u = "layui-disabled"
        , c = function() {
        this.config = {
            verify: {
                required: [/[\S]+/, "必填项不能为空"],
                phone: [/^1\d{10}$/, "请输入正确的手机号"],
                email: [/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, "邮箱格式不正确"],
                url: [/(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/, "链接格式不正确"],
                number: function(e) {
                    if (!e || isNaN(e))
                        return "只能填写数字"
                },
                date: [/^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/, "日期格式不正确"],
                identity: [/(^\d{15}$)|(^\d{17}(x|X|\d)$)/, "请输入正确的身份证号"]
                //此处可扩充常用验证条件
            }
        }
    };
    c.prototype.set = function(e) {
        var i = this;
        return t.extend(!0, i.config, e),
            i
    }
        ,
        c.prototype.verify = function(e) {
            var i = this;
            return t.extend(!0, i.config.verify, e),
                i
        }
        ,
        c.prototype.on = function(e, t) {
            return layui.onevent.call(this, l, e, t)
        }
        ,
        c.prototype.render = function(e, i) {
            var n = this
                , c = t(r + function() {
                return i ? '[lay-filter="' + i + '"]' : ""
            }())
                , d = {
                select: function() {
                    var e, i = "请选择", a = "layui-form-select", n = "layui-select-title", r = "layui-select-none", d = "", f = c.find("select"), y = function(i, l) {
                        t(i.target).parent().hasClass(n) && !l || (t("." + a).removeClass(a + "ed " + a + "up"),
                        e && d && e.val(d)),
                            e = null
                    }, h = function(i, c, f) {
                        var h = t(this)
                            , p = i.find("." + n)
                            , m = p.find("input")
                            , k = i.find("dl")
                            , g = k.children("dd");
                        if (!c) {
                            var x = function() {
                                var e = i.offset().top + i.outerHeight() + 5 - v.scrollTop()
                                    , t = k.outerHeight();
                                i.addClass(a + "ed"),
                                    g.removeClass(o),
                                e + t > v.height() && e >= t && i.addClass(a + "up")
                            }
                                , b = function(e) {
                                i.removeClass(a + "ed " + a + "up"),
                                    m.blur(),
                                e || C(m.val(), function(e) {
                                    e && (d = k.find("." + s).html(),
                                    m && m.val(d))
                                })
                            };
                            p.on("click", function(e) {
                                i.hasClass(a + "ed") ? b() : (y(e, !0),
                                    x()),
                                    k.find("." + r).remove()
                            }),
                                p.find(".layui-edge").on("click", function() {
                                    m.focus()
                                }),
                                m.on("keyup", function(e) {
                                    var t = e.keyCode;
                                    9 === t && x()
                                }).on("keydown", function(e) {
                                    var t = e.keyCode;
                                    9 === t ? b() : 13 === t && e.preventDefault()
                                });
                            var C = function(e, i, a) {
                                var n = 0;
                                layui.each(g, function() {
                                    var i = t(this)
                                        , l = i.text()
                                        , r = l.indexOf(e) === -1;
                                    ("" === e || "blur" === a ? e !== l : r) && n++,
                                    "keyup" === a && i[r ? "addClass" : "removeClass"](o)
                                });
                                var l = n === g.length;
                                return i(l),
                                    l
                            }
                                , w = function(e) {
                                var t = this.value
                                    , i = e.keyCode;
                                return 9 !== i && 13 !== i && 37 !== i && 38 !== i && 39 !== i && 40 !== i && (C(t, function(e) {
                                    e ? k.find("." + r)[0] || k.append('<p class="' + r + '">无匹配项</p>') : k.find("." + r).remove()
                                }, "keyup"),
                                    void ("" === t && k.find("." + r).remove()))
                            };
                            f && m.on("keyup", w).on("blur", function(t) {
                                e = m,
                                    d = k.find("." + s).html(),
                                    setTimeout(function() {
                                        C(m.val(), function(e) {
                                            d || m.val("")
                                        }, "blur")
                                    }, 200)
                            }),
                                g.on("click", function() {
                                    var e = t(this)
                                        , a = e.attr("lay-value")
                                        , n = h.attr("lay-filter");
                                    return !e.hasClass(u) && (e.hasClass("layui-select-tips") ? m.val("") : (m.val(e.text()),
                                        e.addClass(s)),
                                        e.siblings().removeClass(s),
                                        h.val(a).removeClass("layui-form-danger"),
                                        layui.event.call(this, l, "select(" + n + ")", {
                                            elem: h[0],
                                            value: a,
                                            othis: i
                                        }),
                                        b(!0),
                                        !1)
                                }),
                                i.find("dl>dt").on("click", function(e) {
                                    return !1
                                }),
                                t(document).off("click", y).on("click", y)
                        }
                    };
                    f.each(function(e, l) {
                        var r = t(this)
                            , o = r.next("." + a)
                            , c = this.disabled
                            , d = l.value
                            , f = t(l.options[l.selectedIndex])
                            , y = l.options[0];
                        if ("string" == typeof r.attr("lay-ignore"))
                            return r.show();
                        var v = "string" == typeof r.attr("lay-search")
                            , p = y ? y.value ? i : y.innerHTML || i : i
                            , m = t(['<div class="' + (v ? "" : "layui-unselect ") + a + (c ? " layui-select-disabled" : "") + '">', '<div class="' + n + '"><input type="text" placeholder="' + p + '" value="' + (d ? f.html() : "") + '" ' + (v ? "" : "readonly") + ' class="layui-input' + (v ? "" : " layui-unselect") + (c ? " " + u : "") + '">', '<i class="layui-edge"></i></div>', '<dl class="layui-anim layui-anim-upbit' + (r.find("optgroup")[0] ? " layui-select-group" : "") + '">' + function(e) {
                            var t = [];
                            return layui.each(e, function(e, a) {
                                0 !== e || a.value ? "optgroup" === a.tagName.toLowerCase() ? t.push("<dt>" + a.label + "</dt>") : t.push('<dd lay-value="' + a.value + '" class="' + (d === a.value ? s : "") + (a.disabled ? " " + u : "") + '">' + a.innerHTML + "</dd>") : t.push('<dd lay-value="" class="layui-select-tips">' + (a.innerHTML || i) + "</dd>")
                            }),
                            0 === t.length && t.push('<dd lay-value="" class="' + u + '">没有选项</dd>'),
                                t.join("")
                        }(r.find("*")) + "</dl>", "</div>"].join(""));
                        o[0] && o.remove(),
                            r.after(m),
                            h.call(this, m, c, v)
                    })
                },
                checkbox: function() {
                    var e = {
                        checkbox: ["layui-form-checkbox", "layui-form-checked", "checkbox"],
                        _switch: ["layui-form-switch", "layui-form-onswitch", "switch"]
                    }
                        , i = c.find("input[type=checkbox]")
                        , a = function(e, i) {
                        var a = t(this);
                        e.on("click", function() {
                            var t = a.attr("lay-filter")
                                , n = (a.attr("lay-text") || "").split("|");
                            a[0].disabled || (a[0].checked ? (a[0].checked = !1,
                                e.removeClass(i[1]).find("em").text(n[1])) : (a[0].checked = !0,
                                e.addClass(i[1]).find("em").text(n[0])),
                                layui.event.call(a[0], l, i[2] + "(" + t + ")", {
                                    elem: a[0],
                                    value: a[0].value,
                                    othis: e
                                }))
                        })
                    };
                    i.each(function(i, n) {
                        var l = t(this)
                            , r = l.attr("lay-skin")
                            , s = (l.attr("lay-text") || "").split("|")
                            , o = this.disabled;
                        "switch" === r && (r = "_" + r);
                        var c = e[r] || e.checkbox;
                        if ("string" == typeof l.attr("lay-ignore"))
                            return l.show();
                        var d = l.next("." + c[0])
                            , f = t(['<div class="layui-unselect ' + c[0] + (n.checked ? " " + c[1] : "") + (o ? " layui-checkbox-disbaled " + u : "") + '" lay-skin="' + (r || "") + '">', {
                            _switch: "<em>" + ((n.checked ? s[0] : s[1]) || "") + "</em><i></i>"
                        }[r] || (n.title.replace(/\s/g, "") ? "<span>" + n.title + "</span>" : "") + '<i class="layui-icon">' + (r ? "&#xe605;" : "&#xe618;") + "</i>", "</div>"].join(""));
                        d[0] && d.remove(),
                            l.after(f),
                            a.call(this, f, c)
                    })
                },
                radio: function() {
                    var e = "layui-form-radio"
                        , i = ["&#xe643;", "&#xe63f;"]
                        , a = c.find("input[type=radio]")
                        , n = function(a) {
                        var n = t(this)
                            , s = "layui-anim-scaleSpring";
                        a.on("click", function() {
                            var o = n[0].name
                                , u = n.parents(r)
                                , c = n.attr("lay-filter")
                                , d = u.find("input[name=" + o.replace(/(\.|#|\[|\])/g, "\\$1") + "]");
                            n[0].disabled || (layui.each(d, function() {
                                var a = t(this).next("." + e);
                                this.checked = !1,
                                    a.removeClass(e + "ed"),
                                    a.find(".layui-icon").removeClass(s).html(i[1])
                            }),
                                n[0].checked = !0,
                                a.addClass(e + "ed"),
                                a.find(".layui-icon").addClass(s).html(i[0]),
                                layui.event.call(n[0], l, "radio(" + c + ")", {
                                    elem: n[0],
                                    value: n[0].value,
                                    othis: a
                                }))
                        })
                    };
                    a.each(function(a, l) {
                        var r = t(this)
                            , s = r.next("." + e)
                            , o = this.disabled;
                        if ("string" == typeof r.attr("lay-ignore"))
                            return r.show();
                        s[0] && s.remove();
                        var c = t(['<div class="layui-unselect ' + e + (l.checked ? " " + e + "ed" : "") + (o ? " layui-radio-disbaled " + u : "") + '">', '<i class="layui-anim layui-icon">' + i[l.checked ? 0 : 1] + "</i>", "<div>" + function() {
                            var e = l.title || "";
                            return "string" == typeof r.next().attr("lay-radio") && (e = r.next().html(),
                                r.next().remove()),
                                e
                        }() + "</div>", "</div>"].join(""));
                        r.after(c),
                            n.call(this, c)
                    })
                }
            };
            return e ? d[e] ? d[e]() : a.error("不支持的" + e + "表单渲染") : layui.each(d, function(e, t) {
                t()
            }),
                n
        }
    ;
    var d = function() {
        var e = t(this)
            , a = f.config.verify
            , s = null
            , o = "layui-form-danger"
            , u = {}
            , c = e.parents(r)
            , d = c.find("*[lay-verify]")
            , y = e.parents("form")[0]
            , v = c.find("input,select,textarea")
            , h = e.attr("lay-filter");
        if (layui.each(d, function(e, l) {
                var r = t(this)
                    , u = r.attr("lay-verify").split("|")
                    , c = r.attr("lay-verType")
                    , d = r.val();
                if (r.removeClass(o),
                        layui.each(u, function(e, t) {
                            var u, f = "", y = "function" == typeof a[t];
                            if (a[t]) {
                                var u = y ? f = a[t](d, l) : !a[t][0].test(d);
                                if (f = f || a[t][1],
                                        u)
                                    return "tips" === c ? i.tips(f, function() {
                                        return "string" == typeof r.attr("lay-ignore") || "select" !== l.tagName.toLowerCase() && !/^checkbox|radio$/.test(l.type) ? r : r.next()
                                    }(), {
                                        tips: 1
                                    }) : "alert" === c ? i.alert(f, {
                                        title: "提示",
                                        shadeClose: !0
                                    }) : i.msg(f, {
                                        icon: 5,
                                        shift: 6
                                    }),
                                    n.android || n.ios || l.focus(),
                                        r.addClass(o),
                                        s = !0
                            }
                        }),
                        s)
                    return s
            }),
                s)
            return !1;
        var p = {};
        return layui.each(v, function(e, t) {
            if (t.name = (t.name || "").replace(/^\s*|\s*&/, ""),
                    t.name) {
                if (/^.*\[\]$/.test(t.name)) {
                    var i = t.name.match(/^(.*)\[\]$/g)[0];
                    p[i] = 0 | p[i],
                        t.name = t.name.replace(/^(.*)\[\]$/, "$1[" + p[i]++ + "]")
                }
                /^checkbox|radio$/.test(t.type) && !t.checked || (u[t.name] = t.value)
            }
        }),
            layui.event.call(this, l, "submit(" + h + ")", {
                elem: this,
                form: y,
                field: u
            })
    }
        , f = new c
        , y = t(document)
        , v = t(window);
    f.render(),
        y.on("reset", r, function() {
            var e = t(this).attr("lay-filter");
            setTimeout(function() {
                f.render(null, e)
            }, 50)
        }),
        y.on("submit", r, d).on("click", "*[lay-submit]", d),
        e(l, f)
});
