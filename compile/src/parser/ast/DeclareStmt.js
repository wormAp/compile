/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import Stmt from "./Stmt";
import ASTTypes from "./ASTTypes";
import Factor from "./Factor";
import ParseException from "../ParseException";
import Expr from "./Expr";
import Variable from "./Variable";
import Scalar from "./Scalar";

export default class DeclareStmt extends Stmt{
    constructor(parent) {
        super(parent,ASTTypes.DECLARE_STMT,'declare');
    }
    //var = expr
    static parse(parent,it){
        let declareStmt = new DeclareStmt(parent);
        let keyToken = it.peek();
        if(['var','let','const'].indexOf(keyToken.getValue())>=0){
            it.next();
        }else{
            throw ParseException.fromToken(keyToken);
        }
        let factor = DeclareStmt.generalFactor(parent,it);
        declareStmt.addChild(factor);
        let lexeme = it.nextMatch('=');
        declareStmt._lexeme = lexeme;
        let expr = Expr.parseExpr(parent,it);
        declareStmt.addChild(expr);
        let _token = it.peek();
        if(_token.getValue() === ";"){
            it.nextMatch(";");
        }
        return declareStmt;
    }
    static generalFactor(parent,it){
        let token = it.peek();
        if(token.isVariable()){
            return new Variable(parent,it)
        }else{
            return new Scalar(parent,it);
        }
    }
}
