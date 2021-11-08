function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  clasifier = ml5.imageClassifier("MobileNet", modelLoaded)
}

function draw() {
  image(video,0,0,300,300);
  clasifier.classify(video, gotResult);
}

function modelLoaded(){
 console.log("modelLoaded");
}

var previous_result = '';

function gotResult(error, results){
   if(error){
     console.log(error);
   }
   else{
     if((results[0].confidence > 0.5) && (previous_result != results[0].label))
     {
      console.log(results);
      previous_result = results[0].label;
      var synth = window.speechSynthesis;
      speak_data = "Object detected is " +results[0].label;
      var utterthis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterthis);
      document.getElementById("result_object_name").innerHTML = results[0].label;
      document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
     }
   }
}



