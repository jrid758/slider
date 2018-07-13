import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { SquareComponent } from './slider/square/square.component';
import { clickOutsideDirective } from './slider/square/clickoutside.directive';
import { BetweenComponent } from './slider/between/between.component';
import { CanvasComponent } from './canvas/canvas.component';
import { TimelineComponent } from './timeline/timeline.component';
import { MenuComponent } from './menu/menu.component';
import { LayerComponent } from './timeline/layer/layer.component';
import { FabricService } from './common/fabric.service';
import { DragulaModule, DragulaService } from '../../node_modules/ng2-dragula';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectComponent } from './timeline/layer/effect/effect.component';


@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    SquareComponent,
    clickOutsideDirective,
    BetweenComponent,
    CanvasComponent,
    TimelineComponent,
    MenuComponent,
    LayerComponent,
    EffectComponent
    
  ],
  imports: [
    BrowserModule,
    DragulaModule,
    BrowserAnimationsModule
   
  ],
  providers: [FabricService],
  bootstrap: [AppComponent]
})
export class AppModule { }
