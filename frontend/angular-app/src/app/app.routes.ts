import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LogInPageComponent } from './log-in-page/log-in-page.component';
import { RegistrationpageComponent } from './registrationpage/registrationpage.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RestService } from './_services/rest-api.service';
import { ProductpageComponent } from './productpage/productpage.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Login',
    component: LogInPageComponent,
  },
  {
    path: 'homepage',
    title: 'Homepage',
    component: HomepageComponent,
  },
  {
    path: 'registration',
    title: 'Registration',
    component: RegistrationpageComponent,
  },
  {
    path: 'product',
    title: 'Product',
    component: ProductpageComponent,
  },
  {
    path: 'profile',
    title: 'Profile',
    component: ProfileComponent,
  },
  {
    path: 'asta',
    title: 'Asta',
    component: AppComponent,
  },



];
//login
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes), // Usa `routes` qui
  ],
  providers: [RestService],
})
export class AppModule { }
