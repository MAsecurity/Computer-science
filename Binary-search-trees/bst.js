import { Node } from "./node.js";
class Tree{
  constructor(){
    this.root = null;
    this.newArr = [];
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
    if(typeof(callback) != 'function'){
      throw new Error('This callback isn\'t a function');
    }
    console.log([this.root.data])
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
    let newArr = [];
    for(let i=0; i<arr.length; i++){
      newArr.push(arr[i].data)
    }
    console.log(newArr);
  }
  preOrder(node,callback){
    if(typeof(callback) != 'function'){
      throw new Error('This callback isn\'t a function');
    }
    if(!node){
      return;
    }
    callback(node.data);
    this.preOrder(node.left,callback);
    this.preOrder(node.right,callback)
  }
  inOrder(node,callback){
    if(typeof(callback) != 'function'){
      throw new Error('This callback isn\'t a function');
    }
    if(!node){
      return;
    }
    this.inOrder(node.left,callback);
    callback(node.data)
    this.inOrder(node.right,callback)
  }
  postOrder(node,callback){
    if(typeof(callback) != 'function'){
      throw new Error('This callback isn\'t a function');
    }
    if(!node){
      return;
    }
    this.postOrder(node.left,callback);
    this.postOrder(node.right,callback);
    callback(node.data);
  }
  logOrder(val){
    console.log(val);
  }
  height(node){
    if(!node){
      return 0;
    }
    let left = this.height(node.left);
    let right = this.height(node.right);
    return Math.max(left,right)+1
  }
  depth(node,val){
    let depthNode = this.find(tree.root,val);
    if(depthNode){
       return this.calculateDepth(tree.root,val) + 1
    }else{
      return null;
    }

  }
  calculateDepth(node,val){
    if(node.data == val){
      return 0;
    }else if(node.data > val){
      return this.calculateDepth(node.left,val)+1;
    }else{
      return this.calculateDepth(node.right,val)+1;
    }
  }
  isBalanced(node){
    if(!node){
      return true;
    }
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    if(Math.abs(leftHeight-rightHeight) <= 1 && this.isBalanced(node.left) == true && this.isBalanced(node.right) == true ){
      return true;
    }
    return false;
  }
  rebalance(node){
    let updateArr = this.rebuild(node);
    this.buildTree(this.newArr);
    this.newArr = [];
  }
  rebuild(node){
    if(!node){
      return;
    }
    this.rebuild(node.left);
    this.newArr.push(node.data);
    this.rebuild(node.right);
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
  let arr = [20, 27, 31, 44, 45, 54, 58, 76, 83, 89]
  return arr;
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
console.log('Preorder:')
console.log(tree.preOrder(tree.root,tree.logOrder))
console.log('Inorder:')
console.log(tree.inOrder(tree.root,tree.logOrder));
console.log('Postorder:')
console.log(tree.postOrder(tree.root,tree.logOrder))
console.log(prettyPrint(tree.root))
console.log(`Height of root: ${tree.height(tree.root)}`)
console.log(`Depth of given node 31: ${tree.depth(tree.root,31)}`)
console.log(`Depth of given node 63: ${tree.depth(tree.root,63)}`)
console.log(`Depth of given node 44: ${tree.depth(tree.root,44)}`)
tree.deleteItem(tree.root,63);
console.log(prettyPrint(tree.root))
console.log(`Is this tree balanced: ${tree.isBalanced(tree.root)}`)// true
// make tree unbalanced
tree.insert(tree.root, 100);
tree.insert(tree.root, 200);
tree.insert(tree.root, 350);
console.log(prettyPrint(tree.root));
console.log(`Is this tree balanced: ${tree.isBalanced(tree.root)}`) // false;
tree.rebalance(tree.root);
console.log(`Is this tree balanced: ${tree.isBalanced(tree.root)}`) // true;