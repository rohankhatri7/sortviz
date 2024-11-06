async function selection(){
    const ele = document.querySelectorAll(".bar");
    for(let i = 0; i < ele.length; i++){
        if(hasPressedStop==true){
            return;
        }
        let min_index = i;
        // Change color of the bar being compared
        ele[i].style.background = 'lightgreen';
        for(let j = i+1; j < ele.length; j++){
            if(hasPressedStop==true){
                return;
            }
            // Change color of current bar
            ele[j].style.background = 'cyan';

            await delayTime(delay);
            if(hasPressedStop==true){
                return;
            }
            if(parseInt(ele[j].style.height) < parseInt(ele[min_index].style.height)){
                if(min_index !== i){
                    // new min_index is found so change prev min_index color back to normal
                    ele[min_index].style.background = '#e43f5a';
                }
                min_index = j;
            } 
            else{
                // if the currnent comparision is more than min_index change is back to normal
                ele[j].style.background = '#e43f5a';
            }   
        }
        await delayTime(delay);
        if(hasPressedStop==true){
            return;
        }
        swap(ele[min_index], ele[i]);
        // change the min element index back to normal as it is swapped 
        ele[min_index].style.background = '#e43f5a';
        // change the sorted elements color to green
        ele[i].style.background = 'green';
    }
}

const selectMetadata = {
    "infoString": `<p>
Selection Sort is an iterative and in-place sorting algorithm that 
divides the data structure in two sublists: the ordered one, and the unordered one.
The algorithm loops for all the elements of the data structure 
and for every cycle picks the smallest element of the unordered 
sublist and adds it to the sorted sublist, progressively filling it.
</p>
<p>
It's a really simple and intuitive algorithm that does not 
require additional memory, but it's not really efficient on 
big data structures due to its quadratic time complexity.
</p>
<p>
This algorithm has been upgraded and enhanced in several 
variants such as Heap Sort.
</p>`,
    "avgComp":"O(n<sup>2</sup>)",
    "bestComp": "O(n<sup>2</sup>)",
    "worstComp":"O(n<sup>2</sup>)",
    "spaceComp": "O(1)",
}
const selectionSortbtn = document.querySelector(".selectionSort");
selectionSortbtn.addEventListener('click', async function(){
    hasPressedStop = false;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await selection();
    if(hasPressedStop==true){
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    disableStopSortingBtn();
});