/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import ASTNode from "./ASTNode";
export default class Stmt extends ASTNode{
    constructor(parent,type,label) {
        super(parent,type,label);
    }
}
