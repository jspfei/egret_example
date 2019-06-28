
class Main2 extends egret.DisplayObjectContainer {
	
	 /// 旋转及缩放步长设定
    private static STEP_ROT:number = 3;
    private static STEP_SCALE:number = 0.03;
	
	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	
	private onAddToStage(event:egret.Event){
		egret.lifecycle.addLifecycleListener((context) =>{
			context.onUpdate = () =>{

			}
		})

		egret.lifecycle.onPause = () => {
			egret.ticker.pause()
		}

		egret.lifecycle.onResume = () =>{
			egret.ticker.resume();
		}

		this.runGame().catch(e =>{
			console.log(e)
		})
	}

	private async runGame(){
		await this.loadResource();
		this.createGameScene()
	}

	private async loadResource(){
		try{
			const loadingView = new LoadingUI();
			this.stage.addChild(loadingView);
			await RES.loadConfig("resource/default.res.json","resource/");
			await RES.loadGroup("preload",0,loadingView);
			this.stage.removeChild(loadingView);
		}
		catch(e){
			console.error(e);
		}
	}

	private createBitmapByName(name:string){
		let result = new egret.Bitmap();
		let texture: egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}

	private _bird:egret.Bitmap;
	private _txInfo:egret.TextField;

	private createGameScene(){

		this._bird = this.createBitmapByName("cartoon-egret_00_png");
		this.addChild(this._bird);

		this._bird.anchorOffsetX = this._bird.width * .5;
		this._bird.anchorOffsetY = this._bird.height * .5;
		this._bird.x = this.stage.stageWidth * 0.5;
		this._bird.y = this.stage.stageHeight * 0.618;

		//提示信息
		this._txInfo = new egret.TextField;
		this.addChild( this._txInfo );

		this._txInfo.size = 28;
		this._txInfo.x = 50;
		this._txInfo.y = 50;
		this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
		this._txInfo.textColor = 0x000000;
		this._txInfo.type = egret.TextFieldType.DYNAMIC;
		this._txInfo.lineSpacing = 6;
		this._txInfo.multiline = true;

	   this.launchAnimations();
	}

	//用于记录当前的模式，模式气候通过触发舞台触发
	private _iAnimMode:number;
	private _nScaleBase:number;

	private launchAnimations(){

		this._iAnimMode = AnimModes.ANIM_ROT;
		this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,() =>{
			this._iAnimMode = (this._iAnimMode + 1) % 3;
		},this);

		this._nScaleBase = 0;

		this.addEventListener(egret.Event.ENTER_FRAME,(evt:egret.Event) =>{

			switch(this._iAnimMode){
				case AnimModes.ANIM_ROT:
					this._bird.rotation += Main2.STEP_ROT;
				case AnimModes.ANIM_SCALE:
					this._bird.scaleX = this._bird.scaleY = 0.5 + 0.5 * Math.abs( Math.sin(this._nScaleBase += Main2.STEP_SCALE));
			}

			this._txInfo.text = 
                  "旋转角度:" + this._bird.rotation 
                +"\n缩放比例:" + this._bird.scaleX.toFixed(2)
                +"\n\n轻触进入" +(["缩放","静止","旋转"][this._iAnimMode])+ "模式";
            
            return false;  /// 友情提示： startTick 中回调返回值表示执行结束是否立即重绘
		},this);
	}
}

 class AnimModes{
	public static ANIM_ROT:number = 0;
	public static ANIM_SCALE:number = 1;
}
