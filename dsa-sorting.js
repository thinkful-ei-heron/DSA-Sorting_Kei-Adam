const LinkedList = require('./linkedList')

//--------------------------------------------------
// 1. Understanding merge sort

// 1.
// [21, 1, 26, 45, 29, 28, 2, 9] [16, 49, 39, 27, 43, 34, 46, 40]
// [21, 1, 26, 45] [29, 28, 2, 9] [16, 49, 39, 27] [43, 34, 46, 40]
// [21, 1] [26, 45] [29, 28, 2, 9] [16, 49, 39, 27] [43, 34, 46, 40]
// merge
// [21, 1, 26, 45] [29, 28, 2, 9] [16, 49, 39, 27] [43, 34, 46, 40]
// [21, 1, 26, 29, 28, 2, 9, 45] [16, 43, 34, 46, 40, 29, 39, 27]
/* [16, 21, 1, 26, 29, 28, 2, 9, 43, 34, 45, 46, 40, 29, 39, 27] */

// 2. 
// [21, 1, 26, 45, 29, 28, 2, 9] [16, 49, 39, 27, 43, 34, 46, 40]
// [21, 1, 26, 45] [29, 28, 2, 9] [16, 49, 39, 27] [43, 34, 46, 40]
// [21, 1] [26, 45] [29, 28] [2, 9] [16, 49] [39, 27] [43, 34] [46, 40]
// [21] [1] [26, 45] [29, 28] [2, 9] [16, 49] [39, 27] [43, 34] [46, 40]
// merge
// [1, 21] [26, 45] [29, 28] [2, 9] [16, 49] [39, 27] [43, 34] [46, 40]
// [1, 21, 26, 45] [2, 9, 29, 28] [16, 39, 27, 49] [43, 34, 46, 40]
// [1, 2, 9, 21, 26, 29, 28, 45] [16, 39, 27, 43, 34, 36, 40, 49]
/* [1, 2, 9, 16, 21, 26, 29, 28, 39, 27, 43, 34, 36, 40, 45, 49] */

// 3. [21] [1]

// 4. [43] [34]


//--------------------------------------------------
// 2. Understanding quicksort

// The pivot could have been either 14 or 17

//--------------------------------------------------
// 3. Implementing quicksort

function swap(array, i, j) {
    const tmp = array[i]
    array[i] = array[j]
    array[j] = tmp
}

function partition(array, start, end) {
    const pivot = array[end - 1]
    let j = start
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j)
            j++
        }
    }
    swap(array, end - 1, j)
    return j
}

function qSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array
    }
    const middle = partition(array, start, end)
    array = qSort(array, start, middle)
    array = qSort(array, middle + 1, end)
    return array
}

// console.log(qSort([89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]))



//--------------------------------------------------
// 4. Implement merge sort

function merge(left, right, array) {
    let leftIndex = 0
    let rightIndex = 0
    let outputIndex = 0
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++]
        }
        else {
            array[outputIndex++] = right[rightIndex++]
        }
    }
    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i]
    }
    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i]
    }
    return array
}

function mSort(array) {
    if (array.length <= 1) {
        return array
    }
    const middle = Math.floor(array.length / 2)
    let left = array.slice(0, middle)
    let right = array.slice(middle, array.length)

    left = mSort(left)
    right = mSort(right)
    return merge(left, right, array)
}

// console.log(mSort([89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]))


//--------------------------------------------------
// 5. Sorting a linked list using merge sort

function size(list) {
    let size = 0
    let currNode = list.head
    while (currNode !== null) {
        size++
        currNode = currNode.next
    }
    return size
}

function findMiddle(list) {
    let currNode = list.head
    let count = 0
    while (currNode !== null) {
        count++
        currNode = currNode.next
    }
    currNode = list.head
    for (let i = 0; i < (count / 2) - 1; i++) {
        currNode = currNode.next
    }
    return currNode
}

function mergeLinked(left, right, list) {
    let currNodeLeft = left.head
    let currNodeRight = right.head
    let newList = new LinkedList
    while (currNodeLeft !== null && currNodeRight !== null) {
        if (currNodeLeft < currNodeRight) {
            newList.insertLast(currNodeLeft)
            currNodeLeft = currNodeLeft.next
        }
        else {
            newList.insertLast(currNodeRight)
            currNodeRight = currNodeRight.next
        }
    }
    while (currNodeLeft !== null) {
        newList.insertLast(currNodeLeft)
        currNodeLeft = currNodeLeft.next
    }
    while (currNodeRight !== null) {
        newList.insertLast(currNodeRight)
    }
    return newList
}

function sortLinkedList(list) {
    let listSize = size(list)
    if (size < 0) {
        return list
    }
    const middle = findMiddle(list)
    let left = new LinkedList
    let right = new LinkedList
    let currNodeLeft = list.head
    let currNodeRight = middle
    while (currNodeLeft !== middle) {
        left.insertLast(currNodeLeft)
        currNodeLeft = currNodeLeft.next
    }
    while (currNodeRight !== null) {
        right.insertLast(currNodeRight)
        currNodeRight = currNodeRight.next
    }
    left = sortLinkedList(left)
    right = sortLinkedList(right)
    return mergeLinked(left, right, list)
}

function main() {
    const linkedList = new LinkedList
    linkedList.insertFirst(10)
    linkedList.insertLast(8)
    linkedList.insertLast(2)
    linkedList.insertLast(5)
    linkedList.insertLast(3)
    linkedList.insertLast(9)
    linkedList.insertLast(1)
    linkedList.insertLast(7)
    linkedList.insertLast(4)
    linkedList.insertLast(6)
    console.log(sortLinkedList(linkedList))
}
main()


//--------------------------------------------------
// 6. Bucket sort

function bucketSort(array, lowest, hightest) {
    let lowerBucket = [lowest]
    let higherBucket = []
    let middle = (highest + lowest) / 2
    for (let i = 0; i < array.length; i++) {
        if (array[i] < middle) {
            lowerBucket.push(array[i])
        }
        if (array[i] > highest) {
            higherBucket.push(array[i])
        }
        higherBucket.push(highest)
    }
}

//--------------------------------------------------
// 7. Sort in place

function swapRandom(array) {
    for (let x = 0; x < array.length; x++) {
        i = Math.floor(Math.random() * array.length)
        j = Math.floor(Math.random() * array.length)
        const tmp = array[i]
        array[i] = array[j]
        array[j] = tmp
    }
    return array
}

// console.log(swapRandom([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))


//--------------------------------------------------
// 8. Sorting books

// start by setting a base case for recursion - (if (start > end)) - start being 0 initially and end being the array length initially
// use a partition function to find the pivot point for the sorting and place all values less than the pivot to the left and all values greater than the pivot to the right
// recursively call the main sorting function twice. Once with an array with the values less than and including the pivot. Once with an array with the values greater than the pivot

function sortBooks(array, start = 0, end = array.length) {
    if (start >= end) {
        return array
    }
    const middle = partition(array, start, end)
    array = sortBooks(array, start, middle)
    array = sortBooks(array, middle + 1, end)
    return array
}

// console.log(sortBooks(['Harry Potter and the Goblet of Fire', 'Zen and the Art of Motorcycle Maintenance', 'The Stand', 'IT', 'Insomnia', `Everything's Eventual`, 'Ready Player One', 'Armada', 'Of Mice and Men', 'Great Expectations', 'The Sun Also Rises', 'Fahrenheit 451', 'A Christmas Carol', 'Little Women', '1984', 'Pride and Prejudice', 'To Kill a Mockingbird', 'Animal Farm', 'Lord of the Flies', 'Beowulf']))


function sortBinary(array) {
    
    for (let i = 0; i < array.length; i++) {
        let middle = array[Math.floor(array.length / 2)]
        if (middle === 0 && array[i] < middle) {
            swap(array, array[array.length - 1], array[i])
        }
        if (array[i] === 0) {}
    }
}