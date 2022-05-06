/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import {isChart,isNumber,isCode,isOperator} from "../../src/lexical/chartHelp";
import chai from "chai";
const expect = chai.expect;
describe('单一字符判断',()=>{
    it('isChart',()=>{
        expect(isChart("a")).to.be.equal(true);
        expect(isChart("1")).to.be.equal(false);
        expect(isChart("D")).to.be.equal(true);
        expect(isChart("_")).to.be.equal(false);
        expect(isChart("*")).to.be.equal(false);
    })
    it('isNumber',()=>{
        expect(isNumber("a")).to.be.equal(false);
        expect(isNumber("1")).to.be.equal(true);
        expect(isNumber("0")).to.be.equal(true);
        expect(isNumber("_")).to.be.equal(false);
        expect(isChart("*")).to.be.equal(false);
    })
    it('isCode',()=>{
        expect(isCode("a")).to.be.equal(true);
        expect(isCode("1")).to.be.equal(true);
        expect(isCode("0")).to.be.equal(true);
        expect(isCode("_")).to.be.equal(true);
        expect(isCode("*")).to.be.equal(false);
    })
    it('isCode',()=>{
        expect(isOperator("+")).to.be.equal(true);
        expect(isOperator("-")).to.be.equal(true);
        expect(isOperator("*")).to.be.equal(true);
        expect(isOperator("/")).to.be.equal(true);
        expect(isOperator("%")).to.be.equal(true);
        expect(isOperator("^")).to.be.equal(true);
        expect(isOperator("|")).to.be.equal(true);
        expect(isOperator("a")).to.be.equal(false);
        expect(isOperator("1")).to.be.equal(false);
    })
})
