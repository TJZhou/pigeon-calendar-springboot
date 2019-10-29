import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Event } from '../models/event.model'
import { EventService } from '../services/event.service' 

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {

	
	username = localStorage.getItem("username")
	events: Event[]
	filtedEvents: Event[]
  flag: number[] = [100]
  constructor( private service: EventService) { }

  noLaterThen(comparedDate: Event): boolean{
  	let today: Date = new Date(moment().format("MM/DD/YYYY HH:MM"));
  	let tomorrow: Date = new Date(moment().format("MM/DD/YYYY"));
  	tomorrow.setDate(today.getDate() + 1)
  	let compared: Date = new Date(comparedDate.startTime)

  	return (today <= compared && compared <= tomorrow) 
  }

  // Initialize the component
  ngOnInit() {
  	if(this.username!=null){
  		console.log(this.username)
  		this.service.getEventsFromOneUser(this.username)
  			.subscribe(event => {
  				console.log(event)
  				if(event[0] != null)
          	this.filtedEvents = event.filter(this.noLaterThen);
						if(this.filtedEvents[0] != null){
							this.events = this.filtedEvents;
              console.log(this.events.length)
              for(let i=0; i<this.events.length; i++){
                this.events[i]._id = (i+1).toString()
              }
						}
  			})
  	}
  }

  // Function when clicking on the event itself
  finished(event: Event){
		if(this.include(event._id)){
			this.flag.pop();
		}else this.flag.push(parseInt(event._id))
  }

  include(str: string){
    return this.flag.includes(parseInt(str))
  }
}
