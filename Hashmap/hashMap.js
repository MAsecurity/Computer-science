import { node } from "./node.js";
class HashMap{
  constructor(){
    this.arr = Array(16).fill(0);
    this.loadFactor = 0.75;
  }
  set(key,value){
    this.checkCapacity()
    let getHash = hash(key,this.arr.length);
    let newNode = new node(key,value);
    if(this.arr[getHash] != 0){
      if(this.arr[getHash].key == key){
        this.arr[getHash].value = value;
      }else{
        let tmp = this.arr[getHash];
        let prev = null;
        while(tmp){
          if(tmp.key == key){
            tmp.value = value;
            return;
          }
          prev = tmp;
          tmp = tmp.next;
        }
        prev.next = newNode;
      }
    }else{
      this.arr[getHash] = newNode;
    }

  }
  get(key){
    let getHash = hash(key,this.arr.length);
    if(this.arr[getHash] == 0){
      return null;
    }else if(this.arr[getHash].key == key){
      return this.arr[getHash].value;
    }else{
      if(this.arr[getHash].next != null){
        let tmp = this.arr[getHash];
        while(tmp){
          if(tmp.key == key){
            return tmp.value;
          }
          tmp = tmp.next;
        }
      }
      return null;
    }
    
  }
  has(key){
    let hasKey = this.get(key);
    if(hasKey != null){
      return true;
    }else{
      return false;
    }
  }
  remove(key){
    let getHash = hash(key,this.arr.length);
    if(this.arr[getHash] == 0){
      return false
    }else if(this.arr[getHash].key == key){
        return this.arr[getHash] = 0;
    }else{
      if(this.arr[getHash].next != null){
        let tmp = this.arr[getHash];
        let prev = null;
        while(tmp){
          if(tmp.key == key){
            prev.next = prev.next.next;
            return `${key} has been removed`;
          }
          prev = tmp;
          tmp = tmp.next;
        }
        return false;
      }
      return false;
    }
  }
  storedBuckets(){
    let i=0;
    let len=0;
    for(let i=0; i<this.arr.length; i++){
      if(this.arr[i] != 0){
        len++;
      }
    }
    return len;
    // will not account for collision based keys , we are simply intersted in which buckets are not 0.
  }
  length(){
    let keysValues = this.entries();
    return keysValues.length;
  }
  clear(){
    let length = this.arr.length;
    this.arr = Array(length).fill(0)
  }
  keys(){
    let keysValues = this.entries();
    let arrOfKeys = [];
    for(let i=0; i<keysValues.length; i++){
      arrOfKeys.push(keysValues[i][0])
    }
    return arrOfKeys

  }
  values(){
    let keysValues = this.entries();
    let arrOfValues = [];
    for(let i=0; i<keysValues.length; i++){
      arrOfValues.push(keysValues[i][1])
    }
    return arrOfValues;
  }
  entries(){
    let savedKeysandValues = [];
    for(let i=0; i<this.arr.length; i++){
      if(this.arr[i] != 0){
        let tmp = this.arr[i];
        while(tmp.next){
          savedKeysandValues.push([tmp.key,tmp.value])
          tmp = tmp.next;
        }
        savedKeysandValues.push([tmp.key,tmp.value])
      }
    }
    return savedKeysandValues;
  }
  checkCapacity(){
    let entries = this.storedBuckets();
    let percent = Math.round(this.arr.length *  this.loadFactor)
    if (entries >= percent){
      this.grow()
    }

  }
  grow(){
    for(let i=0; i<5; i++){
      this.arr.push(0)
    }
    this.rehash()
  }
  rehash(){
    let keysValues = this.entries()
    this.clear();
    for(let i=0; i<keysValues.length; i++){
      this.set(keysValues[i][0],keysValues[i][1]);
    }
  }


}

function hash(key,bucketsLength) {
  let hashCode = 0;
  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % bucketsLength;
  }

  return parseInt(hashCode);
}
const myMap = new HashMap();
myMap.set('apple', 'red')
myMap.set('banana', 'yellow')
myMap.set('carrot', 'orange')
myMap.set('dog', 'brown')
myMap.set('elephant', 'gray')
myMap.set('frog', 'green')
myMap.set('grape', 'purple')
myMap.set('hat', 'black')
myMap.set('ice cream', 'white')
myMap.set('jacket', 'blue')
myMap.set('kite', 'pink')
myMap.set('lion', 'golden')
myMap.set('dragon', 'blue')
console.log(myMap.arr)
console.log(myMap.entries())
console.log(`Number of non-empty buckets: ${myMap.storedBuckets()}`)
console.log(`Number of stored keys: ${myMap.length()}`)
console.log(`Length of Array: ${myMap.arr.length}`)
console.log(`Get value of key apple: ${myMap.get('apple')}`) // Get value of key apple: red
console.log(`Get value of sanji: ${myMap.get('sanji')}`) // Get value of sanji: null
console.log(`Do we have dragon: ${myMap.has('dragon')}`) // Do we have dragon: true
console.log(`Remove lion: ${myMap.remove('lion')}`); // Remove lion: lion has been removed
console.log(`Do we have dragon: ${myMap.has('dragon')}`)
console.log(myMap.entries())
console.log(myMap.length())
console.log(myMap.keys())
console.log(myMap.values())