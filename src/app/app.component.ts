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

    this.playFile = {
      videoLength: 6,
      compHeight: 60,
      compWidth: 180,
      currentComp: 0,
      comps: [
        {
          background: "red",
          comp: [
            {
              id: "234822347",
              type: "TEXT",
              copy: "text3V",
              left: 0,
              top: 0,
              effects: [
                {
                  type: "moveIn",
                  start: .1,
                  end: 3
                },
                {
                  type: "zoomOut",
                  start: 4,
                  end: 5
                }
              ] 
            },
            {
              id: "890787656",
              type: "TEXT",
              copy: "text4V",
              left: 20,
              top: 50,
              effects: [
                {
                  type: "moveIn",
                  start: .1,
                  end: 3
                },
                {
                  type: "zoomOut",
                  start: 4,
                  end: 5
                }
              ]
            },
            {
              id: "89065567878656",
              type: "TEXT",
              copy: "text2V",
              left: 90,
              top: 50,
              effects: [
                {
                  type: "moveIn",
                  start: .1,
                  end: 3
                },
                {
                  type: "zoomOut",
                  start: 4,
                  end: 5
                }
              ]
            }
          ]
        },
        {
          background: "red",
          comp: [
            {
              id: "234822347756",
              type: "TEXT",
              copy: "text3",
              left: 20,
              top: 20,
              effects: []
            },
            {
              id: "34560787656",
              type: "TEXT",
              copy: "text4",
              left: 90,
              top: 20,
              effects: []
            }
          ]
        }
      ]
    }
   

      console.log(this.playFile);
}


playFileUpdate(update){
  console.log("-------------Running Second");

  let updateFound: boolean = false;
  let currentObj: any;

  this.playFile.comps[this.playFile.currentComp].comp.forEach(element => {
    if(element.id === update.id) {
      updateFound = true;
      currentObj = element;
    }
  });

  //this.playFileTest.comps[this.playFileTest.currentComp].comp[update.id]
  if(updateFound) {

    currentObj.id = update.id;
    currentObj.type = update.type;
    currentObj.copy = update.copy;
    currentObj.left = update.left;
    currentObj.top = update.top;
    currentObj.zdepth = update.zdepth;
    currentObj.effects = update.effects;
    
  } else {
    console.log("-------------Running Third");
    this.playFile.comps[this.playFile.currentComp].comp.push(update);
    let updatePlayFile = this.playFile;
    this.playFile = Object.assign({}, updatePlayFile);
    //this.playFile = updatePlayFile;
  }
  
  console.log(this.playFile);
}

  

}
