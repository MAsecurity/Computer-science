// iterative solution
function fibs(n){
 let array = [0];
 for(let i=0; i<n-1; i++){
  if(array.length < 2){
    array.push(1);
  }else{
    let sum = array[array.length - 2] + array[array.length - 1];
    array.push(sum);
  }
 }
 return array;
}
console.log(fibs(8)); // 0,1,1,2,3,5,8,13

// recursive solution
function fibsRec(n){
  if(n <= 0){
    return [0];
  }else{
    let result = fibsRec(n-1);
    if(result.length < 2){
      return result.concat([1]);
    }else{
      let sum = result[result.length - 2] + result[result.length - 1];
      return result.concat([sum])
    }
  }
}
let num = 8;
console.log(`This was done recursively: ${fibsRec(num-1)}`); // 0,1,1,2,3,5,8,13