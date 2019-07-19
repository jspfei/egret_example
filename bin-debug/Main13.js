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
var Main13 = (function (_super) {
    __extends(Main13, _super);
    function Main13() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main13.prototype.onAddToStage = function () {
        this.runGame().catch(function (e) { });
    };
    Main13.prototype.runGame = function () {
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
    Main13.prototype.loadRescource = function () {
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
    Main13.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Main13.prototype.createGameScene = function () {
        var _this = this;
        var bmd = this.createBitmapByName("cartoon-egret_01_small_png");
        var wHalfBird = bmd.width / 2;
        var hHalfBird = bmd.height / 2;
        this._rectScope = new egret.Rectangle(wHalfBird * Main13.SCALE_BASE, hHalfBird * Main13.SCALE_BASE, this.stage.stageWidth - wHalfBird * Main13.SCALE_BASE * 2, this.stage.stageHeight - hHalfBird * Main13.SCALE_BASE * 2);
        this._vcBird = new Array();
        for (var i = 0; i < Main13.NUM; ++i) {
            var bird = this.createBitmapByName("cartoon-egret_01_small_png");
            bird.anchorOffsetX = wHalfBird;
            bird.anchorOffsetY = hHalfBird;
            bird.x = this._rectScope.x + this._rectScope.width * Math.random();
            bird.y = this._rectScope.y + this._rectScope.height * Math.random();
            bird.scaleX = bird.scaleY = Main13.SCALE_BASE;
            this._vcBird.push(bird);
            this.addChild(bird);
        }
        /// 提示信息
        this._txInfo = new egret.TextField;
        this.addChild(this._txInfo);
        this._txInfo.size = 28;
        this._txInfo.x = 50;
        this._txInfo.y = 50;
        this._txInfo.width = this.stage.stageWidth - 100;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.touchEnabled = true;
        //this._txInfo.background = true;
        //this._txInfo.backgroundColor = 0xffffff;
        this._txInfo.text =
            "轻触以改变运动的小鸟及运动模式，观察不同的小鸟变化对应的脏矩形变化";
        this._bgInfo = new egret.Shape;
        this.addChild(this._bgInfo);
        this._bgInfo.x = this._txInfo.x;
        this._bgInfo.y = this._txInfo.y;
        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill(0xffffff, .5);
        this._bgInfo.graphics.drawRect(0, 0, this._txInfo.width, this._txInfo.height);
        this._bgInfo.graphics.endFill();
        this._bgInfo.cacheAsBitmap = true;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.plantRdmMotion();
        }, this);
        this.plantRdmMotion();
        this._nScaleBase = 0;
        this.stage.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
            switch (_this._iMotionMode) {
                case MotionMode.ROT:
                    _this._vcBird[_this._vcMotion[0]].rotation += 3;
                    _this._vcBird[_this._vcMotion[1]].rotation -= 3;
                    _this._vcBird[_this._vcMotion[2]].rotation += 3;
                    var scale = Main13.SCALE_BASE + Math.abs(Math.sin(_this._nScaleBase += 0.03)) * Main13.SCALE_RANGE;
                    _this._vcBird[_this._vcMotion[0]].scaleX = _this._vcBird[_this._vcMotion[0]].scaleY = scale;
                    _this._vcBird[_this._vcMotion[1]].scaleX = _this._vcBird[_this._vcMotion[1]].scaleY = scale;
                    _this._vcBird[_this._vcMotion[2]].scaleX = _this._vcBird[_this._vcMotion[2]].scaleY = scale;
                    break;
                case MotionMode.MOV:
                    var xTo;
                    if ((xTo = _this._vcBird[_this._vcMotion[0]].x - 3) < _this._rectScope.left) {
                        xTo = _this._rectScope.right;
                    }
                    _this._vcBird[_this._vcMotion[0]].x = xTo;
                    if ((xTo = _this._vcBird[_this._vcMotion[1]].x - 3) < _this._rectScope.right) {
                        xTo = _this._rectScope.left;
                    }
                    _this._vcBird[_this._vcMotion[1]].x = xTo;
                    if ((xTo = _this._vcBird[_this._vcMotion[2]].x - 3) < _this._rectScope.left) {
                        xTo = _this._rectScope.right;
                    }
                    _this._vcBird[_this._vcMotion[2]].x = xTo;
                    break;
            }
        }, this);
    };
    Main13.prototype.plantRdmMotion = function () {
        //随机一个运动模式
        this._iMotionMode = Math.random() > .5 ? 0 : 1;
        //还原比例
        if (this._vcMotion && this._vcMotion.length == 3) {
            this._vcBird[this._vcMotion[0]].scaleX = this._vcBird[this._vcMotion[0]].scaleY = Main13.SCALE_BASE;
            this._vcBird[this._vcMotion[1]].scaleX = this._vcBird[this._vcMotion[1]].scaleY = Main13.SCALE_BASE;
            this._vcBird[this._vcMotion[2]].scaleX = this._vcBird[this._vcMotion[2]].scaleY = Main13.SCALE_BASE;
        }
        this.setChildIndex(this._txInfo, this.numChildren - 1);
        this.setChildIndex(this._bgInfo, this.numChildren - 1);
        this._vcMotion = new Array();
        this._vcMotion.push(Math.floor(Main13.NUM * Math.random()));
        this._vcMotion.push(Math.floor(Main13.NUM * Math.random()));
        this._vcMotion.push(Math.floor(Main13.NUM * Math.random()));
        this.setChildIndex(this._vcBird[this._vcMotion[0]], this.numChildren - 3);
        this.setChildIndex(this._vcBird[this._vcMotion[1]], this.numChildren - 4);
        this.setChildIndex(this._vcBird[this._vcMotion[2]], this.numChildren - 5);
    };
    Main13.NUM = 32;
    Main13.SCALE_BASE = 0.5;
    Main13.SCALE_RANGE = 0.5;
    return Main13;
}(egret.DisplayObjectContainer));
__reflect(Main13.prototype, "Main13");
var MotionMode = (function () {
    function MotionMode() {
    }
    MotionMode.ROT = 0;
    MotionMode.MOV = 1;
    return MotionMode;
}());
__reflect(MotionMode.prototype, "MotionMode");
//# sourceMappingURL=Main13.js.map