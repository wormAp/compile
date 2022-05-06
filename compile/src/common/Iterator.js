/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import LinkList from "./LinkList";
export default class Iterator {
    constructor(it,endToken= null) {
        this._it = it;
        this._cacheSize = 10;
        this._queueCache = new LinkList();
        this._stackCache = new LinkList();
        this._endToken = endToken;
    }
    //是否有next
    hasNext(){
        return this._endToken || !!this.peek();
    }
    //放回一个
    //a->b->c->d
    //d->c->b->a
    putBack(){
        if(this._queueCache.getSize()>0){
            this._stackCache.addLast(this._queueCache.removeLast());
        }
    }
    //查看当前
    peek(){
        if(this._stackCache.getSize()>0){
            return this._stackCache.getLast();
        }
        const val = this.next();
        this.putBack();
        return val;
    }
    //获取下一个
    next(){
        let val = null;
        if(this._stackCache.getSize()>0){
            val = this._stackCache.removeLast();
        }else{
            val = this._it.next().value;
            if(val === undefined){
                let temp = this._endToken;
                this._endToken = null;
                return  temp;
            }
        }
        while (this._queueCache.getSize()>this._cacheSize-1){
            this._queueCache.removeFirst();
        }
        this._queueCache.addLast(val);
        return val;
    }
}
