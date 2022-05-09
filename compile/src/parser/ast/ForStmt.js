/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import Stmt from "./Stmt";
import ASTTypes from "./ASTTypes";

export default class ForStmt extends Stmt{
    constructor(parent) {
        super(parent,ASTTypes.FOR_STMT,'for');
    }
}
