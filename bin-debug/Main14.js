var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// TypeScript file
var Main14 = (function (_super) {
    __extends(Main14, _super);
    function Main14() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main14.prototype.onAddToStage = function () {
        this.runGame().catch(function (e) { });
    };
    Main14.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadRescource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main14.prototype.loadRescource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload")];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Main14.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Main14.prototype.createGameScene = function () {
        var _this = this;
        this._rectScope = new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        //产生确定数量的容器并归档
        this._vcCont = new Array();
        for (var i = 0; i < Main14.NUM; ++i) {
            var cont = new MotionSprite();
            cont.anchorOffsetX = L.W_SHAPE / 2;
            cont.anchorOffsetY = L.H_SHAPE / 2;
            cont.x = this._rectScope.x + this._rectScope.width * Math.random();
            cont.y = this._rectScope.y + this._rectScope.height * Math.random();
            cont.factor = 0.8 + Math.random() * 0.4;
            this._vcCont.push(cont);
            this.addChild(cont);
        }
        //随机填充
        BatchContentFiller.reset(this._vcCont);
        BatchContentFiller.fill(this._vcCont);
        BatchContentFiller.autoAncher(this._vcCont);
        /// 提示信息
        this._txInfo = new egret.TextField;
        this.addChild(this._txInfo);
        this._txInfo.size = 28;
        this._txInfo.x = 250;
        this._txInfo.y = 10;
        this._txInfo.width = this.stage.stageWidth - 260;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.touchEnabled = true;
        this._txInfo.cacheAsBitmap = true;
        //this._txInfo.background = true;
        //this._txInfo.backgroundColor = 0xffffff;
        this._bgInfo = new egret.Shape;
        this.addChildAt(this._bgInfo, this.numChildren - 1);
        this._bgInfo.x = this._txInfo.x;
        this._bgInfo.y = this._txInfo.y;
        this._bgInfo.cacheAsBitmap = true;
        /// 控制变量
        this._nScaleBase = 0;
        this._bCache = false;
        /// 用户控制
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            _this.planRdmMotion();
        }, this);
        this._txInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            evt.stopImmediatePropagation();
            _this._bCache = !_this._bCache;
            for (var i = _this._vcCont.length - 1; i >= 0; i--) {
                _this._vcCont[i].cacheAsBitmap = _this._bCache;
            }
            _this.updateInfo();
        }, this);
        this.planRdmMotion();
        /// 产生动画
        this.stage.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
            /*** 本示例关键代码段开始 ***/
            switch (_this._iMotionMode) {
                case MotionMode.ROT:/// 旋转并伴随缩放
                    var scale = Main14.SCALE_BASE + Math.abs(Math.sin(_this._nScaleBase += 0.05)) * Main14.SCALE_RANGE;
                    for (var i = _this._vcCont.length - 1; i >= 0; i--) {
                        _this._vcCont[i].rotation += 3 * (i % 2 ? 1 : -1) * _this._vcCont[i].factor;
                        _this._vcCont[i].scaleX = _this._vcCont[i].scaleY = scale;
                    }
                    break;
                case MotionMode.MOV:/// 移动模式控制
                    var xTo;
                    for (var i = _this._vcCont.length - 1; i >= 0; i--) {
                        xTo = _this._vcCont[i].x + 3 * (i % 2 ? 1 : -1) * _this._vcCont[i].factor;
                        if (xTo < _this._rectScope.left) {
                            xTo = _this._rectScope.right;
                        }
                        else if (xTo > _this._rectScope.right) {
                            xTo = _this._rectScope.left;
                        }
                        _this._vcCont[i].x = xTo;
                    }
                    break;
            }
            /*** 本示例关键代码段结束 ***/
        }, this);
    };
    /// 随机设置运动内容
    Main14.prototype.planRdmMotion = function () {
        if (arguments.callee['runyet'] == undefined) {
            arguments.callee['runyet'] = 1;
            this._iMotionMode = Math.random() > .5 ? MotionMode.ROT : MotionMode.MOV;
        }
        else {
            this._iMotionMode = (this._iMotionMode + 1) % MotionMod.TOTAL;
        }
        this.updateInfo();
        /// 还原比例
        switch (this._iMotionMode) {
            case MotionMode.ROT:
                for (var i = this._vcCont.length - 1; i >= 0; i--) {
                    this._vcCont[i].scaleX = this._vcCont[i].scaleY = Main14.SCALE_BASE;
                }
                break;
            case MotionMode.MOV:
                for (var i = this._vcCont.length - 1; i >= 0; i--) {
                    this._vcCont[i].scaleX = this._vcCont[i].scaleY = Main14.SCALE_BASE + Math.random() * Main14.SCALE_RANGE;
                }
                break;
        }
    };
    Main14.prototype.updateInfo = function () {
        this._txInfo.text =
            "轻触文字切换是否用位图缓存" +
                "\n当前位图缓存：" + (this._bCache ? "启用\n还卡？换手机吧！" : "关闭\n不卡只能说明机器太牛！") +
                "\n轻触舞台切换旋转缩放/平移" +
                "\n当前运动：" + (["旋转缩放", "平移"][this._iMotionMode]);
        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill(0xffffff, .5);
        this._bgInfo.graphics.drawRect(0, 0, this._txInfo.width, this._txInfo.height);
        this._bgInfo.graphics.endFill();
    };
    Main14.UNITS_PER_CONT = 16;
    Main14.NUM = 64;
    Main14.SCALE_BASE = .7;
    Main14.SCALE_RANGE = .6;
    return Main14;
}(egret.DisplayObjectContainer));
__reflect(Main14.prototype, "Main14");
var MotionSprite = (function (_super) {
    __extends(MotionSprite, _super);
    function MotionSprite() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MotionSprite;
}(egret.Sprite));
__reflect(MotionSprite.prototype, "MotionSprite");
var MotionMod = (function () {
    function MotionMod() {
    }
    MotionMod.ROT = 0;
    MotionMod.MOV = 1;
    MotionMod.TOTAL = 2;
    return MotionMod;
}());
__reflect(MotionMod.prototype, "MotionMod");
var L = (function () {
    function L() {
    }
    L.W_SHAPE = 160;
    L.H_SHAPE = 210;
    return L;
}());
__reflect(L.prototype, "L");
var BatchContentFiller = (function () {
    function BatchContentFiller() {
    }
    /// 填充内容，目前均为简单矢量图形
    BatchContentFiller.fill = function (vcCont) {
        for (var i = 0; i < Main14.UNITS_PER_CONT; i++) {
            this.prodBdmGraph(vcCont, L.W_SHAPE, L.H_SHAPE);
        }
    };
    BatchContentFiller.prodBdmGraph = function (vcCont, w, h) {
        var iTypeShape = Math.floor(Math.random() * 2);
        var iFillColor = (Math.floor(Math.random() * 0xff) << 16)
            + (Math.floor(Math.random() * 0xff) << 8)
            + Math.floor(Math.random() * 0xff);
        var iLineColor = (Math.floor(Math.random() * 0xff) << 16)
            + (Math.floor(Math.random() * 0xff) << 8)
            + Math.floor(Math.random() * 0xff);
        var radius = 20 + Math.random() * 10;
        var wRect = 30 + Math.random() * 20;
        var hRect = 20 + Math.random() * 10;
        var xRdm = L.W_SHAPE * Math.random();
        var yRdm = L.H_SHAPE * Math.random();
        console.log("prodRdmGraph:", radius, wRect, hRect, xRdm, yRdm, iFillColor, iLineColor, iTypeShape);
        for (var i = vcCont.length - 1; i >= 0; i--) {
            switch (iTypeShape) {
                case 0:/// 矩形
                    //vcCont[i].graphics.lineStyle( iLineColor );
                    vcCont[i].graphics.beginFill(iFillColor);
                    vcCont[i].graphics.drawRect(xRdm - wRect / 2, yRdm - hRect / 2, wRect, hRect);
                    vcCont[i].graphics.endFill();
                    console.log("prodRdmGraph: 画矩形", i);
                    break;
                case 1:/// 圆形
                    //vcCont[i].graphics.lineStyle( iLineColor );
                    vcCont[i].graphics.beginFill(iFillColor);
                    vcCont[i].graphics.drawCircle(xRdm, yRdm, radius);
                    vcCont[i].graphics.endFill();
                    break;
            }
        }
    };
    /// 自动居中所有容器的锚点
    BatchContentFiller.autoAncher = function (vcCont) {
        for (var i = vcCont.length - 1; i >= 0; i--) {
            vcCont[i].anchorOffsetX = vcCont[i].width / 2;
            vcCont[i].anchorOffsetY = vcCont[i].height / 2;
            console.log("vcCont[i] 新锚点：", vcCont[i].anchorOffsetX, vcCont[i].anchorOffsetY);
        }
    };
    BatchContentFiller.reset = function (vcCont) {
        for (var i = vcCont.length - 1; i >= 0; i--) {
            vcCont[i].graphics.clear();
            vcCont[i].removeChildren();
        }
    };
    return BatchContentFiller;
}());
__reflect(BatchContentFiller.prototype, "BatchContentFiller");
//# sourceMappingURL=Main14.js.map