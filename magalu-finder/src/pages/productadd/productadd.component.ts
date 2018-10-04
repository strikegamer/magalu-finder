import { Component, OnInit } from '@angular/core';
import { IStore } from 'models/store.model'
import { IProduct } from 'models/product.model'
import { StoreService } from 'providers/store/store.service'
import { ProductService } from 'providers/store/product.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductAddComponent implements OnInit {

  private storeList: IStore[];
  private productItem: IProduct;
  private storeSelected: any;
  selected = null;

  constructor(private productService: ProductService, private storeService: StoreService, private router: Router) {
  }

  ngOnInit() { 
    this.productItem = { } as IProduct;    
    this.getAllStores();
    
  }

  onStoreSelected(event){
    console.log(this.storeSelected);
    this.productItem.StoreId = this.storeSelected;
    console.log(this.productItem);
   }

  getAllStores() {
    this.storeService.getStores().subscribe(res => {
      this.storeList = [];
      res.json().data.map(e => {
        this.storeList.push(e);
      })
      console.log(this.storeList);
    })
  }

  addProduct() {
    console.log(this.productItem);
    this.productService.addProduct(this.productItem).subscribe(res => {
      this.router.navigate(['productlist']);
    })
  }


}
