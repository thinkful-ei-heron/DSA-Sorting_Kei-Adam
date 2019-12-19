class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  insertFirst(value) {
    this.head = new Node(value, this.head);
  }
  insertLast(value) {
    if (this.head === null) {
      this.insertFirst(value);
    } else {
      let last = this.head;
      while (last.next !== null) {
        last = last.next;
      }
      last.next = new Node(value, null);
    }
  }
  insertAfter(value, insertion) {
    let currNode = this.find(insertion);
    let afterNode = currNode.next;
    currNode.next = new Node(value, afterNode);
  }
  insertBefore(value, insertion) {
    let currNode = this.head;
    let tempNode = this.head;
    while (currNode.value !== insertion) {
      tempNode = currNode;
      currNode = currNode.next;
    }
    tempNode.next = new Node(value, currNode);
  }
  insertAt(value, index) {
    let currIndex = 0;
    let currNode = this.head;
    while (currIndex !== (index - 1)) {
      currNode = currNode.next;
      currIndex++;
    }
    currNode.next = new Node(value, currNode.next);
  }
  find(item) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      }
      else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }
  remove(item) {
    // If the list is empty
    if (!this.head) {
      return null;
    }
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    let currNode = this.head;
    let previousNode = this.head;
    while ((currNode !== null) && (currNode.value !== item)) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }
  display() {
    let currNode = this.head;
    let str = '';
    while (currNode.next !== null) {
      str = str + currNode.value + ', ';
      currNode = currNode.next;
    }
    str = str + currNode.value;
    console.log(str);
  }
  string() {
    let currNode = this.head;
    let str = '';
    while (currNode.next !== null) {
      str = str + currNode.value + ', ';
      currNode = currNode.next;
    }
    str = str + currNode.value;
    return str;
  }
  size() {
    let size = 0;
    let currNode = this.head;
    while (currNode !== null) {
      size++;
      currNode = currNode.next;
    }
    return size;
  }
  isEmpty() {
    return this.head === null;
  }
  findPrevious(value) {
    let currNode = this.head;
    if (currNode === null) {
      return 'empty list';
    } else {
      let tempNode = currNode;
      while (currNode.value !== value) {
        if (currNode.next === null) {
          return 'no such value';
        } else {
          tempNode = currNode;
          currNode = currNode.next;
        }
      }
      return tempNode;
    }
  }
  findLast() {
    let currNode = this.head;
    if (currNode === null) {
      return 'empty list';
    } else {
      while (currNode.next !== null) {
        // if (currNode.next !== null){
        //   currNode = currNode.next;
        // }
        currNode = currNode.next;
      }
      return currNode;
    }
  }
}

function mergeSort(list){
  if (list.head===null || list.head.next===null){
    return list;
  } else {
    let middle = list.size()/2;
    let middleNode = list.head;
    for (let i = 1; i < middle; i++){
      middleNode = middleNode.next;
    }
    let left = list;
    let right = new LinkedList();
    right.head = middleNode.next;
    middleNode.next = null;
    left = mergeSort(left);
    right = mergeSort(right);
    console.log(`merging [${left.string()}] and [${right.string()}]`);
    return merge(left.head, right.head);
  }
}

function merge(left, right){
  let newList = new LinkedList();
  newList.head = new Node();
  //set up head
  if (left.value < right.value){
    newList.head = new Node(left.value, null);
    left = left.next;
  } else {
    newList.head = new Node(right.value, null);
    right = right.next;
  }
  let prevNode = newList.head;
  while (left !== null && right !== null){
    if (left.value < right.value){
      prevNode.next = new Node(left.value, null);
      left = left.next;
      prevNode = prevNode.next;
    } else {
      prevNode.next = new Node(right.value, null);
      right = right.next;
      prevNode = prevNode.next;
    }
  }
  if (left !== null){
    prevNode.next = left;
  }
  if (right !== null){
    prevNode.next = right;
  }
  console.log(`result of merge: [${newList.string()}]`);
  return newList;
}

function main() {
  let SLL = new LinkedList();
  SLL.insertLast('Apollo');
  SLL.insertLast('Boomer');
  SLL.insertLast('Husker');
  SLL.insertLast('Starbuck');
  SLL.insertLast('Tauhida');
  SLL.insertAt('Kat', 2);
  SLL.display();
  mergeSort(SLL);
}

main();

