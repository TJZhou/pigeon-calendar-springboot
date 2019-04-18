import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';
import { WeeklyScheduleComponent } from './weekly-schedule/weekly-schedule.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddEventComponent } from './add-event/add-event.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { EventDetailComponent } from './event-detail/event-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    NavbarComponent,
    DailyScheduleComponent,
    WeeklyScheduleComponent,
    LoginComponent,
    RegisterComponent,
    AddEventComponent,
    EventDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ClickOutsideModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
