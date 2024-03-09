import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRoutingModule } from './component-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent, HomeComponent],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class ComponentModule {}
