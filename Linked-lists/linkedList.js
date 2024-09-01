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

  }
  contains(value){

  }
  find(value){

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
console.log(list.size())
console.log(list.headMethod())
console.log(list.tail());
console.log(list.at(2));
console.log(list.toString());