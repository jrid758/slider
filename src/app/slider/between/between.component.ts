import { Component, OnInit, ViewChild, ElementRef, HostListener, Renderer2, Input, AfterViewInit, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'between',
  templateUrl: './between.component.html',
  styleUrls: ['./between.component.css']
})
export class BetweenComponent implements OnInit, AfterViewInit, OnChanges {

  isDown: boolean = false;
  begEnd: number[] = [10,20];
  squareBegin: number;
  squareEnd: number; 

  // @Input() squareBegin; //good - these need to be outs
  // @Input() squareEnd; //good - these need to be outs
  @ViewChild('between') between:ElementRef;
 

  @Input() set squareBegin2(val) {
    //this.squareBegin = (val-(((100*this.between.nativeElement.clientWidth)/this.containerLength)/2));
    this.squareBegin = val;
    console.log("CHANGEBEG: " + this.squareBegin);
    //this.rd.setStyle(this.elemRef.nativeElement.lastElementChild, 'left', (val-(((100*this.el.nativeElement.clientWidth)/this.containerLength)/2)) + '%');
    //this.rd.setStyle(this.elemRef.nativeElement, 'left', val + 'px');
    this.betweenLength();
  } 

  @Input() set squareEnd2(val) {
    //this.squareEnd = (val-(((100*this.between.nativeElement.clientWidth)/this.containerLength)/2));
    this.squareEnd = val;
    console.log("CHANGEEND: " + this.squareEnd);
    //this.rd.setStyle(this.elemRef.nativeElement, 'left', val + 'px');
    this.betweenLength();
  } 

  @Output() middleMoved: EventEmitter<number[]> = new EventEmitter<number[]>();
  
  offsetX //good
  offsetSquareE //good



  constructor(private rd: Renderer2, private elemRef: ElementRef) {


  }

  ngOnInit() {
    this.betweenLength();
  }

  ngAfterViewInit() {
  
    
  }

  ngOnChanges() {

  }

  @HostListener('mouseover', ['$event'])
  @HostListener('document:mouseout', ['$event'])
  @HostListener('mousedown', ['$event'])
  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:mouseup', ['$event'])
  @HostListener('mouseout', ['$event'])
  onEvent(event) {
    let x = event.clientX;
        switch(event.type) {
            case "mousemove": {
                if(this.isDown){
                  //this.rd.setStyle(this.between.nativeElement, 'left', (x + this.offsetX) + 'px');


                  
                  // this.BeginningPos = this.BeginningPos + (x + this.offsetX);
                  // this.EndingPos = this.EndingPos + (x + this.offsetX);
                  console.log("XXXXXXXX: " + x);

                  // this.squareBegin = (x + this.offsetX) - 30;
                  //this.squareBegin = x + this.offsetX;
                  let squareBeginX = x + this.offsetX;

                  // this.squareBegin = (x + (this.offsetX + this.offsetSquareS));

                  //this.squareEnd = (x + this.offsetX) + (this.offsetSquareE);
                  let squareEndX = (x + this.offsetX) + (this.offsetSquareE);
               

                  this.begEnd[0] = squareBeginX;
                  this.begEnd[1] = squareEndX;
                  this.middleMoved.emit(this.begEnd);
                  //this.moved.emit(this.elemRef.nativeElement.lastElementChild.offsetLeft);
                  break;
                }
                break;
            }

            case "mouseup": {
              this.isDown = false;
              // this.rd.setStyle(this.between.nativeElement, 'background-color', 'lime');
             
              break;
            }

            case "mousedown": {
              this.isDown = true;
              this.offsetX = this.between.nativeElement.offsetLeft - x;
              // this.rd.setStyle(this.between.nativeElement, 'background-color', 'green');

              
          
              //this.offsetSquareE = this.squareEnd - this.squareBegin;
              this.offsetSquareE = this.between.nativeElement.clientWidth;
              console.log("offsetE " + this.offsetSquareE);
              console.log("offset " + this.offsetX);  
              break;
            }


            case "mouseover": {
              // this.rd.setStyle(this.between.nativeElement, 'background-color', 'purple');
              break;
            }

            case "mouseout": {
              break;
            }

        }

  }


  betweenLength(){
  

    let width:number = this.squareEnd - this.squareBegin;
    if(width > 0 && width <= 100) {
      console.log(`End ${this.squareEnd} - ${this.squareBegin} = ${width}`);
      this.rd.setStyle(this.between.nativeElement, 'width', width +'%');
      this.rd.setStyle(this.between.nativeElement, 'left', this.squareBegin +'%');
    } else {
      console.log(`FAILLLLLL End ${this.squareEnd} - ${this.squareBegin} = ${width}`);
    }
  }

}
