import { ICacheAlgo } from "../interface/ICacheAlgo";
import { AbstractCacheAlgo } from "../AbstractCacheAlgo";
import { LinkedList } from "./LinkedList";

export class CacheFIFO<K, V> extends AbstractCacheAlgo<K, V> implements ICacheAlgo<K, V> {

    #keysQueue: LinkedList<K, V> = new LinkedList;

    isFull = (): Boolean => {
        return this._capacity === this.#keysQueue.listSize()
    };
    getElement(key: K): V | undefined {
        let returnValue = this.#keysQueue.findNode(key);
        if (returnValue) {
            return returnValue.value
        }
        return undefined
    };

    removeElement(): boolean {
        const head = this.#keysQueue.getHead()
        if (head) {
            this.#keysQueue.removeNode(head.key);
            return true
        }
        return false;
    }
    setElement(key: K, value: V): K | undefined {
        let returnValue = undefined;
        if (this.#keysQueue.findNode(key)) {
            // key already exists
            return returnValue
        } else if (this.isFull()) {
            // key already exists and list is full
            returnValue = this.#keysQueue.getHead().key
            this.removeElement()
        } 
        this.#keysQueue.addNode(key, value)
        return returnValue
    }
}
