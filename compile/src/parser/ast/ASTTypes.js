/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import Enum from "../../common/Enum";
const ASTTypes = {
    BLOCK:new Enum('BLOCK:',1),
    BINARY_EXPR:new Enum('BINARY_EXPR:',2),//1+1
    UNARY_EXPR:new Enum('UNARY_EXPR:',3),//++i
    VARIABLE:new Enum('VARIABLE:',4),
    SCALAR:new Enum('SCALAR:',5),
    IF_STMT:new Enum('IF_STMT:',6),
    WHILE_STMT:new Enum('WHILE_STMT:',7),
    FOR_STMT:new Enum('FOR_STMT:',8),
    DECLARE_STMT:new Enum('DECLARE_STMT:',9),//赋值语句
    FUNCTION_DECLARE_STMT:new Enum('FUNCTION_DECLARE_STMT:',10)
};
export default ASTTypes
