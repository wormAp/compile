/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
export default class ParseException extends Error{
    constructor(msg) {
        super(msg);
    }
    static fromToken(token){
        return new ParseException(`syntax Error,unexpected token ${token.getValue()}`)
    }
}
