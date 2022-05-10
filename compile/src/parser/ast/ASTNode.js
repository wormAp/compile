/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
export default class ASTNode {
    constructor(parent,type=null,label=null) {
        this._parent = parent || null;
        this._children = [];
        this._type  = type;
        this._label = label;
        this._lexeme = null;//token
    }
    getType(){
        return this._type;
    }
    getChild(index){
        if(index<0 || index>=this._children.length){
            throw new Error('index 不合法!')
        }
        return this._children[index];
    }
    addChild(child){
        this._children.push(child);
    }
    getLexeme(){
        return this._lexeme;
    }
    getChildren(){
        return this._children;
    }

}
