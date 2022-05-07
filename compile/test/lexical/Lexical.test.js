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
});
