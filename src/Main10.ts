
class Main10 extends egret.DisplayObjectContainer {

	private shape:egret.Shape = new egret.Shape();

	public constructor() {
		super();

		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	private onAddToStage(){
		this.runGame().catch(e=>{})
	}

	private async runGame(){
		await this.loadResource()
		this.createGameScene()	
	}

	private async loadResource(){
		try {
			await RES.loadConfig("resource/default.res.json","resource/");
			await RES.loadGroup("preload");
		} catch (e) {
			
		}
	}

	private createGameScene(){
		this.initGraphics();
		this.changeGraphics();
	}

	private initGraphics(){
		let shape:egret.Shape = this.shape;
		this.addChild(shape);

		this.drawCircle(this.stage.stageWidth/2,this.stage.stageHeight/2);
	}

	private drawCircle(x:number,y:number){
		var shape:egret.Shape = this.shape;
		shape.graphics.beginFill(0xff0000 + Math.floor(Math.random()*100)* (0xffffff / 100), 1);
		shape.graphics.lineStyle(2,0xff0000 + Math.floor(Math.random()*100)* (0xffffff / 100));
		shape.graphics.drawCircle(x,y,Math.random()*50 + 50);
		shape.graphics.endFill();
	}

	private changeGraphics(){
		this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent) =>{
			this.drawCircle(e.stageX,e.stageY);
		},this)
	}
}
