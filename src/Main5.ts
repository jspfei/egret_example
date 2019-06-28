/**
 * @copyright www.egret.com
 * @author dily
 * @desc 显示对象的深度管理。
 *      点击不同白鹭小鸟提升到最上层。
 */

class Main5 extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    
    private onAddToStage(){
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

        this.runGame().catch(e=>{

        })
    }

    private async runGame(){
        await this.loadResource()
        this.createGameScene()
    }

    private async loadResource(){
        try {
            await RES.loadConfig("resource/default.res.json","resource/")
            await RES.loadGroup("preload")

           
        } catch (error) {
            
        }
    }

    private createBitmapByName(name:string){
        let result = new  egret.Bitmap();
        let texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private _txInfo:egret.TextField;

    private createGameScene(){

        let upBird = this.createBird(0);
        this.addChild(upBird)

        let leftBird = this.createBird(-150);
        this.addChild(leftBird);

        let rightBird = this.createBird(150);
        this.addChild(rightBird);

        upBird.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.setChildIndex(upBird,this.numChildren -1);
        },this)

        leftBird.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.setChildIndex(leftBird,this.numChildren -1);
        },this)

        rightBird.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.setChildIndex(rightBird,this.numChildren -1);
        },this)

        //提示信息
        this._txInfo = new egret.TextField;
        this._txInfo.size = 28;
        this._txInfo.textAlign = egret.HorizontalAlign.CENTER;
        this._txInfo.textColor = 0x843900;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.text = "点击不同白鹭小鸟提升到最上层。";
        this._txInfo.x = this.stage.stageWidth/2 - this._txInfo.width/2;
        this._txInfo.y = 10;
        this.addChild(this._txInfo);
    }

    private createBird(devx:number){
        let bird = this.createBitmapByName("cartoon-egret_00_png");
        bird.x = this.stage.stageWidth / 2 - bird.width /2 +devx;
        bird.y = this.stage.stageHeight/2 - bird.height/2;
        bird.touchEnabled = true;
        bird.pixelHitTest = true;
        return bird;
    }
}