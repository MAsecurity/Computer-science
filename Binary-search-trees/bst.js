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
  insert(root,value){
   if(root == null){
    return new Node(value);
   }else if(root.data == value){
    return root;
   }if(root.data > value){
      root.left = this.insert(root.left,value)
    }else{
      root.right = this.insert(root.right, value)
    }
    return root;
  }
  deleteItem(root,value){
    if(!root){
      return null;
    }else if(root.data > value){  
      root.left = this.deleteItem(root.left,value)
    }else if(root.data < value){
      root.right = this.deleteItem(root.right,value)
    }else{
      if(!root.left){
        return root.right;
      }else if(!root.right){
        return root.left;
      }else{
        let successor = getSuccessor(root);
        root.data = successor.data;
        root.right = this.deleteItem(root.right,successor.data)
      }
    }
    return root;
  }
  
  getSuccessor(root){
    let curr = root.right;
    while(curr && curr.left){
      curr = curr.left;
    }
    return curr;

  }
  find(value){
    
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
console.log(tree.insert(tree.root,2));
console.log(prettyPrint(tree.root))
console.log(tree.deleteItem(tree.root,2))
console.log(prettyPrint(tree.root))
