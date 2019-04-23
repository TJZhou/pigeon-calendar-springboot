import { EventService } from './../services/event.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  @Output() public close = new EventEmitter<boolean>();
  @Output() public delete = new EventEmitter<boolean>();
  @Output() public edit = new EventEmitter<boolean>();
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

  editEvent() {
    this.edit.emit();
  }
}
