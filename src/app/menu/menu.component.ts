import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
   
  }

  id: string;

  @Output() newText: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.id = this.generateUUID();
    console.log("RANDOM: " + this.id);
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
    console.log("New Text Obj---------------------");
    console.log(obj);
    console.log("---------------------");
    this.newText.emit(obj);
}

  placeholder() {
    //console.log(`X:${val[0]} and Y: ${val[1]}`);
  }

  // uuidv4() {
  //   return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  // }

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
