var keyCodes = [81, 50, 87, 51, 69, 82, 53, 84, 54, 89, 55, 85, 67, 70, 86, 71, 66, 78, 74, 77, 75, 188, 76, 190]
var pianoKeys = document.getElementsByTagName('li');
var pianoKeysArr = Array.from(pianoKeys);
const keys = pianoKeysArr.map((key) => key.id);

document.onkeydown = function(event){
    var repeat = event.repeat; 
    var x = event.which || event.keyCode;
    var currentKey = codeToKey(x)
   
    // avoid repeating keystroke.
    if (repeat){
        return;
    }

    //avoid error message if off-piano key is pressed. 
    if (currentKey === null){
        return;
    }

    //console.log(currentKey);
    var audio = getKeyAudio(currentKey);

    animateKeyPress(currentKey);
    playKeyAudio(audio);

}

document.onkeyup = function(event){
    var x = event.which || event.keyCode;
    var currentKey = codeToKey(x)
    
    if (currentKey === null){
        return;
    }
    animateKeyRelease(currentKey);
}

document.onclick = function(event){
    audio = getKeyAudio(event.target);

    if (audio === null){
        return;
    }
    playKeyAudio(audio);

}

//returns muiscal key when keyboard key is passed
function codeToKey(kCode){

    var idx = activeKeyIdx(kCode);
    key = keys[idx];
    var currentKeyId = document.getElementById(key);
    return currentKeyId;
    
}

//adds "active" class when called
function animateKeyPress(currentKey){
    var className = currentKey.className;

    if (className.includes("white")){
        currentKey.className += " wa";
    }

    if (className.includes("black")){
        currentKey.className += " ba";
    }
};

//deletes "active" class when called
function animateKeyRelease(currentKey){
    var className = currentKey.className;
    currentKey.className = className.substr(0, className.length-3)

};

//returns audio of corresponding key
function getKeyAudio(key){
    sample = `sample-${key.id}`
    return document.getElementById(sample);
}

//plays key audio
function playKeyAudio(audio){
    audio.currentTime = 0;
    audio.play();    
}

// return matching index of passed key
function activeKeyIdx(k){
    return keyCodes.indexOf(k);
}