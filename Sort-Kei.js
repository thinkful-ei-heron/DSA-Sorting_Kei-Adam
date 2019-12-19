const array = [21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40];

function bubbleSort(array){
  for (let i = 0; i < array.length - 1; i++){
    let swap = false;
    for (let j = 0; j < array.length - (1 + i); j++){
      if (array[j] > array[j + 1]){
        swap = true;
        let temp = array[j+1];
        array[j+1] = array[j];
        array[j] = temp;
      }  
    }
    if (swap === false){
      return true;
    }
  }
  return array;
}

function mergeSort(array){
  // console.log(`sort ${[...array]}`);
  //if we've reached the smallest possible array
  if (array.length <= 1){
    return array;
  } else {
    //split arrays
    let left = array.slice(0, array.length/2);
    let right = array.slice(array.length/2);
    // recurisvely keep splitting
    left = mergeSort(left);
    right = mergeSort(right);
    // sort small chunks
    return merge(left, right, array);
  }
}

function merge(left, right, array){
  // console.log(`merge ${[...left]} and ${[...right]}`);
  // keep track of indices
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  // while we have array left to search
  while (leftIndex < left.length && rightIndex < right.length){
    // add to array based on which one is the min 
    if (left[leftIndex] < right[rightIndex]){
      array[outputIndex] = left[leftIndex];
      outputIndex++;
      leftIndex++;
    } else {
      array[outputIndex] =right[rightIndex];
      outputIndex++;
      rightIndex++;
    }
  }
  //at this point, one of the arrays is gone, so
  //just add the rest of array, whatever is left just append
  for (let i = leftIndex; i < left.length; i++){
    array[outputIndex] = left[i];
    outputIndex++;
  }
  for (let j = rightIndex; j < right.length; j++){
    array[outputIndex] = right[j];
    outputIndex++;
  }
  return array;
}

function quickSort(array, start=0, end=array.length){
  console.log(`quickSort: array: ${[...array]}, start: ${start}, end: ${end}`);
  if (start >= end){
    return array;
  }
  let pivot = partition(array, start, end);
  quickSort(array, start, pivot);
  quickSort(array, pivot+1, end);
  return array;
}

function quickSortFront(array, start=0, end=array.length){
  console.log(`quickSort: array: ${[...array]}, start: ${start}, end: ${end}`);
  if (start >= end){
    return array;
  }
  let pivot = partitionFront(array, start, end);
  quickSortFront(array, start, pivot);
  quickSortFront(array, pivot+1, end);
  return array;
}

function partition(array, start, end){
  const pivot = array[end - 1];
  console.log(`partition: array: ${[...array]}, start: ${start}, end: ${end}, pivot: ${pivot}`);
  let j = start;
  for (let i = start; i < end - 1; i++){
    console.log(`compare ${array[i]} with pivot ${pivot}, if necessary swap with ${array[j]}`);
    if (array[i] < pivot){
      console.log(`${array[i]} is less than pivot ${pivot}, swap with ${array[j]}`);
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      j++;
      console.log(`array: ${[...array]}`);
    }
  }
  console.log(`swap pivot ${array[end-1]} with ${array[j]}`);
  let temp = array[j];
  array[j] = array[end-1];
  array[end-1] = temp;
  console.log(`array: ${[...array]}`);
  console.log(`returning pivot: ${j}`);
  return j;
}

function partitionFront(array, start, end){
  const pivot = array[start];
  // console.log(`partition: array: ${[...array]}, start: ${start}, end: ${end}, pivot: ${pivot}`);
  let j = start;
  for (let i = start; i < end; i++){
    // console.log(`compare ${array[i]} with pivot ${pivot}, if necessary swap with ${array[j]}`);
    if (array[i] <= pivot){
      // console.log(`${array[i]} is less than pivot ${pivot}, swap with ${array[j]}`);
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      j++;
      // console.log(`array: ${[...array]}`);
    }
  }
  //?
  j--;
  // console.log(`swap pivot ${array[start]} with ${array[j]}`);
  let temp = array[j];
  array[j] = array[start];
  array[start] = temp;
  // console.log(`array: ${[...array]}`);
  return j;
}

function bucketSort(array, min, max){
  let newArr = new Array(max);
  for (let i = 0; i < array.length; i++){
    if (newArr[array[i]] === undefined){
      newArr[array[i]] = 1;
    } else {
      newArr[array[i]]++;
    }
  }
  newArr[0] = 0;
  let index = 1;
  for (let i = 1; i < newArr.length; i++){
    if (newArr[i] === undefined){
      newArr[i] = 0;
    } else {
      newArr[i] = index;
      index++;
    }
  }
  let sortedArr = new Array();
  for (let j = 0; j < newArr.length; j++){
    if (newArr[j] > 0){
      sortedArr.push(j);
    }
  }
  return sortedArr;
}

function randomizeIndex(array){
  let indexArray = new Array(array.length);
  for (let i = 0; i < array.length; i++){
    indexArray[i] = i;
  }

}
//stupid randomize
function randomize(array){
  let indexArray = new Array(array.length);
  for (let i = 0; i < array.length; i++){
    indexArray[i] = i;
  }
  while (indexArray.length > 1){
    let indxofIndex1 = getRandomInt(0, indexArray.length-1);
    let idx1 = indexArray[indxofIndex1];
    indexArray.splice(indxofIndex1, 1);
    let indxofIndex2 = getRandomInt(0, indexArray.length-1);
    let idx2 = indexArray[indxofIndex2];
    indexArray.splice(indxofIndex2, 1);
    if (indexArray.length === 2){
      indexArray = [];
    }
    let temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
  }
  return array;
}

function getRandomInt(min, max){
  max++;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}

let testArray = [15, 16, 12, 14, 18, 9, 4, 5, 8, 13, 13];

let binArray = [1, 0, 1, 1, 1, 0, 0, 0, 0, 1];

function binarySort(array){
  let left = 0;
  let right = array.length - 1;
  while (left < right){
    console.log(`${array[left]} and ${array[right]}`);
    if (array[left] === 1 && array[right] === 0){
      let temp = array[left];
      array[left] = array[right];
      array[right] = temp;  
      console.log(`swap ${array[left]} and ${array[right]}`);
      left++;
      right--;
    } else if (array[left] === 0 && array[right] === 1) {
      left++;
      right++;
    } else if (array[left] === 1 && array[right] === 1){
      right--;
    } else if (array[left] === 0 && array[right] === 0){
      left++;
    }
  }
  return array;
}

function mergeBooks(left, right, array){
  // console.log(`merge ${[...left]} and ${[...right]}`);
  // keep track of indices
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  // while we have array left to search
  while (leftIndex < left.length && rightIndex < right.length){
    // add to array based on which one is the min 
    if (left[leftIndex] < right[rightIndex]){
      array[outputIndex] = left[leftIndex];
      outputIndex++;
      leftIndex++;
    } else {
      array[outputIndex] =right[rightIndex];
      outputIndex++;
      rightIndex++;
    }
  }
  //at this point, one of the arrays is gone, so
  //just add the rest of array, whatever is left just append
  for (let i = leftIndex; i < left.length; i++){
    array[outputIndex] = left[i];
    outputIndex++;
  }
  for (let j = rightIndex; j < right.length; j++){
    array[outputIndex] = right[j];
    outputIndex++;
  }
  return array;
}



// console.log(...binarySort(binArray));

// console.log(...randomize(testArray));
// let bucketSorted = bucketSort(testArray, 4, 18);
// console.log(...bucketSorted);
// let sortedArray = quickSort(testArray);
// console.log(`SORTED ARRAY ${[...sortedArray]}`);

// let testedArray = [2,2,2,2,2,2,2,2,2,2,2,2];
// quickSort(testedArray);
// let testArray2 = [14, 17, 13, 15, 19, 10, 3, 16, 9, 12];
// let sortedArray2 = quickSortFront(testArray2);
// console.log(`SORTED ARRAY ${[...sortedArray2]}`);


// let arrayToSort = [89,30,25,32,72,70,51,42,25,24,53,55,78,50,13,40,48,32,26,2,14,33,45,72,56,44,21,88,27,68,15,62,93,98,73,28,16,46,87,28,65,38,67,16,85,63,23,69,64,91,9,70,81,27,97,82,6,88,3,7,46,13,11,64,76,31,26,38,28,13,17,69,90,1,6,7,64,43,9,73,80,98,46,27,22,87,49,83,6,39,42,51,54,84,34,53,78,40,14,5];
// let sortedQArray = quickSort(arrayToSort);
// console.log(...sortedQArray);
// arrayToSort = [89,30,25,32,72,70,51,42,25,24,53,55,78,50,13,40,48,32,26,2,14,33,45,72,56,44,21,88,27,68,15,62,93,98,73,28,16,46,87,28,65,38,67,16,85,63,23,69,64,91,9,70,81,27,97,82,6,88,3,7,46,13,11,64,76,31,26,38,28,13,17,69,90,1,6,7,64,43,9,73,80,98,46,27,22,87,49,83,6,39,42,51,54,84,34,53,78,40,14,5];
// let sortedMArray = mergeSort(arrayToSort);
// console.log(...sortedMArray);
let books = ['The Way of Kings', 'Oathbringer', 'Mistborn', 'Shadows of Self', 'The Hero of Ages', 'A Wizard of Earthsea'];
let sortedBooks = mergeSort(books);
console.log(...sortedBooks);

/* [21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40]
1-1. After 3 recursive calls to mergeSort, the array passed in is [21, 1]
1-2. After 16 recursive calls the array passed in is [16, 49, 39, 27, 43, 34, 46, 40]
1-3. [21] and [1] are the first two arrays to be merged.
1-4. [1, 21, 26, 45] and [2, 9, 28, 29] are the two arrays being merged on the 7th merge. 

2-1. If all elements less than or equal to the pivot are sorted left of the pivot, then 14 
had to be the pivot. If all elements less than the pivot are sorted left of the pivot, then 
17 could have been the pivot.

2-2. [3, 9, 10, 12, 19, 14, 17, 16, 13, 15]

2-3. [9, 10, 3, 12, 13, 14, 15, 16, 19, 17]
*/
