import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    
  }
  start: number;
  end: number;
  @ViewChild('target', {read: ViewContainerRef}) target;

  constructor() { }

  ngOnInit() {
    this.start = 5;
    this.end = 75;
  }

  placeholder(val) {

  }

  add() {

  }

}
