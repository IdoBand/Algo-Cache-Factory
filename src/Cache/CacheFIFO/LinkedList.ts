export class ListNode<K, V> {
    public key: K;
    public value: V;
    public next: ListNode<K, V> | null;
    constructor(key: K, value: V) {
        this.key = key;
        this.value = value
        this.next = null
    }
}
export class LinkedList<K, V>{
    public head: ListNode<K, V>;
    public size: number;

    constructor() {
        this.head = null
        this.size = 0
    }
    public addNode(key: K, value: V): ListNode<K, V>{
        const newNode = new ListNode(key, value)
        if (this.size === 0){
            this.head = newNode
        }
        const lastNode = this.getLastNode()
        lastNode.next = newNode;
        return newNode
    }
    public removeNode(key: K): ListNode<K, V> | null {
        let previousNode = null
        let currentNode = this.head
        while (currentNode.next){
            if (currentNode.key === key) {
                if (currentNode !== this.head) {
                    previousNode.next = currentNode.next
                } else {
                    this.head = currentNode.next
                }
                return currentNode
            }
            previousNode = currentNode;
            currentNode = currentNode.next;
        }
        return null
    }
    public getLastNode(): ListNode<K, V> | null{
        let currentNode = this.head
        while (currentNode.next){
            currentNode = currentNode.next
        }
        return currentNode
    }
    public findNodeByKey(key: K): ListNode<K, V> | null {
        let currentNode = this.head
        while (currentNode.next){
            if (currentNode.key === key ) {
                return currentNode
            }
            currentNode = currentNode.next
        }
        return null
    }
}
