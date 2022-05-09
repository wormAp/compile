/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import Iterator from "../common/Iterator";
import ParseException from "./ParseException";

export default class PeelTokenIterator extends Iterator{
    constructor(it) {
        super(it);
    }
    nextMatch(value){
        let token = this.next();
        if(token.getValue()!==value){
            throw ParseException.fromToken(token);
        }
        return token;
    }
    nextMatch1(type) {
        let token = this.next();
        if(token.getType()!==type){
            throw ParseException.fromToken(token);
        }
        return token;
    }
}
