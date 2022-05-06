/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import 'babel-polyfill'
import Iterator from "../../src/common/Iterator";
import arrayToGenerator from "../../src/common/arrayToGenerator";
import chai from "chai";
const expect = chai.expect;

describe('test Iterator',()=>{
    it('test_peek',()=>{
        const it = new Iterator(arrayToGenerator([...'abcdfef']));
        expect(it.next()).to.be.equal('a');
        expect(it.next()).to.be.equal('b');
        expect(it.peek()).to.be.equal('c');
        expect(it.peek()).to.be.equal('c');
        expect(it.next()).to.be.equal('c');
        expect(it.next()).to.be.equal('d');
    })
    it('test_lookhead2',()=>{
        const it = new Iterator(arrayToGenerator([...'abcdfef']));
        expect(it.next()).to.be.equal('a');
        expect(it.next()).to.be.equal('b');
        expect(it.peek()).to.be.equal('c');
        expect(it.peek()).to.be.equal('c');
        expect(it.next()).to.be.equal('c');
        it.putBack()
        it.putBack()
        expect(it.next()).to.be.equal('b');
        expect(it.next()).to.be.equal('c');
        expect(it.next()).to.be.equal('d');
    })
    it('test_endToken',()=>{
        let str = 'abcdfef';
        const it = new Iterator(arrayToGenerator([...str]),'\0');
        for(let i=0;i<8;i++){
            if(i===7){
                expect(it.next()).to.be.equal('\0');
            }else{
                expect(it.next()).to.be.equal(str[i]);
            }
        }
    })
})
