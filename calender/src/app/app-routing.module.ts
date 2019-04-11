import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';
import { WeeklyScheduleComponent } from './weekly-schedule/weekly-schedule.component';

const routes: Routes = [
  { path: '', component: DailyScheduleComponent },
  { path: 'day', component: DailyScheduleComponent },
  { path: 'week', component: WeeklyScheduleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
