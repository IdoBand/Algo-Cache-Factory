import { ICacheAlgo } from "interface/ICacheAlgo";
import { AbstractCacheAlgo } from "AbstractCacheAlgo";

export class CacheFIFO<K, V> extends AbstractCacheAlgo<K, V> implements ICacheAlgo<K, V> {
    #cache = new Map<K, V>();
    #keysQueue: Array<K> = [];
    #oldestKeyIndex: number = 0;

    isFull = () => this._capacity === this.#keysQueue.length;


    getElement(key: K): V | undefined {
        return this.#cache.get(key);
    };

    removeElement(key: K): boolean {
        const idx: number = this.#keysQueue.indexOf(key);
        if (idx > -1) {
            this.#keysQueue.splice(idx, 1);
            this.#cache.delete(key);
            return true;
        }
        return false;
    }

    setElement(key: K, value: V): K | undefined {
        let returnValue = undefined;
        if (this.#cache.has(key)) {
            this.removeElement(key);
            returnValue = key;
            this.#keysQueue.push(key)
            this.#oldestKeyIndex -= 1;
            if (this.#oldestKeyIndex === this._capacity) {
                this.#oldestKeyIndex = 0;
            }
        } else if (this.isFull()) {
            returnValue = this.#keysQueue[this.#oldestKeyIndex];
            this.#cache.set(key, value);
            this.#keysQueue[this.#oldestKeyIndex] = key;
            this.#cache.delete(returnValue)
            this.#oldestKeyIndex += 1;
            if (this.#oldestKeyIndex === this._capacity) {
                this.#oldestKeyIndex = 0;
            }
        } else {
            this.#keysQueue.push(key)
        }
        this.#cache.set(key, value);
        return returnValue;
    }
}