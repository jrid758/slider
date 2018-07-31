import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FabricService } from '../common/fabric.service';
import { IComp } from '../comp';
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
    
    this.playFile = val;
    console.log("FILE CHANGED", this.playFile.currentSelectedObj);
    this.canvasDraw();
  }

  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateAll: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fabric: FabricService) { }

  ngOnInit() {

  }



  ngAfterViewInit(): void {
    this.canvasDraw();
  }

  widthHeight() {
    let object = this.canvas.getActiveObject();
    console.log(object);
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

/////////////////////////////
///Animation
///////////////////////////////

stop = false;
frameCount = 0;
fps = 30;
fpsInterval;
startTime;
now;
then;
elapsed;
firstTimeThru;


// initialize the timer variables and start the animation

startAnimating(fps = 5) {
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();
    this.startTime = this.then;
    this.firstTimeThru = true;
    console.log("start",this.startTime);
    this.animate();
}

animate() {

    // calc elapsed time since last loop
    let now = Date.now();
    this.elapsed = now - this.then;
    console.log("s",now,this.elapsed);
   

   // request another frame
    if((now - this.startTime) <= (this.playFile.comps[this.playFile.currentComp].videoLength * 1000)) {
    requestAnimationFrame(this.animate.bind(this));
    }

    
     
   

   

   // if enough time has elapsed, draw the next frame

   if (this.elapsed > this.fpsInterval) {

       // Get ready for next frame by setting then=now, but also adjust for your
       // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
       this.then = now - (this.elapsed % this.fpsInterval);

       // Put your drawing code here
       console.log("TIME",now, this.startTime)
      this.animateObjects(now);

   }



}

currentAniTime(now) {
  return now - this.startTime;
}


animateObjects(now) {
//console.log(this.now);
    let canvasObjects = this.canvas.getObjects();
    canvasObjects.forEach(currentComp => {
      currentComp.effects.forEach(effect => {




    
        let timeStart = effect.start * 1000;
        let timeEnd = effect.end * 1000;

        let objectWidth = Math.abs(currentComp.aCoords.tl.x - currentComp.aCoords.tr.x);
        let objectHeight = currentComp.aCoords.tl.y - currentComp.aCoords.bl.y;

        let currentStartLeft:number = (objectWidth/2) * -1;
        console.log("currentStartLeft", objectWidth, currentStartLeft);
        let currentStartTop:number = currentComp.top;

        let currentEndLeft = currentComp.left;
        let currentEndTop = currentComp.top;
      

        
        //////////////////////
        ////Move In
        //////////////////
        if(effect.type === "Move In"){

          //Set beginning placement, testing, need to account for other positions

          //if(timeStart > this.currentAniTime(now)){
          // if(timeStart > this.currentAniTime(now)){
            
            //currentComp.left = currentStartLeft;
            currentComp.set("left",currentStartLeft);
            //currentComp.top = currentStartTop;
            currentComp.set("top",currentStartTop);
            console.log("First Placement: ", currentStartLeft, currentStartTop);
            this.canvas.renderAll();
          // }

          //Start Moving  
          if(timeStart < this.currentAniTime(now) && timeEnd > this.currentAniTime(now)){
            //let current = this.currentAniTime() - timeStart;
            let current = this.currentAniTime(now);
            console.log("Current Time: " + this.currentAniTime(now));
            let aniPercentDone = current / (timeEnd - timeStart);
            let totalDistanceX = currentEndLeft - currentStartLeft;
            let totalDistanceY = currentEndTop - currentStartTop;

            console.log("%" ,aniPercentDone);
            console.log("tdx" ,totalDistanceX);
            console.log("tdy" ,totalDistanceY);
            console.log("currentStartLeft" ,currentStartLeft);
            console.log("equation" ,(totalDistanceX * aniPercentDone) + currentStartLeft);


            currentComp.set("left",(totalDistanceX * aniPercentDone) + currentStartLeft);

            console.log("What so farY: " + totalDistanceY * aniPercentDone);
         
            currentComp.set("top",(totalDistanceY * aniPercentDone) + currentStartTop);

          }





         
          
        }
        this.canvas.renderAll();
      // if(canvasObj.id === fileObj.id) {
        
      //   found = true;
      //   console.log("Found canvas: " + canvasObj.id + " File " + fileObj.id + " found " + found);
      // } else {
      //   objectToDelete = canvasObj;
      // }

      });
    });
// runAnimationOnChildren(startTime, now){
//   let current = this.currentAniTime(startTime, now);
//   for(let element of this.app.stage.children) {
//       console.log("RUNNING ANIMATION***********************" + element.name);
//       if(element.name !== "stage"){
//         let currentObject = this._objectservice.getObjectByLayerName(element.name);
      
//           if(element.type == "video") {
//               current = this.currentAniTime(startTime, now);
//               element.texture.baseTexture.source.pause();
//               element.texture.baseTexture.source.currentTime = current/1000;
//               element.texture.baseTexture.source.play();
//           }


//       for(let effect of currentObject.effect) {
//           let timeStart = effect.timeStart * 1000;
//           let timeEnd = effect.timeEnd * 1000;
//           console.log("start: " + timeStart + "end: " + timeEnd);
//           console.log("EFFECT ANIMATION***********************" + effect.type);
//                   //--------------------
//                   //Effect type MoveIn
//                   //--------------------
//                   if(effect.type === "moveIn"){

//                       //Set beginning placement
//                       console.log("-----------------------------------PlacementX: " + timeStart + " vs " + timeEnd + " vs " + this.currentAniTime(startTime, now));
//                       if(timeStart > this.currentAniTime(startTime, now)){
//                        element.x = effect.xS;
//                        console.log("-----------------------------------PlacementX: " + element.x);
//                        element.y = effect.yS;
//                        console.log("-----------------------------------PlacementY: " + element.y);
//                       }
//                       //Start Moving  
//                       if(timeStart < this.currentAniTime(startTime, now) && timeEnd > this.currentAniTime(startTime, now)){
//                           console.log("Curr AniTime & Start: " + this.currentAniTime(startTime, now) + " " + timeStart);
//                           let current = this.currentAniTime(startTime, now) - timeStart;
//                           console.log("Current Done: " + current);
//                           let aniPercentDone = current / (timeEnd - timeStart);
//                           console.log("Percent Done: " + aniPercentDone);
//                           let totalDistanceX = effect.xE - effect.xS;
//                           let totalDistanceY = effect.yE - effect.yS;

//                           console.log("Total Distance: " + totalDistanceX);
//                           element.x = (totalDistanceX * aniPercentDone) + effect.xS;

//                           console.log("What so farY: " + totalDistanceY * aniPercentDone);
//                           element.y = (totalDistanceY * aniPercentDone) + effect.yS;
//                       }
//                       //Above if stops at 99%, this completes the last frame
//                       if(timeEnd < this.currentAniTime(startTime, now)){
//                           element.x = effect.xE;
//                           element.y = effect.yE;
//                           console.log("TIME END***********************");
//                       }

//                   }
//               }
//           }
//       }
// }





}





  canvasDraw() {


    //Does canvas exist?
    if(!this.canvas) {
        this.canvas = this.fabric.Canvas(this.canvasMain.nativeElement, this.width, this.height);
        console.log("CANVAS GENERATED.............................")
        this.canvas.on('text:changed', function(options) {
          console.log("UPDATE HAPPENING TEXT: " + options.target.text,options);
          //console.log(options.target.text,options);
            let updateObj:IComp = {
            id: options.target.id,
            type: options.target.type,

            copy: options.target.text,
            video: null, //need to fix this maybe
            image: null, //need to fix this maybe


            left: options.target.left,
            top: options.target.top,

            scaleXC: options.target.scaleX, //need to fix this maybe
            scaleYC: options.target.scaleY, //need to fix this maybe
            alphaC: 100,
            widthC: options.target.width,
            heightC: options.target.height,
            
            zdepth: options.target.zdepth,
            effects: options.target.effects,
            color: options.target.color

          }
          this.update.emit(updateObj);
          console.log(options.target.width);
        }.bind(this));



      
    
    
    
        this.canvas.on('object:modified', function(options) {
          console.log("UPDATE HAPPENING: " + options.target.text,options);
          let updateObj:IComp = {
            id: options.target.id,
            type: options.target.type,

            copy: options.target.text,
            video: null, //need to fix this maybe
            image: null, //need to fix this maybe


            left: options.target.left,
            top: options.target.top,

            scaleXC: options.target.scaleX, //need to fix this maybe
            scaleYC: options.target.scaleY, //need to fix this maybe
            alphaC: 100,
            widthC: options.target.width,
            heightC: options.target.height,
            
            zdepth: options.target.zdepth,
            effects: options.target.effects,
            color: options.target.color

          }
          this.update.emit(updateObj);
    
    
       
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
                  

                  //Is cursor on current
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

                //Is cursor on new
                if(compareNewObj) {
                      if(
                        (compareNewObj.aCoords.bl.x <= pointerPos.x) &&
                        (pointerPos.x <= compareNewObj.aCoords.br.x) &&
                        (compareNewObj.aCoords.bl.y >= pointerPos.y) &&
                        (pointerPos.y >= compareNewObj.aCoords.tl.y)
                      ) {
                        cusorOnNew = true;
                        console.log("-------------------Cusor On New");

                        //this.currentlySelectedObject = this.canvas.getActiveObject();
                      //this.playlistSetCurrentActive();
                      }
                }
                
                //I think keep current selection
                if(cusorOnCurrent && cusorOnNew) {
                  console.log("!!!!!!!FIXING SELECTION!!!!!!!!!!!");
           
                  
                  this.canvas.setActiveObject(this.currentlySelectedObject);
                  //this.playlistSetCurrentActive();
                  options.target = this.currentlySelectedObject;
                  options.transform.target = this.currentlySelectedObject;
                  options.transform.offsetX = pointerPos.x - this.currentlySelectedObject.left;
                  options.transform.offsetY = pointerPos.y - this.currentlySelectedObject.top;
                  console.log("Whats clicked CHANGED", options.target);
                  console.log("ACTIVE3",this.canvas.getActiveObject());
                }
                
                //Update selection becasue new is selected
                if(!cusorOnCurrent && cusorOnNew) {
                  console.log("NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW", this.playFile.currentSelectedObj, compareNewObj.id);
                  this.playFile.currentSelectedObj = compareNewObj.id;
                  this.updateAll.emit(this.playFile);
                  
                  
                }
              
                
        }
          this.currentlySelectedObject = this.canvas.getActiveObject();
          //Catch all for selections when nothing is select. Updates playlist for timeline.
          if(this.currentlySelectedObject === null) {
            this.playFile.currentSelectedObj = null;
            this.updateAll.emit(this.playFile);
          } else {
            this.playFile.currentSelectedObj = this.currentlySelectedObject.id;
            this.updateAll.emit(this.playFile);
          }
          console.log("Bcurrent", this.currentlySelectedObject);
          
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
      console.log("%$%", canvasObj);
      objectToDelete = canvasObj; //Fixed last object not deleting
      this.playFile.comps[this.playFile.currentComp].comp.forEach(fileObj => {
        if(canvasObj.id === fileObj.id) {
          
          found = true;
          console.log("Found canvas: " + canvasObj.id + " File " + fileObj.id + " found " + found);
        } else {
          objectToDelete = canvasObj;
        }

      
    });

    console.log("FOUND: " + found, objectToDelete);
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

  createObj(obj:IComp) {
    if(obj.type === "TEXT") {
          console.log("Create Object Ran: " + obj.copy);
          let text = this.fabric.Textbox(obj.copy, obj.left, obj.top, obj.id, obj.color,obj.zdepth,obj.widthC,obj.heightC,obj.scaleXC,obj.scaleYC);
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
            this.canvas.renderAll();
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
    let cObjects = this.canvas.getObjects();
   
      console.log("RUNNING CURRENTLY SELECTED", this.playFile.currentSelectedObj);
      
      cObjects.forEach(canvasObj => {
        if(canvasObj.id === this.playFile.currentSelectedObj) {
          this.currentlySelectedObject = canvasObj;
          this.canvas.setActiveObject(canvasObj);
          console.log(" SET RUNNING CURRENTLY SELECTED", canvasObj.id);
          this.canvas.renderAll();
        }
      });
   
  }



}
