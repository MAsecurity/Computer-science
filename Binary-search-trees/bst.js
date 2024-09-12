import { Node } from "./node.js";
class Tree{
  constructor(){
    this.root = null;
  }
  buildTree(arr){
    this.root = this.createBst(arr,0,arr.length - 1)
    return prettyPrint(this.root);
  }
  createBst(arr,start,end){
    if(start>end){
      return null;
    }
    let mid = Math.floor((start+end)/2);
    let root = new Node(arr[mid]);
    root.left = this.createBst(arr,start,mid-1)
    root.right = this.createBst(arr,mid+1,end);
    return root;
  }
  insert(value){
    // check for duplicates first
    let dupCheck = this.find(value);
    if(dupCheck){
      return 'Cannot insert duplicates';
    }
    let tmp = this.root;
    while(tmp.left || tmp.right){
      if(tmp.data > value){
        tmp = tmp.left;
      }else{
        tmp = tmp.right;
      }
    }
    let newNode = new Node(value);
    if(tmp.data > value ){
      tmp.left = newNode;
    }else{
      tmp.right = newNode;
    }
  }
  deleteItem(value){
    
  }
  find(value){
    let tmp = this.root;
    while(tmp.left || tmp.right){
      if(tmp.data == value){
        return tmp;
      }if(tmp.data > value){
        tmp = tmp.left;
      }else{
        tmp = tmp.right;
      }
    }
    if(tmp.data == value ){
      return tmp;
    }
    return false;
  }
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
function generateArray(){
  // length 10
  let arr = [];
  for(let i=0; i<10; i++){
    arr.push(parseInt(Math.random() * 100))
  }
  arr.sort((a,b) => {
    if(a>b){
      return 1
    }else if(a<b){
      return -1;
    }else{
      return 0;
    }
  });
  let setArr = new Set(arr);
  let sortedArr = Array.from(setArr);
  return sortedArr;
}
let arr = generateArray();
let tree = new Tree();
console.log(tree.buildTree(arr))
console.log(tree.insert(2));
console.log(prettyPrint(tree.root))
console.log(tree.find(92))
