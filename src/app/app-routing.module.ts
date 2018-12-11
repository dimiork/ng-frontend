import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminPageComponent } from './components';
import { ProductComponent } from './components';

const childAdminRouts: Routes = [
  { path: '', redirectTo: 'statistics', pathMatch: 'full' },
  { path: 'statistics', component: MainPageComponent }, // todo replace MainPageComponent
  { path: 'category', component: MainPageComponent }, // todo replace MainPageComponent
  { path: 'product', component: MainPageComponent }, // todo replace MainPageComponent
  { path: '**', redirectTo: 'statistics', pathMatch: 'full' }
];

const routes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full' },
  { path: 'products/:id', component: ProductComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminPageComponent, children: childAdminRouts },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
