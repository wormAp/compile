import Lexical from "./lexical/Lexical";
import arrayToGenerator from "./common/arrayToGenerator";
import PeelTokenIterator from "./parser/PeelTokenIterator";
import Expr from "./parser/ast/Expr";

/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
const source = '(1*2!=7)==3!=4*5+6';
let lexer = new Lexical();
let tokens = lexer.analyse(arrayToGenerator([...source]))
let tokenIt = new PeelTokenIterator(arrayToGenerator(tokens));
let ast = Expr.parseExpr(null,tokenIt)
console.log(ast)
