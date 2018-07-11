import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, Input, ViewChildren, Output, EventEmitter } from '@angular/core';
import { DragulaService } from '../../../node_modules/ng2-dragula';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, AfterViewInit {

  
  start: number;
  end: number;
  playFiles: any;
  @ViewChild('target', {read: ViewContainerRef}) target;
  @ViewChildren('layerID') layerIDs;

  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  set playFileLoad(val: any){
    console.log("FILE CHANGED");
    this.playFiles = val;
    //higher zdepth on top
    this.playFiles.comps[0].comp.sort((a,b) => {
      return b.zdepth - a.zdepth;
    })
  }

  constructor(private dragulaService: DragulaService) {

    dragulaService.drop.subscribe((value) => {
      this.onDrop();
    });
  }

  onDrop() {
    let length = this.playFiles.comps[0].comp.length;
    this.playFiles.comps[0].comp.forEach((element,index) => {
      element.zdepth = length - index;
      console.log("numberIndex",index, element.zdepth, length);
    });
    this.update.emit(this.playFiles);
    console.log("ArrayThing", this.playFiles);
   
  }

  private processChildren(): void {
    console.log('Processing children. Their count:', this.layerIDs)
  }

  ngOnInit() {
    this.start = 5;
    this.end = 75;
    
  }

  ngAfterViewInit(): void {
    console.log("start quary", this.layerIDs );
    this.layerIDs.changes.subscribe(() => {
      this.processChildren();
      //console.log("changed queryLayer",this.layerIDs);
    })
  }

 

  placeholder(val) {

  }



}
