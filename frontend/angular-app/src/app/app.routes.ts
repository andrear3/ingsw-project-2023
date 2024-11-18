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
import { AstaComponent } from './asta/asta.component';
import { VisulizzaProfiloComponent } from './visulizza-profilo/visulizza-profilo.component';
import { AuctionViewComponent } from './auction-view/auction-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NavbarComponent } from './navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { ModificaProfiloComponent } from './modifica-profilo/modifica-profilo.component';
import { SaldoComponent } from './saldo/saldo.component';
import { ModPasswordComponent } from './mod-password/mod-password.component';
import { EliminaProfiloComponent } from './elimina-profilo/elimina-profilo.component';
import { LeMieAsteComponent } from './le-mie-aste/le-mie-aste.component';

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
    component: AstaComponent,
  },
  
  {
    path: 'visualProfilo',
    title: 'VisualProfilo',
    component: VisulizzaProfiloComponent,
  },
  {
  path: 'auctionView',
  title: 'AuctionView',
  component: AuctionViewComponent,
},
{
  path: 'dashboard',
  title: 'Dashboard',
  component: DashboardComponent,
},
{
  path: 'modificaProfilo',
  title: 'ModificaProfilo',
  component: ModificaProfiloComponent,
},
{
  path: 'saldo',
  title: 'Saldo',
  component: SaldoComponent,
},
{
  path: 'visualizzaProfilo/:nickname',
  title: 'VisualizaProfilo',
  component: VisulizzaProfiloComponent,
},
{
  path: 'mod-password',
  title: 'Mod-password',
  component: ModPasswordComponent,
},
{
  path: 'elimina-profilo',
  title: 'Elimina-profilo',
  component: EliminaProfiloComponent,
},
{
  path: 'leMieAste',
  title: 'LeMieAste',
  component: LeMieAsteComponent,
},

{ path: '**', redirectTo: '' } 

];
//login
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    MatInputModule,
    MatAutocompleteModule,
    NavbarComponent,
    MatButtonModule, 
  ],
  exports: [NavbarComponent],
  providers: [RestService],
})
export class AppModule { }
