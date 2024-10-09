class Node{
    constructor(val){
        this.val = val
        this.next = null
    }
}
class Singly{
    constructor(){
        this.head = null 
        this.tail = null 
        this.length = 0
    }
    push(val){
        var newNode = new Node(val)
        if(!this.head){
            this.head = newNode
            this.tail = this.head

        }else{
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length++
    }
    traverse(){
        var current = this.head 
        while(current){
            console.log(current.val)
            current = current.next 
        }
    }
    pop(){
        if(!this.head) return undefined
        var current = this.head 
        var newTail = current 
        while(current.next){
            newTail = current
            current = current.next 
        }
        this.tail = newTail
        this.tail.next = null
        this.length--
        if(this.length === 0){
            this.head = null
            this.tail = null
        }
    }
    shift(){
        var currentHead = this.head 
        this.head = currentHead.next 
        this.length--
        if(this.length === 0){
            this.tail = null
        }    
    }
    unshift(val){
        var newNode = new Node(val)
        if(!this.head){
            this.head = newNode
            this.tail = this.head 
        }else {
            newNode.next = this.head
            this.head = newNode
        }
        this.length++
    }
    get(index){
        if(index < 0 || index >=this.length)  return null
        var count = 0
        var current = this.head
        while(count!==index){
            current = current.next
            count++
        }
        return current 
    }
    set(index,val){
        var foundNode = this.get(index)
        if(foundNode){
            foundNode.val = val
            return true 
        }
        return false 
    }
    insert(index,val){
        if(index<0 || index>this.length) return false 
        else if(index === 0){
            return this.unshift(val)
        }else if(index === this.length) {
            return this.push(val)
        }else{
            var newnode = new Node(val)
            var prev = this.get(index-1)
            var temp = prev.next 
            prev.next = newnode
            newnode.next = temp
            
        }
        this.length++
    }
    remove(index){
        if(index < 0 || index > this.length) return false 
        if(index === 0 ) return this.shift()
        if(index === this.length-1) return this.pop()
        var prev = this.get(index-1)
        var removed = prev.next 
        prev.next = removed.next
        this.length--
        return removed 
    }
    print(){
        var arr = []
        var current = this.head
        while(current){
            arr.push(current.val)
            current = current.next 
        }
        console.log(arr)
    }
    reverse(){
        var node = this.head 
        this.head =this.tail 
        this.tail = node 
        
        var prev = null 
        var next 

        for(var i=0 ;i<this.length ; i++){
            next = node.next 
            node.next = prev 
            prev = node 
            node = next 
        }
        return this 
    }
   
    
}

const list = new Singly()
list.push(10)
list.push(14)
list.push(40)
list.push(43)
list.reverse()
console.log(list)
// console.log(list)