var indo;
var raptor;
var scorpio, scorpius_img;
var trex;
var bg_img, bg;
var mercenary;
var merc_img;
var edges;
var ground;
var ground_img;
var eatscorpio, eatscorpio_img;
var heli, heli_img;

var isGameOver = false;


function preload() {

  bg_img = loadImage("assets/nublar.png");

  scorpius_img = loadImage("assets/scorpius.png");
  merc_img = loadAnimation("assets/merc1.png", "assets/merc2.png", "assets/merc3.png");
  ground_img = loadImage("assets/ground.png");
  eatscorpio_img = loadImage("assets/eatscorpio.png");
  heli_img = loadImage("assets/heli.png")
}

function setup() {
  createCanvas(1900,1000);
  
  bg = createSprite(800,500,20,20);
  bg.addImage(bg_img);
  bg.scale = 0.4;

  scorpio = createSprite(400,600,50,80);
  scorpio.addImage(scorpius_img);
  scorpio.scale = 0.7;
  scorpio.velocityX = 2;

  mercenary = createSprite(1100,600,50,70);
  mercenary.addAnimation("merc", merc_img);
  mercenary.scale = 3

  ground = createSprite(800,990,330,110);
  ground.addImage(ground_img);
  ground.visible = true;
  ground.scale = 0.3

  heli = createSprite(1600,600,50,70);
  heli.addImage(heli_img);
  heli.scale = 0.5

  edges = createEdgeSprites();

  scorpio.setCollider("circle",200,90,300);
  scorpio.debug = true

  heli.setCollider("circle",-150,100,300);
  heli.debug = true
  
}

function draw() {
  background(255,255,255);  

  if(keyIsDown(RIGHT_ARROW)) {
    mercenary.position.x = mercenary.position.x + 8
  }

  if(keyDown("space") && mercenary.y > 160) {
    mercenary.velocityY = -9
  }

  if(scorpio.isTouching(mercenary)) {
    mercenary.visible = false; 
    scorpio.changeImage(eatscorpio_img);
    scorpio.velocityX = 0;
  }

  if(heli.isTouching(mercenary)) {
    mercenary.visible = false;
    scorpio.velocityX = 0;
    heli.velocityY = -3;
 
  }

  mercenary.velocityY = mercenary.velocityY + 2

  mercenary.collide(edges);
  mercenary.collide(ground);

  drawSprites();

  
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}