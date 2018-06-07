console.log("time-01.js")
var startTime = new Date().getTime();

function setTime(){
    var secc = document.getElementById("inputTime").value
    var message = `Countdown timer set to ${secc} seconds.`

console.log(message)
document.getElementById("time").innerHTML = message

var timeLeft = startTime + (secc * 1000)

// Update the count down every 1 second
setInterval(function() {
    var now = new Date().getTime();  // Get todays date and time
       
    var distance = timeLeft - now; // Distance between epochs
      
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    var left = `${hours} hours ${minutes} minutes ${seconds} seconds left.`

    console.log(left)
    document.getElementById("timeLeft").innerHTML = left;
    
}, 1000);
}


