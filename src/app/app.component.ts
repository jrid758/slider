import { Component, AfterViewInit, ElementRef,Renderer2, ViewChild, HostListener } from '@angular/core';
// import { fabric } from 'fabric';
import 'fabric';
declare const fabric: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.start = 0;
    this.end = 75;
    this.printValue();
    this.runFab();




  }
  start: number;
  end: number;
  canvas: any;
  rectangle: any;

  @ViewChild('can') canvasMain:ElementRef;
  

  constructor() {
   
  }
  
  results(val: number[]) {
    // console.log(`---------------------------------Beginning ${val[0]} and ${val[1]}`);
    console.log(`---------------------------------${val}`);
    this.rectangle.set({ left: val[0], top: val[1]});
    this.canvas.renderAll();

  }

  scale(val: number[]) {
    // console.log(`---------------------------------Beginning ${val[0]} and ${val[1]}`);
    console.log(`---------------------------------${val}`);
    this.rectangle.set({ angle: val[0] });
    this.canvas.renderAll();

  }

  printValue() {
    console.log("fabric.version");
    console.log(fabric.version);
  }

  runFab() {

    //this.canvas = 

    this.canvas = new fabric.Canvas(this.canvasMain.nativeElement, {
      width: 500,
      height: 300
    });

    this.rectangle = new fabric.Rect({
        left: 100,
        top: 100,
        width: 50,
        height: 50,
        fill: 'red'
      });

    this.canvas.add(this.rectangle);

    //this.rectangle.set({ left: 100, top: 50, angle: 45 });
    this.canvas.renderAll();

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

}
