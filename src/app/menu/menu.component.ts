import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { IComp } from '../comp';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  


  @Output() newText: EventEmitter<any> = new EventEmitter<any>();

  compLength:any = 6;
  playFiles;

  @Output() updateAll: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  set playFileLoad(val: any){
    this.playFiles = val;
    this.compLength = this.playFiles.comps[0].videoLength;
  }

  constructor() { }

  ngAfterViewInit(): void {
   
  }

  ngOnInit() {

  }

  updateTime() {
    this.playFiles.comps[0].videoLength = this.compLength;
    this.playFileAllUpdate(this.playFiles);

  }

  addText(): any{
    let UUID = this.generateUUID()
    let copy = UUID.slice(0,4).toString();
    let obj: IComp = {
      id: UUID,
      type: "TEXT",

      copy: copy,
      video: null,
      image: null,

      left: 30,
      top: 30,

      scaleC: 100,
      alphaC: 100,
      widthC: 40,
      heightC: 22.599999999999998,

      zdepth: 3,
      color: "purple",
      effects: []
    }
    this.newText.emit(obj);
}

playFileAllUpdate(event) {
  this.updateAll.emit(event);

}





  generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }


  
  

}
