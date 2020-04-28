import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';
import { WeeklyScheduleComponent } from './weekly-schedule/weekly-schedule.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { EditEmailComponent } from './edit-email/edit-email.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'day', component: DailyScheduleComponent, canActivate: [AuthGuard]},
  { path: 'week', component: WeeklyScheduleComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'editpassword', component: EditPasswordComponent, canActivate: [AuthGuard]},
  { path: 'editemail', component: EditEmailComponent, canActivate: [AuthGuard]},
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
