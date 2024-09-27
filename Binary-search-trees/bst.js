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
  find(root,value){
    if(!root){
      return null;
    }else if(root.data == value){
      return root;
    }else if(root.data > value){
      return this.find(root.left,value)
    }else if(root.data < value){
      return this.find(root.right,value)
    }
    return root;
  }
  levelOrder(callback){
    console.log(this.root.data)
    let queue = [this.root];
    while(queue.length){
      let nextQueue = [];
      for(let i=0; i<queue.length; i++){
        if(queue[i].left){
          nextQueue.push(queue[i].left)
        }
        if(queue[i].right){
          nextQueue.push(queue[i].right)
        }
      }
      callback(nextQueue)
      queue = nextQueue;
    }
  }
  logBFS(arr){
    for(let i=0; i<arr.length; i++){
      console.log(arr[i].data)
    }
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
function getArray(){
  // length 10
  let arr = [27, 31, 44, 45, 54, 58, 76, 83, 89, 20]
}
let arr = getArray();
let tree = new Tree();
console.log(tree.buildTree(arr))
console.log(tree.insert(tree.root,2));
console.log(prettyPrint(tree.root))
console.log(tree.deleteItem(tree.root,2))
console.log(prettyPrint(tree.root))
tree.insert(tree.root,63);
console.log(prettyPrint(tree.root));
console.log(tree.find(tree.root,63));
console.log(tree.levelOrder(tree.logBFS))
console.log(generateArray())