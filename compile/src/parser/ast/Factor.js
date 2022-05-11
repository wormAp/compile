/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import ASTNode from "./ASTNode";
import ASTTypes from "./ASTTypes";
import ParseException from "../ParseException";

export default class Factor extends ASTNode{
    constructor(parent,it) {
        super(parent);
        let token = it.next();
        if(token.isVariable()){
            this._type = ASTTypes.VARIABLE;
        }else if(token.isScalar()){
            this._type = ASTTypes.SCALAR;
        }else{
            throw ParseException(token);
        }
        this._lexeme = token;
        this._label = token.getValue();
    }
}
