/**
 * @copyright www.egret.com
 * @author dily
 * @desc 区分两个不同的容器
 *      点击不同颜色按钮，将白鹭小鸟放到不同的容器中，拖动容器小鸟随着容器移动
 */

class Main6 extends egret.DisplayObjectContainer {

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

        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene()
    }

    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload")
        } catch (error) {

        }

    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private _txInfo: egret.TextField;
    private _leftTF: egret.TextField;
    private _rightTF: egret.TextField;

    private createGameScene() {

        //初始化白鹭
        let egretBird = this.createBitmapByName("cartoon-egret_00_png");
        egretBird.x = this.stage.stageWidth / 2 - egretBird.width / 2;
        egretBird.y = this.stage.stageHeight / 2 + 50;
        egretBird.anchorOffsetX = egretBird.width / 2;
        egretBird.anchorOffsetY = egretBird.height / 2;
        egretBird.scaleX = .8;
        egretBird.scaleY = .8;
        this.addChild(egretBird)
        egretBird.touchEnabled = false;

        //按钮生产代码
        this._leftTF = this.createBtn("红色容器", 0xd71345);
        this._leftTF.x = this.stage.stageWidth / 4 - this._leftTF.width / 2;
        this._leftTF.y = 120;
        this.addChild(this._leftTF);

        this._rightTF = this.createBtn("蓝色容器", 0x102b6a);
        this._rightTF.x = this.stage.stageWidth / 2 + this.stage.stageWidth / 4 - this._rightTF.width / 2;
        this._rightTF.y = 120;
        this.addChild(this._rightTF);

        //两个容器
        let leftCon = new egret.DisplayObjectContainer();
        this.addChild(leftCon);

        let leftCage = this.createCage(0xd71345);
        leftCon.addChild(leftCage);
        leftCon.x = this.stage.stageWidth / 4
        leftCon.y = 300;

        let rightCon = new egret.DisplayObjectContainer();
        this.addChild(rightCon);

        let rightCage = this.createCage(0x102b6a);
        rightCon.addChild(rightCage);
        rightCon.x = this.stage.stageWidth / 2 + this.stage.stageWidth / 4
        rightCon.y = 300;

        /// 提示信息
        this._txInfo = new egret.TextField;
        this._txInfo.size = 28;
        this._txInfo.width = 550;
        this._txInfo.textAlign = egret.HorizontalAlign.CENTER;
        this._txInfo.textColor = 0x000000;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.text = "点击不同颜色按钮，将白鹭小鸟放到不同的容器中，拖动容器小鸟随着容器移动";
        this._txInfo.x = this.stage.stageWidth / 2 - this._txInfo.width / 2;
        this._txInfo.y = 10;
        this.addChild(this._txInfo);

        this._leftTF.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            if (this.getChildIndex(egretBird) != -1) {
                this.removeChild(egretBird);
                leftCon.addChild(egretBird);
                egretBird.x = leftCage.width / 2 - egretBird.width / 2;
                egretBird.y = leftCage.height / 2 - egretBird.height / 2;
            } else if (rightCon.getChildIndex(egretBird) != -1) {
                rightCon.removeChild(egretBird);
                leftCon.addChild(egretBird);
                egretBird.x = leftCage.width / 2 - egretBird.width / 2;
                egretBird.y = leftCage.height / 2 - egretBird.height / 2;
            }


            leftCon.touchEnabled = true;
            rightCon.touchEnabled = false;
        }, this);

        this._rightTF.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            if (this.getChildIndex(egretBird) != -1) {
                this.removeChild(egretBird);
                rightCon.addChild(egretBird);
                egretBird.x = rightCage.width / 2 - egretBird.width / 2;
                egretBird.y = rightCage.height / 2 - egretBird.height / 2;
            } else if (leftCon.getChildIndex(egretBird) != -1) {
                leftCon.removeChild(egretBird);
                rightCon.addChild(egretBird);
                egretBird.x = rightCage.width / 2 - egretBird.width / 2;
                egretBird.y = rightCage.height / 2 - egretBird.height / 2;
            }


            leftCon.touchEnabled = false;
            rightCon.touchEnabled = true;

        }, this);

        //对应容器添加拖拽代码
        let leftDrag: boolean = false;
        let rightDrag: boolean = false;

        leftCon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            leftDrag = true;
        }, this)
        leftCon.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            leftDrag = false;
        }, this)
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) => {
            if(leftDrag){
                leftCon.x = e.stageX - leftCage.width/2;
                leftCon.y = e.stageY - leftCage.height/2;
            }
        }, this)


         rightCon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            rightDrag = true;
        }, this); 
        rightCon.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            rightDrag = false;
        }, this); 
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) => {
            if(rightDrag){
                rightCon.x = e.stageX - rightCage.width/2;
                rightCon.y = e.stageY - rightCage.height/2;
            }
        }, this); 

    }


    private createCage(color: any) {
        var cage = new egret.Shape();
        cage.graphics.lineStyle(10, color, 1, true)
        cage.graphics.lineTo(0, 0);
        cage.graphics.lineTo(250, 0);
        cage.graphics.lineTo(250, 250);
        cage.graphics.lineTo(0, 250);
        cage.graphics.lineTo(0, 0);
        cage.graphics.endFill();
        cage.width = 250;
        cage.height = 250;
        cage.anchorOffsetX = cage.width / 2;
        cage.anchorOffsetY = cage.height / 2;
        return cage;
    }
    private createBtn(text: string, color: any) {
        let tf = new egret.TextField;
        tf.size = 28;
        tf.textAlign = egret.HorizontalAlign.CENTER;
        tf.textColor = 0xffffff;
        tf.background = true;
        tf.backgroundColor = color;
        tf.text = text;
        tf.touchEnabled = true;
        return tf;
    }

}