import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    this.start = 0;
    this.end = 75;
  }
  start: number;
  end: number;
  @ViewChild('target', {read: ViewContainerRef}) target;

  constructor() { }

  ngOnInit() {
  }

  placeholder(val) {

  }

  add() {

  }

}
