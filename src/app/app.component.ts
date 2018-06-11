import { Component, AfterViewInit, ElementRef,Renderer2, ViewChild, HostListener } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  playFile: any;

  ngAfterViewInit(): void {
    
    




  }
  
  

  
  

  constructor() {
    this.playFile = [
      {
        type: "TEXT",
        name: "obj1",
        copy: "text3",
        left: 20,
        top: 20
      },
      {
        type: "TEXT",
        name: "obj2",
        copy: "text4",
        left: 90,
        top: 20
      }
    ]
  }

  playFileUpdate(update){
    this.playFile.forEach(element => {
      console.log("WORKING: " + update.name + " " + update.copy);
      if(element.name === update.name) {
        console.log("RUNNING");
        element.type = update.type;
        element.name = update.name;
        element.copy = update.copy;
        element.left = update.left;
        element.top = update.top;
      }
    });
    
    console.log(this.playFile);
  }
 

  

}
