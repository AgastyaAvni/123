
var rocket,rocketImg;

var backImg;

var count = 0;

var health=100;

var bulletSound;

var explode2Img ;

var enemy;
var enemyPlane;


var bullet,bulletImg;

var bulletGroup;

var enemyUfoGroup;
var gameState;

var planeEx;

var lineTop,lineRight,lineLeft,lineBottom;

function preload(){
 
  backImg=loadImage("space.gif")

  rocketImg=loadImage("rocket.png")   

  planeEx=loadImage("explodes.png")

  enemy=loadImage("ufo.png");
  
  bulletImg=loadImage("gun.png");

  explode2Img=loadImage("explode2.png")

  bulletSound=loadSound("BulletSound.mp3")

  explode1Sound=loadSound("explode1.mp3");

}

function setup() {
  createCanvas(1200,500);
   
  rocket=createSprite(900,200,20,20);
  rocket.scale=0.7
  rocket.addImage(planeImg);

  lineTop=createSprite(600,0,1200,10);
  lineBottom=createSprite(600,460,1200,10);
  lineBottom.visible=false;

  lineLeft=createSprite(0,250,10,500);
  lineRight=createSprite(1200,250,10,500);

  bulletGroup= createGroup();
  enemyUfoGroup = createGroup();
  gameState="play"

}





function draw() {

  background(backImg);

  //planeSound.play();

  if(gameState==="play"){
    fuel--;

    keyControl();

    die();

    
    for(var i=0;i< enemyUfoGroup.length; i++){
      if (enemyUfoGroup.get(i).isTouching(bulletGroup)){
        enemyUfoGroup.get(i).destroy();
        count++;
      }
    }
  

  scoreText()

  //making plane stop from going out of canvas
  rocket.collide(lineTop);
  rocket.collide(lineBottom);
  rocket.collide(lineRight);
  rocket.collide(lineLeft);

  airDrops();
  enemyPlanes();
  drawSprites();

  if(gameState==="end"){
    
    textSize(100);
    fill(random(50,160), random(20,190),random(100,200));
    stroke(random(50,160), random(20,190),random(100,200));
    strokeWeight(7)
    text("Game Over",300,200)
  }
}
}


function scoreText(){
  

  

function keyControl(){
  if(keyDown("S")){
    gameState==="play"
  }
  if(keyDown("up")){
    rocket.y-=8;
  }
  if (keyDown("down")){
    rocket.y+=8;
  }
  if (keyDown("right")){
    rocket.x+=6;
  }
  if(keyDown("left")){
    rocket.x-=6;
  }
  if(keyWentDown("space")){
    bullets();
    bulletsLeft--;
    bulletSound.play();
  }
}

function die(){
  if (plane.isTouching(enemyUfoGroup)){

    gameState="end";
    rocket.addImage(explode2Img);
    enemyUfoGroup.destroyEach();

  }

  //crashing on ground
  if(rocket.isTouching(lineBottom)){
    gameState="end"
    rocket.addImage(planeEx);

  }

  if (fuel===0){
    gameState="end";
    rocket.velocityY=5;
    fuel===0;
  }
}

function bullets (){

  var  bullet =   createSprite( plane.x,plane.y);
  bullet.velocityX= -30;
  bullet.addImage(bulletImg)
  bullet.scale=0.2;
  bulletGroup.add(bullet);
}


function enemyPlanesUfo(){

  if(frameCount % 180 === 0 ){
    enemyUfo=createSprite(-100,random(50,300))
    var r=Math.round(random(1,2));
    enemyUfoGroup.add(enemyUfo);
    enemyUfo.velocityX+=6;
    enemyUfo.scale=0.5;
  
    if(r===1){
      enemyUfo.addImage(enemy);
    }
  }
}

