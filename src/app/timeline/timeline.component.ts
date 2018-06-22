import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, Input } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    
  }
  start: number;
  end: number;
  playFile: any;
  @ViewChild('target', {read: ViewContainerRef}) target;

  @Input()
  set playFileLoad(val: any){
    console.log("FILE CHANGED");
    this.playFile = val;
    //this.canvasDraw();
  }

  constructor() { }

  ngOnInit() {
    this.start = 5;
    this.end = 75;
  }

  placeholder(val) {

  }



}
