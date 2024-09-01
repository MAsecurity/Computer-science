import { node } from "./nodeList.js";
class linkedList{
  constructor(){
    this.head = null;
  }
  append(value){
    if(this.head == null){
      let newNode = new node(value);
      this.head = newNode;
    }else{
      let tmp = this.head;
      while(tmp.nextNode != null){
        tmp = tmp.nextNode;
      }
      tmp.nextNode = new node(value)

    }
  }
  prepend(value){
    let newNode = new node(value);
    newNode.nextNode = this.head;
    this.head = newNode; 
  }
  size(){
    let i=0;
    let tmp = this.head;
    while(tmp != null){
      i++;
      tmp = tmp.nextNode;
    }
    return i;

  }
  headMethod(){
    return this.head.value;

  }
  tail(){
    let tmp = this.head;
    while(tmp.nextNode != null){
      tmp = tmp.nextNode;
    }
    return tmp.value;
  }
  at(index){
    let tmp = this.head;
    let curI = -1;  // we want to start incrementing with 0 being the first incrementation;
    while(tmp.nextNode != null){
      curI++;
      if(curI == index){
        return tmp.value;
      }
      tmp = tmp.nextNode;
    }
    return `Sorry we dont have an element at that given index: ${index}`;

  }
  pop(){
    let tmp = this.head;
    let prev = null;
    while(tmp.nextNode){
      prev = tmp;
      tmp = tmp.nextNode;
    }
    prev.nextNode = null;

  }
  contains(value){
    let tmp = this.head;
    while(tmp){
      if(tmp.value == value){
        return true;
      }
      tmp = tmp.nextNode;
    }
    return false
  }
  find(value){
    let tmp = this.head;
    let curI = -1;
    while(tmp){
      curI++;
      if(tmp.value == value){
        return curI;
      }
      tmp = tmp.nextNode;
    }
    return null;
  }
  insertAt(value,index){
    let newNode = new node(value);
    // edge case, check if our index is zero
    if(index == 0){
      this.prepend(value);
    }else{
      let tmp = this.head;
      let curI = -1;
      let prev = null;
      while(tmp){
        curI++;
        if(curI == index){
          newNode.nextNode = tmp;
          prev.nextNode = newNode;
          break;
        }
        prev = tmp;
        tmp = tmp.nextNode;
      }
    }
  }
  removeAt(index){
    if(index == 0){
      this.head = null;
    }else{
      let tmp = this.head;
      let curI = -1;
      let prev = null;
      while(tmp){
        curI++;
        if(curI == index){
          prev.nextNode = prev.nextNode.nextNode
        }else{
          prev = tmp;
          tmp = tmp.nextNode;
        }
      }
    }

  }
  toString(){
    let string = [];
    let tmp = this.head;
    while(tmp){
      if(tmp.nextNode == null){
        string.push(`(${tmp.value}) -> null`);
        break;
      }else{
        string.push(`(${tmp.value}) -> `);
        tmp = tmp.nextNode;
      }
    }
    return string.join("");
  }


}
let list = new linkedList();
list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
list.prepend("dragon");
console.log(`Size of list: ${list.size()}`) // Size of list: 7
console.log(`Start of list: ${list.headMethod()}`); // Start of list: dragon
console.log(`Tail of list: ${list.tail()}`); // Tail of list: turtle
console.log(`Element at index 2: ${list.at(2)}`); //  Element at index 2: cat
console.log(list.toString()); // (dragon) -> (dog) -> (cat) -> (parrot) -> (hamster) -> (snake) -> (turtle) -> null
list.pop();
console.log(`Pop element: ${list.toString()}`); // Pop element: (dragon) -> (dog) -> (cat) -> (parrot) -> (hamster) -> (snake) -> null
console.log(`Does list contain snake: ${list.contains('snake')}`) // Does list contain snake: true
console.log(`Does list contain pizza: ${list.contains('pizza')}`) // Does list contain pizza: false
console.log(`Find index of parrot: ${list.find('parrot')}`); // Find index of parrot: 3
list.insertAt('lion',3)
console.log(`Insert lion at index 3: ${list.toString()}`); // Insert lion at index 3: (dragon) -> (dog) -> (cat) -> (lion) -> (parrot) -> (hamster) -> (snake) -> null
list.removeAt(3)
console.log(`Remove lion at index 3: ${list.toString()}`) // 