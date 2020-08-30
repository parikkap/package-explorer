import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PackageListComponent } from './package-list/package-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PackageDetailsComponent } from './package-details/package-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PackageListComponent,
    PackageDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
