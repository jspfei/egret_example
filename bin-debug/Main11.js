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
var Main11 = (function (_super) {
    __extends(Main11, _super);
    function Main11() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main11.prototype.onAddToStage = function () {
        this._shape = new egret.Shape();
        this.addChild(this._shape);
        //this.initGraphics();
        this.drawCone();
        this.changeGraphics();
    };
    //轻触修改属性
    Main11.prototype.changeGraphics = function () {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            this.drawCone();
        }, this);
    };
    Main11.prototype.initGraphics = function () {
        var shape = this._shape;
        shape.graphics.lineStyle(2, 0xff00ff);
        shape.graphics.moveTo(320, 400);
        shape.graphics.lineTo(380, 300);
    };
    Main11.prototype.drawCone = function () {
        var shape = this._shape;
        var array = [{ x: 320 - 200, y: 400 }, { x: 320 + 200, y: 400 }, { x: Math.random() * 300 + 180, y: 200 }, { x: Math.random() * 300 + 180, y: 600 }];
        shape.graphics.clear();
        for (var i = 0; i < array.length; i++) {
            for (var j = i; j < array.length; j++) {
                shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
                shape.graphics.moveTo(array[i]["x"], array[i]["y"]);
                shape.graphics.lineTo(array[j]["x"], array[j]["y"]);
            }
        }
    };
    return Main11;
}(egret.DisplayObjectContainer));
__reflect(Main11.prototype, "Main11");
//# sourceMappingURL=Main11.js.map