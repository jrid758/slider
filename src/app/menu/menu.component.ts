import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  


  @Output() newText: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngAfterViewInit(): void {
   
  }

  ngOnInit() {

  }

  addText(): any{
    let obj = {
      id: this.generateUUID(),
      type: "TEXT",
      copy: "TEXT",
      left: 10,
      top: 10,
      zdepth: null,
      effects: []
    }
    this.newText.emit(obj);
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
