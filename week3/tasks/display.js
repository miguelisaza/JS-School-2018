function displayArray(arr, id){
    for(i=0; i<arr.length; i++){
        document.getElementById(id).innerHTML += `${arr[i]}, `
    }
}
