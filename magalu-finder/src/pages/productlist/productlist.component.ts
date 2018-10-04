import { Component, OnInit } from '@angular/core';
import { StoreService } from 'providers/store/store.service'
import { ProductService } from 'providers/store/product.service'
import { IProduct } from 'models/product.model'
import { resolve } from 'path';

@Component({
  selector: 'product-list',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductListComponent implements OnInit {

	private productList=[];
	private storeList=[];
	

	constructor(private productService:ProductService, private storeService:StoreService){

	}

	getAllStoresAndProducts() {
		this.storeService.getStores().subscribe(res => {		  
		  res.json().data.map(e => {
			this.storeList.push(e);
			this.getAllProducts();
		  })
		})
	  }

	ngOnInit(){
		this.getAllStoresAndProducts();	
	}

	getAllProducts(){
		this.productService.getProducts().subscribe(res =>{
			let results = JSON.parse(res["_body"]);			
			 this.productList  = [];
			 results.data.map(e => {
				this.productList.push(e);	
				for(let result of this.productList){
					result.StoreName = this.storeName(result.StoreId);
				 }			
			})			
		})
	}
	
	// productFindInStoreByName(productName){	  
	//   let store = this.productList.find(item => item._id == storeId);
	//   return store.Name;
  // }
  
  storeName(storeId){
	  let store = this.storeList.find(item => item._id == storeId);
	  return store.Name;
  }

	deleteProduct(productId){
		this.productService.deleteProduct(productId).subscribe(res =>{
			console.log(productId + " deleted");
			this.getAllProducts();	
		})
		
	}

}