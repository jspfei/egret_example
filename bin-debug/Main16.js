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
// TypeScript file
var Main16 = (function (_super) {
    __extends(Main16, _super);
    function Main16() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main16.prototype.onAddToStage = function (event) {
        this.runGame().catch(function (e) { });
    };
    Main16.prototype.runGame = function () {
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
    Main16.prototype.loadRescource = function () {
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
    Main16.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Main16.prototype.createGameScene = function () {
        var _this = this;
        this._txInfo = new egret.TextField;
        this.addChild(this._txInfo);
        this._txInfo.size = 28;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.text =
            "屏幕分为两个小区域，上方是画面变换区域，下方是截屏显示区域。" +
                "\n轻触屏幕进行截屏！";
        this._txInfo.x = 50;
        this._txInfo.width = this.stage.stageWidth - 100;
        this._txInfo.y = 50;
        //this._txInfo.y = this.stage.stageHeight - this._txInfo.height - L.PADDING_SIDE;
        var yClipsStart = this._txInfo.x + this._txInfo.height + L1.GAP_UNIFIED;
        L1.W_CLIP = this.stage.stageWidth - L1.GAP_UNIFIED * 2;
        L1.H_CLIP = (this.stage.stageHeight - (yClipsStart + L1.GAP_UNIFIED * 2)) / 2;
        this._rectClip = new egret.Rectangle(0, 0, L1.W_CLIP, L1.H_CLIP);
        /////////////////////////////////////////////// 动画容器部分 ////////////////////////////
        /// 建立动画容器，放置若干运动白鹭小鸟 上方
        this._contMotion = new egret.Sprite;
        this._contMotion.x = L1.GAP_UNIFIED;
        this._contMotion.y = yClipsStart;
        this.addChild(this._contMotion);
        console.log(this._txInfo.y);
        /// 容器加入随机纯色背景
        var iFillColor = (Math.floor(Math.random() * 0xff) << 16)
            + (Math.floor(Math.random() * 0xff) << 8)
            + Math.floor(Math.random() * 0xff);
        var shpBg = new egret.Shape;
        shpBg.graphics.beginFill(iFillColor);
        shpBg.graphics.drawRect(0, 0, L1.W_CLIP, L1.H_CLIP);
        shpBg.graphics.endFill();
        shpBg.cacheAsBitmap = true;
        this._contMotion.addChild(shpBg);
        this._contMotion.mask = this._rectClip;
        /// 填入随机位置白鹭小鸟若干
        this._vcBird = new Array();
        for (var i = 0; i < 24; ++i) {
            var bird = new MotionBMP(RES.getRes("cartoon-egret_01_small2_png"));
            bird.anchorOffsetX = bird.width / 2;
            bird.anchorOffsetY = bird.height / 2;
            bird.x = L1.W_CLIP * Math.random();
            bird.y = L1.H_CLIP * Math.random();
            bird.scaleX = bird.scaleY = .5;
            bird.vx = Math.random() > .7 ? (1 + Math.random() * 3) * (Math.random() > .5 ? 1 : -1) : 0;
            bird.vy = Math.random() > .7 ? (1 + Math.random() * 3) * (Math.random() > .5 ? 1 : -1) : 0;
            bird.va = (1 + Math.random() * 3) * (Math.random() > .5 ? 1 : -1);
            this._contMotion.addChild(bird);
            this._vcBird.push(bird);
        }
        this._bmpSnap = new egret.Bitmap;
        this._bmpSnap.x = L1.GAP_UNIFIED;
        this._bmpSnap.y = this._contMotion.y + L1.H_CLIP + L1.GAP_UNIFIED;
        this.addChild(this._bmpSnap);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            /*** 本示例关键代码段开始 ***/
            var rt = new egret.RenderTexture;
            rt.drawToTexture(_this._contMotion, _this._rectClip);
            _this._bmpSnap.texture = rt;
            /*** 本示例关键代码段结束 ***/
        }, this);
    };
    return Main16;
}(egret.DisplayObjectContainer));
__reflect(Main16.prototype, "Main16");
/// 包含运动速度的位图
var MotionBMP = (function (_super) {
    __extends(MotionBMP, _super);
    function MotionBMP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MotionBMP;
}(egret.Bitmap));
__reflect(MotionBMP.prototype, "MotionBMP");
/// 布局定义
var L1 = (function () {
    function L1() {
    }
    L1.GAP_UNIFIED = 50;
    return L1;
}());
__reflect(L1.prototype, "L1");
//# sourceMappingURL=Main16.js.map