/**
 * @copyright www.egret.com
 * @author dily
 * @desc 区分两个不同的容器
 *      点击不同颜色按钮，将白鹭小鸟放到不同的容器中，拖动容器小鸟随着容器移动
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
var Main6 = (function (_super) {
    __extends(Main6, _super);
    function Main6() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main6.prototype.onAddToStage = function (event) {
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
    Main6.prototype.runGame = function () {
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
    Main6.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
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
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Main6.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Main6.prototype.createGameScene = function () {
        var _this = this;
        //初始化白鹭
        var egretBird = this.createBitmapByName("cartoon-egret_00_png");
        egretBird.x = this.stage.stageWidth / 2 - egretBird.width / 2;
        egretBird.y = this.stage.stageHeight / 2 + 50;
        egretBird.anchorOffsetX = egretBird.width / 2;
        egretBird.anchorOffsetY = egretBird.height / 2;
        egretBird.scaleX = .8;
        egretBird.scaleY = .8;
        this.addChild(egretBird);
        egretBird.touchEnabled = false;
        //按钮生产代码
        this._leftTF = this.createBtn("红色容器", 0xd71345);
        this._leftTF.x = this.stage.stageWidth / 4 - this._leftTF.width / 2;
        this._leftTF.y = 120;
        this.addChild(this._leftTF);
        this._rightTF = this.createBtn("蓝色容器", 0x102b6a);
        this._rightTF.x = this.stage.stageWidth / 2 + this.stage.stageWidth / 4 - this._rightTF.width / 2;
        this._rightTF.y = 120;
        this.addChild(this._rightTF);
        //两个容器
        var leftCon = new egret.DisplayObjectContainer();
        this.addChild(leftCon);
        var leftCage = this.createCage(0xd71345);
        leftCon.addChild(leftCage);
        leftCon.x = this.stage.stageWidth / 4;
        leftCon.y = 300;
        var rightCon = new egret.DisplayObjectContainer();
        this.addChild(rightCon);
        var rightCage = this.createCage(0x102b6a);
        rightCon.addChild(rightCage);
        rightCon.x = this.stage.stageWidth / 2 + this.stage.stageWidth / 4;
        rightCon.y = 300;
        /// 提示信息
        this._txInfo = new egret.TextField;
        this._txInfo.size = 28;
        this._txInfo.width = 550;
        this._txInfo.textAlign = egret.HorizontalAlign.CENTER;
        this._txInfo.textColor = 0x000000;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.text = "点击不同颜色按钮，将白鹭小鸟放到不同的容器中，拖动容器小鸟随着容器移动";
        this._txInfo.x = this.stage.stageWidth / 2 - this._txInfo.width / 2;
        this._txInfo.y = 10;
        this.addChild(this._txInfo);
        this._leftTF.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.getChildIndex(egretBird) != -1) {
                _this.removeChild(egretBird);
                leftCon.addChild(egretBird);
                egretBird.x = leftCage.width / 2 - egretBird.width / 2;
                egretBird.y = leftCage.height / 2 - egretBird.height / 2;
            }
            else if (rightCon.getChildIndex(egretBird) != -1) {
                rightCon.removeChild(egretBird);
                leftCon.addChild(egretBird);
                egretBird.x = leftCage.width / 2 - egretBird.width / 2;
                egretBird.y = leftCage.height / 2 - egretBird.height / 2;
            }
            leftCon.touchEnabled = true;
            rightCon.touchEnabled = false;
        }, this);
        this._rightTF.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.getChildIndex(egretBird) != -1) {
                _this.removeChild(egretBird);
                rightCon.addChild(egretBird);
                egretBird.x = rightCage.width / 2 - egretBird.width / 2;
                egretBird.y = rightCage.height / 2 - egretBird.height / 2;
            }
            else if (leftCon.getChildIndex(egretBird) != -1) {
                leftCon.removeChild(egretBird);
                rightCon.addChild(egretBird);
                egretBird.x = rightCage.width / 2 - egretBird.width / 2;
                egretBird.y = rightCage.height / 2 - egretBird.height / 2;
            }
            leftCon.touchEnabled = false;
            rightCon.touchEnabled = true;
        }, this);
        //对应容器添加拖拽代码
        var leftDrag = false;
        var rightDrag = false;
        leftCon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            leftDrag = true;
        }, this);
        leftCon.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            leftDrag = false;
        }, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
            if (leftDrag) {
                leftCon.x = e.stageX - leftCage.width / 2;
                leftCon.y = e.stageY - leftCage.height / 2;
            }
        }, this);
        rightCon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            rightDrag = true;
        }, this);
        rightCon.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            rightDrag = false;
        }, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
            if (rightDrag) {
                rightCon.x = e.stageX - rightCage.width / 2;
                rightCon.y = e.stageY - rightCage.height / 2;
            }
        }, this);
    };
    Main6.prototype.createCage = function (color) {
        var cage = new egret.Shape();
        cage.graphics.lineStyle(10, color, 1, true);
        cage.graphics.lineTo(0, 0);
        cage.graphics.lineTo(250, 0);
        cage.graphics.lineTo(250, 250);
        cage.graphics.lineTo(0, 250);
        cage.graphics.lineTo(0, 0);
        cage.graphics.endFill();
        cage.width = 250;
        cage.height = 250;
        cage.anchorOffsetX = cage.width / 2;
        cage.anchorOffsetY = cage.height / 2;
        return cage;
    };
    Main6.prototype.createBtn = function (text, color) {
        var tf = new egret.TextField;
        tf.size = 28;
        tf.textAlign = egret.HorizontalAlign.CENTER;
        tf.textColor = 0xffffff;
        tf.background = true;
        tf.backgroundColor = color;
        tf.text = text;
        tf.touchEnabled = true;
        return tf;
    };
    return Main6;
}(egret.DisplayObjectContainer));
__reflect(Main6.prototype, "Main6");
//# sourceMappingURL=Main6.js.map