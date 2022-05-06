import StorageItem from "../models/storage/StorageItem";
import { StorageType } from "../models/storage/StorageType";


export default class StorageManager{

    constructor(){
        this.getItem = this.getItem.bind(this);
        this.getStorage = this.getStorage.bind(this);
    }

    getItem<T>(storageType: StorageType, key: string) : T | null{
        let storage = this.getStorage(storageType);
        let item: any = storage.getItem(key);

        if(item == null)
            return null;

        let serialisedResult = JSON.parse(item);
        let asStorageItem = Object.assign(new StorageItem(), serialisedResult);

        return asStorageItem;
    }

    setItem(storageType: StorageType, key: string, value: any){
        let storage = this.getStorage(storageType);

        let storageItem = new StorageItem({Item: value});
        storage.setItem(key, JSON.stringify(storageItem));
    }

    private getStorage(storageType: StorageType) : Storage {
        switch(storageType)
        {
            case StorageType.Local:
                return localStorage;
            case StorageType.Session:
                return sessionStorage;
            default:
                throw `Could not find storage type matching ${storageType}`;
        }
    }
}