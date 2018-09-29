import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service'
import { IStore } from '../storeadd/store.model'

@Component({
  selector: 'store-list',
  templateUrl: './storelist.component.html',
  styleUrls: ['./storelist.component.css']
})
export class StoreListComponent implements OnInit {

	private storeList:IStore[];

	constructor(private commonService:CommonService){

	}

	ngOnInit(){
		this.getAllStores()
	}

	getAllStores(){
		this.commonService.getStores().subscribe(res =>{
			this.storeList  = [];
			res.json().data.map(e => {
				this.storeList.push(e);
			})
		})
	}

	deleteStore(storeId){
		this.commonService.deleteStore(storeId).subscribe(res =>{
			console.log(storeId + " deleted");
			this.getAllStores();	
		})
		
	}

}