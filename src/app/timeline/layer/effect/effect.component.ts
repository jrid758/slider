import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'effect',
  templateUrl: './effect.component.html',
  styleUrls: ['./effect.component.css']
})
export class EffectComponent implements OnInit {

  effectLength: string;

  @HostListener('mouseenter') mouseover() {
    console.log("IN");
  };

  @HostListener('mouseleave') mouseleave() {
    console.log("OUT");
  };

  constructor() { }

  ngOnInit() {
  }

  placeholder($event) {
    
  }

}
