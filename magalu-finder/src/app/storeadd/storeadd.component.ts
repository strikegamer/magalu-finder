import { Component, OnInit } from '@angular/core';
import { IStore } from './store.model'
import { CommonService } from '../common/common.service'
import { Router } from '@angular/router';

@Component({
    selector: 'store-add',
    templateUrl: './storeadd.component.html',
    styleUrls: ['./storeadd.component.css']

})
export class StoreAddComponent implements OnInit {

    private storeItem: IStore;


    constructor(private commonService: CommonService, private router: Router) {
        this.storeItem = {} as IStore;
    }

    addStore() {
        console.log(this.storeItem);
        this.commonService.addStore(this.storeItem).subscribe(res => {
            this.router.navigate(['storelist']);
        })        
    }

   

    ngOnInit() {

    }
}