
status = "";
alarm = "";
objects = [];

function preload() {
   alarm = loadSound("alarm.mp3") ;
}
function setup() {
   canvas = createCanvas(380 , 380);
   canvas.center();

   video = createCapture(VIDEO);
   video.hide();
   video.size(380 , 380);

   objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
   document.getElementById("status").innerHTML = "STATUS : Detecting Objects";
}
function draw() {
   image(video , 0 , 0 , 380 , 380);

   if (status != "") {
      objectDetector.detect(video , gotResult);
      for ( i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "STATUS = Objects Detected";
         
          r = random(255) ;
          g = random(255) ;
          b = random(255) ;

          percent = floor(objects[i].confidence*100);
          fill(r , g, b);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15 , objects[i].y + 15);
          noFill();
          stroke(r , g , b);
          rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

          if (objects[i].label == "person") {
           document.getElementById("result").innerHTML = "Baby is Detected";
           alarm.stop();
          } else {
           document.getElementById("result").innerHTML = "Baby is not Detected screams aggrsivly";
           alarm.play();
          }
      }
      if (objects.length == 0) {
         document.getElementById("result").innerHTML = "Baby is not Detected screams aggrsivly";
         alarm.play();
        }
   }
}

function modelLoaded() {
    console.log("model is loaded");
    status = true;
}

function gotResult(error , results) {
   if(error) {
      console.log(error);
   } else {
      console.log(results);
      objects = results;
   }
}