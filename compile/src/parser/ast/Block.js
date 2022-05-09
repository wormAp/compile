/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import Stmt from "./Stmt";
import ASTTypes from "./ASTTypes";

/**
 * {
 *     语句块
 * }
 */
export default class Block extends Stmt{
    constructor(parent) {
        super(parent,ASTTypes.BLOCK,'block');
    }
}
