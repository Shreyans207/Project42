var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = 1;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png")

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  score = 0;
  fruitGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw() { 
  background(0);

  if(gameState===1){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") && player.y > 300) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.7;

    text("Score : " + score,300,50);

    if(ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(fruitGroup.isTouching(player)){
      fruitGroup.destroyEach();
      score = score + 2;
      player.scale = player.scale + 0.005;
    }

    if(obstacleGroup.isTouching(player)){
      player.scale = 0.1;  
     }  
     if(obstacleGroup.isTouching(player) && player.scale === 0.1){
       gameState = 2;
     }

   }
   else if(gameState === 2){
    player.visible = false;
    ground.visible = false;
    backgr.visible = false;
    obstacle.visible = false;
    banana.visible = false;
    obstacleGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);

    text("Score : " + score,300,50);
    textSize(30);
    stroke("white");
    text("Game Over !!",300,200)
   }
    player.collide(ground);

   Banana();
   Enemy();
  drawSprites();


function Banana(){
  if(frameCount%200 === 0){
    banana = createSprite(820,player.y - 30,10,10);
    banana.addAnimation("fruit",bananaImage);
    banana.scale = 0.08;
    banana.y = Math.round(random(120,200));
    banana.velocityX = -4;
    banana.lifetime = 200;
    
    fruitGroup.add(banana);
  } 
}

function Enemy(){
  if(frameCount%270 === 0){
    obstacle = createSprite(820,330,10,10);
    obstacle.addAnimation("rock",obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    obstacle.velocityX = -6;
    
    obstacleGroup.add(obstacle);
  } 
}
}
