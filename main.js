status = "";
object = [];

function setup()
{
 canvas =  createCanvas(500,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(500, 300);

}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    name = document.getElementById("object_name").value;
}

function modelloaded()
{
    console.log("modelloaded");
    status = true;
}

function draw()
{
    image(video, 0, 0, 500, 300);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);

        for (var index = 0; index < object.length; index++) {
           document.getElementById("status").innerHTML = "Status : Detected"; 

           fill('#FF0000');
           stroke('#FF0000');
           noFill();
           percent  = floor(object[index].confidence*100);
           text(object[index].label+ " " +percent +"%", object[index].x, object[index].y);
           rect(object[index].x, object[index].y, object[index].width, object[index].height);

           if(objects[index].label == name)
           {
               video.stop();
               objectDetector.detect(gotResult);
               document.getElementById("status").innerHTML = name+ "found"
synth = window.speechSynthesis();
utterThis = new SpeechSynthesisUtterance(name+ "found");
synth.speak(utterThis);
           }
           else
           {
            document.getElementById("status").innerHTML = name+ "Not Found"
           }

        }
    }
}

function gotResult(error, results)
{
  if(error)
  {
      console.log(error);
  }
  else{
      console.log(results);
      object = results ;
      
  }
}

 