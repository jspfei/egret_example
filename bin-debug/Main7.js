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
/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 贝塞尔曲线示例。
 *      拖动舞台上圆点，可以查看贝塞尔曲线不同的显示。
 */
var Main7 = (function (_super) {
    __extends(Main7, _super);
    function Main7() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main7.prototype.onAddToStage = function () {
        this._shape = new egret.Shape();
        this.addChild(this._shape);
        this.init();
        this.initGraphics();
    };
    Main7.prototype.initGraphics = function () {
        var shape = this._shape;
        shape.graphics.lineStyle(3, 0xff0ff0);
        shape.graphics.moveTo(140, 400);
        shape.graphics.curveTo(340, 200, 480, 500);
    };
    Main7.prototype.init = function () {
        this._startShape = this.initShape(140, 400, 0xffff00);
        this._control = this.initShape(340, 200, 0xff0000);
        this._anchor = this.initShape(480, 500, 0x000ff0);
    };
    Main7.prototype.initShape = function (x, y, color) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawCircle(0, 0, 20);
        shape.graphics.endFill();
        this.addChild(shape);
        shape.x = x;
        shape.y = y;
        shape.touchEnabled = true;
        shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
        return shape;
    };
    Main7.prototype.resetCure = function () {
        var shape = this._shape;
        /*** 本示例关键代码段开始 ***/
        shape.graphics.clear();
        shape.graphics.lineStyle(3, 0xff0ff0);
        shape.graphics.moveTo(this._startShape.x, this._startShape.y);
        shape.graphics.curveTo(this._control.x, this._control.y, this._anchor.x, this._anchor.y);
    };
    Main7.prototype.onBeginHandler = function (e) {
        e.stopImmediatePropagation();
        this.drapShape = e.currentTarget;
        this.drapShape.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
        this.drapShape.touchEnabled = false;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndHandler, this);
    };
    Main7.prototype.onMoveHandler = function (e) {
        this.drapShape.x = e.stageX;
        this.drapShape.y = e.stageY;
        this.resetCure();
    };
    Main7.prototype.onEndHandler = function (e) {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndHandler, this);
        this.drapShape.touchEnabled = true;
        this.drapShape.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
    };
    return Main7;
}(egret.DisplayObjectContainer));
__reflect(Main7.prototype, "Main7");
//# sourceMappingURL=Main7.js.map