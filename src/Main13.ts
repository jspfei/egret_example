// TypeScript file
class Main13 extends egret.DisplayObjectContainer{
   
   private static NUM:number = 32;
   private static SCALE_BASE:number = 0.5;
   private static SCALE_RANGE:number = 0.5;
    
    constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(){
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

    private _vcBird:Array<egret.Bitmap>;/// 所有的白鹭小鸟存下引用，便于管理
    private _vcMotion:Array<number>; /// 当前运动的小鸟索引
    private _iMotionMode:number;//运动模式
    private _nScaleBase:number;//缩放比例基数
    private _txInfo:egret.TextField;//文本提示
    private _bgInfo:egret.Shape;//文本提示信息背景
    private _rectScope:egret.Rectangle; /// 小鸟出现的范围（确保不出屏幕）

    private createGameScene(){
        var bmd = this.createBitmapByName("cartoon-egret_01_small_png");
   
        var wHalfBird:number = bmd.width/2;
        var hHalfBird:number = bmd.height/2;

        this._rectScope = new egret.Rectangle(
              wHalfBird * Main13.SCALE_BASE, hHalfBird * Main13.SCALE_BASE
            , this.stage.stageWidth - wHalfBird * Main13.SCALE_BASE * 2
            , this.stage.stageHeight - hHalfBird * Main13.SCALE_BASE * 2 
        );

        this._vcBird = new Array<egret.Bitmap>();

        for (var i = 0; i< Main13.NUM;++i){
            var bird:egret.Bitmap = this.createBitmapByName("cartoon-egret_01_small_png")

            bird.anchorOffsetX = wHalfBird;
            bird.anchorOffsetY = hHalfBird;

            bird.x = this._rectScope.x + this._rectScope.width * Math.random();
            bird.y = this._rectScope.y + this._rectScope.height * Math.random();

            bird.scaleX = bird.scaleY = Main13.SCALE_BASE;

            this._vcBird.push(bird);
            this.addChild(bird);

        }

         /// 提示信息
        this._txInfo = new egret.TextField;
        this.addChild( this._txInfo );

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
        //this._txInfo.background = true;
        //this._txInfo.backgroundColor = 0xffffff;
        this._txInfo.text =
            "轻触以改变运动的小鸟及运动模式，观察不同的小鸟变化对应的脏矩形变化";


        this._bgInfo = new egret.Shape;
        this.addChild(this._bgInfo);

         this._bgInfo.x = this._txInfo.x;
        this._bgInfo.y = this._txInfo.y;
        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill( 0xffffff, .5 );
        this._bgInfo.graphics.drawRect( 0, 0, this._txInfo.width, this._txInfo.height );
        this._bgInfo.graphics.endFill();
        this._bgInfo.cacheAsBitmap = true;

        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.plantRdmMotion();
        },this)

        this.plantRdmMotion();

        this._nScaleBase = 0;

        this.stage.addEventListener(egret.Event.ENTER_FRAME,(evt:egret.Event)=>{
            switch(this._iMotionMode){
                case MotionMode.ROT:
                    this._vcBird[this._vcMotion[0] ].rotation +=3;
                    this._vcBird[this._vcMotion[1] ].rotation -=3;
                    this._vcBird[this._vcMotion[2] ].rotation +=3;
                    var scale:number = Main13.SCALE_BASE + Math.abs( Math.sin( this._nScaleBase += 0.03 )) * Main13.SCALE_RANGE;
                    this._vcBird[this._vcMotion[0]].scaleX = this._vcBird[this._vcMotion[0]].scaleY = scale;    
                    this._vcBird[this._vcMotion[1]].scaleX = this._vcBird[this._vcMotion[1]].scaleY = scale;    
                    this._vcBird[this._vcMotion[2]].scaleX = this._vcBird[this._vcMotion[2]].scaleY = scale;    
   
                break;
                case MotionMode.MOV:
                    var xTo:number;
                    if((xTo = this._vcBird[this._vcMotion[0]].x-3) < this._rectScope.left){
                        xTo = this._rectScope.right;
                    }
                    this._vcBird[this._vcMotion[0]].x = xTo;
                    if((xTo = this._vcBird[this._vcMotion[1]].x-3) < this._rectScope.right){
                        xTo = this._rectScope.left;
                    }
                    this._vcBird[this._vcMotion[1]].x = xTo;
                    if((xTo = this._vcBird[this._vcMotion[2]].x-3) < this._rectScope.left){
                        xTo = this._rectScope.right;
                    }
                    this._vcBird[this._vcMotion[2]].x = xTo;
                break;
            }
        },this)
    }

    private plantRdmMotion(){
        //随机一个运动模式
        this._iMotionMode = Math.random() >.5?0:1;
        //还原比例
        if(this._vcMotion && this._vcMotion.length ==3){
            this._vcBird[ this._vcMotion[0] ].scaleX = this._vcBird[ this._vcMotion[0] ].scaleY = Main13.SCALE_BASE;
            this._vcBird[ this._vcMotion[1] ].scaleX = this._vcBird[ this._vcMotion[1] ].scaleY = Main13.SCALE_BASE;
            this._vcBird[ this._vcMotion[2] ].scaleX = this._vcBird[ this._vcMotion[2] ].scaleY = Main13.SCALE_BASE;
       
        }

        this.setChildIndex(this._txInfo,this.numChildren -1);
        this.setChildIndex(this._bgInfo,this.numChildren -1);

        this._vcMotion = new Array<number>();
        this._vcMotion.push(Math.floor(Main13.NUM * Math.random()))
        this._vcMotion.push(Math.floor(Main13.NUM * Math.random()))
        this._vcMotion.push(Math.floor(Main13.NUM * Math.random()))
        this.setChildIndex(this._vcBird[this._vcMotion[0]],this.numChildren -3);
        this.setChildIndex(this._vcBird[this._vcMotion[1]],this.numChildren -4);
        this.setChildIndex(this._vcBird[this._vcMotion[2]],this.numChildren -5);


    }

}

class MotionMode{
    public static ROT:number = 0; 
    public static MOV:number = 1; 
}