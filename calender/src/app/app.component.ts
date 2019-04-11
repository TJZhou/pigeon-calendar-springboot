import { CalendarComponent } from './calendar/calendar.component';
import { Component, ViewChild } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(CalendarComponent)
  public curDay;
  public curDayFormat;
  public isSelected = true;

  title = 'calender';
  onChangeDay(clickedDay) {
    this.curDay = clickedDay;
    this.curDayFormat = this.curDay.format('MM/DD');
  }

  previous() {
    this.curDay = this.curDay.subtract(1, 'd');
    this.curDayFormat = this.curDay.format('MM/DD');
  }
  next() {
    this.curDay = this.curDay.add(1, 'd');
    this.curDayFormat = this.curDay.format('MM/DD');
  }
  currentDay() {
    this.curDay = moment();
    this.curDayFormat = this.curDay.format('MM/DD');
    console.log(this.curDay);
  }
}
