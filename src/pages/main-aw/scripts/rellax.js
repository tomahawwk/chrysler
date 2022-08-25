(function (e, b) {
    "function" === typeof define && define.amd
        ? define([], b)
        : "object" === typeof module && module.exports
            ? (module.exports = b())
            : (e.Rellax = b());
})(this, function () {
    var e = function (b, h) {
        var c = Object.create(e.prototype);
        if ("undefined" === typeof window.orientation) {
            var f = 0,
                g = 0,
                d = [],
                n =
                    window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    function (a) {
                        setTimeout(a, 1e3 / 60);
                    };
            c.options = { speed: -2 };
            h &&
                Object.keys(h).forEach(function (a) {
                    c.options[a] = h[a];
                });
            -10 > c.options.speed
                ? (c.options.speed = -10)
                : 10 < c.options.speed && (c.options.speed = 10);
            b || (b = ".rellax");
            if (document.getElementsByClassName(b.replace(".", "")))
                c.elems = document.getElementsByClassName(b.replace(".", ""));
            else if (!1 !== document.querySelector(b)) c.elems = querySelector(b);
            else throw Error("The elements you're trying to select don't exist.");
            var p = function (a) {
                var b = 0 + a.getBoundingClientRect().top,
                    d = a.clientHeight || a.offsetHeight || a.scrollHeight,
                    e = a.dataset.rellaxSpeed
                        ? a.dataset.rellaxSpeed
                        : c.options.speed,
                    f = Math.round(100 * e * (1 - (0 - b + g) / (d + g)));
                a = a.style.cssText.slice(11);
                return { base: f, top: b, height: d, speed: e, style: a };
            },
                l = function () {
                    var a = f;
                    f =
                        void 0 !== window.pageYOffset
                            ? window.pageYOffset
                            : (
                                document.documentElement ||
                                document.body.parentNode ||
                                document.body
                            ).scrollTop;
                    return a != f ? !0 : !1;
                },
                m = function () {
                    l() && k();
                    n(m);
                },
                k = function () {
                    for (var a = 0; a < c.elems.length; a++) {
                        var b =
                            "translate3d(0," +
                            (Math.round(
                                100 *
                                d[a].speed *
                                (1 - (f - d[a].top + g) / (d[a].height + g))
                            ) -
                                d[a].base) +
                            "px,0)" +
                            d[a].style;
                        c.elems[a].style.cssText =
                            "-webkit-transform:" +
                            b +
                            ";-moz-transform:" +
                            b +
                            ";transform:" +
                            b +
                            ";";
                    }
                };
            (function () {
                g = window.innerHeight;
                l();
                for (var a = 0; a < c.elems.length; a++) {
                    var b = p(c.elems[a]);
                    d.push(b);
                }
                window.addEventListener("resize", function () {
                    k();
                });
                m();
                k();
            })();
            Object.freeze();
            return c;
        }
    };
    return e;
});