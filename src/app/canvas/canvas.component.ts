import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import 'fabric';
declare const fabric: any;

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit {

  
  canvas: any;
  rectangle: any;
  text: any;
  width: number = 180;
  height: number = 60;


  @ViewChild('can') canvasMain:ElementRef;
  @Input() playFile: any;

  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.printValue();
    this.startCanvas();
  }


  functionCall() {
    console.log(JSON.stringify(this.canvas));
  }
  
 

  printValue() {
    console.log("fabric.version");
    console.log(fabric.version);
  }

  loadFileToCanvas(file:any) {
    file.forEach(element => {
      if(element.type === "TEXT") {
        this.text = new fabric.Textbox(element.copy, { left: element.left, top: element.top, fontSize: 20 });
        this.text.name = element.name;
        this.text.type = element.type;
        this.canvas.add(this.text);
        // this.text.on('object:modified', function(options) {
        //   console.log(options.e.clientX, options.e.clientY, options);
        // });

        this.canvas.renderAll();
      }
    });
    
  }

  move(){
  this.text.animate('left', 60, {
    duration: 1000,
    onChange: this.canvas.renderAll.bind(this.canvas),
    onComplete: function() {
      // animateBtn.disabled = false;
    },
    easing: fabric.util.ease.easeOutBounce
  });
}

  startCanvas() {

    //this.canvas = 

    this.canvas = new fabric.Canvas(this.canvasMain.nativeElement, {
      width: this.width,
      height: this.height
    });


    // this.text.on('object:modified', function(options) {
    //       console.log(options.e.clientX, options.e.clientY);
    //     });

    this.canvas.on('text:changed', function(options) {
      //console.log(options.target.text,options);
      this.update.emit(
       {
            type: options.target.type,
            name: options.target.name,
            copy: options.target.text,
            left: options.target.left,
            top: options.target.top
        }


      );
    }.bind(this));



    this.canvas.on('object:modified', function(options) {
      //console.log(options.target.text,options);
      this.update.emit(
       {
            type: options.target.type,
            name: options.target.name,
            copy: options.target.text,
            left: options.target.left,
            top: options.target.top
        }


      );
    }.bind(this));

    

    this.loadFileToCanvas(this.playFile);




    


    // this.rectangle = new fabric.Rect({
    //     left: 100,
    //     top: 100,
    //     width: 50,
    //     height: 50,
    //     fill: 'red'
    //   });

    

    //this.rectangle.set({ left: 100, top: 50, angle: 45 });
    

    // this.canvas.add(new fabric.Rect({
    //   left: 100,
    //   top: 100,
    //   width: 50,
    //   height: 50,
    //   fill: '#faa'
    // }));

    // this.canvas.add(new fabric.Circle({
    //   left: 200,
    //   top: 100,
    //   radius: 25,
    //   fill: '#afa'
    // }));

    // this.canvas.add(new fabric.Triangle({
    //   left: 300,
    //   top: 100,
    //   width: 50,
    //   height: 50,
    //   fill: '#aaf'
    // }));

  
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
