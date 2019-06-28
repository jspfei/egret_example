/**
 * 添加和删除显示对象
 */
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
var Main4 = (function (_super) {
    __extends(Main4, _super);
    function Main4() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main4.prototype.onAddToStage = function (evt) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
        });
    };
    Main4.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main4.prototype.loadResource = function () {
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
    Main4.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Main4.prototype.createGameScene = function () {
        var _this = this;
        /** 使用shape 和 graphics  */
        var upLeft = this.createShape(0, 0, 0xf7acbc);
        this.addChild(upLeft);
        var upRight = this.createShape(this.stage.stageWidth / 2, 0, 0xdeab8a);
        this.addChild(upRight);
        var downLeft = this.createShape(0, this.stage.stageHeight / 2, 0xef5b9c);
        this.addChild(downLeft);
        var downRight = this.createShape(this.stage.stageWidth / 2, this.stage.stageHeight / 2, 0xfedcbd);
        this.addChild(downRight);
        //初始化四个白鹭
        var upLeftBird = this.createBitmapByName("cartoon-egret_00_png");
        upLeftBird.x = upLeft.x + upLeft.width / 2 - upLeftBird.width / 2;
        upLeftBird.y = upLeft.y + upLeft.height / 2 - upLeftBird.height / 2;
        var upRightBird = this.createBitmapByName("cartoon-egret_00_png");
        upRightBird.x = upRight.x + upRight.width / 2 - upRightBird.width / 2;
        upRightBird.y = upRight.y + upRight.height / 2 - upRightBird.height / 2;
        var downLeftBird = this.createBitmapByName("cartoon-egret_00_png");
        downLeftBird.x = downLeft.x + downLeft.width / 2 - downLeftBird.width / 2;
        downLeftBird.y = downLeft.y + downLeft.height / 2 - downLeftBird.height / 2;
        var downRightBird = this.createBitmapByName("cartoon-egret_00_png");
        downRightBird.x = downRight.x + downRight.width / 2 - downRightBird.width / 2;
        downRightBird.y = downRight.y + downRight.height / 2 - downRightBird.height / 2;
        //监听事件
        upLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.contains(upLeftBird)) {
                _this.removeChild(upLeftBird);
            }
            else {
                _this.addChild(upLeftBird);
            }
        }, this);
        upRight.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.contains(upRightBird)) {
                _this.removeChild(upRightBird);
            }
            else {
                _this.addChild(upRightBird);
            }
        }, this);
        downLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.contains(downLeftBird)) {
                _this.removeChild(downLeftBird);
            }
            else {
                _this.addChild(downLeftBird);
            }
        }, this);
        downRight.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.contains(downRightBird)) {
                _this.removeChild(downRightBird);
            }
            else {
                _this.addChild(downRightBird);
            }
        }, this);
        //提示信息
        this._txInfo = new egret.TextField;
        this._txInfo.size = 28;
        this._txInfo.textAlign = egret.HorizontalAlign.CENTER;
        this._txInfo.textColor = 0x843900;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.text = "点击不同色块";
        this._txInfo.x = this.stage.stageWidth / 2 - this._txInfo.width / 2;
        this._txInfo.y = 10;
        this.addChild(this._txInfo);
    };
    Main4.prototype.createShape = function (x, y, color) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawRect(0, 0, this.stage.stageWidth / 2, this.stage.stageHeight / 2);
        shape.graphics.endFill();
        shape.touchEnabled = true;
        shape.x = x;
        shape.y = y;
        return shape;
    };
    return Main4;
}(egret.DisplayObjectContainer));
__reflect(Main4.prototype, "Main4");
//# sourceMappingURL=Main4.js.map