/**
 * Mask 遮罩
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
var Main3 = (function (_super) {
    __extends(Main3, _super);
    function Main3() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    //加载界面完成入口方法
    Main3.prototype.onAddToStage = function (evt) {
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
            console.log(e);
        });
    };
    //异步加载资源和界面
    Main3.prototype.runGame = function () {
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
    //异步加载资源
    Main3.prototype.loadResource = function () {
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
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //根据图片名创建图片
    Main3.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    //创建界面组件
    Main3.prototype.createGameScene = function () {
        //用义被遮罩的形状
        this._shpBeMask = new egret.Shape;
        this._shpBeMask.graphics.lineStyle(0x000000);
        this._shpBeMask.graphics.beginFill(this.getRdmClr());
        this._shpBeMask.graphics.drawEllipse(0, 0, 200, 200);
        this._shpBeMask.graphics.endFill();
        this._shpBeMask.x = (this.stage.stageWidth - 200) / 2;
        this._shpBeMask.y = (this.stage.stageHeight - 300) / 2;
        this.addChild(this._shpBeMask);
        this._bird = this.createBitmapByName("cartoon-egret_00_png");
        var wHalfBird = this._bird.width / 2;
        var hHalfBird = this._bird.height / 2;
        this._bird.anchorOffsetX = wHalfBird;
        this._bird.anchorOffsetY = hHalfBird;
        this._bird.x = wHalfBird + (this.stage.stageWidth - wHalfBird * 2) * Math.random();
        this._bird.y = hHalfBird + (this.stage.stageHeight - hHalfBird * 2) * Math.random();
        this.addChild(this._bird);
        this._txInfo = new egret.TextField;
        this.addChildAt(this._txInfo, 0);
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
        this._txInfo.text =
            "接触屏幕后白鹭小鸟将变为椭圆形状的遮罩区域，可以移动手指（白鹭小鸟）并观察椭圆在遮罩下的显示变化";
        this.launchMask();
    };
    //监听touch
    Main3.prototype.launchMask = function () {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
    };
    //更新bird 位置
    Main3.prototype.updateBird = function (stageX, stageY) {
        this._bird.x = stageX;
        this._bird.y = stageY;
    };
    //touch触发管理
    Main3.prototype.touchHandler = function (evt) {
        switch (evt.type) {
            case egret.TouchEvent.TOUCH_MOVE:
                //移动过程中更新bird 位置
                this.updateBird(evt.stageX, evt.stageY);
                break;
            case egret.TouchEvent.TOUCH_BEGIN:
                //监听Move
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
                this.stage.once(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                this._shpBeMask.mask = this._bird;
                this.updateBird(evt.stageX, evt.stageY);
                break;
            case egret.TouchEvent.TOUCH_END:
                //删除move 重新监听 begin
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
                this._shpBeMask.mask = null;
                this._bird.$maskedObject = null;
                break;
        }
    };
    Main3.prototype.getRdmClr = function () {
        return (Math.floor(Math.random() * 0xff) << 16)
            + (Math.floor(Math.random() * 0xff) << 8)
            + (Math.floor(Math.random() * 0xff));
    };
    return Main3;
}(egret.DisplayObjectContainer));
__reflect(Main3.prototype, "Main3");
//# sourceMappingURL=Main3.js.map