import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, Input, ViewChildren, Output, EventEmitter, ElementRef, Renderer2, QueryList } from '@angular/core';
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
  updateZdepthOrder: boolean = false;
  howManyObjects:number;
  numbers:any;
  num:number;
  numSpace:number;


  @ViewChild('target', {read: ViewContainerRef}) target;
  @ViewChildren('layerID') layerIDs;
  @ViewChildren('hold', { read: ElementRef }) hold:QueryList<ElementRef>;

  @ViewChild('number') number: ElementRef;
  @ViewChild('numberSpace') numberSpace: ElementRef;

  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateAll: EventEmitter<any> = new EventEmitter<any>();

  
  @Input()
  set playFileLoad(val: any){
    console.log("FILE CHANGED", this.layerIDs);
    this.playFiles = val;
    // const drake = this.dragulaService.find('bag-one').drake;
    // const models = drake.models;

    //detect if new item was added
    if(this.howManyObjects !== this.playFiles.comps[0].comp.length) {
      this.onDrop(56);
        //higher zdepth on top
   
        this.playFiles.comps[0].comp.sort((a,b) => {
          console.log(b.copy,b.zdepth,a.copy,a.zdepth)
          return b.zdepth - a.zdepth;
        });

      this.updateZdepthOrder = false;
      this.howManyObjects = this.playFiles.comps[0].comp.length;
      
    }

     //did layer change
    if(this.updateZdepthOrder) {
      this.onDrop(56);
        //higher zdepth on top
   
        this.playFiles.comps[0].comp.sort((a,b) => {
          console.log(b.copy,b.zdepth,a.copy,a.zdepth)
          return b.zdepth - a.zdepth;
        });

      this.updateZdepthOrder = false;
      this.howManyObjects = this.playFiles.comps[0].comp.length;
    }
    
    
    
  

      // this.playFiles.comps[0].comp.reverse();



      console.log("FILE CHANGED sort", this.playFiles.comps[0].comp);
     
    

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

  constructor(private dragulaService: DragulaService, private renderer: Renderer2) {
    this.numbers = [0,1,2,3,4,5];
    
    // dragulaService.dropModel.subscribe((value) => {
    //   this.onDropModel(value);
    // });

    dragulaService.drop.subscribe((value) => {
      console.log("WHATS IN VALUE: ", value[1].id);
      this.playFiles.currentSelectedObj = value[1].id;
      this.updateZdepthOrder = true;
      this.update.emit(this.playFiles);
      //this.onDrop(value[1].id);
    });

    dragulaService.setOptions('bag-one', {
      moves: (el, source, handle, sibling) => !el.classList.contains('no-drag')
    });
  
  }

  // onDropModel(value){
  //   console.log("Drop Model",value[1].id);
  //   this.onDrop(value[1].id);
  // }

  onDrop(id) {
    let length = this.playFiles.comps[0].comp.length;
    console.log("Before z change: ",length, this.playFiles.comps[0].comp);
    for(let i =0;i < length ;i++) {
      console.log("i", i,this.playFiles.comps[0].comp[i].copy);
      this.playFiles.comps[0].comp[i].zdepth = length-i;
    }
    // this.playFiles.comps[0].comp.forEach((element,index) => {
    //   // element.zdepth = length - index;
    //   element.zdepth = index;
    //   console.log("numberIndex",index, element.zdepth, element.copy, length);
    // });
    console.log("ID:", id);
    //this.playFiles.currentSelectedObj = id;
   
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



     
    //higher zdepth on top
   
    this.playFiles.comps[0].comp.sort((a,b) => {
      console.log(b.copy,b.zdepth,a.copy,a.zdepth)
      return b.zdepth - a.zdepth;
    });

    //  //to highlight layer
    //  if(this.layerIDs) {
    //   this.layerIDs.forEach(element => {
    //     //console.log("layerID", element.layerID, this.playFiles.currentSelectedObj);
    //     if(element.layerID !== this.playFiles.currentSelectedObj) {
    //       element.variableOutline = false;
    //     } else {
    //       element.variableOutline = true;
    //       //console.log("MATCH", element.layerID);
    //     }
    //   });
    // }

    this.updateTimelineNumbers();
  }

 

  placeholder(val) {

  }

  select(layer) {
    console.log("CLICCCCCKED", layer);
    this.playFiles.currentSelectedObj = layer.layerID;
    console.log(this.playFiles);
    this.updateAll.emit(this.playFiles);
    //selectLayer
    console.log("GREEN OUT LINE TRUE");
    layer.variableOutline = true;
    console.log("GREEN OUT LINE FALSE");
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

  holdLayer(event) {
    this.hold.forEach(element => {
      if(event) {
        console.log("Class added",element.nativeElement);
        this.renderer.addClass(element.nativeElement,'no-drag');
      } else {
        console.log("Class removed");
        this.renderer.removeClass(element.nativeElement,'no-drag');
      }
    });
   
  }

  updateTimelineNumbers() {
    // this.renderer.setAttribute(this.number.nativeElement,'width','10px');
    // this.renderer.setAttribute(this.numberSpace.nativeElement,'width','50px');
    this.num = 0;
    this.numSpace = 20;
  }



}
