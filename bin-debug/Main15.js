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
var Main15 = (function (_super) {
    __extends(Main15, _super);
    function Main15() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main15.prototype.onAddToStage = function (event) {
        this.runGame().catch(function (e) { });
    };
    Main15.prototype.runGame = function () {
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
    Main15.prototype.loadRescource = function () {
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
    Main15.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Main15.prototype.createGameScene = function () {
        var _this = this;
        /// 展示用显示对象： 白鹭小鸟
        this._bigbird = this.createBitmapByName("cartoon-egret_00_png");
        this.addChild(this._bigbird);
        this._bigbird.anchorOffsetX = this._bigbird.width / 2;
        this._bigbird.anchorOffsetY = this._bigbird.height / 2;
        this._bigbird.x = this.stage.stageWidth * 0.5;
        this._bigbird.y = this.stage.stageHeight * 0.618;
        this._bigbird.rotation = 35;
        /// 小圆点，用以提示用户按下位置
        this._dot = new egret.Shape;
        this._dot.graphics.beginFill(0x00ff00);
        this._dot.graphics.drawCircle(0, 0, 5);
        this._dot.graphics.endFill();
        /// 提示信息
        this._txInfo = new egret.TextField;
        this.addChild(this._txInfo);
        this._txInfo.size = 28;
        this._txInfo.x = 50;
        this._txInfo.y = 50;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.touchEnabled = true;
        this._txInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            evt.stopImmediatePropagation();
            /*** 本示例关键代码段开始 ***/
            _this._bigbird.pixelHitTest = !_this._bigbird.pixelHitTest;
            /*** 本示例关键代码段结束 ***/
            _this.updateInfo(false);
        }, this);
        this.launchCollisionTest();
    };
    Main15.prototype.updateInfo = function (bTouch) {
        this._txInfo.text =
            "点击穿透检测结果：" + (bTouch ? "别碰我！！" : "还没碰到！")
                + "\n\n点击穿透检测模式：" + (this._bigbird.pixelHitTest ? "小白鹭透明穿透" : "小白鹭无穿透")
                + "\n（轻触文字区切换）";
    };
    Main15.prototype.launchCollisionTest = function () {
        this._bigbird.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        this._bigbird.pixelHitTest = false;
        this._bigbird.touchEnabled = true;
        this.updateInfo(false);
    };
    Main15.prototype.checkCollision = function (stageX, stageY, bTouch) {
        /// 小圆点同步手指位置
        this._dot.x = stageX;
        this._dot.y = stageY;
        /// 文字信息更新
        this.updateInfo(bTouch);
    };
    Main15.prototype.touchHandler = function (evt) {
        switch (evt.type) {
            case egret.TouchEvent.TOUCH_MOVE:
                this.checkCollision(evt.stageX, evt.stageY, true);
                break;
            case egret.TouchEvent.TOUCH_BEGIN:
                if (!this._txInfo.hitTestPoint(evt.stageX, evt.stageY)) {
                    evt.currentTarget.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
                    evt.currentTarget.once(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    this.addChild(this._dot);
                    this.checkCollision(evt.stageX, evt.stageY, true);
                }
                break;
            case egret.TouchEvent.TOUCH_END:
            case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                evt.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
                evt.currentTarget.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
                if (this._dot.parent) {
                    this._dot.parent.removeChild(this._dot);
                }
                this.updateInfo(false);
                break;
        }
    };
    return Main15;
}(egret.DisplayObjectContainer));
__reflect(Main15.prototype, "Main15");
var TouchCollideStatus = (function () {
    function TouchCollideStatus() {
    }
    TouchCollideStatus.NO_TOUCHED = 0;
    TouchCollideStatus.TOUCHED_NO_COLLIDED = 1;
    TouchCollideStatus.COLLIDED = 2;
    return TouchCollideStatus;
}());
__reflect(TouchCollideStatus.prototype, "TouchCollideStatus");
//# sourceMappingURL=Main15.js.map