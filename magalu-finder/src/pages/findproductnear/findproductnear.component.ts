import { Component, OnInit } from '@angular/core';
import { IStore } from 'models/store.model'
import { IProduct } from 'models/product.model'
import { StoreService } from 'providers/store/store.service'
import { ProductService } from 'providers/store/product.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-findproductnear',
  templateUrl: './findproductnear.component.html',
  styleUrls: ['./findproductnear.component.css']
})
export class FindProductNearComponent implements OnInit {

  private storeList:any[];
  private productItem: IProduct;
  private originLat:any;
  private originLng:any;
  private productFind = {};
  private search = false;

  constructor(private productService: ProductService, private storeService: StoreService, private router: Router) {
  }

  ngOnInit() { 
    this.getAllStores();    
  }

  findNear(){
    
    //GET ORIGIN GEOCODE
    this.storeService.getLocation(this.productFind['Cep']).subscribe(res => {
      let result = JSON.parse(res["_body"]);     
      
      //place.address_components[i]
      this.originLat = result.results[0].geometry.location.lat;
      this.originLng = result.results[0].geometry.location.lng;

      //NEW LIST ORDER BY GEOCODE
      this.orderPlaces();
      this.search = true;
    }) 


    

  }

   orderPlaces() {
    for (let i = 0; i < this.storeList.length; i++) {
     
        let placeLat = this.storeList[i].Lat;
        let placeLng = this.storeList[i].Lng;

        //CALC TO MAKE DISTANCE BETWEEN COORDINATES
        var distance = Math.sqrt(Math.pow(69.1 * (placeLat - this.originLat), 2) +
          Math.pow(69.1 * (this.originLng - placeLng) * Math.cos(placeLat / 57.3), 2));

        this.storeList[i].distance = distance;
    }

    //ORDER
    this.storeList = this.storeList.sort((n1, n2) => n1.distance - n2.distance);
    console.log("ordering places");
    console.log(this.storeList);
  }

  getAllStores() {
    console.log("get all stores");
    this.storeService.getStores().subscribe(res => {
      let result = JSON.parse(res["_body"]);
      this.storeList = result.data;     
    })
  }

  addProduct() {
    console.log(this.productItem);
    this.productService.addProduct(this.productItem).subscribe(res => {
      this.router.navigate(['productlist']);
    })
  }
  

}
