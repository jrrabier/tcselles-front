import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NewsComponent } from './components/home/news/news.component';
import { ResultsComponent } from './components/home/results/results.component';
import { AnnouncementsComponent } from './components/home/announcements/announcements.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
        {
            path: 'news',
            component: NewsComponent,
            data: {animation: 'NewsPage'}
        },
        {
            path: 'results',
            component: ResultsComponent,
            data: {animation: 'ResultsPage'}
        },
        {
            path: 'announcements',
            component: AnnouncementsComponent,
            data: {animation: 'AnnouncementsPage'}
        }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),BrowserModule,BrowserAnimationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
