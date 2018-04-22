import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ValuesComponent } from './values/values.component';

@NgModule({
  declarations: [AppComponent, ValuesComponent],
  imports: [BrowserModule, HttpModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
