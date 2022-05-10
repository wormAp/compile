/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import 'babel-polyfill'
import chai from "chai";
import Lexical from "../../src/lexical/Lexical";
import arrayToGenerator from "../../src/common/arrayToGenerator";
import PeelTokenIterator from "../../src/parser/PeelTokenIterator";
import Expr from "../../src/parser/ast/Expr";
import {toPostFixExpression} from "../../src/common/ParseUtils";
const expect = chai.expect;
describe('simpleParse_test',()=>{
    function createExpr(source){
        let lexer = new Lexical();
        let tokens = lexer.analyse(arrayToGenerator([...source]))
        let tokenIt = new PeelTokenIterator(arrayToGenerator(tokens));
        return Expr.parseExpr(null,tokenIt)
    }
    it('1+1+1_test', function () {
        expect(toPostFixExpression(createExpr("1+1+1"))).to.be.equal("1 1 1 + +");
    });
    it('"1"==""_test', function () {
        expect(toPostFixExpression(createExpr('"1"==""'))).to.be.equal('"1" "" ==');
    });
    it('1+2*3_test', function () {
        expect(toPostFixExpression(createExpr("1+2*3"))).to.be.equal("1 2 3 * +");
    });
    it('1*2+3_test', function () {
        expect(toPostFixExpression(createExpr("1*2+3"))).to.be.equal("1 2 * 3 +");
    });

    it('1*(2+4)_test', function () {
        expect(toPostFixExpression(createExpr("1*(2+4)"))).to.be.equal("1 2 4 + *");
    });

    it('(1*2!=7)==3!=4*5+6_test', function () {
        expect(toPostFixExpression(createExpr("(1*2!=7)==3!=4*5+6"))).to.be.equal("1 2 * 7 != 3 4 5 * 6 + != ==");
    });

    // it('1*(2+4)_test', function () {
    //     expect(toPostFixExpression(createExpr("1*(2+4)"))).to.be.equal("1 2 4 + *");
    // });
});
