import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { SquareComponent } from './slider/square/square.component';
import { clickOutsideDirective } from './slider/square/clickoutside.directive';


@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    SquareComponent,
    clickOutsideDirective
  ],
  imports: [
    BrowserModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
