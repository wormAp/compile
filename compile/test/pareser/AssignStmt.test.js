/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import 'babel-polyfill'
import chai from "chai";
import Lexical from "../../src/lexical/Lexical";
import arrayToGenerator from "../../src/common/arrayToGenerator";
import PeelTokenIterator from "../../src/parser/PeelTokenIterator";
import {toPostFixExpression} from "../../src/common/ParseUtils";
import AssignStmt from "../../src/parser/ast/AssignStmt";

const expect = chai.expect;
describe('assignStmtParse_test',()=>{
    it('assignStmt_test', function () {
        const source = `i = 100*2;`;
        let lexical = new Lexical()
        const tokens = lexical.analyse(arrayToGenerator([...source]));
        let it = new PeelTokenIterator(arrayToGenerator(tokens));
        let astNode = AssignStmt.parse(null,it);
        expect(toPostFixExpression(astNode)).to.be.equal("i 100 2 * =");
    });
});
