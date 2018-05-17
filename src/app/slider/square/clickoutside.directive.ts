import { Directive, ElementRef, Output, HostListener, Renderer2 } from "@angular/core";
import { EventEmitter } from "events";

@Directive({
    selector: '[clickOutside]'
})
export class clickOutsideDirective {

    isDown: boolean = false;
    colorChange: boolean = true;
    offsetX: any;
    numberX: number;

    constructor(private _elementRef: ElementRef, private rd: Renderer2) {

    }

    // @Output()
    //public clickOutside = new EventEmitter();

    // @HostListener('document:click', ['$event'])
    // public onTrick(targetElement) {
    //     console.log(targetElement.type);

    //     // const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    //     // if (!clickedInside) {
    //     //     this.clickOutside.emit(null);
    //     //     console.log("Clicked outside!!!!!!!!" + targetElement.id);
    //     // }
    // }

    // @HostListener('document:mousedown', ['$event'])
    // public onDown(targetElement) {
    //     console.log(targetElement.type);
    // }

    // @HostListener('document:mouseup', ['$event'])
    // public onUp(targetElement) {
    //     console.log(targetElement.type);
    // }

    // @HostListener('document:mousemove', ['$event'])
    // public onMove(targetElement) {
    //     console.log(targetElement.type);
    // }

    // @HostListener('document:mouseover', ['$event'])
    // public onOver(targetElement) {
    //     console.log(targetElement.target);
    // }

    @HostListener('document:click', ['$event'])
    @HostListener('document:mousedown', ['$event'])
    @HostListener('document:mouseup', ['$event'])
    @HostListener('document:mousemove', ['$event'])
    @HostListener('document:mouseover', ['$event'])
    public onTrick(targetElement) {
        let targetE = targetElement;
        switch(targetElement.type) {
            case 'click': {
                console.log("----click----");
            }
            case 'mousedown': {
                console.log("----Mousedown----");
                this.offsetX = targetElement.x - this._elementRef.nativeElement.offsetLeft;
                this.isDown = true;
                this.offsetX = this._elementRef.nativeElement.offsetLeft;
                this.offsetX = (this.offsetX + 1) + 'px';
                this.rd.setStyle(this._elementRef.nativeElement, 'background-color', 'brown');
                
                this.rd.setStyle(this._elementRef.nativeElement, 'left', this.offsetX);
            }
            case 'mouseup': {
                console.log("----mouseup----");
            }
            case 'mousemove': {
                console.log("----mousemove----");
            }
            case 'mouseover': {
                console.log("----mouseover----" + targetElement.type + '\n');
            }

        }
    }


}