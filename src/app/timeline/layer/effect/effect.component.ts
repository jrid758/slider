import { Component, OnInit, HostListener, ViewChildren, ContentChildren, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { LayerComponent } from '../layer.component';

@Component({
  selector: 'effect',
  templateUrl: './effect.component.html',
  styleUrls: ['./effect.component.css']
})
export class EffectComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    //console.log(`Time: ${this.playFile.comps[0]}, Start: ${this.start}, End: ${this.end} `);
  //   this.start = this.effectProps.start as number;
  //   this.end = this.effectProps.end as number;
  //  console.log(`Start: ${this.start}, End: ${this.end} `);
  }

  effectLength: string;
  playFile: string;
  start: number;
  end: number;
  directionSelected;
  optionSelect;
  

  @ContentChildren(LayerComponent) targets;
  @Output() hold: EventEmitter<any> = new EventEmitter<any>();
  @Output() effectTimeUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeEffect: EventEmitter<any> = new EventEmitter<any>();
  @HostListener('mouseenter') mouseover() {
    console.log("IN",this.targets);
    this.hold.emit(true);
  };

  @HostListener('mouseleave') mouseleave() {
    console.log("OUT");
    this.hold.emit(false);
  };

  @Input()
  set playFileLoad(val: any){
    this.playFile = val;
    console.log("playFileForEffects", this.playFile);
  }


  @Input() currentLayer: any;
  @Input() effectsIndexNumber: any;
  @Input() effectProps: any;
  @Input() timeLengthofComp:number;
  @Input() Beginning:number;
  @Input() Ending:number;
  constructor() {
    this.optionSelect = ["left","right","up","down"];
  }

  ngOnInit() {
  
  }

  //Fixes sliders not being updated//
  ngOnChanges(...args: any[]) {
    console.log('onChange fired');
    console.log('changing', args);
    this.start = this.Beginning;
    this.end = this.Ending;
  }

  updateTimeEnds(times) {
    
    let obj = {
      properties: this.effectProps,
      layer: this.currentLayer,
      effectsPlace: this.effectsIndexNumber,
      times
    }
    console.log("OBJ: ", obj);
    this.effectTimeUpdate.emit(obj);
  }

  removeEffectFunc() {
    let obj = {
      properties: this.effectProps,
      layer: this.currentLayer,
      effectsPlace: this.effectsIndexNumber
    }
    console.log("OBJ: ", obj);
    this.removeEffect.emit(obj);
  }

  updateSelect(selected) {

  }

}
