PImage src;
float[][] data;
float rectWidth = 10;
float rectHeight = 30;
boolean isStrokeOn = true;
boolean isLooping = true;

void setup() {
  size(960,720);
  data = new float[width][height];
  genNoise(data);
  background(0);
}

void draw() {
    if(src != null){
        if(src.width != width) {
            src.resize(width,height);
        }
        for(int i = 0; i < uivars.renderSpeed; i++) {
            renderScene();
        }
    }
}

void renderScene(){
    int nX = (int) random(width);
    int nY = (int) random(height);
    float d = data[nX][nY];
    pushMatrix();
    int c = src.get(nX, nY);
    fill(c);
    if(isStrokeOn) {
        stroke(0);
        strokeWeight(0.25);}
    else {
        noStroke();
    }
    translate(nX, nY);
    rotate(map(d, 0, 1, -PI, PI));
    rectMode(CENTER);
    rect(0, 0, uivars.rectWidth, uivars.rectHeight);
    popMatrix();
}

void getIsLooping(){
    return isLooping;
}

void loadAndShow(String url){
    src = requestImage(url);
}

void toggleStroke(){
    isStrokeOn = !isStrokeOn;
}

void startStop(){
    isLooping = !isLooping;
    if(isLooping){
        loop();
    } else {
        noLoop();
    }

}


void genNoise() {
  float noiseScale = uivars.noiseDetail;
  noiseDetail(1, 0.5);
  for (int i = 0; i < data.length; i++) {
    for (int j = 0; j < data[i].length; j++) {
      data[i][j] = noise(j * noiseScale, i * noiseScale);
    }
  }
}