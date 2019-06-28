class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
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
            console.log(e);
        })


    }
    private async runGame() {
        await this.loadResource()
        this.createGameScene();

    }
    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    private _txInfo: egret.TextField;
    private _bgInfo: egret.Shape;

    private createGameScene() {

        //背景颜色
        let bgColor = new egret.Shape;
        bgColor.x = 0;
        bgColor.y = 0;
        bgColor.width = this.stage.stageHeight;
        bgColor.height = this.stage.stageHeight;
        bgColor.graphics.beginFill(0xffffff, 1);
        bgColor.graphics.drawRect(0, 0, this.stage.stageHeight, this.stage.stageHeight);
        bgColor.graphics.endFill();
        this.addChildAt(bgColor,0);
        

        let bird = this.createBitmapByName("cartoon-egret_00_png");
        //将已经加载的图片显示出来
        bird.x = 100;
        bird.y = 100;
        this.addChild(bird);

        //设置 bird 的锚点
        bird.anchorOffsetX = bird.width / 2;
        bird.anchorOffsetY = bird.height / 2;
        bird.x = this.stage.stageWidth * .5;
        bird.y = this.stage.stageHeight * .5;


        //提示信息
        this._txInfo = new egret.TextField;
        this.addChild(this._txInfo);

        this._txInfo.size = 28;
        this._txInfo.x = 50;
        this._txInfo.y = 50;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;

        this._txInfo.text = "轻触屏幕调整显示对象位置";

        this._bgInfo = new egret.Shape;
        this.addChildAt(this._bgInfo, this.numChildren - 1);

        this._bgInfo.x = this._txInfo.x;
        this._bgInfo.y = this._txInfo.y;
        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill(0xffffff, 0.5);
        this._bgInfo.graphics.drawRect(0, 0, this._txInfo.width, this._txInfo.height);
        this._bgInfo.graphics.endFill();

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt: egret.TouchEvent) => {
            bird.x = evt.localX;
            bird.y = evt.localY;
        }, this)

          

    }
}