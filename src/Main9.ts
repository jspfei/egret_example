// TypeScript file
class Main9 extends egret.DisplayObjectContainer{
    private _shape:egret.Shape;

    constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);

    }

    private onAddToStage(){
      this.runGame().catch(e =>{

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
     private createGameScene() {
           this.initGraphics();
          this.changeGraphics();
     }
    private initGraphics(){
        var shape: egret.Shape = this._shape = new egret.Shape();
        shape.x = this.stage.stageWidth / 2;
        shape.y = this.stage.stageHeight / 2;
        this.addChild(shape);

        var bitmap = this.createBitmapByName("cartoon-egret_00_png");
        this.addChild(bitmap);
        bitmap.width = 228;
        bitmap.height = 380;
        bitmap.x = shape.x - bitmap.width/2;
        bitmap.y = shape.y - bitmap.height/2;

        bitmap.mask = shape;
    }

    private changeGraphics(){
       var shape: egret.Shape = this._shape;

       var angle:number = 0;
       var i:number = 1;
       egret.startTick(function(timeStamp:number):boolean{
            changeGraphics(angle)
            angle +=1;
            if(angle >=360){
                angle = angle % 360;
                i *= -1;
            }

            return false;
       },this)

       function changeGraphics(angle:number){
           shape.graphics.clear();

           shape.graphics.beginFill(0x00ffff,1);
           shape.graphics.moveTo(0,0);
           shape.graphics.lineTo(200,0);
           shape.graphics.drawArc(0,0,200,0,angle * Math.PI /180,i==-1);
           shape.graphics.lineTo(0,0);
           shape.graphics.endFill();
       }
        
       
    }
}