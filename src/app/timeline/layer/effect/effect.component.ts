import { Component, OnInit, HostListener, ViewChildren, ContentChildren, Output, EventEmitter } from '@angular/core';
import { LayerComponent } from '../layer.component';

@Component({
  selector: 'effect',
  templateUrl: './effect.component.html',
  styleUrls: ['./effect.component.css']
})
export class EffectComponent implements OnInit {

  effectLength: string;
  @ContentChildren(LayerComponent) targets;
  @Output() hold: EventEmitter<any> = new EventEmitter<any>();
  @Output() effectUpdate: EventEmitter<any> = new EventEmitter<any>();
  @HostListener('mouseenter') mouseover() {
    console.log("IN",this.targets);
    this.hold.emit(true);
  };

  @HostListener('mouseleave') mouseleave() {
    console.log("OUT");
    this.hold.emit(false);
  };

  constructor() { }

  ngOnInit() {
  }

  placeholder($event) {
    
  }

  // addEffect() {
  //     let obj = {
        
  //         type: "moveIn",
  //         start: .1,
  //         end: 3
        
  //   }
  //   this.effectUpdate.emit(obj);
  // }

}
