import { Routes } from '@angular/router';
//import { NgModule } from '@angular/core';
//import { RouterModule} from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { RegistrationpageComponent } from './registrationpage/registrationpage.component';

export const routes: Routes = [
  {
    path: '', 
    title: 'Home Page', 
    component: HomepageComponent, 
  },
  {
    path: 'login',
    title: 'Login',
    component: LogInPageComponent,
  },
  {
    path:'registration',                                                                                                           
    title:'Registration',
    component: RegistrationpageComponent,
  },
  
];
