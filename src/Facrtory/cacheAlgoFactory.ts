import { AbstractCacheAlgo } from "../Cache/AbstractCacheAlgo";
import { CacheFIFO } from "../Cache/CacheFIFO/CacheFIFO";
import { CacheLRU } from "../Cache/CacheLRU/CacheLRU";
import { CacheRandom } from "../Cache/CacheRandom/CacheRandom";

////////////////         C R E A T O R S         ////////////////

abstract class CacheAlgoCreator<K,V> {
    public abstract createCacheAlgo(capacity: number): AbstractCacheAlgo<K,V>;
};

class cacheFIFOCreator<K,V> extends CacheAlgoCreator<K,V>{

    createCacheAlgo(capacity: number): AbstractCacheAlgo<K,V>{
        return new CacheFIFO<K,V>(capacity);
    };
};

class cacheLRUCreator<K,V> extends CacheAlgoCreator<K,V>{

    createCacheAlgo(capacity: number): AbstractCacheAlgo<K,V>{
        return new CacheLRU<K,V>(capacity);
    };
};

class cacheRandomCreator<K,V> extends CacheAlgoCreator<K,V>{

    createCacheAlgo(capacity: number): AbstractCacheAlgo<K,V>{
        return new CacheRandom<K,V>(capacity);
    };
};

////////////////         F A C T O R Y         ////////////////

export class CacheAlgoFactory<K,V> {
    map: Map<string, CacheAlgoCreator<K,V>>;
    _capacity: string
    constructor(capacity: string){
        this._capacity = capacity;
        this.map = new Map<string, CacheAlgoCreator<K,V>>();
        this.map.set('fifo', new cacheFIFOCreator<K,V>());
        this.map.set('lru', new cacheLRUCreator<K,V>());
        this.map.set('random', new cacheRandomCreator<K,V>())
    };

    public clientCode(creatorStr: string, capacity: number) {
        let creator = this.map.get(creatorStr);
        if (!creator) {
            throw new Error('could not get creator!')
        }
        return creator.createCacheAlgo(capacity);
    } 
};