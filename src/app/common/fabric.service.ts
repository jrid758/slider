import { Injectable } from '@angular/core';
import 'fabric';

declare let fabric: any

@Injectable()
export class FabricService {

  constructor() { }

  Textbox(elementCopy, elementLeft, elementTop, id, color, zdepth, widthC, heightC): any {
    let obj = new fabric.IText(elementCopy, { left: elementLeft, top: elementTop, fill: color, fontSize: 20, fontFamily: "Gotham", originX: 'center', originY: 'center', id: id, type: 'TEXT',height: heightC, width: widthC, zdepth: zdepth });
    return obj;
  }


  version(): any {
    return fabric.version;
  }  

  requestAnimFrame(move) {
    fabric.util.requestAnimFrame(move);
  }


  Canvas(element, width, height):any {
    let obj = new fabric.Canvas(element, { width: width, height: height, preserveObjectStacking: true, selection: false});
    return obj;
  }
}
