/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import ASTTypes from "../parser/ast/ASTTypes";

export function toPostFixExpression(node) {
    let left = "";
    let right = "";
    switch (node.getType()) {
        case ASTTypes.BINARY_EXPR:
        case ASTTypes.DECLARE_STMT:
        case ASTTypes.ASSIGN_STMT:
            left = toPostFixExpression(node.getChild(0))
            right = toPostFixExpression(node.getChild(1))
            return left+" "+right+" "+node.getLexeme().getValue();
        case ASTTypes.VARIABLE:
        case ASTTypes.SCALAR:
            return node.getLexeme().getValue();
    }
    throw new Error(`${node.getType()} is not match!`)
}
