import { Injectable } from '@angular/core';
import { IStore } from 'models/store.model';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';

@Injectable()
export class StoreService {
	public storeList: IStore[]
	public add_subject=new Subject<String>()

	constructor(private http : Http){
		this.storeList = []
	}

	getStores(){
		return this.http.get('http://localhost:3000/api/stores',{})
	}

	addStore(item){
		return this.http.post('http://localhost:3000/api/addstore',{
			storeItem : item
		})
	}

	deleteStore(storeId){
		return this.http.post('http://localhost:3000/api/deletestore',{
			_id : storeId 
		})
	}

	

	
}