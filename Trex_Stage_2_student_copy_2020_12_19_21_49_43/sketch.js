var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var restart, gameOver
var cloud
var PLAY = 1
var END = 0
var gameState = PLAY
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  obstacle1 = loadImage("obstacle1.png",) 
  obstacle2 = loadImage("obstacle2.png",) 
  obstacle3 = loadImage("obstacle3.png",) 
  obstacle4 = loadImage("obstacle4.png",) 
  obstacle5 = loadImage("obstacle5.png",) 
  obstacle6 = loadImage("obstacle6.png",) 
  
  cloudImage = loadImage("cloud.png")
  restart = loadImage("restart.png")
  gameOver = loadImage("gameOver.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  restartButton = createSprite(300, 100)
  restartButton.addImage("rB", restart)
  restartButton.scale = 0.5
  restartButton.visible = false
  
  gameOverT = createSprite(300, 100)
  gameOverT.addImage("gOT", gameOver)
  gameOverT.scale = 0.5
  gameOverT.visible = false
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  CloudsGroup = createGroup()
  ObstacleFamily = createGroup()
}

function draw() {
  background(100);
  trex.velocityY = trex.velocityY + 0.8
  if(gameState === PLAY){
    ground.velocityX = -2;
    if(keyDown("space") && trex.y <= 180) {
      trex.velocityY = -10;
    }

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    spawnObstacleFamily()
    spawnClouds() 
    if(trex.isTouching(ObstacleFamily)){
        gameState = END
    }
  }
  else if(gameState === END){
    ground.velocityX = 0
    trex.velocityY = 0
    ObstacleFamily.destroyEach()
    CloudsGroup.destroyEach()
    ObstacleFamily.setVelocityEach(0)
    CloudsGroup.setVelocityEach(0)
    trex.changeAnimation("collided",trex_collided)
    restartButton.visible = true
    gameOverT.visible = true
    
    ObstacleFamily.setLifetimeEach(-1)
    CloudsGroup.setLifetimeEach(-1)
    if(mousePressedOver(restartButton)){
      Reset()
    }
  }
  trex.collide(invisibleGround);
  drawSprites();
}
function spawnObstacleFamily() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,160,10,40);
    obstacle.velocityX = - 5
    
    //generate random obstacles
    var rand = Math.round(random(1, 6))
    switch(rand){
      case 1: obstacle.addImage(obstacle1)
              break;
      case 2: obstacle.addImage(obstacle2)
              break;
      case 3: obstacle.addImage(obstacle3)
              break;
      case 4: obstacle.addImage(obstacle4)
              break;
      case 5: obstacle.addImage(obstacle5)
              break;
      case 6: obstacle.addImage(obstacle6)
              break;
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 400
    //add each obstacle to the group
    ObstacleFamily.add(obstacle);
  }
} 
function spawnClouds(){
  if(frameCount % 30 === 0){
    var cloud = createSprite(800, 320, 40, 10)
    cloud.y = Math.round(random(80, 120))
    cloud.addImage(cloudImage)
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 400
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
 
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
}
function Reset(){
  ObstacleFamily.destroyEach()
  CloudsGroup.destroyEach()
  gameOverT.visible = false
  restartButton.visible = false
  gameState = PLAY
}