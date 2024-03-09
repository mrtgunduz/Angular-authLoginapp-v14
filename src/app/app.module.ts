import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './_components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GuardInterCeptor } from './_helpers/guard-interceptor';
import { HomeComponent } from './_components/home/home.component';
import { ErrorInterceptor } from './_helpers/error-interceptor';
import { HeaderComponent } from './_components/header/header.component';
import { NotfoundComponent } from './_components/notfound/notfound.component';
export const PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: GuardInterCeptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  },
];

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
