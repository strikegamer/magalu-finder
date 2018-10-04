import { Component, OnInit } from '@angular/core';
import { IStore } from 'models/store.model'
import { StoreService } from 'providers/store/store.service'
import { Router } from '@angular/router';

@Component({
    selector: 'store-add',
    templateUrl: './storeadd.component.html',
    styleUrls: ['./storeadd.component.css']

})
export class StoreAddComponent implements OnInit {

    private storeItem: IStore;


    constructor(private storeService: StoreService, private router: Router) {
        this.storeItem = {} as IStore;
    }

    addStore() {
        console.log(this.storeItem);
        //GET GEOCODE BY CEP
        this.storeService.getLocation(this.storeItem['Cep']).subscribe(res => {
            let result = JSON.parse(res["_body"]);            
            this.storeItem.Lat = result.results[0].geometry.location.lat;
            this.storeItem.Lng = result.results[0].geometry.location.lng;
            this.storeService.addStore(this.storeItem).subscribe(res => {
                this.router.navigate(['storelist']);
            })            
          }) 
              
    }

   

    ngOnInit() {

    }
}