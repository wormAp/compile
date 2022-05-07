/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import 'babel-polyfill'
import Iterator from "../../src/common/Iterator";
import Token from "../../src/lexical/Token";
import TokenTypes from "../../src/lexical/TokenTypes";
import arrayToGenerator from "../../src/common/arrayToGenerator";
import chai from 'chai';
const expect = chai.expect;
describe('token_test',()=>{
    function asserToken(token,value,type){
        expect(token.getValue()).to.be.equal(value);
        expect(token.getType()).to.be.equal(type);
    }
    it('varOrkeyword_test',()=>{
        let it1 = new Iterator(arrayToGenerator([..."if abc"]));
        let it2 = new Iterator(arrayToGenerator([..."true abc"]));
        let token1 = Token.makeVarOrKeyword(it1);
        let token2 = Token.makeVarOrKeyword(it2);
        it1.next();
        let token3 = Token.makeVarOrKeyword(it1);
        asserToken(token1,'if',TokenTypes.KEYWORD)
        asserToken(token2,'true',TokenTypes.BOOLEAN)
        asserToken(token3,'abc',TokenTypes.VARIABLE)
    })
    it('makeString_test', function () {
        const test = ['"123"',"'123'"]
        test.forEach((item)=>{
            let it = new Iterator(arrayToGenerator([...item]));
            const token = Token.makeString(it);
            asserToken(token,item,TokenTypes.STRING)

        })
    });
    it('makeOperator_test ', function () {
        const test = [
            ["+ xxx",'+'],
            ["++ aaa","++"],
            [`/=g`,"/="],
            ["==2","=="],
            ["!==2","!=="],
            ["===2","==="],
            ['&=1212','&='],
            ["&9ij","&"],
            ["||xas","||"],
            ["^=11212","^="],
            ["%7121","%"]
        ]
        test.forEach((item)=>{
            const [input,expected] = item;
            const it = new Iterator(arrayToGenerator([...input]))
            const token = Token.makeOperator(it);
            asserToken(token,expected,TokenTypes.OPERATOR)
        })
    });
    it('makeNumber_test ', function () {
        const test = [
            "+0 aa",
            "-0 da",
            '.4 qwqwq',
            '.9876 ahda',
            '976.321 ddda',
            '-21 ujg',
            '-156.7862121*6661'
        ]
        test.forEach((item)=>{
            const it = new Iterator(arrayToGenerator([...item]))
            const token = Token.makeNumber(it);
            const [expected] = item.split(/[ *]/);
            const type = item.indexOf('.')==-1?TokenTypes.INT:TokenTypes.FLOAT;
            asserToken(token,expected,type)
        });
    });
});
