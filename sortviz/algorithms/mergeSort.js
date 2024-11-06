async function merge(ele, low, mid, high){
    console.log('In merge()');
    const n1 = mid - low + 1;
    const n2 = high - mid;
    let left = new Array(n1);
    let right = new Array(n2);

    for(let i = 0; i < n1; i++){
        if(hasPressedStop==true){
            return;
        }
        await delayTime(delay);
        ele[low + i].style.background = 'orange';
        left[i] = ele[low + i].style.height;
    }
    for(let i = 0; i < n2; i++){
        if(hasPressedStop==true){
            return;
        }
        await delayTime(delay);
        ele[mid + 1 + i].style.background = 'cyan';
        right[i] = ele[mid + 1 + i].style.height;
    }
    await delayTime(delay);
    let i = 0, j = 0, k = low;
    while(i < n1 && j < n2){
        if(hasPressedStop==true){
            return;
        }
        await delayTime(delay);
        
        if(parseInt(left[i]) <= parseInt(right[j])){
            if((n1 + n2) === ele.length){
                ele[k].style.background = 'green';
            }
            else{
                ele[k].style.background = 'lightgreen';
            }
            
            ele[k].style.height = left[i];
            ele[k].innerText=parseInt(left[i])/2;
            i++;
            k++;
        }
        else{
            if((n1 + n2) === ele.length){
                ele[k].style.background = 'green';
            }
            else{
                ele[k].style.background = 'lightgreen';
            } 
            ele[k].style.height = right[j];
            ele[k].innerText = parseInt(right[j])/2;
            j++;
            k++;
        }
    }
    while(i < n1){
        if(hasPressedStop==true){
            return;
        }
        await delayTime(delay);
        if((n1 + n2) === ele.length){
            ele[k].style.background = 'green';
        }
        else{
            ele[k].style.background = 'lightgreen';
        }
        ele[k].style.height = left[i];
        ele[k].innerText = parseInt(left[i])/2;
        i++;
        k++;
    }
    while(j < n2){
        if(hasPressedStop==true){
            return;
        }
        await delayTime(delay);
        if((n1 + n2) === ele.length){
            ele[k].style.background = 'green';
        }
        else{
            ele[k].style.background = 'lightgreen';
        }
        ele[k].style.height = right[j];
        ele[k].innerText = parseInt(right[j])/2;
        j++;
        k++;
    }
}

const mergeMetadata = {
    "infoString": `<p>
Merge Sort is a sorting algorithm based on the Divide et Impera 
technique, like <a href="/quicksort">Quick Sort</a>.
It can be implemented iteratively or recursively, using the 
Top-Down and Bottom-Up algorithms respectively.
We represented the first one.
</p>
<p>
The algorithm divides the data structure recursively 
until the subsequences contain only one element.
At this point, the subsequences get merged and ordered sequentially.
To do so, the algorithm progressively builds the sorted 
sublist by adding each time the minimum element of the next two unsorted subsequences until there is only one sublist remaining.
This will be the sorted data structure.
</p>`,
    "avgComp":"O(n × log n)",
    "bestComp": "O(n × log n)",
    "worstComp":"O(n × log n)",
    "spaceComp": "O(n)",
}


async function mergeSort(ele, l, r){
    if(l >= r){
        //sorting complete
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(ele, l, m);
    await mergeSort(ele, m + 1, r);
    await merge(ele, l, m, r);
}

const mergeSortbtn = document.querySelector(".mergeSort");
mergeSortbtn.addEventListener('click', async function(){
    let ele = document.querySelectorAll('.bar');
    let l = 0;
    let r = parseInt(ele.length) - 1;
    addMetadata(mergeMetadata);
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await mergeSort(ele, l, r);
    if(hasPressedStop==true){
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    disableStopSortingBtn();
});
