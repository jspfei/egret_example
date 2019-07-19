// TypeScript file
// TypeScript file
class Main16 extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
    }

     private onAddToStage(event:egret.Event) {
        this.runGame().catch(e=>{})
     }

    private async runGame(){
        await this.loadRescource()
        this.createGameScene();
    }
    private async loadRescource(){
        try {
            await RES.loadConfig("resource/default.res.json","resource/");
            await RES.loadGroup("preload")
        } catch (e) {
            
        }
    }

    private createBitmapByName(name:string){
        let result = new egret.Bitmap();
        let texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


    private _txInfo:egret.TextField;
    private _contMotion:egret.Sprite;
    private _vcBird:Array<MotionBMP>;
    private _bmpSnap:egret.Bitmap;
    private _rectClip:egret.Rectangle;
    private _shapeSnapEffect:egret.Shape;

    private createGameScene(){
        this._txInfo = new egret.TextField;
        this.addChild( this._txInfo );

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
        this._txInfo.width =  this.stage.stageWidth - 100;
        this._txInfo.y = 50;
        //this._txInfo.y = this.stage.stageHeight - this._txInfo.height - L.PADDING_SIDE;


       var yClipsStart:number = this._txInfo.x + this._txInfo.height + L1.GAP_UNIFIED;
        
        L1.W_CLIP = this.stage.stageWidth - L1.GAP_UNIFIED * 2;
        L1.H_CLIP = ( this.stage.stageHeight - ( yClipsStart + L1.GAP_UNIFIED * 2 ) ) /2;
        this._rectClip = new egret.Rectangle( 0, 0, L1.W_CLIP, L1.H_CLIP );

         /////////////////////////////////////////////// 动画容器部分 ////////////////////////////
        /// 建立动画容器，放置若干运动白鹭小鸟 上方
      
        this._contMotion = new egret.Sprite;
        this._contMotion.x = L1.GAP_UNIFIED;
        this._contMotion.y = yClipsStart ;
        this.addChild( this._contMotion );
        console.log( this._txInfo.y  );

          
        /// 容器加入随机纯色背景
        var iFillColor:number = ( Math.floor( Math.random() * 0xff ) << 16 )
            + ( Math.floor( Math.random() * 0xff ) << 8 )
            + Math.floor( Math.random() * 0xff ) ;
        var shpBg:egret.Shape = new egret.Shape;
        shpBg.graphics.beginFill( iFillColor );
        shpBg.graphics.drawRect( 0, 0, L1.W_CLIP, L1.H_CLIP );
        shpBg.graphics.endFill();
        shpBg.cacheAsBitmap = true;
        this._contMotion.addChild( shpBg );

        this._contMotion.mask = this._rectClip;

        /// 填入随机位置白鹭小鸟若干
        this._vcBird = new Array<MotionBMP>();
        for( var i:number = 0; i<24; ++i ){
            var bird:MotionBMP = new MotionBMP( RES.getRes("cartoon-egret_01_small2_png"));
            bird.anchorOffsetX = bird.width / 2;
            bird.anchorOffsetY = bird.height / 2;
            bird.x = L1.W_CLIP * Math.random();
            bird.y = L1.H_CLIP * Math.random();
            bird.scaleX = bird.scaleY = .5;
            bird.vx = Math.random() > .7 ? ( 1 + Math.random() * 3 ) * ( Math.random() > .5 ? 1 : -1 ) : 0;
            bird.vy = Math.random() > .7 ? ( 1 + Math.random() * 3 ) * ( Math.random() > .5 ? 1 : -1 ) : 0;
            bird.va = ( 1 + Math.random() * 3 ) * ( Math.random() > .5 ? 1 : -1 );
            this._contMotion.addChild( bird );
            this._vcBird.push( bird );
        }


        this._bmpSnap = new egret.Bitmap;
        this._bmpSnap.x =L1.GAP_UNIFIED;
        this._bmpSnap.y = this._contMotion.y + L1.H_CLIP + L1.GAP_UNIFIED;
        this.addChild(this._bmpSnap);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
             /*** 本示例关键代码段开始 ***/
             var rt:egret.RenderTexture = new egret.RenderTexture;
             rt.drawToTexture(this._contMotion,this._rectClip);
             this._bmpSnap.texture = rt;
             /*** 本示例关键代码段结束 ***/
        },this)
    }


}

/// 包含运动速度的位图
class MotionBMP extends egret.Bitmap{
    public vx:number;       /// x速度
    public vy:number;       /// y速度
    public va:number;       /// 角速度
}

/// 布局定义
class L1{
    public static GAP_UNIFIED:number = 50;
    public static W_CLIP:number ;
    public static H_CLIP:number ; 
}