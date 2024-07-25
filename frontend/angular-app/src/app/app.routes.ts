import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LogInPageComponent } from './log-in-page/log-in-page.component';

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
];
