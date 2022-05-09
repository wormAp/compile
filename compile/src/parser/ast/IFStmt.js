/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import Stmt from "./Stmt";
import ASTTypes from "./ASTTypes";

export default class IFStmt extends Stmt{
    constructor(parent) {
        super(parent,ASTTypes.IF_STMT,'if');
    }
}
