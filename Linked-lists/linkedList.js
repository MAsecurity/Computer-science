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

  }
  size(){

  }
  head(){

  }
  tail(){

  }
  at(index){

  }
  pop(){

  }
  contains(value){

  }
  find(value){

  }
  toString(){
    return this.head;
  }

}
let list = new linkedList();
list.append("dog");
list.append("cat")
console.log(list.toString());