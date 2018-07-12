import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css']
})
export class LayerComponent implements OnInit {

  variableOutline: boolean = false;

  @Input() layerID: number;
  constructor() { }

  ngOnInit() {
  }

  


}
