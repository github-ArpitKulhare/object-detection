img = "";
status = "";
object = [];

function setup() {
    canvas = createCanvas(400, 400);
    canvas.position(525, 150);
    video = createCapture(VIDEO);
    video.hide();
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded")
    status = true;
}

function gotResults(error, results) {
    if(error) {
        console.error(error);
    }
    console.log(results);

    object = results;
}

function draw() {
    image(video, 0, 0, 400, 400);

    if(status != "") {
        objectdetector.detect(video, gotResults)
        r =  random(255)
        g =  random(255)
        b =  random(255)
        for(i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status = Object Detected";
            document.getElementById("number_of_object").innerHTML = "Number of objects detected are = " + object.length;
            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + "" + percent + "%", object[i].x, object[i].y);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].hieght);
        }

    }
}