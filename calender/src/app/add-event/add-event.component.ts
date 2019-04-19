import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';
import * as moment from 'moment';
import { EventPost } from '../models/eventPost.model';
import {  } from 'protractor';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  matDatepicker;
  currentDate = moment();
  @Output() close = new EventEmitter<boolean>();

  startDateTemp = this.currentDate.format('MM/DD/YY');
  startTimeTemp = this.currentDate.format('HH:MM');
  endTimeTemp = this.currentDate.add(1, 'h').format('HH:MM');
  endDateTemp = this.startDateTemp;

  displayFlag = false;
  event = Event;

  id: number;
  username: string;
  title: string;
  location: string;
  startTime: Date;
  endTime: Date;

  tempTimeArr=[];
  startTimeArr=[];
  endTimeArr=[];

  // Convert date string to Date object

 convertStrToDate(datetimeStr) {
  var mydateint = Date.parse(datetimeStr);//数值格式的时间
  if (!isNaN(mydateint)) {
      var mydate = new Date(mydateint);
      return mydate;
  }
  var mydate = new Date(datetimeStr);//字符串格式时间
  var monthstr = mydate.getMonth() + 1;
  if (!isNaN(monthstr)) {//转化成功
      return mydate;
  }//字符串格式时间转化失败
  var dateParts = datetimeStr.split(" ");
  var dateToday = new Date();
  var year = dateToday.getFullYear();
  var month = dateToday.getMonth();
  var day = dateToday.getDate();
  if (dateParts.length >= 1) {
      var dataPart = dateParts[0].split("-");//yyyy-mm-dd  格式时间
      if (dataPart.length == 1) {
          dataPart = dateParts[0].split("/");//yyyy/mm/dd格式时间
      }
      if (dataPart.length == 3) {
          month = Math.floor(dataPart[0]);
          day = Math.floor(dataPart[1]);
          year = Math.floor(dataPart[2]);
      }
  }
  if (dateParts.length == 2) {//hh:mm:ss格式时间
      var timePart = dateParts[1].split(":");//hh:mm:ss格式时间
      if (timePart.length == 3) {
          var hour = Math.floor(timePart[0]);
          var minute = Math.floor(timePart[1]);
          var second = Math.floor(timePart[2]);
          return new Date(year, month, day, hour, minute, second);
      }
  }
  else {
      return new Date(year, month, day);
  }
}

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

  constructor(
    private routeLocation: Location,
    private eventService: EventService
    ) { }

  ngOnInit() {
    this.startTimeArr = this.fillTempTimeArr();
    this.endTimeArr = this.startTimeArr;
    this.endTimeArr.push('24:00');
  }

  goBack(): void {
    this.routeLocation.back();
  }


  createNewEvent(): EventPost{
    let event = {
    "username": "yujxie",
    "title": "test",
    "location": "testLocation",
    "startTime": new Date(),
    "endTime": new Date()
    }
    return event;
  }

  onSubmit(){

    let startDateElement = <HTMLInputElement>document.getElementById('startDate');
    let startDateValue = startDateElement.value;
    this.startDateTemp = startDateValue;
    console.log(this.matDatepicker);
    console.log(this.startDateTemp);
    let convertStart = startDateValue + " " + this.startTimeTemp;
    this.startTime = this.convertStrToDate(convertStart);
    console.log(":::::"+ this.startTime);
    console.log(this.endTimeTemp);
    console.log(this.endDateTemp);

    // if (this.title == "" || this.title == undefined ||
    //     this.location == "" || this.location == undefined) {

    //   alert("Please fill out all the blanks.");

    // } else {


      // let event = {
      //   "username": "yujxie",
      //   "title": "test",
      //   "location": "testLocation",
      //   "startTime": "2019-04-11T18:00:00.000Z",
      //   "endTime": "2019-04-11T18:00:00.000Z"
      // }

      // this.eventService.addEvent(this.createNewEvent())
      //   .subscribe(data => console.log(" This event has been created: " + data));
      // alert('Add successfully.');

    // }
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
