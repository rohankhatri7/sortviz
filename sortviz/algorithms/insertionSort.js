async function insertion(){
    const ele = document.querySelectorAll(".bar");
    ele[0].style.background = 'green';
    for(let i = 1; i < ele.length; i++){
        if(hasPressedStop==true){
            return;
        }
        let j = i - 1;
        let key = ele[i].style.height;
        let keyText = ele[i].innerText;
        ele[i].style.background = 'blue';

        await delayTime(delay);
        if(hasPressedStop==true){
            return;
        }

        while(j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))){
            if(hasPressedStop==true){
                return;
            }
            ele[j].style.background = 'blue';
            ele[j + 1].style.height = ele[j].style.height;
            ele[j + 1].innerText = ele[j].innerText;
            ele[j].innerText = keyText;
            j--;

            await delayTime(delay);
            if(hasPressedStop==true){
                return;
            }
            for(let k = i; k >= 0; k--){
                ele[k].style.background = 'green';
            }
        }
        ele[j + 1].style.height = key;
        ele[j + 1].innerText = keyText;
        ele[i].style.background = 'green';
    }
}

const insertMetadata = {
    "infoString": `<p>Insertion sort is a simple sorting algorithm that 
builds the final sorted array one item at a time.
It's less performant than advanced sorting algorithms, 
but it can still have some advantages: it's really easy to implement and 
it's efficient on small data structures almost sorted.</p>
<p>The algorithm divides the data structure in two sublists: 
a sorted one, and one still to sort. 
Initially, the sorted sublist is made up of just one element and it 
gets progressively filled.For every iteration, the algorithm picks an 
element on the unsorted sublist and inserts it at the right place in 
the sorted sublist.</p>`,
    "avgComp":"O(n<sup>2</sup>)",
    "bestComp": "O(n)",
    "worstComp":"O(n<sup>2</sup>)",
    "spaceComp": "O(1)",
}

const inSortbtn = document.querySelector(".insertionSort");
inSortbtn.addEventListener('click', async function(){
    addMetadata(insertMetadata);
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await insertion();
    if(hasPressedStop==true){
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    disableStopSortingBtn();  
});

