import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

//Pages
import { StoreAddComponent } from 'pages/storeadd/storeadd.component';
import { StoreListComponent } from '../pages/storelist/storelist.component';
import { ProductAddComponent } from '../pages/productadd/productadd.component';
import { ProductListComponent } from '../pages/productlist/productlist.component'
import { FindProductNearComponent } from '../pages/findproductnear/findproductnear.component';

//Services
import { StoreService } from 'providers/store/store.service';
import { ProductService } from 'providers/store/product.service';

//Custom Pipes
import { Distance } from 'pipes/distance';

//Router
const routes: Routes = [
  { path: 'storeadd', component: StoreAddComponent },
  { path: 'storelist', component: StoreListComponent },
  { path: 'productadd', component: ProductAddComponent },
  { path: 'productlist', component: ProductListComponent },
  { path: 'productfindnear', component: FindProductNearComponent }
  ];

@NgModule({
  declarations: [
    AppComponent,
    StoreAddComponent,
    StoreListComponent,
    ProductAddComponent,
    ProductListComponent,
    FindProductNearComponent,
    Distance
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    StoreService,
    ProductService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
