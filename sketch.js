var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood;
var foodObj;
var time;
var lastFed;

//create feed and lastFed variable here


function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  //create feed the dog button here
  feedDog = createButton("Feed Dog");
  feedDog.position(700, 95);
  feedDog.mousePressed(feedDogs);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46, 139, 87);
  foodObj.display();
  //write code to display text lastFed time here
  if(time >= 12){
    stroke('white');
    text("Last Fed: " + time +" AM", 350,30);
  }else if (time = 12) {
    stroke('white');
    text("Last Fed: 12 AM", 350,30);
  }else{
    stroke('white');
    text("Last Fed: " + time +" AM", 350,30);
  }
  drawSprites();
}

//function to read food Stock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDogs() {
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  //Food Stock
  time = hour();
  var foodSV = foodObj.getFoodStock();
  if (foodSV <= 0) {
    foodObj.updateFoodStock(foodSV * 0);
    foodS *= 0;
  } else {
    foodObj.updateFoodStock(foodSV - 1);
    foodS--;
  }
  database.ref('/').update({
    Food: foodS
  })
 //Last Fed Time
 database.ref('/').update({
  FeedTime: time
})
}

//function to add food in stock
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}