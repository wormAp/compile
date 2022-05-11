/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import 'babel-polyfill'
import chai from "chai";
import Lexical from "../../src/lexical/Lexical";
import arrayToGenerator from "../../src/common/arrayToGenerator";
import DeclareStmt from "../../src/parser/ast/DeclareStmt";
import PeelTokenIterator from "../../src/parser/PeelTokenIterator";
import {toPostFixExpression} from "../../src/common/ParseUtils";

const expect = chai.expect;
describe('declareStmtParse_test',()=>{
    it('var_declareStmt_test', function () {
        const source = `var i = 100*2;`;
        let lexical = new Lexical()
        const tokens = lexical.analyse(arrayToGenerator([...source]));
        let it = new PeelTokenIterator(arrayToGenerator(tokens));
        let astNode = DeclareStmt.parse(null,it);
        expect(toPostFixExpression(astNode)).to.be.equal("i 100 2 * =");
    });
    it('const_declareStmt_test', function () {
        const source = `const i = 100*2;`;
        let lexical = new Lexical()
        const tokens = lexical.analyse(arrayToGenerator([...source]));
        let it = new PeelTokenIterator(arrayToGenerator(tokens));
        let astNode = DeclareStmt.parse(null,it);
        expect(toPostFixExpression(astNode)).to.be.equal("i 100 2 * =");
    });
});
