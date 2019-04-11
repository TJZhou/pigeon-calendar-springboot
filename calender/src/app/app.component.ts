import { CalendarComponent } from './calendar/calendar.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(CalendarComponent)
  public curDay;

  title = 'calender';
  onChangeDay(clickedDay) {
    this.curDay = clickedDay;
  }
}
