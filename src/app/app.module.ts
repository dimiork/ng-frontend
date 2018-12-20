import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material/material.module';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor, ErrorInterceptor } from './interceptors';
import { WishlistPageComponent } from './components/wishlist-page/wishlist-page.component';
import { ProductComponent } from './components';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminPageComponent } from './components';
import { AdminAddProductComponent } from './components';
import { AddCategoryComponent } from './components';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { NotificationService } from './services/';
import { StatisticsPageComponent } from './components/';
import { CheckoutPageComponent } from './components';
import { WeRecommendComponent } from './components';
import { CartComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    WishlistPageComponent,
    ProductComponent,
    HeaderComponent,
    MainPageComponent,
    LoginComponent,
    RegisterComponent,
    AdminPageComponent,
    AdminAddProductComponent,
    AddCategoryComponent,
    SpinnerComponent,
    StatisticsPageComponent,
    CheckoutPageComponent,
    WeRecommendComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
