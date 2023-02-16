import {describe} from "node:test";
import {expect} from "chai";
import {CacheFIFO} from "./CacheFIFO";

const testFIFO = new CacheFIFO(3);

describe('this is for Cache FIFO, _capacity = 3', () => {
    it(`getElement, should return undefined for getting non-existing key 1`, () => {
        const isFull = testFIFO.isFull()
        expect(isFull).to.equals(false)
        const res = testFIFO.getElement(1);
        expect(res).to.equals(undefined);
    });
    it(`setElement, should return undefined for setting a new key 1`, () => {
        const res = testFIFO.setElement(1, 1);
        expect(res).to.equals(undefined);
        const isFull = testFIFO.isFull()
        expect(isFull).to.equals(false)
    });
    it(`getElement, should return 1 for getting existing key 1`, () => {
        const res = testFIFO.getElement(1)
        expect(res).to.equals(1);
    });
    it(`setElement, should return undefined for setting an existing key 1`, () => {
        const res = testFIFO.setElement(1, 1);
        expect(res).to.equals(undefined);
    });
    it(`setElement, should return undefined for setting a new key 2`, () => {
        const res = testFIFO.setElement(2, 2);
        expect(res).to.equals(undefined);
        const isFull = testFIFO.isFull()
        expect(isFull).to.equals(false)
    });
    it(`setElement, should return undefined for setting a new key 3`, () => {
        const res = testFIFO.setElement(3, 3);
        expect(res).to.equals(undefined);
    });
    it(`setElement, should return undefined for setting an existing key 3`, () => {
        const res = testFIFO.setElement(3, 3);
        expect(res).to.equals(undefined);
    });
    it(`isFull, should return true because we have 3 nodes and _capacity = 3`, () => {
        const res = testFIFO.isFull();
        expect(res).to.equals(true);
    });
    it(`removeElement, should return true for removing existing node 1`, () => {
        const res = testFIFO.removeElement();
        expect(res).to.equals(true)
    });
    it(`getElement, should return undefined after deletion for getting non-existing key 1`, () => {
        const res = testFIFO.getElement(1);
        expect(res).to.equals(undefined)
    });
    it(`isFull, should return false because we have 2 nodes and _capacity = 3`, () => {
        const res = testFIFO.isFull();
        expect(res).to.equals(false)
    });
    it(`setElement, should return a FIFO key: 1 for setting a new key 4 and _capacity = 3 is full`, () => {
        // resetting the cache to have 0 elements
        testFIFO.removeElement()
        testFIFO.removeElement()
        testFIFO.removeElement()
        testFIFO.setElement(1,1)
        testFIFO.setElement(2,2)
        testFIFO.setElement(3,3)
        const res = testFIFO.setElement(4, 4);
        expect(res).to.equals(1);
    });
});