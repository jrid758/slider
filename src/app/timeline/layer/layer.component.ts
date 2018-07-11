import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css']
})
export class LayerComponent implements OnInit {

  @Input() layerID: number;
  constructor() { }

  ngOnInit() {
  }

  


}
