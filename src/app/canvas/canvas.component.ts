import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FabricService } from '../common/fabric.service';
//import 'fabric';
//declare const fabric: any;

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit {

  
  
  canvas: any;
  rectangle: any; // used in example
  width: number = 180;
  height: number = 60;
  playFile: any;
  currentlySelectedObject: any;


  @ViewChild('can') canvasMain:ElementRef;

  @Input()
  set playFileLoad(val: any){
    console.log("FILE CHANGED");
    this.playFile = val;
    this.canvasDraw();
  }

  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fabric: FabricService) { }

  ngOnInit() {

  }



  ngAfterViewInit(): void {
    this.canvasDraw();
  }

  
 

  //doesn't update main file
  move(){
    let moveObj = this.canvas.getActiveObject();
    moveObj.animate('left', '+=5', {
    duration: 1000,
    onChange: this.canvas.renderAll.bind(this.canvas),
    onComplete: function() {
      //this.fabric.requestAnimFrame(this.move.bind(this));
    }//,
    //easing: fabric.util.ease.easeIn
    });
  }

  fireMove() {
    //fabric.util.requestAnimFrame(this.move.bind(this));
    //let activeObj = this.canvas.getActiveObject();
    //******************//
    //fabric.util.requestAnimFrame(this.animateStuff.bind(this));
    this.fabric.requestAnimFrame(this.animateStuff.bind(this));
  }


  animateStuff() {
    if(this.canvas.getActiveObject() !== null) {
      let activeObj = this.canvas.getActiveObject();
      let currentAngle = activeObj.get('angle');
      currentAngle++;
      activeObj.set('angle', currentAngle);
      //console.log("running" + " " + activeObj.get('angle') + activeObj);
      this.canvas.renderAll();
      //******************//
      //fabric.util.requestAnimFrame(this.animateStuff.bind(this));
      this.fabric.requestAnimFrame(this.animateStuff.bind(this));
    }
  }

  canvasDraw() {


    //Does canvas exist?
    if(!this.canvas) {
        this.canvas = this.fabric.Canvas(this.canvasMain.nativeElement, this.width, this.height);
        console.log("CANVAS GENERATED.............................")
        this.canvas.on('text:changed', function(options) {
          console.log("UPDATE HAPPENING TEXT: " + options.target.text,options);
          //console.log(options.target.text,options);
          this.update.emit(
           {
            type: options.target.type,
            copy: options.target.text,
            left: options.target.left,
            top: options.target.top,
            id: options.target.id,
            zdepth: options.target.zdepth,
            effects: options.target.effects,
            color: options.target.color
            }
          );
          console.log(options.target.width);
        }.bind(this));



      
    
    
    
        this.canvas.on('object:modified', function(options) {
          console.log("UPDATE HAPPENING: " + options.target.text,options);
          this.update.emit(
           {
                type: options.target.type,
                copy: options.target.text,
                left: options.target.left,
                top: options.target.top,
                id: options.target.id,
                zdepth: options.target.zdepth,
                effects: options.target.effects,
                color: options.target.color
            }
    
    
          );
        }.bind(this));

 

        this.canvas.on('mouse:down', function(options) {
          console.log("CLICKING!!!!", options);
          console.log("Last Selected Object: ",this.currentlySelectedObject);
          console.log("NEW Selected Object: ",this.canvas.getActiveObject());
          // let left;
            if(this.currentlySelectedObject) {
                  let cusorOnCurrent = false;
                  let cusorOnNew = false;
                  let compareNewObj = this.canvas.getActiveObject();
                  let left = this.currentlySelectedObject.left;
                  let top = this.currentlySelectedObject.top;
                  let pointerPos = this.canvas.getPointer(options.e);
                  
                  console.log("P",pointerPos.x, pointerPos.y);
                  console.log("PMATH",pointerPos.x - left, pointerPos.y - top);
                  

        
                  if(this.currentlySelectedObject) {
                      if(
                        (this.currentlySelectedObject.aCoords.bl.x <= pointerPos.x) &&
                        (pointerPos.x <= this.currentlySelectedObject.aCoords.br.x) &&
                        (this.currentlySelectedObject.aCoords.bl.y >= pointerPos.y) &&
                        (pointerPos.y >= this.currentlySelectedObject.aCoords.tl.y)
                      ) {
                        cusorOnCurrent = true;
                        console.log("---------------Cusor On Current");
                      }
                }

                if(compareNewObj) {
                      if(
                        (compareNewObj.aCoords.bl.x <= pointerPos.x) &&
                        (pointerPos.x <= compareNewObj.aCoords.br.x) &&
                        (compareNewObj.aCoords.bl.y >= pointerPos.y) &&
                        (pointerPos.y >= compareNewObj.aCoords.tl.y)
                      ) {
                        cusorOnNew = true;
                        console.log("-------------------Cusor On New");
                      }
                }

                if(cusorOnCurrent && cusorOnNew) {
                  console.log("!!!!!!!FIXING SELECTION!!!!!!!!!!!");
           
                  
                  this.canvas.setActiveObject(this.currentlySelectedObject);
            
                  options.target = this.currentlySelectedObject;
                  options.transform.target = this.currentlySelectedObject;
                  options.transform.offsetX = pointerPos.x - this.currentlySelectedObject.left;
                  options.transform.offsetY = pointerPos.y - this.currentlySelectedObject.top;
                  console.log("Whats clicked CHANGED", options.target);
                  console.log("ACTIVE3",this.canvas.getActiveObject());
                } 
        }
          this.currentlySelectedObject = this.canvas.getActiveObject();
        }.bind(this));
    }

    //set currently selected//
    this.playlistSetCurrentActive();

    //this.canvas.setActiveObject(this.canvas.item(0));
    // console.log("CANVAS ITEM SELECTED ID",this.canvas.items);

   


    //Create New Object, Update
    let canvasObjects = this.canvas.getObjects();
    console.log("Whats in ObjectsX");
    console.log(canvasObjects); 

    this.playFile.comps[this.playFile.currentComp].comp.forEach(fileObj => {
      //Look thru all canvas objects to see if file obj already exists

      let objToModify;
      let updateFound: boolean = false;

      canvasObjects.forEach(canvasObj => {
        if(canvasObj.id === fileObj.id) {
          updateFound = true;
          objToModify = canvasObj;
        }
      });
      
      if(updateFound) {
        this.updateObj(fileObj,objToModify);
      } else {
        this.createObj(fileObj);
      }

    });

    //If Object in canvas but not in file delete
    canvasObjects.forEach(canvasObj => {
      let found: boolean = false;
      let objectToDelete:any;
      this.playFile.comps[this.playFile.currentComp].comp.forEach(fileObj => {
        if(canvasObj.id === fileObj.id) {
          
          found = true;
          console.log("Found canvas: " + canvasObj.id + " File " + fileObj.id + " found " + found);
        } else {
          objectToDelete = canvasObj;
        }

      
    });

    console.log("FOUND: " + found);
    if(!found) {
      //console.log("XFound canvas: " + canvasObj.id + " File " + fileObj.id + " found " + found);
      this.canvas.remove(objectToDelete);
    }
  });







  //change order based on zdepth
  //this.zdepthOrderUpdate();
  this.zdepthOrderUpdateTest();
  //this.canvas.preserveObjectStacking =  true;
  // console.log("backup objects type");
  // console.log(typeof(backupObjects));
  // console.log("whats in it");
  // console.log(backupObjects);
  // console.log("Object Depth");
  // console.log(backupObjects[0].zdepth);
  // console.log(Object.keys(backupObjects).length);
  // for (let i =0; i < 3 ;i++) {
  //   console.log("RUNNING");
  //   canvasObjects[backupObjects.zdepth] = backupObjects[i];
  //   console.log(canvasObjects[backupObjects.zdepth]);
  // }
  // console.log("backup objects finished");
  // console.log(canvasObjects);




  // Object.keys(backupObjects).forEach((obj,i) => {
  //   canvasObjects[obj.] = 
  // });
  // for(var canvasObj in backupObjects) {
  //   canvasObjects[canvasObj.zdepth] = canvasObj;
  // });
  
  }

  createObj(obj) {
    if(obj.type === "TEXT") {
          console.log("Create Object Ran: " + obj.copy);
          let text = this.fabric.Textbox(obj.copy, obj.left, obj.top, obj.id, obj.color,obj.zdepth);
          this.canvas.add(text);
          this.canvas.renderAll();
        }
  }

  updateObj(objFile, objToModify) {
    if(objFile.type === "TEXT") {
      console.log("Update Object Ran: " + objFile.copy);
      objToModify.set('left', objFile.left);
      objToModify.set('top', objFile.top);
      objToModify.set('Text', objFile.copy);
      objToModify.id = objFile.id;
      objToModify.effects = objFile.effects;
      objToModify.zdepth = objFile.zdepth;
      objToModify.set('color, objFile.color');
    }


  }

  zdepthOrderUpdate() {
    console.log("Before Hand" , this.canvas.getObjects());


    let objectsOnCanvas = this.canvas.getObjects().length;
    for (let i = 0; i < objectsOnCanvas ;i++) {
      console.log("***************" + i);
      console.log(this.canvas.getObjects());
  
        for (let k = 0; k < (objectsOnCanvas-1) ;k++) {
          console.log("Whats first",this.canvas.item(k).zdepth,this.canvas.item(k+1).zdepth);
    
          if(this.canvas.item(k).zdepth > this.canvas.item(k+1).zdepth) {
            this.canvas.bringForward(this.canvas.item(k));
            console.log("forwards");
          }
        }
  
    }
  
    console.log("After Object********",this.canvas.getObjects());



  }


  zdepthOrderUpdateTest() {
    console.log("Before Hand" , this.canvas.getObjects());


    let objectsOnCanvas = this.canvas.getObjects();
    for (let i = 0; i < objectsOnCanvas.length ;i++) {
      console.log("***************" + i);
      console.log(objectsOnCanvas);
  
        for (let k = 0; k < (objectsOnCanvas.length-1) ;k++) {
          console.log("Whats first",objectsOnCanvas[k].zdepth,objectsOnCanvas[k+1].zdepth);
    
          if(objectsOnCanvas[k].zdepth > objectsOnCanvas[k+1].zdepth) {
            this.canvas.bringForward(objectsOnCanvas[k]);
            console.log("forwards");
          }
        }
  
    }
  
    console.log("After Object********",this.canvas.getObjects());



  }


 
  

  results(val: number[]) {
    // console.log(`---------------------------------Beginning ${val[0]} and ${val[1]}`);
    console.log(`---------------------------------${val}`);
    this.rectangle.set({ left: val[0], top: val[1]});
    this.canvas.discardActiveObject();
    this.canvas.renderAll();

  }

  scale(val: number[]) {
    // console.log(`---------------------------------Beginning ${val[0]} and ${val[1]}`);
    console.log(`---------------------------------${val}`);
    this.rectangle.set({ angle: val[0] });
    this.canvas.discardActiveObject();
    this.canvas.renderAll();

  }

  playlistSetCurrentActive() {
    console.log("RUNNING CURRENTLY SELECTED", this.playFile.currentSelectedObj);
    let cObjects = this.canvas.getObjects();
    cObjects.forEach(canvasObj => {
      if(canvasObj.id === this.playFile.currentSelectedObj) {
        this.canvas.setActiveObject(canvasObj);
        console.log(" SET RUNNING CURRENTLY SELECTED", canvasObj.id);
        this.canvas.renderAll();
      }
    });
  }



}
