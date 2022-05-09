/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import Expr from "./ast/Expr";
import Scalar from "./ast/Scalar";
import ASTTypes from "./ast/ASTTypes";
//expr -> digit + expr|digit
//digit->1|2|3...|9
export default function simpleParse(it) {

    const expr = new Expr(null);
    const scale = new Scalar(expr,it);
    if(!it.hasNext()){
        return scale;
    }
    expr.addChild(scale);
    const op = it.nextMatch("+");
    expr.addChild(simpleParse(it))
    expr._label = "+";
    expr._type = ASTTypes.BINARY_EXPR;
    expr._lexeme = op;
    return expr;
}
