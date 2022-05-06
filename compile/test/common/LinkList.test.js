/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import LinkList from "../../src/common/LinkList";
import chai from "chai";
const expect = chai.expect;
describe('LinkList测试',()=>{
    it('getSize测试',()=>{
        let linkList = new LinkList();
        linkList.addLast(1);
        linkList.addLast(2);
        expect(linkList.getSize()).to.be.equal(2);
        linkList.removeFirst();
        expect(linkList.getSize()).to.be.equal(1);
        linkList.addFirst(2);
        expect(linkList.getSize()).to.be.equal(2);
        linkList.removeLast();
        expect(linkList.getSize()).to.be.equal(1);
        linkList.removeLast();
        expect(linkList.getSize()).to.be.equal(0);
    })
    it('接口测试',()=>{
        let linkList = new LinkList();
        linkList.addLast(1);
        linkList.addLast(2);
        expect(linkList.toString()).to.be.equal("1->2");
        expect(linkList.getFirst()).to.be.equal(1);
        expect(linkList.getLast()).to.be.equal(2);
        linkList.addFirst(3);
        expect(linkList.toString()).to.be.equal("3->1->2");
        linkList.addFirst(4);
        expect(linkList.toString()).to.be.equal("4->3->1->2");
        expect(linkList.getFirst()).to.be.equal(4);
        expect(linkList.removeLast()).to.be.equal(2);
        expect(linkList.toString()).to.be.equal("4->3->1");
        expect(linkList.getLast()).to.be.equal(1);
        expect(linkList.removeFirst()).to.be.equal(4);
        expect(linkList.toString()).to.be.equal("3->1");
        expect(linkList.removeFirst()).to.be.equal(3);
        expect(linkList.toString()).to.be.equal("1");
        expect(linkList.getFirst()).to.be.equal(1);
        expect(linkList.removeFirst()).to.be.equal(1);
        expect(linkList.toString()).to.be.equal("");
        expect(linkList.isEmpty()).to.be.equal(true);
    })
});
