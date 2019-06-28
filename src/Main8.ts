// TypeScript file
/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 绘图api之画圆弧。
 *      基于此api可以不仅仅画出圆弧，还可以绘制出拱形、扇形、花瓣等等。
 *      轻触屏幕出现不同的花瓣形状。
 */

class Main8 extends egret.DisplayObjectContainer{
    constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
    }

    private onAddToStage(event:egret.Event){
       // this.initGraphics();
       this.drawFl();
       this.changeGraphics();
    }

    private initGraphics(){
        let shape:egret.Shape = new egret.Shape();
        this.addChild(shape)
        shape.x = this.stage.stageWidth/2;
        shape.y = this.stage.stageHeight/2;

        shape.graphics.lineStyle(2,0xff00ff);
        shape.graphics.drawArc(0,0,150,0,Math.PI,true)
    }

    private changeGraphics(){
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
            this.drawFl();
        },this)
    }

    private _count:number = 0;
    private drawFl(){
        this.removeChildren();

        var nums:Array<number> = [18,15,12,10,9,6,5,4,3];
        var num:number = nums[this._count++];
        var singleAng:number = 180 /num;

        var r1 = 150;
        var r2 = r1 * Math.sin(singleAng * Math.PI /180)
        var r3 = r1 * Math.cos(singleAng * Math.PI /180)

        for (var i:number = 0; i<num;i++){
            var shape = new egret.Shape();
            this.addChild(shape);
            shape.x = this.stage.stageWidth/2;
            shape.y = this.stage.stageHeight/2;

            shape.graphics.clear();
            shape.graphics.lineStyle(2,0xff0000+Math.floor(Math.random() * 100) * (0xffffff / 100))
            
         var ang = -singleAng / 2 + i * 2 * singleAng;
            shape.graphics.drawArc(r3 * Math.cos(ang * Math.PI / 180), 
                r3 * Math.sin(ang * Math.PI / 180), r2, (ang + 90) * Math.PI / 180, (ang - 90) * Math.PI / 180, true);
      
    
 }
    }
}