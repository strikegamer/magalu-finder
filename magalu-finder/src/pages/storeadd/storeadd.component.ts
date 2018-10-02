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
        this.storeService.addStore(this.storeItem).subscribe(res => {
            this.router.navigate(['storelist']);
        })        
    }

   

    ngOnInit() {

    }
}