import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//import { BrowserModule } from '@angular/platform-browser';
//import { NgModule } from '@angular/core';
import { GojsAngularModule } from 'gojs-angular';

import { HttpClientModule } from '@angular/common/http';

import { NodeService } from './node.service';
//import { AppRoutingModule } from './app-routing.module';
//import { AppComponent } from './app.component';
import { NodesComponent } from './nodes.component';


@NgModule({
  declarations: [
    AppComponent,
    NodesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GojsAngularModule,
    HttpClientModule
  ],
  providers: [NodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
