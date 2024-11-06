//TO:DO fix the colors in heapify

async function heapSort(arr, n) {
    // Build heap (rearrange array)
    for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if(hasPressedStop == true){
            return;
        }
        await heapify(arr, n, i);
    }

    // One by one extract an element from heap
    for (var i = n - 1; i > 0; i--) {
        if(hasPressedStop == true){
            return;
        }
        // Move current root to end
        var temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        arr[0].style.background = 'cyan';
        arr[i].style.background = 'green';
        swap(arr[0], arr[i]);
        await delayTime(delay);

        // call max heapify on the reduced heap
        await heapify(arr, i, 0);
    }
}

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
async function heapify(arr, n, i) {
    if(hasPressedStop == true){
        return;
    }
    var largest = i; // Initialize largest as root
    var l = 2 * i + 1; // left = 2*i + 1
    var r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    
    if (l < n && parseInt(arr[l].style.height) > parseInt(arr[largest].style.height)) {
        // arr[l].style.background = 'lightblue'; 
        // arr[largest].style.background = 'cyan';
        largest = l;
        swap(arr[largest], arr[l]);
        // arr[l].style.background = '#e43f5a';
    }
    

    // If right child is larger than largest so far
    if (r < n && parseInt(arr[r].style.height) > parseInt(arr[largest].style.height)) { 
        // arr[r].style.background = 'lightgreen';
        // arr[largest].style.background = 'cyan'; 
        largest = r;
        swap(arr[largest], arr[r]);
        // arr[l].style.background = '#e43f5a'; 
    }

    // If largest is not root
    if (largest != i) {
        var temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        swap(arr[i], arr[largest]);

        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}
const heapMetadata = {
    "infoString": `<p>
Heap Sort is an in-place iterative sorting algorithm based on 
auxiliary data structures called heap.
It's less efficient than algorithm with the same time 
complexity and it's not suitable for data structures with few elements.
</p>
<p>
The heap is a data structure representable as a binary tree, 
where each node has a value bigger or equal to its children. Consequently, the root will hold the maximum value.
</p>
<p>
The data structure gets ordered to form the heap initially, 
and then it gets progressively reordered with an algorithm similar
 to Selection Sort, starting from the bigger elements.
</p>`,
    "avgComp":"O(n × log n)",
    "bestComp": "O(n × log n)",
    "worstComp":"O(n × log n)",
    "spaceComp": "O(1)",
}

const heapSortbtn = document.querySelector(".heapSort");
heapSortbtn.addEventListener("click", async function () {
    let arr = document.querySelectorAll('.bar');
    let n = arr.length;
    addMetadata(heapMetadata);
    hasPressedStop = false;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await heapSort(arr, n);
    arr[0].style.background = 'green';
    if (hasPressedStop == true) {
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    disableStopSortingBtn();
});
