import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';
import { WeeklyScheduleComponent } from './weekly-schedule/weekly-schedule.component';
import { AddEventComponent } from './add-event/add-event.component';

const routes: Routes = [
  { path: '', component: DailyScheduleComponent },
  { path: 'day', component: DailyScheduleComponent },
  { path: 'week', component: WeeklyScheduleComponent },
  { path: 'Register', component: RegisterComponent},
  { path: 'Login', component: LoginComponent},
  { path: 'addEvent', component: AddEventComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
