// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

let myCurrentIndex = -1;

window.addEventListener("load", function () {
    console.log("Window Loaded");

}, false);

function nextPhoto() {
    if (myCurrentIndex !== myImages.length - 1) {
        myCurrentIndex++;
    } else {
        myCurrentIndex = 0;
    }

    $("#photo").attr("src", myImages[myCurrentIndex].imgPath);
    $("div.details").find(".location").text(myImages[myCurrentIndex].imgLocation);
    $("div.details").find(".description").text(myImages[myCurrentIndex].description);
    $("div.details").find(".date").text(myImages[myCurrentIndex].date);
}

function prevPhoto() {
    if (myCurrentIndex > 0) {
        myCurrentIndex--;
    } else {
        myCurrentIndex = myImages.length - 1;
    }

    $("#photo").attr("src", myImages[myCurrentIndex].imgPath);
    $("div.details").find(".location").text(myImages[myCurrentIndex].imgLocation);
    $("div.details").find(".description").text(myImages[myCurrentIndex].description);
    $("div.details").find(".date").text(myImages[myCurrentIndex].date);
}

function swapPhoto() {

    if (myCurrentIndex < myImages.length - 1) {
        myCurrentIndex++;
    } else {
        myCurrentIndex = 0;
    }

    $("#photo").attr("src", myImages[myCurrentIndex].imgPath);
    $("div.details").find(".location").text(myImages[myCurrentIndex].imgLocation);
    $("div.details").find(".description").text(myImages[myCurrentIndex].description);
    $("div.details").find(".date").text(myImages[myCurrentIndex].date);
}

$(document).ready(function () {

    $("div.details").eq(0).hide();

    $("#photo").width(518);
    $("#photo").height(398);

    $("#moreIndicator").click(function() {
        if ($("#moreIndicator").hasClass("rot90")) {
            $("#moreIndicator").removeClass("rot90");
            $("div.details").fadeToggle("fast");
            $("#moreIndicator").addClass("rot270");
        } else {
            $("#moreIndicator").removeClass("rot270");
            $("div.details").fadeToggle("fast");
            $("#moreIndicator").addClass("rot90");
        }
    });

    $("#nextPhoto").click(function() {
        nextPhoto();
    });

    $("#prevPhoto").click(function() {
        prevPhoto();
    });
});

function GalleryImage(imgLocation, description, date, imgPath) {
    this.imgLocation = imgLocation;
    this.description = description;
    this.date = date;
    this.imgPath = imgPath;
}

let myRequest = new XMLHttpRequest();

let myUrl = "images.json";

let myImages = [];

myRequest.onreadystatechange = function() {
    if (myRequest.readyState === 4 && myRequest.status === 200) {
        try {
            let myJson = JSON.parse(myRequest.responseText);
            console.log(myJson);

            for (let i = 0; i < myJson.images.length - 1; i++) {
                let imageToAdd = new GalleryImage(myJson.images[i].imgPath, myJson.images[i].imgLocation, myJson.images[i].description, myJson.images[i].date);
                imageToAdd.imgPath = myJson.images[i].imgPath;
                imageToAdd.imgLocation = myJson.images[i].imgLocation;
                imageToAdd.description = myJson.images[i].description;
                imageToAdd.date = myJson.images[i].date;
                myImages.push(imageToAdd);
                console.log(myImages);
            }

        } catch (error) {
            console.log(error.message);
        }
    }
};

function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    let params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }
    return params;
}

let GET = getQueryParams(document.location.search);

console.log(myRequest);

myRequest.open("GET", myUrl, true);
myRequest.send();
