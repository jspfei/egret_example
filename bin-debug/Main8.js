// TypeScript file
/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 绘图api之画圆弧。
 *      基于此api可以不仅仅画出圆弧，还可以绘制出拱形、扇形、花瓣等等。
 *      轻触屏幕出现不同的花瓣形状。
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
var Main8 = (function (_super) {
    __extends(Main8, _super);
    function Main8() {
        var _this = _super.call(this) || this;
        _this._count = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main8.prototype.onAddToStage = function (event) {
        // this.initGraphics();
        this.drawFl();
        this.changeGraphics();
    };
    Main8.prototype.initGraphics = function () {
        var shape = new egret.Shape();
        this.addChild(shape);
        shape.x = this.stage.stageWidth / 2;
        shape.y = this.stage.stageHeight / 2;
        shape.graphics.lineStyle(2, 0xff00ff);
        shape.graphics.drawArc(0, 0, 150, 0, Math.PI, true);
    };
    Main8.prototype.changeGraphics = function () {
        var _this = this;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.drawFl();
        }, this);
    };
    Main8.prototype.drawFl = function () {
        this.removeChildren();
        var nums = [18, 15, 12, 10, 9, 6, 5, 4, 3];
        var num = nums[this._count++];
        var singleAng = 180 / num;
        var r1 = 150;
        var r2 = r1 * Math.sin(singleAng * Math.PI / 180);
        var r3 = r1 * Math.cos(singleAng * Math.PI / 180);
        for (var i = 0; i < num; i++) {
            var shape = new egret.Shape();
            this.addChild(shape);
            shape.x = this.stage.stageWidth / 2;
            shape.y = this.stage.stageHeight / 2;
            shape.graphics.clear();
            shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
            var ang = -singleAng / 2 + i * 2 * singleAng;
            shape.graphics.drawArc(r3 * Math.cos(ang * Math.PI / 180), r3 * Math.sin(ang * Math.PI / 180), r2, (ang + 90) * Math.PI / 180, (ang - 90) * Math.PI / 180, true);
        }
    };
    return Main8;
}(egret.DisplayObjectContainer));
__reflect(Main8.prototype, "Main8");
//# sourceMappingURL=Main8.js.map