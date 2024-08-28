function mergeSort(arr){
  if(arr.length == 1){
    return [arr[0]];
  }else{
    let mp = Math.floor(arr.length / 2);
    let leftSide = arr.slice(0,mp);
    let rightSide = arr.slice(mp);
    let sortLeft = mergeSort(leftSide);
    let sortRight = mergeSort(rightSide);
    let sortArr = merge(sortLeft,sortRight);
    return sortArr;
  }
}
function merge(leftArr, rightArr){
  let newArr = [];
  let i=0;
  let j=0;
  while(leftArr.length && rightArr.length &&i<leftArr.length && j<rightArr.length){
    if(leftArr[i] < rightArr[j]){
      newArr.push(leftArr[i]);
      i++;
    }else{
      newArr.push(rightArr[j])
      j++;
    }
  }
  while(i<leftArr.length){
    newArr.push(leftArr[i]);
    i++;
  }
  while(j<rightArr.length){
    newArr.push(rightArr[j])
    j++;
  }
  return newArr;
}
let array = [3, 2, 1, 13, 8, 5, 0, 1]
console.log(`Unordered array: ${array}`)
console.log(`This was solved recursively: ${mergeSort(array)}`) // 0,1,1,2,3,5,8,13