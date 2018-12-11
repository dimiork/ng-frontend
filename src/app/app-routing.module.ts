import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { AdminPageComponent } from './components';

const childAdminRouts: Routes = [
  {
    path: 'admin',
    component: AdminPageComponent,
    children: [
      { path: '', redirectTo: 'statistics', pathMatch: 'full' },
      { path: 'statistics', component: MainPageComponent }, // todo replace MainPageComponent
      { path: 'category', component: MainPageComponent }, // todo replace MainPageComponent
      { path: 'product', component: MainPageComponent }, // todo replace MainPageComponent
      { path: '**', redirectTo: 'statistics', pathMatch: 'full' }
    ]
  }
];

const routes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminPageComponent, children: childAdminRouts },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(childAdminRouts)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
