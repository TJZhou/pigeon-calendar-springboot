import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { EventPost } from '../models/eventPost.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // Set the url of Event
  private eventUrl: string = "http://localhost:3000/events/";

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventUrl);
  }

  getEvent(eventId: number): Observable<Event> {
    return this.http.get<Event>(this.eventUrl + eventId);
  }

  addEvent(event: EventPost): Observable<Event> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<Event>(this.eventUrl, event, httpOptions);
  }

  deleteEvent(eventId: number): Observable<Event> {
    return this.http.delete<Event>(this.eventUrl + eventId);
  }
  
}
