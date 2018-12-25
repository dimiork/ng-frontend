import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DisableLoginGuard } from './guards/disable-login.guard';
import { AddCategoryComponent, AdminAddProductComponent, AdminPageComponent } from './components';
import { ProductComponent } from './components';
import { WishlistPageComponent } from './components/wishlist-page/wishlist-page.component';
import { StatisticsPageComponent, CheckoutPageComponent } from './components/';

const childAdminRouts: Routes = [
  { path: '', redirectTo: 'statistics', pathMatch: 'full' },
  { path: 'statistics', component: StatisticsPageComponent },
  { path: 'category', component: AddCategoryComponent },
  { path: 'product', component: AdminAddProductComponent },
  { path: '**', redirectTo: 'statistics', pathMatch: 'full' }
];

const routes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full', canActivate: [ AuthGuard ] },
  { path: 'products/:id', component: ProductComponent, canActivate: [ AuthGuard ]},
  { path: 'wishlist', component: WishlistPageComponent, canActivate: [ AuthGuard ] },
  { path: 'login', component: LoginComponent, canActivate: [DisableLoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [DisableLoginGuard] },
  { path: 'admin', component: AdminPageComponent, children: childAdminRouts, canActivate: [ AuthGuard ] },
  { path: 'wishes', component: WishlistPageComponent, canActivate: [ AuthGuard ] },
  { path: 'checkout', component: CheckoutPageComponent, canActivate: [ AuthGuard ] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
