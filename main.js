gods_plan="";
on_and_on="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
gods_plan_status = ""
on_and_on_status = ""

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    gods_plan = loadSound("gods_plan.mp3");
    on_and_on = loadSound("on_and_on.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    gods_plan_status = gods_plan.isPlaying();
    console.log(gods_plan_status);

    on_and_on_status = on_and_on.isPlaying();
    console.log(on_and_on_status);

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        on_and_on.stop();
        if(gods_plan_status == false){
            gods_plan.play();
            document.getElementById("song_id").innerHTML = "Song Name: Gods Plan";
        }
    }

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,eftWrist_y,20);
        gods_plan.stop();
        if(on_and_on_status == false){
            on_and_on.play();
            document.getElementById("song_id").innerHTML = "Song Name: On and On";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}