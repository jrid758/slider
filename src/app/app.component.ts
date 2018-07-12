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
      currentSelectedObj: "234822347",
      comps: [
        {
          background: "red",
          comp: [
            {
              id: "234822347",
              type: "TEXT",
              copy: "2348",
              left: 0,
              top: 0,
              zdepth: 7,
              color: "red",
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
              copy: "8907",
              left: 20,
              top: 50,
              zdepth: 2,
              color: "green",
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
              id: "59065567878656",
              type: "TEXT",
              copy: "5906",
              left: 90,
              top: 50,
              zdepth: 5,
              color: "blue",
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

deleteFileObject(id){
  this.playFile.comps[this.playFile.currentComp].comp.forEach((element,i) => {
    console.log(`Running ${element.id},  ${i}, ${id}`)
    if(element.id === id) {
      console.log("Found");
      this.playFile.comps[this.playFile.currentComp].comp.splice(i,1);
      this.playFile = Object.assign({}, this.playFile);
    }
  });
}

playFileAllUpdate(update) {
  let updatePlayFile = update;
  console.log("ALLupdate", updatePlayFile);
    this.playFile = Object.assign({}, updatePlayFile);


}

playFileUpdate(update){
  console.log("-------------Running Second");

  let updateFound: boolean = false;
  let currentObj: any;

  //Does object currently exist
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
    currentObj.color = update.color;
    currentObj.zdepth = update.zdepth;
    currentObj.effects = update.effects;
    
  } else {
    console.log("-------------Running Third",update);
    this.playFile.comps[this.playFile.currentComp].comp.push(update);
    let updatePlayFile = this.playFile;
    this.playFile = Object.assign({}, updatePlayFile);
    //this.playFile = updatePlayFile;
  }
  
  console.log(this.playFile);
}


  

}
