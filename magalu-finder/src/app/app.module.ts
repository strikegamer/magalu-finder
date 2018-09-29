import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { StoreAddComponent } from './storeadd/storeadd.component';
import { CommonService } from './common/common.service';
import { StoreListComponent } from './storelist/storelist.component'

const routes: Routes = [
  { path: 'storeadd', component: StoreAddComponent },
  { path: 'storelist', component: StoreListComponent }
  ];

@NgModule({
  declarations: [
    AppComponent,
    StoreAddComponent,
    StoreListComponent
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
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
