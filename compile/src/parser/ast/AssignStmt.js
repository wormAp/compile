import ParseException from "../ParseException";
import Expr from "./Expr";
import ASTNode from "./ASTNode";
import ASTTypes from "./ASTTypes";
import Variable from "./Variable";
import Scalar from "./Scalar";

/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
export default class AssignStmt extends ASTNode{
    constructor(parent) {
        super(parent,ASTTypes.ASSIGN_STMT,'assign');
    }
    static parse(parent,it){
        let assignStmtStmt = new AssignStmt(parent);
        let factor = AssignStmt.generalFactor(parent,it);
        assignStmtStmt.addChild(factor);
        let lexeme = it.nextMatch('=');
        assignStmtStmt._lexeme = lexeme;
        let expr = Expr.parseExpr(parent,it);
        assignStmtStmt.addChild(expr);
        let _token = it.peek();
        if(_token.getValue() === ";"){
            it.nextMatch(";");
        }
        return assignStmtStmt;
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
