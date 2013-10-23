PImage src;

void setup() {
  size(960,600);
  smooth(8);
}

void draw() {
	line(0,0,mouseX,mouseY);
}

void loadAndShow(String url){
    src = loadImage(url);
    image(src,0,0);
}
