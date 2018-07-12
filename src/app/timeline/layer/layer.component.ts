import { Component, OnInit, Input, trigger, state, style, transition, animate, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css'],
  animations: [
    trigger('myAnim',[
      state('small', style({
        display: 'none',
        opacity: 0
      })),
      state('large', style({
        display: 'block',
        opacity: 1
      })),

      transition('small <=> large', animate('300ms ease-in')),

    ]),

    trigger('rotateArrow',[
      state('right', style({
        transform: 'rotate(-90deg)' 
      })),
      state('down', style({
        transform: 'rotate(0deg)' 
      })),

      transition('right <=> down', animate('300ms ease-in')),

    ])


  ]
})
export class LayerComponent implements OnInit {

  state: string = 'small';
  stateArrow: string = 'right';
  variableOutline: boolean = false;
  playFile;

  widthlayer: string;
  widthlayernamespace: string;

  @Input() layerID: number;
  @Input()
  set playFileLoad(val: any){
    this.playFile = val;
  }

  @Output() updateAll: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  animateMe() {
    this.state = (this.state === 'small') ? 'large' : 'small';
    this.arrowRotate();
    // this.selected();
  }

  arrowRotate() {
    this.stateArrow = (this.stateArrow === 'right') ? 'down' : 'right';
  }

  isEffectEmpty(): boolean {
    //console.log("Is it empty: " + _.isEmpty(this.effects));
    return true;
    //return  !_.isEmpty(this.effects);
  }

  removeLayer() {
    
      this.playFile.comps[this.playFile.currentComp].comp.forEach((element,i) => {
        //console.log(`Running ${element.id},  ${i}, ${id}`)
        if(element.id === this.layerID) {
          console.log("Found1",this.playFile.comps[this.playFile.currentComp].comp);
          this.playFile.comps[this.playFile.currentComp].comp.splice(i,1);
          console.log("Found2",this.playFile.comps[this.playFile.currentComp].comp);
          this.updateAll.emit(this.playFile);
          //this.playFile = Object.assign({}, this.playFile);
        }
      });
    
    // this._objectservice.removeLayerObject(this.layerName);
}

addEffect() {
  // let newObject = this._objectservice.getObjectByLayerName(this.layerName);
  // let newEffect: IEffect = {

  //             type: "moveIn",
  //             direction: "right",
  //             timeStart: 1,
  //             timeEnd: 3,

  //             xS: this._compservice.comp.x + 1,
  //             yS: newObject.yC,
  //             xE: newObject.xC,
  //             yE: newObject.yC,

  //             scaleStarting: newObject.scaleCurrent,
  //             scaleEnding: 1,

  //             widthStarting: 20,
  //             heightStarting: 20,
  //             widthEnding: 20,
  //             heightEnding: 20,

  //             alphaStarting: 1,
  //             alphaEnding: 1
  
  // };

  // if(this.stateArrow != 'down') {
  // this.animateMe();
  // }
  // this._objectservice.addEffectToLayer(this.layerName, newEffect);
}

  


}
