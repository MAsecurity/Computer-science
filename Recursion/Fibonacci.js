// iterative solution
function fibs(n){
 let array = [0,1];
 for(let i=0; i<n-2; i++){
  let sum = array[array.length - 2] + array[array.length - 1];
  array.push(sum);
 }
 return array;
}
console.log(fibs(8));

// recursive solution
function fibsRec(n){
  if(n <= 1){
    return [0,1];
  }else{
    let result = fibsRec(n-1);
    let sum = result[result.length - 2] + result[result.length - 1];
    return result.concat([sum]) 
  }
}
let num = 8;
console.log(`This was done recursively: ${fibsRec(num-1)}`);