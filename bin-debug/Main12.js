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
// TypeScript file
var Main12 = (function (_super) {
    __extends(Main12, _super);
    function Main12() {
        var _this = _super.call(this) || this;
        _this.shape = new egret.Shape();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main12.prototype.onAddToStage = function () {
        this.initGraphics();
        this.changeGraphics();
    };
    Main12.prototype.drawRect = function (x, y) {
        var shape = this.shape;
        var w = Math.random() * 200 + 100;
        var h = Math.random() * 200 + 100;
        shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        shape.graphics.drawRect(x - w / 2, y - h / 2, w, h);
        shape.graphics.endFill();
    };
    Main12.prototype.initGraphics = function () {
        var shape = this.shape;
        this.addChild(shape);
        this.drawRect(this.stage.stageWidth / 2, this.stage.stageHeight / 2);
    };
    Main12.prototype.changeGraphics = function () {
        var _this = this;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.drawRect(e.stageX, e.stageY);
        }, this);
    };
    return Main12;
}(egret.DisplayObjectContainer));
__reflect(Main12.prototype, "Main12");
//# sourceMappingURL=Main12.js.map