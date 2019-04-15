import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';
import * as moment from 'moment';
import { EventPost } from '../models/eventPost.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  currentDate = moment();
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
  }

  fillStartTimeArr(){
    this.fillTempTimeArr();
    this.startTimeArr = this.tempTimeArr;
  }
  
  fillEndTimeArr(){
    this.fillTempTimeArr();
    this.endTimeArr = this.tempTimeArr;
    this.endTimeArr.push('24:00');
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
    this.fillStartTimeArr();
    this.fillEndTimeArr();
  }
  
  selectStartTime() {
    this.selectedStartTime = this.startTimeTemp;
    console.log(this.selectedStartTime);
  }

  selectStartDate() {
    this.selectedStartDate = this.startDateTemp;
    console.log(this.selectedStartDate);
  }

  selectEndTime() {
    this.selectedEndTime = this.endTimeTemp;
    console.log(this.selectedEndTime);
  }

  selectEndDate() {
    this.selectedEndDate = this.endDateTemp;
    console.log(this.selectedEndDate);
  }

  judgeSelectStartTime(): boolean {
    if(this.selectedStartTime === null) {
      return false;
    } else {
      return true;
    }
  }

  judgeSelectStartDate(): boolean {
    if(this.selectedStartDate === null) {
      return false;
    } else {
      return true;
    }
  }

  judgeSelectEndTime(): boolean {
    if(this.selectedEndTime === null) {
      return false;
    } else {
      return true;
    }
  }

  chooseTime(time){
    this.startTimeTemp = time;

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

      this.eventService.addEvent(this.createNewEvent())
        .subscribe(data => console.log(" This event has been created: " + data));
      alert('Add successfully.');

    // }
  }

  displayArr = {
    startDateDisplay: 0,
    startTimeDisplay: 0,
    endTimeDisplay: 0,
    endDateDisplay: 0,
  };

  onClickedOutside(e) {
      console.log('start: ' + this.displayArr['startTimeDisplay']);
      console.log('end: ' + this.displayArr['endTimeDisplay']);
      this.displayArr['startTimeDisplay'] = 0;
      this.displayArr['endTimeDisplay'] = 0;
  }

  controlDisplay(event) {
    let id = event.target.id;
    this.setDisplayFlag(id, 1);
    console.log("【controlDisplay】: id >>> " + id);
  }

  setDisplayFlag(id: string, flag: number) {
    if(id == 'startTime'){
      this.displayArr['startTimeDisplay'] = flag;
      console.log("【setDisplayFlag】: id >>> " + id + ", flag: " + flag);
      
    } else if (id == 'endTime'){
      this.displayArr['endTimeDisplay'] = flag;
      console.log("【setDisplayFlag】: id >>> " + id + ", flag: " + flag);
    }
  }

  getDisplayFlag(): Object{
     console.log("From GET Display");
     console.log('****end: ' + this.displayArr['endTimeDisplay']);
      return this.displayArr;
  }
}
