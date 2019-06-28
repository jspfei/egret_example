/**
 * Mask 遮罩
 */

class Main3 extends egret.DisplayObjectContainer{

    private _shpBeMask:egret.Shape;
    private _bird:egret.Bitmap;
    private _txInfo:egret.TextField;
    
    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
    }
    //加载界面完成入口方法
    private onAddToStage(evt:egret.Event){
          egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e =>{
            console.log(e)
        })
    }
    //异步加载资源和界面
    private async runGame(){
        await this.loadResource();
        this.createGameScene();
    }
    //异步加载资源
    private async loadResource(){
        try {
            await RES.loadConfig("resource/default.res.json","resource/");
            await RES.loadGroup("preload");
        } catch (error) {
            console.error(error);
        }
    }
    //根据图片名创建图片
    private createBitmapByName(name:string){
        let result = new egret.Bitmap();
        let texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    //创建界面组件
    private createGameScene(){
        //用义被遮罩的形状
        this._shpBeMask = new egret.Shape;
        this._shpBeMask.graphics.lineStyle(0x000000);
        this._shpBeMask.graphics.beginFill(this.getRdmClr());
        this._shpBeMask.graphics.drawEllipse(0,0,200,200);
        this._shpBeMask.graphics.endFill();
        this._shpBeMask.x = ( this.stage.stageWidth -200) / 2;
        this._shpBeMask.y = ( this.stage.stageHeight -300) / 2;
        this.addChild(this._shpBeMask);

        this._bird = this.createBitmapByName("cartoon-egret_00_png");
        let wHalfBird:number = this._bird.width / 2;
        let hHalfBird:number = this._bird.height / 2;
        this._bird.anchorOffsetX = wHalfBird;
        this._bird.anchorOffsetY = hHalfBird;

        this._bird.x = wHalfBird + ( this.stage.stageWidth - wHalfBird * 2 ) * Math.random() ;
        this._bird.y = hHalfBird + ( this.stage.stageHeight - hHalfBird * 2 ) * Math.random() ;
        this.addChild( this._bird );

        this._txInfo = new egret.TextField;
        this.addChildAt(this._txInfo,0);

        this._txInfo.size = 28;
        this._txInfo.x = 50;
        this._txInfo.y = 50;
        this._txInfo.width = this.stage.stageWidth - 100;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type  = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.touchEnabled = true;
        this._txInfo.text = 
        "接触屏幕后白鹭小鸟将变为椭圆形状的遮罩区域，可以移动手指（白鹭小鸟）并观察椭圆在遮罩下的显示变化";

        this.launchMask();

   }
   //监听touch
   private launchMask(){
       this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandler,this);
   }
   //更新bird 位置
   private updateBird(stageX:number,stageY:number){
       this._bird.x = stageX;
       this._bird.y = stageY;
   }
   //touch触发管理
   private touchHandler(evt:egret.TouchEvent){
       switch(evt.type){
            case egret.TouchEvent.TOUCH_MOVE:
                //移动过程中更新bird 位置
                this.updateBird(evt.stageX,evt.stageY);
                break;
            case egret.TouchEvent.TOUCH_BEGIN:
                //监听Move
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
                this.stage.once(egret.TouchEvent.TOUCH_END,this.touchHandler,this);
                this._shpBeMask.mask = this._bird;
                this.updateBird(evt.stageX,evt.stageY);
           
                break;
            case egret.TouchEvent.TOUCH_END:
                //删除move 重新监听 begin
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandler,this);

                this._shpBeMask.mask = null;
                this._bird.$maskedObject = null;
                break;
       }
   }
    private getRdmClr(){
        return (Math.floor( Math.random() * 0xff ) << 16)
        + (Math.floor ( Math.random() * 0xff) << 8)
        + (Math.floor ( Math.random() * 0xff));
    }
}