class Game{
    constructor(){
ballimg=loadImage("football-no-background.png")
player1img=loadImage("head-ball-2-characters-800x370-1.png")
player2img=loadImage("skull.png")
goalimg=loadImage("goal (1).png")
fieldimg=loadImage("soccerfield.png")
crowdimg=loadImage("stadiumcrowd.jpg")
rightgoalimg=loadImage("othergoal (1).png")
    }
    display(){

    }
    getState(){
        var gamestateref  = database.ref('gameState');
        gamestateref.on("value",function(data){
           gameState = data.val();
        })
    
      }
      update(state){
        database.ref('/').update({
          gameState: state
        });
      }
      start(){
        //background(crowdimg)
        player=new Player(1050,300);
        player2=new Player(150,300)

        player.getPlayerCount();
        form=new Form()
        form.display()
        ground=new Ground();
        ball = new Ball();
        crowd=createSprite(600,200,1200,400)
         crowd.addImage("c",crowdimg)
         crowd.scale=3
        field=createSprite(600,270,1900,20)
         field.addImage("f",fieldimg)
         field.scale=2.5

        //create the sprites and keep them ready - these will display the players' bodies later
        goal=createSprite(100,250,50,350)
        goal.addImage("g",goalimg)
        goal.scale=1.2
        rightgoal=createSprite(1100,250,50,350)
        rightgoal.addImage("rg",rightgoalimg)
       rightgoal.scale=1.2
        player1Sprite = createSprite(100,300,50,100);
         player1Sprite.shapeColor = "pink";
         player1Sprite.addImage("s",player1img)
         player2Sprite = createSprite(1100,100,50,100);
         player2Sprite.addImage("skull",player2img)
         player2Sprite.scale=1
      
        
        // player1Sprite.shapeColor = "blue";
        //to display the ball's body later on
        ballSprite=createSprite(600,0,40,40);
        ballSprite.shapeColor = "white";
        ballSprite.addImage("bal",ballimg)
         ballSprite.scale=0.07
        
      }

      play(){
        console.log(ball.body.position.x)
       
        form.hide();
        text("GAME HAS STARTED");
        Player.getPlayersInfo();
       // console.log(allplayers);

        Ball.getBallPosition();//this will fill data into the global variable ballPosition
        // ball.display()
        if(ballPosition!=undefined){
        //Matter.Body.setPosition(ball.body,{x:ballPosition.x,y:ballPosition.y});
        }
        

        if(allplayers!=undefined){
          background("green");
          ground.display();
          // ballSprite.x = ballPosition.x;
          // ballSprite.y = ballPosition.y;
          // ball.updateBallPosition(ball.body.position.x, ball.body.position.y);//updating the DB as per the ball's body

          for(var i in allplayers){
            //create each player sprite as per player1 and player2
            
            if(i==="player1"){
              player.updateLocation(player.body.position.x,player.body.position.y);
              
              player1Sprite.x = allplayers[i].x;
                 player1Sprite.y = allplayers[i].y; 
                 //ballSprite.x = ballPosition.x;
                 //ballSprite.y = ballPosition.y;
                
                // ball.updateBallPosition(ball.body.position.x, ball.body.position.y);//updating the DB as per the ball's body
      
              }
                 else if(i==="player2"){
                  player.updateLocation(player.body.position.x,player.body.position.y);
                  player2Sprite.x = allplayers[i].x;
                  player2Sprite.y = allplayers[i].y; 
                  // ballSprite.x = ballPosition.x;
                  // ballSprite.y = ballPosition.y;
                  // //Matter.Body.setPosition(ball.body,{x:ballPosition.x,y:ballPosition.y});
                  // ball.updateBallPosition(ball.body.position.x, ball.body.position.y);//updating the DB as per the ball's body
                  
                    }

                  ballSprite.x = ballPosition.x;
                  ballSprite.y = ballPosition.y;
                  //Matter.Body.setPosition(ball.body,{x:ballPosition.x,y:ballPosition.y});
                  ball.updateBallPosition(ball.body.position.x, ball.body.position.y);//updating the DB as per the ball's body
  
//player2Sprite.bounceOff(ballSprite)
             
          }
          //player1Sprite.collide(player2Sprite)
       
          
        }

        drawSprites();

        //changing the position of the player.body with the arrows
        if(keyDown(UP_ARROW)){
           Matter.Body.setPosition(player.body, {x:player.body.position.x, y:player.body.position.y-15})
            //player.body.position.y-=10 
            console.log(player.body.position.y)
             player.updateLocation(player.body.position.x,player.body.position.y);
             engine.world.gravity.y=3
             }

        // if(keyDown(DOWN_ARROW)){
        //   Matter.Body.setPosition(player.body, {x:player.body.position.x, y:player.body.position.y+10})
        //  // player.body.position.y+=10
        //   player.updateLocation(player.body.position.x,player.body.position.y);
        // }
        if(keyDown(RIGHT_ARROW)){
          Matter.Body.setPosition(player.body, {x:player.body.position.x+5, y:player.body.position.y})
          //player.body.position.x+=10
          player.updateLocation(player.body.position.x,player.body.position.y);
        }
        if(keyDown(LEFT_ARROW)){
          Matter.Body.setPosition(player.body, {x:player.body.position.x-5, y:player.body.position.y})
          //player.body.position.x-=10
          player.updateLocation(player.body.position.x,player.body.position.y);
        }
        // if(keyDown(SPACE)){
        //   Matter.Body.setPositio
        // }
        if(ball.body.position.x<100 && ball.body.position.y<250 && ball.body.position.y>150){
          for (var i in allplayers){
            if(i==="player1"){
              allplayers[i].score+=1
              player.update()
            }

          }
        }
        if(ball.body.position.x>1100 && ball.body.position.y<250 && ball.body.position.y>150){
          for (var i in allplayers){
            if(i==="player2"){
              allplayers[i].score+=1
              player.update()
            }

          }
        }



      }

}