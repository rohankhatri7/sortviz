// swap function util for sorting algorithms takes input of 2 DOM elements with .style.height feature
function swap(el1, el2) {    
    let temp = el1.style.height;    //third variable for swapping
    let tempText = el1.innerText;
    el1.style.height = el2.style.height;
    el1.innerText = el2.innerText;
    el2.style.height = temp;
    el2.innerText = tempText;
}

// Disables sorting buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSortingBtn(){
    document.querySelector(".bubbleSort").disabled = true;
    document.querySelector(".insertionSort").disabled = true;
    document.querySelector(".mergeSort").disabled = true;
    document.querySelector(".quickSort").disabled = true;
    document.querySelector(".selectionSort").disabled = true;
    document.querySelector(".heapSort").disabled = true;
}

function addMetadata(sortMetadata) {
    document.querySelector("#desc").innerHTML = sortMetadata.infoString;
    document.querySelector("#avg").innerHTML = sortMetadata.avgComp;
    document.querySelector("#best").innerHTML = sortMetadata.bestComp;
    document.querySelector("#worst").innerHTML = sortMetadata.worstComp;
    document.querySelector("#space").innerHTML = sortMetadata.spaceComp;
}

// Enables sorting buttons used in conjunction with disable
function enableSortingBtn(){
    document.querySelector(".bubbleSort").disabled = false;
    document.querySelector(".insertionSort").disabled = false;
    document.querySelector(".mergeSort").disabled = false;
    document.querySelector(".quickSort").disabled = false;
    document.querySelector(".selectionSort").disabled = false;
    document.querySelector(".heapSort").disabled = false;
}

// Disables size slider used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSizeSlider(){
    document.querySelector("#size_input").disabled = true;
}

function disableSpeedSlider(){
    document.querySelector("#speed_input").disabled = true;
}

function enableSpeedSlider(){
    document.querySelector("#speed_input").disabled = false;
}

// Enables size slider used in conjunction with disable
function enableSizeSlider(){
    document.querySelector("#size_input").disabled = false;
}

// Disables newArray buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableNewArrayBtn(){
    document.querySelector(".new").disabled = true;
}

function enableNewArrayBtn(){
    document.querySelector(".new").disabled = false;
}

function enableStopSortingBtn(){
    document.querySelector(".stop").disabled = false;
}

function disableStopSortingBtn(){
    document.querySelector(".stop").disabled = true;
}

// Used in async function so that we can so animations of sorting, takes input time in ms (1000 = 1s)
function delayTime(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, milisec); 
    }) 
}

// Selecting size slider from DOM
let arraySize = document.querySelector('#size_input');

// Event listener to update the bars on the UI
arraySize.addEventListener('input', function(){
    console.log(arraySize.value, typeof(arraySize.value));
    createNewArray(parseInt(arraySize.value));
});

// Default input for waitforme function (260ms)
let delay = 260;

// Selecting speed slider from DOM
let delayElement = document.querySelector('#speed_input');

// Event listener to update delay time 
delayElement.addEventListener('input', function(){
    console.log(delayElement.value, typeof(delayElement.value));
    delay = 1000 - parseInt(delayElement.value);
});

// Creating barArray to store randomly generated numbers
let barArray = [];

// Call to display bars right when you visit the site
createNewArray();

// To create new barArray input size of barArray
function createNewArray(noOfBars = 30) {
    // calling helper function to delete old bars from dom
    deleteChild();

    // creating an barArray of random numbers 
    barArray = [];
    for (let i = 0; i < noOfBars; i++) {
        barArray.push(Math.floor(Math.random() * 251));
    }
    console.log(barArray);

    const bars = document.querySelector("#sorting");
    const maxWidth = 1000;
    // create multiple element div using loop and adding class 'bar col'
    for (let i = 0; i < noOfBars; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${barArray[i]*2}px`;
        bar.classList.add('bar');
        bar.classList.add('flex-item');
        bar.classList.add(`barNo${i}`);
        bar.classList.add(`info`);
        bar.style.width  = `${maxWidth/noOfBars}px`
        bar.innerText = `${barArray[i]}`;
        bars.appendChild(bar);
    }
}

// Helper function to delete all the previous bars so that new can be added
function deleteChild() {
    const bar = document.querySelector("#sorting");
    bar.innerHTML = '';
}

// Selecting newarray button from DOM and adding eventlistener
const newArrayButton = document.querySelector(".new");
newArrayButton.addEventListener("click", function(){
    hasPressedStop = false;
    enableSpeedSlider();
    console.log("From newArray " + arraySize.value);
    console.log("From newArray " + delay);
    enableSortingBtn();
    enableSizeSlider();
    createNewArray(arraySize.value);
});

const stopSortingButton = document.querySelector(".stop");
stopSortingButton.addEventListener("click", function(){
    disableSortingBtn();
    disableSizeSlider();
    hasPressedStop = true;
})