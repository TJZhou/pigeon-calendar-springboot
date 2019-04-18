import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  @Output() public close = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  closeEventDetail() {
    this.close.emit(true);
  }
}
