/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
class Node {
    constructor(val,pre,next) {
        this.val = val;
        this.pre = pre || null;
        this.next = next || null;
    }
}
export default class LinkList {
    constructor() {
        this._head = this._tail = null;
        this._size = 0;
    }
    getSize(){return this._size;}
    isEmpty(){return this._size === 0;}
    addFirst(val){
        if(this._head === null){
            this._head = this._tail = new Node(val);
        }else{
            this._head.pre = new Node(val,null,this._head);
            this._head = this._head.pre;
        }
        this._size++;
    }
    addLast(val){
        if(this._tail==null){
            this._head = this._tail = new Node(val);
        }else{
            this._tail.next = new Node(val,this._tail,null)
            this._tail = this._tail.next;
        }
        this._size++;
    }
    removeFirst(){
        if(this.isEmpty()){throw new Error(`linklist is empty!`)}
        let delNode = this._head;
        this._head = this._head.next;
        delNode.next = null;
        if(this._head===null){
            this._tail = null;
        }else{
            this._head.pre = null;
        }
        this._size--;
        return delNode.val;

    }
    removeLast(){
        if(this.isEmpty()){throw new Error(`linklist is empty!`)}
        let delNode = this._tail;
        this._tail = this._tail.pre;
        delNode.pre = null;
        if(this._tail == null){
            this._head = null;
        }else{
            this._tail.next = null;
        }
        this._size--;
        return delNode.val;
    }
    getFirst(){
        if(this.isEmpty()){throw new Error(`linklist is empty!`)}
        return this._head.val;
    }
    getLast(){
        if(this.isEmpty()){throw new Error(`linklist is empty!`)}
        return this._tail.val;
    }
    toString(){
        let formatStr = [];
        let cur = this._head;
        while (cur){
            formatStr.push(cur.val);
            cur = cur.next;
        }
        return formatStr.join('->');
    }
}
