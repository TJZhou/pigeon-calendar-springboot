import { Component, OnInit,EventEmitter, Output } from '@angular/core';
// import { Location } from '@angular/common';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';
import * as moment from 'moment';


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  matDatepicker;
  currentDate = moment();
  @Output() close = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<object>();

  
  startDateTemp = this.currentDate.format('MM/DD/YY');
  startTimeTemp = this.currentDate.format('HH:MM');
  endTimeTemp = this.currentDate.add(1, 'h').format('HH:MM');
  endDateTemp = this.startDateTemp;

  displayFlag = false;
  event: Event;

  // ID 是这个哦
  id = "5cbceaada5689e8459f63338";
  username: string;
  title: string;
  location: string;
  startTime: string;
  endTime: string;

  tempTimeArr=[];
  startTimeArr=[];
  endTimeArr=[];

  fillTempTimeArr(){
    for(let i = 0; i < 24; i++){
      for(let j = 0; j < 60; j+=30){
        let temp;
        if(i < 10 && j == 0){
          temp = '0' + i + ':' + j + '0';
        } else if( i < 10 && j == 30) {
          temp = '0' + i + ":" + j;
        } else if ( i > 9 && j == 0) {
          temp = i + ':' + j + '0';
        } else {
          temp = i + ':' + j;
        }
        this.tempTimeArr.push(temp);
      }
    }
    return this.tempTimeArr;
  }

  selectedStartDate = null;
  selectedStartTime = null;
  selectedEndDate = null;
  selectedEndTime = null;

  constructor( private eventService: EventService ) { }

  ngOnInit() {
    this.startTimeArr = this.fillTempTimeArr();
    this.endTimeArr = this.startTimeArr;
    this.endTimeArr.push('24:00');

    this.eventService.getEvent(this.id).subscribe(data => {
      console.log(data[0]);
      this.title = data[0].title;
      this.location = data[0].location;
      this.username = data[0].username;
      this.startDateTemp = this.seperateDateAndTime(data[0].startTime).date;
      this.startTimeTemp = this.seperateDateAndTime(data[0].startTime).time;
      this.endDateTemp = this.seperateDateAndTime(data[0].endTime).date;
      this.endTimeTemp = this.seperateDateAndTime(data[0].endTime).time;
    })
  }

  seperateDateAndTime(completeTime: string) {
    let words = completeTime.split(' ');
    let date = words[0];
    let time = words[1];
    return {date, time};
  }

  createNewEvent(): Event{
    let event = {
    "id": this.id,
    "username": this.username,
    "title": this.title,
    "location": this.location,
    "startTime": this.startTime,
    "endTime": this.endTime
    }
    return event;
  }

  onUpdate(){

    // Get the start and end date
    let startDateElement = <HTMLInputElement>document.getElementById('startDate');
    let startDateValue = startDateElement.value;
    this.startDateTemp = startDateValue;

    let endDateElement = <HTMLInputElement>document.getElementById('endDate');
    let endDateValue = endDateElement.value;
    this.endDateTemp = endDateValue;

    // Put date the time together and get their timestamp for comparing

    let startwords = this.startDateTemp.split('/');
    let endwords = this.endDateTemp.split('/');
    

    if( parseInt(startwords[0]) < 10 ) {
      this.startDateTemp = '0' + this.startDateTemp;
    }
    if( parseInt(endwords[0]) < 10 ) {
      this.endDateTemp = '0' + this.endDateTemp;
    }

    let convertStart = this.startDateTemp + " " + this.startTimeTemp;
    let startStamp = Date.parse(convertStart);

    let convertEnd = this.endDateTemp + " " + this.endTimeTemp;
    let endStamp = Date.parse(convertEnd);

    if (this.title == "" || this.title == undefined || 
        this.location == "" || this.location == undefined) {
      alert("Invalid input - Please fill out all the blanks.");
    } else if (endStamp <= startStamp ) {
      alert("Please choose valid end time.");
    } else {

      // Convert date string to date object
      this.startTime = convertStart;
      this.endTime = convertEnd;

      console.log(this.startTime);
      console.log(this.endTime);
      // Use eventService to update event
      this.eventService.updateEvent(this.id, this.createNewEvent()).
      subscribe(data => console.log(" This event has been updated: " + data));
      alert('Update successfully.');
      // this.save.emit();
      // this.close.emit();
    }
  }

  displayArr = {
    startTimeDisplay: 0,
    endTimeDisplay: 0,
  };

  onClickedOutside(id) {
      if(id == 'endoutside'){
        this.displayArr['endTimeDisplay'] = 0;
      }else if(id == 'startoutside'){
        this.displayArr['startTimeDisplay'] = 0;
      }
  }

  controlDisplay(event) {
    let id = event.target.id;
    this.setDisplayFlag(id, 1);
  }

  setDisplayFlag(id: string, flag: number) {
    if(id == 'startTime'){
      this.displayArr['startTimeDisplay'] = flag;
    } else if (id == 'endTime'){
      this.displayArr['endTimeDisplay'] = flag;
    }
  }

  setStartTime(event) {
    let time = event.target.id;
    this.startTimeTemp = time;
  }

  setEndTime(event) {
    let time = event.target.id;
    this.endTimeTemp = time;
  }

  closeAddEvent() {
    this.close.emit(true);
  }
}
