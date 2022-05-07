/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import Iterator from "../common/Iterator";
import Token from "./Token";
import TokenTypes from "./TokenTypes";
import {isChart, isNumber, isOperator} from "./chartHelp";
import LexicalException from "./LexicalException";

export default class Lexical {
    analyse(source){
        const tokens = [];
        const it = new Iterator(source,'\0');
        while (it.hasNext()){
            let ch = it.next();
            let lookHead = it.peek();
            if(ch == "\0"){

                break;
            }
            if(ch == ' ' || ch == '\n'){
                continue;
            }
            if(ch=="/"){
                debugger
                if(lookHead=="/"){
                    while (it.hasNext() && (ch=it.next() != '\n'));
                }else if(lookHead == "*"){
                    let vaild = false;
                    while (it.hasNext()){
                        const p = it.next();
                        if(p=="*" && it.peek() == "/"){
                            vaild=true;
                            it.next();
                            break;
                        }
                    }
                    if(!vaild){
                        throw new LexicalException('co,,emt not matched');
                    }
                }
                continue;

            }
            if(ch=="{"||ch=="}" || ch == "(" || ch==")"){
                tokens.push(new Token(TokenTypes.BRACKET,ch));
                continue;
            }
            if(ch == "'" || ch=='"'){
                it.putBack();
                tokens.push(Token.makeString(it));
                continue;
            }
            if(isChart(ch)){
                it.putBack();
                tokens.push(Token.makeVarOrKeyword(it));
                continue;
            }
            if(isNumber(ch)){
                it.putBack();
                tokens.push(Token.makeNumber(it));
                continue;
            }
            //1+5 -5
            if((ch=="+"||ch=="-") && isNumber(lookHead)){
                const lastToken = tokens[tokens.length-1] || null;
                if(lastToken ==null || !lastToken.isScalar()){
                    //"1"+1 //true+1 //-1+1 //1+1 0.5+1
                    it.putBack();
                    tokens.push(Token.makeNumber(it));
                    continue;
                }
            }
            if(isOperator(ch)){
                it.putBack();
                tokens.push(Token.makeOperator(it));
                continue;
            }
            throw LexicalException.fromChar(ch);

        }
        return tokens;
    }
}
