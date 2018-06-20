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
            effects: options.target.effects
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
                effects: options.target.effects
            }
    
    
          );
        }.bind(this));

    }


    //Create New Object, Update
    let canvasObjects = this.canvas.getObjects();

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
  
  }

  createObj(obj) {
    if(obj.type === "TEXT") {
          console.log("Create Object Ran: " + obj.copy);
          let text = this.fabric.Textbox(obj.copy, obj.left, obj.top, obj.id);
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
    }


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

}
