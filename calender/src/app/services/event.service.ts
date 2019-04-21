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

  getEvent(eventId): Observable<Event> {
    console.log(this.eventUrl + eventId);
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

  updateEvent(eventId: string, event: Event): Observable<Event> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.patch<Event>(this.eventUrl + eventId, event, httpOptions);
  }

  deleteEvent(eventId: string): Observable<Event> {
    return this.http.delete<Event>(this.eventUrl + eventId);
  }
}
