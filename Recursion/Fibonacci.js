function fibs(n){
 let array = [0,1];
 for(let i=0; i<n-2; i++){
  let sum = array[array.length - 2] + array[array.length - 1];
  array.push(sum);
 }
 return array;
}
console.log(fibs(8));