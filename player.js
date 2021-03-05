class Player{
    constructor(){

        //create the players as static else the players are going to be acted upon by gravity
        // var option={
        //     isStatic:true
        // }
        this.body=Bodies.rectangle(100,100,50,100);
        World.add(world,this.body);
        this.score=0;
        this.index=0;
        this.name=null;
        //this.x=0
        //this.y=0
    }
    display(){
        rectMode(CENTER)
        fill("red")
        rect(this.body.position.x,this.body.position.y,20,20)
        
    }

    getPlayerCount(){
        var dbref=database.ref("playerCount")
        dbref.on("value",(data)=>{
            playerCount=data.val();
        })
    }

    updatePlayerCount(count){
        var dbref=database.ref("/");
        dbref.update({
            playerCount: count
        })
        
        
    }
    update(){
        var playerIndex="Players/player"+this.index
        database.ref(playerIndex).update({
            name:this.name,
            score:this.score,
            
          });
    }

    getLocation(){
        

    }

    static getPlayersInfo(){
        var dbref=database.ref("Players")
        dbref.on("value",(d)=>{
            allplayers=d.val()
        })
    }
    updateLocation(xPos,yPos){
        var playerIndex="Players/player"+this.index;
        database.ref(playerIndex).update({
            
            x:xPos,
            y:yPos
          });
    }
    
}