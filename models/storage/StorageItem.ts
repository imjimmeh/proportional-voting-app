export default class StorageItem{
    public Set: Date;
    public Item: any;

    constructor(constructor? :StorageItemType){
        this.Set = constructor?.Set ?? new Date();
        this.Item = constructor?.Item;
    }
}

export type StorageItemType={
    Set?: Date;
    Item: any;
}