import { Component, OnInit } from '@angular/core';
import { StoreService } from 'providers/store/store.service'
import { IStore } from 'models/store.model'

@Component({
  selector: 'store-list',
  templateUrl: './storelist.component.html',
  styleUrls: ['./storelist.component.css']
})
export class StoreListComponent implements OnInit {

	private storeList:IStore[];

	constructor(private storeService:StoreService){

	}

	ngOnInit(){
		this.getAllStores()
	}

	getAllStores(){
		this.storeService.getStores().subscribe(res =>{
			this.storeList  = [];
			res.json().data.map(e => {
				this.storeList.push(e);
			})
		})
	}

	deleteStore(storeId){
		this.storeService.deleteStore(storeId).subscribe(res =>{
			console.log(storeId + " deleted");
			this.getAllStores();	
		})
		
	}

}