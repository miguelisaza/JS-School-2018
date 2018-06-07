console.log("arrays-01.js")
var numbers = [5, 2, 65, 8, 1, 25, 45, 6, 655, 9, 95, 36, 4, 87, 64];

console.log(numbers)
displayArray(numbers, "js1-unsorted");

var sorted = numbers.sort((a, b) => a-b); // a-b in function in order to return value-based sorting, not first-number based

console.log(sorted)
displayArray(sorted, "js1-sorted");