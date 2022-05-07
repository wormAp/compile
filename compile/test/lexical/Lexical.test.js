/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import 'babel-polyfill'
import Lexical from "../../src/lexical/Lexical";
import chai from 'chai';
import arrayToGenerator from "../../src/common/arrayToGenerator";
import TokenTypes from "../../src/lexical/TokenTypes";
const expect = chai.expect;
describe('Lexical_test',()=>{
    function asserToken(token,value,type){
        expect(token.getValue()).to.be.equal(value);
        expect(token.getType()).to.be.equal(type);
    }
    it('expression', function () {
        const source = '(a+b)^100.12==+100-20';
        const lexical = new Lexical();
        const tokens = lexical.analyse(arrayToGenerator([...source]))
        expect(tokens.length).to.be.equal(11);
        asserToken(tokens[0],'(',TokenTypes.BRACKET);
        asserToken(tokens[1],'a',TokenTypes.VARIABLE);
        asserToken(tokens[2],'+',TokenTypes.OPERATOR);
        asserToken(tokens[3],'b',TokenTypes.VARIABLE);
        asserToken(tokens[4],')',TokenTypes.BRACKET);
        asserToken(tokens[5],'^',TokenTypes.OPERATOR);
        asserToken(tokens[6],'100.12',TokenTypes.FLOAT);
        asserToken(tokens[7],'==',TokenTypes.OPERATOR);
        asserToken(tokens[8],'+100',TokenTypes.INT);
        asserToken(tokens[9],'-',TokenTypes.OPERATOR);
        asserToken(tokens[10],'20',TokenTypes.INT);
    });
    it('function_test', function () {
        const source = `
            function test(a,b){
                return a+b;
           }
           test(10.3,10);
        `;
        const lexical = new Lexical();
        const tokens = lexical.analyse(arrayToGenerator([...source]))
        asserToken(tokens[0],'function',TokenTypes.KEYWORD);
        asserToken(tokens[1],'test',TokenTypes.VARIABLE);
        asserToken(tokens[2],'(',TokenTypes.BRACKET);
        asserToken(tokens[3],'a',TokenTypes.VARIABLE);
        asserToken(tokens[4],',',TokenTypes.OPERATOR);
        asserToken(tokens[5],'b',TokenTypes.VARIABLE);
        asserToken(tokens[6],')',TokenTypes.BRACKET);
        asserToken(tokens[7],'{',TokenTypes.BRACKET);
        asserToken(tokens[8],'return',TokenTypes.KEYWORD);
        asserToken(tokens[9],'a',TokenTypes.VARIABLE);
        asserToken(tokens[10],'+',TokenTypes.OPERATOR);
        asserToken(tokens[11],'b',TokenTypes.VARIABLE);
        asserToken(tokens[12],';',TokenTypes.OPERATOR);
        asserToken(tokens[13],'}',TokenTypes.BRACKET);
        asserToken(tokens[14],'test',TokenTypes.VARIABLE);
        asserToken(tokens[15],'(',TokenTypes.BRACKET);
        asserToken(tokens[16],'10.3',TokenTypes.FLOAT);
        asserToken(tokens[17],',',TokenTypes.OPERATOR);
        asserToken(tokens[18],'10',TokenTypes.INT);
        asserToken(tokens[19],')',TokenTypes.BRACKET);
        asserToken(tokens[20],';',TokenTypes.OPERATOR);
    });
    it('delete comment_test', function () {
        const source = "/*qqqqqqqq\nqwqwqwqw*/a=1;";
        const lexical = new Lexical();
        const tokens = lexical.analyse(arrayToGenerator([...source]))
        expect(tokens.length).to.be.equal(4);
    });
});
