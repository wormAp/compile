/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import TokenTypes from "./TokenTypes";
import {isCode, isNumber, isOneToNine} from "./chartHelp";
import LexicalException from "./LexicalException";
const keywordSet = new Set([
    'if','else','do','while','for','let',
    'const','var','class','extends','function',
    'break','switch','default','new','return','void',
    'catch','continue','this','with','throw','delete',
    'in','try','instranceof','typeof'
]);
export default class Token {
    constructor(type,val) {
        this._type = type;
        this._val = val;
    }
    getValue(){
        return this._val;
    }
    getType(){
        return this._type;
    }
    isVariable(){
        return this._type === TokenTypes.VARIABLE;
    }
    //标量
    isScalar(){
        return this._type===TokenTypes.BOOLEAN || this._type === TokenTypes.FLOAT||
            this._type===TokenTypes.INT || this._type === TokenTypes.STRING;
    }

    /**
     *
     *           [_|a-z|A-Z]
     * 1=============================>2
     *        [_|a-z|A-Z|0-9]
     * 2=============================>2
     *
     *
     */
    static makeVarOrKeyword(it){
        let s = "";
        while (it.hasNext()){
            let ch = it.peek();
            if(isCode(ch)){
                s+=ch;
            }else{
                break;
            }
            it.next();
        }
        if(keywordSet.has(s)){
            return new Token(TokenTypes.KEYWORD,s);
        }
        if(s=="true" || s=="false"){
            return new Token(TokenTypes.BOOLEAN,s);
        }
        return new Token(TokenTypes.VARIABLE,s);
    }

    static makeString(it){
        let s = "";
        let state = 0;
        while (it.hasNext()){
            let ch = it.peek();
            switch (state) {
                case 0:
                    if(ch==="'"){
                        state=1;
                    }else{
                        state=2;
                    }
                    s+=ch;
                    break;
                case 1:
                    if(ch!=="'"){
                        s+=ch;
                    }else{
                        it.next();
                        return new Token(TokenTypes.STRING,s+ch);
                    }
                    break;
                case 2:
                    if(ch!=='"'){
                        s+=ch;
                    }else {
                        it.next();
                        return new Token(TokenTypes.STRING,s+ch);
                    }
                    break;
            }
            it.next();
        }
        throw new LexicalException('unexpected error');
    }
    //OPERATOR
    static makeOperator(it){
        let state = 0;
        while (it.hasNext()){
            let ch = it.peek();
            switch (state) {
                case 0:
                    switch (ch) {
                        case "+":state=1;break;
                        case "-":state=2;break;
                        case "*":state=3;break;
                        case "/":state=4;break;
                        case ">":state=5;break;
                        case "<":state=6;break;
                        case "=":state=7;break;
                        case "!":state=8;break;
                        case "&":state=9;break;
                        case "|":state=10;break;
                        case "^":state=11;break;
                        case "%":state=12;break;
                        case ",":
                            it.next();
                            return new Token(TokenTypes.OPERATOR,ch);
                        case ";":
                            it.next();
                            return new Token(TokenTypes.OPERATOR,ch);
                    }
                    break;
                case 1:
                    if(ch==="+"){
                        it.next();
                        return new Token(TokenTypes.OPERATOR,"++");
                    }else if(ch==="="){
                        it.next();
                        return new Token(TokenTypes.OPERATOR,'+=')
                    }else{
                        return new Token(TokenTypes.OPERATOR,"+");
                    }
                    break;
                case 2:
                    if(ch==="-"){
                        it.next();
                        return new Token(TokenTypes.OPERATOR,"--");
                    }else if(ch==="="){
                        it.next();
                        return new Token(TokenTypes.OPERATOR,'-=')
                    }else{
                        return new Token(TokenTypes.OPERATOR,"-");
                    }
                    break;
                case 3:
                    if(ch==="="){
                        it.next();
                        return new Token(TokenTypes.OPERATOR,'*=')
                    }else{
                        return new Token(TokenTypes.OPERATOR,"*");
                    }
                    break;
                case 4:
                   if(ch==="="){
                        it.next();
                        return new Token(TokenTypes.OPERATOR,'/=')
                    }else{
                        return new Token(TokenTypes.OPERATOR,"/");
                    }
                    break;
                case 5:
                    if(ch===">"){
                        it.next();
                        return new Token(TokenTypes.OPERATOR,">>");
                    }else if(ch==="="){
                        it.next();
                        return new Token(TokenTypes.OPERATOR,'>=')
                    }else{
                        return new Token(TokenTypes.OPERATOR,">");
                    }
                    break;
                case 6:
                    if(ch==="<"){
                        it.next();
                        return new Token(TokenTypes.OPERATOR,"<<");
                    }else if(ch==="="){
                        it.next();
                        return new Token(TokenTypes.OPERATOR,'<=')
                    }else{
                        return new Token(TokenTypes.OPERATOR,"<");
                    }
                    break;
                case 7:
                    if(ch==="="){
                        it.next();
                        let nextChar = it.peek();
                        if(nextChar === "="){
                            it.next();
                            return new Token(TokenTypes.OPERATOR,"===");
                        }
                        return new Token(TokenTypes.OPERATOR,"==");
                    }else{
                        return new Token(TokenTypes.OPERATOR,"=");
                    }
                    break;
                case 8:
                    if(ch==="="){
                        it.next();
                        let nextChar = it.peek();
                        if(nextChar === "="){
                            it.next();
                            return new Token(TokenTypes.OPERATOR,"!==");
                        }
                        return new Token(TokenTypes.OPERATOR,"!=");
                    }else{
                        return new Token(TokenTypes.OPERATOR,"!");
                    }
                    break;
                case 9:
                    if(ch==="&"){
                        it.next();
                        return new Token(TokenTypes.OPERATOR,"&&");
                    }else if(ch==="="){
                        it.next();
                        return new Token(TokenTypes.OPERATOR,'&=')
                    }else{
                        return new Token(TokenTypes.OPERATOR,"&");
                    }
                    break;
                case 10:
                    if(ch==="|"){
                        it.next();
                        return new Token(TokenTypes.OPERATOR,"||");
                    }else if(ch==="="){
                        it.next();
                        return new Token(TokenTypes.OPERATOR,'|=')
                    }else{
                        return new Token(TokenTypes.OPERATOR,"|");
                    }
                    break;
                case 11:
                    if(ch==="^"){
                        it.next();
                        return new Token(TokenTypes.OPERATOR,"^^");
                    }else if(ch==="="){
                        it.next();
                        return new Token(TokenTypes.OPERATOR,'^=')
                    }else{
                        return new Token(TokenTypes.OPERATOR,"^");
                    }
                    break;
                case 12:
                    if(ch==="="){
                        it.next();
                        return new Token(TokenTypes.OPERATOR,"%=");
                    }else{
                        return new Token(TokenTypes.OPERATOR,"%");
                    }
                    break;
            }
            it.next();
        }
        throw new LexicalException('unexpected error');
    }
    //number
    static makeNumber(it){
        let s = "";
        let state = 0;
        while (it.hasNext()){
            let ch = it.peek();
            switch (state) {
                case 0:
                    if(ch==="0"){
                        state=1;
                    }else if(isOneToNine(ch)){
                        state=2;
                    }else if(ch==="+"||ch==="-"){
                        state=3;
                    }else if(ch==="."){
                        //.
                        state=5;
                    }
                    break;
                case 1:
                    if(ch==="0"){
                        state=1;
                    }else if(ch=="."){
                        state=4;
                    }else if(isOneToNine(ch)){
                        state = 2;
                    }else{
                        return new Token(TokenTypes.INT,s);
                    }
                    break;
                case 2:
                    if(isNumber(ch)){
                        state=2;
                    }else if(ch==="."){
                        state=4;
                    }else{
                        return new Token(TokenTypes.INT,s);
                    }
                    break;
                case 3:
                    if(isNumber(ch)){
                        state=2;
                    }else if(ch==="."){
                        state=5;
                    }else{
                        throw LexicalException.fromChar(ch);
                    }
                    break;
                case 4:
                    if(ch==="."){
                        throw LexicalException.fromChar(ch);
                    }else if(isNumber(ch)){
                        state=20;
                    }else{
                        return new Token(TokenTypes.FLOAT,s);
                    }
                    break;
                case 5:
                    if(isNumber(ch)){
                        state=20;
                    }else{
                        throw LexicalException.fromChar(ch);
                    }
                    break;
                case 20:
                    if(isNumber(ch)){
                        state=20;
                    }else if(ch==="."){
                        throw LexicalException.fromChar(ch);
                    }else{
                        return new Token(TokenTypes.FLOAT,s);
                    }
                    break;
            }
            s+=ch;
            it.next();
        }

        throw new LexicalException('unexpected error');
    }
}
