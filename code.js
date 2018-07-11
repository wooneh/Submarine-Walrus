void setup() { 
  size(400, 400); 
} 
frameRate(30);
var Walrus = function(x,y){
    this.x = x;
    this.y = y;
    this.fishes = 0;
};
var time = 60;
var rotLeft = 0;
var rotRight = 0;

Walrus.prototype.draw = function() {
    noStroke();
    fill(133, 100, 17);
    ellipse(this.x-50/0.65,this.y-50/-7,50/0.35,50/0.7); // body
    ellipse(this.x,this.y,50,50); // head

    // telescope
    rect(this.x-50/15,this.y-50/0.82,50/4.6,50/1,10);
    rect(this.x,this.y-50/0.82,50/3,50/7);
    fill(223, 229, 230);
    ellipse(this.x+50/3.3,this.y-50/0.87,50/7,50/7);
    fill(133, 100, 17);
    rect(this.x-50/4.6,this.y-50/1.6,50/2,50/4);
    
    // windows
    fill(223, 229, 230);
    stroke(168, 145, 32);
    ellipse(this.x-50/0.53,this.y+50/7,50/2.8,50/2.8);
    ellipse(this.x-50/0.77,this.y+50/7,50/2.8,50/2.8);
    ellipse(this.x-50/1.4,this.y+50/7,50/2.8,50/2.8);

// propellors
    noStroke();
    fill(133, 100, 17);
    
    translate(this.x-50/0.36,this.y+50/10);
    rotate(rotLeft);
    ellipse(0,0,50/0.7,50/4);
    resetMatrix();
    
    translate(this.x+50/-0.36,this.y+50/10);
    rotate(rotRight);
    ellipse(0,0,50/4,50/0.7);
    resetMatrix();
    
// tusk
    fill(255, 255, 255);
    triangle(this.x+50/4,this.y+50/4,this.x+50/4,this.y+50/0.8,this.x    +50/2.3,this.y+50/4.5);
    
// eye
    fill(255, 255, 255);
    ellipse(this.x+50/7,this.y-50/7,50/3.5,50/3.5);
    fill(3, 3, 3);
    ellipse(this.x+50/4.6,this.y-50/7,50/7,50/7);
    
// moustache
    stroke(0, 0, 0);
    strokeWeight(2);
    noFill();
    arc(this.x+50/3.45,this.y-50/-7,50/2.2,50/5,0.87,3.49);
};

Walrus.prototype.fishCollect = function(fish) {
    if ((fish.x >= (this.x-25) && fish.x <= (this.x+25)) &&
        (fish.y >= (this.y-25) && fish.y <= (this.y+25)) && time >= 0) {
        fish.x = random(425,450);
        fish.y = random(0,400);
        this.fishes += 1;
    }
};


var Fish = function(x, y, r, g, b) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
};

Fish.prototype.draw = function() {
noStroke();
fill(this.r,this.g,this.b);
ellipse(this.x,this.y,50,30);
triangle(this.x,this.y,this.x+50,this.y-10,this.x+50,this.y+10); 
stroke(0, 0, 0);
strokeWeight(5);
point(this.x-15,this.y-3);
};

var fishes = [];
for (var i = 0; i < 20; i++) {  
    fishes.push(new Fish(i * 40 + random(0,600), random(0, 400), random(0,255),random(0,255),random(0,255)));
}

var walrus = new Walrus(180,0);
    
void draw() {
background(0, 213, 255);
time -= 0.033;

if(mousePressed && mouseX > 330 && mouseX < 390 && mouseY > 10 && mouseY < 30){
	kongregate.stats.submit("Fishes Collected", walrus.fishes);
    walrus.fishes = 0;
	time = 60;
	fishes.length = 0;
	for (var i = 0; i < 20; i++) {  
    fishes.push(new Fish(i * 40 + random(0,600), random(0, 400), random(0,255),random(0,255),random(0,255)));
}
}
    walrus.y = mouseY;
    
    for (var i = 0; i < fishes.length; i++) {
    fishes[i].draw();
    fishes[i].x -= i + 1;
    walrus.fishCollect(fishes[i]);
    
    if (fishes[i].x < -50){
fishes[i].x += (425,450);
fishes[i].y = random(0,400);
}
    }
    
    walrus.draw();
    rotRight += 0.3;
    rotLeft += 0.3;
    
fill(255, 255, 0);
rect(330,10,60,20);
fill(255, 0, 0);
textSize(15);
text("Submit",360,20);
fill(0, 0, 0);
textAlign(CENTER,CENTER);
text("Time Left: " + round(time), 200,375);
textSize(20);
text("Score: "+ walrus.fishes, 200,350);

        if (time < 0){
            time = 0;
text("Game Over! \n Final Score: "+ walrus.fishes,200,200);

}

};
