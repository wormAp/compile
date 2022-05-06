/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
export default class LexicalException extends Error{
    constructor(msg) {
        super(msg);
    }
    static fromChar(c){
        return new LexicalException(`unexpected char ${c}`)
    }
}
