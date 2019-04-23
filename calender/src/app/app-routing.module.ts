import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';
import { WeeklyScheduleComponent } from './weekly-schedule/weekly-schedule.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EditPasswordComponent } from './edit-password/edit-password.component'
import { EditEmailComponent } from './edit-email/edit-email.component'

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'day', component: DailyScheduleComponent },
  { path: 'week', component: WeeklyScheduleComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'addevent', component: AddEventComponent},
  { path: 'editevent', component: EditEventComponent},
  { path: 'editpassword', component: EditPasswordComponent},
  { path: 'editemail', component: EditEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
