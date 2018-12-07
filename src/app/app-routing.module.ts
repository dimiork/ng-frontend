import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

<<<<<<< HEAD
import { AuthGuard } from './guards/auth.guard';

import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full' },
  { path: '/login', component: LoginComponent },
];
=======
const routes: Routes = [];
>>>>>>> updated to v1.1

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
<<<<<<< HEAD
export class AppRoutingModule { }
=======
export class AppRoutingModule { }
>>>>>>> updated to v1.1
