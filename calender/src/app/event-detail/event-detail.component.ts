import { EventService } from './../services/event.service';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { EditEventComponent } from '../edit-event/edit-event.component';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  @Output() public close = new EventEmitter<boolean>();
  @Output() public delete = new EventEmitter<boolean>();
  @Output() public edit = new EventEmitter<boolean>();
  @Output() public send = new EventEmitter<object>(); // send email
  @Output() public map = new EventEmitter<object>(); // jump to google map
  public eventTitle: string;
  public eventStartTime: string;
  public eventEndTime: string;
  public eventLocation: string;
  public tempId;
  public dayOfWeek;

  constructor(private eventService: EventService) {
    // initialize all variables
    this.eventTitle = ' ';
    this.eventStartTime = ' ';
    this.eventEndTime = ' ';
    this.eventLocation = ' ';
  }

  ngOnInit() {
  }

  // when emit false just close, when emit true. it means the element is deleted
  closeEventDetail() {
    this.close.emit(false);
  }

  deleteEvent() {
    console.log(this.tempId);
    this.delete.emit();
    this.eventService.deleteEvent(this.tempId).subscribe(data => {
      console.log(data);
    });
  }

  // sendEmial(){

  // }
  editEvent() {
    console.log(this.tempId);
    this.edit.emit();
  }

  jumpToMap() {
    this.map.emit();
  }
}
