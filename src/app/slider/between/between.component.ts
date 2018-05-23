import { Component, OnInit, ViewChild, ElementRef, HostListener, Renderer2, Input, AfterViewInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'between',
  templateUrl: './between.component.html',
  styleUrls: ['./between.component.css']
})
export class BetweenComponent implements OnInit, AfterViewInit {

  isDown: boolean = false;
  begEnd: number[] = [10,20];
  squareBegin;
  squareEnd; 

  // @Input() squareBegin; //good - these need to be outs
  // @Input() squareEnd; //good - these need to be outs


  @Input() set squareBegin2(val) {
    this.squareBegin = val;
    //this.rd.setStyle(this.elemRef.nativeElement, 'left', val + 'px');
    this.betweenLength();
  } 

  @Input() set squareEnd2(val) {
    this.squareEnd = val;
    //this.rd.setStyle(this.elemRef.nativeElement, 'left', val + 'px');
    this.betweenLength();
  } 

  @Output() middleMoved: EventEmitter<number[]> = new EventEmitter<number[]>();
  
  offsetX //good
  offsetSquareE //good

  @ViewChild('between') between:ElementRef;

  constructor(private rd: Renderer2, private elemRef: ElementRef) {


  }

  ngOnInit() {
    this.betweenLength();
  }

  ngAfterViewInit() {
  
    
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
                  this.rd.setStyle(this.between.nativeElement, 'left', (x + this.offsetX) + 'px');
                  // this.BeginningPos = this.BeginningPos + (x + this.offsetX);
                  // this.EndingPos = this.EndingPos + (x + this.offsetX);
                  console.log("XXXXXXXX: " + x);

                  this.squareBegin = (x + this.offsetX) - 30;
                  // this.squareBegin = (x + (this.offsetX + this.offsetSquareS));
                  this.squareEnd = (x + this.offsetX) + (this.offsetSquareE - 30);
                  this.begEnd[0] = this.squareBegin;
                  this.begEnd[1] = this.squareEnd;
                  this.middleMoved.emit(this.begEnd);
                  //this.moved.emit(this.elemRef.nativeElement.lastElementChild.offsetLeft);
                  break;
                }
                break;
            }

            case "mouseup": {
              this.isDown = false;
              this.rd.setStyle(this.between.nativeElement, 'background-color', 'lime');
             
              break;
            }

            case "mousedown": {
              this.isDown = true;
              this.offsetX = this.between.nativeElement.offsetLeft - x;
              this.rd.setStyle(this.between.nativeElement, 'background-color', 'green');

              
          
              this.offsetSquareE = this.squareEnd - this.squareBegin;
              console.log("offsetE " + this.offsetSquareE);
              console.log("offset " + this.offsetX);  
              break;
            }


            case "mouseover": {
              this.rd.setStyle(this.between.nativeElement, 'background-color', 'purple');
              break;
            }

            case "mouseout": {
              break;
            }

        }

  }


  betweenLength(){
    let width = this.squareEnd - this.squareBegin;

    console.log("Width of green: " + width);
    this.rd.setStyle(this.between.nativeElement, 'width', width +'px');
    this.rd.setStyle(this.between.nativeElement, 'left', (this.squareBegin + 30) +'px');
  }

}
