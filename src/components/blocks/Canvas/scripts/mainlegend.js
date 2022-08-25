import * as THREE from "three";
/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Full-screen textured quad shader
 */
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */
export var enableScroll = false;
export const setupCanvas = () => {
    var WEBGL = {
        isWebGLAvailable: function () {
            try {
                var canvas = document.createElement('canvas');
                return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
            } catch (e) {
                return false;
            }
        },
        isWebGL2Available: function () {

            try {

                var canvas = document.createElement('canvas');
                return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));

            } catch (e) {
                return false;
            }
        },

        getWebGLErrorMessage: function () {

            return this.getErrorMessage(1);

        },

        getWebGL2ErrorMessage: function () {

            return this.getErrorMessage(2);

        },

        getErrorMessage: function (version) {

            var names = {
                1: 'WebGL',
                2: 'WebGL 2'
            };

            var contexts = {
                1: window.WebGLRenderingContext,
                2: window.WebGL2RenderingContext
            };

            var message = 'Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>';
            var element = document.createElement('div');
            element.id = 'webglmessage';
            element.style.fontFamily = 'monospace';
            element.style.fontSize = '13px';
            element.style.fontWeight = 'normal';
            element.style.textAlign = 'center';
            element.style.background = '#fff';
            element.style.color = '#000';
            element.style.padding = '1.5em';
            element.style.width = '400px';
            element.style.margin = '5em auto 0';

            if (contexts[version]) {

                message = message.replace('$0', 'graphics card');

            } else {

                message = message.replace('$0', 'browser');

            }

            message = message.replace('$1', names[version]);

            element.innerHTML = message;

            return element;

        }

    };
    THREE.CopyShader = {

        uniforms: {

            "tDiffuse": { value: null },
            "opacity": { value: 1.0 }

        },

        vertexShader: [

            "varying vec2 vUv;",

            "void main() {",

            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

            "}"

        ].join("\n"),

        fragmentShader: [

            "uniform float opacity;",

            "uniform sampler2D tDiffuse;",

            "varying vec2 vUv;",

            "void main() {",

            "vec4 texel = texture2D( tDiffuse, vUv );",
            "gl_FragColor = opacity * texel;",

            "}"

        ].join("\n")

    };

    /*!
     * VERSION: 0.2.2
     * DATE: 2018-02-15
     * UPDATES AND DOCS AT: http://greensock.com
     *
     * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
     * This work is subject to the terms at http://greensock.com/standard-license or for
     * Club GreenSock members, the software agreement that was issued with your membership.
     *
     * @author: Jack Doyle, jack@greensock.com
     **/
    var _gsScope = (typeof (module) !== "undefined" && module.exports && typeof (global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
    (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {

        "use strict";

        _gsScope._gsDefine("easing.CustomEase", ["easing.Ease"], function (Ease) {

            var _numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
                _svgPathExp = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
                _scientific = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,
                _needsParsingExp = /[cLlsS]/g,
                _bezierError = "CustomEase only accepts Cubic Bezier data.",
                _bezierToPoints = function (x1, y1, x2, y2, x3, y3, x4, y4, threshold, points, index) {
                    var x12 = (x1 + x2) / 2,
                        y12 = (y1 + y2) / 2,
                        x23 = (x2 + x3) / 2,
                        y23 = (y2 + y3) / 2,
                        x34 = (x3 + x4) / 2,
                        y34 = (y3 + y4) / 2,
                        x123 = (x12 + x23) / 2,
                        y123 = (y12 + y23) / 2,
                        x234 = (x23 + x34) / 2,
                        y234 = (y23 + y34) / 2,
                        x1234 = (x123 + x234) / 2,
                        y1234 = (y123 + y234) / 2,
                        dx = x4 - x1,
                        dy = y4 - y1,
                        d2 = Math.abs((x2 - x4) * dy - (y2 - y4) * dx),
                        d3 = Math.abs((x3 - x4) * dy - (y3 - y4) * dx),
                        length;
                    if (!points) {
                        points = [{ x: x1, y: y1 }, { x: x4, y: y4 }];
                        index = 1;
                    }
                    points.splice(index || points.length - 1, 0, { x: x1234, y: y1234 });
                    if ((d2 + d3) * (d2 + d3) > threshold * (dx * dx + dy * dy)) {
                        length = points.length;
                        _bezierToPoints(x1, y1, x12, y12, x123, y123, x1234, y1234, threshold, points, index);
                        _bezierToPoints(x1234, y1234, x234, y234, x34, y34, x4, y4, threshold, points, index + 1 + (points.length - length));
                    }
                    return points;
                },

                _pathDataToBezier = function (d) {
                    var a = (d + "").replace(_scientific, function (m) {
                        var n = +m;
                        return (n < 0.0001 && n > -0.0001) ? 0 : n;
                    }).match(_svgPathExp) || [], //some authoring programs spit out very small numbers in scientific notation like "1e-5", so make sure we round that down to 0 first.
                        path = [],
                        relativeX = 0,
                        relativeY = 0,
                        elements = a.length,
                        l = 2,
                        i, x, y, command, isRelative, segment, startX, startY, prevCommand, difX, difY;
                    for (i = 0; i < elements; i++) {
                        prevCommand = command;
                        if (isNaN(a[i])) {
                            command = a[i].toUpperCase();
                            isRelative = (command !== a[i]); //lower case means relative
                        } else { //commands like "C" can be strung together without any new command characters between.
                            i--;
                        }
                        x = +a[i + 1];
                        y = +a[i + 2];
                        if (isRelative) {
                            x += relativeX;
                            y += relativeY;
                        }
                        if (!i) {
                            startX = x;
                            startY = y;
                        }
                        if (command === "M") {
                            if (segment && segment.length < 8) { //if the path data was funky and just had a M with no actual drawing anywhere, skip it.
                                path.length -= 1;
                                l = 0;
                            }
                            relativeX = startX = x;
                            relativeY = startY = y;
                            segment = [x, y];
                            l = 2;
                            path.push(segment);
                            i += 2;
                            command = "L"; //an "M" with more than 2 values gets interpreted as "lineTo" commands ("L").

                        } else if (command === "C") {
                            if (!segment) {
                                segment = [0, 0];
                            }
                            segment[l++] = x;
                            segment[l++] = y;
                            if (!isRelative) {
                                relativeX = relativeY = 0;
                            }
                            segment[l++] = relativeX + a[i + 3] * 1; //note: "*1" is just a fast/short way to cast the value as a Number. WAAAY faster in Chrome, slightly slower in Firefox.
                            segment[l++] = relativeY + a[i + 4] * 1;
                            segment[l++] = relativeX = relativeX + a[i + 5] * 1;
                            segment[l++] = relativeY = relativeY + a[i + 6] * 1;
                            i += 6;

                        } else if (command === "S") {
                            if (prevCommand === "C" || prevCommand === "S") {
                                difX = relativeX - segment[l - 4];
                                difY = relativeY - segment[l - 3];
                                segment[l++] = relativeX + difX;
                                segment[l++] = relativeY + difY;
                            } else {
                                segment[l++] = relativeX;
                                segment[l++] = relativeY;
                            }
                            segment[l++] = x;
                            segment[l++] = y;
                            if (!isRelative) {
                                relativeX = relativeY = 0;
                            }
                            segment[l++] = relativeX = relativeX + a[i + 3] * 1;
                            segment[l++] = relativeY = relativeY + a[i + 4] * 1;
                            i += 4;

                        } else if (command === "L" || command === "Z") {
                            if (command === "Z") {
                                x = startX;
                                y = startY;
                                segment.closed = true;
                            }
                            if (command === "L" || Math.abs(relativeX - x) > 0.5 || Math.abs(relativeY - y) > 0.5) {
                                segment[l++] = relativeX + (x - relativeX) / 3;
                                segment[l++] = relativeY + (y - relativeY) / 3;
                                segment[l++] = relativeX + (x - relativeX) * 2 / 3;
                                segment[l++] = relativeY + (y - relativeY) * 2 / 3;
                                segment[l++] = x;
                                segment[l++] = y;
                                if (command === "L") {
                                    i += 2;
                                }
                            }
                            relativeX = x;
                            relativeY = y;
                        } else {
                            throw _bezierError;
                        }

                    }
                    return path[0];
                },

                _findMinimum = function (values) {
                    var l = values.length,
                        min = 999999999999,
                        i;
                    for (i = 1; i < l; i += 6) {
                        if (+values[i] < min) {
                            min = +values[i];
                        }
                    }
                    return min;
                },

                _normalize = function (values, height, originY) { //takes all the points and translates/scales them so that the x starts at 0 and ends at 1.
                    if (!originY && originY !== 0) {
                        originY = Math.max(+values[values.length - 1], +values[1]);
                    }
                    var tx = +values[0] * -1,
                        ty = -originY,
                        l = values.length,
                        sx = 1 / (+values[l - 2] + tx),
                        sy = -height || ((Math.abs(+values[l - 1] - +values[1]) < 0.01 * (+values[l - 2] - +values[0])) ? _findMinimum(values) + ty : +values[l - 1] + ty),
                        i;
                    if (sy) { //typically y ends at 1 (so that the end values are reached)
                        sy = 1 / sy;
                    } else { //in case the ease returns to its beginning value, scale everything proportionally
                        sy = -sx;
                    }
                    for (i = 0; i < l; i += 2) {
                        values[i] = (+values[i] + tx) * sx;
                        values[i + 1] = (+values[i + 1] + ty) * sy;
                    }
                },

                _getRatio = function (p) {
                    var point = this.lookup[(p * this.l) | 0] || this.lookup[this.l - 1];
                    if (point.nx < p) {
                        point = point.n;
                    }
                    return point.y + ((p - point.x) / point.cx) * point.cy;
                },


                CustomEase = function (id, data, config) {
                    this._calcEnd = true;
                    this.id = id;
                    if (id) {
                        Ease.map[id] = this;
                    }
                    this.getRatio = _getRatio; //speed optimization, faster lookups.
                    this.setData(data, config);
                },
                p = CustomEase.prototype = new Ease();

            p.constructor = CustomEase;

            p.setData = function (data, config) {
                data = data || "0,0,1,1";
                var values = data.match(_numbersExp),
                    closest = 1,
                    points = [],
                    l, a1, a2, i, inc, j, point, prevPoint, p, precision;
                config = config || {};
                precision = config.precision || 1;
                this.data = data;
                this.lookup = [];
                this.points = points;
                this.fast = (precision <= 1);
                if (_needsParsingExp.test(data) || (data.indexOf("M") !== -1 && data.indexOf("C") === -1)) {
                    values = _pathDataToBezier(data);
                }
                l = values.length;
                if (l === 4) {
                    values.unshift(0, 0);
                    values.push(1, 1);
                    l = 8;
                } else if ((l - 2) % 6) {
                    throw _bezierError;
                }
                if (+values[0] !== 0 || +values[l - 2] !== 1) {
                    _normalize(values, config.height, config.originY);
                }

                this.rawBezier = values;

                for (i = 2; i < l; i += 6) {
                    a1 = { x: +values[i - 2], y: +values[i - 1] };
                    a2 = { x: +values[i + 4], y: +values[i + 5] };
                    points.push(a1, a2);
                    _bezierToPoints(a1.x, a1.y, +values[i], +values[i + 1], +values[i + 2], +values[i + 3], a2.x, a2.y, 1 / (precision * 200000), points, points.length - 1);
                }
                l = points.length;
                for (i = 0; i < l; i++) {
                    point = points[i];
                    prevPoint = points[i - 1] || point;
                    if (point.x > prevPoint.x || (prevPoint.y !== point.y && prevPoint.x === point.x) || point === prevPoint) { //if a point goes BACKWARD in time or is a duplicate, just drop it.
                        prevPoint.cx = point.x - prevPoint.x; //change in x between this point and the next point (performance optimization)
                        prevPoint.cy = point.y - prevPoint.y;
                        prevPoint.n = point;
                        prevPoint.nx = point.x; //next point's x value (performance optimization, making lookups faster in getRatio()). Remember, the lookup will always land on a spot where it's either this point or the very next one (never beyond that)
                        if (this.fast && i > 1 && Math.abs(prevPoint.cy / prevPoint.cx - points[i - 2].cy / points[i - 2].cx) > 2) { //if there's a sudden change in direction, prioritize accuracy over speed. Like a bounce ease - you don't want to risk the sampling chunks landing on each side of the bounce anchor and having it clipped off.
                            this.fast = false;
                        }
                        if (prevPoint.cx < closest) {
                            if (!prevPoint.cx) {
                                prevPoint.cx = 0.001; //avoids math problems in getRatio() (dividing by zero)
                                if (i === l - 1) { //in case the final segment goes vertical RIGHT at the end, make sure we end at the end.
                                    prevPoint.x -= 0.001;
                                    closest = Math.min(closest, 0.001);
                                    this.fast = false;
                                }
                            } else {
                                closest = prevPoint.cx;
                            }
                        }
                    } else {
                        points.splice(i--, 1);
                        l--;
                    }
                }
                l = (1 / closest + 1) | 0;
                this.l = l; //record for speed optimization
                inc = 1 / l;
                j = 0;
                point = points[0];
                if (this.fast) {
                    for (i = 0; i < l; i++) { //for fastest lookups, we just sample along the path at equal x (time) distance. Uses more memory and is slightly less accurate for anchors that don't land on the sampling points, but for the vast majority of eases it's excellent (and fast).
                        p = i * inc;
                        if (point.nx < p) {
                            point = points[++j];
                        }
                        a1 = point.y + ((p - point.x) / point.cx) * point.cy;
                        this.lookup[i] = { x: p, cx: inc, y: a1, cy: 0, nx: 9 };
                        if (i) {
                            this.lookup[i - 1].cy = a1 - this.lookup[i - 1].y;
                        }
                    }
                    this.lookup[l - 1].cy = points[points.length - 1].y - a1;
                } else { //this option is more accurate, ensuring that EVERY anchor is hit perfectly. Clipping across a bounce, for example, would never happen.
                    for (i = 0; i < l; i++) { //build a lookup table based on the smallest distance so that we can instantly find the appropriate point (well, it'll either be that point or the very next one). We'll look up based on the linear progress. So it's it's 0.5 and the lookup table has 100 elements, it'd be like lookup[Math.floor(0.5 * 100)]
                        if (point.nx < i * inc) {
                            point = points[++j];
                        }
                        this.lookup[i] = point;
                    }

                    if (j < points.length - 1) {
                        this.lookup[i - 1] = points[points.length - 2];
                    }
                }
                this._calcEnd = (points[points.length - 1].y !== 1 || points[0].y !== 0); //ensures that we don't run into floating point errors. As long as we're starting at 0 and ending at 1, tell GSAP to skip the final calculation and use 0/1 as the factor.
                return this;
            };

            p.getRatio = _getRatio;

            p.getSVGData = function (config) {
                return CustomEase.getSVGData(this, config);
            };

            CustomEase.create = function (id, data, config) {
                return new CustomEase(id, data, config);
            };

            CustomEase.version = "0.2.2";

            CustomEase.bezierToPoints = _bezierToPoints;
            CustomEase.get = function (id) {
                return Ease.map[id];
            };
            CustomEase.getSVGData = function (ease, config) {
                config = config || {};
                var rnd = 1000,
                    width = config.width || 100,
                    height = config.height || 100,
                    x = config.x || 0,
                    y = (config.y || 0) + height,
                    e = config.path,
                    a, slope, i, inc, tx, ty, precision, threshold, prevX, prevY;
                if (config.invert) {
                    height = -height;
                    y = 0;
                }
                ease = ease.getRatio ? ease : Ease.map[ease] || console.log("No ease found: ", ease);
                if (!ease.rawBezier) {
                    a = ["M" + x + "," + y];
                    precision = Math.max(5, (config.precision || 1) * 200);
                    inc = 1 / precision;
                    precision += 2;
                    threshold = 5 / precision;
                    prevX = (((x + inc * width) * rnd) | 0) / rnd;
                    prevY = (((y + ease.getRatio(inc) * -height) * rnd) | 0) / rnd;
                    slope = (prevY - y) / (prevX - x);
                    for (i = 2; i < precision; i++) {
                        tx = (((x + i * inc * width) * rnd) | 0) / rnd;
                        ty = (((y + ease.getRatio(i * inc) * -height) * rnd) | 0) / rnd;
                        if (Math.abs((ty - prevY) / (tx - prevX) - slope) > threshold || i === precision - 1) { //only add points when the slope changes beyond the threshold
                            a.push(prevX + "," + prevY);
                            slope = (ty - prevY) / (tx - prevX);
                        }
                        prevX = tx;
                        prevY = ty;
                    }
                } else {
                    a = [];
                    precision = ease.rawBezier.length;
                    for (i = 0; i < precision; i += 2) {
                        a.push((((x + ease.rawBezier[i] * width) * rnd) | 0) / rnd + "," + (((y + ease.rawBezier[i + 1] * -height) * rnd) | 0) / rnd);
                    }
                    a[0] = "M" + a[0];
                    a[1] = "C" + a[1];
                }
                if (e) {
                    (typeof (e) === "string" ? document.querySelector(e) : e).setAttribute("d", a.join(" "));
                }
                return a.join(" ");
            };

            return CustomEase;

        }, true);

    }); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }

    //export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
    (function (name) {
        "use strict";
        var getGlobal = function () {
            return (_gsScope.GreenSockGlobals || _gsScope)[name];
        };
        if (typeof (module) !== "undefined" && module.exports) { //node
            require("gsap/umd/TweenLite");
            module.exports = getGlobal();
        } else if (typeof (define) === "function" && define.amd) { //AMD
            define(["gsap/umd/TweenLite"], getGlobal);
        }
    }("CustomEase"));

    /**
     * @author alteredq / http://alteredqualia.com/
     */

    THREE.EffectComposer = function (renderer, renderTarget) {

        this.renderer = renderer;

        if (renderTarget === undefined) {

            var parameters = {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                stencilBuffer: false
            };

            var size = renderer.getDrawingBufferSize();
            renderTarget = new THREE.WebGLRenderTarget(size.width, size.height, parameters);
            renderTarget.texture.name = 'EffectComposer.rt1';

        }

        this.renderTarget1 = renderTarget;
        this.renderTarget2 = renderTarget.clone();
        this.renderTarget2.texture.name = 'EffectComposer.rt2';

        this.writeBuffer = this.renderTarget1;
        this.readBuffer = this.renderTarget2;

        this.passes = [];

        // dependencies

        if (THREE.CopyShader === undefined) {

            console.error('THREE.EffectComposer relies on THREE.CopyShader');

        }

        if (THREE.ShaderPass === undefined) {

            console.error('THREE.EffectComposer relies on THREE.ShaderPass');

        }

        this.copyPass = new THREE.ShaderPass(THREE.CopyShader);

    };

    Object.assign(THREE.EffectComposer.prototype, {

        swapBuffers: function () {

            var tmp = this.readBuffer;
            this.readBuffer = this.writeBuffer;
            this.writeBuffer = tmp;

        },

        addPass: function (pass) {

            this.passes.push(pass);

            var size = this.renderer.getDrawingBufferSize();
            pass.setSize(size.width, size.height);

        },

        insertPass: function (pass, index) {

            this.passes.splice(index, 0, pass);

        },

        render: function (delta) {

            var maskActive = false;

            var pass, i, il = this.passes.length;

            for (i = 0; i < il; i++) {

                pass = this.passes[i];

                if (pass.enabled === false) continue;

                pass.render(this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive);

                if (pass.needsSwap) {

                    if (maskActive) {

                        var context = this.renderer.context;

                        context.stencilFunc(context.NOTEQUAL, 1, 0xffffffff);

                        this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, delta);

                        context.stencilFunc(context.EQUAL, 1, 0xffffffff);

                    }

                    this.swapBuffers();

                }

                if (THREE.MaskPass !== undefined) {

                    if (pass instanceof THREE.MaskPass) {

                        maskActive = true;

                    } else if (pass instanceof THREE.ClearMaskPass) {

                        maskActive = false;

                    }

                }

            }

        },

        reset: function (renderTarget) {

            if (renderTarget === undefined) {

                var size = this.renderer.getDrawingBufferSize();

                renderTarget = this.renderTarget1.clone();
                renderTarget.setSize(size.width, size.height);

            }

            this.renderTarget1.dispose();
            this.renderTarget2.dispose();
            this.renderTarget1 = renderTarget;
            this.renderTarget2 = renderTarget.clone();

            this.writeBuffer = this.renderTarget1;
            this.readBuffer = this.renderTarget2;

        },

        setSize: function (width, height) {

            this.renderTarget1.setSize(width, height);
            this.renderTarget2.setSize(width, height);

            for (var i = 0; i < this.passes.length; i++) {

                this.passes[i].setSize(width, height);

            }

        }

    });


    THREE.Pass = function () {

        // if set to true, the pass is processed by the composer
        this.enabled = true;

        // if set to true, the pass indicates to swap read and write buffer after rendering
        this.needsSwap = true;

        // if set to true, the pass clears its buffer before rendering
        this.clear = false;

        // if set to true, the result of the pass is rendered to screen
        this.renderToScreen = false;

    };

    Object.assign(THREE.Pass.prototype, {

        setSize: function (width, height) { },

        render: function (renderer, writeBuffer, readBuffer, delta, maskActive) {

            console.error('THREE.Pass: .render() must be implemented in derived pass.');

        }

    });

    /**
     * @author alteredq / http://alteredqualia.com/
     * @author davidedc / http://www.sketchpatch.net/
     *
     * NVIDIA FXAA by Timothy Lottes
     * http://timothylottes.blogspot.com/2011/06/fxaa3-source-released.html
     * - WebGL port by @supereggbert
     * http://www.glge.org/demos/fxaa/
     */

    THREE.FXAAShader = {

        uniforms: {

            "tDiffuse": { value: null },
            "resolution": { value: new THREE.Vector2(1 / 1024, 1 / 512) }

        },

        vertexShader: [

            "varying vec2 vUv;",

            "void main() {",

            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

            "}"

        ].join("\n"),

        fragmentShader: [
            "precision highp float;",
            "",
            "uniform sampler2D tDiffuse;",
            "",
            "uniform vec2 resolution;",
            "",
            "varying vec2 vUv;",
            "",
            "// FXAA 3.11 implementation by NVIDIA, ported to WebGL by Agost Biro (biro@archilogic.com)",
            "",
            "//----------------------------------------------------------------------------------",
            "// File:        es3-kepler\FXAA\assets\shaders/FXAA_DefaultES.frag",
            "// SDK Version: v3.00",
            "// Email:       gameworks@nvidia.com",
            "// Site:        http://developer.nvidia.com/",
            "//",
            "// Copyright (c) 2014-2015, NVIDIA CORPORATION. All rights reserved.",
            "//",
            "// Redistribution and use in source and binary forms, with or without",
            "// modification, are permitted provided that the following conditions",
            "// are met:",
            "//  * Redistributions of source code must retain the above copyright",
            "//    notice, this list of conditions and the following disclaimer.",
            "//  * Redistributions in binary form must reproduce the above copyright",
            "//    notice, this list of conditions and the following disclaimer in the",
            "//    documentation and/or other materials provided with the distribution.",
            "//  * Neither the name of NVIDIA CORPORATION nor the names of its",
            "//    contributors may be used to endorse or promote products derived",
            "//    from this software without specific prior written permission.",
            "//",
            "// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ``AS IS'' AND ANY",
            "// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE",
            "// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR",
            "// PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR",
            "// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,",
            "// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,",
            "// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR",
            "// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY",
            "// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT",
            "// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE",
            "// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.",
            "//",
            "//----------------------------------------------------------------------------------",
            "",
            "#define FXAA_PC 1",
            "#define FXAA_GLSL_100 1",
            "#define FXAA_QUALITY_PRESET 12",
            "",
            "#define FXAA_GREEN_AS_LUMA 1",
            "",
            "/*--------------------------------------------------------------------------*/",
            "#ifndef FXAA_PC_CONSOLE",
            "    //",
            "    // The console algorithm for PC is included",
            "    // for developers targeting really low spec machines.",
            "    // Likely better to just run FXAA_PC, and use a really low preset.",
            "    //",
            "    #define FXAA_PC_CONSOLE 0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#ifndef FXAA_GLSL_120",
            "    #define FXAA_GLSL_120 0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#ifndef FXAA_GLSL_130",
            "    #define FXAA_GLSL_130 0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#ifndef FXAA_HLSL_3",
            "    #define FXAA_HLSL_3 0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#ifndef FXAA_HLSL_4",
            "    #define FXAA_HLSL_4 0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#ifndef FXAA_HLSL_5",
            "    #define FXAA_HLSL_5 0",
            "#endif",
            "/*==========================================================================*/",
            "#ifndef FXAA_GREEN_AS_LUMA",
            "    //",
            "    // For those using non-linear color,",
            "    // and either not able to get luma in alpha, or not wanting to,",
            "    // this enables FXAA to run using green as a proxy for luma.",
            "    // So with this enabled, no need to pack luma in alpha.",
            "    //",
            "    // This will turn off AA on anything which lacks some amount of green.",
            "    // Pure red and blue or combination of only R and B, will get no AA.",
            "    //",
            "    // Might want to lower the settings for both,",
            "    //    fxaaConsoleEdgeThresholdMin",
            "    //    fxaaQualityEdgeThresholdMin",
            "    // In order to insure AA does not get turned off on colors",
            "    // which contain a minor amount of green.",
            "    //",
            "    // 1 = On.",
            "    // 0 = Off.",
            "    //",
            "    #define FXAA_GREEN_AS_LUMA 0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#ifndef FXAA_EARLY_EXIT",
            "    //",
            "    // Controls algorithm's early exit path.",
            "    // On PS3 turning this ON adds 2 cycles to the shader.",
            "    // On 360 turning this OFF adds 10ths of a millisecond to the shader.",
            "    // Turning this off on console will result in a more blurry image.",
            "    // So this defaults to on.",
            "    //",
            "    // 1 = On.",
            "    // 0 = Off.",
            "    //",
            "    #define FXAA_EARLY_EXIT 1",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#ifndef FXAA_DISCARD",
            "    //",
            "    // Only valid for PC OpenGL currently.",
            "    // Probably will not work when FXAA_GREEN_AS_LUMA = 1.",
            "    //",
            "    // 1 = Use discard on pixels which don't need AA.",
            "    //     For APIs which enable concurrent TEX+ROP from same surface.",
            "    // 0 = Return unchanged color on pixels which don't need AA.",
            "    //",
            "    #define FXAA_DISCARD 0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#ifndef FXAA_FAST_PIXEL_OFFSET",
            "    //",
            "    // Used for GLSL 120 only.",
            "    //",
            "    // 1 = GL API supports fast pixel offsets",
            "    // 0 = do not use fast pixel offsets",
            "    //",
            "    #ifdef GL_EXT_gpu_shader4",
            "        #define FXAA_FAST_PIXEL_OFFSET 1",
            "    #endif",
            "    #ifdef GL_NV_gpu_shader5",
            "        #define FXAA_FAST_PIXEL_OFFSET 1",
            "    #endif",
            "    #ifdef GL_ARB_gpu_shader5",
            "        #define FXAA_FAST_PIXEL_OFFSET 1",
            "    #endif",
            "    #ifndef FXAA_FAST_PIXEL_OFFSET",
            "        #define FXAA_FAST_PIXEL_OFFSET 0",
            "    #endif",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#ifndef FXAA_GATHER4_ALPHA",
            "    //",
            "    // 1 = API supports gather4 on alpha channel.",
            "    // 0 = API does not support gather4 on alpha channel.",
            "    //",
            "    #if (FXAA_HLSL_5 == 1)",
            "        #define FXAA_GATHER4_ALPHA 1",
            "    #endif",
            "    #ifdef GL_ARB_gpu_shader5",
            "        #define FXAA_GATHER4_ALPHA 1",
            "    #endif",
            "    #ifdef GL_NV_gpu_shader5",
            "        #define FXAA_GATHER4_ALPHA 1",
            "    #endif",
            "    #ifndef FXAA_GATHER4_ALPHA",
            "        #define FXAA_GATHER4_ALPHA 0",
            "    #endif",
            "#endif",
            "",
            "",
            "/*============================================================================",
            "                        FXAA QUALITY - TUNING KNOBS",
            "------------------------------------------------------------------------------",
            "NOTE the other tuning knobs are now in the shader function inputs!",
            "============================================================================*/",
            "#ifndef FXAA_QUALITY_PRESET",
            "    //",
            "    // Choose the quality preset.",
            "    // This needs to be compiled into the shader as it effects code.",
            "    // Best option to include multiple presets is to",
            "    // in each shader define the preset, then include this file.",
            "    //",
            "    // OPTIONS",
            "    // -----------------------------------------------------------------------",
            "    // 10 to 15 - default medium dither (10=fastest, 15=highest quality)",
            "    // 20 to 29 - less dither, more expensive (20=fastest, 29=highest quality)",
            "    // 39       - no dither, very expensive",
            "    //",
            "    // NOTES",
            "    // -----------------------------------------------------------------------",
            "    // 12 = slightly faster then FXAA 3.9 and higher edge quality (default)",
            "    // 13 = about same speed as FXAA 3.9 and better than 12",
            "    // 23 = closest to FXAA 3.9 visually and performance wise",
            "    //  _ = the lowest digit is directly related to performance",
            "    // _  = the highest digit is directly related to style",
            "    //",
            "    #define FXAA_QUALITY_PRESET 12",
            "#endif",
            "",
            "",
            "/*============================================================================",
            "",
            "                           FXAA QUALITY - PRESETS",
            "",
            "============================================================================*/",
            "",
            "/*============================================================================",
            "                     FXAA QUALITY - MEDIUM DITHER PRESETS",
            "============================================================================*/",
            "#if (FXAA_QUALITY_PRESET == 10)",
            "    #define FXAA_QUALITY_PS 3",
            "    #define FXAA_QUALITY_P0 1.5",
            "    #define FXAA_QUALITY_P1 3.0",
            "    #define FXAA_QUALITY_P2 12.0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_QUALITY_PRESET == 11)",
            "    #define FXAA_QUALITY_PS 4",
            "    #define FXAA_QUALITY_P0 1.0",
            "    #define FXAA_QUALITY_P1 1.5",
            "    #define FXAA_QUALITY_P2 3.0",
            "    #define FXAA_QUALITY_P3 12.0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_QUALITY_PRESET == 12)",
            "    #define FXAA_QUALITY_PS 5",
            "    #define FXAA_QUALITY_P0 1.0",
            "    #define FXAA_QUALITY_P1 1.5",
            "    #define FXAA_QUALITY_P2 2.0",
            "    #define FXAA_QUALITY_P3 4.0",
            "    #define FXAA_QUALITY_P4 12.0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_QUALITY_PRESET == 13)",
            "    #define FXAA_QUALITY_PS 6",
            "    #define FXAA_QUALITY_P0 1.0",
            "    #define FXAA_QUALITY_P1 1.5",
            "    #define FXAA_QUALITY_P2 2.0",
            "    #define FXAA_QUALITY_P3 2.0",
            "    #define FXAA_QUALITY_P4 4.0",
            "    #define FXAA_QUALITY_P5 12.0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_QUALITY_PRESET == 14)",
            "    #define FXAA_QUALITY_PS 7",
            "    #define FXAA_QUALITY_P0 1.0",
            "    #define FXAA_QUALITY_P1 1.5",
            "    #define FXAA_QUALITY_P2 2.0",
            "    #define FXAA_QUALITY_P3 2.0",
            "    #define FXAA_QUALITY_P4 2.0",
            "    #define FXAA_QUALITY_P5 4.0",
            "    #define FXAA_QUALITY_P6 12.0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_QUALITY_PRESET == 15)",
            "    #define FXAA_QUALITY_PS 8",
            "    #define FXAA_QUALITY_P0 1.0",
            "    #define FXAA_QUALITY_P1 1.5",
            "    #define FXAA_QUALITY_P2 2.0",
            "    #define FXAA_QUALITY_P3 2.0",
            "    #define FXAA_QUALITY_P4 2.0",
            "    #define FXAA_QUALITY_P5 2.0",
            "    #define FXAA_QUALITY_P6 4.0",
            "    #define FXAA_QUALITY_P7 12.0",
            "#endif",
            "",
            "/*============================================================================",
            "                     FXAA QUALITY - LOW DITHER PRESETS",
            "============================================================================*/",
            "#if (FXAA_QUALITY_PRESET == 20)",
            "    #define FXAA_QUALITY_PS 3",
            "    #define FXAA_QUALITY_P0 1.5",
            "    #define FXAA_QUALITY_P1 2.0",
            "    #define FXAA_QUALITY_P2 8.0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_QUALITY_PRESET == 21)",
            "    #define FXAA_QUALITY_PS 4",
            "    #define FXAA_QUALITY_P0 1.0",
            "    #define FXAA_QUALITY_P1 1.5",
            "    #define FXAA_QUALITY_P2 2.0",
            "    #define FXAA_QUALITY_P3 8.0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_QUALITY_PRESET == 22)",
            "    #define FXAA_QUALITY_PS 5",
            "    #define FXAA_QUALITY_P0 1.0",
            "    #define FXAA_QUALITY_P1 1.5",
            "    #define FXAA_QUALITY_P2 2.0",
            "    #define FXAA_QUALITY_P3 2.0",
            "    #define FXAA_QUALITY_P4 8.0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_QUALITY_PRESET == 23)",
            "    #define FXAA_QUALITY_PS 6",
            "    #define FXAA_QUALITY_P0 1.0",
            "    #define FXAA_QUALITY_P1 1.5",
            "    #define FXAA_QUALITY_P2 2.0",
            "    #define FXAA_QUALITY_P3 2.0",
            "    #define FXAA_QUALITY_P4 2.0",
            "    #define FXAA_QUALITY_P5 8.0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_QUALITY_PRESET == 24)",
            "    #define FXAA_QUALITY_PS 7",
            "    #define FXAA_QUALITY_P0 1.0",
            "    #define FXAA_QUALITY_P1 1.5",
            "    #define FXAA_QUALITY_P2 2.0",
            "    #define FXAA_QUALITY_P3 2.0",
            "    #define FXAA_QUALITY_P4 2.0",
            "    #define FXAA_QUALITY_P5 3.0",
            "    #define FXAA_QUALITY_P6 8.0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_QUALITY_PRESET == 25)",
            "    #define FXAA_QUALITY_PS 8",
            "    #define FXAA_QUALITY_P0 1.0",
            "    #define FXAA_QUALITY_P1 1.5",
            "    #define FXAA_QUALITY_P2 2.0",
            "    #define FXAA_QUALITY_P3 2.0",
            "    #define FXAA_QUALITY_P4 2.0",
            "    #define FXAA_QUALITY_P5 2.0",
            "    #define FXAA_QUALITY_P6 4.0",
            "    #define FXAA_QUALITY_P7 8.0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_QUALITY_PRESET == 26)",
            "    #define FXAA_QUALITY_PS 9",
            "    #define FXAA_QUALITY_P0 1.0",
            "    #define FXAA_QUALITY_P1 1.5",
            "    #define FXAA_QUALITY_P2 2.0",
            "    #define FXAA_QUALITY_P3 2.0",
            "    #define FXAA_QUALITY_P4 2.0",
            "    #define FXAA_QUALITY_P5 2.0",
            "    #define FXAA_QUALITY_P6 2.0",
            "    #define FXAA_QUALITY_P7 4.0",
            "    #define FXAA_QUALITY_P8 8.0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_QUALITY_PRESET == 27)",
            "    #define FXAA_QUALITY_PS 10",
            "    #define FXAA_QUALITY_P0 1.0",
            "    #define FXAA_QUALITY_P1 1.5",
            "    #define FXAA_QUALITY_P2 2.0",
            "    #define FXAA_QUALITY_P3 2.0",
            "    #define FXAA_QUALITY_P4 2.0",
            "    #define FXAA_QUALITY_P5 2.0",
            "    #define FXAA_QUALITY_P6 2.0",
            "    #define FXAA_QUALITY_P7 2.0",
            "    #define FXAA_QUALITY_P8 4.0",
            "    #define FXAA_QUALITY_P9 8.0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_QUALITY_PRESET == 28)",
            "    #define FXAA_QUALITY_PS 11",
            "    #define FXAA_QUALITY_P0 1.0",
            "    #define FXAA_QUALITY_P1 1.5",
            "    #define FXAA_QUALITY_P2 2.0",
            "    #define FXAA_QUALITY_P3 2.0",
            "    #define FXAA_QUALITY_P4 2.0",
            "    #define FXAA_QUALITY_P5 2.0",
            "    #define FXAA_QUALITY_P6 2.0",
            "    #define FXAA_QUALITY_P7 2.0",
            "    #define FXAA_QUALITY_P8 2.0",
            "    #define FXAA_QUALITY_P9 4.0",
            "    #define FXAA_QUALITY_P10 8.0",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_QUALITY_PRESET == 29)",
            "    #define FXAA_QUALITY_PS 12",
            "    #define FXAA_QUALITY_P0 1.0",
            "    #define FXAA_QUALITY_P1 1.5",
            "    #define FXAA_QUALITY_P2 2.0",
            "    #define FXAA_QUALITY_P3 2.0",
            "    #define FXAA_QUALITY_P4 2.0",
            "    #define FXAA_QUALITY_P5 2.0",
            "    #define FXAA_QUALITY_P6 2.0",
            "    #define FXAA_QUALITY_P7 2.0",
            "    #define FXAA_QUALITY_P8 2.0",
            "    #define FXAA_QUALITY_P9 2.0",
            "    #define FXAA_QUALITY_P10 4.0",
            "    #define FXAA_QUALITY_P11 8.0",
            "#endif",
            "",
            "/*============================================================================",
            "                     FXAA QUALITY - EXTREME QUALITY",
            "============================================================================*/",
            "#if (FXAA_QUALITY_PRESET == 39)",
            "    #define FXAA_QUALITY_PS 12",
            "    #define FXAA_QUALITY_P0 1.0",
            "    #define FXAA_QUALITY_P1 1.0",
            "    #define FXAA_QUALITY_P2 1.0",
            "    #define FXAA_QUALITY_P3 1.0",
            "    #define FXAA_QUALITY_P4 1.0",
            "    #define FXAA_QUALITY_P5 1.5",
            "    #define FXAA_QUALITY_P6 2.0",
            "    #define FXAA_QUALITY_P7 2.0",
            "    #define FXAA_QUALITY_P8 2.0",
            "    #define FXAA_QUALITY_P9 2.0",
            "    #define FXAA_QUALITY_P10 4.0",
            "    #define FXAA_QUALITY_P11 8.0",
            "#endif",
            "",
            "",
            "",
            "/*============================================================================",
            "",
            "                                API PORTING",
            "",
            "============================================================================*/",
            "#if (FXAA_GLSL_100 == 1) || (FXAA_GLSL_120 == 1) || (FXAA_GLSL_130 == 1)",
            "    #define FxaaBool bool",
            "    #define FxaaDiscard discard",
            "    #define FxaaFloat float",
            "    #define FxaaFloat2 vec2",
            "    #define FxaaFloat3 vec3",
            "    #define FxaaFloat4 vec4",
            "    #define FxaaHalf float",
            "    #define FxaaHalf2 vec2",
            "    #define FxaaHalf3 vec3",
            "    #define FxaaHalf4 vec4",
            "    #define FxaaInt2 ivec2",
            "    #define FxaaSat(x) clamp(x, 0.0, 1.0)",
            "    #define FxaaTex sampler2D",
            "#else",
            "    #define FxaaBool bool",
            "    #define FxaaDiscard clip(-1)",
            "    #define FxaaFloat float",
            "    #define FxaaFloat2 float2",
            "    #define FxaaFloat3 float3",
            "    #define FxaaFloat4 float4",
            "    #define FxaaHalf half",
            "    #define FxaaHalf2 half2",
            "    #define FxaaHalf3 half3",
            "    #define FxaaHalf4 half4",
            "    #define FxaaSat(x) saturate(x)",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_GLSL_100 == 1)",
            "  #define FxaaTexTop(t, p) texture2D(t, p, 0.0)",
            "  #define FxaaTexOff(t, p, o, r) texture2D(t, p + (o * r), 0.0)",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_GLSL_120 == 1)",
            "    // Requires,",
            "    //  #version 120",
            "    // And at least,",
            "    //  #extension GL_EXT_gpu_shader4 : enable",
            "    //  (or set FXAA_FAST_PIXEL_OFFSET 1 to work like DX9)",
            "    #define FxaaTexTop(t, p) texture2DLod(t, p, 0.0)",
            "    #if (FXAA_FAST_PIXEL_OFFSET == 1)",
            "        #define FxaaTexOff(t, p, o, r) texture2DLodOffset(t, p, 0.0, o)",
            "    #else",
            "        #define FxaaTexOff(t, p, o, r) texture2DLod(t, p + (o * r), 0.0)",
            "    #endif",
            "    #if (FXAA_GATHER4_ALPHA == 1)",
            "        // use #extension GL_ARB_gpu_shader5 : enable",
            "        #define FxaaTexAlpha4(t, p) textureGather(t, p, 3)",
            "        #define FxaaTexOffAlpha4(t, p, o) textureGatherOffset(t, p, o, 3)",
            "        #define FxaaTexGreen4(t, p) textureGather(t, p, 1)",
            "        #define FxaaTexOffGreen4(t, p, o) textureGatherOffset(t, p, o, 1)",
            "    #endif",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_GLSL_130 == 1)",
            "    // Requires \"#version 130\" or better",
            "    #define FxaaTexTop(t, p) textureLod(t, p, 0.0)",
            "    #define FxaaTexOff(t, p, o, r) textureLodOffset(t, p, 0.0, o)",
            "    #if (FXAA_GATHER4_ALPHA == 1)",
            "        // use #extension GL_ARB_gpu_shader5 : enable",
            "        #define FxaaTexAlpha4(t, p) textureGather(t, p, 3)",
            "        #define FxaaTexOffAlpha4(t, p, o) textureGatherOffset(t, p, o, 3)",
            "        #define FxaaTexGreen4(t, p) textureGather(t, p, 1)",
            "        #define FxaaTexOffGreen4(t, p, o) textureGatherOffset(t, p, o, 1)",
            "    #endif",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_HLSL_3 == 1)",
            "    #define FxaaInt2 float2",
            "    #define FxaaTex sampler2D",
            "    #define FxaaTexTop(t, p) tex2Dlod(t, float4(p, 0.0, 0.0))",
            "    #define FxaaTexOff(t, p, o, r) tex2Dlod(t, float4(p + (o * r), 0, 0))",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_HLSL_4 == 1)",
            "    #define FxaaInt2 int2",
            "    struct FxaaTex { SamplerState smpl; Texture2D tex; };",
            "    #define FxaaTexTop(t, p) t.tex.SampleLevel(t.smpl, p, 0.0)",
            "    #define FxaaTexOff(t, p, o, r) t.tex.SampleLevel(t.smpl, p, 0.0, o)",
            "#endif",
            "/*--------------------------------------------------------------------------*/",
            "#if (FXAA_HLSL_5 == 1)",
            "    #define FxaaInt2 int2",
            "    struct FxaaTex { SamplerState smpl; Texture2D tex; };",
            "    #define FxaaTexTop(t, p) t.tex.SampleLevel(t.smpl, p, 0.0)",
            "    #define FxaaTexOff(t, p, o, r) t.tex.SampleLevel(t.smpl, p, 0.0, o)",
            "    #define FxaaTexAlpha4(t, p) t.tex.GatherAlpha(t.smpl, p)",
            "    #define FxaaTexOffAlpha4(t, p, o) t.tex.GatherAlpha(t.smpl, p, o)",
            "    #define FxaaTexGreen4(t, p) t.tex.GatherGreen(t.smpl, p)",
            "    #define FxaaTexOffGreen4(t, p, o) t.tex.GatherGreen(t.smpl, p, o)",
            "#endif",
            "",
            "",
            "/*============================================================================",
            "                   GREEN AS LUMA OPTION SUPPORT FUNCTION",
            "============================================================================*/",
            "#if (FXAA_GREEN_AS_LUMA == 0)",
            "    FxaaFloat FxaaLuma(FxaaFloat4 rgba) { return rgba.w; }",
            "#else",
            "    FxaaFloat FxaaLuma(FxaaFloat4 rgba) { return rgba.y; }",
            "#endif",
            "",
            "",
            "",
            "",
            "/*============================================================================",
            "",
            "                             FXAA3 QUALITY - PC",
            "",
            "============================================================================*/",
            "#if (FXAA_PC == 1)",
            "/*--------------------------------------------------------------------------*/",
            "FxaaFloat4 FxaaPixelShader(",
            "    //",
            "    // Use noperspective interpolation here (turn off perspective interpolation).",
            "    // {xy} = center of pixel",
            "    FxaaFloat2 pos,",
            "    //",
            "    // Used only for FXAA Console, and not used on the 360 version.",
            "    // Use noperspective interpolation here (turn off perspective interpolation).",
            "    // {xy_} = upper left of pixel",
            "    // {_zw} = lower right of pixel",
            "    FxaaFloat4 fxaaConsolePosPos,",
            "    //",
            "    // Input color texture.",
            "    // {rgb_} = color in linear or perceptual color space",
            "    // if (FXAA_GREEN_AS_LUMA == 0)",
            "    //     {__a} = luma in perceptual color space (not linear)",
            "    FxaaTex tex,",
            "    //",
            "    // Only used on the optimized 360 version of FXAA Console.",
            "    // For everything but 360, just use the same input here as for \"tex\".",
            "    // For 360, same texture, just alias with a 2nd sampler.",
            "    // This sampler needs to have an exponent bias of -1.",
            "    FxaaTex fxaaConsole360TexExpBiasNegOne,",
            "    //",
            "    // Only used on the optimized 360 version of FXAA Console.",
            "    // For everything but 360, just use the same input here as for \"tex\".",
            "    // For 360, same texture, just alias with a 3nd sampler.",
            "    // This sampler needs to have an exponent bias of -2.",
            "    FxaaTex fxaaConsole360TexExpBiasNegTwo,",
            "    //",
            "    // Only used on FXAA Quality.",
            "    // This must be from a constant/uniform.",
            "    // {x_} = 1.0/screenWidthInPixels",
            "    // {_y} = 1.0/screenHeightInPixels",
            "    FxaaFloat2 fxaaQualityRcpFrame,",
            "    //",
            "    // Only used on FXAA Console.",
            "    // This must be from a constant/uniform.",
            "    // This effects sub-pixel AA quality and inversely sharpness.",
            "    //   Where N ranges between,",
            "    //     N = 0.50 (default)",
            "    //     N = 0.33 (sharper)",
            "    // {x__} = -N/screenWidthInPixels",
            "    // {_y_} = -N/screenHeightInPixels",
            "    // {_z_} =  N/screenWidthInPixels",
            "    // {__w} =  N/screenHeightInPixels",
            "    FxaaFloat4 fxaaConsoleRcpFrameOpt,",
            "    //",
            "    // Only used on FXAA Console.",
            "    // Not used on 360, but used on PS3 and PC.",
            "    // This must be from a constant/uniform.",
            "    // {x__} = -2.0/screenWidthInPixels",
            "    // {_y_} = -2.0/screenHeightInPixels",
            "    // {_z_} =  2.0/screenWidthInPixels",
            "    // {__w} =  2.0/screenHeightInPixels",
            "    FxaaFloat4 fxaaConsoleRcpFrameOpt2,",
            "    //",
            "    // Only used on FXAA Console.",
            "    // Only used on 360 in place of fxaaConsoleRcpFrameOpt2.",
            "    // This must be from a constant/uniform.",
            "    // {x__} =  8.0/screenWidthInPixels",
            "    // {_y_} =  8.0/screenHeightInPixels",
            "    // {_z_} = -4.0/screenWidthInPixels",
            "    // {__w} = -4.0/screenHeightInPixels",
            "    FxaaFloat4 fxaaConsole360RcpFrameOpt2,",
            "    //",
            "    // Only used on FXAA Quality.",
            "    // This used to be the FXAA_QUALITY_SUBPIX define.",
            "    // It is here now to allow easier tuning.",
            "    // Choose the amount of sub-pixel aliasing removal.",
            "    // This can effect sharpness.",
            "    //   1.00 - upper limit (softer)",
            "    //   0.75 - default amount of filtering",
            "    //   0.50 - lower limit (sharper, less sub-pixel aliasing removal)",
            "    //   0.25 - almost off",
            "    //   0.00 - completely off",
            "    FxaaFloat fxaaQualitySubpix,",
            "    //",
            "    // Only used on FXAA Quality.",
            "    // This used to be the FXAA_QUALITY_EDGE_THRESHOLD define.",
            "    // It is here now to allow easier tuning.",
            "    // The minimum amount of local contrast required to apply algorithm.",
            "    //   0.333 - too little (faster)",
            "    //   0.250 - low quality",
            "    //   0.166 - default",
            "    //   0.125 - high quality",
            "    //   0.063 - overkill (slower)",
            "    FxaaFloat fxaaQualityEdgeThreshold,",
            "    //",
            "    // Only used on FXAA Quality.",
            "    // This used to be the FXAA_QUALITY_EDGE_THRESHOLD_MIN define.",
            "    // It is here now to allow easier tuning.",
            "    // Trims the algorithm from processing darks.",
            "    //   0.0833 - upper limit (default, the start of visible unfiltered edges)",
            "    //   0.0625 - high quality (faster)",
            "    //   0.0312 - visible limit (slower)",
            "    // Special notes when using FXAA_GREEN_AS_LUMA,",
            "    //   Likely want to set this to zero.",
            "    //   As colors that are mostly not-green",
            "    //   will appear very dark in the green channel!",
            "    //   Tune by looking at mostly non-green content,",
            "    //   then start at zero and increase until aliasing is a problem.",
            "    FxaaFloat fxaaQualityEdgeThresholdMin,",
            "    //",
            "    // Only used on FXAA Console.",
            "    // This used to be the FXAA_CONSOLE_EDGE_SHARPNESS define.",
            "    // It is here now to allow easier tuning.",
            "    // This does not effect PS3, as this needs to be compiled in.",
            "    //   Use FXAA_CONSOLE_PS3_EDGE_SHARPNESS for PS3.",
            "    //   Due to the PS3 being ALU bound,",
            "    //   there are only three safe values here: 2 and 4 and 8.",
            "    //   These options use the shaders ability to a free *|/ by 2|4|8.",
            "    // For all other platforms can be a non-power of two.",
            "    //   8.0 is sharper (default!!!)",
            "    //   4.0 is softer",
            "    //   2.0 is really soft (good only for vector graphics inputs)",
            "    FxaaFloat fxaaConsoleEdgeSharpness,",
            "    //",
            "    // Only used on FXAA Console.",
            "    // This used to be the FXAA_CONSOLE_EDGE_THRESHOLD define.",
            "    // It is here now to allow easier tuning.",
            "    // This does not effect PS3, as this needs to be compiled in.",
            "    //   Use FXAA_CONSOLE_PS3_EDGE_THRESHOLD for PS3.",
            "    //   Due to the PS3 being ALU bound,",
            "    //   there are only two safe values here: 1/4 and 1/8.",
            "    //   These options use the shaders ability to a free *|/ by 2|4|8.",
            "    // The console setting has a different mapping than the quality setting.",
            "    // Other platforms can use other values.",
            "    //   0.125 leaves less aliasing, but is softer (default!!!)",
            "    //   0.25 leaves more aliasing, and is sharper",
            "    FxaaFloat fxaaConsoleEdgeThreshold,",
            "    //",
            "    // Only used on FXAA Console.",
            "    // This used to be the FXAA_CONSOLE_EDGE_THRESHOLD_MIN define.",
            "    // It is here now to allow easier tuning.",
            "    // Trims the algorithm from processing darks.",
            "    // The console setting has a different mapping than the quality setting.",
            "    // This only applies when FXAA_EARLY_EXIT is 1.",
            "    // This does not apply to PS3,",
            "    // PS3 was simplified to avoid more shader instructions.",
            "    //   0.06 - faster but more aliasing in darks",
            "    //   0.05 - default",
            "    //   0.04 - slower and less aliasing in darks",
            "    // Special notes when using FXAA_GREEN_AS_LUMA,",
            "    //   Likely want to set this to zero.",
            "    //   As colors that are mostly not-green",
            "    //   will appear very dark in the green channel!",
            "    //   Tune by looking at mostly non-green content,",
            "    //   then start at zero and increase until aliasing is a problem.",
            "    FxaaFloat fxaaConsoleEdgeThresholdMin,",
            "    //",
            "    // Extra constants for 360 FXAA Console only.",
            "    // Use zeros or anything else for other platforms.",
            "    // These must be in physical constant registers and NOT immediates.",
            "    // Immediates will result in compiler un-optimizing.",
            "    // {xyzw} = float4(1.0, -1.0, 0.25, -0.25)",
            "    FxaaFloat4 fxaaConsole360ConstDir",
            ") {",
            "/*--------------------------------------------------------------------------*/",
            "    FxaaFloat2 posM;",
            "    posM.x = pos.x;",
            "    posM.y = pos.y;",
            "    #if (FXAA_GATHER4_ALPHA == 1)",
            "        #if (FXAA_DISCARD == 0)",
            "            FxaaFloat4 rgbyM = FxaaTexTop(tex, posM);",
            "            #if (FXAA_GREEN_AS_LUMA == 0)",
            "                #define lumaM rgbyM.w",
            "            #else",
            "                #define lumaM rgbyM.y",
            "            #endif",
            "        #endif",
            "        #if (FXAA_GREEN_AS_LUMA == 0)",
            "            FxaaFloat4 luma4A = FxaaTexAlpha4(tex, posM);",
            "            FxaaFloat4 luma4B = FxaaTexOffAlpha4(tex, posM, FxaaInt2(-1, -1));",
            "        #else",
            "            FxaaFloat4 luma4A = FxaaTexGreen4(tex, posM);",
            "            FxaaFloat4 luma4B = FxaaTexOffGreen4(tex, posM, FxaaInt2(-1, -1));",
            "        #endif",
            "        #if (FXAA_DISCARD == 1)",
            "            #define lumaM luma4A.w",
            "        #endif",
            "        #define lumaE luma4A.z",
            "        #define lumaS luma4A.x",
            "        #define lumaSE luma4A.y",
            "        #define lumaNW luma4B.w",
            "        #define lumaN luma4B.z",
            "        #define lumaW luma4B.x",
            "    #else",
            "        FxaaFloat4 rgbyM = FxaaTexTop(tex, posM);",
            "        #if (FXAA_GREEN_AS_LUMA == 0)",
            "            #define lumaM rgbyM.w",
            "        #else",
            "            #define lumaM rgbyM.y",
            "        #endif",
            "        #if (FXAA_GLSL_100 == 1)",
            "          FxaaFloat lumaS = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 0.0, 1.0), fxaaQualityRcpFrame.xy));",
            "          FxaaFloat lumaE = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 1.0, 0.0), fxaaQualityRcpFrame.xy));",
            "          FxaaFloat lumaN = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 0.0,-1.0), fxaaQualityRcpFrame.xy));",
            "          FxaaFloat lumaW = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2(-1.0, 0.0), fxaaQualityRcpFrame.xy));",
            "        #else",
            "          FxaaFloat lumaS = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 0, 1), fxaaQualityRcpFrame.xy));",
            "          FxaaFloat lumaE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 1, 0), fxaaQualityRcpFrame.xy));",
            "          FxaaFloat lumaN = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 0,-1), fxaaQualityRcpFrame.xy));",
            "          FxaaFloat lumaW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1, 0), fxaaQualityRcpFrame.xy));",
            "        #endif",
            "    #endif",
            "/*--------------------------------------------------------------------------*/",
            "    FxaaFloat maxSM = max(lumaS, lumaM);",
            "    FxaaFloat minSM = min(lumaS, lumaM);",
            "    FxaaFloat maxESM = max(lumaE, maxSM);",
            "    FxaaFloat minESM = min(lumaE, minSM);",
            "    FxaaFloat maxWN = max(lumaN, lumaW);",
            "    FxaaFloat minWN = min(lumaN, lumaW);",
            "    FxaaFloat rangeMax = max(maxWN, maxESM);",
            "    FxaaFloat rangeMin = min(minWN, minESM);",
            "    FxaaFloat rangeMaxScaled = rangeMax * fxaaQualityEdgeThreshold;",
            "    FxaaFloat range = rangeMax - rangeMin;",
            "    FxaaFloat rangeMaxClamped = max(fxaaQualityEdgeThresholdMin, rangeMaxScaled);",
            "    FxaaBool earlyExit = range < rangeMaxClamped;",
            "/*--------------------------------------------------------------------------*/",
            "    if(earlyExit)",
            "        #if (FXAA_DISCARD == 1)",
            "            FxaaDiscard;",
            "        #else",
            "            return rgbyM;",
            "        #endif",
            "/*--------------------------------------------------------------------------*/",
            "    #if (FXAA_GATHER4_ALPHA == 0)",
            "        #if (FXAA_GLSL_100 == 1)",
            "          FxaaFloat lumaNW = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2(-1.0,-1.0), fxaaQualityRcpFrame.xy));",
            "          FxaaFloat lumaSE = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 1.0, 1.0), fxaaQualityRcpFrame.xy));",
            "          FxaaFloat lumaNE = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 1.0,-1.0), fxaaQualityRcpFrame.xy));",
            "          FxaaFloat lumaSW = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2(-1.0, 1.0), fxaaQualityRcpFrame.xy));",
            "        #else",
            "          FxaaFloat lumaNW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1,-1), fxaaQualityRcpFrame.xy));",
            "          FxaaFloat lumaSE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 1, 1), fxaaQualityRcpFrame.xy));",
            "          FxaaFloat lumaNE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 1,-1), fxaaQualityRcpFrame.xy));",
            "          FxaaFloat lumaSW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1, 1), fxaaQualityRcpFrame.xy));",
            "        #endif",
            "    #else",
            "        FxaaFloat lumaNE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(1, -1), fxaaQualityRcpFrame.xy));",
            "        FxaaFloat lumaSW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1, 1), fxaaQualityRcpFrame.xy));",
            "    #endif",
            "/*--------------------------------------------------------------------------*/",
            "    FxaaFloat lumaNS = lumaN + lumaS;",
            "    FxaaFloat lumaWE = lumaW + lumaE;",
            "    FxaaFloat subpixRcpRange = 1.0/range;",
            "    FxaaFloat subpixNSWE = lumaNS + lumaWE;",
            "    FxaaFloat edgeHorz1 = (-2.0 * lumaM) + lumaNS;",
            "    FxaaFloat edgeVert1 = (-2.0 * lumaM) + lumaWE;",
            "/*--------------------------------------------------------------------------*/",
            "    FxaaFloat lumaNESE = lumaNE + lumaSE;",
            "    FxaaFloat lumaNWNE = lumaNW + lumaNE;",
            "    FxaaFloat edgeHorz2 = (-2.0 * lumaE) + lumaNESE;",
            "    FxaaFloat edgeVert2 = (-2.0 * lumaN) + lumaNWNE;",
            "/*--------------------------------------------------------------------------*/",
            "    FxaaFloat lumaNWSW = lumaNW + lumaSW;",
            "    FxaaFloat lumaSWSE = lumaSW + lumaSE;",
            "    FxaaFloat edgeHorz4 = (abs(edgeHorz1) * 2.0) + abs(edgeHorz2);",
            "    FxaaFloat edgeVert4 = (abs(edgeVert1) * 2.0) + abs(edgeVert2);",
            "    FxaaFloat edgeHorz3 = (-2.0 * lumaW) + lumaNWSW;",
            "    FxaaFloat edgeVert3 = (-2.0 * lumaS) + lumaSWSE;",
            "    FxaaFloat edgeHorz = abs(edgeHorz3) + edgeHorz4;",
            "    FxaaFloat edgeVert = abs(edgeVert3) + edgeVert4;",
            "/*--------------------------------------------------------------------------*/",
            "    FxaaFloat subpixNWSWNESE = lumaNWSW + lumaNESE;",
            "    FxaaFloat lengthSign = fxaaQualityRcpFrame.x;",
            "    FxaaBool horzSpan = edgeHorz >= edgeVert;",
            "    FxaaFloat subpixA = subpixNSWE * 2.0 + subpixNWSWNESE;",
            "/*--------------------------------------------------------------------------*/",
            "    if(!horzSpan) lumaN = lumaW;",
            "    if(!horzSpan) lumaS = lumaE;",
            "    if(horzSpan) lengthSign = fxaaQualityRcpFrame.y;",
            "    FxaaFloat subpixB = (subpixA * (1.0/12.0)) - lumaM;",
            "/*--------------------------------------------------------------------------*/",
            "    FxaaFloat gradientN = lumaN - lumaM;",
            "    FxaaFloat gradientS = lumaS - lumaM;",
            "    FxaaFloat lumaNN = lumaN + lumaM;",
            "    FxaaFloat lumaSS = lumaS + lumaM;",
            "    FxaaBool pairN = abs(gradientN) >= abs(gradientS);",
            "    FxaaFloat gradient = max(abs(gradientN), abs(gradientS));",
            "    if(pairN) lengthSign = -lengthSign;",
            "    FxaaFloat subpixC = FxaaSat(abs(subpixB) * subpixRcpRange);",
            "/*--------------------------------------------------------------------------*/",
            "    FxaaFloat2 posB;",
            "    posB.x = posM.x;",
            "    posB.y = posM.y;",
            "    FxaaFloat2 offNP;",
            "    offNP.x = (!horzSpan) ? 0.0 : fxaaQualityRcpFrame.x;",
            "    offNP.y = ( horzSpan) ? 0.0 : fxaaQualityRcpFrame.y;",
            "    if(!horzSpan) posB.x += lengthSign * 0.5;",
            "    if( horzSpan) posB.y += lengthSign * 0.5;",
            "/*--------------------------------------------------------------------------*/",
            "    FxaaFloat2 posN;",
            "    posN.x = posB.x - offNP.x * FXAA_QUALITY_P0;",
            "    posN.y = posB.y - offNP.y * FXAA_QUALITY_P0;",
            "    FxaaFloat2 posP;",
            "    posP.x = posB.x + offNP.x * FXAA_QUALITY_P0;",
            "    posP.y = posB.y + offNP.y * FXAA_QUALITY_P0;",
            "    FxaaFloat subpixD = ((-2.0)*subpixC) + 3.0;",
            "    FxaaFloat lumaEndN = FxaaLuma(FxaaTexTop(tex, posN));",
            "    FxaaFloat subpixE = subpixC * subpixC;",
            "    FxaaFloat lumaEndP = FxaaLuma(FxaaTexTop(tex, posP));",
            "/*--------------------------------------------------------------------------*/",
            "    if(!pairN) lumaNN = lumaSS;",
            "    FxaaFloat gradientScaled = gradient * 1.0/4.0;",
            "    FxaaFloat lumaMM = lumaM - lumaNN * 0.5;",
            "    FxaaFloat subpixF = subpixD * subpixE;",
            "    FxaaBool lumaMLTZero = lumaMM < 0.0;",
            "/*--------------------------------------------------------------------------*/",
            "    lumaEndN -= lumaNN * 0.5;",
            "    lumaEndP -= lumaNN * 0.5;",
            "    FxaaBool doneN = abs(lumaEndN) >= gradientScaled;",
            "    FxaaBool doneP = abs(lumaEndP) >= gradientScaled;",
            "    if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P1;",
            "    if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P1;",
            "    FxaaBool doneNP = (!doneN) || (!doneP);",
            "    if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P1;",
            "    if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P1;",
            "/*--------------------------------------------------------------------------*/",
            "    if(doneNP) {",
            "        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
            "        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
            "        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
            "        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
            "        doneN = abs(lumaEndN) >= gradientScaled;",
            "        doneP = abs(lumaEndP) >= gradientScaled;",
            "        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P2;",
            "        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P2;",
            "        doneNP = (!doneN) || (!doneP);",
            "        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P2;",
            "        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P2;",
            "/*--------------------------------------------------------------------------*/",
            "        #if (FXAA_QUALITY_PS > 3)",
            "        if(doneNP) {",
            "            if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
            "            if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
            "            if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
            "            if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
            "            doneN = abs(lumaEndN) >= gradientScaled;",
            "            doneP = abs(lumaEndP) >= gradientScaled;",
            "            if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P3;",
            "            if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P3;",
            "            doneNP = (!doneN) || (!doneP);",
            "            if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P3;",
            "            if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P3;",
            "/*--------------------------------------------------------------------------*/",
            "            #if (FXAA_QUALITY_PS > 4)",
            "            if(doneNP) {",
            "                if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
            "                if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
            "                if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
            "                if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
            "                doneN = abs(lumaEndN) >= gradientScaled;",
            "                doneP = abs(lumaEndP) >= gradientScaled;",
            "                if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P4;",
            "                if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P4;",
            "                doneNP = (!doneN) || (!doneP);",
            "                if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P4;",
            "                if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P4;",
            "/*--------------------------------------------------------------------------*/",
            "                #if (FXAA_QUALITY_PS > 5)",
            "                if(doneNP) {",
            "                    if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
            "                    if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
            "                    if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
            "                    if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
            "                    doneN = abs(lumaEndN) >= gradientScaled;",
            "                    doneP = abs(lumaEndP) >= gradientScaled;",
            "                    if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P5;",
            "                    if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P5;",
            "                    doneNP = (!doneN) || (!doneP);",
            "                    if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P5;",
            "                    if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P5;",
            "/*--------------------------------------------------------------------------*/",
            "                    #if (FXAA_QUALITY_PS > 6)",
            "                    if(doneNP) {",
            "                        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
            "                        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
            "                        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
            "                        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
            "                        doneN = abs(lumaEndN) >= gradientScaled;",
            "                        doneP = abs(lumaEndP) >= gradientScaled;",
            "                        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P6;",
            "                        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P6;",
            "                        doneNP = (!doneN) || (!doneP);",
            "                        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P6;",
            "                        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P6;",
            "/*--------------------------------------------------------------------------*/",
            "                        #if (FXAA_QUALITY_PS > 7)",
            "                        if(doneNP) {",
            "                            if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
            "                            if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
            "                            if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
            "                            if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
            "                            doneN = abs(lumaEndN) >= gradientScaled;",
            "                            doneP = abs(lumaEndP) >= gradientScaled;",
            "                            if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P7;",
            "                            if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P7;",
            "                            doneNP = (!doneN) || (!doneP);",
            "                            if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P7;",
            "                            if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P7;",
            "/*--------------------------------------------------------------------------*/",
            "    #if (FXAA_QUALITY_PS > 8)",
            "    if(doneNP) {",
            "        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
            "        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
            "        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
            "        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
            "        doneN = abs(lumaEndN) >= gradientScaled;",
            "        doneP = abs(lumaEndP) >= gradientScaled;",
            "        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P8;",
            "        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P8;",
            "        doneNP = (!doneN) || (!doneP);",
            "        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P8;",
            "        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P8;",
            "/*--------------------------------------------------------------------------*/",
            "        #if (FXAA_QUALITY_PS > 9)",
            "        if(doneNP) {",
            "            if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
            "            if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
            "            if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
            "            if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
            "            doneN = abs(lumaEndN) >= gradientScaled;",
            "            doneP = abs(lumaEndP) >= gradientScaled;",
            "            if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P9;",
            "            if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P9;",
            "            doneNP = (!doneN) || (!doneP);",
            "            if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P9;",
            "            if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P9;",
            "/*--------------------------------------------------------------------------*/",
            "            #if (FXAA_QUALITY_PS > 10)",
            "            if(doneNP) {",
            "                if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
            "                if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
            "                if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
            "                if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
            "                doneN = abs(lumaEndN) >= gradientScaled;",
            "                doneP = abs(lumaEndP) >= gradientScaled;",
            "                if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P10;",
            "                if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P10;",
            "                doneNP = (!doneN) || (!doneP);",
            "                if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P10;",
            "                if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P10;",
            "/*--------------------------------------------------------------------------*/",
            "                #if (FXAA_QUALITY_PS > 11)",
            "                if(doneNP) {",
            "                    if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
            "                    if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
            "                    if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
            "                    if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
            "                    doneN = abs(lumaEndN) >= gradientScaled;",
            "                    doneP = abs(lumaEndP) >= gradientScaled;",
            "                    if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P11;",
            "                    if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P11;",
            "                    doneNP = (!doneN) || (!doneP);",
            "                    if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P11;",
            "                    if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P11;",
            "/*--------------------------------------------------------------------------*/",
            "                    #if (FXAA_QUALITY_PS > 12)",
            "                    if(doneNP) {",
            "                        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));",
            "                        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));",
            "                        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;",
            "                        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;",
            "                        doneN = abs(lumaEndN) >= gradientScaled;",
            "                        doneP = abs(lumaEndP) >= gradientScaled;",
            "                        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P12;",
            "                        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P12;",
            "                        doneNP = (!doneN) || (!doneP);",
            "                        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P12;",
            "                        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P12;",
            "/*--------------------------------------------------------------------------*/",
            "                    }",
            "                    #endif",
            "/*--------------------------------------------------------------------------*/",
            "                }",
            "                #endif",
            "/*--------------------------------------------------------------------------*/",
            "            }",
            "            #endif",
            "/*--------------------------------------------------------------------------*/",
            "        }",
            "        #endif",
            "/*--------------------------------------------------------------------------*/",
            "    }",
            "    #endif",
            "/*--------------------------------------------------------------------------*/",
            "                        }",
            "                        #endif",
            "/*--------------------------------------------------------------------------*/",
            "                    }",
            "                    #endif",
            "/*--------------------------------------------------------------------------*/",
            "                }",
            "                #endif",
            "/*--------------------------------------------------------------------------*/",
            "            }",
            "            #endif",
            "/*--------------------------------------------------------------------------*/",
            "        }",
            "        #endif",
            "/*--------------------------------------------------------------------------*/",
            "    }",
            "/*--------------------------------------------------------------------------*/",
            "    FxaaFloat dstN = posM.x - posN.x;",
            "    FxaaFloat dstP = posP.x - posM.x;",
            "    if(!horzSpan) dstN = posM.y - posN.y;",
            "    if(!horzSpan) dstP = posP.y - posM.y;",
            "/*--------------------------------------------------------------------------*/",
            "    FxaaBool goodSpanN = (lumaEndN < 0.0) != lumaMLTZero;",
            "    FxaaFloat spanLength = (dstP + dstN);",
            "    FxaaBool goodSpanP = (lumaEndP < 0.0) != lumaMLTZero;",
            "    FxaaFloat spanLengthRcp = 1.0/spanLength;",
            "/*--------------------------------------------------------------------------*/",
            "    FxaaBool directionN = dstN < dstP;",
            "    FxaaFloat dst = min(dstN, dstP);",
            "    FxaaBool goodSpan = directionN ? goodSpanN : goodSpanP;",
            "    FxaaFloat subpixG = subpixF * subpixF;",
            "    FxaaFloat pixelOffset = (dst * (-spanLengthRcp)) + 0.5;",
            "    FxaaFloat subpixH = subpixG * fxaaQualitySubpix;",
            "/*--------------------------------------------------------------------------*/",
            "    FxaaFloat pixelOffsetGood = goodSpan ? pixelOffset : 0.0;",
            "    FxaaFloat pixelOffsetSubpix = max(pixelOffsetGood, subpixH);",
            "    if(!horzSpan) posM.x += pixelOffsetSubpix * lengthSign;",
            "    if( horzSpan) posM.y += pixelOffsetSubpix * lengthSign;",
            "    #if (FXAA_DISCARD == 1)",
            "        return FxaaTexTop(tex, posM);",
            "    #else",
            "        return FxaaFloat4(FxaaTexTop(tex, posM).xyz, lumaM);",
            "    #endif",
            "}",
            "/*==========================================================================*/",
            "#endif",
            "",
            "void main() {",
            "  gl_FragColor = FxaaPixelShader(",
            "    vUv,",
            "    vec4(0.0),",
            "    tDiffuse,",
            "    tDiffuse,",
            "    tDiffuse,",
            "    resolution,",
            "    vec4(0.0),",
            "    vec4(0.0),",
            "    vec4(0.0),",
            "    0.75,",
            "    0.166,",
            "    0.0833,",
            "    0.0,",
            "    0.0,",
            "    0.0,",
            "    vec4(0.0)",
            "  );",
            "",
            "  // TODO avoid querying texture twice for same texel",
            "  gl_FragColor.a = texture2D(tDiffuse, vUv).a;",
            "}"
        ].join("\n")

    };

    /**
     * @author alteredq / http://alteredqualia.com/
     */

    THREE.MaskPass = function (scene, camera) {

        THREE.Pass.call(this);

        this.scene = scene;
        this.camera = camera;

        this.clear = true;
        this.needsSwap = false;

        this.inverse = false;

    };

    THREE.MaskPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

        constructor: THREE.MaskPass,

        render: function (renderer, writeBuffer, readBuffer, delta, maskActive) {

            var context = renderer.context;
            var state = renderer.state;

            // don't update color or depth

            state.buffers.color.setMask(false);
            state.buffers.depth.setMask(false);

            // lock buffers

            state.buffers.color.setLocked(true);
            state.buffers.depth.setLocked(true);

            // set up stencil

            var writeValue, clearValue;

            if (this.inverse) {

                writeValue = 0;
                clearValue = 1;

            } else {

                writeValue = 1;
                clearValue = 0;

            }

            state.buffers.stencil.setTest(true);
            state.buffers.stencil.setOp(context.REPLACE, context.REPLACE, context.REPLACE);
            state.buffers.stencil.setFunc(context.ALWAYS, writeValue, 0xffffffff);
            state.buffers.stencil.setClear(clearValue);

            // draw into the stencil buffer

            renderer.render(this.scene, this.camera, readBuffer, this.clear);
            renderer.render(this.scene, this.camera, writeBuffer, this.clear);

            // unlock color and depth buffer for subsequent rendering

            state.buffers.color.setLocked(false);
            state.buffers.depth.setLocked(false);

            // only render where stencil is set to 1

            state.buffers.stencil.setFunc(context.EQUAL, 1, 0xffffffff);  // draw if == 1
            state.buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP);

        }

    });


    THREE.ClearMaskPass = function () {

        THREE.Pass.call(this);

        this.needsSwap = false;

    };

    THREE.ClearMaskPass.prototype = Object.create(THREE.Pass.prototype);

    Object.assign(THREE.ClearMaskPass.prototype, {

        render: function (renderer, writeBuffer, readBuffer, delta, maskActive) {

            renderer.state.buffers.stencil.setTest(false);

        }

    });

    /**
     * @author qiao / https://github.com/qiao
     * @author mrdoob / http://mrdoob.com
     * @author alteredq / http://alteredqualia.com/
     * @author WestLangley / http://github.com/WestLangley
     * @author erich666 / http://erichaines.com
     */

    // This set of controls performs orbiting, dollying (zooming), and panning.
    // Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
    //
    //    Orbit - left mouse / touch: one finger move
    //    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
    //    Pan - right mouse, or arrow keys / touch: three finter swipe

    THREE.OrbitControls = function (object, domElement) {

        this.object = object;

        this.domElement = (domElement !== undefined) ? domElement : document;

        // Set to false to disable this control
        this.enabled = true;

        // "target" sets the location of focus, where the object orbits around
        this.target = new THREE.Vector3();

        // How far you can dolly in and out ( PerspectiveCamera only )
        this.minDistance = 0;
        this.maxDistance = Infinity;

        // How far you can zoom in and out ( OrthographicCamera only )
        this.minZoom = 0;
        this.maxZoom = Infinity;

        // How far you can orbit vertically, upper and lower limits.
        // Range is 0 to Math.PI radians.
        this.minPolarAngle = 0; // radians
        this.maxPolarAngle = Math.PI; // radians

        // How far you can orbit horizontally, upper and lower limits.
        // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
        this.minAzimuthAngle = - Infinity; // radians
        this.maxAzimuthAngle = Infinity; // radians

        // Set to true to enable damping (inertia)
        // If damping is enabled, you must call controls.update() in your animation loop
        this.enableDamping = false;
        this.dampingFactor = 0.25;

        // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
        // Set to false to disable zooming
        this.enableZoom = true;
        this.zoomSpeed = 1.0;

        // Set to false to disable rotating
        this.enableRotate = true;
        this.rotateSpeed = 1.0;

        // Set to false to disable panning
        this.enablePan = true;
        this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

        // Set to true to automatically rotate around the target
        // If auto-rotate is enabled, you must call controls.update() in your animation loop
        this.autoRotate = false;
        this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

        // Set to false to disable use of the keys
        this.enableKeys = true;

        // The four arrow keys
        this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

        // Mouse buttons
        this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

        // for reset
        this.target0 = this.target.clone();
        this.position0 = this.object.position.clone();
        this.zoom0 = this.object.zoom;

        //
        // public methods
        //

        this.getPolarAngle = function () {

            return spherical.phi;

        };

        this.getAzimuthalAngle = function () {

            return spherical.theta;

        };

        this.reset = function () {

            scope.target.copy(scope.target0);
            scope.object.position.copy(scope.position0);
            scope.object.zoom = scope.zoom0;

            scope.object.updateProjectionMatrix();
            scope.dispatchEvent(changeEvent);

            scope.update();

            state = STATE.NONE;

        };

        // this method is exposed, but perhaps it would be better if we can make it private...
        this.update = function () {

            var offset = new THREE.Vector3();

            // so camera.up is the orbit axis
            var quat = new THREE.Quaternion().setFromUnitVectors(object.up, new THREE.Vector3(0, 1, 0));
            var quatInverse = quat.clone().inverse();

            var lastPosition = new THREE.Vector3();
            var lastQuaternion = new THREE.Quaternion();

            return function update() {

                var position = scope.object.position;

                offset.copy(position).sub(scope.target);

                // rotate offset to "y-axis-is-up" space
                offset.applyQuaternion(quat);

                // angle from z-axis around y-axis
                spherical.setFromVector3(offset);

                if (scope.autoRotate && state === STATE.NONE) {

                    rotateLeft(getAutoRotationAngle());

                }

                spherical.theta += sphericalDelta.theta;
                spherical.phi += sphericalDelta.phi;

                // restrict theta to be between desired limits
                spherical.theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, spherical.theta));

                // restrict phi to be between desired limits
                spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));

                spherical.makeSafe();


                spherical.radius *= scale;

                // restrict radius to be between desired limits
                spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius));

                // move target to panned location
                scope.target.add(panOffset);

                offset.setFromSpherical(spherical);

                // rotate offset back to "camera-up-vector-is-up" space
                offset.applyQuaternion(quatInverse);

                position.copy(scope.target).add(offset);

                scope.object.lookAt(scope.target);

                if (scope.enableDamping === true) {

                    sphericalDelta.theta *= (1 - scope.dampingFactor);
                    sphericalDelta.phi *= (1 - scope.dampingFactor);

                } else {

                    sphericalDelta.set(0, 0, 0);

                }

                scale = 1;
                panOffset.set(0, 0, 0);

                // update condition is:
                // min(camera displacement, camera rotation in radians)^2 > EPS
                // using small-angle approximation cos(x/2) = 1 - x^2 / 8

                if (zoomChanged ||
                    lastPosition.distanceToSquared(scope.object.position) > EPS ||
                    8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {

                    scope.dispatchEvent(changeEvent);

                    lastPosition.copy(scope.object.position);
                    lastQuaternion.copy(scope.object.quaternion);
                    zoomChanged = false;

                    return true;

                }

                return false;

            };

        }();

        this.dispose = function () {

            scope.domElement.removeEventListener('contextmenu', onContextMenu, false);
            scope.domElement.removeEventListener('mousedown', onMouseDown, false);
            scope.domElement.removeEventListener('wheel', onMouseWheel, false);

            scope.domElement.removeEventListener('touchstart', onTouchStart, false);
            scope.domElement.removeEventListener('touchend', onTouchEnd, false);
            scope.domElement.removeEventListener('touchmove', onTouchMove, false);

            document.removeEventListener('mousemove', onMouseMove, false);
            document.removeEventListener('mouseup', onMouseUp, false);

            window.removeEventListener('keydown', onKeyDown, false);

            //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

        };

        //
        // internals
        //

        var scope = this;

        var changeEvent = { type: 'change' };
        var startEvent = { type: 'start' };
        var endEvent = { type: 'end' };

        var STATE = { NONE: - 1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

        var state = STATE.NONE;

        var EPS = 0.000001;

        // current position in spherical coordinates
        var spherical = new THREE.Spherical();
        var sphericalDelta = new THREE.Spherical();

        var scale = 1;
        var panOffset = new THREE.Vector3();
        var zoomChanged = false;

        var rotateStart = new THREE.Vector2();
        var rotateEnd = new THREE.Vector2();
        var rotateDelta = new THREE.Vector2();

        var panStart = new THREE.Vector2();
        var panEnd = new THREE.Vector2();
        var panDelta = new THREE.Vector2();

        var dollyStart = new THREE.Vector2();
        var dollyEnd = new THREE.Vector2();
        var dollyDelta = new THREE.Vector2();

        function getAutoRotationAngle() {

            return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

        }

        function getZoomScale() {

            return Math.pow(0.95, scope.zoomSpeed);

        }

        function rotateLeft(angle) {

            sphericalDelta.theta -= angle;

        }

        function rotateUp(angle) {

            sphericalDelta.phi -= angle;

        }

        var panLeft = function () {

            var v = new THREE.Vector3();

            return function panLeft(distance, objectMatrix) {

                v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
                v.multiplyScalar(- distance);

                panOffset.add(v);

            };

        }();

        var panUp = function () {

            var v = new THREE.Vector3();

            return function panUp(distance, objectMatrix) {

                v.setFromMatrixColumn(objectMatrix, 1); // get Y column of objectMatrix
                v.multiplyScalar(distance);

                panOffset.add(v);

            };

        }();

        // deltaX and deltaY are in pixels; right and down are positive
        var pan = function () {

            var offset = new THREE.Vector3();

            return function pan(deltaX, deltaY) {

                var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

                if (scope.object instanceof THREE.PerspectiveCamera) {

                    // perspective
                    var position = scope.object.position;
                    offset.copy(position).sub(scope.target);
                    var targetDistance = offset.length();

                    // half of the fov is center to top of screen
                    targetDistance *= Math.tan((scope.object.fov / 2) * Math.PI / 180.0);

                    // we actually don't use screenWidth, since perspective camera is fixed to screen height
                    panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
                    panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);

                } else if (scope.object instanceof THREE.OrthographicCamera) {

                    // orthographic
                    panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
                    panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);

                } else {

                    // camera neither orthographic nor perspective
                    console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
                    scope.enablePan = false;

                }

            };

        }();

        function dollyIn(dollyScale) {

            if (scope.object instanceof THREE.PerspectiveCamera) {

                scale /= dollyScale;

            } else if (scope.object instanceof THREE.OrthographicCamera) {

                scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom * dollyScale));
                scope.object.updateProjectionMatrix();
                zoomChanged = true;

            } else {

                console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
                scope.enableZoom = false;

            }

        }

        function dollyOut(dollyScale) {

            if (scope.object instanceof THREE.PerspectiveCamera) {

                scale *= dollyScale;

            } else if (scope.object instanceof THREE.OrthographicCamera) {

                scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / dollyScale));
                scope.object.updateProjectionMatrix();
                zoomChanged = true;

            } else {

                console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
                scope.enableZoom = false;

            }

        }

        //
        // event callbacks - update the object state
        //

        function handleMouseDownRotate(event) {

            //console.log( 'handleMouseDownRotate' );

            rotateStart.set(event.clientX, event.clientY);

        }

        function handleMouseDownDolly(event) {

            //console.log( 'handleMouseDownDolly' );

            dollyStart.set(event.clientX, event.clientY);

        }

        function handleMouseDownPan(event) {

            //console.log( 'handleMouseDownPan' );

            panStart.set(event.clientX, event.clientY);

        }

        function handleMouseMoveRotate(event) {

            //console.log( 'handleMouseMoveRotate' );

            rotateEnd.set(event.clientX, event.clientY);
            rotateDelta.subVectors(rotateEnd, rotateStart);

            var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

            // rotating across whole screen goes 360 degrees around
            rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);

            // rotating up and down along whole screen attempts to go 360, but limited to 180
            rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);

            rotateStart.copy(rotateEnd);

            scope.update();

        }

        function handleMouseMoveDolly(event) {

            //console.log( 'handleMouseMoveDolly' );

            dollyEnd.set(event.clientX, event.clientY);

            dollyDelta.subVectors(dollyEnd, dollyStart);

            if (dollyDelta.y > 0) {

                dollyIn(getZoomScale());

            } else if (dollyDelta.y < 0) {

                dollyOut(getZoomScale());
            }
            dollyStart.copy(dollyEnd);
            scope.update();
        }
        function handleMouseMovePan(event) {
            panEnd.set(event.clientX, event.clientY);
            panDelta.subVectors(panEnd, panStart);
            pan(panDelta.x, panDelta.y);
            panStart.copy(panEnd);
            scope.update();
        }

        function handleMouseUp(event) {

            //console.log( 'handleMouseUp' );

        }

        function handleMouseWheel(event) {

            //console.log( 'handleMouseWheel' );

            if (event.deltaY < 0) {

                dollyOut(getZoomScale());

            } else if (event.deltaY > 0) {

                dollyIn(getZoomScale());

            }

            scope.update();

        }

        function handleKeyDown(event) {

            //console.log( 'handleKeyDown' );

            switch (event.keyCode) {

                case scope.keys.UP:
                    pan(0, scope.keyPanSpeed);
                    scope.update();
                    break;

                case scope.keys.BOTTOM:
                    pan(0, - scope.keyPanSpeed);
                    scope.update();
                    break;

                case scope.keys.LEFT:
                    pan(scope.keyPanSpeed, 0);
                    scope.update();
                    break;

                case scope.keys.RIGHT:
                    pan(- scope.keyPanSpeed, 0);
                    scope.update();
                    break;

            }

        }

        function handleTouchStartRotate(event) {

            //console.log( 'handleTouchStartRotate' );

            rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);

        }

        function handleTouchStartDolly(event) {

            //console.log( 'handleTouchStartDolly' );

            var dx = event.touches[0].pageX - event.touches[1].pageX;
            var dy = event.touches[0].pageY - event.touches[1].pageY;

            var distance = Math.sqrt(dx * dx + dy * dy);

            dollyStart.set(0, distance);

        }

        function handleTouchStartPan(event) {

            //console.log( 'handleTouchStartPan' );

            panStart.set(event.touches[0].pageX, event.touches[0].pageY);

        }

        function handleTouchMoveRotate(event) {

            //console.log( 'handleTouchMoveRotate' );

            rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
            rotateDelta.subVectors(rotateEnd, rotateStart);

            var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

            // rotating across whole screen goes 360 degrees around
            rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);

            // rotating up and down along whole screen attempts to go 360, but limited to 180
            rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);

            rotateStart.copy(rotateEnd);

            scope.update();

        }

        function handleTouchMoveDolly(event) {

            //console.log( 'handleTouchMoveDolly' );

            var dx = event.touches[0].pageX - event.touches[1].pageX;
            var dy = event.touches[0].pageY - event.touches[1].pageY;

            var distance = Math.sqrt(dx * dx + dy * dy);

            dollyEnd.set(0, distance);

            dollyDelta.subVectors(dollyEnd, dollyStart);

            if (dollyDelta.y > 0) {

                dollyOut(getZoomScale());

            } else if (dollyDelta.y < 0) {

                dollyIn(getZoomScale());

            }

            dollyStart.copy(dollyEnd);

            scope.update();

        }

        function handleTouchMovePan(event) {

            //console.log( 'handleTouchMovePan' );

            panEnd.set(event.touches[0].pageX, event.touches[0].pageY);

            panDelta.subVectors(panEnd, panStart);

            pan(panDelta.x, panDelta.y);

            panStart.copy(panEnd);

            scope.update();

        }

        function handleTouchEnd(event) {

            //console.log( 'handleTouchEnd' );

        }

        //
        // event handlers - FSM: listen for events and reset state
        //

        function onMouseDown(event) {

            if (scope.enabled === false) return;

            event.preventDefault();

            if (event.button === scope.mouseButtons.ORBIT) {

                if (scope.enableRotate === false) return;

                handleMouseDownRotate(event);

                state = STATE.ROTATE;

            } else if (event.button === scope.mouseButtons.ZOOM) {

                if (scope.enableZoom === false) return;

                handleMouseDownDolly(event);

                state = STATE.DOLLY;

            } else if (event.button === scope.mouseButtons.PAN) {

                if (scope.enablePan === false) return;

                handleMouseDownPan(event);

                state = STATE.PAN;

            }

            if (state !== STATE.NONE) {

                document.addEventListener('mousemove', onMouseMove, false);
                document.addEventListener('mouseup', onMouseUp, false);

                scope.dispatchEvent(startEvent);

            }

        }

        function onMouseMove(event) {

            if (scope.enabled === false) return;

            event.preventDefault();

            if (state === STATE.ROTATE) {

                if (scope.enableRotate === false) return;

                handleMouseMoveRotate(event);

            } else if (state === STATE.DOLLY) {

                if (scope.enableZoom === false) return;

                handleMouseMoveDolly(event);

            } else if (state === STATE.PAN) {

                if (scope.enablePan === false) return;

                handleMouseMovePan(event);

            }

        }

        function onMouseUp(event) {

            if (scope.enabled === false) return;

            handleMouseUp(event);

            document.removeEventListener('mousemove', onMouseMove, false);
            document.removeEventListener('mouseup', onMouseUp, false);

            scope.dispatchEvent(endEvent);

            state = STATE.NONE;

        }

        function onMouseWheel(event) {

            if (scope.enabled === false || scope.enableZoom === false || (state !== STATE.NONE && state !== STATE.ROTATE)) return;

            event.preventDefault();
            event.stopPropagation();

            handleMouseWheel(event);

            scope.dispatchEvent(startEvent); // not sure why these are here...
            scope.dispatchEvent(endEvent);

        }

        function onKeyDown(event) {

            if (scope.enabled === false || scope.enableKeys === false || scope.enablePan === false) return;

            handleKeyDown(event);

        }

        function onTouchStart(event) {

            if (scope.enabled === false) return;

            switch (event.touches.length) {

                case 1:	// one-fingered touch: rotate

                    if (scope.enableRotate === false) return;

                    handleTouchStartRotate(event);

                    state = STATE.TOUCH_ROTATE;

                    break;

                case 2:	// two-fingered touch: dolly

                    if (scope.enableZoom === false) return;

                    handleTouchStartDolly(event);

                    state = STATE.TOUCH_DOLLY;

                    break;

                case 3: // three-fingered touch: pan

                    if (scope.enablePan === false) return;

                    handleTouchStartPan(event);

                    state = STATE.TOUCH_PAN;

                    break;

                default:

                    state = STATE.NONE;

            }

            if (state !== STATE.NONE) {

                scope.dispatchEvent(startEvent);

            }

        }

        function onTouchMove(event) {

            if (scope.enabled === false) return;

            event.preventDefault();
            event.stopPropagation();

            switch (event.touches.length) {

                case 1: // one-fingered touch: rotate

                    if (scope.enableRotate === false) return;
                    if (state !== STATE.TOUCH_ROTATE) return; // is this needed?...

                    handleTouchMoveRotate(event);

                    break;

                case 2: // two-fingered touch: dolly

                    if (scope.enableZoom === false) return;
                    if (state !== STATE.TOUCH_DOLLY) return; // is this needed?...

                    handleTouchMoveDolly(event);

                    break;

                case 3: // three-fingered touch: pan

                    if (scope.enablePan === false) return;
                    if (state !== STATE.TOUCH_PAN) return; // is this needed?...

                    handleTouchMovePan(event);

                    break;

                default:

                    state = STATE.NONE;

            }

        }

        function onTouchEnd(event) {

            if (scope.enabled === false) return;

            handleTouchEnd(event);

            scope.dispatchEvent(endEvent);

            state = STATE.NONE;

        }

        function onContextMenu(event) {

            event.preventDefault();

        }

        //

        scope.domElement.addEventListener('contextmenu', onContextMenu, false);

        scope.domElement.addEventListener('mousedown', onMouseDown, false);
        scope.domElement.addEventListener('wheel', onMouseWheel, false);

        scope.domElement.addEventListener('touchstart', onTouchStart, false);
        scope.domElement.addEventListener('touchend', onTouchEnd, false);
        scope.domElement.addEventListener('touchmove', onTouchMove, false);

        window.addEventListener('keydown', onKeyDown, false);

        // force an update at start

        this.update();

    };

    THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);
    THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;

    Object.defineProperties(THREE.OrbitControls.prototype, {

        center: {

            get: function () {

                console.warn('THREE.OrbitControls: .center has been renamed to .target');
                return this.target;

            }

        },

        // backward compatibility

        noZoom: {

            get: function () {

                console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
                return !this.enableZoom;

            },

            set: function (value) {

                console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
                this.enableZoom = !value;

            }

        },

        noRotate: {

            get: function () {

                console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
                return !this.enableRotate;

            },

            set: function (value) {

                console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
                this.enableRotate = !value;

            }

        },

        noPan: {

            get: function () {

                console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
                return !this.enablePan;

            },

            set: function (value) {

                console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
                this.enablePan = !value;

            }

        },

        noKeys: {

            get: function () {

                console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
                return !this.enableKeys;

            },

            set: function (value) {

                console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
                this.enableKeys = !value;

            }

        },

        staticMoving: {

            get: function () {

                console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
                return !this.enableDamping;

            },

            set: function (value) {

                console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
                this.enableDamping = !value;

            }

        },

        dynamicDampingFactor: {

            get: function () {

                console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
                return this.dampingFactor;

            },

            set: function (value) {

                console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
                this.dampingFactor = value;

            }

        }

    });


    /**
     * @author alteredq / http://alteredqualia.com/
     */

    THREE.RenderPass = function (scene, camera, overrideMaterial, clearColor, clearAlpha) {

        THREE.Pass.call(this);

        this.scene = scene;
        this.camera = camera;

        this.overrideMaterial = overrideMaterial;

        this.clearColor = clearColor;
        this.clearAlpha = (clearAlpha !== undefined) ? clearAlpha : 0;

        this.clear = true;
        this.clearDepth = false;
        this.needsSwap = false;

    };

    THREE.RenderPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

        constructor: THREE.RenderPass,

        render: function (renderer, writeBuffer, readBuffer, delta, maskActive) {

            var oldAutoClear = renderer.autoClear;
            renderer.autoClear = false;

            this.scene.overrideMaterial = this.overrideMaterial;

            var oldClearColor, oldClearAlpha;

            if (this.clearColor) {

                oldClearColor = renderer.getClearColor().getHex();
                oldClearAlpha = renderer.getClearAlpha();

                renderer.setClearColor(this.clearColor, this.clearAlpha);

            }

            if (this.clearDepth) {

                renderer.clearDepth();

            }

            renderer.render(this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear);

            if (this.clearColor) {

                renderer.setClearColor(oldClearColor, oldClearAlpha);

            }

            this.scene.overrideMaterial = null;
            renderer.autoClear = oldAutoClear;
        }

    });

    /**
     * @author alteredq / http://alteredqualia.com/
     */

    THREE.ShaderPass = function (shader, textureID) {

        THREE.Pass.call(this);

        this.textureID = (textureID !== undefined) ? textureID : "tDiffuse";

        if (shader instanceof THREE.ShaderMaterial) {

            this.uniforms = shader.uniforms;

            this.material = shader;

        } else if (shader) {

            this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);

            this.material = new THREE.ShaderMaterial({

                defines: Object.assign({}, shader.defines),
                uniforms: this.uniforms,
                vertexShader: shader.vertexShader,
                fragmentShader: shader.fragmentShader

            });

        }

        this.camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);
        this.scene = new THREE.Scene();

        this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
        this.quad.frustumCulled = false; // Avoid getting clipped
        this.scene.add(this.quad);

    };

    THREE.ShaderPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

        constructor: THREE.ShaderPass,

        render: function (renderer, writeBuffer, readBuffer, delta, maskActive) {

            if (this.uniforms[this.textureID]) {

                this.uniforms[this.textureID].value = readBuffer.texture;

            }

            this.quad.material = this.material;

            if (this.renderToScreen) {

                renderer.render(this.scene, this.camera);

            } else {

                renderer.render(this.scene, this.camera, writeBuffer, this.clear);

            }

        }

    });

    if (WEBGL.isWebGLAvailable() === false) {
        document.body.appendChild(WEBGL.getWebGLErrorMessage());
    }
    let scene, camera, renderer, focPoint, vector, distance, dir, pos, myAnimation, effectFXAA, composer, can, can2, raycaster, timerId, renderScene, GroupArray, GroupArray2, geometry, material, plane, plane2, geometry2, material2, mouse, light, blackgeom, blackmat, blackplane, blackplane2, controls;

    let blackplane5, blackplane4, blackplane3, curve, curveFloat, can3, scrollingA;

    let mobile_detector = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        mobile_detector = true;
    }

    function onMouseMove(event) {
        if (!mobile_detector) {
            // calculate mouse position in normalized device coordinates
            // (-1 to +1) for both components

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

            vector = new THREE.Vector3(mouse.x, mouse.y, light.position.z);
            vector.unproject(camera);
            dir = vector.sub(camera.position);
            dir.normalize();
            distance = -camera.position.z / dir.z;
            pos = camera.position.clone().add(dir.multiplyScalar(distance));
            if (pos.x < 150 && pos.x > -300) {
                TweenMax.to(light.position, 1, { ease: Power2.easeOut, x: pos.x, y: pos.y });
            }
            if (!can3 && !scrollingA) {
                TweenMax.to(camera.position, 1, { ease: Power2.easeOut, x: curve.getPointAt(curveFloat + mouse.x * 0.05).x, z: curve.getPointAt(curveFloat + mouse.x * 0.05).z, y: curve.getPointAt(curveFloat + mouse.x * 0.05).y, onUpdate: () => { camera.lookAt(focPoint); } });

            }


        }


    }


    function tozero() {
        camera.position.set(-1, 70, -1);
    }


    let stage = {
        zero: function () {

            camera.lookAt(focPoint);

            for (let i = 0; i < GroupArray.length; i++) {

                GroupArray[i].lookAt(camera.position);
                GroupArray[i].rotation.z = Math.PI;
                GroupArray[i].rotation.x = Math.PI;
                GroupArray[i].rotation.y -= Math.PI / 2;
                GroupArray[i].mustrotate = GroupArray[i].rotation.y;
                GroupArray[i].visible = false;
                GroupArray[i].moving = false;
                GroupArray[i].name = "plane";

            }
            for (let i = 0; i < GroupArray2.length; i++) {

                GroupArray2[i].lookAt(camera.position);
                GroupArray2[i].rotation.z = Math.PI;
                GroupArray2[i].rotation.x = Math.PI;
                GroupArray2[i].rotation.y -= Math.PI / 2;
                GroupArray2[i].mustrotate = GroupArray2[i].rotation.y;
                GroupArray2[i].moving = false;
                GroupArray2[i].name = "plane";

            }

            material2.opacity = 0;
            material.opacity = 0;


        },
        first: function () {
            for (let i = 0; i < GroupArray.length; i++) {
                GroupArray[i].moving = true
            }
            for (let i = 0; i < GroupArray2.length; i++) {
                GroupArray2[i].moving = true
            }



            TweenMax.to(material2, 1.5, { ease: Circ.easeOut, opacity: 1 });
            TweenLite.to(document.getElementById("btn"), 1, { "opacity": 1, onComplete: () => { can2 = true; } });

        },
        second: function () {

            TweenLite.to(document.getElementById("btn"), 1, { "opacity": 0, onComplete: () => { document.getElementById("btn").style.display = "none"; } });
            TweenMax.to(material2, 1.5, {
                ease: Circ.easeOut, opacity: 1,
                onComplete: () => {
                    for (let i = 0; i < GroupArray2.length; i++) {
                        GroupArray2[i].visible = false;
                        scene.remove(GroupArray2[i]);
                        ///myAnimation.pause();

                    }
                    camera.position.set(0, 300, 0);
                    focPoint.y = 400;
                    TweenMax.to(camera.position, 6, { ease: Power3.easeOut, y: -70, x: -320.414, z: -143 })

                    TweenMax.to(focPoint, 6, { ease: Power3.easeOut, y: 70, onComplete: () => { can3 = false; }, onUpdate: () => { camera.lookAt(focPoint); } });



                    //tozero();
                    // camera.position.x = -320.414;
                    // camera.position.z = -143;
                    // TweenLite.to(camera.position,5,{ease: Power3.easeInOut,x:-320.414,y:-70.694,z:-143, onComplete:()=>{
                    // //	can=true;
                    // 	console.log(camera.rotation);
                    // 	// setTimeout(function(){TweenMax.to(focPoint,3.5,{ ease: Power2.easeIn,x:-500,z:0,y:-30,onComplete:()=>{alert("done");}
                    // 		can=true;
                    // 		setTimeout(function(){TweenMax.to(camera.position,2,{ ease: Expo.easeIn,x:-500,z:500,onComplete:()=>{}

                    // 	})},2000);
                    // } });//x-127z-103
                    can2 = false;
                    TweenMax.to(blackplane.position, 3, { ease: Power2.easeOut, x: blackplane.position.x - 20, z: blackplane.position.z - 20 });
                    TweenMax.to(blackplane2.position, 3, { ease: Power2.easeOut, x: blackplane2.position.x - 20, z: blackplane2.position.z - 20 });
                    TweenMax.to(blackplane3.position, 3, { ease: Power2.easeOut, x: blackplane3.position.x - 20, z: blackplane3.position.z - 20 });
                    TweenMax.to(blackplane4.position, 3, { ease: Power2.easeOut, x: blackplane4.position.x - 20, z: blackplane4.position.z - 20 });
                    TweenMax.to(material, 0.2, { ease: Circ.easeOut, opacity: 1 });


                    for (let i = 0; i < GroupArray.length; i++) {
                        GroupArray[i].visible = true;
                        TweenMax.to(GroupArray[i].position, 3, { ease: Power2.easeOut, x: GroupArray[i].position.x - 20, z: GroupArray[i].position.z - 20 });
                    }
                    //
                }
            });

        }
    };

    function createPattern(start_x, start_y, scale_x, scale_y) {
        for (let i = start_x; i < scale_x; i += 7) {
            for (let j = start_y; j < scale_y; j += 14) {
                let tmp = plane2.clone();
                tmp.position.set(i + randomFromTo(-1, 2), j, 0);
                tmp.amplitude = 0.01 + Math.random() * (0.01 - 0.005);
                scene.add(tmp);
                GroupArray2.push(tmp);
            }
        }
    }


    function randomFromTo(from, to) {
        return Math.floor(from + Math.random() * (to + 1 - from));
    }

    function Init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 1000);

        renderer = new THREE.WebGLRenderer({ antialias: true });

        focPoint = new THREE.Vector3(0, 70, 0);
        renderScene;

        GroupArray = [];
        GroupArray2 = [];
        //controls = new THREE.OrbitControls( camera )
        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        camera.position.set(0, 70, -150);
        renderer.setSize(window.innerWidth, window.innerHeight);//установка размеров канваса
        renderer.setPixelRatio(window.devicePixelRatio);
        can = false;
        can2 = false;
        can3 = true;
        scrollingA = false;

        camera.lookAt(focPoint);
        curveFloat = 0;
        document.body.appendChild(renderer.domElement);//помещение отрендеренного канваса в DOM
        //document.addEventListener( 'mousewheel', mouseHandle, false);
        geometry = new THREE.PlaneGeometry(1.5, 14, 1);
        material = new THREE.MeshStandardMaterial({ color: 0xFCD08E, side: THREE.DoubleSide, wireframe: false, metalness: 1, emissive: 0x231F20, transparent: true });//ad8b19
        plane = new THREE.Mesh(geometry, material);

        geometry2 = new THREE.PlaneGeometry(1.5, 14, 1);
        material2 = new THREE.MeshStandardMaterial({ color: 0xFCD08E, side: THREE.DoubleSide, wireframe: false, metalness: 1, emissive: 0x231F20, transparent: true });//:0x180c0c
        plane2 = new THREE.Mesh(geometry2, material2);
        scene.background = new THREE.Color(0x1D1A1B/*231F20*/);
        light = new THREE.PointLight({ color: new THREE.Color(0xE8D7AA) });
        scene.add(light);
        // let pointLightHelper = new THREE.PointLightHelper( light );
        // scene.add( pointLightHelper );

        light.position.set(-87, 180, -20);//-40

        curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(-320.414, -70, -143),
            new THREE.Vector3(-461, -70, -21),
            new THREE.Vector3(-241.5, -31, 237)
        )
        var points = curve.getPoints(50);
        var linegeometry = new THREE.BufferGeometry().setFromPoints(points);

        var linematerial = new THREE.LineBasicMaterial({ color: 0xff0000 });

        // Create the final object to add to the scene
        var curveObject = new THREE.Line(linegeometry, linematerial);
        //scene.add(curveObject);
        blackgeom = new THREE.PlaneGeometry(70, 500, 1);
        blackmat = new THREE.MeshBasicMaterial({ color: 0x1D1A1B, side: THREE.DoubleSide });//1D1A1B  231F20
        blackplane = new THREE.Mesh(blackgeom, blackmat);
        blackplane.position.set(35, 45, 6);//38
        blackplane2 = blackplane.clone();
        blackplane2.rotation.y -= Math.PI / 2;
        blackplane2.position.set(56, 45, 30)//;
        blackplane3 = new THREE.Mesh(blackgeom, blackmat);
        blackplane3.position.set(30, 45, 65);
        blackplane4 = new THREE.Mesh(blackgeom, blackmat);
        blackplane4.rotation.y -= Math.PI / 2;
        blackplane4.scale.x = 0.8;
        blackplane4.position.set(3, 45, 34)
        blackplane3.scale.x = 0.8;
        scene.add(blackplane2);
        scene.add(blackplane);
        scene.add(blackplane3);
        scene.add(blackplane4);



        blackplane5 = blackplane.clone();
        blackplane5.scale.x = 0.9;
        blackplane5.position.set(195, 45, -16);
        scene.add(blackplane5);
        createPattern(-150, -150, 300, 300);
        if (window.innerWidth > 900) {
            window.addEventListener('mousemove', onMouseMove, false);
            document.addEventListener("mousewheel", mouseHandle2, false);
            document.addEventListener("DOMMouseScroll", mouseHandle2, false);
        }

        //front
        for (let i = 0; i < 70; i += 7) {
            for (let j = -100; j < 200; j += 14) {
                let tmp = plane.clone();
                tmp.position.set(i + randomFromTo(-1, 2), j, 0);
                tmp.amplitude = 0.01 + Math.random() * (0.01 - 0.005);
                scene.add(tmp);
                GroupArray.push(tmp);

            }
        }
        for (let i = 6; i < 70; i += 7) {
            for (let j = -100; j < 200; j += 14) {
                let tmp = plane.clone();
                tmp.position.set(0, j, i + randomFromTo(-1, 2));
                tmp.amplitude = 0.01 + Math.random() * (0.01 - 0.005);
                scene.add(tmp);
                GroupArray.push(tmp);

            }
        }
        //back
        for (let i = 0; i < 70; i += 7) {
            for (let j = -100; j < 200; j += 14) {
                let tmp = plane.clone();
                tmp.position.set(i + randomFromTo(-1, 2), j, 70);
                tmp.amplitude = 0.01 + Math.random() * (0.01 - 0.005);
                scene.add(tmp);
                GroupArray.push(tmp);

            }
        }
        //---------------------------second_building
        for (let i = 180; i < 250; i += 7) {
            for (let j = -100; j < 200; j += 14) {
                let tmp = plane.clone();
                tmp.position.set(i + randomFromTo(-1, 2), j, 0);
                tmp.amplitude = 0.01 + Math.random() * (0.01 - 0.005);
                scene.add(tmp);
                GroupArray.push(tmp);

            }
        }
        for (let i = 6; i < 70; i += 7) {
            for (let j = -100; j < 200; j += 14) {
                let tmp = plane.clone();
                tmp.position.set(180, j, i + randomFromTo(-1, 2));
                tmp.amplitude = 0.01 + Math.random() * (0.01 - 0.005);
                scene.add(tmp);
                GroupArray.push(tmp);

            }
        }
        //back
        for (let i = 180; i < 250; i += 7) {
            for (let j = -100; j < 200; j += 14) {
                let tmp = plane.clone();
                tmp.position.set(i + randomFromTo(-1, 2), j, 70);
                tmp.amplitude = 0.01 + Math.random() * (0.01 - 0.005);
                scene.add(tmp);
                GroupArray.push(tmp);

            }
        }
        stage.zero();
        let f = setTimeout(function () { stage.first(); }, 10);
        window.addEventListener('resize', onWindowResize, false);
        animate();
    }

    Init();

    function animate() {
        window.mainCanvasRAF = requestAnimationFrame(animate);
        renderer.render(scene, camera);
        for (let i = 0; i < GroupArray.length; i++) {

            if (GroupArray[i].moving) {
                GroupArray[i].rotation.y += GroupArray[i].amplitude;
                if (GroupArray[i].rotation.y > Math.PI) {
                    GroupArray[i].rotation.y = 0;
                }
            }
        }

        for (let i = 0; i < GroupArray2.length; i++) {
            if (GroupArray2[i].moving) {
                GroupArray2[i].rotation.y += GroupArray2[i].amplitude;
                if (GroupArray2[i].rotation.y > Math.PI) {
                    GroupArray2[i].rotation.y = 0;
                }

            }

        }

        // if(!can){
        // 	camera.lookAt(focPoint);
        // }


        raycaster.setFromCamera(mouse, camera);
        let intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            let obj = intersects[0].object
            if (obj.name == "plane") {
                obj.moving = false;
                TweenMax.to(obj.rotation, 2, { ease: Power2.easeOut, y: obj.rotation.y + Math.PI, onComplete: () => { obj.moving = true; } });
            }
        }
    }

    const lines = document.querySelectorAll('.border span')
    setTimeout(() => {
        document.querySelector('.header').classList.remove('active')
        for (let i = 0; i < lines.length; i++) {
            lines[i].classList.remove('active')
        }
    }, 250)

    function tab() {
        enableScroll = true;
        if (can2) {
            for (let i = 0; i < GroupArray2.length; i++) {
                GroupArray2[i].moving = false;
                GroupArray2[i].start_rot = GroupArray2[i].rotation.y
                GroupArray2[i].lookAt(camera.position);
                GroupArray2[i].rotation.z = Math.PI;
                GroupArray2[i].rotation.x = Math.PI;
                GroupArray2[i].rotation.y -= Math.PI / 2;
                GroupArray2[i].mustrotate = GroupArray2[i].rotation.y;
                GroupArray2[i].rotation.y = GroupArray2[i].start_rot;
                GroupArray2[i].rotanim = TweenMax.to(GroupArray2[i].rotation, 3, { ease: Power3.easeOut, y: GroupArray2[i].mustrotate, onComplete: () => { GroupArray2[i].moving = true; } });
            }
            stage.second();
        }

        setTimeout(() => {
            document.querySelector('.canvas').style.zIndex = 1

        }, 1500)
        setTimeout(() => {
            document.querySelector('.header').classList.add('active');
            document.querySelector('.progressbar').classList.add('active');
            document.querySelector('.f-title').classList.add('show')
            for (let i = 0; i < lines.length; i++) {
                lines[i].classList.add('active')
            }
        }, 3000)
        if (window.innerWidth <= 900) {
            setTimeout(() => {
                document.querySelector('.canvas').classList.add('canvas--mobile')
            }, 2000)
        }
    }
    setTimeout(() => {
        document.querySelector('#btn').classList.add('active')
        document.querySelector('#btn').addEventListener('click', () => tab())
    }, 2000)

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }
    function mouseHandle(event) {

        if (event.deltaY == 100) {

            indexControl('next');
        } else {
            indexControl('back');
        }


    }
    let focPos = {
        '0.6': new THREE.Vector3(0, 70, 0),
        '0.7': new THREE.Vector3(0, 65, 40),
        '0.8': new THREE.Vector3(0, 60, 90),
        '0.9': new THREE.Vector3(0, 50, 140),
        '1.0': new THREE.Vector3(0, 40, 180),
    }
    function indexControl(direction) {

        if (direction === 'next' && curveFloat < 1) {
            curveFloat += 0.2;

        }
        if (direction === 'back' && curveFloat > 0) {
            curveFloat -= 0.2;

        }
        scrollingA = true;
        //camera.position.set(curve.getPointAt(curveFloat).x,curve.getPointAt(curveFloat).y,curve.getPointAt(curveFloat).z);
        //qwe
        if (enableScroll == true) {
            TweenMax.to(camera.position, 2, { x: curve.getPointAt(curveFloat).x, y: curve.getPointAt(curveFloat).y, z: curve.getPointAt(curveFloat).z, ease: Power4.easeOut, onComplete: () => { scrollingA = false; }, onUpdate: () => { camera.lookAt(focPoint); } })
        }
    }
    function rot() {
        for (let i = 0; i < GroupArray.length; i++) {
            GroupArray[i].moving = false;
            GroupArray[i].start_rot = GroupArray[i].rotation.y
            GroupArray[i].lookAt(camera.position);
            GroupArray[i].rotation.z = Math.PI;
            GroupArray[i].rotation.x = Math.PI;
            GroupArray[i].rotation.y -= Math.PI / 2;
            GroupArray[i].mustrotate = GroupArray[i].rotation.y;
            GroupArray[i].rotation.y = GroupArray[i].start_rot;
            GroupArray[i].rotanim = TweenMax.to(GroupArray[i].rotation, 3, { ease: Power3.easeOut, y: GroupArray[i].mustrotate, onComplete: () => { } });
        }


    }
    let scrolling = false;
    let oldTime = 0;
    let newTime = 0;
    let isTouchPad;
    let eventCount = 0;
    let eventCountStart;

    function mouseHandle2(evt) {

        let isTouchPadDefined = isTouchPad || typeof isTouchPad !== "undefined";
        // console.log(isTouchPadDefined);
        if (!isTouchPadDefined) {
            if (eventCount === 0) {
                eventCountStart = new Date().getTime();
            }

            eventCount++;

            if (new Date().getTime() - eventCountStart > 100) {
                if (eventCount > 10) {
                    isTouchPad = true;
                } else {
                    isTouchPad = false;
                }
                isTouchPadDefined = true;
            }
        }

        if (isTouchPadDefined) {

            // here you can do what you want
            // i just wanted the direction, for swiping, so i have to prevent
            // the multiple event calls to trigger multiple unwanted actions (trackpad)
            if (!evt) evt = event;
            let direction = (evt.detail < 0 || evt.wheelDelta > 0) ? 1 : -1;

            if (isTouchPad) {
                newTime = new Date().getTime();

                if (!scrolling && newTime - oldTime > 550) {
                    scrolling = true;
                    if (direction < 0) {
                        // swipe down
                        indexControl('next');
                    } else {
                        // swipe up
                        indexControl('back');
                    }
                    setTimeout(function () { oldTime = new Date().getTime(); scrolling = false }, 500);
                }
            } else {
                if (direction < 0) {
                    indexControl('next');

                    // swipe down
                } else {
                    // swipe up
                    indexControl('back');
                }
            }
        }

    }

    let scrollPos = 0;
    //qwe
    if (enableScroll == true && window.innerWidth > 900) {
        document.addEventListener('scroll', function () {
            if ((document.body.getBoundingClientRect()).top > scrollPos) {
                indexControl('next');
            }
            else {
                indexControl('back');
            }
            scrollPos = (document.body.getBoundingClientRect()).top;
        });
        document.addEventListener('touchstart', function (event) {
            event.preventDefault();
            event.stopPropagation();
            initialPoint = event.changedTouches[0];
        }, false);
        document.addEventListener('touchend', function (event) {
            event.preventDefault();
            event.stopPropagation();
            finalPoint = event.changedTouches[0];
            let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
            let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
            if (xAbs > 20 || yAbs > 20) {
                if (xAbs > yAbs) {
                    if (finalPoint.pageX < initialPoint.pageX) {
                        /*СВАЙП ВЛЕВО*/
                        indexControl('next');
                    }
                    else {
                        /*СВАЙП ВПРАВО*/
                        indexControl('back');
                    }
                }
                else {
                    if (finalPoint.pageY < initialPoint.pageY) {
                        /*СВАЙП ВВЕРХ*/
                    }
                    else {
                        /*СВАЙП ВНИЗ*/
                    }
                }
            }
        }, false);
    }
}