/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import ASTNode from "./ASTNode";
import TokenTypes from "../../lexical/TokenTypes";
import ASTTypes from "./ASTTypes";

export default class Factor extends ASTNode{
    constructor(parent,it) {
        super(parent);
        let token = it.next();
        if(token.getType() === TokenTypes.VARIABLE){
            this._type = ASTTypes.VARIABLE;
        }else {
            this._type = ASTTypes.SCALAR;
        }
        this._lexeme = token;
        this._label = token.getValue();
    }
}
