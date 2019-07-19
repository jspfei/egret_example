class Main17 extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    
     private onAddToStage(event:egret.Event) {
        this.runGame().catch(e=>{})
     }

    private async runGame(){
        await this.loadRescource()
        this.creatScreen();
        
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

    private creatScreen(){
        var data = RES.getRes("writing_json");
        var txtr = RES.getRes("writing_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,txtr);
        var role:egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("gif5"));
        this.addChild(role);
        role.gotoAndPlay(1, 12); 
        role.x = 300;
        role.y = 600;
        role.frameRate = 48;


 

        this.createBitmapByName1("DaTouCai_json.DaTouCai3",100,200);
    }

    private createBitmapByName1(name:string, x:number, y:number):void {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
       
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        result.x = x;
        result.y = y;
        this.addChild(result);
    }
}