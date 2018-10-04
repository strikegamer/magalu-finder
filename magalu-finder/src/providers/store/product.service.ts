import { Injectable } from '@angular/core';
import { IProduct } from 'models/product.model';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';

@Injectable()
export class ProductService {
	public ProductList: IProduct[]
	public add_subject=new Subject<String>()

	constructor(private http : Http){
		this.ProductList = []
	}

	getProducts(){
		return this.http.get('http://localhost:3000/api/products',{})
	}

	addProduct(item){
		return this.http.post('http://localhost:3000/api/addproduct',{
			productItem : item
		})
	}

	deleteProduct(productId){
		return this.http.post('http://localhost:3000/api/deleteproduct',{
			_id : productId 
		})
	}

	

	
}