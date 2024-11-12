// build the adjacency list
// find possible moves and ensure they are within the board and have not been visited
// use bfs instead and use map for tracking parent node.
class knightTravails {
  constructor(position,target){
    this.position = position;
    this.target = target;
    this.map = new Map();
    this.set = new Set()
    this.set.add(position)
  }
  knightMoves(){
    this.bfs(this.position)
    let fullPath = this.path(this.position);
    console.log(fullPath)
  }
  isValid(arr){
    let filterArr = []
    for(let i=0; i<arr.length; i++){
      if(arr[i][0] > 7 || arr[i][0] < 0 || arr[i][1] > 7 || arr[i][1] < 0 || this.set.has(JSON.stringify(arr[i]))){
        continue;
      }else{
        filterArr.push([arr[i][0],arr[i][1]])
        this.set.add(JSON.stringify(filterArr[filterArr.length - 1]))
      }
    }
    return filterArr;
    
  }
  possibleMoves(position){
    let newArr = [];
    let topRight = [position[0]+2,position[1]+1];
    let topLeft = [position[0]+2,position[1]-1];
    let leftUp = [position[0]+1, position[1]-2];
    let leftDown = [position[0]-1,position[1]-2];
    let rightUp = [position[0]+1,position[1]+2];
    let rightDown = [position[0]-1, position[1]+2];
    let downLeft = [position[0] -2, position[1]-1];
    let downRight = [position[0] - 2, position[1]+1];
    newArr.push(topRight,topLeft,leftUp,leftDown,rightUp,rightDown,downLeft,downRight);
    return this.isValid(newArr)

  }
  bfs(position){
    let queue = [position];
    while(queue.length){
      let stack = [];
      for(let i=0; i<queue.length; i++){
        let moves = this.possibleMoves(queue[i]);
        for(let j=0; j<moves.length; j++){
          if(JSON.stringify(moves[j]) == JSON.stringify(this.target)){
            this.map.set(JSON.stringify(moves[j]), queue[i]);
            return;
          }
          stack.push(moves[j]);
          this.map.set(JSON.stringify(moves[j]), queue[i])
        }
      }
      queue = stack;
    }
  }
  path(position){
    let pathArr = [this.target];
    let currNode = this.target;
    while(true){
      let val = this.map.get(JSON.stringify(currNode));
      if(JSON.stringify(val) == JSON.stringify(position)){
        pathArr.push(position)
        break;
      }
      pathArr.push(val)
      currNode = val;
    }
    return pathArr.reverse();
  }
}
let knight = new knightTravails([0,0],[3,3])
console.log(knight.knightMoves()) //  [[0,0],[2,1],[3,3]]
