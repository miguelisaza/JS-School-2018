console.log("storage-01.js")
function save(){
    'use strict';
    var text = document.getElementById('textInput').value;
    console.log(text);

    localStorage.setItem('text', text);
    document.getElementById('textOutput').innerHTML = localStorage.getItem('text')
}

message = localStorage.getItem('text');

if(message){
    console.log(message);
    document.getElementById('textOutput').innerHTML = message; 
}
else {
    document.getElementById('textOutput').innerHTML = "Nothing saved yet";
}