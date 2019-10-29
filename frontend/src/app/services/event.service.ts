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
  private eventUrl: string = "http://localhost:3000/event";

  constructor(private http: HttpClient) { }

  /**
   * Get all the events.
   */
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventUrl + 'list');
  }

  /**
   *
   * @param username Get events under one user by username.
   */
  getEventsFromOneUser(username: string): Observable<Event[]>{
    return this.http.get<Event[]>(this.eventUrl + 'list/' + username);
  }

  /**
   *
   * @param eventId Get specific event by eventId.
   */
  getEvent(eventId: string): Observable<Event> {
    console.log(this.eventUrl + eventId);
    return this.http.get<Event>(this.eventUrl  + eventId);
  }

  /**
   *
   * @param event Use post method to create a new Event.
   */
  addEvent(event: EventPost): Observable<Event> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<Event>(this.eventUrl, event, httpOptions);
  }

  /**
   *
   * @param eventId Specify the event need to be updated.
   * @param event Updated event.
   */
  updateEvent(eventId: string, event: Event): Observable<Event> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.patch<Event>(this.eventUrl + eventId, event, httpOptions);
  }

  /**
   *
   * @param eventId Delete the event by eventId.
   */
  deleteEvent(eventId: string): Observable<Event> {
    return this.http.delete<Event>(this.eventUrl + eventId);
  }
}
