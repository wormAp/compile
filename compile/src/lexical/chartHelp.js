/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
const chartReg = /^[a-z|A-Z]$/;
const numberReg = /^[0-9]$/;
const codeReg = /^[_|a-z|A-Z|0-9]$/;
const operatorReg = /^[+|\-|*|\/|\%|\=|\&|^|\||^|,|;]$/
const oneToNine= /^[1-9]$/;
export function isChart(cha) {
    return chartReg.test(cha);
}
export function isNumber(cha) {
    return numberReg.test(cha);
}
export function isOneToNine(ch) {
    return oneToNine.test(ch);
}
export function isCode(cha) {
    return codeReg.test(cha)
}
export function isOperator(cha) {
    return operatorReg.test(cha)
}
