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
    #head: ListNode<K, V>;
    #size: number;

    constructor() {
        this.#head = null
        this.#size = 0
    }
    public addNode(key: K, value: V): ListNode<K, V>{
        const newNode = new ListNode(key, value)
        if (this.#size === 0){
            this.#head = newNode
        } else {
            const lastNode = this.getLastNode()
            lastNode.next = newNode;
        }
        this.#size += 1;
        return newNode
    }
    public removeNode(key: K): ListNode<K, V> | null {
        let previousNode = null
        let currentNode = this.#head
        while (currentNode){
            if (currentNode.key === key) {
                if (currentNode !== this.#head) {
                    previousNode.next = currentNode.next
                } else {
                    this.#head = currentNode.next
                }
                this.#size -= 1
                return currentNode
            }
            previousNode = currentNode;
            currentNode = currentNode.next;
        }
        return null
    }
    public getLastNode(): ListNode<K, V> | null{
        let currentNode = this.#head
        if (currentNode !== null) {
            while (currentNode.next){
                currentNode = currentNode.next
            }
        }
        return currentNode
    }
    public findNode(key: K): ListNode<K, V> | null {
        let currentNode = this.#head
        if (this.#head) {
            while (currentNode){
                if (currentNode.key === key ) {
                    return currentNode
                }
                currentNode = currentNode.next
            }
        }
        return currentNode
    }
    public listSize(): number{
        return this.#size
    }
    public getHead(): ListNode<K, V> | null{
        return this.#head
    }
    public printList(): void{
        let currentNode = this.#head
        let st: string
        if (!currentNode) {
            console.log('List is empty')
            return
        }
            st = ''
            let counter: number = 1;
            while (currentNode){
                st += (`${counter} - key: ${currentNode.key}, value: ${currentNode.value}\n`)
                currentNode = currentNode.next;
                counter += 1;
        }
        console.log(st)
    }
}