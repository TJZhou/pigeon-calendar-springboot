package com.info6150.pigeon.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Event")
public class Event {

    @Id
    private String _id;
    private String username;
    private String title;
    private String location;
    private String startTime;
    private String endTime;

    public Event() {
    }

    public Event(String username, String title, String location, String startTime, String endTime) {
        this.username = username;
        this.title = title;
        this.location = location;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id='" + _id + '\'' +
                ", username='" + username + '\'' +
                ", title='" + title + '\'' +
                ", location='" + location + '\'' +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                '}';
    }
}
