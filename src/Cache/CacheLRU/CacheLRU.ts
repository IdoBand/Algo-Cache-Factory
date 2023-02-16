import {AbstractCacheAlgo} from "../AbstractCacheAlgo";
import {ICacheAlgo} from "../interface/ICacheAlgo";
import {DoublyLinkedList, DoublyLinkedListNode} from "./DoublyLinkedListNode";

export class CacheLRU<K, V> extends AbstractCacheAlgo<K, V> implements ICacheAlgo<K, V> {
    private linkedList = new DoublyLinkedList<K, V>();
    private cacheMap = new Map<K, DoublyLinkedListNode<K, V>>();
    isFull = () => this._capacity === this.cacheMap.size;

    getElement(key: K): V | undefined {
        const existingNode = this.cacheMap.get(key);
        if (existingNode) {
            const value = existingNode.value;
            // Make the node as the new head of LinkedList if not already
            if (this.linkedList.head !== existingNode) {
                this.linkedList.remove(existingNode);
                this.linkedList.addFirst(key, value);
            }
            return value;
        } else {
            return undefined;
        }
    }

    removeElement(key: K): boolean {
        const existingNode = this.cacheMap.get(key);
        if (existingNode) {
            this.linkedList.remove(existingNode);
        }
        return this.cacheMap.delete(key);
    }

    setElement(key: K, value: V): K | undefined {
        let returnValue = undefined;
        const existingNode = this.cacheMap.get(key);
        if (existingNode) {
            this.removeElement(key);
            returnValue = key;
        } else if (this.isFull()) {
            returnValue = this.linkedList.tail.key;
            this.cacheMap.delete(this.linkedList.tail.key);
            this.linkedList.removeLast();
        }
        this.linkedList.addFirst(key, value);
        this.cacheMap.set(key, this.linkedList.head);
        return returnValue;
    }
};