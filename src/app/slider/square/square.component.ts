import { Component, AfterViewInit, ElementRef,Renderer2, ViewChild, HostListener, ContentChild, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements AfterViewInit{
  @ViewChild('someVar') el:ElementRef;

  // @ContentChild('parentSlider') parent:ElementRef;

  @Input() containerLength;

  @Input() set position(val) {
    //this.rd.setStyle(this.elemRef.nativeElement.lastElementChild, 'left', (val-10) + 'px');
  
    this.rd.setStyle(this.el.nativeElement, 'left', (val-(((100*this.el.nativeElement.clientWidth)/this.containerLength)/2)) + '%');
  } 

  @Output() moved: EventEmitter<number> = new EventEmitter<number>();

  parentSlider
  colorChange: boolean = true;
  offsetX: number;
  isDown: boolean = false;
  numberX: number;
  posOffest: number = 0;

  constructor(private rd: Renderer2, private elemRef: ElementRef) {
    this.isDown = false;
    
  }

  // @HostListener('document:click', ['$event'])
  // @HostListener('touchstart', ['$event'])
  @HostListener('mouseover', ['$event'])
  @HostListener('document:mouseout', ['$event'])
  @HostListener('mousedown', ['$event'])
  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:mouseup', ['$event'])
  @HostListener('mouseout', ['$event'])
  onEvent(event) {
    let x = event.clientX;
    //console.log(event.type);
   // console.log(event.target.attributes.class);
    // if(event.target == this.el) {
    //   console.log("true");
    // }
        switch(event.type) {
          // case "touchstart": {
          //   this.moved.emit(10);

          //   break;
          // }


            case "mousemove": {
                if(this.isDown){
                  // this.posOffest = this.posOffest + 10;
                  // console.log(`Offset number ${this.posOffest}`);
                  // //console.log(this.elemRef.nativeElement.offsetLeft = this.position);
                  // console.log("el");
                  // console.log(this.el);
                  // console.log("elemRef");
                  // console.log(this.elemRef);


                  //this.rd.setStyle(this.elemRef.nativeElement.lastElementChild, 'left', ((x + this.offsetX)) + 'px');
                  //this.moved.emit(this.elemRef.nativeElement.lastElementChild.offsetLeft);
                  // this.moved.emit(x + this.offsetX+10);
                  this.moved.emit(x + this.offsetX);


                  //this.rd.setStyle(this.elemRef.nativeElement.lastElementChild, 'left', this.posOffest + 'px');
                  break;
                }
                break;
            }

            case "mouseup": {
              this.isDown = false;
              // this.rd.setStyle(this.elemRef.nativeElement.lastElementChild, 'background-color', 'orange');
             
              break;
            }

            case "mousedown": {
              this.isDown = true;
              this.offsetX = (this.elemRef.nativeElement.lastElementChild.offsetLeft - x);
              // this.rd.setStyle(this.elemRef.nativeElement.lastElementChild, 'background-color', 'green');
              break;
            }


            case "mouseover": {
              // this.rd.setStyle(this.elemRef.nativeElement.lastElementChild, 'background-color', 'purple');
              break;
            }

            case "mouseout": {
              //this.rd.setStyle(this.elemRef.nativeElement.lastElementChild, 'background-color', 'red');
              break;
            }


            default: {
              this.isDown = false;
              break;
            }
        }

  }


  ngAfterViewInit() {
    console.log("ready");
    this.isDown = false;

    
    // console.log("di I get el:" + this.el.nativeElement);
    // console.log("Child is here: " + this.el.nativeElement.offsetLeft + " " + this.el.nativeElement.offsetTop);
    //console.log(this.elemRef.nativeElement.children[0].innerText);
    //this.rd.setStyle(this.el.nativeElement, 'left', (this.position + '100px'));
  }


  // dragging(e) {
    
  //   if(this.isDown){
  //     this.numberX = e.x - this.offsetX;
  //     let stringX: string = this.numberX + 'px';
  //     // if( numberX >= 0  &&  numberX <= this.parent.nativeElement.offsetWidth - this.el.nativeElement.offsetWidth) { 
  //       if( this.numberX >= 0  &&  this.numberX <= this.howLong - this.el.nativeElement.offsetWidth) {   
  //       console.log("--------------NUMBER: " + this.numberX);
  //       this.rd.setStyle(this.el.nativeElement, 'left', stringX);
  //     }
  //   }
  // }

  // down(e) {
  //   this.offsetX = e.x - this.el.nativeElement.offsetLeft;
  //   this.isDown = true;
  //   //this.rd.setStyle(this.el.nativeElement, 'background-color', 'yellow');
  // }

  // up(e) {
  //   this.isDown = false;
  //   this.rd.setStyle(this.el.nativeElement, 'background-color', 'pink');
  // }

  // mouseOverItem(e) {
  //   // this.el.nativeElement.style.backgroundColor = 'purple';
  //   this.rd.setStyle(this.el.nativeElement, 'background-color', 'purple');

  // }
  
}
