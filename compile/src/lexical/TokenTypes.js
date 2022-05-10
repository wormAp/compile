/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import Enum from "../common/Enum";
//KEYWORD VARIABLE OPERATOR BRACKET STRING FLOAT INT BOOLEAN
const TokenTypes = {
    KEYWORD:new Enum('KEYWORD',1),//关键子 if else function do while for let const var switch case class extends
    VARIABLE:new Enum('VARIABLE',2), //abc
    OPERATOR:new Enum('OPERATOR',3),//+ - * / ^ & % = += !=....
    BRACKET:new Enum('BRACKET',4),//{} () []
    STRING:new Enum('STRING',5),//"11122" '1122'
    FLOAT:new Enum('FLOAT',6),//0.1 1. 0.4 .4
    INT:new Enum('INT',7),//1 2 3
    BOOLEAN:new Enum('BOOLEAN',8),// true false
}
export default TokenTypes;
