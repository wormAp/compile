/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import 'babel-polyfill'
import chai from "chai";
import Lexical from "../../src/lexical/Lexical";
import arrayToGenerator from "../../src/common/arrayToGenerator";
import PeelTokenIterator from "../../src/parser/PeelTokenIterator";
import SimpleParse from "../../src/parser/SimpleParse";
const expect = chai.expect;
describe('simpleParse_test',()=>{
    it('basic_test', function () {
        const source = '1+2+3+4';
        const lexer  = new Lexical();
        const tokens = lexer.analyse(arrayToGenerator([...source]));
        const tokensIt =new PeelTokenIterator(arrayToGenerator(tokens));
        const astNode = SimpleParse(tokensIt);
        expect(astNode.getChildren().length).to.be.equal(2);
        expect(astNode.getChild(0)._lexeme.getValue()).to.be.equal("1");
        expect(astNode._lexeme.getValue()).to.be.equal("+");
        const e2 = astNode.getChild(1);
        expect(e2._lexeme.getValue()).to.be.equal("+");
        expect(e2.getChild(0)._lexeme.getValue()).to.be.equal("2");
        const e3 = e2.getChild(1);
        expect(e3._lexeme.getValue()).to.be.equal("+");
        expect(e3.getChild(0)._lexeme.getValue()).to.be.equal("3");
        expect(e3.getChild(1)._lexeme.getValue()).to.be.equal("4");
    });
});
