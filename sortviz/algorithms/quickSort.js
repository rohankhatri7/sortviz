async function partitionLomuto(ele, l, r){
    let i = l - 1;
    ele[r].style.background = 'cyan'; //pivot
    for(let j = l; j <= r - 1; j++){
        if(hasPressedStop == true){
            return;
        }
        ele[j].style.background = 'yellow'; //current element
        await delayTime(delay);
        if(hasPressedStop == true){
            return;
        }
        if(parseInt(ele[j].style.height) < parseInt(ele[r].style.height)){
            i++;
            swap(ele[i], ele[j]);
            // color 
            ele[i].style.background = 'orange';
            if(i != j) ele[j].style.background = 'orange';
            // pauseChamp
            await delayTime(delay);
        }
        else{
            // color if not less than pivot
            ele[j].style.background = 'pink';
        }
    }
    i++; 
    if(hasPressedStop == true){
        return;
    }
    await delayTime(delay);
    if(hasPressedStop == true){
        return;
    }
    swap(ele[i], ele[r]);
    // color
    ele[r].style.background = 'pink';
    ele[i].style.background = 'green';

    if(hasPressedStop == true){
        return;
    }
    await delayTime(delay);
    if(hasPressedStop == true){
        return;
    }
    
    // color
    for(let k = 0; k < ele.length; k++){
        if(ele[k].style.background != 'green')
            ele[k].style.background = '#e43f5a';
    }

    return i;
}

async function quickSort(ele, l, r){
    if(l < r){
        let pivot_index = await partitionLomuto(ele, l, r);
        await quickSort(ele, l, pivot_index - 1);
        await quickSort(ele, pivot_index + 1, r);
    }
    else{
        if(l >= 0 && r >= 0 && l <ele.length && r <ele.length){
            ele[r].style.background = 'green';
            ele[l].style.background = 'green';
        }
    }
}

const quickMetadata = {
    "infoString": `<p>
Quick Sort is a sorting algorithm based on splitting the data structure in smaller partitions and sort them recursively until the data structure is sorted.
</p>
<p>
This division in partitions is done based on an element, called pivot:
all the elements bigger than the pivot get placed on the right side of the structure, the smaller ones to the left, creating two partitions.
Next, this procedure gets applied recursively to the two partitions and so on.
</p>
<p>
This partition technique based on the pivot is called <a href="https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm" target="_blank">Divide and conquer</a>.
It's a performant strategy also used by other sorting algorithms, such as <a href="/mergesort">Merge Sort</a>.
</p>`,
    "avgComp":"O(n × log n)",
    "bestComp": "O(n × log n)",
    "worstComp":"O(n × log n)",
    "spaceComp": "O(n)",
}

const quickSortbtn = document.querySelector(".quickSort");
quickSortbtn.addEventListener('click', async function(){
    let ele = document.querySelectorAll('.bar');
    let l = 0;
    let r = ele.length - 1;
    addMetadata(quickMetadata);
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await quickSort(ele, l, r);
    if(hasPressedStop==true){
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    disableStopSortingBtn();
});
