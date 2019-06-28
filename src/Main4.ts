/**
 * 添加和删除显示对象
 */

class Main4 extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(evt: egret.Event) {
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

        this.runGame().catch(e => {

        })
    }

    private async runGame() {
        await this.loadResource();
        this.createGameScene();
    }
    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/")
            await RES.loadGroup("preload")
        } catch (e) {

        }
    }
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private _txInfo: egret.TextField;

    private createGameScene() {

        /** 使用shape 和 graphics  */
        let upLeft = this.createShape(0, 0, 0xf7acbc);
        this.addChild(upLeft);

        let upRight = this.createShape(this.stage.stageWidth / 2, 0, 0xdeab8a);
        this.addChild(upRight);

        let downLeft = this.createShape(0, this.stage.stageHeight / 2, 0xef5b9c);
        this.addChild(downLeft);

        let downRight = this.createShape(this.stage.stageWidth / 2, this.stage.stageHeight / 2, 0xfedcbd);
        this.addChild(downRight);

        //初始化四个白鹭
        let upLeftBird = this.createBitmapByName("cartoon-egret_00_png");
        upLeftBird.x = upLeft.x + upLeft.width / 2 - upLeftBird.width / 2;
        upLeftBird.y = upLeft.y + upLeft.height / 2 - upLeftBird.height / 2;


        let upRightBird = this.createBitmapByName("cartoon-egret_00_png");
        upRightBird.x = upRight.x + upRight.width / 2 - upRightBird.width / 2;
        upRightBird.y = upRight.y + upRight.height / 2 - upRightBird.height / 2;

        let downLeftBird = this.createBitmapByName("cartoon-egret_00_png");
        downLeftBird.x = downLeft.x + downLeft.width / 2 - downLeftBird.width / 2;
        downLeftBird.y = downLeft.y + downLeft.height / 2 - downLeftBird.height / 2;

        let downRightBird = this.createBitmapByName("cartoon-egret_00_png");
        downRightBird.x = downRight.x + downRight.width / 2 - downRightBird.width / 2;
        downRightBird.y = downRight.y + downRight.height / 2 - downRightBird.height / 2;


        //监听事件
        upLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            if (this.contains(upLeftBird)) {
                this.removeChild(upLeftBird);
            } else {
                this.addChild(upLeftBird);
            }
        }, this)

        upRight.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            if (this.contains(upRightBird)) {
                this.removeChild(upRightBird);
            } else {
                this.addChild(upRightBird);
            }
        }, this)

        downLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            if (this.contains(downLeftBird)) {
                this.removeChild(downLeftBird);
            } else {
                this.addChild(downLeftBird);
            }
        }, this)

        downRight.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            if (this.contains(downRightBird)) {
                this.removeChild(downRightBird);
            } else {
                this.addChild(downRightBird);
            }
        }, this)


        //提示信息
        this._txInfo = new egret.TextField;
        this._txInfo.size = 28;
        this._txInfo.textAlign = egret.HorizontalAlign.CENTER;
        this._txInfo.textColor = 0x843900;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.text = "点击不同色块";
        this._txInfo.x = this.stage.stageWidth / 2 - this._txInfo.width / 2;
        this._txInfo.y = 10;
        this.addChild(this._txInfo)
    }

    private createShape(x: number, y: number, color: number) {
        let shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawRect(0, 0, this.stage.stageWidth / 2, this.stage.stageHeight / 2);
        shape.graphics.endFill();
        shape.touchEnabled = true; 
        shape.x = x;
        shape.y = y;
        return shape;
    }
}