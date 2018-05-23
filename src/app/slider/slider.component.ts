import { Component, AfterViewInit, ElementRef,Renderer2, ViewChild, HostListener, ViewChildren, QueryList, Input, Directive, OnInit } from '@angular/core';
import { SquareComponent } from './square/square.component';
// import { SquareComponent } from './square/square.component';





@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, AfterViewInit {
 

  
  @ViewChild('parentSlider') parentRef:ElementRef;
  
  // @ViewChildren('positionSquare') squares: QueryList<ElementRef>;
  @ViewChildren(SquareComponent) squares: QueryList<SquareComponent>;



  offsetX: number;
  offsetSquareS: number;
  offsetSquareE: number;
  isDown: boolean = false;
  howLongSpace: number;

  squareEnd: number;
  squareBegin: number;

  @Input() BeginningPos: number;
  @Input() EndingPos: number;


  
  constructor(private rd: Renderer2, private elemRef: ElementRef) {
    this.squareEnd = this.EndingPos;
    this.squareBegin = this.BeginningPos;
    

  }

  ngOnInit(): void {
    this.squareEnd = this.EndingPos;
    this.squareBegin = this.BeginningPos;
  }
  

  ngAfterViewInit() {
  
    // this.squares.changes;
    console.log(this.squares)
    
    //this.betweenLength();
  


    
    // this.squares.forEach((item: ElementRef) => {
    //     console.log("These numbers: ");
    //     console.log(item.nativeElement.numberX);
    // });
    // console.log(this.squares._);

  }

  private saySomething() {
    console.log("Hello");
  }

 

  updateBeginning(number: number): void {
    console.log(`On beginning number: ${number}`);
    this.squareBegin = number;
    //this.betweenLength();

  }

  updateEnd(number: number): void {
    console.log(`On end number: ${number}`);
    this.squareEnd = number;
    //this.betweenLength();

  }

  updateSquares(number: number[]) {
    this.squareBegin = number[0];
    this.squareEnd = number[1];
    //console.log(`This is the update number: ${number}`);
    console.log("Happy");
  }

  getUpdatedPositionsSquares() {
    console.log(this.squares)
  }


  // @HostListener('document:click', ['$event'])

  


  






  

  // whatToDo(event) {
  //   console.log("What is this");
  // }

  // dragging(e) {
  //   if(this.isDown){
  //     let numberX: number = e.x - this.offsetX;
  //     let stringX: string = numberX + 'px';
  //   }
  // }

  // down(e) {
  //   this.isDown = true;
  
  // }

  // up(e) {
   
  //   this.isDown = false;
  
  // }

  // movement(e) {
  //   console.log(e.type);
   
   
  // }
  
}
















//   createElement() {
//     this.box1 = this.rd.createElement('div');
//     this.rd.setStyle(this.box1, 'background-color', 'purple');
//     this.rd.setStyle(this.box1, 'width', '60px');
//     this.rd.setStyle(this.box1, 'height', '60px');
//     this.rd.setStyle(this.box1, 'position', 'absolute');
//     this.rd.setStyle(this.box1, 'cursor', 'move');
//     this.rd.setStyle(this.box1, 'left', '100px');
//     this.rd.appendChild(this.parentRef.nativeElement, this.box1);
//   }


    // console.log(e.type + " movin2");
   
    // console.log("Parent is here: " + this.parentRef.nativeElement.offsetLeft + " " + this.parentRef.nativeElement.offsetTop);
    
    // console.log("Mouse Here: " + e.x + " " + e.y);
    //this.rd.setStyle(this.el.nativeElement, 'left', e.x);



      // if((e.x > ((this.el.nativeElement.offsetWidth/2)-1)) && (e.x < (this.parentRef.nativeElement.offsetWidth -  (this.el.nativeElement.offsetWidth/2 - 1)))) {
      
    //   console.log("DOWN");
    //   let left = e.x + this.offsetX + 'px';
    //   let top = e.y + this.offsetY + 'px';
    //   // let left = e.x  + 'px';
    //   // let top = e.y  + 'px';
    //   console.log("Down d pos: " + left + " " + top);
    //   this.rd.setStyle(this.el.nativeElement, 'left', left);
    //   this.rd.setStyle(this.el.nativeElement, 'top', top);


// let numberX: string = (e.x - (this.el.nativeElement.offsetWidth/2)) + 'px';

    // console.log("What is this: " + directiveName);
    // console.log("Down pos: " + e.x + " " + e.y);


     // console.log(e.type);



      //console.log("x: " + e.x + "  y:" + e.y);