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
  @Output() updateAll: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  set playFileLoad(val: any){
    console.log("FILE CHANGED", this.layerIDs);
    this.playFiles = val;
    //higher zdepth on top
    this.playFiles.comps[0].comp.sort((a,b) => {
      return b.zdepth - a.zdepth;
    })

    //to highlight layer
    if(this.layerIDs) {
      this.layerIDs.forEach(element => {
        console.log("layerID", element.layerID, this.playFiles.currentSelectedObj);
        if(element.layerID !== this.playFiles.currentSelectedObj) {
          element.variableOutline = false;
        } else {
          element.variableOutline = true;
          console.log("MATCH", element.layerID);
        }
      });
    }
  }

  constructor(private dragulaService: DragulaService) {

    dragulaService.drop.subscribe((value) => {
      console.log("WHATS IN VALUE: ", value[1].id);
      this.onDrop(value[1].id);
    });

  
  }

  onDrop(id) {
    let length = this.playFiles.comps[0].comp.length;
    this.playFiles.comps[0].comp.forEach((element,index) => {
      element.zdepth = length - index;
      console.log("numberIndex",index, element.zdepth, length);
    });
    this.playFiles.currentSelectedObj = id;
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

     //to highlight layer
     if(this.layerIDs) {
      this.layerIDs.forEach(element => {
        //console.log("layerID", element.layerID, this.playFiles.currentSelectedObj);
        if(element.layerID !== this.playFiles.currentSelectedObj) {
          element.variableOutline = false;
        } else {
          element.variableOutline = true;
          //console.log("MATCH", element.layerID);
        }
      });
    }
  }

 

  placeholder(val) {

  }

  select(layer) {
    console.log("CLICCCCCKED", layer);
    this.playFiles.currentSelectedObj = layer.layerID;
    console.log(this.playFiles);
    this.updateAll.emit(this.playFiles);
    //selectLayer
    layer.variableOutline = true;
    //unselectAllOtherViewChildren
    this.layerIDs.forEach(element => {
      if(element.layerID !== layer.layerID) {
        element.variableOutline = false;
      }
    });
  }

  playFileAllUpdate(event) {
    this.updateAll.emit(event);
  }



}
